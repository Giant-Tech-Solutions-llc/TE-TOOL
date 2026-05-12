import type { ToolInput, Recommendation, RecommendResponse, ImageResponse, FeedbackPayload } from '@/types'

export async function getRecommendations(input: ToolInput): Promise<RecommendResponse> {
  const r = await fetch('/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputData: input }),
  })
  if (!r.ok) throw new Error(`Recommend failed: ${r.status}`)
  return r.json()
}

export async function generateImage(rec: Recommendation, userPhoto?: string, userMimeType?: string): Promise<ImageResponse> {
  const r = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rec, userPhoto, userMimeType }),
  })
  if (!r.ok) throw new Error(`Image gen failed: ${r.status}`)
  return r.json()
}

export async function submitFeedback(payload: FeedbackPayload): Promise<{ ok: boolean }> {
  try {
    const r = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
      }),
    })
    return r.json()
  } catch {
    return { ok: false }
  }
}

const FEEDBACK_KEY = 'taper-empire-feedback-given'

export function hasGivenFeedback(): boolean {
  if (typeof sessionStorage === 'undefined') return false
  return sessionStorage.getItem(FEEDBACK_KEY) === '1'
}

export function markFeedbackGiven(): void {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.setItem(FEEDBACK_KEY, '1')
}
