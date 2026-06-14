"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { feedImages, instagramPostHref, restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";

/**
 * Instagram feed. Tiles are real photos pulled from the public
 * @thedumplinghut feed (downloaded, square-cropped and optimized into
 * /public/feed), zipped with the per-language captions in `feed.posts`.
 * Clicking a tile opens an in-page lightbox showing the large image, its
 * dish name and caption, plus prev/next navigation — no redirect off-site.
 * Instagram attribution is kept inside the lightbox (and as a link out).
 * A warm lacquer gradient sits behind every image as a lantern-lit fallback
 * and as the scrim the hover caption rides on.
 */

const GRADIENTS = [
  "from-[#a8181c] to-[#7a0f12]",
  "from-[#d4452b] to-[#a8181c]",
  "from-[#e9b949] to-[#d4452b]",
  "from-[#7a0f12] to-[#2a1410]",
  "from-[#6f8f57] to-[#3f5a32]",
  "from-[#d4452b] to-[#7a0f12]",
];

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

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {feedImages.map((img, i) => {
          const [title, caption] = f.posts[i] ?? ["", ""];
          return (
            <button
              key={img.shortcode}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${title} — ${caption}`}
              aria-haspopup="dialog"
              className="reveal group relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-gold)]"
            >
              {/* lantern-lit fallback behind the photo */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
              />
              {/* real photo from the feed */}
              <Image
                src={img.src}
                alt={`${title} — ${caption}`}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* warm scrim so the IG badge + title stay legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/45 via-transparent to-[var(--color-ink)]/20" />
              {/* top label */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 text-[var(--color-cream)]">
                <span className="grid size-6 place-items-center rounded-full bg-[var(--color-cream)]/25 text-[0.6rem] backdrop-blur-sm">
                  IG
                </span>
                <span className="text-[0.7rem] font-bold drop-shadow">
                  {restaurant.instagram}
                </span>
              </div>
              {/* hover caption overlay */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-display text-lg leading-tight text-[var(--color-cream)]">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-snug text-[var(--color-cream)]/85">
                  {caption}
                </p>
              </div>
              {/* always-visible mini title */}
              <p className="font-display absolute bottom-3 left-3 right-3 text-base leading-tight text-[var(--color-cream)] drop-shadow-md transition group-hover:opacity-0">
                {title}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
        <a
          href={restaurant.tiktokHref}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost border-[var(--color-ink)]/25 text-[var(--color-ink)]"
        >
          {f.followTk} · {restaurant.tiktok}
        </a>
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
        <Lightbox index={openIndex} onIndexChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
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
      {/* close button — always reachable, top right */}
      <button
        type="button"
        onClick={onClose}
        aria-label={f.close}
        className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full bg-[var(--color-cream)]/15 text-xl text-[var(--color-cream)] backdrop-blur-sm transition hover:bg-[var(--color-cream)]/30"
      >
        ✕
      </button>

      {/* prev / next — large tap targets, sit over the image edges */}
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
        className="modal-card relative flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-[var(--color-night)] shadow-2xl sm:max-h-[90vh] sm:max-w-2xl sm:flex-none sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* large image — fills available height, caption panel stays visible */}
        <div className="relative min-h-0 flex-1 bg-[var(--color-ink)] sm:h-[62vh]">
          <Image
            key={img.src}
            src={img.src}
            alt={`${title} — ${caption}`}
            fill
            sizes="(min-width: 640px) 672px, 100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* caption panel — dish name prominent, IG attribution kept */}
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
            <span className="text-xs font-bold text-[var(--color-ink)]/45">
              {restaurant.instagram}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
