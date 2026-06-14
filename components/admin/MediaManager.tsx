"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Vehicle } from "@/lib/types";
import UploadField from "./UploadField";

/** Gallery images, extra videos, documents (with AI extraction) and ownership events. */
export default function MediaManager({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function addRow(kind: string, data: Record<string, unknown>) {
    setError(null);
    const res = await fetch(`/api/vehicles/${vehicle.id}/media`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, data }),
    });
    if (res.ok) router.refresh();
    else {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "Save failed.");
    }
  }

  async function removeRow(kind: string, rowId: string) {
    setError(null);
    const res = await fetch(`/api/vehicles/${vehicle.id}/media`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, rowId }),
    });
    if (res.ok) router.refresh();
    else {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "Delete failed.");
    }
  }

  return (
    <div className="space-y-10">
      {error && (
        <p className="border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-400">
          {error}
        </p>
      )}
      <ImagePanel vehicle={vehicle} onAdd={addRow} onRemove={removeRow} />
      <DocumentPanel vehicle={vehicle} onRemove={removeRow} />
      <OwnershipPanel vehicle={vehicle} onAdd={addRow} onRemove={removeRow} />
    </div>
  );
}

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-white/10 pb-2 font-serif text-xl text-gold">
      {children}
    </h2>
  );
}

function ImagePanel({
  vehicle,
  onAdd,
  onRemove,
}: {
  vehicle: Vehicle;
  onAdd: (kind: string, data: Record<string, unknown>) => Promise<void>;
  onRemove: (kind: string, rowId: string) => Promise<void>;
}) {
  const [url, setUrl] = useState("");

  return (
    <section className="space-y-4">
      <PanelTitle>Gallery Images</PanelTitle>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
        {vehicle.images.map((img) => (
          <div key={img.id} className="group relative aspect-[4/3] overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
            <button
              onClick={() => onRemove("image", img.id)}
              className="absolute inset-0 hidden items-center justify-center bg-ink/70 text-xs uppercase tracking-wide2 text-red-400 group-hover:flex"
            >
              Remove
            </button>
          </div>
        ))}
        {vehicle.images.length === 0 && (
          <p className="col-span-full text-sm text-bone/40">No images yet.</p>
        )}
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <UploadField value={url} onChange={setUrl} accept="image/*" resourceType="image" />
        </div>
        <button
          onClick={() => {
            if (!url) return;
            onAdd("image", {
              url,
              alt: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
              sort_order: vehicle.images.length,
              is_primary: vehicle.images.length === 0,
            });
            setUrl("");
          }}
          className="shrink-0 border border-gold/40 px-5 py-2 text-[10px] uppercase tracking-wide2 text-gold hover:bg-gold hover:text-ink"
        >
          Add Image
        </button>
      </div>
    </section>
  );
}

function DocumentPanel({
  vehicle,
  onRemove,
}: {
  vehicle: Vehicle;
  onRemove: (kind: string, rowId: string) => Promise<void>;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("title");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function uploadAndExtract(file: File) {
    setBusy(true);
    setResult(null);
    const form = new FormData();
    form.append("file", file);
    form.append("vehicleId", vehicle.id);
    form.append("title", title || file.name.replace(/\.pdf$/i, ""));
    form.append("category", category);

    const res = await fetch("/api/documents/extract", {
      method: "POST",
      body: form,
    });
    setBusy(false);
    const body = await res.json().catch(() => null);
    if (res.ok) {
      const found = Object.entries(body.extracted ?? {})
        .filter(([, v]) => v != null)
        .map(([k]) => k);
      setResult(
        `Processed (${body.textLength} chars indexed). AI extracted: ${
          found.length ? found.join(", ") : "nothing"
        }.${body.stored ? "" : " Not stored — Supabase/Cloudinary not configured."}`
      );
      router.refresh();
    } else {
      setResult(body?.error ?? "Extraction failed.");
    }
  }

  return (
    <section className="space-y-4">
      <PanelTitle>Documents & AI Extraction</PanelTitle>
      <div className="divide-y divide-white/5">
        {vehicle.documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-bone">{doc.title}</p>
              <p className="text-[10px] uppercase tracking-wide2 text-bone/40">
                {doc.category}
              </p>
            </div>
            <button
              onClick={() => onRemove("document", doc.id)}
              className="text-[11px] uppercase tracking-wide2 text-red-400/70 hover:text-red-400"
            >
              Remove
            </button>
          </div>
        ))}
        {vehicle.documents.length === 0 && (
          <p className="py-2 text-sm text-bone/40">No documents yet.</p>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document title"
          className="border border-white/15 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-gold"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-white/15 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-gold"
        >
          <option value="title">Title</option>
          <option value="registration">Registration</option>
          <option value="insurance">Insurance</option>
          <option value="auction">Auction Results</option>
          <option value="carfax">Carfax</option>
          <option value="service">Service Records</option>
          <option value="other">Other</option>
        </select>
        <label className="cursor-pointer border border-gold/40 px-5 py-2 text-center text-[10px] uppercase leading-relaxed tracking-wide2 text-gold hover:bg-gold hover:text-ink">
          {busy ? "Extracting…" : "Upload PDF + Extract"}
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadAndExtract(f);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {result && <p className="text-xs text-gold/80">{result}</p>}
    </section>
  );
}

function OwnershipPanel({
  vehicle,
  onAdd,
  onRemove,
}: {
  vehicle: Vehicle;
  onAdd: (kind: string, data: Record<string, unknown>) => Promise<void>;
  onRemove: (kind: string, rowId: string) => Promise<void>;
}) {
  const [label, setLabel] = useState("");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState("");

  return (
    <section className="space-y-4">
      <PanelTitle>Ownership History</PanelTitle>
      <div className="divide-y divide-white/5">
        {vehicle.ownershipHistory.map((event) => (
          <div key={event.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-bone">
                {event.label}
                <span className="ml-3 text-gold/70">{event.date}</span>
              </p>
              {event.detail && (
                <p className="text-xs text-bone/40">{event.detail}</p>
              )}
            </div>
            <button
              onClick={() => onRemove("ownership", event.id)}
              className="text-[11px] uppercase tracking-wide2 text-red-400/70 hover:text-red-400"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Event (e.g. Second Owner)"
          className="border border-white/15 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-gold"
        />
        <input
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Detail (optional)"
          className="border border-white/15 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-gold"
        />
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date / year"
          className="w-32 border border-white/15 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-gold"
        />
        <button
          onClick={() => {
            if (!label || !date) return;
            onAdd("ownership", {
              label,
              detail: detail || null,
              date,
              sort_order: vehicle.ownershipHistory.length,
            });
            setLabel("");
            setDetail("");
            setDate("");
          }}
          className="border border-gold/40 px-5 py-2 text-[10px] uppercase tracking-wide2 text-gold hover:bg-gold hover:text-ink"
        >
          Add
        </button>
      </div>
    </section>
  );
}
