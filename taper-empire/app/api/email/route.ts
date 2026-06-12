import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, supabaseConfigured } from '@/lib/supabase'
import { cleanString, clamp } from '@/lib/utils'
import type { LeadInsert } from '@/types/supabase'

export const runtime = 'nodejs'
export const maxDuration = 10

// Basic RFC-5322-ish email check. Intentionally permissive; we normalize + cap length.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LIFECYCLE_WEBHOOK_URL = process.env.LIFECYCLE_WEBHOOK_URL

/** First public IP from the proxy chain (Vercel sets x-forwarded-for). */
function getClientIp(req: NextRequest): string | null {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0]!.trim() || null
  return req.headers.get('x-real-ip') || null
}

function str(v: unknown, max = 512): string | null {
  if (v === null || v === undefined) return null
  const s = cleanString(String(v), max)
  return s.length ? s : null
}

/** Fire-and-forget forward to the marketing webhook, mirroring /api/lifecycle. */
async function forwardToWebhook(payload: Record<string, unknown>): Promise<void> {
  if (!LIFECYCLE_WEBHOOK_URL) return
  try {
    await fetch(LIFECYCLE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'lead_captured', ...payload }),
    })
  } catch (err) {
    console.error('[api/email] webhook forward failed', err)
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  // --- Validate -------------------------------------------------------------
  const email = str(body.email, 254)?.toLowerCase() ?? ''
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email is required' }, { status: 400 })
  }

  // Consent: Terms is hard-required (CAN-SPAM / GDPR lawful basis).
  const consentTerms = body.consentTerms === true || body.consentTerms === 'true'
  const consentMarketing = body.consentMarketing === true || body.consentMarketing === 'true'
  if (!consentTerms) {
    return NextResponse.json(
      { ok: false, error: 'You must accept the Terms & Privacy Policy' },
      { status: 400 },
    )
  }

  // --- Capture context ------------------------------------------------------
  const ip = getClientIp(req)
  const userAgent = str(req.headers.get('user-agent'), 1024)
  const utm = (body.utm ?? {}) as Record<string, unknown>

  const rawTopScore = Number(body.topScore)
  const topScore = Number.isFinite(rawTopScore) ? clamp(Math.round(rawTopScore), 0, 100) : null

  const flowRaw = str(body.flow, 16)
  const flow: 'photo' | 'quiz' | null = flowRaw === 'photo' || flowRaw === 'quiz' ? flowRaw : null

  const nowIso = new Date().toISOString()

  // Fields that are always updated on re-submission (recommendation context).
  const contextFields = {
    name: str(body.name, 200),
    top_style: str(body.topStyle, 120),
    top_score: topScore,
    flow,
    upload_method: str(body.uploadMethod, 64),
    quiz_complete:
      typeof body.quizComplete === 'boolean' ? body.quizComplete : body.quizComplete === 'true' ? true : null,
    share_token: str(body.shareToken ?? body.share_token, 200),
    referrer_id: str(body.refererId ?? body.referrerId ?? body.referer_id, 200),
    self_id: str(body.selfId ?? body.self_id, 200),
    utm_source: str(utm.source ?? body.utm_source, 200),
    utm_medium: str(utm.medium ?? body.utm_medium, 200),
    utm_campaign: str(utm.campaign ?? body.utm_campaign, 200),
    utm_term: str(utm.term ?? body.utm_term, 200),
    utm_content: str(utm.content ?? body.utm_content, 200),
    landing_path: str(body.landingPath ?? body.landing_path, 512),
    consent_marketing: consentMarketing,
    consent_terms: consentTerms,
    consent_ip: ip,
    consent_user_agent: userAgent,
  }

  // --- Fail soft: if Supabase isn't configured, never block the wall --------
  if (!supabaseConfigured) {
    console.error('[api/email] Supabase not configured — accepting submission without persistence', { email })
    await forwardToWebhook({ email, ...contextFields, persisted: false })
    return NextResponse.json({ ok: true, leadId: null })
  }

  try {
    // Look up existing lead (citext makes this case-insensitive).
    const { data: existing, error: selErr } = await supabaseAdmin
      .from('leads')
      .select('id, consent_at')
      .eq('email', email)
      .maybeSingle()

    if (selErr) throw selErr

    let leadId: string

    if (existing) {
      // Idempotent update. Consent is STICKY: never overwrite an existing consent_at.
      const update: Partial<LeadInsert> = { ...contextFields }
      if (!existing.consent_at) {
        update.consent_at = nowIso
      }
      const { data: updated, error: updErr } = await supabaseAdmin
        .from('leads')
        .update(update)
        .eq('id', existing.id)
        .select('id')
        .single()
      if (updErr) throw updErr
      leadId = updated.id
    } else {
      const insert: LeadInsert = {
        email,
        ...contextFields,
        consent_at: nowIso,
        status: 'active',
        lifecycle_stage: 'pre_day1',
      }
      const { data: inserted, error: insErr } = await supabaseAdmin
        .from('leads')
        .insert(insert)
        .select('id')
        .single()
      if (insErr) throw insErr
      leadId = inserted.id
    }

    // Audit trail: one 'captured' event per submission (even on re-submission).
    await supabaseAdmin.from('lead_events').insert({
      lead_id: leadId,
      email,
      event_type: 'captured',
      payload: { ...contextFields, ip, returning: Boolean(existing) },
    })

    await forwardToWebhook({ email, leadId, ...contextFields, persisted: true })

    return NextResponse.json({ ok: true, leadId })
  } catch (err) {
    // Fail soft — capture loss must never beat the user's results.
    console.error('[api/email] persistence failed, returning ok to client', err)
    await forwardToWebhook({ email, ...contextFields, persisted: false })
    return NextResponse.json({ ok: true, leadId: null })
  }
}
