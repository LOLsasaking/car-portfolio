"use client";

import Image from "next/image";
import type { Vehicle } from "@/lib/types";
import { cn } from "@/lib/utils";

const BRAND_TONES: Record<string, string> = {
  mercedes: "from-[#1a1d22] via-[#101216] to-ink",
  porsche: "from-[#1c1812] via-[#121009] to-ink",
  ferrari: "from-[#220c0c] via-[#140808] to-ink",
};

/**
 * Visual for a vehicle: hero image when present, otherwise the rotating
 * studio video, otherwise a typographic plate worthy of a catalogue.
 */
export default function VehicleVisual({
  vehicle,
  className,
  playVideo = true,
  sizes,
}: {
  vehicle: Vehicle;
  className?: string;
  playVideo?: boolean;
  sizes?: string;
}) {
  if (vehicle.heroImageUrl) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={vehicle.heroImageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          className="object-cover"
        />
      </div>
    );
  }

  if (vehicle.rotatingVideoUrl && playVideo) {
    return (
      <div className={cn("relative overflow-hidden bg-ink", className)}>
        <video
          src={vehicle.rotatingVideoUrl}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        BRAND_TONES[vehicle.brand] ?? "from-graphite to-ink",
        className
      )}
    >
      {/* engraved plate */}
      <div className="pointer-events-none absolute inset-4 border border-white/[0.06]" />
      <div className="relative px-6 text-center">
        <p className="font-serif text-5xl text-bone/15 md:text-6xl">
          {vehicle.year}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-luxe text-gold/60">
          {vehicle.make}
        </p>
        <p className="mt-1 font-serif text-2xl text-bone/70 md:text-3xl">
          {vehicle.model}
        </p>
      </div>
      <div className="absolute bottom-5 left-1/2 h-px w-12 -translate-x-1/2 bg-gold/30" />
    </div>
  );
}
