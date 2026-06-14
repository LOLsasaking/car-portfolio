"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/brands/mercedes", label: "Mercedes-Benz" },
  { href: "/brands/porsche", label: "Porsche" },
  { href: "/brands/ferrari", label: "Ferrari" },
  { href: "/timeline", label: "Timeline" },
  { href: "/compare", label: "Compare" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        scrolled
          ? "border-b border-white/5 bg-ink/85 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-serif text-xl tracking-wide2 text-bone transition-colors group-hover:text-gold md:text-2xl">
            LARA
          </span>
          <span className="hidden text-[10px] uppercase tracking-luxe text-bone/50 sm:block">
            Collection
          </span>
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-[11px] uppercase tracking-wide2 transition-colors duration-300",
                  pathname === link.href
                    ? "text-gold"
                    : "text-bone/60 hover:text-bone"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-bone transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-bone transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/5 bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <ul className="space-y-1 px-6 py-6">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 font-serif text-2xl",
                      pathname === link.href ? "text-gold" : "text-bone/80"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
