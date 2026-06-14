"use client";

import Reveal from "@/components/motion/Reveal";

/** Model history — how this car earned its place in the canon. */
export default function HeritageSection({
  heritage,
  model,
}: {
  heritage?: string[];
  model: string;
}) {
  if (!heritage || heritage.length === 0) return null;

  return (
    <section className="border-b border-white/5">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">Heritage</p>
          <h2 className="mt-4 font-serif text-3xl text-bone md:text-4xl">
            The {model} in History
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
        </Reveal>

        <Reveal delay={0.15} className="prose-luxe mt-12">
          {heritage.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
