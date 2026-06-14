"use client";

import type { HistoryEvent, Vehicle } from "@/lib/types";
import { formatDate, formatMileage } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

const TYPE_LABELS: Record<HistoryEvent["type"], string> = {
  accident: "Accident",
  title: "Title",
  registration: "Registration",
  service: "Service",
  sale: "Ownership",
  inspection: "Inspection",
  recall: "Recall",
  other: "Record",
};

const SEVERITY_LABELS: Record<NonNullable<HistoryEvent["severity"]>, string> = {
  minor: "Minor",
  moderate: "Moderate",
  severe: "Severe",
};

export default function HistorySection({ vehicle }: { vehicle: Vehicle }) {
  const events = vehicle.historyEvents;
  if (events.length === 0) return null;

  const accidents = events.filter((e) => e.type === "accident");

  const summary: Array<{ label: string; value: string; alert?: boolean }> = [
    {
      label: "Accidents Reported",
      value:
        accidents.length === 0
          ? "None reported"
          : `${accidents.length} — ${accidents
              .map((a) => SEVERITY_LABELS[a.severity ?? "minor"])
              .join(", ")}`,
      alert: accidents.length > 0,
    },
    {
      label: "Owners",
      value: vehicle.numOwners != null ? String(vehicle.numOwners) : "—",
    },
    { label: "Title", value: vehicle.titleStatus },
    { label: "History Report", value: vehicle.carfaxStatus },
  ];

  return (
    <section className="border-y border-white/5 bg-charcoal">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow">Full Disclosure</p>
          <h2 className="heading-md mt-4 text-bone">Vehicle History Report</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone/50">
            Every reported event in this vehicle&apos;s life — accidents, title
            activity, service, and ownership changes — compiled from Carfax,
            factory records, and the collection&apos;s own archive.
          </p>
        </Reveal>

        {/* Summary band */}
        <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {summary.map((item, i) => (
            <div key={item.label} className="bg-charcoal p-6">
              <Reveal delay={i * 0.08}>
                <p className="text-[10px] uppercase tracking-luxe text-bone/40">
                  {item.label}
                </p>
                <p
                  className={`mt-3 font-serif text-lg ${
                    item.alert ? "text-amber-400/90" : "text-bone"
                  }`}
                >
                  {item.value}
                </p>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Event timeline */}
        <div className="mt-14 border-l border-white/10 pl-8">
          {events.map((event, i) => {
            const isAccident = event.type === "accident";
            return (
              <Reveal
                key={event.id}
                delay={Math.min(i * 0.05, 0.4)}
                className="relative pb-12 last:pb-0"
              >
                <span
                  className={`absolute -left-[37px] top-1.5 h-2 w-2 rounded-full ${
                    isAccident ? "bg-amber-400" : "bg-gold/70"
                  }`}
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-sm text-gold/80">
                    {formatDate(event.date)}
                  </span>
                  <span
                    className={`border px-2 py-0.5 text-[9px] uppercase tracking-wide2 ${
                      isAccident
                        ? "border-amber-400/40 text-amber-400/90"
                        : "border-white/15 text-bone/50"
                    }`}
                  >
                    {TYPE_LABELS[event.type]}
                    {isAccident && event.severity
                      ? ` — ${SEVERITY_LABELS[event.severity]}`
                      : ""}
                  </span>
                  {event.mileage != null && (
                    <span className="text-[10px] uppercase tracking-wide2 text-bone/40">
                      {formatMileage(event.mileage)}
                    </span>
                  )}
                </div>
                <p className="mt-2 font-serif text-lg text-bone">
                  {event.title}
                </p>
                {event.detail && (
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-bone/60">
                    {event.detail}
                  </p>
                )}
                {event.source && (
                  <p className="mt-2 text-[10px] uppercase tracking-wide2 text-bone/30">
                    Source: {event.source}
                  </p>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
