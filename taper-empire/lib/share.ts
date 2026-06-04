/**
 * Taper Empire — Shareable Result Token System
 *
 * Phase 11 — encodes a recommendation snapshot into a URL-safe token so a
 * shared link reproduces the result without a database. The token is the
 * single source of truth for /share/[token] pages and their OG images.
 *
 * Format (base64url of JSON):
 *   {
 *     s: style name
 *     m: match score (0-100)
 *     w: why-it-works (truncated)
 *     b: barber instructions (truncated)
 *     i: image URL or null
 *     u: related URL slug
 *     r: referrer user id (optional)
 *     t: token version (currently 1)
 *   }
 */

import type { Recommendation } from '@/types'

export interface SharePayload {
  styleName: string
  matchScore: number
  why: string
  barber: string
  imageUrl: string | null
  relatedUrl?: string
  referrer?: string
  version: number
}

const TOKEN_VERSION = 1
const MAX_TEXT = 600

function truncate(s: string, n = MAX_TEXT) {
  if (!s) return ''
  return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s
}

/* ─── Encode ─────────────────────────────────────────────────────────── */

export function encodeShare(rec: Recommendation, referrer?: string): string {
  const payload = {
    s: rec.style_name,
    m: Math.round(rec.match_score),
    w: truncate(rec.why_it_works || ''),
    b: truncate(rec.barber_instructions || ''),
    i: rec.image_url || null,
    u: rec.related_url || '',
    r: referrer || undefined,
    t: TOKEN_VERSION,
  }
  return base64UrlEncode(JSON.stringify(payload))
}

/* ─── Decode ─────────────────────────────────────────────────────────── */

export function decodeShare(token: string): SharePayload | null {
  try {
    const json = base64UrlDecode(token)
    const o = JSON.parse(json) as Record<string, unknown>
    if (typeof o.s !== 'string' || typeof o.m !== 'number') return null
    return {
      styleName: o.s,
      matchScore: Math.max(0, Math.min(100, Math.round(o.m))),
      why: typeof o.w === 'string' ? o.w : '',
      barber: typeof o.b === 'string' ? o.b : '',
      imageUrl: typeof o.i === 'string' ? o.i : null,
      relatedUrl: typeof o.u === 'string' && o.u ? o.u : undefined,
      referrer: typeof o.r === 'string' && o.r ? o.r : undefined,
      version: typeof o.t === 'number' ? o.t : 1,
    }
  } catch {
    return null
  }
}

/* ─── base64url (works in browser + node + edge) ────────────────────── */

function base64UrlEncode(s: string): string {
  // Universal: use Buffer in Node, btoa in browser/edge
  let b64: string
  if (typeof Buffer !== 'undefined') {
    b64 = Buffer.from(s, 'utf-8').toString('base64')
  } else {
    // Edge / browser path — escape unicode first
    b64 = btoa(unescape(encodeURIComponent(s)))
  }
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlDecode(s: string): string {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(b64, 'base64').toString('utf-8')
  }
  return decodeURIComponent(escape(atob(b64)))
}

/* ─── URL helpers ────────────────────────────────────────────────────── */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://taperempire.com'

export function shareUrl(token: string): string {
  return `${SITE_URL}/share/${token}`
}

export function shareText(payload: Pick<SharePayload, 'matchScore' | 'styleName'>): string {
  return `${payload.matchScore}% TaperMatch™ — ${payload.styleName}`
}
