"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  languageLabels,
  languages,
  navItems,
  restaurant,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { DumplingMark } from "@/components/art";

export function Nav() {
  const { lang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // when the header sits over the dark hero (not scrolled and drawer closed)
  // its contents must be light; once the cream bar appears, switch to dark ink.
  const onDark = !scrolled && !open;

  return (
    <header
      data-on-dark={onDark}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-[var(--color-cream)]/90 shadow-[0_10px_30px_-18px_rgba(28,14,11,0.5)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8 sm:py-3.5">
        <Link
          href={`/${lang}`}
          className="group flex min-w-0 shrink items-center gap-2 sm:gap-3"
          aria-label={restaurant.name}
        >
          <span className="shrink-0 transition-transform duration-500 group-hover:rotate-[14deg]">
            <DumplingMark className="size-9 sm:size-11" />
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
                onDark ? "text-[var(--color-gold-soft)]" : "text-[var(--color-lacquer)]"
              }`}
            >
              {restaurant.hanzi}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${lang}/${item.href}`}
              className={`group relative rounded-full px-4 py-2 text-sm font-bold transition hover:text-[var(--color-gold)] ${
                onDark ? "text-[var(--color-cream)]/85" : "text-[var(--color-ink)]/80"
              }`}
            >
              {t.nav[item.key]}
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-[var(--color-gold)] transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LangSwitcher onDark={onDark} />
          <a
            href={restaurant.phoneHref}
            className="btn btn-gold !hidden h-10 px-5 text-sm sm:!inline-flex"
          >
            {t.nav.order}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menuOpen}
            aria-expanded={open}
            className={`grid size-10 shrink-0 place-items-center rounded-full border md:hidden ${
              onDark
                ? "border-[var(--color-cream)]/30 bg-[var(--color-cream)]/10"
                : "border-[var(--color-ink)]/15 bg-[var(--color-cream)]/70"
            }`}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded transition ${
                  onDark ? "bg-[var(--color-cream)]" : "bg-[var(--color-ink)]"
                } ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 w-5 rounded transition ${
                  onDark ? "bg-[var(--color-cream)]" : "bg-[var(--color-ink)]"
                } ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`grid gap-1 overflow-hidden bg-[var(--color-cream)] px-5 transition-all duration-400 ${
            open ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${lang}/${item.href}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-bold text-[var(--color-ink)] hover:bg-[var(--color-cream-2)]"
            >
              {t.nav[item.key]}
            </Link>
          ))}
          <a
            href={restaurant.phoneHref}
            className="btn btn-gold mt-2"
            onClick={() => setOpen(false)}
          >
            {t.nav.order}
          </a>
        </div>
      </div>
    </header>
  );
}

function LangSwitcher({ onDark = false }: { onDark?: boolean }) {
  const { lang } = useI18n();
  return (
    <div
      className={`flex shrink-0 rounded-full border p-0.5 backdrop-blur ${
        onDark
          ? "border-[var(--color-cream)]/25 bg-[var(--color-ink)]/25"
          : "border-[var(--color-ink)]/12 bg-[var(--color-cream)]/70"
      }`}
      aria-label="Language"
    >
      {languages.map((l) => {
        const active = l === lang;
        const inactive = onDark
          ? "text-[var(--color-cream)]/70 hover:text-[var(--color-gold-soft)]"
          : "text-[var(--color-ink)]/55 hover:text-[var(--color-lacquer)]";
        return (
          <Link
            key={l}
            href={`/${l}`}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-extrabold leading-none transition ${
              active
                ? "bg-[var(--color-lacquer)] text-[var(--color-cream)] shadow"
                : inactive
            }`}
          >
            {languageLabels[l]}
          </Link>
        );
      })}
    </div>
  );
}
