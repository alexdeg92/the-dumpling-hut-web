"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Menu hides its dark PageHeader on mobile, so the nav sits on cream paper.
  const overDarkHero = !pathname.includes("/menu") || wide;
  const onDark = !scrolled && overDarkHero;
  const solidBar = scrolled || !overDarkHero;

  return (
    <header
      data-on-dark={onDark}
      className={`fixed inset-x-0 top-0 z-50 w-full overflow-x-clip transition-all duration-500 ${
        solidBar
          ? "bg-[var(--color-cream)]/90 shadow-[0_10px_30px_-18px_rgba(28,14,11,0.5)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
        {/* left cluster: sidebar toggle + logo */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <Sidebar onDark={onDark} />

          <Link
            href={`/${current}`}
            className="group flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3"
            aria-label={restaurant.name}
          >
            <span
              className={`hidden shrink-0 transition-transform duration-500 group-hover:rotate-[14deg] sm:inline ${
                onDark ? "text-[var(--color-cream)]" : "text-[var(--color-ink)]"
              }`}
            >
              <DumplingMark className="size-10" />
            </span>
            <span className="min-w-0 leading-tight">
              <span
                className={`font-display block text-pretty text-base leading-tight sm:text-lg ${
                  onDark ? "text-[var(--color-cream)]" : "text-[var(--color-ink)]"
                }`}
              >
                {restaurant.name}
              </span>
              <span
                className={`han block text-[0.7rem] tracking-[0.3em] ${
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
          <span className="sm:hidden">{t.order.ctaShort}</span>
          <span className="hidden sm:inline">{t.order.cta}</span>
        </button>
      </div>
    </header>
  );
}
