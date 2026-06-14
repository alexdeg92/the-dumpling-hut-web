"use client";

import Image from "next/image";

import { feedImages, instagramPostHref, restaurant } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";

/**
 * Instagram feed. Tiles are real photos pulled from the public
 * @thedumplinghut feed (downloaded, square-cropped and optimized into
 * /public/feed), zipped with the per-language captions in `feed.posts`.
 * Each tile links back to its original Instagram post so the account keeps
 * full attribution. A warm lacquer gradient sits behind every image as a
 * lantern-lit fallback and as the scrim the hover caption rides on.
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
            <a
              key={img.shortcode}
              href={instagramPostHref(img.shortcode)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${title} — ${restaurant.instagram} on Instagram`}
              className="reveal group relative aspect-square overflow-hidden rounded-2xl"
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
            </a>
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
    </div>
  );
}
