"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  deliveryPlatforms,
  restaurant,
  type DeliveryKey,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/*  Order modal context — lets the nav, sidebar and any CTA open the   */
/*  same delivery-platform picker from anywhere in the tree.           */
/* ------------------------------------------------------------------ */

type OrderModalValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const OrderModalContext = createContext<OrderModalValue | null>(null);

export function OrderModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <OrderModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <OrderModal isOpen={isOpen} close={close} />
    </OrderModalContext.Provider>
  );
}

export function useOrderModal(): OrderModalValue {
  const ctx = useContext(OrderModalContext);
  if (!ctx) {
    throw new Error("useOrderModal must be used inside <OrderModalProvider>");
  }
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  The modal itself                                                   */
/* ------------------------------------------------------------------ */

function OrderModal({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const { t, lang } = useI18n();
  const o = t.order;

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[120] flex items-end justify-center sm:items-center ${
        isOpen ? "" : "pointer-events-none"
      }`}
    >
      {/* backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`absolute inset-0 bg-[var(--color-ink)]/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* sheet / dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={o.modalTitle}
        className={`relative z-10 w-full max-w-md rounded-t-[2rem] bg-[var(--color-cream)] p-6 shadow-[0_-20px_60px_-20px_rgba(28,14,11,0.6)] transition-all duration-300 ease-[var(--ease-soft)] sm:rounded-[2rem] sm:p-8 sm:shadow-[0_40px_80px_-30px_rgba(28,14,11,0.7)] ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-6 opacity-0 sm:translate-y-3"
        }`}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-[var(--color-lacquer)]">{o.modalTitle}</p>
            <p className="mt-1 max-w-[18rem] text-sm leading-6 text-[var(--color-ink)]/70">
              {o.modalLead}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={o.close}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-[var(--color-ink)]/15 text-[var(--color-ink)] transition hover:bg-[var(--color-cream-2)]"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* platform list */}
        <ul className="mt-6 grid gap-3">
          {deliveryPlatforms.map((p) => (
            <li key={p.key}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                onClick={close}
                className="group flex items-center gap-4 rounded-2xl border border-[var(--color-ink)]/12 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:border-[var(--color-gold)] hover:shadow-[0_18px_40px_-22px_rgba(28,14,11,0.5)]"
              >
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: p.color }}
                  aria-hidden="true"
                >
                  <PlatformIcon platform={p.key} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg text-[var(--color-ink)]">
                    {p.name}
                  </span>
                  <span className="block text-sm text-[var(--color-ink)]/60">
                    {p.tagline[lang]}
                  </span>
                </span>
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>

        {/* phone fallback */}
        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-[var(--color-lacquer)] px-5 py-4 text-[var(--color-cream)]">
          <span className="text-sm font-semibold">{o.orPhone}</span>
          <a
            href={restaurant.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-4 py-2 text-sm font-bold text-[var(--color-ink)] transition hover:bg-[var(--color-gold-soft)]"
          >
            <PhoneIcon />
            {restaurant.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tiny inline brand-ish marks (monochrome, on coloured chips)        */
/* ------------------------------------------------------------------ */

function PlatformIcon({ platform }: { platform: DeliveryKey }) {
  if (platform === "ubereats") {
    // "Eats" wordmark feel — simple bag glyph
    return (
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
        <path d="M7 4h10l1 3H6l1-3Zm-1.5 5h13l-.9 9.2A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-2-1.8L5.5 9Zm4 3a2.5 2.5 0 0 0 5 0h-1.5a1 1 0 0 1-2 0H9.5Z" />
      </svg>
    );
  }
  if (platform === "skipthedishes") {
    // plate + cutlery
    return (
      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
        <path d="M6 3c.6 0 1 .4 1 1v4a2 2 0 0 1-1 1.7V20a1 1 0 1 1-2 0V9.7A2 2 0 0 1 3 8V4a1 1 0 1 1 2 0v4h.5V4c0-.6.4-1 .5-1Zm12 0a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0v-6h-1a1 1 0 0 1-1-1V8a5 5 0 0 1 3-5Z" />
      </svg>
    );
  }
  // doordash — chevron "dash" mark
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
      <path d="M3 9h12a4 4 0 0 1 0 8H6a1 1 0 1 1 0-2h9a2 2 0 0 0 0-4H3a1 1 0 0 1 0-2Zm0-4h9a1 1 0 1 1 0 2H3a1 1 0 0 1 0-2Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 shrink-0 text-[var(--color-ink)]/35 transition group-hover:translate-x-0.5 group-hover:text-[var(--color-lacquer)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.3 1l-2.1 2.2Z" />
    </svg>
  );
}
