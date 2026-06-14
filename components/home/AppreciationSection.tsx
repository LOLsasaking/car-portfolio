"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Vehicle } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import Reveal from "@/components/motion/Reveal";

export default function AppreciationSection({
  vehicles,
}: {
  vehicles: Vehicle[];
}) {
  const valued = vehicles
    .filter((v) => v.purchasePrice != null && v.estimatedValue != null)
    .map((v) => ({
      vehicle: v,
      purchase: v.purchasePrice!,
      value: v.estimatedValue!,
      gain: v.estimatedValue! - v.purchasePrice!,
      gainPct: (v.estimatedValue! - v.purchasePrice!) / v.purchasePrice!,
    }))
    .sort((a, b) => b.gainPct - a.gainPct);

  if (valued.length === 0) return null;

  const totalInvested = valued.reduce((s, x) => s + x.purchase, 0);
  const totalValue = valued.reduce((s, x) => s + x.value, 0);
  const totalGain = totalValue - totalInvested;
  const maxValue = Math.max(...valued.map((x) => Math.max(x.purchase, x.value)));

  return (
    <section className="relative bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">Stewardship, Not Speculation</p>
          <h2 className="heading-lg mt-4 text-bone">Value Over Time</h2>
        </Reveal>

        {/* Totals */}
        <div className="mt-14 grid grid-cols-1 gap-y-10 text-center sm:grid-cols-3">
          {[
            { label: "Total Invested", value: totalInvested },
            { label: "Estimated Value Today", value: totalValue },
            {
              label: "Collection Gain",
              value: Math.abs(totalGain),
              prefix: totalGain >= 0 ? "+" : "−",
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <p className="font-display text-3xl text-bone md:text-4xl">
                {item.prefix ?? ""}$
                <AnimatedCounter value={Math.round(item.value / 1000)} suffix="K" />
              </p>
              <div className="mx-auto mt-4 h-px w-8 bg-gold/50" />
              <p className="mt-4 text-[10px] uppercase tracking-luxe text-bone/40">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Per-car bars */}
        <div className="mt-20 space-y-8">
          {valued.map(({ vehicle, purchase, value, gain, gainPct }, i) => (
            <Reveal key={vehicle.id} delay={Math.min(i * 0.05, 0.4)}>
              <Link
                href={`/vehicles/${vehicle.slug}`}
                className="group block"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="text-sm text-bone/80 transition-colors group-hover:text-gold">
                    <span className="font-display text-gold/80">
                      {vehicle.year}
                    </span>{" "}
                    {vehicle.make} {vehicle.model}
                  </p>
                  <p
                    className={`font-serif text-sm ${
                      gain >= 0 ? "text-gold" : "text-bone/35"
                    }`}
                  >
                    {gain >= 0 ? "+" : "−"}
                    {formatCurrency(Math.abs(gain))} ·{" "}
                    {gain >= 0 ? "+" : "−"}
                    {Math.abs(Math.round(gainPct * 100))}%
                  </p>
                </div>

                <div className="mt-3 space-y-1.5">
                  {/* purchase bar */}
                  <div className="h-1.5 w-full bg-white/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(purchase / maxValue) * 100}%`,
                      }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full bg-bone/20"
                    />
                  </div>
                  {/* current value bar */}
                  <div className="h-1.5 w-full bg-white/[0.04]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(value / maxValue) * 100}%` }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 1.1,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`h-full ${
                        gain >= 0 ? "bg-gold/80" : "bg-bone/35"
                      }`}
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span className="flex items-center gap-3 text-[10px] uppercase tracking-wide2 text-bone/40">
            <span className="inline-block h-1.5 w-8 bg-bone/20" /> Purchase
            price
          </span>
          <span className="flex items-center gap-3 text-[10px] uppercase tracking-wide2 text-bone/40">
            <span className="inline-block h-1.5 w-8 bg-gold/80" /> Estimated
            value today
          </span>
        </Reveal>
      </div>
    </section>
  );
}
