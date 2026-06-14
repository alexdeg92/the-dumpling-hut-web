"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  menuItems,
  restaurant,
  type CookKey,
  type MenuItem,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { CategoryCarousel } from "@/components/category-carousel";

type CookTab = "all" | CookKey;

const COOK_TABS: CookTab[] = ["all", "steamed", "panfried", "veg", "side"];

// stable "featured" order = source order, signatures gently floated up
const featuredRank = new Map(menuItems.map((m, i) => [m.id, i]));

export function MenuExplorer() {
  const { lang, t } = useI18n();
  const m = t.menu;

  const [cook, setCook] = useState<CookTab>("all");
  const [active, setActive] = useState<MenuItem | null>(null);

  const clearAll = () => {
    setCook("all");
  };

  const filtered = useMemo(() => {
    const list = menuItems.filter((item) => {
      if (cook !== "all" && item.cook !== cook) return false;
      return true;
    });

    return [...list].sort(
      (a, b) => (featuredRank.get(a.id) ?? 0) - (featuredRank.get(b.id) ?? 0),
    );
  }, [cook]);

  const hasFilters = cook !== "all";
  const count = filtered.length;

  return (
    <div>
      {/* control bar — compact sticky toolbar */}
      <div className="sticky top-[68px] z-30 -mx-1 rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)]/92 p-2.5 shadow-[0_12px_32px_-24px_rgba(28,14,11,0.45)] backdrop-blur-xl sm:-mx-2 sm:rounded-3xl sm:p-3.5">
        <CategoryCarousel
          ariaLabel={m.filtersTitle}
          value={cook}
          onChange={setCook}
          compact
          items={COOK_TABS.map((c) => ({ key: c, label: m.cooks[c] }))}
        />

        {hasFilters && (
          <div className="mt-2 flex justify-end">
            <button
              onClick={clearAll}
              className="text-[0.68rem] font-bold text-[var(--color-lacquer)] underline-offset-2 hover:underline sm:text-xs"
            >
              {m.clear}
            </button>
          </div>
        )}
      </div>

      {/* grid */}
      {count === 0 ? (
        <p className="mt-16 text-center text-lg font-semibold text-[var(--color-ink)]/55">
          {m.none}
        </p>
      ) : (
        <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((item) => (
            <DishCard key={item.id} item={item} onOpen={() => setActive(item)} />
          ))}
        </div>
      )}

      {active && <DishModal item={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function DishCard({ item, onOpen }: { item: MenuItem; onOpen: () => void }) {
  const { lang, t } = useI18n();
  return (
    <button
      onClick={onOpen}
      className="dish-card group relative flex flex-row overflow-hidden rounded-2xl border border-[var(--color-ink)]/10 bg-white/75 text-left shadow-[0_12px_28px_-22px_rgba(28,14,11,0.55)] transition hover:shadow-[0_20px_44px_-24px_rgba(122,15,18,0.5)] sm:flex-col sm:rounded-3xl sm:shadow-[0_18px_40px_-28px_rgba(28,14,11,0.6)] sm:hover:shadow-[0_28px_60px_-30px_rgba(122,15,18,0.55)]"
    >
      <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden bg-[var(--color-cream-2)] sm:aspect-[4/3] sm:h-auto sm:w-full">
        <Image
          src={item.image}
          alt={item.name[lang]}
          fill
          sizes="(max-width: 640px) 88px, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 hidden size-9 place-items-center rounded-full bg-[var(--color-cream)]/90 text-xl shadow backdrop-blur-sm transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 sm:grid sm:size-10 sm:text-2xl">
          {item.emoji}
        </span>
        <span className="absolute right-1.5 top-1.5 rounded-full bg-[var(--color-lacquer)] px-2 py-0.5 text-[0.65rem] font-extrabold text-[var(--color-cream)] shadow sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-sm">
          ${item.price.toFixed(2)}
        </span>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-12 bg-gradient-to-t from-black/25 to-transparent sm:block" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:flex-1 sm:justify-start sm:p-6">
        <div className="flex items-start gap-2">
          <h3 className="font-display min-w-0 flex-1 text-base leading-tight text-[var(--color-ink)] sm:text-xl">
            {item.name[lang]}
          </h3>
          <span className="shrink-0 text-xl leading-none sm:hidden" aria-hidden="true">
            {item.emoji}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--color-ink)]/65 sm:mt-2 sm:line-clamp-none sm:text-sm sm:leading-6">
          {item.blurb[lang]}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">
          {item.diet.includes("signature") && (
            <Tag className="bg-[var(--color-gold)]/25 text-[var(--color-ink)]">
              {t.menu.diets.signature}
            </Tag>
          )}
          {item.diet.includes("vegan") && (
            <Tag className="bg-[var(--color-jade)]/20 text-[var(--color-jade)]">
              {t.menu.diets.vegan}
            </Tag>
          )}
          <SpiceMeter level={item.spice} />
          {item.count != null && (
            <span className="ml-auto text-[0.65rem] font-bold text-[var(--color-ink)]/45 sm:text-xs">
              ×{item.count}
            </span>
          )}
        </div>

        <span className="mt-4 hidden items-center gap-1 text-sm font-bold text-[var(--color-lacquer)] sm:inline-flex">
          {t.menu.details}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </button>
  );
}

function DishModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { lang, t } = useI18n();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[100] flex items-end justify-center bg-[var(--color-ink)]/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.name[lang]}
    >
      <div
        className="modal-card relative flex max-h-[min(92dvh,900px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-[var(--color-cream)] shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0">
          <div className="relative h-[clamp(11rem,36dvh,18rem)] w-full bg-[var(--color-cream-2)] sm:h-64">
            <Image
              src={item.image}
              alt={item.name[lang]}
              fill
              sizes="(max-width: 640px) 100vw, 32rem"
              className="object-contain"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[var(--color-lacquer)] to-transparent sm:h-14" />
            <button
              onClick={onClose}
              aria-label={t.nav.close}
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-[var(--color-ink)]/40 text-lg text-[var(--color-cream)] backdrop-blur-sm transition hover:bg-[var(--color-ink)]/60 sm:right-4 sm:top-4"
            >
              ✕
            </button>
          </div>

          <div className="relative overflow-hidden bg-[var(--color-lacquer)] px-5 py-4 text-[var(--color-cream)] sm:px-7 sm:py-7">
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-6xl opacity-15 sm:right-4 sm:text-8xl">
              {item.emoji}
            </div>
            <span className="relative text-3xl sm:text-5xl">{item.emoji}</span>
            <h3 className="font-display mt-2 text-2xl sm:mt-3 sm:text-3xl">{item.name[lang]}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-3 sm:gap-3">
              <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-sm font-extrabold text-[var(--color-ink)]">
                ${item.price.toFixed(2)}
              </span>
              {item.count != null && (
                <span className="text-sm font-semibold text-[var(--color-cream)]/80">
                  {item.count} {t.menu.countLabel}
                </span>
              )}
              <span className="text-sm font-semibold text-[var(--color-cream)]/80">
                {t.menu.proteins[item.protein]}
              </span>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-7 sm:py-6">
          <p className="text-sm leading-7 text-[var(--color-ink)]/80 sm:text-base">
            {item.detail[lang]}
          </p>

          <div className="mt-4 flex items-center gap-3 sm:mt-5">
            <span className="eyebrow text-[var(--color-lacquer)]">{t.menu.spiceLabel}</span>
            <SpiceMeter level={item.spice} big />
          </div>

          <div className="mt-4 rounded-2xl bg-[var(--color-cream-2)]/60 p-4">
            <span className="eyebrow text-[var(--color-lacquer)]">{t.menu.pairLabel}</span>
            <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]/75">
              {item.pairs[lang]}
            </p>
          </div>
        </div>

        <div className="shrink-0 border-t border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-7">
          <a href={restaurant.phoneHref} className="btn btn-gold w-full">
            {t.common.order}
          </a>
        </div>
      </div>
    </div>
  );
}

function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide ${className}`}>
      {children}
    </span>
  );
}

function SpiceMeter({ level, big = false }: { level: number; big?: boolean }) {
  if (level === 0 && !big) return null;
  const size = big ? "text-base" : "text-sm";
  return (
    <span className={`inline-flex ${size}`} aria-label={`spice ${level} of 3`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i < level ? "" : "opacity-25 grayscale"}>
          🌶
        </span>
      ))}
    </span>
  );
}
