-- The Lara Collection — vehicle history report, engine sound clips,
-- and gallery image categories.
-- Run in the Supabase SQL editor or via `supabase db push`.
-- NOTE: the app's vehicle query now selects vehicle_history_events,
-- so apply this before deploying the matching app version.

-- ───────────────────── engine sound clips ─────────────────────
alter table public.vehicles
  add column if not exists engine_sound_url text;

-- ──────────────────── gallery image categories ────────────────────
alter table public.vehicle_images
  add column if not exists category text not null default 'exterior';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'vehicle_images_category_check'
  ) then
    alter table public.vehicle_images
      add constraint vehicle_images_category_check
      check (category in ('exterior','interior','engine','details','other'));
  end if;
end $$;

-- ──────────────────── vehicle_history_events ────────────────────
-- Carfax-style report: accidents, title activity, registrations,
-- service, recalls, inspections, ownership changes.
create table if not exists public.vehicle_history_events (
  id         uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  date       text not null,
  type       text not null default 'other'
             check (type in ('accident','title','registration','service','sale','inspection','recall','other')),
  severity   text
             check (severity is null or severity in ('minor','moderate','severe')),
  title      text not null,
  detail     text,
  mileage    int,
  source     text,
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists vehicle_history_events_vehicle_idx
  on public.vehicle_history_events (vehicle_id);

alter table public.vehicle_history_events enable row level security;

drop policy if exists "public read history" on public.vehicle_history_events;
create policy "public read history"
  on public.vehicle_history_events for select using (true);
