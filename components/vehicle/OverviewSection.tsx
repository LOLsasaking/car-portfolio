"use client";

import type { Vehicle } from "@/lib/types";
import { formatCurrency, formatDate, formatMileage } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

export default function OverviewSection({ vehicle }: { vehicle: Vehicle }) {
  const facts: Array<[string, string]> = [
    ["Year", String(vehicle.year)],
    ["Make", vehicle.make],
    ["Model", vehicle.model],
    ["VIN", vehicle.vin ?? "On file"],
    ["Exterior Colour", vehicle.color],
    ["Interior", vehicle.interiorColor ?? "—"],
    ["Mileage", formatMileage(vehicle.mileage)],
    ["Current Owner", vehicle.currentOwner],
    ["Purchase Date", formatDate(vehicle.purchaseDate)],
    ["Purchase Price", formatCurrency(vehicle.purchasePrice)],
    ["Estimated Value", formatCurrency(vehicle.estimatedValue)],
    ["Number of Owners", vehicle.numOwners != null ? String(vehicle.numOwners) : "—"],
    ["Title Status", vehicle.titleStatus],
    ["History Report", vehicle.carfaxStatus],
    ["Location", vehicle.location],
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <Reveal>
        <p className="eyebrow">Provenance</p>
        <h2 className="heading-md mt-4 text-bone">Vehicle Overview</h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map(([label, value], i) => (
          <Reveal
            key={label}
            delay={(i % 3) * 0.07}
            className="flex items-baseline justify-between gap-6 border-b border-white/10 py-5 pr-6"
          >
            <span className="text-[10px] uppercase tracking-luxe text-bone/40">
              {label}
            </span>
            <span className="text-right text-sm text-bone/90">{value}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
