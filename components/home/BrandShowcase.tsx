"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Brand, BrandSlug, Vehicle } from "@/lib/types";
import VehicleCard from "@/components/VehicleCard";

const LOGOS: Record<BrandSlug, string> = {
  mercedes: "/images/brands/mercedes-logo.png",
  porsche: "/images/brands/porsche-logo.png",
  ferrari: "/images/brands/ferrari-logo.png",
};

/**
 * Section two: the three marque emblems, rendered as white silhouettes on
 * the dark page. Selecting one reveals that brand's automobiles in a
 * transparent glass grid.
 */
export default function BrandShowcase({
  brands,
  vehicles,
}: {
  brands: Brand[];
  vehicles: Vehicle[];
}) {
  const [active, setActive] = useState<BrandSlug>("mercedes");
  const shown = vehicles.filter((v) => v.brand === active);

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-36">
      {/* Logo selector */}
      <div className="flex flex-wrap items-end justify-center gap-x-14 gap-y-8 pt-4 md:gap-x-24">
        {brands.map((brand) => {
          const selected = brand.slug === active;
          return (
            <button
              key={brand.slug}
              onClick={() => setActive(brand.slug)}
              aria-pressed={selected}
              className="group flex flex-col items-center gap-4"
            >
              <motion.img
                src={LOGOS[brand.slug]}
                alt={`${brand.name} emblem`}
                animate={{
                  opacity: selected ? 1 : 0.35,
                  scale: selected ? 1 : 0.92,
                }}
                whileHover={{ opacity: selected ? 1 : 0.7 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-16 w-auto select-none object-contain md:h-24"
                draggable={false}
              />
              <span
                className={`h-px w-10 transition-all duration-500 ${
                  selected ? "bg-gold" : "bg-transparent group-hover:bg-bone/20"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Transparent card grid for the chosen marque */}
      <div className="mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-2 text-center">
              {shown.length} {shown.length === 1 ? "Automobile" : "Automobiles"}
            </p>
            <p
              aria-hidden
              className="mb-8 select-none text-center font-cars text-5xl leading-none text-bone/25 md:text-6xl"
            >
              abc
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} transparent />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
