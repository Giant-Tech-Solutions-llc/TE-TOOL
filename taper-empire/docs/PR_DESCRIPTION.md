feat(supabase): Phase S — lead capture + lifecycle email infra

## What this does
Wires the auth-wall email submission to Supabase Postgres with full marketing
metadata, GDPR/CAN-SPAM compliance, and zero downtime to the existing funnel.
The wall's response contract is unchanged: `{ ok: true }`.

## Scope (Phases 1–6, 9 + cron stub)
- **DB**: `leads`, `lead_events`, `email_sends` on production + staging Supabase
  projects. RLS on (service-role-only by design). `updated_at` trigger with a
  pinned `search_path`. Migrations committed under `supabase/migrations/`.
- **`/api/email`**: validate → sticky-consent upsert (citext = case-insensitive,
  never overwrites `consent_at`) → context capture (IP, UA, UTM, referrer/self-id)
  → `lead_events` `captured` → optional `LIFECYCLE_WEBHOOK_URL` forward →
  **fail-soft** (returns `ok:true` even if Supabase is down; the user always gets
  their result).
- **`/api/email/unsubscribe`**: one-click token → `status='unsubscribed'`,
  clears `consent_marketing`, redirects to `/unsubscribed` (branded).
- **`/api/email/delete`**: GDPR hard delete (FK cascade removes events + sends).
- **`/api/email/webhook`**: HMAC-verified bounce/complaint/open/click handler.
- **`/api/cron/lifecycle`**: hourly, `CRON_SECRET`-protected. Sends are **stubbed**
  (logs + `email_sends` row + advances `dayN_sent_at`) pending provider choice.
- **`/api/admin/leads/export`**: `ADMIN_API_KEY`-protected CSV with all filters.
- **AuthWall**: consent checkboxes (Terms required, marketing pre-unchecked) +
  UTM/referrer fields + `track('lead_captured')`.

## Types
`types/supabase.ts` generated from the live production schema.

## Verification
- `npm run build` green.
- Schema smoke-tested on staging: citext de-dupe, sticky consent, trigger,
  unsubscribe, FK cascade — all pass.
- Full Phase 10 checklist runs on the Preview deploy (see `docs/SUPABASE_SETUP.md`).

## Not in this PR (follow-ups)
- **Phase 7/8 — Resend wiring + email templates** (receiver code already present;
  swap the cron stub, add DKIM/SPF/DMARC).
- Production smoke-test after merge.

## Reviewer notes
- `SUPABASE_SERVICE_ROLE_KEY` is server-only; confirm it's absent from
  `.next/static`.
- Env vars must be set in Vercel (production + preview scopes) before Preview
  will build.
