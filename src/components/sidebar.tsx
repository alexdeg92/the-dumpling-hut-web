"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { languageLabels, navItems, restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useLanguage } from "@/lib/use-language";
import { DumplingMark } from "@/components/art";
import { useOrderModal } from "@/components/order-modal";

/**
 * Sidebar navigation: a burger toggle (meant to sit at the left of the header),
 * plus a slide-in panel containing every page link, a language selector and a
 * close button. On mobile the panel covers the screen; on desktop it's a fixed
 * side panel that overlays content rather than pushing it.
 */
export function Sidebar({ onDark = false }: { onDark?: boolean }) {
  const { t } = useI18n();
  const { open: openOrder } = useOrderModal();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while the panel is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const drawer = (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[110] bg-[var(--color-ink)]/55 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="site-sidebar"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`fixed inset-y-0 left-0 z-[111] flex w-full max-w-[22rem] flex-col bg-[var(--color-cream)] shadow-[24px_0_60px_-30px_rgba(28,14,11,0.6)] transition-transform duration-400 ease-[var(--ease-soft)] sm:max-w-sm ${
          open ? "translate-x-0" : "pointer-events-none -translate-x-full"
        }`}
      >
        {/* panel header: brand + close */}
        <div className="flex items-center justify-between gap-3 border-b border-[var(--color-ink)]/10 px-6 py-5">
          <Link
            href="/"
            onClick={close}
            className="flex min-w-0 items-center gap-2.5"
            aria-label={restaurant.name}
          >
            <DumplingMark className="size-9 shrink-0" />
            <span className="min-w-0 leading-tight">
              <span className="font-display block truncate text-base text-[var(--color-ink)]">
                {restaurant.name}
              </span>
              <span className="han block truncate text-[0.7rem] tracking-[0.3em] text-[var(--color-lacquer)]">
                {restaurant.hanzi}
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label={t.nav.close}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--color-ink)]/15 text-[var(--color-ink)] transition hover:bg-[var(--color-cream-2)]"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Site">
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <SidebarLink href={item.href} onClick={close}>
                  {t.nav[item.key]}
                </SidebarLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[var(--color-ink)]/10 px-6 py-6">
          <LanguageSelect />
          <button
            type="button"
            onClick={() => {
              close();
              openOrder();
            }}
            className="btn btn-gold mt-5 h-12 w-full text-sm"
          >
            <BagIcon />
            {t.order.cta}
          </button>
        </div>
      </aside>
    </>
  );

  return (
    <>
      {/* burger toggle — lives at the left edge of the header */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.nav.menuOpen}
        aria-expanded={open}
        aria-controls="site-sidebar"
        className={`relative z-[112] grid size-11 shrink-0 place-items-center rounded-full border transition ${
          onDark
            ? "border-[var(--color-cream)]/30 bg-[var(--color-cream)]/10 hover:bg-[var(--color-cream)]/20"
            : "border-[var(--color-ink)]/15 bg-[var(--color-cream)]/70 hover:bg-[var(--color-cream)]"
        }`}
      >
        <span className="relative block h-3.5 w-5">
          <span
            className={`absolute left-0 top-0 h-0.5 w-5 rounded ${
              onDark ? "bg-[var(--color-cream)]" : "bg-[var(--color-ink)]"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded ${
              onDark ? "bg-[var(--color-cream)]" : "bg-[var(--color-ink)]"
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-5 rounded ${
              onDark ? "bg-[var(--color-cream)]" : "bg-[var(--color-ink)]"
            }`}
          />
        </span>
      </button>

      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}

/** A single sidebar nav link, language-aware via the active route. */
function SidebarLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const { current } = useLanguage();
  return (
    <Link
      href={`/${current}/${href}`}
      onClick={onClick}
      className="block rounded-2xl px-4 py-3.5 text-lg font-bold text-[var(--color-ink)] transition hover:bg-[var(--color-cream-2)] hover:text-[var(--color-lacquer)]"
    >
      {children}
    </Link>
  );
}

/** Language dropdown — persists the choice and navigates, keeping the page. */
function LanguageSelect() {
  const { current, setLanguage, languages } = useLanguage();
  return (
    <label className="block">
      <span className="eyebrow mb-2 block text-[var(--color-lacquer)]">
        Language
      </span>
      <div className="relative">
        <select
          value={current}
          onChange={(e) => setLanguage(e.target.value as typeof current)}
          className="w-full appearance-none rounded-2xl border border-[var(--color-ink)]/15 bg-[var(--color-cream)] px-4 py-3 pr-10 text-base font-bold text-[var(--color-ink)] outline-none transition focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/40"
          aria-label="Language"
        >
          {languages.map((l) => (
            <option key={l} value={l}>
              {languageLabels[l]}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-[var(--color-ink)]/55"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </label>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M7 4h10l1 3H6l1-3Zm-1.5 5h13l-.9 9.2A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-2-1.8L5.5 9Zm4 3a2.5 2.5 0 0 0 5 0h-1.5a1 1 0 0 1-2 0H9.5Z" />
    </svg>
  );
}
