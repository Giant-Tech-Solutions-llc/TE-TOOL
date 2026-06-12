# Supabase Email Capture — Setup & Go-Live Runbook

This repo bundle contains all the **code** for the email-capture system. The steps
below are the **cloud/manual** actions that need a human (or a connected Supabase
account) — they can't be done blind from the codebase.

Ship order: **Phase 1 → 2 → 3 → 4 → 5 → 6 → 9 → 10 → 7 → 8.**
Phases 4–6 unblock production capture; 7–8 land after marketing picks a provider.

---

## Phase 1 — Supabase projects
1. Create two projects at https://supabase.com:
   - `taper-empire-production`
   - `taper-empire-staging` (wired to Vercel **Preview**)
2. Each project → **Project Settings → API**: copy `Project URL`, `anon public` key,
   `service_role` key.
3. Add to Vercel env vars (`te-tool-app`), scoped correctly:
   | Var | Production | Preview | Notes |
   |---|---|---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | prod URL | staging URL | client-safe |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | prod anon | staging anon | client-safe |
   | `SUPABASE_SERVICE_ROLE_KEY` | prod service | staging service | **server only** |
   | `LIFECYCLE_WEBHOOK_URL` | optional | optional | marketing webhook |
   | `EMAIL_WEBHOOK_SECRET` | set | set | provider HMAC |
   | `CRON_SECRET` | set | set | protects cron |
   | `ADMIN_API_KEY` | set | set | protects export/delete |
4. `vercel env pull` locally → `.env.local` (use `.env.example` as the template).

## Phase 2 — Schema
Run `supabase/migrations/0001_leads.sql` once in each project's SQL editor
(or `supabase db push` if you link the CLI). It creates `leads`, `lead_events`,
`email_sends`, enables RLS, adds the `updated_at` trigger, and the extensions.

## Phase 3 — SDK + client
```
cd taper-empire
npm i @supabase/supabase-js
```
`lib/supabase.ts` is the server-only admin client. Never import it from a
`'use client'` file.

## Phase 4–6 — API routes (already written)
- `app/api/email/route.ts` — validate, sticky-consent upsert, context capture,
  `lead_events`, webhook forward, **fail-soft** (`ok:true` even if Supabase is down).
- `app/api/email/unsubscribe/route.ts` — one-click token unsubscribe → `/unsubscribed`.
- `app/api/email/delete/route.ts` — GDPR hard delete (token or admin key).
- `app/unsubscribed/page.tsx` — branded confirmation.
Apply `components/tool/AuthWall.PATCH.md` to the real component (consent boxes + UTM/referrer body).

## Phase 7 — Cron
`vercel.json` registers `/api/cron/lifecycle` hourly. Sends are **stubbed** (logs +
`email_sends` row + advances `dayN_sent_at`). Swap the stub for Resend/Postmark once chosen.
Set `CRON_SECRET` — Vercel passes it as `Authorization: Bearer <CRON_SECRET>`.

## Phase 8 — Webhook receiver
`app/api/email/webhook/route.ts` verifies an HMAC signature (`EMAIL_WEBHOOK_SECRET`)
and updates `email_sends` + `leads.status` on bounce/complaint/open/click.
> Resend uses **Svix** signatures (`svix-id` / `svix-timestamp` / `svix-signature`).
> For production with Resend, verify with the `svix` package using the full
> `${id}.${timestamp}.${body}` payload. The generic HMAC path here covers Postmark
> and custom setups; see the inline comment.

## Phase 9 — Admin export
`GET /api/admin/leads/export?status=active` with header `x-admin-key: $ADMIN_API_KEY`
→ CSV. Filters: `status`, `consent_marketing`, `created_after`, `lifecycle_stage`,
`flow`, `top_style`.

## Phase 10 — Verification (run on a Preview deploy)
- [ ] Photo flow → wall → submit → row in `public.leads`
- [ ] Same email again → no duplicate row, **two** `captured` events
- [ ] Quiz flow → row has `flow = 'quiz'`
- [ ] `?utm_source=instagram&utm_campaign=launch` → UTM columns populated
- [ ] `?ref=<id>` → `referrer_id` populated
- [ ] `/api/email/unsubscribe?token=<token>` → `status='unsubscribed'`
- [ ] Export with admin key → CSV downloads
- [ ] Submit without Terms checked → 400, no row
- [ ] Blank `NEXT_PUBLIC_SUPABASE_URL` → wall still accepts, server logs error, user not blocked
- [ ] `npm run build` exits 0, no new type errors
- [ ] `grep -r "SUPABASE_SERVICE_ROLE_KEY" .next/static` → **no matches**

## Types
After the project exists:
```
npx supabase gen types typescript --project-id <PROJECT_ID> > types/supabase.ts
```
The hand-written `types/supabase.ts` in this bundle is shape-compatible until you regenerate.

## Branching
All work on `feature/supabase-email-capture`, PR against `main`.

## Critical rules (do not violate)
1. `SUPABASE_SERVICE_ROLE_KEY` is server-only.
2. Idempotency by email (citext + unique index).
3. Consent is sticky — never overwrite `consent_at`.
4. Fail soft on the wall.
5. Every marketing email needs a working unsubscribe link:
   `https://tool.taperempire.com/api/email/unsubscribe?token=<token>`
6. GDPR: capture consent metadata; `/api/email/delete` hard-deletes.
