"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-white/10 bg-charcoal">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="font-serif text-lg text-bone">
            LARA <span className="text-[10px] uppercase tracking-luxe text-gold">Curator</span>
          </Link>
          <nav className="flex gap-6">
            {[
              { href: "/admin", label: "Garage" },
              { href: "/admin/vehicles/new", label: "Add Vehicle" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[11px] uppercase tracking-wide2 transition-colors",
                  pathname === l.href ? "text-gold" : "text-bone/50 hover:text-bone"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-[11px] uppercase tracking-wide2 text-bone/50 hover:text-bone"
          >
            View Site
          </Link>
          <button
            onClick={logout}
            className="text-[11px] uppercase tracking-wide2 text-bone/50 transition-colors hover:text-gold"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
