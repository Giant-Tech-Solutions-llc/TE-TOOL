import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, supabaseConfigured } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 30

const ADMIN_API_KEY = process.env.ADMIN_API_KEY

const COLUMNS = [
  'email', 'name', 'top_style', 'top_score', 'flow', 'status',
  'lifecycle_stage', 'consent_marketing', 'created_at',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
] as const

function csvCell(v: unknown): string {
  if (v === null || v === undefined) return ''
  const s = String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export async function GET(req: NextRequest) {
  if (!ADMIN_API_KEY || req.headers.get('x-admin-key') !== ADMIN_API_KEY) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  if (!supabaseConfigured) {
    return NextResponse.json({ ok: false, error: 'Service unavailable' }, { status: 503 })
  }

  const sp = req.nextUrl.searchParams
  let q = supabaseAdmin.from('leads').select(COLUMNS.join(',')).order('created_at', { ascending: false })

  const status = sp.get('status')
  if (status) q = q.eq('status', status)

  const consent = sp.get('consent_marketing')
  if (consent === 'true' || consent === 'false') q = q.eq('consent_marketing', consent === 'true')

  const createdAfter = sp.get('created_after')
  if (createdAfter) q = q.gte('created_at', createdAfter)

  const stage = sp.get('lifecycle_stage')
  if (stage) q = q.eq('lifecycle_stage', stage)

  const flow = sp.get('flow')
  if (flow) q = q.eq('flow', flow)

  const topStyle = sp.get('top_style')
  if (topStyle) q = q.eq('top_style', topStyle)

  // Cap to keep within maxDuration; paginate via created_after for larger pulls.
  q = q.limit(50000)

  const { data, error } = await q
  if (error) {
    console.error('[admin/export] query failed', error)
    return NextResponse.json({ ok: false, error: 'Query failed' }, { status: 500 })
  }

  // Supabase's generic select() infers a narrower type when the column list is
  // a runtime-joined string; cast through unknown so the CSV builder can index
  // by COLUMNS without TS narrowing it to GenericStringError.
  const rows = (data ?? []) as unknown as Record<string, unknown>[]
  const header = COLUMNS.join(',')
  const lines = rows.map((r) => COLUMNS.map((c) => csvCell(r[c])).join(','))
  const csv = [header, ...lines].join('\n')

  const stamp = new Date().toISOString().slice(0, 10)
  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-${stamp}.csv"`,
      'Cache-Control': 'no-store',
    },
  })
}
