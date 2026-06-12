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

## 6. Resend setup (Phase T — required for launch day sends)

The cron is now wired to send via Resend. Without `RESEND_API_KEY` it
returns **503** and the schedule does NOT advance, so leads aren't
skipped — they wait until the key is set.

### One-time setup

1. **Create a Resend account** at https://resend.com.
2. **Add the sending domain** (`taperempire.com`) → Resend gives you
   three DNS records to add at your registrar:
   - `resend._domainkey` TXT — DKIM
   - `send` MX + TXT — bounces / replies
   - DMARC TXT at `_dmarc.taperempire.com`:
     `v=DMARC1; p=quarantine; rua=mailto:dmarc@taperempire.com; pct=100`
3. **Wait for verification** at Resend (usually 5-30 min after DNS
   propagates; up to 48h if your DNS is slow).
4. **Generate an API key** at Resend dashboard → API Keys →
   Create API Key → scope: `emails:send`. Copy it.
5. **Add the webhook endpoint** at Resend dashboard → Webhooks → Add
   Endpoint → `https://tool.taperempire.com/api/email/webhook`. Resend
   uses Svix; copy the **endpoint signing secret** — this is what
   goes into `EMAIL_WEBHOOK_SECRET` (overrides the temporary value
   you generated in step 2). Enable these events: `email.delivered`,
   `email.bounced`, `email.complained`, `email.opened`, `email.clicked`.
6. **Set the Vercel env vars** for both Production + Preview:
   ```bash
   vercel env add RESEND_API_KEY production
   vercel env add FROM_EMAIL production
   # paste: Taper Empire <brief@taperempire.com>
   vercel env add NEXT_PUBLIC_SITE_URL production
   # paste: https://tool.taperempire.com

   vercel env add RESEND_API_KEY preview
   vercel env add FROM_EMAIL preview
   # paste: Taper Empire <brief+staging@taperempire.com>
   vercel env add NEXT_PUBLIC_SITE_URL preview
   # paste the actual preview URL (auto per-deploy is fine too)

   # Also rotate the webhook secret to the Resend signing secret:
   vercel env rm EMAIL_WEBHOOK_SECRET production
   vercel env add EMAIL_WEBHOOK_SECRET production
   ```

### Verification

After redeploy:

- [ ] Trigger the cron manually with at least one consenting lead older
      than 1 day in the table:
      `curl -H "Authorization: Bearer $CRON_SECRET" https://tool.taperempire.com/api/cron/lifecycle`
- [ ] Resend dashboard → Emails → confirm the send shows.
- [ ] Supabase `email_sends` → confirm a row with `provider='resend'`,
      `status='sent'`, `provider_id` populated.
- [ ] Supabase `leads` → the matching `dayN_sent_at` column is now set.
- [ ] Wait a minute, hit the webhook trigger: open the email →
      `email_sends.opened_at` populates via the webhook handler.
- [ ] Hard-bounce test: send to `bounce@simulator.amazonses.com` (or
      Resend's equivalent simulator) — `email_sends.status` flips to
      `bounced`, lead row's `status` flips to `bounced` too.
- [ ] One-click unsubscribe: Gmail / Apple Mail show the native button
      (proves `List-Unsubscribe` headers are landing).

### What's already in the code

Already wired in `app/api/cron/lifecycle/route.ts`:
- Six template renderers in `lib/email-templates.ts`
  (`day1_profile_ready` through `day21_loyalty`).
- Per-lead try/catch — a single send failure does not block the rest
  of the batch.
- `dayN_sent_at` advances ONLY on successful send; failures retry next
  hour.
- `List-Unsubscribe` + `List-Unsubscribe-Post` headers on every send.
- Resend `tags` for stage + template so the Resend dashboard segments
  cleanly.
- `lead_events` audit row for every `sent` and `failed`.

See `docs/SUPABASE_EMAIL_CAPTURE_RUNBOOK.md` for the full lifecycle of
a captured lead.
