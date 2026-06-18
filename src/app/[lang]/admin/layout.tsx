import Link from "next/link";

import { AdminLogoutButton } from "@/components/admin-logout-button";
import { DumplingMark } from "@/components/art";
import { isLang, type Lang } from "@/lib/content";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const homeLang: Lang = isLang(lang) ? lang : "en";

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <header className="shrink-0 border-b border-[var(--color-ink)]/10 bg-[var(--color-cream)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link
            href={`/${homeLang}/admin`}
            className="flex min-w-0 items-center gap-2.5"
          >
            <DumplingMark className="size-9 shrink-0" />
            <span className="min-w-0 leading-tight">
              <span className="font-display block truncate text-base text-[var(--color-ink)]">
                Menu admin
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-lacquer)]">
                Staff
              </span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={`/${homeLang}/menu`}
              className="text-sm font-bold text-[var(--color-lacquer)] hover:underline"
            >
              View menu →
            </Link>
            <AdminLogoutButton lang={homeLang} />
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
