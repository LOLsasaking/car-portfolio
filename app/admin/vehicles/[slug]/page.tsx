import { notFound } from "next/navigation";
import { getVehicleBySlug } from "@/lib/data";
import { supabaseConfigured } from "@/lib/supabase/server";
import VehicleForm from "@/components/admin/VehicleForm";
import MediaManager from "@/components/admin/MediaManager";

export const dynamic = "force-dynamic";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const dbReady = supabaseConfigured();

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl text-bone">
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h1>
      <p className="mb-8 text-xs text-bone/40">/{vehicle.slug}</p>

      {!dbReady && (
        <div className="mb-8 border border-gold/30 bg-gold/5 p-4 text-xs text-gold/90">
          Read-only — configure Supabase to enable saving.
        </div>
      )}

      <VehicleForm vehicle={vehicle} />

      <div className="mt-16 border-t border-white/10 pt-10">
        <MediaManager vehicle={vehicle} />
      </div>
    </div>
  );
}
