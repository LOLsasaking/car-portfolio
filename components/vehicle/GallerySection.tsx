"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ImageCategory, VehicleImage } from "@/lib/types";
import Reveal from "@/components/motion/Reveal";

const CATEGORY_LABELS: Record<ImageCategory, string> = {
  exterior: "Exterior",
  interior: "Interior",
  engine: "Engine Bay",
  details: "Details",
  other: "More",
};

const CATEGORY_ORDER: ImageCategory[] = [
  "exterior",
  "interior",
  "engine",
  "details",
  "other",
];

export default function GallerySection({ images }: { images: VehicleImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [filter, setFilter] = useState<ImageCategory | "all">("all");

  const categories = useMemo(
    () =>
      CATEGORY_ORDER.filter((c) =>
        images.some((img) => (img.category ?? "exterior") === c)
      ),
    [images]
  );

  const visible = useMemo(
    () =>
      filter === "all"
        ? images
        : images.filter((img) => (img.category ?? "exterior") === filter),
    [images, filter]
  );

  const close = useCallback(() => {
    setActiveIndex(null);
    setZoomed(false);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setZoomed(false);
      setActiveIndex((i) =>
        i == null ? i : (i + dir + visible.length) % visible.length
      );
    },
    [visible.length]
  );

  useEffect(() => {
    if (activeIndex == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, step]);

  if (images.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <Reveal>
        <p className="eyebrow">Photography</p>
        <h2 className="heading-md mt-4 text-bone">Gallery</h2>
      </Reveal>

      {categories.length > 1 && (
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-3">
            {(["all", ...categories] as Array<ImageCategory | "all">).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setActiveIndex(null);
                  }}
                  className={`border px-5 py-2 text-[10px] uppercase tracking-wide2 transition-colors duration-300 ${
                    filter === cat
                      ? "border-gold text-gold"
                      : "border-white/15 text-bone/50 hover:border-bone/40 hover:text-bone"
                  }`}
                >
                  {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
                </button>
              )
            )}
          </div>
        </Reveal>
      )}

      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {visible.map((img, i) => (
          <Reveal
            key={img.id}
            delay={(i % 3) * 0.08}
            className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}
          >
            <button
              onClick={() => setActiveIndex(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden border border-white/[0.06]"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex != null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
            onClick={close}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-6 top-6 z-10 text-2xl text-bone/60 transition-colors hover:text-gold"
            >
              ✕
            </button>
            <button
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-4 z-10 p-4 text-3xl text-bone/50 transition-colors hover:text-gold md:left-8"
            >
              ←
            </button>
            <button
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-4 z-10 p-4 text-3xl text-bone/50 transition-colors hover:text-gold md:right-8"
            >
              →
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: zoomed ? 1.8 : 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`relative h-[80vh] w-[90vw] ${
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setZoomed((z) => !z);
              }}
            >
              <Image
                src={visible[activeIndex].url}
                alt={visible[activeIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-luxe text-bone/40">
              {activeIndex + 1} / {visible.length} — click image to zoom
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
