"use client";

import { usePathname, useRouter } from "next/navigation";

import type { Lang } from "@/lib/content";

export function AdminLogoutButton({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname.endsWith("/admin/login");

  if (isLogin) return null;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push(`/${lang}/admin/login`);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="h-10 shrink-0 rounded-full border border-[var(--color-ink)]/15 px-4 text-sm font-bold text-[var(--color-lacquer)] transition hover:border-[var(--color-lacquer)] hover:bg-[var(--color-cream-2)]/80"
    >
      Log out
    </button>
  );
}
