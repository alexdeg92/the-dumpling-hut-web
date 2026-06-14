"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { feedImages, instagramPostHref, restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

/**
 * Premium gallery lightbox for the Instagram feed.
 *
 * A full-screen, glass-backed showcase rather than a plain lightbox:
 *  - the photo sits in a rounded, shadowed "card" that floats over a blurred
 *    backdrop,
 *  - sleek pill nav buttons with SVG chevrons + hover lift,
 *  - an integrated "3 / 9" counter and a row of progress dots,
 *  - a contemporary caption panel with the dish name, description and the
 *    Instagram attribution kept intact,
 *  - keyboard (arrows / esc) + touch-swipe navigation,
 *  - fully responsive: on phones it becomes an edge-to-edge sheet.
 */

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-[1.05rem]"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ImageGalleryModal({
  index,
  onIndexChange,
  onClose,
}: {
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const f = t.feed;
  const count = feedImages.length;
  const img = feedImages[index];
  const [title, caption] = f.posts[index] ?? ["", ""];

  const go = useCallback(
    (dir: number) => onIndexChange((index + dir + count) % count),
    [index, count, onIndexChange],
  );

  // touch swipe to navigate
  const [touchX, setTouchX] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[100] flex flex-col bg-[var(--color-ink)]/80 backdrop-blur-xl sm:items-center sm:justify-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        setTouchX(null);
      }}
    >
      {/* floating top bar — counter + close, glassy and integrated */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 p-4 sm:p-6">
        <span className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[var(--color-cream)]/10 px-3.5 py-1.5 text-sm font-semibold tracking-wide text-[var(--color-cream)] ring-1 ring-[var(--color-cream)]/15 backdrop-blur-md">
          <span className="text-[var(--color-gold-soft)]">{index + 1}</span>
          <span className="text-[var(--color-cream)]/40">/</span>
          <span className="text-[var(--color-cream)]/70">{count}</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={f.close}
          className="gallery-close pointer-events-auto grid size-11 place-items-center rounded-full bg-[var(--color-cream)]/10 text-[var(--color-cream)] ring-1 ring-[var(--color-cream)]/15 backdrop-blur-md hover:bg-[var(--color-cream)]/25"
        >
          <CloseIcon />
        </button>
      </div>

      {/* prev / next — sleek pill chevrons over the image edges */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label={f.prev}
        className="gallery-nav absolute left-2 top-1/2 z-30 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-cream)]/10 text-[var(--color-cream)] ring-1 ring-[var(--color-cream)]/15 backdrop-blur-md hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] hover:shadow-[0_8px_30px_-6px_rgba(233,185,73,0.55)] sm:left-6 sm:size-14"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label={f.next}
        className="gallery-nav absolute right-2 top-1/2 z-30 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-cream)]/10 text-[var(--color-cream)] ring-1 ring-[var(--color-cream)]/15 backdrop-blur-md hover:bg-[var(--color-gold)] hover:text-[var(--color-ink)] hover:shadow-[0_8px_30px_-6px_rgba(233,185,73,0.55)] sm:right-6 sm:size-14"
      >
        <ChevronRight />
      </button>

      {/* the showcase card */}
      <div
        className="modal-card relative flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-[var(--color-night)] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.75)] ring-1 ring-[var(--color-cream)]/10 sm:max-h-[90vh] sm:max-w-3xl sm:flex-none sm:rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* large image — framed, subtle warm glow under it */}
        <div className="relative min-h-0 flex-1 overflow-hidden bg-gradient-to-b from-[var(--color-ink)] to-[var(--color-night)] sm:h-[60vh] sm:flex-none">
          <Image
            key={img.src}
            src={img.src}
            alt={`${title} — ${caption}`}
            fill
            sizes="(min-width: 640px) 768px, 100vw"
            className="gallery-photo object-contain"
            priority
          />
        </div>

        {/* caption panel — contemporary, clean spacing */}
        <div
          key={img.src + "-cap"}
          className="gallery-caption shrink-0 border-t border-[var(--color-ink)]/5 bg-[var(--color-cream)] px-5 py-5 sm:px-8 sm:py-7"
        >
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--color-lacquer)]/80">
            {restaurant.instagram}
          </p>
          <h3 className="font-display mt-1.5 text-2xl leading-tight text-[var(--color-ink)] sm:text-[1.75rem]">
            {title}
          </h3>
          <p className="mt-2.5 max-w-prose text-sm leading-6 text-[var(--color-ink)]/65 sm:text-[0.95rem]">
            {caption}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <a
              href={instagramPostHref(img.shortcode)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-lacquer)] px-4 py-2.5 text-sm font-bold text-[var(--color-cream)] shadow-sm transition hover:-translate-y-0.5 hover:bg-[var(--color-lacquer-soft)] hover:shadow-md active:translate-y-0"
            >
              <InstagramIcon />
              {f.viewOnIg}
            </a>

            {/* progress dots — jump to any photo */}
            <div className="flex items-center gap-1.5">
              {feedImages.map((p, i) => (
                <button
                  key={p.shortcode}
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={`${i + 1} / ${count}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-5 bg-[var(--color-lacquer)]"
                      : "w-1.5 bg-[var(--color-ink)]/20 hover:bg-[var(--color-ink)]/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
