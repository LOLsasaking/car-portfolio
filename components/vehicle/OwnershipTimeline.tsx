"use client";

import { motion } from "framer-motion";
import type { OwnershipEvent } from "@/lib/types";
import Reveal from "@/components/motion/Reveal";

export default function OwnershipTimeline({
  events,
}: {
  events: OwnershipEvent[];
}) {
  if (events.length === 0) return null;
  const sorted = [...events].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <Reveal className="text-center">
        <p className="eyebrow">Chain of Custody</p>
        <h2 className="heading-md mt-4 text-bone">Ownership History</h2>
      </Reveal>

      <div className="relative mt-16 pl-8">
        {/* spine */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-gold/60 via-gold/30 to-transparent"
        />

        <div className="space-y-12">
          {sorted.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.12} className="relative">
              <span className="absolute -left-8 top-1.5 block h-[11px] w-[11px] rounded-full border border-gold bg-ink" />
              <p className="text-[10px] uppercase tracking-luxe text-gold/70">
                {event.date}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-bone">
                {event.label}
              </h3>
              {event.detail && (
                <p className="mt-1 text-sm text-bone/50">{event.detail}</p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
