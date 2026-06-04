/**
 * Taper Empire — Referral Attribution
 *
 * Captures inbound `?ref=<id>` on landing, persists for the funnel
 * duration, and exposes it for outbound share links. Pure browser-only —
 * no PII, no server roundtrip.
 *
 * The referrer id is whatever the upstream user controlled — usually
 * their own anonymized user-id from auth, or a custom campaign tag.
 */

const STORAGE_KEY = 'te-referrer'
const SELF_KEY = 'te-self-id'

/** Capture inbound referral from URL params and persist it. */
export function captureReferral(): string | null {
  if (typeof window === 'undefined') return null
  try {
    const url = new URL(window.location.href)
    const ref = url.searchParams.get('ref')?.trim()
    if (ref && ref.length > 0 && ref.length <= 64) {
      // Only persist if we don't already have one — first attribution wins
      const existing = localStorage.getItem(STORAGE_KEY)
      if (!existing) localStorage.setItem(STORAGE_KEY, ref)
      return ref
    }
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function getReferrer(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/**
 * Stable self-id — the value this user includes as `?ref=` in their own
 * outbound share links. Generated once per browser, persisted forever.
 */
export function getSelfId(): string {
  if (typeof window === 'undefined') return 'anon'
  try {
    const existing = localStorage.getItem(SELF_KEY)
    if (existing) return existing
    const id = generateId()
    localStorage.setItem(SELF_KEY, id)
    return id
  } catch {
    return 'anon'
  }
}

function generateId(): string {
  // 10-char URL-safe random id — collision-resistant enough for attribution
  const a = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let s = ''
  const buf = new Uint8Array(10)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(buf)
    for (let i = 0; i < buf.length; i++) s += a[buf[i] % a.length]
  } else {
    for (let i = 0; i < 10; i++) s += a[Math.floor(Math.random() * a.length)]
  }
  return s
}
