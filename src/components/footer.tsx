"use client";

import Link from "next/link";
import {
  deliveryPlatforms,
  languageLabels,
  languages,
  navItems,
  restaurant,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { storeLanguage } from "@/lib/use-language";
import { DumplingMark, Seal } from "@/components/art";
import { DeliveryPlatformLogo } from "@/components/delivery-platform-logo";

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-16 overflow-hidden bg-[var(--color-ink)] text-[var(--color-cream)] sm:mt-24">
      <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-[var(--color-lacquer)] opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-14 md:grid md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 lg:gap-12">
        {/* brand + order */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <DumplingMark className="size-9 shrink-0 sm:size-12" />
              <div className="min-w-0">
                <p className="font-display truncate text-lg sm:text-2xl">{restaurant.name}</p>
                <p className="han truncate text-[0.65rem] tracking-[0.25em] text-[var(--color-gold)] sm:text-sm sm:tracking-[0.3em]">
                  {restaurant.hanzi}
                </p>
              </div>
            </div>
            <a
              href={restaurant.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--color-cream)]/20 transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] sm:hidden"
              aria-label="Instagram"
            >
              <IgIcon />
            </a>
          </div>

          <p className="mt-2 max-w-xs text-xs leading-5 text-[var(--color-cream)]/65 sm:mt-4 sm:text-sm sm:leading-7 sm:text-[var(--color-cream)]/70">
            {t.footer.built}
          </p>

          <div className="mt-3 hidden gap-3 sm:mt-6 sm:flex">
            <a
              href={restaurant.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-full border border-[var(--color-cream)]/20 transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              aria-label="Instagram"
            >
              <IgIcon />
            </a>
          </div>

          <p className="eyebrow mb-2 mt-4 text-[var(--color-gold)] sm:mb-3 sm:mt-8">
            {t.order.footerTitle}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            {deliveryPlatforms.map((p) => (
              <a
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Order on ${p.name}`}
                className="flex h-9 w-fit items-center transition-opacity hover:opacity-85 sm:h-10"
              >
                <DeliveryPlatformLogo
                  platform={p}
                  className={`shrink-0 ${p.logoClassName}${p.key === "ubereats" ? " -translate-y-px" : ""}`}
                  forFooter
                />
              </a>
            ))}
          </div>
        </div>

        {/* contact — side by side on mobile */}
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1 text-xs leading-5 text-[var(--color-cream)]/75 sm:mt-0 sm:block sm:text-sm sm:leading-8">
          <div>
            <p className="eyebrow mb-1 text-[var(--color-gold)] sm:mb-2">{t.common.address}</p>
            <a
              href={restaurant.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="block hover:text-[var(--color-gold)]"
            >
              {restaurant.address}
            </a>
          </div>
          <div className="sm:mt-5">
            <p className="eyebrow mb-1 text-[var(--color-gold)] sm:mb-2">{t.common.phone}</p>
            <a href={restaurant.phoneHref} className="hover:text-[var(--color-gold)]">
              {restaurant.phone}
            </a>
          </div>
        </div>

        {/* nav + lang — horizontal on mobile */}
        <div className="mt-5 text-xs text-[var(--color-cream)]/75 sm:mt-0 sm:text-sm sm:leading-8">
          <p className="eyebrow mb-2 hidden text-[var(--color-gold)] sm:block">{t.nav.menu}</p>
          <nav className="flex flex-wrap gap-x-3 gap-y-1 sm:block" aria-label="Footer">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${lang}/${item.href}`}
                className="font-semibold hover:text-[var(--color-gold)] sm:block sm:font-normal"
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex gap-2 sm:mt-5">
            {languages.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                onClick={() => storeLanguage(l)}
                className={
                  l === lang
                    ? "font-extrabold text-[var(--color-gold)]"
                    : "hover:text-[var(--color-gold)]"
                }
              >
                {languageLabels[l]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-[var(--color-cream)]/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 text-[0.65rem] text-[var(--color-cream)]/50 sm:gap-4 sm:py-6 sm:text-xs md:px-8">
          <div className="min-w-0 space-y-0.5 sm:space-y-0">
            <p className="truncate">
              © {year} {restaurant.name}. {t.footer.rights}
            </p>
            <p className="truncate sm:hidden">{t.footer.tag}</p>
          </div>
          <p className="hidden shrink-0 sm:block">{t.footer.tag}</p>
          <Seal text="鲜" className="size-8 shrink-0 text-[0.75rem] sm:size-10 sm:text-[0.85rem]" />
        </div>
        <div className="border-t border-[var(--color-cream)]/5 px-5 py-3 text-center md:px-8">
          <Link
            href={`/${lang}/admin/login`}
            className="text-[0.65rem] font-semibold text-[var(--color-cream)]/40 transition hover:text-[var(--color-gold)] sm:text-xs"
          >
            Staff login
          </Link>
        </div>
      </div>
    </footer>
  );
}

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 sm:size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
