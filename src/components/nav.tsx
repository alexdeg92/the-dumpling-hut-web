"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useLanguage } from "@/lib/use-language";
import { DumplingMark } from "@/components/art";
import { Sidebar } from "@/components/sidebar";
import { useOrderModal } from "@/components/order-modal";

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
  const { open } = useOrderModal();
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

        {/* right: order now — opens the delivery picker, always visible */}
        <button
          type="button"
          onClick={open}
          aria-label={t.order.cta}
          className="btn btn-gold h-11 shrink-0 gap-2 px-4 text-sm sm:px-5"
        >
          <BagIcon />
          <span className="hidden sm:inline">{t.order.cta}</span>
        </button>
      </div>
    </header>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M7 4h10l1 3H6l1-3Zm-1.5 5h13l-.9 9.2A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-2-1.8L5.5 9Zm4 3a2.5 2.5 0 0 0 5 0h-1.5a1 1 0 0 1-2 0H9.5Z" />
    </svg>
  );
}
