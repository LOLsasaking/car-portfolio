"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-white/5 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-serif text-3xl text-bone">
              The Lara Collection
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-bone/50">
              A private collection of exceptional Mercedes-Benz, Porsche and
              Ferrari automobiles, spanning 1958 to 2024.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { href: "/brands/mercedes", label: "Mercedes-Benz" },
              { href: "/brands/porsche", label: "Porsche" },
              { href: "/brands/ferrari", label: "Ferrari" },
              { href: "/timeline", label: "Timeline" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] uppercase tracking-wide2 text-bone/50 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p
          aria-hidden
          className="mt-12 select-none text-center font-cars text-6xl leading-none text-bone/20 md:text-7xl"
        >
          abcdef
        </p>

        <div className="mt-6 hairline" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[11px] uppercase tracking-wide2 text-bone/30 md:flex-row">
          <p>© {new Date().getFullYear()} The Lara Collection. Private collection — not a dealership.</p>
          <img
            src="/images/signature.png"
            alt="Owner's signature"
            className="h-10 w-auto opacity-40 invert"
          />
        </div>
      </div>
    </footer>
  );
}
