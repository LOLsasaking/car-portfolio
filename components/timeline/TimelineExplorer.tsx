"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Vehicle } from "@/lib/types";
import { formatMileage } from "@/lib/utils";
import VehicleVisual from "@/components/VehicleVisual";

/**
 * Full-collection chronological explorer. A vertical scroll drives a
 * horizontal rail of vehicles, 1958 → 2024.
 */
export default function TimelineExplorer({ vehicles }: { vehicles: Vehicle[] }) {
  const sorted = [...vehicles].sort((a, b) => a.year - b.year);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", `-${Math.max(sorted.length * 22 - 95, 0)}%`]
  );

  return (
    <>
      {/* Desktop: pinned horizontal scroll */}
      <div
        ref={trackRef}
        className="relative hidden lg:block"
        style={{ height: `${sorted.length * 42}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* rail */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <motion.div style={{ x }} className="flex gap-[6vw] pl-[8vw]">
            {sorted.map((v, i) => (
              <TimelineEntry key={v.id} vehicle={v} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: vertical chronicle */}
      <div className="space-y-16 px-6 pb-24 lg:hidden">
        {sorted.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/vehicles/${v.slug}`} className="group block">
              <p className="font-display text-4xl text-gold/70">{v.year}</p>
              <div className="relative mt-4 aspect-[16/10] overflow-hidden border border-white/[0.06]">
                <VehicleVisual vehicle={v} className="h-full w-full" />
              </div>
              <h3 className="mt-4 font-serif text-2xl text-bone group-hover:text-gold">
                {v.make} {v.model}
              </h3>
              <p className="mt-1 text-xs text-bone/50">
                {v.color} · {formatMileage(v.mileage)}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}

function TimelineEntry({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const above = index % 2 === 0;

  return (
    <div className="relative flex w-[34vw] shrink-0 flex-col justify-center xl:w-[28vw]">
      <Link href={`/vehicles/${vehicle.slug}`} className="group block">
        <div
          className={`flex flex-col ${above ? "-translate-y-10" : "translate-y-10"}`}
        >
          <p
            className={`font-display text-6xl text-white/[0.07] transition-colors duration-700 group-hover:text-gold/20 ${
              above ? "order-1" : "order-3 mt-6"
            }`}
          >
            {vehicle.year}
          </p>

          <div
            className={`relative aspect-[16/10] overflow-hidden border border-white/[0.06] transition-colors duration-700 group-hover:border-gold/40 ${
              above ? "order-2 mt-2" : "order-2"
            }`}
          >
            <div className="h-full w-full transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
              <VehicleVisual vehicle={vehicle} className="h-full w-full" />
            </div>
          </div>

          <div className={above ? "order-3 mt-5" : "order-1 mb-5"}>
            <p className="text-[10px] uppercase tracking-luxe text-gold/60">
              {vehicle.make}
            </p>
            <h3 className="mt-1 font-serif text-2xl text-bone transition-colors duration-500 group-hover:text-gold xl:text-3xl">
              {vehicle.model}
            </h3>
          </div>
        </div>

        {/* node on the rail */}
        <span className="absolute left-1/2 top-1/2 block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60 bg-ink transition-colors duration-500 group-hover:bg-gold/40" />
      </Link>
    </div>
  );
}
