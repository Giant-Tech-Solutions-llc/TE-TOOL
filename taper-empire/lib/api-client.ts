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

/* ─────────────────────────────────────────────────────────────────────
 *  Phase 07.5 — Hard auth gate + email acquisition
 * ───────────────────────────────────────────────────────────────────── */

export type AuthProvider = 'google' | 'apple' | 'email'

export interface EmailSignupPayload {
  email: string
  name?: string
  provider?: AuthProvider                    // which OAuth path the user picked
  source?: 'auth-wall' | 'footer' | 'cta'
  flow?: 'photo' | 'quiz' | string
  uploadMethod?: 'photo' | 'quiz' | string
  quizComplete?: boolean
  topStyle?: string
  topScore?: number
  sessionId?: string
  // Phase S — Supabase lead capture
  refererId?: string | null
  selfId?: string | null
  utm?: {
    source?: string | null
    medium?: string | null
    campaign?: string | null
    term?: string | null
    content?: string | null
  }
  landingPath?: string | null
  consentTerms?: boolean
  consentMarketing?: boolean
  shareToken?: string
}

export async function submitEmail(
  payload: EmailSignupPayload,
): Promise<{ ok: boolean; error?: string; leadId?: string | null }> {
  try {
    const r = await fetch('/api/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
      }),
    })
    const data = await r.json().catch(() => ({} as any))
    if (!r.ok || data?.ok === false) {
      return { ok: false, error: data?.error || 'Could not submit email.' }
    }
    return { ok: true, leadId: data?.leadId ?? null }
  } catch {
    return { ok: false, error: 'Network error — try again in a moment.' }
  }
}

const AUTH_KEY = 'taper-empire-auth'
const AUTH_META_KEY = 'taper-empire-auth-meta'

export interface AuthMeta {
  email: string
  provider: AuthProvider
  ts: number
  name?: string
}

export function hasAuthenticated(): boolean {
  if (typeof sessionStorage === 'undefined') return false
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function markAuthenticated(meta: AuthMeta): void {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.setItem(AUTH_KEY, '1')
  try { sessionStorage.setItem(AUTH_META_KEY, JSON.stringify(meta)) } catch {}
}

export function getAuthMeta(): AuthMeta | null {
  if (typeof sessionStorage === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(AUTH_META_KEY)
    return raw ? JSON.parse(raw) as AuthMeta : null
  } catch { return null }
}
