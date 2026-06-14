"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useLanguage } from "@/lib/use-language";
import { DumplingMark } from "@/components/art";
import { Sidebar } from "@/components/sidebar";

/**
 * Clean, spacious header:
 *   [ burger ] [ logo ]            ............            [ Call to order ]
 *
 * No inline language buttons, no crowded nav row — page navigation and the
 * language selector live in the slide-in <Sidebar />.
 */
export function Nav() {
  const { t } = useI18n();
  const { current } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light contents while sitting over the dark hero; dark once the cream bar shows.
  const onDark = !scrolled;

  return (
    <header
      data-on-dark={onDark}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-cream)]/90 shadow-[0_10px_30px_-18px_rgba(28,14,11,0.5)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
        {/* left cluster: sidebar toggle + logo */}
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Sidebar onDark={onDark} />

          <Link
            href={`/${current}`}
            className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label={restaurant.name}
          >
            <span className="hidden shrink-0 transition-transform duration-500 group-hover:rotate-[14deg] sm:inline">
              <DumplingMark className="size-10" />
            </span>
            <span className="min-w-0 leading-tight">
              <span
                className={`font-display block truncate text-base leading-tight sm:text-lg ${
                  onDark ? "text-[var(--color-cream)]" : "text-[var(--color-ink)]"
                }`}
              >
                {restaurant.name}
              </span>
              <span
                className={`han block truncate text-[0.7rem] tracking-[0.3em] ${
                  onDark
                    ? "text-[var(--color-gold-soft)]"
                    : "text-[var(--color-lacquer)]"
                }`}
              >
                {restaurant.hanzi}
              </span>
            </span>
          </Link>
        </div>

        {/* right: call to order — always visible */}
        <a
          href={restaurant.phoneHref}
          aria-label={t.nav.order}
          className="btn btn-gold h-11 shrink-0 gap-2 px-4 text-sm sm:px-5"
        >
          <PhoneIcon />
          <span className="hidden sm:inline">{t.nav.order}</span>
        </a>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.1 2.2Z" />
    </svg>
  );
}
