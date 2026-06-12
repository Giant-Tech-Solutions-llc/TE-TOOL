import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin, supabaseConfigured } from '@/lib/supabase'
import { renderTemplate, type TemplateKey } from '@/lib/email-templates'

export const runtime = 'nodejs'
export const maxDuration = 60

/**
 * Phase T — hourly lifecycle cron.
 *
 * Vercel Cron hits this on the `0 * * * *` schedule (see vercel.json).
 * Protected by CRON_SECRET — Vercel sends `Authorization: Bearer <CRON_SECRET>`
 * automatically when the env var is set; we also accept `x-cron-secret` for
 * manual triggering during the Phase 10 verification pass.
 *
 * For each of the six lifecycle stages, the cron:
 *   1. Selects eligible leads (active + consent_marketing + dayN_sent_at null
 *      + created_at older than N days), capped at 200 per stage per run.
 *   2. Renders the template (subject + text + html) with the lead's name +
 *      unsubscribe URL + recommendation snapshot.
 *   3. Calls Resend with List-Unsubscribe + List-Unsubscribe-Post headers
 *      (Gmail / Apple Mail one-click compliance).
 *   4. Writes the resulting email_sends row with the real provider id and
 *      sent / failed status.
 *   5. ONLY on a successful send: advances `dayN_sent_at` on the lead row.
 *      A failed send leaves the column null so the next run retries.
 *
 * Fail-soft contract: per-lead errors are isolated — a single failure does
 * not abort the rest of the run. The cron returns a per-stage send count
 * AND a per-stage failure count so the caller can detect a stuck stage.
 */

const CRON_SECRET = process.env.CRON_SECRET
const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'Taper Empire <brief@taperempire.com>'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tool.taperempire.com'

interface Stage {
  key: string
  days: number
  column:
    | 'day1_sent_at' | 'day2_sent_at' | 'day5_sent_at'
    | 'day10_sent_at' | 'day14_sent_at' | 'day21_sent_at'
  template: TemplateKey
}

const STAGES: Stage[] = [
  { key: 'day1',  days: 1,  column: 'day1_sent_at',  template: 'day1_profile_ready' },
  { key: 'day2',  days: 2,  column: 'day2_sent_at',  template: 'day2_barber_comms'  },
  { key: 'day5',  days: 5,  column: 'day5_sent_at',  template: 'day5_styling_tips'  },
  { key: 'day10', days: 10, column: 'day10_sent_at', template: 'day10_maintenance'  },
  { key: 'day14', days: 14, column: 'day14_sent_at', template: 'day14_refresh'      },
  { key: 'day21', days: 21, column: 'day21_sent_at', template: 'day21_loyalty'      },
]

function authorized(req: NextRequest): boolean {
  if (!CRON_SECRET) return false
  const auth = req.headers.get('authorization')
  if (auth === `Bearer ${CRON_SECRET}`) return true
  return req.headers.get('x-cron-secret') === CRON_SECRET
}

function buildUnsubscribeUrl(token: string): string {
  return `${SITE_URL}/api/email/unsubscribe?token=${encodeURIComponent(token)}`
}

interface StageResult {
  sent: number
  failed: number
  skipped: number
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: 'Service unavailable' }, { status: 503 })
  }
  if (!RESEND_API_KEY) {
    // Hard fail rather than silently re-queueing — a missing provider key is
    // an ops mistake, not a transient error, and we should not advance the
    // schedule while it's unset.
    console.error('[cron/lifecycle] RESEND_API_KEY not set — aborting')
    return NextResponse.json(
      { ok: false, error: 'Email provider not configured' },
      { status: 503 },
    )
  }

  const resend = new Resend(RESEND_API_KEY)
  const results: Record<string, StageResult> = {}
  const nowIso = new Date().toISOString()

  try {
    for (const stage of STAGES) {
      const cutoff = new Date(Date.now() - stage.days * 24 * 60 * 60 * 1000).toISOString()
      const stageResult: StageResult = { sent: 0, failed: 0, skipped: 0 }

      // Eligible: active, consented, this stage not yet sent, old enough.
      const { data: due, error } = await supabaseAdmin
        .from('leads')
        .select('id, email, name, top_style, top_score, unsubscribe_token')
        .eq('status', 'active')
        .eq('consent_marketing', true)
        .is(stage.column, null)
        .lte('created_at', cutoff)
        .limit(200)

      if (error) throw error

      for (const lead of due ?? []) {
        if (!lead.unsubscribe_token) {
          // Defensive — schema default guarantees a token, but if anyone ever
          // null-ed it manually we cannot send legally.
          stageResult.skipped++
          continue
        }

        const unsubscribeUrl = buildUnsubscribeUrl(lead.unsubscribe_token)
        const rendered = renderTemplate(stage.template, {
          name: lead.name,
          unsubscribeUrl,
          brandUrl: SITE_URL,
          topStyle: lead.top_style,
          topScore: lead.top_score,
        })

        try {
          const { data: send, error: sendErr } = await resend.emails.send({
            from: FROM_EMAIL,
            to: lead.email,
            subject: rendered.subject,
            html: rendered.html,
            text: rendered.text,
            headers: {
              // RFC 8058 one-click unsubscribe — Gmail / Apple Mail show the
              // native "Unsubscribe" button when both headers are present.
              'List-Unsubscribe': `<${unsubscribeUrl}>`,
              'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
            },
            tags: [
              { name: 'stage',    value: stage.key },
              { name: 'template', value: stage.template },
            ],
          })

          if (sendErr) throw sendErr
          const providerId = send?.id ?? null

          // Record the successful send.
          const { data: sendRow } = await supabaseAdmin
            .from('email_sends')
            .insert({
              lead_id:        lead.id,
              email:          lead.email,
              template_key:   stage.template,
              provider:       'resend',
              provider_id:    providerId,
              status:         'sent',
              subject:        rendered.subject,
              scheduled_for:  nowIso,
              sent_at:        nowIso,
            })
            .select('id')
            .single()

          // Advance the lead's lifecycle bookkeeping — only on success.
          await supabaseAdmin
            .from('leads')
            .update({
              [stage.column]:   nowIso,
              last_sent_at:     nowIso,
              lifecycle_stage:  stage.key,
            } as never)
            .eq('id', lead.id)

          await supabaseAdmin.from('lead_events').insert({
            lead_id:    lead.id,
            email:      lead.email,
            event_type: 'sent',
            payload:    {
              stage:       stage.key,
              template:    stage.template,
              send_id:     sendRow?.id ?? null,
              provider_id: providerId,
            },
          })

          stageResult.sent++
          console.log(`[cron/lifecycle] sent ${stage.template} → ${lead.email} (${providerId})`)
        } catch (sendErr) {
          // Record the failure but DO NOT advance dayN_sent_at — the next run
          // will retry. Persist enough context to diagnose.
          const errMessage =
            sendErr instanceof Error ? sendErr.message : String(sendErr)
          await supabaseAdmin.from('email_sends').insert({
            lead_id:       lead.id,
            email:         lead.email,
            template_key:  stage.template,
            provider:      'resend',
            status:        'failed',
            subject:       rendered.subject,
            scheduled_for: nowIso,
            error:         errMessage.slice(0, 1000),
          })
          await supabaseAdmin.from('lead_events').insert({
            lead_id:    lead.id,
            email:      lead.email,
            event_type: 'failed',
            payload:    { stage: stage.key, template: stage.template, error: errMessage.slice(0, 500) },
          })
          stageResult.failed++
          console.error(`[cron/lifecycle] FAILED ${stage.template} → ${lead.email}:`, errMessage)
        }
      }

      results[stage.key] = stageResult
    }

    return NextResponse.json({ ok: true, results })
  } catch (err) {
    console.error('[cron/lifecycle] catastrophic failure', err)
    return NextResponse.json({ ok: false, error: 'Cron run failed' }, { status: 500 })
  }
}
