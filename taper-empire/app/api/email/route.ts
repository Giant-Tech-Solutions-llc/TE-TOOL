import { NextRequest, NextResponse } from 'next/server'
import { cleanString } from '@/lib/utils'

export const runtime = 'nodejs'
export const maxDuration = 10

/**
 * Phase 07.5 — Email acquisition endpoint.
 *
 * Receives the hard-auth signup payload and forwards to an external
 * webhook (Slack / Make / Zapier / Resend audience / custom) plus a
 * server-log fallback so signups are never lost. Captures the full
 * session metadata required to build segmented lifecycle email flows:
 *   email, name, auth provider, source/flow, recommendation snapshot,
 *   page, referrer, userAgent, timestamp.
 */

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function buildSlackBlock(p: any) {
  return {
    text: `New Taper Empire signup: ${p.email}${p.name ? ` (${p.name})` : ''} · provider: ${p.provider} · flow: ${p.flow}${p.topStyle ? ` · top: ${p.topStyle} ${p.topScore}%` : ''}`,
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
    name:        cleanString(body.name, 120),
    provider:    cleanString(body.provider, 24) || 'email',          // google | apple | email
    source:      cleanString(body.source, 32)   || 'auth-wall',
    flow:        cleanString(body.flow, 32),                          // photo | quiz
    uploadMethod:cleanString(body.uploadMethod, 16),                  // duplicate of flow for analytics clarity
    quizComplete: Boolean(body.quizComplete),
    topStyle:    cleanString(body.topStyle, 80),
    topScore:    typeof body.topScore === 'number' ? Math.round(body.topScore) : null,
    page:        cleanString(body.page, 200),
    referrer:    cleanString(body.referrer, 400),
    userAgent:   cleanString(req.headers.get('user-agent'), 400),
    sessionId:   cleanString(body.sessionId, 64),
    timestamp:   new Date().toISOString(),
  }

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
        const t = await fwd.text().catch(() => '')
        console.error('Email webhook non-OK', fwd.status, t.slice(0, 300))
      }
    } catch (error) {
      console.error('Email webhook failed', error)
    }
  }

  console.log('TAPER_EMAIL_SIGNUP', JSON.stringify(payload))
  return NextResponse.json({ ok: true })
}
