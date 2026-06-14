-- The Lara Collection — initial schema
-- Run in the Supabase SQL editor or via `supabase db push`.

create extension if not exists "pgcrypto";

-- ─────────────────────────── brands ───────────────────────────
create table if not exists public.brands (
  slug        text primary key,
  name        text not null,
  full_name   text,
  logo_url    text,
  tagline     text,
  description text,
  created_at  timestamptz not null default now()
);

-- ────────────────────────── vehicles ──────────────────────────
create table if not exists public.vehicles (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null unique,
  brand              text not null references public.brands(slug),
  year               int  not null,
  make               text not null,
  model              text not null,
  chassis_code       text,
  vin                text,
  color              text not null default '',
  interior_color     text,
  mileage            int  not null default 0,
  current_owner      text not null default 'The Lara Collection',
  purchase_date      date,
  purchase_price     numeric,
  estimated_value    numeric,
  num_owners         int,
  title_status       text not null default 'Clean',
  carfax_status      text not null default 'Clean',
  location           text not null default '',
  story              text not null default '',
  rotating_video_url text,
  hero_image_url     text,
  featured           boolean not null default false,
  featured_order     int,
  engine             text not null default '',
  transmission       text not null default '',
  horsepower         int,
  torque             text,
  drivetrain         text not null default 'RWD',
  top_speed          text,
  zero_to_sixty      text,
  fuel_type          text not null default 'Gasoline',
  body_style         text not null default '',
  production_numbers text,
  market_value       text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists vehicles_brand_idx on public.vehicles (brand);
create index if not exists vehicles_year_idx  on public.vehicles (year);
create index if not exists vehicles_featured_idx on public.vehicles (featured) where featured;

-- ──────────────────────── vehicle_images ────────────────────────
create table if not exists public.vehicle_images (
  id         uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  url        text not null,
  alt        text,
  sort_order int  not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists vehicle_images_vehicle_idx on public.vehicle_images (vehicle_id);

-- ──────────────────────── vehicle_videos ────────────────────────
create table if not exists public.vehicle_videos (
  id         uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  url        text not null,
  kind       text not null default 'other'
             check (kind in ('rotating', 'driving', 'documentary', 'other')),
  title      text,
  created_at timestamptz not null default now()
);
create index if not exists vehicle_videos_vehicle_idx on public.vehicle_videos (vehicle_id);

-- ─────────────────────── vehicle_documents ───────────────────────
create table if not exists public.vehicle_documents (
  id             uuid primary key default gen_random_uuid(),
  vehicle_id     uuid not null references public.vehicles(id) on delete cascade,
  url            text not null,
  title          text not null,
  category       text not null default 'other'
                 check (category in ('title','registration','insurance','auction','carfax','service','other')),
  extracted_data jsonb,
  search_text    text,
  uploaded_at    timestamptz not null default now()
);
create index if not exists vehicle_documents_vehicle_idx on public.vehicle_documents (vehicle_id);

-- Full-text search over uploaded PDFs
alter table public.vehicle_documents
  add column if not exists search_tsv tsvector
  generated always as (to_tsvector('english', coalesce(search_text, '') || ' ' || coalesce(title, ''))) stored;
create index if not exists vehicle_documents_search_idx
  on public.vehicle_documents using gin (search_tsv);

-- ───────────────────── vehicle_service_records ─────────────────────
create table if not exists public.vehicle_service_records (
  id          uuid primary key default gen_random_uuid(),
  vehicle_id  uuid not null references public.vehicles(id) on delete cascade,
  date        date not null,
  mileage     int,
  description text not null,
  shop        text,
  cost        numeric,
  created_at  timestamptz not null default now()
);
create index if not exists vehicle_service_records_vehicle_idx on public.vehicle_service_records (vehicle_id);

-- ──────────────────── vehicle_ownership_history ────────────────────
create table if not exists public.vehicle_ownership_history (
  id         uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  label      text not null,
  detail     text,
  date       text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists vehicle_ownership_history_vehicle_idx on public.vehicle_ownership_history (vehicle_id);

-- ─────────────────────── featured_vehicles ───────────────────────
-- A view keeps a single source of truth (the flags on vehicles)
-- while still exposing the "featured_vehicles" relation the app queries.
create or replace view public.featured_vehicles as
  select * from public.vehicles
  where featured
  order by featured_order nulls last, year;

-- ───────────────────────── updated_at trigger ─────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists vehicles_set_updated_at on public.vehicles;
create trigger vehicles_set_updated_at
  before update on public.vehicles
  for each row execute function public.set_updated_at();

-- ───────────────────────────── RLS ─────────────────────────────
-- Public (anon) may read everything; all writes go through the
-- service-role key used by the admin API routes.
alter table public.brands                    enable row level security;
alter table public.vehicles                  enable row level security;
alter table public.vehicle_images            enable row level security;
alter table public.vehicle_videos            enable row level security;
alter table public.vehicle_documents         enable row level security;
alter table public.vehicle_service_records   enable row level security;
alter table public.vehicle_ownership_history enable row level security;

create policy "public read brands"    on public.brands                    for select using (true);
create policy "public read vehicles"  on public.vehicles                  for select using (true);
create policy "public read images"    on public.vehicle_images            for select using (true);
create policy "public read videos"    on public.vehicle_videos            for select using (true);
create policy "public read documents" on public.vehicle_documents         for select using (true);
create policy "public read service"   on public.vehicle_service_records   for select using (true);
create policy "public read ownership" on public.vehicle_ownership_history for select using (true);
