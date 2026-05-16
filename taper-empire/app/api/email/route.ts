import { NextRequest, NextResponse } from 'next/server'
import { cleanString } from '@/lib/utils'

export const runtime = 'nodejs'
export const maxDuration = 10

/**
 * Email capture endpoint — Phase 07 auth wall.
 *
 * Receives { email, name?, source, flow? } and forwards to a configured
 * webhook (Slack / Make / Zapier / Resend audience / custom) plus a
 * server-log fallback so signups are never lost. Mirrors the existing
 * /api/feedback pattern for operational consistency.
 */

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function buildSlackBlock(payload: any) {
  return {
    text: `New Taper Empire signup: ${payload.email}${
      payload.name ? ` (${payload.name})` : ''
    } · source: ${payload.source}`,
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 })
}

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const email = cleanString(body.email, 320).toLowerCase()
  if (!EMAIL_RX.test(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 })
  }

  const payload = {
    email,
    name:      cleanString(body.name, 120),
    source:    cleanString(body.source, 32) || 'auth-wall',
    flow:      cleanString(body.flow, 32),
    page:      cleanString(body.page, 200),
    referrer:  cleanString(body.referrer, 400),
    userAgent: cleanString(req.headers.get('user-agent'), 400),
    timestamp: new Date().toISOString(),
  }

  // Optional webhook forwarding (Slack-shaped JSON if the URL looks like Slack)
  const webhook = process.env.EMAIL_WEBHOOK_URL || process.env.FEEDBACK_WEBHOOK_URL
  if (webhook) {
    try {
      const isSlack = /hooks\.slack\.com/.test(webhook)
      const fwd = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isSlack ? buildSlackBlock(payload) : payload),
      })
      if (!fwd.ok) {
        const errText = await fwd.text().catch(() => '')
        console.error('Email webhook non-OK', fwd.status, errText.slice(0, 300))
      }
    } catch (error) {
      console.error('Email webhook failed', error)
    }
  }

  console.log('TAPER_EMAIL_SIGNUP', JSON.stringify(payload))
  return NextResponse.json({ ok: true })
}
