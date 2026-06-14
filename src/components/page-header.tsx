"use client";

import { SteamColumn } from "@/components/art";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] pb-12 pt-28 text-[var(--color-cream)] sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-lacquer)] opacity-50 blur-[110px]" />
      </div>
      <SteamColumn className="absolute left-1/2 top-16 h-28 w-40 -translate-x-1/2" />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="eyebrow text-[var(--color-gold-soft)]">{eyebrow}</p>
        <h1 className="font-display mt-4 text-balance text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.02]">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty leading-7 text-[var(--color-cream)]/75">
          {lead}
        </p>
      </div>
    </section>
  );
}
