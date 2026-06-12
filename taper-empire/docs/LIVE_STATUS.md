# Live status — what's already provisioned

Done for you via the Supabase connector (Phases 1–2 + types):

| Item | Value |
|---|---|
| Org | GIant Tech Solutions, LLC (`xdqqzvtzceuvzlxtrkib`) |
| **Production project** | `taper-empire-production` — ref `huxryszbzyprmfykumsf` — `us-east-1` |
| Production URL | https://huxryszbzyprmfykumsf.supabase.co |
| **Staging project** | `taper-empire-staging` — ref `pyqdfkjzwsnatkdxgddh` — `us-east-1` |
| Staging URL | https://pyqdfkjzwsnatkdxgddh.supabase.co |
| Schema | `0001_leads` applied to BOTH (leads, lead_events, email_sends; RLS on) |
| Hardening | `0002_harden_function_search_path` applied to BOTH |
| Types | `types/supabase.ts` regenerated from the live production schema |

Verified on staging (then cleaned up): insert, citext case-insensitive match
(no duplicate row), recommendation-context update, sticky `consent_at`,
`updated_at` trigger fires cross-transaction, unsubscribe flips status +
clears `consent_marketing`, and FK cascade deletes `lead_events` (the GDPR
delete path).

## You still need to do (requires secrets / the repo)

1. **Service role keys** — copy each project's `service_role` (secret) key from
   Supabase → Project Settings → API. The connector deliberately never exposes it.
   Anon keys + URLs are pre-filled in `.env.production.local.example` /
   `.env.staging.local.example`.

2. **Set Vercel env vars** on `te-tool-app` (I can't write Vercel secrets from here):
   - Production scope → production URL + anon + **production** service_role
   - Preview scope → staging URL + anon + **staging** service_role
   - Both scopes → `CRON_SECRET`, `ADMIN_API_KEY`, `EMAIL_WEBHOOK_SECRET`
     (generate with `openssl rand -hex 32`), optional `LIFECYCLE_WEBHOOK_URL`.
   ```
   vercel env add NEXT_PUBLIC_SUPABASE_URL production
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
   vercel env add SUPABASE_SERVICE_ROLE_KEY production
   # ...repeat for preview with staging values, then `vercel env pull`
   ```

3. **Drop these files into the repo**, apply `components/tool/AuthWall.PATCH.md`,
   `npm i @supabase/supabase-js`, `npm run build`, and run the Phase 10 checklist
   on a Preview deploy. Connect the repo here and I'll do the edit + build for you.

4. **Provider (Phase 7/8)** — pick Resend or Postmark. If Resend, swap the webhook
   verify for Svix (note in `app/api/email/webhook/route.ts`).
