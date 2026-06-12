import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, supabaseConfigured } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 10

// GDPR "delete my data". Hard-deletes the lead; lead_events + email_sends rows
// cascade via the FK (on delete cascade). Callable from a future user dashboard.
//
// Auth: accepts EITHER a valid unsubscribe_token (proves the user controls the
// inbox link) OR an x-admin-key matching ADMIN_API_KEY (internal/support use).
//
// POST { token?: string, email?: string }  — token preferred; email allowed only with admin key.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(req: NextRequest) {
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: 'Service unavailable' }, { status: 503 })
  }

  const adminKey = process.env.ADMIN_API_KEY
  const isAdmin = Boolean(adminKey) && req.headers.get('x-admin-key') === adminKey

  let body: Record<string, any> = {}
  try {
    body = await req.json()
  } catch {
    /* allow empty body */
  }

  const token = typeof body.token === 'string' ? body.token : ''
  const email = typeof body.email === 'string' ? body.email.toLowerCase().trim() : ''

  try {
    let query = supabaseAdmin.from('leads').select('id, email')
    if (UUID_RE.test(token)) {
      query = query.eq('unsubscribe_token', token)
    } else if (isAdmin && email) {
      query = query.eq('email', email)
    } else {
      return NextResponse.json({ ok: false, error: 'A valid token (or admin key + email) is required' }, { status: 400 })
    }

    const { data: lead, error: selErr } = await query.maybeSingle()
    if (selErr) throw selErr
    if (!lead) {
      // Idempotent: nothing to delete is still success from the caller's view.
      return NextResponse.json({ ok: true, deleted: false })
    }

    const { error: delErr } = await supabaseAdmin.from('leads').delete().eq('id', lead.id)
    if (delErr) throw delErr

    return NextResponse.json({ ok: true, deleted: true })
  } catch (err) {
    console.error('[email/delete] failed', err)
    return NextResponse.json({ ok: false, error: 'Delete failed' }, { status: 500 })
  }
}
