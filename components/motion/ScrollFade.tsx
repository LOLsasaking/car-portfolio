"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-driven presence: the section fades/lifts in as it enters the
 * viewport and dissolves as it leaves — opacity follows the scrollbar
 * in both directions instead of firing once.
 */
export default function ScrollFade({
  children,
  scale = false,
  className,
}: {
  children: React.ReactNode;
  scale?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.55", "end 0.45", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.35], [48, 0]);
  const s = useTransform(scrollYProgress, [0, 0.35], scale ? [0.92, 1] : [1, 1]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale: s }} className={className}>
      {children}
    </motion.div>
  );
}
