"use client";

import { restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";

/**
 * Instagram-style feed. Real IG/TikTok oEmbed needs API tokens that aren't
 * available at build time, so each tile is a self-contained generated post
 * card (custom gradient + dumpling motif) that links straight to the real
 * @thedumplinghut profile. Swap the tile background for live media when an
 * access token is wired up.
 */

const GRADIENTS = [
  "from-[#a8181c] to-[#7a0f12]",
  "from-[#d4452b] to-[#a8181c]",
  "from-[#e9b949] to-[#d4452b]",
  "from-[#7a0f12] to-[#2a1410]",
  "from-[#6f8f57] to-[#3f5a32]",
  "from-[#d4452b] to-[#7a0f12]",
];

const EMOJI = ["🥟", "🥢", "🌶️", "🍳", "🫕", "🥬"];

export function Feed() {
  const { t } = useI18n();
  const f = t.feed;
  const ref = useReveal<HTMLDivElement>();

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
        {f.posts.map(([title, caption], i) => (
          <a
            key={i}
            href={restaurant.instagramHref}
            target="_blank"
            rel="noreferrer"
            className="reveal group relative aspect-square overflow-hidden rounded-2xl"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} transition-transform duration-700 group-hover:scale-110`}
            />
            {/* motif */}
            <span className="absolute -bottom-4 -right-2 text-8xl opacity-25 transition group-hover:opacity-40 sm:text-9xl">
              {EMOJI[i % EMOJI.length]}
            </span>
            {/* top label */}
            <div className="absolute left-3 top-3 flex items-center gap-1.5 text-[var(--color-cream)]">
              <span className="grid size-6 place-items-center rounded-full bg-[var(--color-cream)]/20 text-[0.6rem]">
                IG
              </span>
              <span className="text-[0.7rem] font-bold">{restaurant.instagram}</span>
            </div>
            {/* hover caption overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--color-ink)]/85 via-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="font-display text-lg leading-tight text-[var(--color-cream)]">
                {title}
              </p>
              <p className="mt-1 text-xs leading-snug text-[var(--color-cream)]/85">
                {caption}
              </p>
            </div>
            {/* always-visible mini title */}
            <p className="font-display absolute bottom-3 left-3 right-3 text-base leading-tight text-[var(--color-cream)] transition group-hover:opacity-0">
              {title}
            </p>
          </a>
        ))}
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
    </div>
  );
}
