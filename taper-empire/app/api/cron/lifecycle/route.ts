import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, supabaseConfigured } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 60

// Vercel Cron hits this hourly (see vercel.json). Protected by CRON_SECRET:
// Vercel sends `Authorization: Bearer <CRON_SECRET>` automatically when the
// env var is set, and we also accept x-cron-secret for manual triggering.
const CRON_SECRET = process.env.CRON_SECRET

type Stage = { key: string; days: number; column: string; template: string }

const STAGES: Stage[] = [
  { key: 'day1',  days: 1,  column: 'day1_sent_at',  template: 'day1_profile_ready' },
  { key: 'day2',  days: 2,  column: 'day2_sent_at',  template: 'day2_barber_comms' },
  { key: 'day5',  days: 5,  column: 'day5_sent_at',  template: 'day5_styling_tips' },
  { key: 'day10', days: 10, column: 'day10_sent_at', template: 'day10_maintenance' },
  { key: 'day14', days: 14, column: 'day14_sent_at', template: 'day14_refresh' },
  { key: 'day21', days: 21, column: 'day21_sent_at', template: 'day21_loyalty' },
]

function authorized(req: NextRequest): boolean {
  if (!CRON_SECRET) return false
  const auth = req.headers.get('authorization')
  if (auth === `Bearer ${CRON_SECRET}`) return true
  return req.headers.get('x-cron-secret') === CRON_SECRET
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: 'Service unavailable' }, { status: 503 })
  }

  const results: Record<string, number> = {}
  const nowIso = new Date().toISOString()

  try {
    for (const stage of STAGES) {
      const cutoff = new Date(Date.now() - stage.days * 24 * 60 * 60 * 1000).toISOString()

      // Eligible: active, consented, this stage not yet sent, old enough.
      const { data: due, error } = await supabaseAdmin
        .from('leads')
        .select('id, email')
        .eq('status', 'active')
        .eq('consent_marketing', true)
        .is(stage.column as any, null)
        .lte('created_at', cutoff)
        .limit(200)

      if (error) throw error
      results[stage.key] = due?.length ?? 0

      for (const lead of due ?? []) {
        // ---- STUB: provider send lands in a follow-up once Resend/Postmark is picked.
        // For now we log + record the send row so the schedule advances correctly.
        const { data: send } = await supabaseAdmin
          .from('email_sends')
          .insert({
            lead_id: lead.id,
            email: lead.email,
            template_key: stage.template,
            provider: null,            // set to 'resend' | 'postmark' on real wiring
            status: 'queued',          // -> 'sent' once provider returns an id
            scheduled_for: nowIso,
          })
          .select('id')
          .single()

        // Mark this stage as sent + advance lifecycle bookkeeping.
        await supabaseAdmin
          .from('leads')
          .update({
            [stage.column]: nowIso,
            last_sent_at: nowIso,
            lifecycle_stage: stage.key,
          } as any)
          .eq('id', lead.id)

        await supabaseAdmin.from('lead_events').insert({
          lead_id: lead.id,
          email: lead.email,
          event_type: 'queued',
          payload: { stage: stage.key, template: stage.template, send_id: send?.id ?? null, stub: true },
        })

        console.log(`[cron/lifecycle] queued ${stage.template} for ${lead.email}`)
      }
    }

    return NextResponse.json({ ok: true, queued: results })
  } catch (err) {
    console.error('[cron/lifecycle] failed', err)
    return NextResponse.json({ ok: false, error: 'Cron run failed' }, { status: 500 })
  }
}
