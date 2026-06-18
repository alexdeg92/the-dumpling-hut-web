"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useI18n } from "@/lib/i18n";

export function AdminLoginForm() {
  const { lang } = useI18n();
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);
    if (!res.ok) {
      setError("Wrong username or password.");
      return;
    }

    router.push(`/${lang}/admin`);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4">
      <div>
        <label htmlFor="username" className="eyebrow text-[var(--color-lacquer)]">
          Username
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[var(--color-ink)]/15 bg-white/80 px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-gold)]"
        />
      </div>
      <div>
        <label htmlFor="password" className="eyebrow text-[var(--color-lacquer)]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[var(--color-ink)]/15 bg-white/80 px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-gold)]"
        />
      </div>
      {error && <p className="text-sm font-semibold text-[var(--color-lacquer)]">{error}</p>}
      <button type="submit" disabled={loading} className="btn btn-gold h-12 w-full text-sm">
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
