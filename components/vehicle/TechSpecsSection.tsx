"use client";

import type { Vehicle } from "@/lib/types";
import Reveal from "@/components/motion/Reveal";

export default function TechSpecsSection({ vehicle }: { vehicle: Vehicle }) {
  const specs: Array<[string, string]> = [
    ["Engine", vehicle.engine],
    ["Transmission", vehicle.transmission],
    [
      "Horsepower",
      vehicle.horsepower != null ? `${vehicle.horsepower} hp` : "—",
    ],
    ["Torque", vehicle.torque ?? "—"],
    ["Drivetrain", vehicle.drivetrain],
    ["Top Speed", vehicle.topSpeed ?? "—"],
    ["0–60 mph", vehicle.zeroToSixty ?? "—"],
    ["Fuel Type", vehicle.fuelType],
    ["Body Style", vehicle.bodyStyle],
    ["Production", vehicle.productionNumbers ?? "—"],
    ["Market Value", vehicle.marketValue ?? "—"],
  ];

  return (
    <section className="border-t border-white/5 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <p className="eyebrow">Engineering</p>
          <h2 className="heading-md mt-4 text-bone">
            Technical Specifications
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map(([label, value], i) => (
            <div key={label} className="bg-charcoal p-7">
              <Reveal delay={(i % 3) * 0.08}>
                <p className="text-[10px] uppercase tracking-luxe text-bone/40">
                  {label}
                </p>
                <p className="mt-3 font-serif text-xl text-bone md:text-2xl">
                  {value}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
