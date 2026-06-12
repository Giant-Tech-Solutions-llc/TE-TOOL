import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, supabaseConfigured } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 10

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// One-click unsubscribe. CAN-SPAM requires this to work with no login.
// GET /api/email/unsubscribe?token=<leads.unsubscribe_token>
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') ?? ''
  const base = req.nextUrl.origin

  if (!UUID_RE.test(token)) {
    return NextResponse.redirect(new URL('/unsubscribed?status=invalid', base))
  }
  if (!supabaseConfigured) {
    console.error('[unsubscribe] Supabase not configured')
    return NextResponse.redirect(new URL('/unsubscribed?status=error', base))
  }

  try {
    const { data: lead, error: selErr } = await supabaseAdmin
      .from('leads')
      .select('id, email')
      .eq('unsubscribe_token', token)
      .maybeSingle()
    if (selErr) throw selErr
    if (!lead) {
      return NextResponse.redirect(new URL('/unsubscribed?status=invalid', base))
    }

    const { error: updErr } = await supabaseAdmin
      .from('leads')
      .update({
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString(),
        consent_marketing: false,
      })
      .eq('id', lead.id)
    if (updErr) throw updErr

    await supabaseAdmin.from('lead_events').insert({
      lead_id: lead.id,
      email: lead.email,
      event_type: 'unsubscribed',
      payload: { source: 'one_click_link' },
    })

    return NextResponse.redirect(new URL('/unsubscribed?status=ok', base))
  } catch (err) {
    console.error('[unsubscribe] failed', err)
    return NextResponse.redirect(new URL('/unsubscribed?status=error', base))
  }
}

// Some mail clients send RFC 8058 List-Unsubscribe-Post via POST.
export async function POST(req: NextRequest) {
  return GET(req)
}
