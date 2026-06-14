"use client";

import { useState } from "react";

/**
 * URL input with optional direct-to-Cloudinary upload.
 * Falls back to manual URL paste when Cloudinary isn't configured.
 */
export default function UploadField({
  value,
  onChange,
  accept = "image/*",
  resourceType = "image",
  placeholder = "https:// … or upload",
}: {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  resourceType?: "image" | "video" | "raw";
  placeholder?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const signRes = await fetch("/api/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "lara-collection" }),
      });
      if (!signRes.ok) {
        const body = await signRes.json().catch(() => null);
        throw new Error(body?.error ?? "Upload signing failed.");
      }
      const sign = await signRes.json();

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sign.apiKey);
      form.append("timestamp", String(sign.timestamp));
      form.append("signature", sign.signature);
      form.append("folder", sign.folder);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sign.cloudName}/${resourceType}/upload`,
        { method: "POST", body: form }
      );
      if (!cloudRes.ok) throw new Error("Cloudinary upload failed.");
      const data = await cloudRes.json();
      onChange(data.secure_url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-white/15 bg-ink px-3 py-2 text-sm text-bone outline-none focus:border-gold"
        />
        <label className="shrink-0 cursor-pointer border border-gold/40 px-4 py-2 text-[10px] uppercase tracking-wide2 text-gold transition-colors hover:bg-gold hover:text-ink">
          {busy ? "Uploading…" : "Upload"}
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
