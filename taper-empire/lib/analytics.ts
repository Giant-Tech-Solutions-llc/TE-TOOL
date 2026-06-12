/**
 * Phase 07.5 — Analytics events
 *
 * Single source for funnel telemetry. Forwards each event to:
 *   1. Vercel Analytics (window.va) — for the production funnel chart
 *   2. dataLayer (window.dataLayer) — for GTM / GA4 integration when added
 *   3. console.info — for local development inspection
 *
 * Use the canonical event names referenced in the Phase 07.5 brief so the
 * dashboard schema stays stable across releases.
 */

export type AnalyticsEvent =
  | 'upload_started'
  | 'quiz_started'
  | 'analysis_started'
  | 'auth_wall_triggered'
  | 'auth_wall_viewed'
  | 'auth_method_selected'
  | 'signup_completed'
  | 'lead_captured'
  | 'auth_abandoned'
  | 'result_viewed'
  | 'result_shared'
  | 'share_clicked'
  | 'feedback_submitted'

export interface AnalyticsProps {
  [key: string]: string | number | boolean | null | undefined
}

let SESSION_ID: string | null = null

function ensureSessionId(): string {
  if (typeof window === 'undefined') return ''
  if (SESSION_ID) return SESSION_ID
  try {
    const k = 'taper-empire-session'
    const existing = sessionStorage.getItem(k)
    if (existing) { SESSION_ID = existing; return existing }
    const id = `te_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
    sessionStorage.setItem(k, id)
    SESSION_ID = id
    return id
  } catch {
    SESSION_ID = `te_${Date.now().toString(36)}`
    return SESSION_ID
  }
}

export function getSessionId(): string {
  return ensureSessionId()
}

/** Fire a typed funnel event. Safe to call from SSR (no-ops on server). */
export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === 'undefined') return

  const payload = {
    sessionId: ensureSessionId(),
    ts: Date.now(),
    ...props,
  }

  // Vercel Analytics (window.va is injected by @vercel/analytics)
  try {
    const va = (window as any).va
    if (typeof va === 'function') va('event', { name: event, data: payload })
  } catch {}

  // dataLayer push for GTM / GA4 if/when wired in
  try {
    const dl = ((window as any).dataLayer ||= [])
    dl.push({ event, ...payload })
  } catch {}

  if (process.env.NODE_ENV !== 'production') {
    console.info(`[track] ${event}`, payload)
  }
}
