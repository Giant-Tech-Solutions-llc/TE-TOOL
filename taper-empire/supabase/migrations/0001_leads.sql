-- ============================================================================
-- 0001_leads.sql  —  Taper Empire email capture schema
-- Run as a single migration in the Supabase SQL editor (or `supabase db push`).
-- Idempotent where practical so it is safe to re-run on staging.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Extensions (must come first: citext + gen_random_uuid() are used below)
-- ----------------------------------------------------------------------------
create extension if not exists citext;
create extension if not exists pgcrypto;   -- gen_random_uuid()

-- ----------------------------------------------------------------------------
-- leads  —  primary email capture
-- ----------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email citext not null,                 -- citext = case-insensitive
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Consent (CAN-SPAM + GDPR)
  consent_marketing boolean not null default false,
  consent_terms boolean not null default false,
  consent_ip inet,
  consent_user_agent text,
  consent_at timestamptz,

  -- Recommendation context (so marketing can segment by match)
  top_style text,
  top_score int check (top_score between 0 and 100),
  flow text check (flow in ('photo', 'quiz')),
  upload_method text,
  quiz_complete boolean,
  share_token text,                      -- token of the result they unlocked

  -- Attribution
  referrer_id text,                      -- from /lib/referral getReferrer()
  self_id text,                          -- from /lib/referral getSelfId()
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  landing_path text,

  -- Lifecycle state
  status text not null default 'active'
    check (status in ('active', 'unsubscribed', 'bounced', 'complained')),
  unsubscribed_at timestamptz,
  unsubscribe_token uuid not null default gen_random_uuid(),

  -- Send schedule progress (so the cron knows which drip to fire next)
  last_sent_at timestamptz,
  lifecycle_stage text default 'pre_day1',
  day1_sent_at timestamptz,
  day2_sent_at timestamptz,
  day5_sent_at timestamptz,
  day10_sent_at timestamptz,
  day14_sent_at timestamptz,
  day21_sent_at timestamptz,

  -- Free-form metadata
  metadata jsonb default '{}'::jsonb
);

create unique index if not exists leads_email_unique on public.leads (email);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_lifecycle_stage_idx on public.leads (lifecycle_stage);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_referrer_id_idx on public.leads (referrer_id)
  where referrer_id is not null;
-- Used by the unsubscribe endpoint (token lookup must be fast + indexed)
create index if not exists leads_unsubscribe_token_idx on public.leads (unsubscribe_token);

-- ----------------------------------------------------------------------------
-- lead_events  —  audit trail
-- ----------------------------------------------------------------------------
create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  email citext not null,                 -- denormalized for query speed
  event_type text not null,
  payload jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists lead_events_lead_id_idx on public.lead_events (lead_id);
create index if not exists lead_events_event_type_idx on public.lead_events (event_type);
create index if not exists lead_events_email_idx on public.lead_events (email);

-- ----------------------------------------------------------------------------
-- email_sends  —  delivery log
-- ----------------------------------------------------------------------------
create table if not exists public.email_sends (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  email citext not null,
  template_key text not null,
  provider text,
  provider_id text,
  status text not null default 'queued'
    check (status in ('queued', 'sent', 'delivered', 'bounced', 'failed', 'spam')),
  subject text,
  scheduled_for timestamptz,
  sent_at timestamptz,
  delivered_at timestamptz,
  opened_at timestamptz,
  first_clicked_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);

create index if not exists email_sends_lead_id_idx on public.email_sends (lead_id);
create index if not exists email_sends_template_key_idx on public.email_sends (template_key);
create index if not exists email_sends_status_idx on public.email_sends (status);
create index if not exists email_sends_provider_id_idx on public.email_sends (provider_id)
  where provider_id is not null;

-- ----------------------------------------------------------------------------
-- Row-Level Security  (no policies = locked to anon/public; service role bypasses)
-- ----------------------------------------------------------------------------
alter table public.leads enable row level security;
alter table public.lead_events enable row level security;
alter table public.email_sends enable row level security;

-- ----------------------------------------------------------------------------
-- Auto-update updated_at on leads
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ============================================================================
-- End 0001_leads.sql
-- ============================================================================
