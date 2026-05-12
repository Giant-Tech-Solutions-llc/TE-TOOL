import { NextRequest, NextResponse } from 'next/server'
import { clamp, cleanString } from '@/lib/utils'

export const runtime = 'nodejs'
export const maxDuration = 10

function buildSlackBlocks(payload: any) {
  const r = Number(payload.rating) || 0
  const stars = '⭐'.repeat(r) + '☆'.repeat(5 - r)
  const cmt = payload.comment ? `\n>${cleanString(payload.comment, 600).split('\n').join('\n>')}` : ''
  const recsLine =
    Array.isArray(payload.recommendations) && payload.recommendations.length
      ? `\nRecommendations: ${payload.recommendations.map((x: any) => x.style_name).join(', ')}`
      : ''
  return { text: `New Taper Empire feedback: ${stars}${cmt}${recsLine}` }
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

  const rating = clamp(body.rating, 1, 5)
  if (rating === null) {
    return NextResponse.json({ error: 'Rating (1-5) is required' }, { status: 400 })
  }

  const payload = {
    rating,
    comment: cleanString(body.comment, 2000),
    flow: cleanString(body.flow, 32),
    recommendations: Array.isArray(body.recommendations)
      ? body.recommendations.slice(0, 3).map((r: any) => ({
          style_name: cleanString(r.style_name, 80),
          match_score: clamp(r.match_score, 0, 100),
        }))
      : [],
    page: cleanString(body.page, 200),
    referrer: cleanString(body.referrer, 400),
    userAgent: cleanString(req.headers.get('user-agent'), 400),
    timestamp: new Date().toISOString(),
  }

  const webhook = process.env.FEEDBACK_WEBHOOK_URL
  if (webhook) {
    try {
      const isSlack = /hooks\.slack\.com/.test(webhook)
      const forwardBody = isSlack ? buildSlackBlocks(payload) : payload
      const fwd = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(forwardBody),
      })
      if (!fwd.ok) {
        const errText = await fwd.text().catch(() => '')
        console.error('Feedback webhook non-OK', fwd.status, errText.slice(0, 300))
      }
    } catch (error) {
      console.error('Feedback webhook failed', error)
    }
  }

  console.log('TAPER_FEEDBACK', JSON.stringify(payload))
  return NextResponse.json({ ok: true })
}
