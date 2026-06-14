import "server-only";
import { cache } from "react";
import type {
  Brand,
  BrandSlug,
  CollectionStats,
  Vehicle,
} from "./types";
import { BRANDS, SEED_VEHICLES } from "./seed-data";
import { HERITAGE, PARTS } from "./enrichment";
import { getSupabaseServer } from "./supabase/server";

/** Attach the encyclopedia layer (model heritage + parts) by slug. */
function enrich(v: Vehicle): Vehicle {
  return { ...v, heritage: HERITAGE[v.slug] ?? [], parts: PARTS[v.slug] ?? [] };
}

/**
 * Data access layer.
 * Reads from Supabase when configured; falls back to the built-in seed data
 * so the site is fully functional before the database exists.
 */

function rowToVehicle(row: Record<string, any>): Vehicle {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    year: row.year,
    make: row.make,
    model: row.model,
    chassisCode: row.chassis_code,
    vin: row.vin,
    color: row.color,
    interiorColor: row.interior_color,
    mileage: row.mileage,
    currentOwner: row.current_owner,
    purchaseDate: row.purchase_date,
    purchasePrice: row.purchase_price,
    estimatedValue: row.estimated_value,
    numOwners: row.num_owners,
    titleStatus: row.title_status,
    carfaxStatus: row.carfax_status,
    location: row.location,
    story: row.story ?? "",
    rotatingVideoUrl: row.rotating_video_url,
    heroImageUrl: row.hero_image_url,
    engineSoundUrl: row.engine_sound_url ?? null,
    featured: row.featured,
    featuredOrder: row.featured_order,
    engine: row.engine,
    transmission: row.transmission,
    horsepower: row.horsepower,
    torque: row.torque,
    drivetrain: row.drivetrain,
    topSpeed: row.top_speed,
    zeroToSixty: row.zero_to_sixty,
    fuelType: row.fuel_type,
    bodyStyle: row.body_style,
    productionNumbers: row.production_numbers,
    marketValue: row.market_value,
    images: (row.vehicle_images ?? [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((i: any) => ({
        id: i.id,
        vehicleId: row.id,
        url: i.url,
        alt: i.alt ?? `${row.year} ${row.make} ${row.model}`,
        category: i.category ?? "exterior",
        sortOrder: i.sort_order,
        isPrimary: i.is_primary,
      })),
    videos: (row.vehicle_videos ?? []).map((v: any) => ({
      id: v.id,
      vehicleId: row.id,
      url: v.url,
      kind: v.kind,
      title: v.title ?? "",
    })),
    documents: (row.vehicle_documents ?? []).map((d: any) => ({
      id: d.id,
      vehicleId: row.id,
      url: d.url,
      title: d.title,
      category: d.category,
      uploadedAt: d.uploaded_at,
      extractedData: d.extracted_data,
      searchText: d.search_text,
    })),
    serviceRecords: (row.vehicle_service_records ?? []).map((s: any) => ({
      id: s.id,
      vehicleId: row.id,
      date: s.date,
      mileage: s.mileage,
      description: s.description,
      shop: s.shop,
      cost: s.cost,
    })),
    ownershipHistory: (row.vehicle_ownership_history ?? [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((o: any) => ({
        id: o.id,
        vehicleId: row.id,
        label: o.label,
        detail: o.detail,
        date: o.date,
        sortOrder: o.sort_order,
      })),
    historyEvents: (row.vehicle_history_events ?? [])
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((h: any) => ({
        id: h.id,
        vehicleId: row.id,
        date: h.date,
        type: h.type,
        severity: h.severity,
        title: h.title,
        detail: h.detail,
        mileage: h.mileage,
        source: h.source,
        sortOrder: h.sort_order,
      })),
  };
}

const VEHICLE_SELECT = `*,
  vehicle_images(*),
  vehicle_videos(*),
  vehicle_documents(*),
  vehicle_service_records(*),
  vehicle_ownership_history(*),
  vehicle_history_events(*)`;

// Pre-0003 schema (no vehicle_history_events); lets the site keep serving
// DB data if the migration hasn't been applied yet.
const VEHICLE_SELECT_LEGACY = `*,
  vehicle_images(*),
  vehicle_videos(*),
  vehicle_documents(*),
  vehicle_service_records(*),
  vehicle_ownership_history(*)`;

export const getVehicles = cache(async (): Promise<Vehicle[]> => {
  const supabase = getSupabaseServer();
  if (supabase) {
    let { data, error } = await supabase
      .from("vehicles")
      .select(VEHICLE_SELECT)
      .order("year", { ascending: true });
    if (error) {
      ({ data, error } = await supabase
        .from("vehicles")
        .select(VEHICLE_SELECT_LEGACY)
        .order("year", { ascending: true }));
    }
    if (!error && data && data.length > 0)
      return data.map((r) => enrich(rowToVehicle(r)));
  }
  return [...SEED_VEHICLES].sort((a, b) => a.year - b.year).map(enrich);
});

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const vehicles = await getVehicles();
  return vehicles.find((v) => v.slug === slug) ?? null;
}

export async function getVehiclesByBrand(brand: BrandSlug): Promise<Vehicle[]> {
  const vehicles = await getVehicles();
  return vehicles.filter((v) => v.brand === brand);
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  const vehicles = await getVehicles();
  return vehicles
    .filter((v) => v.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export async function getBrands(): Promise<Brand[]> {
  return BRANDS;
}

export function getBrand(slug: string): Brand | null {
  return BRANDS.find((b) => b.slug === slug) ?? null;
}

export async function getStats(): Promise<CollectionStats> {
  const vehicles = await getVehicles();
  const now = new Date().getFullYear();
  const years = vehicles.map((v) => v.year);
  return {
    totalVehicles: vehicles.length,
    mercedesCount: vehicles.filter((v) => v.brand === "mercedes").length,
    porscheCount: vehicles.filter((v) => v.brand === "porsche").length,
    ferrariCount: vehicles.filter((v) => v.brand === "ferrari").length,
    averageAge: Math.round(
      years.reduce((sum, y) => sum + (now - y), 0) / (years.length || 1)
    ),
    oldestYear: Math.min(...years),
    newestYear: Math.max(...years),
  };
}
