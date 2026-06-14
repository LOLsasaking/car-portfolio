"use client";

import Reveal from "@/components/motion/Reveal";

/** Long-form narrative. Accepts markdown-ish text: blank-line paragraphs. */
export default function StorySection({ story }: { story: string }) {
  if (!story?.trim()) return null;
  const paragraphs = story
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="border-y border-white/5 bg-charcoal">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <Reveal className="text-center">
          <p className="eyebrow">The Story</p>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/40" />
        </Reveal>

        <Reveal delay={0.15} className="prose-luxe mt-12">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-gold"
                  : undefined
              }
            >
              {p}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
