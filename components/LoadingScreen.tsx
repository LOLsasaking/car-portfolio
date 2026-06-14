"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "lara-loaded-at";
const REPLAY_AFTER_MS = 12 * 60 * 60 * 1000; // show again after 12h away

/**
 * Cinematic entry screen: owner's signature draws in over a progress bar,
 * then the curtain lifts. Plays on arrival — not on every refresh.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lastShown = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    if (Date.now() - lastShown < REPLAY_AFTER_MS) return;
    setVisible(true);
    document.body.style.overflow = "hidden";

    let value = 0;
    const interval = setInterval(() => {
      // ease toward 100 with organic increments
      value = Math.min(value + Math.random() * 16 + 6, 100);
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
          document.body.style.overflow = "";
          setVisible(false);
        }, 700);
      }
    }, 220);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.img
            src="/images/signature.png"
            alt="Owner's signature"
            className="w-56 select-none invert md:w-72"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(6px) invert(1)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px) invert(1)" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            draggable={false}
          />

          <motion.p
            className="mt-6 text-[10px] uppercase tracking-luxe text-bone/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            The Lara Collection
          </motion.p>

          <div className="mt-10 h-px w-48 overflow-hidden bg-white/10 md:w-64">
            <motion.div
              className="h-full bg-gold"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>

          <motion.span
            className="mt-3 text-xs tabular-nums tracking-wide2 text-bone/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-display text-lg text-gold">
              {Math.round(progress)}
            </span>{" "}
            <span className="text-[10px] uppercase">mph</span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
