"use client";

import { useEffect, useMemo, useState } from "react";
import {
  menuItems,
  restaurant,
  type CookKey,
  type DietKey,
  type MenuItem,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";

type CookTab = "all" | CookKey;
type SortKey = "featured" | "priceLow" | "priceHigh" | "spicy";

const COOK_TABS: CookTab[] = ["all", "steamed", "panfried", "veg", "side"];
const DIET_CHIPS: DietKey[] = ["signature", "vegetarian", "vegan", "spicy"];
const SORTS: SortKey[] = ["featured", "priceLow", "priceHigh", "spicy"];

// stable "featured" order = source order, signatures gently floated up
const featuredRank = new Map(menuItems.map((m, i) => [m.id, i]));

export function MenuExplorer() {
  const { lang, t } = useI18n();
  const m = t.menu;

  const [cook, setCook] = useState<CookTab>("all");
  const [diets, setDiets] = useState<Set<DietKey>>(new Set());
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [active, setActive] = useState<MenuItem | null>(null);

  const toggleDiet = (d: DietKey) =>
    setDiets((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });

  const clearAll = () => {
    setCook("all");
    setDiets(new Set());
    setQuery("");
    setSort("featured");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = menuItems.filter((item) => {
      if (cook !== "all" && item.cook !== cook) return false;
      for (const d of diets) if (!item.diet.includes(d)) return false;
      if (q) {
        const hay = `${item.name[lang]} ${item.blurb[lang]} ${item.name.en}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case "priceLow":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "spicy":
        sorted.sort((a, b) => b.spice - a.spice);
        break;
      default:
        sorted.sort(
          (a, b) => (featuredRank.get(a.id) ?? 0) - (featuredRank.get(b.id) ?? 0),
        );
    }
    return sorted;
  }, [cook, diets, query, sort, lang]);

  const hasFilters = cook !== "all" || diets.size > 0 || query.trim() !== "" || sort !== "featured";
  const count = filtered.length;

  return (
    <div>
      {/* control bar */}
      <div className="sticky top-[68px] z-30 -mx-2 rounded-3xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)]/85 p-3 backdrop-blur-xl sm:p-4">
        {/* cook-style tabs */}
        <div className="flex flex-wrap gap-2">
          {COOK_TABS.map((c) => {
            const on = cook === c;
            return (
              <button
                key={c}
                onClick={() => setCook(c)}
                className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${
                  on
                    ? "bg-[var(--color-lacquer)] text-[var(--color-cream)] shadow"
                    : "bg-[var(--color-cream-2)]/60 text-[var(--color-ink)]/70 hover:bg-[var(--color-cream-2)]"
                }`}
              >
                {m.cooks[c]}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* diet chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow text-[var(--color-lacquer)]">{m.filtersTitle}</span>
            {DIET_CHIPS.map((d) => {
              const on = diets.has(d);
              return (
                <button
                  key={d}
                  onClick={() => toggleDiet(d)}
                  aria-pressed={on}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                    on
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-ink)]"
                      : "border-[var(--color-ink)]/15 text-[var(--color-ink)]/65 hover:border-[var(--color-gold)]"
                  }`}
                >
                  {d === "spicy" ? "🌶 " : ""}
                  {m.diets[d]}
                </button>
              );
            })}
          </div>

          {/* search + sort */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-ink)]/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={m.searchPlaceholder}
                className="w-44 rounded-full border border-[var(--color-ink)]/15 bg-white/70 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-[var(--color-gold)] sm:w-52"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label={m.sortTitle}
              className="rounded-full border border-[var(--color-ink)]/15 bg-white/70 py-2 pl-3 pr-7 text-sm font-semibold outline-none transition focus:border-[var(--color-gold)]"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {m.sorts[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[var(--color-ink)]/10 pt-3">
          <p className="text-sm font-bold text-[var(--color-ink)]/70">
            <span className="font-display text-lg text-[var(--color-lacquer)]">{count}</span>{" "}
            {count === 1 ? m.resultsOne : m.resultsMany}
          </p>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs font-bold text-[var(--color-lacquer)] underline-offset-4 hover:underline"
            >
              {m.clear}
            </button>
          )}
        </div>
      </div>

      {/* grid */}
      {count === 0 ? (
        <p className="mt-16 text-center text-lg font-semibold text-[var(--color-ink)]/55">
          {m.none}
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      className="dish-card group relative overflow-hidden rounded-3xl border border-[var(--color-ink)]/10 bg-white/75 p-6 text-left shadow-[0_18px_40px_-28px_rgba(28,14,11,0.6)] hover:shadow-[0_28px_60px_-30px_rgba(122,15,18,0.55)]"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-[var(--color-gold)]/15 transition-transform duration-500 group-hover:scale-150" />
      <div className="flex items-start justify-between gap-3">
        <span className="text-4xl transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
          {item.emoji}
        </span>
        <span className="rounded-full bg-[var(--color-lacquer)] px-3 py-1 text-sm font-extrabold text-[var(--color-cream)]">
          ${item.price.toFixed(2)}
        </span>
      </div>

      <h3 className="font-display mt-4 text-xl text-[var(--color-ink)]">
        {item.name[lang]}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-ink)]/65">
        {item.blurb[lang]}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
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
          <span className="ml-auto text-xs font-bold text-[var(--color-ink)]/45">
            ×{item.count}
          </span>
        )}
      </div>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--color-lacquer)]">
        {t.menu.details}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
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
      className="modal-backdrop fixed inset-0 z-[100] grid place-items-end bg-[var(--color-ink)]/55 p-0 backdrop-blur-sm sm:place-items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.name[lang]}
    >
      <div
        className="modal-card relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-[var(--color-cream)] shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-[var(--color-lacquer)] px-7 py-8 text-[var(--color-cream)]">
          <div className="pointer-events-none absolute -bottom-8 -right-4 text-9xl opacity-20">
            {item.emoji}
          </div>
          <button
            onClick={onClose}
            aria-label={t.nav.close}
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-[var(--color-cream)]/15 text-lg transition hover:bg-[var(--color-cream)]/30"
          >
            ✕
          </button>
          <span className="text-5xl">{item.emoji}</span>
          <h3 className="font-display mt-3 text-3xl">{item.name[lang]}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-3">
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

        <div className="px-7 py-6">
          <p className="text-base leading-7 text-[var(--color-ink)]/80">
            {item.detail[lang]}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <span className="eyebrow text-[var(--color-lacquer)]">{t.menu.spiceLabel}</span>
            <SpiceMeter level={item.spice} big />
          </div>

          <div className="mt-4 rounded-2xl bg-[var(--color-cream-2)]/60 p-4">
            <span className="eyebrow text-[var(--color-lacquer)]">{t.menu.pairLabel}</span>
            <p className="mt-1 text-sm font-semibold text-[var(--color-ink)]/75">
              {item.pairs[lang]}
            </p>
          </div>

          <a href={restaurant.phoneHref} className="btn btn-gold mt-6 w-full">
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

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" strokeLinecap="round" />
    </svg>
  );
}
