"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Vehicle } from "@/lib/types";
import { formatMileage } from "@/lib/utils";
import VehicleVisual from "./VehicleVisual";
import EngineSoundButton from "./EngineSoundButton";

export default function VehicleCard({
  vehicle,
  index = 0,
  transparent = false,
}: {
  vehicle: Vehicle;
  index?: number;
  transparent?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/vehicles/${vehicle.slug}`}
        className={`group block overflow-hidden border transition-colors duration-700 hover:border-gold/40 ${
          transparent
            ? "border-white/10 bg-white/[0.03] backdrop-blur-sm"
            : "border-white/[0.06] bg-charcoal"
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
            <VehicleVisual vehicle={vehicle} className="h-full w-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-30" />
          <span className="absolute left-5 top-5 font-display text-base text-gold/90">
            {vehicle.year}
          </span>
          {vehicle.engineSoundUrl && (
            <EngineSoundButton
              soundUrl={vehicle.engineSoundUrl}
              className="absolute right-4 top-4 z-10"
            />
          )}
        </div>

        <div className="flex items-end justify-between gap-4 px-6 py-6">
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-bone/40">
              {vehicle.make}
            </p>
            <h3 className="mt-1 font-serif text-xl text-bone transition-colors duration-500 group-hover:text-gold md:text-2xl">
              {vehicle.model}
            </h3>
            <p className="mt-2 text-xs text-bone/50">
              {vehicle.color} · {formatMileage(vehicle.mileage)}
            </p>
          </div>
          <span className="mb-1 inline-block text-gold/0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold">
            →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
