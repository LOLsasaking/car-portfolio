import Link from "next/link";
import { getStats, getVehicles } from "@/lib/data";
import { supabaseConfigured } from "@/lib/supabase/server";
import { formatMileage } from "@/lib/utils";
import DeleteVehicleButton from "@/components/admin/DeleteVehicleButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [vehicles, stats] = await Promise.all([getVehicles(), getStats()]);
  const dbReady = supabaseConfigured();

  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl text-bone">The Garage</h1>
          <p className="mt-1 text-xs text-bone/40">
            {stats.totalVehicles} vehicles · {stats.oldestYear}–{stats.newestYear}
          </p>
        </div>
        <Link href="/admin/vehicles/new" className="gold-button !px-6 !py-3">
          + Add Vehicle
        </Link>
      </div>

      {!dbReady && (
        <div className="mt-6 border border-gold/30 bg-gold/5 p-4 text-xs leading-relaxed text-gold/90">
          Supabase is not configured — the site is serving the built-in seed
          collection (read-only). Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>,
          run the migration in <code>supabase/migrations</code>, and editing
          will activate.
        </div>
      )}

      <div className="mt-8 overflow-x-auto border border-white/10">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-charcoal text-[10px] uppercase tracking-wide2 text-bone/40">
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Colour</th>
              <th className="px-4 py-3">Mileage</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr
                key={v.id}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
              >
                <td className="px-4 py-3 font-serif text-gold">{v.year}</td>
                <td className="px-4 py-3 text-bone">
                  {v.make} {v.model}
                </td>
                <td className="px-4 py-3 text-bone/60">{v.color}</td>
                <td className="px-4 py-3 text-bone/60">
                  {formatMileage(v.mileage)}
                </td>
                <td className="px-4 py-3">
                  {v.featured ? (
                    <span className="text-gold">★ {v.featuredOrder ?? ""}</span>
                  ) : (
                    <span className="text-bone/25">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/vehicles/${v.slug}`}
                      className="text-[11px] uppercase tracking-wide2 text-bone/50 hover:text-bone"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/vehicles/${v.slug}`}
                      className="text-[11px] uppercase tracking-wide2 text-gold/80 hover:text-gold"
                    >
                      Edit
                    </Link>
                    <DeleteVehicleButton
                      vehicleId={v.id}
                      name={`${v.year} ${v.make} ${v.model}`}
                      disabled={!dbReady}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
