"use client";

import Reveal from "@/components/motion/Reveal";
import type { VehiclePart } from "@/lib/types";

/**
 * The hardware: engine, fuel system, gearbox, brakes — what the car is
 * actually made of, with reference photography of the components.
 */
export default function PartsSection({ parts }: { parts?: VehiclePart[] }) {
  if (!parts || parts.length === 0) return null;

  return (
    <section className="border-y border-white/5 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">Parts &amp; Engineering</p>
          <h2 className="mt-4 font-serif text-3xl text-bone md:text-4xl">
            What It&apos;s Made Of
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((part, i) => (
            <Reveal key={part.id} delay={0.08 * (i % 3)}>
              <article className="group flex h-full flex-col border border-white/[0.06] bg-ink/40 transition-colors duration-500 hover:border-gold/30">
                {part.imageKey && (
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/parts/${part.imageKey}.jpg`}
                      alt={part.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[10px] uppercase tracking-luxe text-gold/60">
                    {part.area}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-bone">
                    {part.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/55">
                    {part.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-[10px] uppercase tracking-wide2 text-bone/25">
          Component reference photography — Wikimedia Commons, CC-licensed
        </p>
      </div>
    </section>
  );
}
