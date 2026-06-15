"use client";

import Link from "next/link";
import { restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { Lantern } from "@/components/art";
import { SteamerBasket } from "@/components/steamer-basket";

export function Hero() {
  const { lang, t } = useI18n();
  const h = t.hero;

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-ink)] pb-20 pt-28 text-[var(--color-cream)] sm:pt-32">
      {/* warm glow field */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[60rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[var(--color-lacquer)] opacity-50 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 size-[34rem] rounded-full bg-[var(--color-gold)] opacity-20 blur-[120px]" />
      </div>

      {/* hanging lanterns */}
      <Lantern className="absolute left-[8%] top-0 hidden lg:block" delay={0} />
      <Lantern className="absolute right-[12%] top-0 hidden lg:block" delay={1.8} />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-cream)]/5 px-4 py-1.5 text-xs font-bold tracking-wide text-[var(--color-gold-soft)]">
            <span className="size-1.5 rounded-full bg-[var(--color-gold)]" />
            {h.tag}
          </span>

          <h1 className="font-display mt-6 text-balance text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.98]">
            <span className="block text-[var(--color-gold-soft)]">{h.lead}</span>
            <span className="block">{h.title}</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-[var(--color-cream)]/75 sm:text-lg">
            {h.sub}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${lang}/menu`} className="btn btn-gold">
              {h.ctaMenu}
            </Link>
            <Link
              href={`/${lang}/location`}
              className="btn btn-ghost border-[var(--color-cream)]/35 text-[var(--color-cream)]"
            >
              {h.ctaVisit}
            </Link>
          </div>

          <a
            href={restaurant.instagramHref}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-cream)]/60 transition hover:text-[var(--color-gold)]"
          >
            <span className="grid size-7 place-items-center rounded-full border border-current">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            {restaurant.instagram}
          </a>
        </div>

        {/* steamer */}
        <div className="relative mx-auto w-full max-w-md">
          <SteamerBasket className="w-full drop-shadow-2xl" />
        </div>
      </div>

      {/* scroll cue */}
      <div className="mx-auto mt-14 flex max-w-6xl items-center gap-3 px-5 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-cream)]/45 sm:px-8">
        <span className="h-px w-10 bg-[var(--color-cream)]/30" />
        {h.scroll}
        <span className="animate-bounce">↓</span>
      </div>
    </section>
  );
}
