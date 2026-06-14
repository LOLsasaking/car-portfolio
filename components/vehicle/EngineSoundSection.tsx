"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";

const BAR_COUNT = 36;

export default function EngineSoundSection({
  soundUrl,
  title,
}: {
  soundUrl: string | null;
  title: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  if (!soundUrl) return null;

  const toggle = () => {
    if (unavailable) return;
    if (!audioRef.current) {
      const audio = new Audio(soundUrl);
      audio.preload = "auto";
      audio.addEventListener("error", () => {
        setUnavailable(true);
        setPlaying(false);
      });
      audio.addEventListener("ended", () => {
        setPlaying(false);
        setProgress(0);
      });
      audio.addEventListener("timeupdate", () => {
        if (audio.duration) setProgress(audio.currentTime / audio.duration);
      });
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

  return (
    <section className="border-y border-white/5 bg-charcoal">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <Reveal>
          <p className="eyebrow">Listen</p>
          <h2 className="heading-md mt-4 text-bone">Start-Up &amp; Rev</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-bone/50">
            The {title} as it sounds in the garage — cold start, idle, and a
            run through the revs.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex items-center gap-8 border border-white/10 bg-ink/40 p-8 md:p-10">
            <button
              onClick={toggle}
              aria-label={playing ? "Pause engine sound" : "Play engine sound"}
              disabled={unavailable}
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border transition-all duration-500 md:h-20 md:w-20 ${
                unavailable
                  ? "cursor-not-allowed border-white/10 text-bone/20"
                  : "border-gold/50 text-gold hover:bg-gold hover:text-ink"
              }`}
            >
              {playing ? (
                <span className="flex gap-1.5">
                  <span className="h-5 w-1.5 bg-current" />
                  <span className="h-5 w-1.5 bg-current" />
                </span>
              ) : (
                <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-current" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              {unavailable ? (
                <p className="text-[11px] uppercase tracking-wide2 text-bone/40">
                  Recording coming soon
                </p>
              ) : (
                <>
                  {/* waveform */}
                  <div className="flex h-12 items-end gap-1 md:h-16">
                    {Array.from({ length: BAR_COUNT }).map((_, i) => {
                      const base =
                        0.25 +
                        0.65 *
                          Math.abs(
                            Math.sin(i * 0.9) * Math.cos(i * 0.37)
                          );
                      const reached = i / BAR_COUNT <= progress;
                      return (
                        <span
                          key={i}
                          style={{
                            height: `${base * 100}%`,
                            animationDelay: `${(i % 6) * 0.12}s`,
                          }}
                          className={`w-full origin-bottom transition-colors duration-300 ${
                            playing ? "animate-pulse" : ""
                          } ${reached && progress > 0 ? "bg-gold" : "bg-bone/15"}`}
                        />
                      );
                    })}
                  </div>
                  <p className="mt-4 text-[10px] uppercase tracking-luxe text-bone/40">
                    {playing ? "Playing — engine audio" : "Engine audio · tap to play"}
                  </p>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
