"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteVehicleButton({
  vehicleId,
  name,
  disabled,
}: {
  vehicleId: string;
  name: string;
  disabled?: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm(`Delete ${name} from the collection? This cannot be undone.`))
      return;
    setBusy(true);
    const res = await fetch(`/api/vehicles/${vehicleId}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
    else {
      const body = await res.json().catch(() => null);
      alert(body?.error ?? "Delete failed.");
    }
  }

  return (
    <button
      onClick={remove}
      disabled={disabled || busy}
      title={disabled ? "Requires Supabase" : undefined}
      className="text-[11px] uppercase tracking-wide2 text-red-400/70 transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {busy ? "…" : "Delete"}
    </button>
  );
}
