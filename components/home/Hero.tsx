"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Pure cinematic hero — the video montage speaks for itself. */
export default function Hero({ videoUrl }: { videoUrl: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  // dissolve and pull back as the page takes over, like a title card ending
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      {/* Parallax video montage */}
      <motion.div
        style={{ y: videoY, opacity: heroOpacity, scale: heroScale }}
        className="absolute inset-0 scale-110"
      >
        <video
          src={videoUrl}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>

      {/* gentle edges only — keep the film visible */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="h-12 w-px bg-gradient-to-b from-gold/0 via-gold/70 to-gold/0"
        />
      </motion.div>
    </section>
  );
}
