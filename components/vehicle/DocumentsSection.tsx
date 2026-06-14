"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { VehicleDocument } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";

const CATEGORY_LABELS: Record<VehicleDocument["category"], string> = {
  title: "Title",
  registration: "Registration",
  insurance: "Insurance",
  auction: "Auction Results",
  carfax: "Carfax",
  service: "Service Records",
  other: "Documents",
};

export default function DocumentsSection({
  documents,
}: {
  documents: VehicleDocument[];
}) {
  const [preview, setPreview] = useState<VehicleDocument | null>(null);

  if (documents.length === 0) return null;

  return (
    <section className="border-y border-white/5 bg-charcoal">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow">The Archive</p>
          <h2 className="heading-md mt-4 text-bone">Documents</h2>
        </Reveal>

        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {documents.map((doc, i) => (
            <Reveal
              key={doc.id}
              delay={i * 0.06}
              className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/30 font-serif text-gold">
                  ⎙
                </span>
                <div>
                  <p className="text-sm text-bone">{doc.title}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wide2 text-bone/40">
                    {CATEGORY_LABELS[doc.category]} · {formatDate(doc.uploadedAt)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pl-[68px] sm:pl-0">
                <button
                  onClick={() => setPreview(doc)}
                  className="border border-white/15 px-5 py-2 text-[10px] uppercase tracking-wide2 text-bone/70 transition-colors hover:border-gold hover:text-gold"
                >
                  Preview
                </button>
                <a
                  href={doc.url}
                  download
                  className="border border-gold/40 px-5 py-2 text-[10px] uppercase tracking-wide2 text-gold transition-colors hover:bg-gold hover:text-ink"
                >
                  Download
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-10"
            onClick={() => setPreview(null)}
          >
            <button
              aria-label="Close preview"
              className="absolute right-6 top-6 text-2xl text-bone/60 transition-colors hover:text-gold"
              onClick={() => setPreview(null)}
            >
              ✕
            </button>
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={preview.url}
                title={preview.title}
                className="h-full w-full border border-white/10 bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
