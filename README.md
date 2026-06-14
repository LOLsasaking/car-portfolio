# The Lara Collection

Luxury digital portfolio for a private collection of Mercedes-Benz, Porsche
and Ferrari automobiles (1958 – 2024). Not a dealership — a living archive.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **TailwindCSS** — dark, gold-accented design system
- **Framer Motion** — page reveals, parallax, animated counters, timelines
- **Supabase** — Postgres + RLS (optional; site runs on built-in seed data without it)
- **Cloudinary** — image / video / PDF uploads from the admin
- **Anthropic Claude** — AI document extraction (VIN, mileage, auction results…)

## Quick start

```bash
npm install
npm run dev
```

The site is fully functional out of the box — all 17 vehicles are served from
`lib/seed-data.ts` until Supabase is configured.

## Environment

Copy `.env.example` → `.env.local` and fill in what you have:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Database (enables admin editing) |
| `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` | `/admin` login |
| `CLOUDINARY_*` | Direct uploads from the admin |
| `ANTHROPIC_API_KEY` | AI PDF extraction (regex fallback without it) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO/sitemap |

## Database

Run the two files in `supabase/migrations/` in order (SQL editor or
`supabase db push`):

1. `0001_initial_schema.sql` — tables (`vehicles`, `vehicle_images`,
   `vehicle_videos`, `vehicle_documents`, `vehicle_service_records`,
   `vehicle_ownership_history`, `brands`), the `featured_vehicles` view,
   full-text index for PDF search, RLS (public read, service-role write).
2. `0002_seed_collection.sql` — the full 17-vehicle collection.

## Structure

```
app/
  page.tsx                 # cinematic homepage (hero video, stats, featured, timeline, brands)
  brands/[brand]/          # Mercedes / Porsche / Ferrari grids
  vehicles/[slug]/         # collector-grade detail page (rotating video hero)
  timeline/                # horizontal-scroll chronological explorer
  admin/                   # protected curator dashboard
  api/                     # CRUD, Cloudinary signing, AI document extraction
components/                # luxury UI: hero, cards, gallery+lightbox, timelines…
lib/                       # types, data layer (Supabase → seed fallback), auth
supabase/migrations/       # schema + seed SQL
public/videos/             # hero montage + rotating studio videos
public/images/             # brand emblems + owner's signature
```

## Notable behaviour

- **Loading screen** — owner's signature + gold progress bar, once per session.
- **Rotating showcase** — vehicles with `rotating_video_url` autoplay a muted,
  looping studio-turntable video in their hero (no true 3D models by design).
  Currently: 1958 190SL and 2024 911 Turbo S.
- **Vehicles without photos** render an engraved typographic plate, so the
  site never shows a broken image.
- **AI extraction** (`/api/documents/extract`) parses uploaded PDFs, indexes
  the text for search, asks Claude for VIN / mileage / auction results /
  history / ownership / purchase info, stores it on `vehicle_documents`, and
  promotes confident VIN + mileage values onto the vehicle record.
- **SEO** — per-page metadata, OpenGraph, `schema.org/Car` JSON-LD, sitemap,
  robots.

## Admin

`/admin` — password login (`ADMIN_PASSWORD`). Add / edit / delete vehicles,
upload rotating videos, hero images, gallery images, PDFs (with extraction),
manage ownership history and homepage featured cars. Without Supabase the
dashboard is read-only and says so.
