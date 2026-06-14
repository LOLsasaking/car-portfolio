"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Vehicle } from "@/lib/types";
import Reveal from "@/components/motion/Reveal";

export default function TimelinePreview({ vehicles }: { vehicles: Vehicle[] }) {
  const sorted = [...vehicles].sort((a, b) => a.year - b.year);

  return (
    <section className="border-y border-white/5 bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">1958 — 2024</p>
            <h2 className="heading-lg mt-4 text-bone">Six Decades, One Garage</h2>
          </div>
          <Link href="/timeline" className="ghost-button">
            Full Timeline
          </Link>
        </Reveal>
      </div>

      <div className="no-scrollbar mt-16 overflow-x-auto">
        <div className="relative mx-auto flex min-w-max gap-0 px-6 lg:px-10">
          {/* rail */}
          <div className="absolute left-0 right-0 top-[9px] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          {sorted.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: Math.min(i * 0.05, 0.8),
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-36 shrink-0 md:w-44"
            >
              <Link href={`/vehicles/${v.slug}`} className="group block">
                <div className="relative flex justify-center">
                  <span className="block h-[18px] w-[18px] rounded-full border border-gold/50 bg-charcoal transition-all duration-500 group-hover:border-gold group-hover:bg-gold/20" />
                </div>
                <p className="mt-5 text-center font-display text-xl text-bone/80 transition-colors duration-500 group-hover:text-gold">
                  {v.year}
                </p>
                <p className="mt-1 px-2 text-center text-[10px] uppercase tracking-wide2 text-bone/40 transition-colors duration-500 group-hover:text-bone/70">
                  {v.make}
                  <span className="block normal-case tracking-normal">
                    {v.model}
                  </span>
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
