"use client";

import Link from "next/link";
import { languageLabels, languages, navItems, restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { storeLanguage } from "@/lib/use-language";
import { DumplingMark, Seal } from "@/components/art";

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-24 overflow-hidden bg-[var(--color-ink)] text-[var(--color-cream)]">
      <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-[var(--color-lacquer)] opacity-40 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <DumplingMark className="size-12" />
            <div>
              <p className="font-display text-2xl">{restaurant.name}</p>
              <p className="han text-sm tracking-[0.3em] text-[var(--color-gold)]">
                {restaurant.hanzi}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--color-cream)]/70">
            {t.footer.built}
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={restaurant.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-full border border-[var(--color-cream)]/20 transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              aria-label="Instagram"
            >
              <IgIcon />
            </a>
            <a
              href={restaurant.tiktokHref}
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-full border border-[var(--color-cream)]/20 transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              aria-label="TikTok"
            >
              <TkIcon />
            </a>
          </div>
        </div>

        <div className="text-sm leading-8 text-[var(--color-cream)]/75">
          <p className="eyebrow mb-2 text-[var(--color-gold)]">{t.common.address}</p>
          <a href={restaurant.mapsHref} target="_blank" rel="noreferrer" className="block hover:text-[var(--color-gold)]">
            {restaurant.address}
          </a>
          <p className="eyebrow mb-2 mt-5 text-[var(--color-gold)]">{t.common.phone}</p>
          <a href={restaurant.phoneHref} className="hover:text-[var(--color-gold)]">
            {restaurant.phone}
          </a>
        </div>

        <div className="text-sm leading-8 text-[var(--color-cream)]/75">
          <p className="eyebrow mb-2 text-[var(--color-gold)]">{t.nav.menu}</p>
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${lang}/${item.href}`}
              className="block hover:text-[var(--color-gold)]"
            >
              {t.nav[item.key]}
            </Link>
          ))}
          <div className="mt-5 flex gap-2">
            {languages.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                onClick={() => storeLanguage(l)}
                className={l === lang ? "font-extrabold text-[var(--color-gold)]" : "hover:text-[var(--color-gold)]"}
              >
                {languageLabels[l]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-[var(--color-cream)]/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-[var(--color-cream)]/50 sm:flex-row sm:px-8">
          <p>
            © {year} {restaurant.name}. {t.footer.rights}
          </p>
          <p>{t.footer.tag}</p>
          <Seal text="鲜" className="size-10 text-[0.85rem]" />
        </div>
      </div>
    </footer>
  );
}

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
      <path d="M16.5 3c.3 2 1.6 3.6 3.5 4v2.4c-1.3 0-2.5-.4-3.5-1v5.6a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.6a3 3 0 1 0 2.1 2.8V3h2.5Z" />
    </svg>
  );
}
