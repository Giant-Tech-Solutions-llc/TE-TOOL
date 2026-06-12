import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

/** True when both env vars are present. Routes use this to decide fail-soft behavior. */
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY)

if (!supabaseConfigured) {
  // Do not throw at import time — a missing key must not crash the route and
  // block the auth wall. The /api/email route is built to fail soft, and
  // `next build` collects page data without env vars set.
  console.error('[supabase] missing env vars (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)')
}

/**
 * Server-only admin client. Uses the service_role key, which BYPASSES RLS.
 * NEVER import this from a 'use client' module or any file that ships to the
 * browser bundle. It is referenced only from server route handlers.
 *
 * When env vars are missing (typical during `next build` / preview deploys
 * without secrets) the client is constructed with placeholder strings so the
 * module import does not throw. Every route handler checks `supabaseConfigured`
 * BEFORE issuing a call, so the placeholder client is never actually exercised.
 */
export const supabaseAdmin = createClient<Database>(
  SUPABASE_URL ?? 'https://placeholder.supabase.co',
  SUPABASE_SERVICE_KEY ?? 'placeholder-service-key',
  {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { 'x-application-name': 'taper-empire-email-capture' } },
  },
)
