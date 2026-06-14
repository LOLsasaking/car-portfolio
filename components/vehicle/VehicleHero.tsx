"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Vehicle } from "@/lib/types";
import VehicleVisual from "@/components/VehicleVisual";
import EngineSoundButton from "@/components/EngineSoundButton";

/**
 * Fullscreen cinematic hero. Plays the rotating studio video when the
 * vehicle has one — car on a turntable under studio light — otherwise
 * falls back to the hero image / typographic plate.
 */
export default function VehicleHero({ vehicle }: { vehicle: Vehicle }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      <motion.div style={{ y: mediaY }} className="absolute inset-0 scale-105">
        {vehicle.rotatingVideoUrl ? (
          <video
            src={vehicle.rotatingVideoUrl}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <VehicleVisual
            vehicle={vehicle}
            className="h-full w-full"
            playVideo={false}
            sizes="100vw"
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute inset-x-0 bottom-0 z-10 px-6 pb-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            {vehicle.make} · {vehicle.chassisCode ?? vehicle.bodyStyle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-serif text-5xl text-bone md:text-7xl"
          >
            <span className="font-display text-4xl text-gold md:text-6xl">
              {vehicle.year}
            </span>{" "}
            {vehicle.model}
          </motion.h1>
          {vehicle.engineSoundUrl && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex items-center gap-4"
            >
              <EngineSoundButton soundUrl={vehicle.engineSoundUrl} size="lg" />
              <span className="text-[10px] uppercase tracking-luxe text-bone/50">
                Hear the engine
              </span>
            </motion.div>
          )}
          {vehicle.rotatingVideoUrl && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 1 }}
              className="mt-6 text-[10px] uppercase tracking-luxe text-bone/40"
            >
              Studio Rotation — Filmed on the Collection Turntable
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
