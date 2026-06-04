import { NextRequest, NextResponse } from 'next/server'
import { cleanString } from '@/lib/utils'

export const runtime = 'nodejs'
export const maxDuration = 10

/**
 * Lifecycle endpoint — accepts an email + the share token a user wants
 * resent later, plus the lifecycle event type. In production this would
 * enqueue a Resend / Postmark transactional send; here it logs the
 * payload and forwards to an optional webhook so the integration target
 * can be swapped without changing the client.
 *
 * Events the client can post:
 *   - 'remind_match'  → "save my match + email it to me"
 *   - 'refresh'       → "remind me to refresh this cut in N weeks"
 *   - 'welcome'       → triggered post-auth from the auth wall
 *   - 'referral'      → fire-and-forget attribution event
 */

const VALID_EVENTS = ['remind_match', 'refresh', 'welcome', 'referral'] as const
type EventType = (typeof VALID_EVENTS)[number]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const event = typeof body.event === 'string' ? (body.event as EventType) : null
  if (!event || !VALID_EVENTS.includes(event)) {
    return NextResponse.json({ error: 'Unknown lifecycle event' }, { status: 400 })
  }

  // Email required for any send-style event; referral is fire-and-forget
  const email = cleanString(body.email, 200).toLowerCase().trim()
  if (event !== 'referral') {
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
  }

  const payload = {
    event,
    email: email || null,
    shareToken: cleanString(body.shareToken, 2048),
    shareUrl: cleanString(body.shareUrl, 600),
    styleName: cleanString(body.styleName, 80),
    matchScore: Number.isFinite(Number(body.matchScore))
      ? Math.max(0, Math.min(100, Math.round(Number(body.matchScore))))
      : null,
    refererId: cleanString(body.refererId, 64),
    cadenceWeeks: Number.isFinite(Number(body.cadenceWeeks))
      ? Math.max(1, Math.min(52, Math.round(Number(body.cadenceWeeks))))
      : null,
    timestamp: new Date().toISOString(),
    userAgent: cleanString(req.headers.get('user-agent'), 400),
  }

  // Optional webhook for delivery to Resend / Postmark / Slack / Zapier.
  // The receiver decides what the event means (send email, enqueue cron,
  // log to data warehouse, etc.). Keeping the dispatch outside this file
  // means we can ship this endpoint with no SMTP integration today and
  // wire one in later by setting LIFECYCLE_WEBHOOK_URL.
  const webhook = process.env.LIFECYCLE_WEBHOOK_URL
  if (webhook) {
    try {
      const fwd = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!fwd.ok) {
        const errText = await fwd.text().catch(() => '')
        console.error('Lifecycle webhook non-OK', fwd.status, errText.slice(0, 300))
      }
    } catch (error) {
      console.error('Lifecycle webhook failed', error)
    }
  }

  console.log('TAPER_LIFECYCLE', JSON.stringify(payload))
  return NextResponse.json({ ok: true, event: payload.event })
}
