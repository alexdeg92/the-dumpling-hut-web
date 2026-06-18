import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin-login-form";
import { DumplingMark } from "@/components/art";
import { isAdminSession } from "@/lib/admin-session";
import { isLang, languages } from "@/lib/content";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) redirect("/en/admin/login");

  if (await isAdminSession()) {
    redirect(`/${lang}/admin`);
  }

  return (
    <section className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[var(--color-ink)]/10 bg-white/80 shadow-[0_30px_70px_-40px_rgba(28,14,11,0.5)]">
        <div className="bg-[var(--color-lacquer)] px-8 py-8 text-center text-[var(--color-cream)]">
          <DumplingMark className="mx-auto size-14" />
          <p className="eyebrow mt-4 text-[var(--color-gold-soft)]">Staff</p>
          <h1 className="font-display mt-2 text-3xl">Sign in</h1>
        </div>
        <div className="px-8 py-8">
          <AdminLoginForm />
          <Link
            href={`/${lang}/menu`}
            className="mt-6 block text-center text-sm font-semibold text-[var(--color-lacquer)] hover:underline"
          >
            ← Back to menu
          </Link>
        </div>
      </div>
    </section>
  );
}
