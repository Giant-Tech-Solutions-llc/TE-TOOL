import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { supabaseAdmin, supabaseConfigured } from '@/lib/supabase'
import type { TablesUpdate } from '@/types/supabase'

export const runtime = 'nodejs'
export const maxDuration = 10

const WEBHOOK_SECRET = process.env.EMAIL_WEBHOOK_SECRET

// Map provider event names -> our normalized event + side effects.
// Covers Resend (email.delivered, email.bounced, email.complained, ...) and
// Postmark (Delivery, Bounce, SpamComplaint, Open, Click) record types.
type Normalized =
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'bounced'
  | 'complained'
  | 'failed'
  | 'unknown'

function normalize(eventType: string): Normalized {
  const t = eventType.toLowerCase()
  if (t.includes('deliver')) return 'delivered'
  if (t.includes('open')) return 'opened'
  if (t.includes('click')) return 'clicked'
  if (t.includes('bounce')) return 'bounced'
  if (t.includes('complain') || t.includes('spam')) return 'complained'
  if (t.includes('fail') || t.includes('dropped')) return 'failed'
  return 'unknown'
}

/** Timing-safe HMAC-SHA256 check (hex). Works for Postmark and generic HMAC setups. */
function verifyHmac(raw: string, signature: string | null): boolean {
  if (!WEBHOOK_SECRET) {
    console.error('[email/webhook] EMAIL_WEBHOOK_SECRET not set — rejecting')
    return false
  }
  if (!signature) return false
  const expected = crypto.createHmac('sha256', WEBHOOK_SECRET).update(raw, 'utf8').digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(signature.replace(/^sha256=/, ''))
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  const raw = await req.text()

  const signature =
    req.headers.get('x-webhook-signature') ||
    req.headers.get('svix-signature') ||      // Resend (Svix) — see note in README for full Svix verification
    req.headers.get('x-postmark-signature')

  if (!verifyHmac(raw, signature)) {
    return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 })
  }

  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: 'Service unavailable' }, { status: 503 })
  }

  let event: Record<string, any>
  try {
    event = JSON.parse(raw)
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  // Pull common fields across providers.
  const eventType: string = event.type || event.RecordType || event.event || ''
  const data = event.data ?? event
  const email: string = (data.email || data.Recipient || data.to || '').toString().toLowerCase()
  const providerId: string | null = data.email_id || data.MessageID || data.message_id || null
  const normalized = normalize(eventType)
  const nowIso = new Date().toISOString()

  try {
    // Locate the lead (by email) and the matching send (by provider message id).
    const { data: lead } = await supabaseAdmin
      .from('leads')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    // Update email_sends status/timestamps. Typed against the generated
    // Supabase Update payload so TS won't widen field values to `unknown`.
    if (providerId) {
      const sendUpdate: TablesUpdate<'email_sends'> = {}
      if (normalized === 'delivered') { sendUpdate.status = 'delivered'; sendUpdate.delivered_at = nowIso }
      else if (normalized === 'opened') { sendUpdate.opened_at = nowIso }
      else if (normalized === 'clicked') { sendUpdate.first_clicked_at = nowIso }
      else if (normalized === 'bounced') { sendUpdate.status = 'bounced'; sendUpdate.error = 'bounced' }
      else if (normalized === 'complained') { sendUpdate.status = 'spam' }
      else if (normalized === 'failed') { sendUpdate.status = 'failed' }

      if (Object.keys(sendUpdate).length) {
        await supabaseAdmin.from('email_sends').update(sendUpdate).eq('provider_id', providerId)
      }
    }

    // Update lead status on hard signals.
    if (lead && (normalized === 'bounced' || normalized === 'complained')) {
      await supabaseAdmin
        .from('leads')
        .update({
          status: normalized === 'bounced' ? 'bounced' : 'complained',
          ...(normalized === 'complained' ? { consent_marketing: false } : {}),
        })
        .eq('id', lead.id)
    }

    // Always write an audit event.
    await supabaseAdmin.from('lead_events').insert({
      lead_id: lead?.id ?? null,
      email: email || 'unknown@unknown',
      event_type: normalized === 'unknown' ? `provider:${eventType}` : normalized,
      payload: { provider_id: providerId, raw_type: eventType },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[email/webhook] processing failed', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
