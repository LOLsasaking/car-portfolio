export type BrandSlug = "mercedes" | "porsche" | "ferrari";

export interface Brand {
  slug: BrandSlug;
  name: string;
  fullName: string;
  logoUrl: string;
  tagline: string;
  description: string;
}

export type ImageCategory =
  | "exterior"
  | "interior"
  | "engine"
  | "details"
  | "other";

export interface VehicleImage {
  id: string;
  vehicleId: string;
  url: string;
  alt: string;
  category: ImageCategory;
  sortOrder: number;
  isPrimary: boolean;
}

export interface VehicleVideo {
  id: string;
  vehicleId: string;
  url: string;
  kind: "rotating" | "driving" | "documentary" | "other";
  title: string;
}

export interface VehicleDocument {
  id: string;
  vehicleId: string;
  url: string;
  title: string;
  category:
    | "title"
    | "registration"
    | "insurance"
    | "auction"
    | "carfax"
    | "service"
    | "other";
  uploadedAt: string;
  extractedData: Record<string, unknown> | null;
  searchText: string | null;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  date: string;
  mileage: number | null;
  description: string;
  shop: string | null;
  cost: number | null;
}

export type HistoryEventType =
  | "accident"
  | "title"
  | "registration"
  | "service"
  | "sale"
  | "inspection"
  | "recall"
  | "other";

export type AccidentSeverity = "minor" | "moderate" | "severe";

/** One line of the vehicle history report (Carfax-style). */
export interface HistoryEvent {
  id: string;
  vehicleId: string;
  date: string; // ISO or year string
  type: HistoryEventType;
  severity: AccidentSeverity | null; // accidents only
  title: string;
  detail: string | null;
  mileage: number | null;
  source: string | null; // "Carfax", "Kardex", "Service File", ...
  sortOrder: number;
}

export interface OwnershipEvent {
  id: string;
  vehicleId: string;
  label: string;
  detail: string | null;
  date: string; // ISO or year string
  sortOrder: number;
}

export interface VehiclePart {
  id: string;
  area: string; // "Powertrain", "Fuel System", "Chassis & Brakes", ...
  name: string; // "M121 BII inline-four"
  detail: string;
  imageKey: string | null; // file stem in /images/parts
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: BrandSlug;
  year: number;
  make: string;
  model: string;
  chassisCode: string | null;
  vin: string | null;
  color: string;
  interiorColor: string | null;
  mileage: number;
  currentOwner: string;
  purchaseDate: string | null;
  purchasePrice: number | null;
  estimatedValue: number | null;
  numOwners: number | null;
  titleStatus: string;
  carfaxStatus: string;
  location: string;
  story: string; // markdown
  rotatingVideoUrl: string | null;
  heroImageUrl: string | null;
  engineSoundUrl: string | null; // start-up + rev clip
  featured: boolean;
  featuredOrder: number | null;
  // technical specifications
  engine: string;
  transmission: string;
  horsepower: number | null;
  torque: string | null;
  drivetrain: string;
  topSpeed: string | null;
  zeroToSixty: string | null;
  fuelType: string;
  bodyStyle: string;
  productionNumbers: string | null;
  marketValue: string | null;
  // encyclopedia (populated by data layer from lib/enrichment.ts)
  heritage?: string[]; // model-history paragraphs
  parts?: VehiclePart[];
  // relations (populated by data layer)
  images: VehicleImage[];
  videos: VehicleVideo[];
  documents: VehicleDocument[];
  serviceRecords: ServiceRecord[];
  ownershipHistory: OwnershipEvent[];
  historyEvents: HistoryEvent[];
}

export interface CollectionStats {
  totalVehicles: number;
  mercedesCount: number;
  porscheCount: number;
  ferrariCount: number;
  averageAge: number;
  oldestYear: number;
  newestYear: number;
}
