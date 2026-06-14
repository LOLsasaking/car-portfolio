"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Vehicle } from "@/lib/types";
import { formatCurrency, formatMileage } from "@/lib/utils";
import VehicleVisual from "@/components/VehicleVisual";
import Reveal from "@/components/motion/Reveal";

const MAX_SELECTED = 3;

function parseNumber(value: string | null): number | null {
  if (!value) return null;
  const match = value.replace(/,/g, "").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

type Metric = {
  label: string;
  value: (v: Vehicle) => string;
  /** numeric value for best-in-row highlight; null = no highlight */
  num?: (v: Vehicle) => number | null;
  /** true when lower is better (e.g. 0–60) */
  lowerIsBetter?: boolean;
};

const METRICS: Metric[] = [
  { label: "Year", value: (v) => String(v.year) },
  { label: "Engine", value: (v) => v.engine },
  {
    label: "Horsepower",
    value: (v) => (v.horsepower != null ? `${v.horsepower} hp` : "—"),
    num: (v) => v.horsepower,
  },
  {
    label: "Torque",
    value: (v) => v.torque ?? "—",
    num: (v) => parseNumber(v.torque),
  },
  {
    label: "0–60 mph",
    value: (v) => v.zeroToSixty ?? "—",
    num: (v) => parseNumber(v.zeroToSixty),
    lowerIsBetter: true,
  },
  {
    label: "Top Speed",
    value: (v) => v.topSpeed ?? "—",
    num: (v) => parseNumber(v.topSpeed),
  },
  { label: "Transmission", value: (v) => v.transmission },
  { label: "Drivetrain", value: (v) => v.drivetrain },
  { label: "Body Style", value: (v) => v.bodyStyle },
  { label: "Mileage", value: (v) => formatMileage(v.mileage) },
  {
    label: "Purchase Price",
    value: (v) => formatCurrency(v.purchasePrice),
  },
  {
    label: "Estimated Value",
    value: (v) => formatCurrency(v.estimatedValue),
    num: (v) => v.estimatedValue,
  },
  {
    label: "Appreciation",
    value: (v) =>
      v.purchasePrice != null && v.estimatedValue != null
        ? `${v.estimatedValue >= v.purchasePrice ? "+" : ""}${Math.round(
            ((v.estimatedValue - v.purchasePrice) / v.purchasePrice) * 100
          )}%`
        : "—",
    num: (v) =>
      v.purchasePrice != null && v.estimatedValue != null
        ? (v.estimatedValue - v.purchasePrice) / v.purchasePrice
        : null,
  },
];

export default function CompareExplorer({ vehicles }: { vehicles: Vehicle[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selected = useMemo(
    () => selectedIds.map((id) => vehicles.find((v) => v.id === id)!),
    [selectedIds, vehicles]
  );

  const toggle = (id: string) => {
    setSelectedIds((ids) =>
      ids.includes(id)
        ? ids.filter((x) => x !== id)
        : ids.length >= MAX_SELECTED
          ? ids
          : [...ids, id]
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
      {/* Picker */}
      <Reveal>
        <p className="mt-4 text-[11px] uppercase tracking-wide2 text-bone/40">
          Select up to {MAX_SELECTED} vehicles
          {selectedIds.length > 0 && ` — ${selectedIds.length} selected`}
        </p>
      </Reveal>
      <div className="mt-6 flex flex-wrap gap-3">
        {vehicles.map((v) => {
          const active = selectedIds.includes(v.id);
          const full = !active && selectedIds.length >= MAX_SELECTED;
          return (
            <button
              key={v.id}
              onClick={() => toggle(v.id)}
              disabled={full}
              className={`border px-4 py-2.5 text-left text-[11px] uppercase tracking-wide2 transition-colors duration-300 ${
                active
                  ? "border-gold bg-gold/10 text-gold"
                  : full
                    ? "cursor-not-allowed border-white/5 text-bone/20"
                    : "border-white/15 text-bone/60 hover:border-bone/40 hover:text-bone"
              }`}
            >
              {v.year} {v.make} {v.model}
            </button>
          );
        })}
      </div>

      {/* Comparison table */}
      <AnimatePresence mode="wait">
        {selected.length >= 2 ? (
          <motion.div
            key={selectedIds.join("-")}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 overflow-x-auto"
          >
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="w-44 border-b border-white/10 pb-6" />
                  {selected.map((v) => (
                    <th
                      key={v.id}
                      className="border-b border-white/10 px-4 pb-6 text-left align-bottom"
                    >
                      <div className="aspect-[16/10] w-full max-w-[280px] overflow-hidden border border-white/[0.06]">
                        <VehicleVisual vehicle={v} className="h-full w-full" />
                      </div>
                      <p className="mt-4 font-display text-sm text-gold/90">
                        {v.year}
                      </p>
                      <p className="mt-1 font-serif text-xl text-bone">
                        {v.make} {v.model}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {METRICS.map((metric) => {
                  let bestId: string | null = null;
                  if (metric.num) {
                    const nums = selected
                      .map((v) => ({ id: v.id, n: metric.num!(v) }))
                      .filter((x): x is { id: string; n: number } => x.n != null);
                    if (nums.length >= 2) {
                      const best = nums.reduce((a, b) =>
                        metric.lowerIsBetter
                          ? b.n < a.n
                            ? b
                            : a
                          : b.n > a.n
                            ? b
                            : a
                      );
                      // only highlight when there is an actual difference
                      if (nums.some((x) => x.n !== best.n)) bestId = best.id;
                    }
                  }
                  return (
                    <tr key={metric.label} className="group">
                      <td className="border-b border-white/5 py-5 pr-6 text-[10px] uppercase tracking-luxe text-bone/40">
                        {metric.label}
                      </td>
                      {selected.map((v) => (
                        <td
                          key={v.id}
                          className={`border-b border-white/5 px-4 py-5 font-serif text-lg ${
                            bestId === v.id ? "text-gold" : "text-bone/85"
                          }`}
                        >
                          {metric.value(v)}
                          {bestId === v.id && (
                            <span className="ml-2 align-middle text-[9px] uppercase tracking-wide2 text-gold/70">
                              ◆ Best
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-20 text-center font-serif text-xl text-bone/30"
          >
            Choose two or three vehicles above to line them up.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
