"use client";

/* The gallery serves pre-generated thumbnails in the grid and swaps to the
   full-res file manually in the lightbox (thumbnail first, then a seamless
   cross-fade once the full image is ready). That hand-off is easier with a
   plain <img> than with next/image, so we opt out of the lint rule here. */
/* eslint-disable @next/next/no-img-element */

import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";

import { feedImages, feedThumb, instagramPostHref, restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { ProgressiveImage } from "@/components/progressive-image";

/**
 * Instagram feed — compact editorial gallery with a responsive grid.
 *
 * Mobile/tablet (< lg):  tight 3-column uniform grid.
 * Desktop      (≥ lg):   editorial asymmetric bento layout:
 *   ┌─────────┬────┬────┐
 *   │         │ 1  │ 2  │
 *   │   0     ├────┼────┤
 *   │ 2×2 hero│ 3  │ 4  │
 *   ├────┬────┼────┼────┤
 *   │  5 │  6 │  7 │  8 │  ← landscape strip
 *   └────┴────┴────┴────┘
 *
 * CSS Grid auto-placement handles the layout; clicking any tile opens
 * the in-page lightbox.
 */

const GRADIENTS = [
  "from-[#2138a8] to-[#041e8d]",
  "from-[#3f6fd6] to-[#2138a8]",
  "from-[#e9b949] to-[#3f6fd6]",
  "from-[#041e8d] to-[#0a1030]",
  "from-[#6f8f57] to-[#3f5a32]",
  "from-[#3f6fd6] to-[#041e8d]",
];

type TileProps = {
  img: (typeof feedImages)[number];
  index: number;
  title: string;
  caption: string;
  onOpen: (i: number) => void;
  /** Tailwind classes for aspect / col-span / row-span. Defaults to aspect-square. */
  className?: string;
};

function Tile({ img, index, title, caption, onOpen, className }: TileProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`${title}, ${caption}`}
      aria-haspopup="dialog"
      className={`reveal group relative block w-full cursor-zoom-in overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-gold)] ${className ?? "aspect-square"}`}
    >
      {/* warm lantern gradient fallback */}
      <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`} />
      {/* lightweight thumbnail — the full-res file only loads in the lightbox */}
      <img
        src={feedThumb(img.src)}
        alt={`${title}, ${caption}`}
        loading={index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* ambient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/40 via-transparent to-[var(--color-ink)]/15" />
      {/* IG badge — only on real Instagram posts */}
      {img.shortcode && (
        <div className="absolute left-2 top-2 grid size-5 place-items-center rounded-full bg-[var(--color-cream)]/25 text-[0.55rem] font-bold text-[var(--color-cream)] backdrop-blur-sm">
          IG
        </div>
      )}
      {/* hover caption overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--color-ink)]/88 via-[var(--color-ink)]/15 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-display text-sm leading-tight text-[var(--color-cream)]">{title}</p>
        <p className="mt-0.5 line-clamp-2 text-[0.65rem] leading-snug text-[var(--color-cream)]/80">
          {caption}
        </p>
      </div>
      {/* always-visible mini label */}
      <p className="font-display absolute bottom-2 left-2 right-2 text-xs leading-tight text-[var(--color-cream)] drop-shadow-md transition-opacity duration-300 group-hover:opacity-0">
        {title}
      </p>
    </button>
  );
}

export function Feed() {
  const { t } = useI18n();
  const f = t.feed;
  const ref = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div ref={ref}>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl reveal">
          <p className="eyebrow text-[var(--color-lacquer)]">{f.eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl text-[var(--color-ink)] sm:text-4xl">
            {f.title}
          </h2>
          <p className="mt-3 text-[var(--color-ink)]/65">{f.lead}</p>
        </div>
        <a
          href={restaurant.instagramHref}
          target="_blank"
          rel="noreferrer"
          className="btn btn-gold reveal shrink-0"
        >
          {f.follow}
        </a>
      </div>

      {/*
       * Responsive gallery grid.
       *
       * < lg: 3-column uniform square grid.
       * ≥ lg: 4-column grid where img[0] is a 2×2 hero. Auto-placement fills
       *       the rest of the hero's two rows with the next companions, then
       *       continues as uniform squares — so any number of photos tiles
       *       cleanly with no gaps.
       */}
      <div className="mt-8 grid grid-cols-3 gap-2 lg:grid-cols-4">
        {feedImages.map((img, i) => (
          <Tile
            key={img.src}
            img={img}
            index={i}
            title={f.posts[i]?.[0] ?? ""}
            caption={f.posts[i]?.[1] ?? ""}
            onOpen={setOpenIndex}
            className={
              i === 0
                ? "aspect-square lg:col-span-2 lg:row-span-2"
                : "aspect-square"
            }
          />
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-[var(--color-ink)]/45">
        Photos via{" "}
        <a
          href={restaurant.instagramHref}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-[var(--color-lacquer)]"
        >
          {restaurant.instagram}
        </a>{" "}
        on Instagram.
      </p>

      {openIndex !== null && (
        <Lightbox
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}

function Lightbox({
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

  // Portal to <body> so the fixed overlay escapes <main>'s stacking context
  // (main is `relative z-10`) and reliably covers the nav and footer.
  return createPortal(
    <div
      className="modal-backdrop fixed inset-0 z-[100] flex flex-col bg-[var(--color-ink)]/85 backdrop-blur-md sm:items-center sm:justify-center sm:p-6"
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
      <button
        type="button"
        onClick={onClose}
        aria-label={f.close}
        className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full bg-[var(--color-cream)]/15 text-xl text-[var(--color-cream)] backdrop-blur-sm transition hover:bg-[var(--color-cream)]/30"
      >
        ✕
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label={f.prev}
        className="absolute left-2 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-cream)]/15 text-2xl text-[var(--color-cream)] backdrop-blur-sm transition hover:bg-[var(--color-cream)]/30 sm:left-6"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label={f.next}
        className="absolute right-2 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-cream)]/15 text-2xl text-[var(--color-cream)] backdrop-blur-sm transition hover:bg-[var(--color-cream)]/30 sm:right-6"
      >
        ›
      </button>

      <div
        className="modal-card relative flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-[var(--color-night)] shadow-2xl sm:h-[88vh] sm:max-w-2xl sm:flex-none sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative min-h-0 flex-1 overflow-hidden bg-[var(--color-ink)]">
          <ProgressiveImage
            key={img.src}
            thumb={feedThumb(img.src)}
            full={img.src}
            alt={`${title}, ${caption}`}
          />
        </div>

        <div className="shrink-0 bg-[var(--color-cream)] px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display text-2xl leading-tight text-[var(--color-ink)] sm:text-3xl">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-ink)]/70 sm:text-base">
                {caption}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[var(--color-cream-2)] px-3 py-1 text-xs font-bold text-[var(--color-ink)]/60">
              {index + 1} / {count}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {img.shortcode && (
              <a
                href={instagramPostHref(img.shortcode)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-lacquer)] px-4 py-2 text-sm font-bold text-[var(--color-cream)] transition hover:bg-[var(--color-lacquer-soft)]"
              >
                <span className="grid size-5 place-items-center rounded-md bg-[var(--color-cream)]/20 text-[0.6rem]">
                  IG
                </span>
                {f.viewOnIg}
              </a>
            )}
            <span className="text-xs font-bold text-[var(--color-ink)]/45">
              {restaurant.instagram}
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
