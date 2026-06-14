"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "Login failed.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm border border-white/10 bg-charcoal p-10"
      >
        <img
          src="/images/signature.png"
          alt=""
          className="mx-auto h-14 w-auto opacity-60 invert"
        />
        <h1 className="mt-6 text-center font-serif text-2xl text-bone">
          Curator Access
        </h1>
        <p className="mt-2 text-center text-[10px] uppercase tracking-luxe text-bone/40">
          The Lara Collection
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="mt-8 w-full border border-white/15 bg-ink px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-gold"
        />

        {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="gold-button mt-6 w-full disabled:opacity-50"
        >
          {loading ? "Verifying…" : "Enter"}
        </button>
      </motion.form>
    </div>
  );
}
