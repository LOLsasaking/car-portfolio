"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Vehicle } from "@/lib/types";
import UploadField from "./UploadField";

type FormState = Record<string, string | number | boolean | null>;

const EMPTY: FormState = {
  slug: "",
  brand: "mercedes",
  year: new Date().getFullYear(),
  make: "Mercedes-Benz",
  model: "",
  chassisCode: "",
  vin: "",
  color: "",
  interiorColor: "",
  mileage: 0,
  currentOwner: "The Lara Collection",
  purchaseDate: "",
  purchasePrice: "",
  estimatedValue: "",
  numOwners: "",
  titleStatus: "Clean",
  carfaxStatus: "Clean",
  location: "Private Climate-Controlled Facility",
  story: "",
  rotatingVideoUrl: "",
  heroImageUrl: "",
  featured: false,
  featuredOrder: "",
  engine: "",
  transmission: "",
  horsepower: "",
  torque: "",
  drivetrain: "RWD",
  topSpeed: "",
  zeroToSixty: "",
  fuelType: "Gasoline",
  bodyStyle: "",
  productionNumbers: "",
  marketValue: "",
};

function vehicleToForm(v: Vehicle): FormState {
  return {
    ...EMPTY,
    slug: v.slug,
    brand: v.brand,
    year: v.year,
    make: v.make,
    model: v.model,
    chassisCode: v.chassisCode ?? "",
    vin: v.vin ?? "",
    color: v.color,
    interiorColor: v.interiorColor ?? "",
    mileage: v.mileage,
    currentOwner: v.currentOwner,
    purchaseDate: v.purchaseDate ?? "",
    purchasePrice: v.purchasePrice ?? "",
    estimatedValue: v.estimatedValue ?? "",
    numOwners: v.numOwners ?? "",
    titleStatus: v.titleStatus,
    carfaxStatus: v.carfaxStatus,
    location: v.location,
    story: v.story,
    rotatingVideoUrl: v.rotatingVideoUrl ?? "",
    heroImageUrl: v.heroImageUrl ?? "",
    featured: v.featured,
    featuredOrder: v.featuredOrder ?? "",
    engine: v.engine,
    transmission: v.transmission,
    horsepower: v.horsepower ?? "",
    torque: v.torque ?? "",
    drivetrain: v.drivetrain,
    topSpeed: v.topSpeed ?? "",
    zeroToSixty: v.zeroToSixty ?? "",
    fuelType: v.fuelType,
    bodyStyle: v.bodyStyle,
    productionNumbers: v.productionNumbers ?? "",
    marketValue: v.marketValue ?? "",
  };
}

const NUMERIC_FIELDS = new Set([
  "year",
  "mileage",
  "purchasePrice",
  "estimatedValue",
  "numOwners",
  "featuredOrder",
  "horsepower",
]);

export default function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    vehicle ? vehicleToForm(vehicle) : EMPTY
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: string, value: string | number | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const payload: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(form)) {
      if (NUMERIC_FIELDS.has(k)) {
        payload[k] = v === "" || v == null ? null : Number(v);
      } else {
        payload[k] = v;
      }
    }

    const res = await fetch(
      vehicle ? `/api/vehicles/${vehicle.id}` : "/api/vehicles",
      {
        method: vehicle ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    setBusy(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "Save failed.");
    }
  }

  const field = (
    label: string,
    key: string,
    type: "text" | "number" | "date" = "text"
  ) => (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wide2 text-bone/40">
        {label}
      </span>
      <input
        type={type}
        value={String(form[key] ?? "")}
        onChange={(e) => set(key, e.target.value)}
        className="mt-1 w-full border border-white/15 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-gold"
      />
    </label>
  );

  const sectionTitle = (title: string) => (
    <h2 className="border-b border-white/10 pb-2 font-serif text-xl text-gold">
      {title}
    </h2>
  );

  return (
    <form onSubmit={submit} className="space-y-10">
      <section className="space-y-4">
        {sectionTitle("Identity")}
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-[10px] uppercase tracking-wide2 text-bone/40">
              Brand
            </span>
            <select
              value={String(form.brand)}
              onChange={(e) => {
                set("brand", e.target.value);
                const makes: Record<string, string> = {
                  mercedes: "Mercedes-Benz",
                  porsche: "Porsche",
                  ferrari: "Ferrari",
                };
                set("make", makes[e.target.value] ?? "");
              }}
              className="mt-1 w-full border border-white/15 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-gold"
            >
              <option value="mercedes">Mercedes-Benz</option>
              <option value="porsche">Porsche</option>
              <option value="ferrari">Ferrari</option>
            </select>
          </label>
          {field("Year", "year", "number")}
          {field("Model", "model")}
          {field("Chassis Code", "chassisCode")}
          {field("VIN", "vin")}
          {field("Slug (auto if blank)", "slug")}
          {field("Exterior Colour", "color")}
          {field("Interior", "interiorColor")}
          {field("Body Style", "bodyStyle")}
        </div>
      </section>

      <section className="space-y-4">
        {sectionTitle("Ownership & Value")}
        <div className="grid gap-4 md:grid-cols-3">
          {field("Mileage", "mileage", "number")}
          {field("Current Owner", "currentOwner")}
          {field("Purchase Date", "purchaseDate", "date")}
          {field("Purchase Price ($)", "purchasePrice", "number")}
          {field("Estimated Value ($)", "estimatedValue", "number")}
          {field("Number of Owners", "numOwners", "number")}
          {field("Title Status", "titleStatus")}
          {field("Carfax Status", "carfaxStatus")}
          {field("Location", "location")}
        </div>
      </section>

      <section className="space-y-4">
        {sectionTitle("Technical Specifications")}
        <div className="grid gap-4 md:grid-cols-3">
          {field("Engine", "engine")}
          {field("Transmission", "transmission")}
          {field("Horsepower", "horsepower", "number")}
          {field("Torque", "torque")}
          {field("Drivetrain", "drivetrain")}
          {field("Top Speed", "topSpeed")}
          {field("0–60 mph", "zeroToSixty")}
          {field("Fuel Type", "fuelType")}
          {field("Production Numbers", "productionNumbers")}
          {field("Market Value Range", "marketValue")}
        </div>
      </section>

      <section className="space-y-4">
        {sectionTitle("Media")}
        <label className="block">
          <span className="text-[10px] uppercase tracking-wide2 text-bone/40">
            Rotating Studio Video (hero turntable loop)
          </span>
          <div className="mt-1">
            <UploadField
              value={String(form.rotatingVideoUrl ?? "")}
              onChange={(url) => set("rotatingVideoUrl", url)}
              accept="video/mp4,video/webm"
              resourceType="video"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-wide2 text-bone/40">
            Hero Image
          </span>
          <div className="mt-1">
            <UploadField
              value={String(form.heroImageUrl ?? "")}
              onChange={(url) => set("heroImageUrl", url)}
              accept="image/*"
              resourceType="image"
            />
          </div>
        </label>
      </section>

      <section className="space-y-4">
        {sectionTitle("Homepage")}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-bone/70">
            <input
              type="checkbox"
              checked={Boolean(form.featured)}
              onChange={(e) => set("featured", e.target.checked)}
              className="h-4 w-4 accent-[#c9a961]"
            />
            Featured on homepage
          </label>
          <div className="w-32">{field("Order", "featuredOrder", "number")}</div>
        </div>
      </section>

      <section className="space-y-4">
        {sectionTitle("The Story")}
        <textarea
          value={String(form.story ?? "")}
          onChange={(e) => set("story", e.target.value)}
          rows={10}
          placeholder="Long-form narrative. Separate paragraphs with a blank line."
          className="w-full border border-white/15 bg-ink px-4 py-3 text-sm leading-relaxed text-bone outline-none focus:border-gold"
        />
      </section>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-4">
        <button type="submit" disabled={busy} className="gold-button disabled:opacity-50">
          {busy ? "Saving…" : vehicle ? "Save Changes" : "Add to Collection"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="ghost-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
