#!/usr/bin/env bash
# ============================================================================
# set-vercel-env.sh  —  Task 4: push env vars to Vercel (production + preview)
#
# URLs + anon keys are pre-filled (they're public/client-safe). You provide the
# secrets via env vars so nothing secret is hardcoded here:
#
#   export PROD_SERVICE_ROLE=...      # Supabase prod service_role (Task 2)
#   export STG_SERVICE_ROLE=...       # Supabase staging service_role (Task 2)
#   export PROD_CRON=...  PREV_CRON=...
#   export PROD_ADMIN=... PREV_ADMIN=...
#   export PROD_WEBHOOK=... PREV_WEBHOOK=...   # the 6 values from phase-s-secrets.txt
#   ./scripts/set-vercel-env.sh
#
# Run from the repo root with the Vercel CLI authenticated (`vercel login`,
# `vercel link` to te-tool-app). Re-running? `vercel env rm <NAME> <scope>` first.
# ============================================================================
set -euo pipefail

PROD_URL="https://huxryszbzyprmfykumsf.supabase.co"
PROD_ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1eHJ5c3pienlwcm1meWt1bXNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjE4MDMsImV4cCI6MjA5Njc5NzgwM30.u7ohJwUV-IFJ3CDTh-sY5X8mE0T1bKK1kTAVNKCgRwE"
STG_URL="https://pyqdfkjzwsnatkdxgddh.supabase.co"
STG_ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cWRma2p6d3NuYXRrZHhnZGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMjE4MjQsImV4cCI6MjA5Njc5NzgyNH0.NMnS5SPKp7UKfjcUV_zPg23WqKMwEMMD1wcy1Ki6SI4"

req() { : "${!1:?Missing env var $1 — see header}"; }
for v in PROD_SERVICE_ROLE STG_SERVICE_ROLE PROD_CRON PREV_CRON PROD_ADMIN PREV_ADMIN PROD_WEBHOOK PREV_WEBHOOK; do req "$v"; done

add() { printf '%s' "$2" | vercel env add "$1" "$3" >/dev/null && echo "  set $1 ($3)"; }

echo "== PRODUCTION =="
add NEXT_PUBLIC_SUPABASE_URL       "$PROD_URL"          production
add NEXT_PUBLIC_SUPABASE_ANON_KEY  "$PROD_ANON"         production
add SUPABASE_SERVICE_ROLE_KEY      "$PROD_SERVICE_ROLE" production
add CRON_SECRET                    "$PROD_CRON"         production
add ADMIN_API_KEY                  "$PROD_ADMIN"        production
add EMAIL_WEBHOOK_SECRET           "$PROD_WEBHOOK"      production
add FROM_EMAIL                     "brief@taperempire.com" production

echo "== PREVIEW =="
add NEXT_PUBLIC_SUPABASE_URL       "$STG_URL"           preview
add NEXT_PUBLIC_SUPABASE_ANON_KEY  "$STG_ANON"          preview
add SUPABASE_SERVICE_ROLE_KEY      "$STG_SERVICE_ROLE"  preview
add CRON_SECRET                    "$PREV_CRON"         preview
add ADMIN_API_KEY                  "$PREV_ADMIN"        preview
add EMAIL_WEBHOOK_SECRET           "$PREV_WEBHOOK"      preview
add FROM_EMAIL                     "brief+staging@taperempire.com" preview

echo "Done. Run 'vercel env pull' to mirror into .env.local, then redeploy (Task 5)."
