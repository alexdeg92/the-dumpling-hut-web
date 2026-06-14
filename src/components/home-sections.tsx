"use client";

import Image from "next/image";
import Link from "next/link";
import { menuItems, restaurant, type MenuItem } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useReveal } from "@/lib/use-reveal";
import { ChiliSprig, Seal } from "@/components/art";

const FEATURED_DISH_IDS = [
  "lamb-coriander-steamed",
  "pork-chive-steamed",
  "chicken-mushroom-steamed",
] as const;

/** Three homepage picks — explicit IDs so names and photos stay distinct. */
function getFeaturedDishes(): MenuItem[] {
  return FEATURED_DISH_IDS.map((id) => menuItems.find((m) => m.id === id)).filter(
    (item): item is MenuItem => item != null,
  );
}

/** Three signature dishes pulled live from the menu data. */
export function FeaturedDishes() {
  const { lang, t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const picks = getFeaturedDishes();

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="flex items-end justify-between gap-6">
        <div className="reveal max-w-xl">
          <p className="eyebrow text-[var(--color-lacquer)]">{t.menu.eyebrow}</p>
          <h2 className="font-display mt-3 text-3xl text-[var(--color-ink)] sm:text-4xl">
            {t.menu.title}
          </h2>
        </div>
        <Link
          href={`/${lang}/menu`}
          className="reveal hidden shrink-0 items-center gap-1 text-sm font-bold text-[var(--color-lacquer)] hover:underline sm:inline-flex"
        >
          {t.nav.menu} →
        </Link>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {picks.map((item, i) => (
          <Link
            key={item.id}
            href={`/${lang}/menu`}
            className="dish-card reveal group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--color-ink)]/10 bg-white/70"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-cream-2)]">
              <Image
                src={item.image}
                alt={item.name[lang]}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 text-xs font-extrabold text-[var(--color-gold)] drop-shadow">
                0{i + 1}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl text-[var(--color-ink)]">
                {item.name[lang]}
              </h3>
              <p className="mt-2 leading-7 text-[var(--color-ink)]/65">{item.blurb[lang]}</p>
              <p className="mt-4 font-bold text-[var(--color-lacquer)]">
                ${item.price.toFixed(2)}
                {item.count ? ` · ×${item.count}` : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Editorial story teaser with the numbered process blocks. */
export function StoryStrip() {
  const { lang, t } = useI18n();
  const ref = useReveal<HTMLDivElement>();
  const s = t.story;

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--color-night)] py-24 text-[var(--color-cream)]">
      <ChiliSprig className="absolute right-10 top-12 hidden w-20 opacity-80 float-slow lg:block" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal">
            <p className="eyebrow text-[var(--color-gold)]">{s.eyebrow}</p>
            <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
              {s.title}
            </h2>
            <p className="mt-5 max-w-md leading-7 text-[var(--color-cream)]/70">
              {s.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {s.values.map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-[var(--color-cream)]/20 px-3 py-1.5 text-xs font-bold text-[var(--color-cream)]/80"
                >
                  {v}
                </span>
              ))}
            </div>
            <Link href={`/${lang}/about`} className="btn btn-gold mt-8">
              {t.nav.story}
            </Link>
          </div>

          <div className="grid gap-4">
            {s.blocks.map((b) => (
              <div
                key={b.k}
                className="reveal flex gap-5 rounded-2xl border border-[var(--color-cream)]/10 bg-[var(--color-cream)]/[0.04] p-6"
              >
                <span className="font-display text-3xl text-[var(--color-gold)]">{b.k}</span>
                <div>
                  <h3 className="font-display text-xl">{b.h}</h3>
                  <p className="mt-2 leading-7 text-[var(--color-cream)]/70">{b.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Stats band with a spinning seal. */
export function StatsBand() {
  const { t } = useI18n();
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="relative grid items-center gap-8 overflow-hidden rounded-[2.5rem] border border-[var(--color-ink)]/10 bg-[var(--color-lacquer)] p-10 text-[var(--color-cream)] sm:grid-cols-3">
        <div className="pointer-events-none absolute -right-10 -top-10 opacity-30 spin-slow">
          <Seal text={restaurant.hanzi} className="size-40 text-2xl leading-tight" />
        </div>
        {t.story.stats.map(([num, label]) => (
          <div key={label} className="reveal relative">
            <p className="font-display text-5xl text-[var(--color-gold-soft)]">{num}</p>
            <p className="mt-2 text-sm font-semibold text-[var(--color-cream)]/80">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
