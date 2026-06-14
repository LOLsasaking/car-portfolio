"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Compact play/pause button for a vehicle's engine sound clip.
 * Overlays the car media in heroes and cards; manages its own audio element.
 */
export default function EngineSoundButton({
  soundUrl,
  className,
  size = "md",
}: {
  soundUrl: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = (e: React.MouseEvent) => {
    // cards wrap the button in a Link — don't navigate
    e.preventDefault();
    e.stopPropagation();
    if (unavailable) return;
    if (!audioRef.current) {
      const audio = new Audio(soundUrl);
      audio.addEventListener("error", () => {
        setUnavailable(true);
        setPlaying(false);
      });
      audio.addEventListener("ended", () => setPlaying(false));
      audioRef.current = audio;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setUnavailable(true));
    }
  };

  if (unavailable) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause engine sound" : "Play engine sound"}
      title="Engine sound"
      className={cn(
        "group/sound flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500",
        size === "lg" ? "h-14 w-14" : "h-10 w-10",
        playing
          ? "border-gold bg-gold text-ink"
          : "border-gold/50 bg-ink/50 text-gold hover:bg-gold hover:text-ink",
        className
      )}
    >
      {playing ? (
        <span className="flex gap-1">
          <span
            className={cn("bg-current", size === "lg" ? "h-4 w-1" : "h-3 w-[3px]")}
          />
          <span
            className={cn("bg-current", size === "lg" ? "h-4 w-1" : "h-3 w-[3px]")}
          />
        </span>
      ) : (
        <span
          className={cn(
            "ml-0.5 border-y-transparent border-l-current",
            size === "lg"
              ? "border-y-[7px] border-l-[11px]"
              : "border-y-[5px] border-l-[8px]"
          )}
        />
      )}
    </button>
  );
}
