"use client";

import type { CollectionStats } from "@/lib/types";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import Reveal from "@/components/motion/Reveal";

export default function StatsSection({ stats }: { stats: CollectionStats }) {
  const items = [
    { label: "Vehicles", value: stats.totalVehicles },
    { label: "Mercedes-Benz", value: stats.mercedesCount },
    { label: "Porsche", value: stats.porscheCount },
    { label: "Ferrari", value: stats.ferrariCount },
    { label: "Average Age", value: stats.averageAge, suffix: " yrs" },
  ];

  return (
    <section className="relative border-y border-white/5 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">The Collection in Numbers</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-y-12 md:grid-cols-5">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-4xl text-bone md:text-5xl">
                <AnimatedCounter value={item.value} suffix={item.suffix ?? ""} />
              </p>
              <div className="mx-auto mt-4 h-px w-8 bg-gold/50" />
              <p className="mt-4 text-[10px] uppercase tracking-luxe text-bone/40">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
