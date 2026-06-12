# Supabase Email Capture — Vercel Setup

The Supabase **production** and **staging** projects are already provisioned
and seeded with the `0001_leads` + `0002_harden_function_search_path`
migrations (see `docs/LIVE_STATUS.md`). All that remains is wiring the secrets
into Vercel.

| Project | Ref | URL |
|---|---|---|
| Production | `huxryszbzyprmfykumsf` | `https://huxryszbzyprmfykumsf.supabase.co` |
| Staging | `pyqdfkjzwsnatkdxgddh` | `https://pyqdfkjzwsnatkdxgddh.supabase.co` |

## 1. Copy the service-role keys

For BOTH projects:

1. Supabase Dashboard → Project Settings → **API**
2. Copy the **`service_role` (secret)** key — never check it into the repo.

The anon keys + URLs are already pre-filled in
`.env.production.local.example` and `.env.staging.local.example`.

## 2. Generate the rest of the secrets

```bash
# Run each twice — once for Production, once for Preview/Staging:
openssl rand -hex 32   # CRON_SECRET
openssl rand -hex 32   # ADMIN_API_KEY
openssl rand -hex 32   # EMAIL_WEBHOOK_SECRET
```

## 3. Set Vercel env vars

Both scopes (Production + Preview) need the full set. The values differ —
Production points at the production Supabase project, Preview points at
staging.

```bash
# --- PRODUCTION scope ---
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# https://huxryszbzyprmfykumsf.supabase.co
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# (anon key from .env.production.local.example)
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# (production service_role from step 1)

vercel env add CRON_SECRET production
vercel env add ADMIN_API_KEY production
vercel env add EMAIL_WEBHOOK_SECRET production
vercel env add RESEND_API_KEY production        # once Resend is wired
vercel env add FROM_EMAIL production            # brief@taperempire.com

# --- PREVIEW scope ---
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
# https://pyqdfkjzwsnatkdxgddh.supabase.co
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
# (anon key from .env.staging.local.example)
vercel env add SUPABASE_SERVICE_ROLE_KEY preview
# (staging service_role from step 1)

vercel env add CRON_SECRET preview              # use a different secret here
vercel env add ADMIN_API_KEY preview
vercel env add EMAIL_WEBHOOK_SECRET preview
vercel env add RESEND_API_KEY preview
vercel env add FROM_EMAIL preview               # brief@staging.taperempire.com
```

Optional: `LIFECYCLE_WEBHOOK_URL` for Slack/Make/Zapier fan-out.

## 4. Sync locally

```bash
vercel env pull
# writes .env.local — used by `npm run dev` + Phase 10 verification.
```

## 5. Verify (Phase 10 checklist)

On a Preview deploy that has the **staging** Supabase wired:

- [ ] Upload a photo → loading reaches 80% → wall appears → submit email →
      row appears in `public.leads`.
- [ ] Re-submit the same email → no duplicate row in `leads`, but `lead_events`
      now has two `captured` rows.
- [ ] Run the Quick Quiz → wall appears → submit → `flow = 'quiz'`.
- [ ] Submit with `?utm_source=instagram&utm_campaign=launch` in the URL →
      UTM fields populated on the row.
- [ ] Submit with `?ref=<someid>` → `referrer_id` populated.
- [ ] `GET /api/email/unsubscribe?token=<row.unsubscribe_token>` →
      row goes to `status = 'unsubscribed'`, `consent_marketing = false`.
- [ ] `GET /api/admin/leads/export?status=active` with the
      `x-admin-key: <ADMIN_API_KEY>` header → CSV downloads.
- [ ] Submit the form without the Terms checkbox → 400, no row.
- [ ] Bounce signal: hit `/api/email/webhook` with a Postmark-style
      payload + matching HMAC → row goes to `status = 'bounced'`.
- [ ] Disconnect Supabase URL → wall still accepts the submission, server logs
      `[api/email] persistence failed`, user is NOT blocked.
- [ ] No client bundle includes `SUPABASE_SERVICE_ROLE_KEY`:
      `grep -r "SERVICE_ROLE" .next/static` → empty.

## 6. Provider wiring (Phase 7/8 follow-up)

Once Resend is connected and `RESEND_API_KEY` + `FROM_EMAIL` are set, the
cron stub at `app/api/cron/lifecycle/route.ts` becomes the active send loop
— replace the `provider: null` line with the Resend send call and capture
the returned `id` as `email_sends.provider_id`. The webhook route already
handles the Resend / Svix signature header.

See `docs/SUPABASE_EMAIL_CAPTURE_RUNBOOK.md` for the full lifecycle of a
captured lead.
