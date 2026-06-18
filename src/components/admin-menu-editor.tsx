"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AdminConfirmDialog } from "@/components/admin-confirm-dialog";
import { dishThumb, languageLabels, type Lang } from "@/lib/content";
import type { AdminMenuItem, AdminMenuPrice } from "@/lib/menu-db";
import { useI18n } from "@/lib/i18n";

type PriceDraft = {
  id: number;
  labelEn: string;
  labelFr: string;
  labelZh: string;
  count: string;
  price: string;
  sortOrder: number;
};
type LangTab = Lang;
type MobileStep = "list" | "edit";

type ItemDraft = {
  id: number;
  slug: string;
  image: string;
  emoji: string;
  nameEn: string;
  nameFr: string;
  nameZh: string;
  descriptionEn: string;
  descriptionFr: string;
  descriptionZh: string;
  detailEn: string;
  detailFr: string;
  detailZh: string;
  prices: PriceDraft[];
};

function toPriceDraft(price: AdminMenuItem["prices"][number]): PriceDraft {
  return {
    id: price.id,
    labelEn: price.labelEn ?? "",
    labelFr: price.labelFr ?? "",
    labelZh: price.labelZh ?? "",
    count: price.count != null ? String(price.count) : "",
    price: price.price.toFixed(2),
    sortOrder: price.sortOrder,
  };
}

function toDraft(item: AdminMenuItem): ItemDraft {
  return {
    id: item.id,
    slug: item.slug,
    image: item.image,
    emoji: item.emoji,
    nameEn: item.nameEn,
    nameFr: item.nameFr,
    nameZh: item.nameZh,
    descriptionEn: item.descriptionEn,
    descriptionFr: item.descriptionFr,
    descriptionZh: item.descriptionZh,
    detailEn: item.detailEn,
    detailFr: item.detailFr,
    detailZh: item.detailZh,
    prices: item.prices.map(toPriceDraft),
  };
}

function draftsFromItems(items: AdminMenuItem[]): ItemDraft[] {
  return items.map(toDraft);
}

function parseCount(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const n = Number(trimmed);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function priceDraftMatches(a: PriceDraft, b: AdminMenuItem["prices"][number]): boolean {
  return (
    a.labelEn === (b.labelEn ?? "") &&
    a.labelFr === (b.labelFr ?? "") &&
    a.labelZh === (b.labelZh ?? "") &&
    parseCount(a.count) === b.count &&
    a.price === b.price.toFixed(2)
  );
}

function arePricesDirty(draftPrices: PriceDraft[], originalPrices: AdminMenuPrice[]): boolean {
  if (draftPrices.some((p) => p.id < 0)) return true;
  if (draftPrices.length !== originalPrices.length) return true;

  const originalById = new Map(originalPrices.map((p) => [p.id, p]));
  for (const draft of draftPrices) {
    const original = originalById.get(draft.id);
    if (!original || !priceDraftMatches(draft, original)) return true;
  }
  return false;
}

function isDraftDirty(draft: ItemDraft, original: AdminMenuItem): boolean {
  if (draft.nameEn !== original.nameEn) return true;
  if (draft.nameFr !== original.nameFr) return true;
  if (draft.nameZh !== original.nameZh) return true;
  if (draft.descriptionEn !== original.descriptionEn) return true;
  if (draft.descriptionFr !== original.descriptionFr) return true;
  if (draft.descriptionZh !== original.descriptionZh) return true;
  if (draft.detailEn !== original.detailEn) return true;
  if (draft.detailFr !== original.detailFr) return true;
  if (draft.detailZh !== original.detailZh) return true;
  return arePricesDirty(draft.prices, original.prices);
}

function draftName(draft: ItemDraft, lang: LangTab): string {
  if (lang === "fr") return draft.nameFr;
  if (lang === "zh") return draft.nameZh;
  return draft.nameEn;
}

function draftPriceLabel(draft: PriceDraft, lang: LangTab): string {
  if (lang === "fr") return draft.labelFr || draft.labelEn || "Nouveau";
  if (lang === "zh") return draft.labelZh || draft.labelEn || "新规格";
  return draft.labelEn || "New tier";
}

const fieldClass =
  "w-full rounded-xl border border-[var(--color-ink)]/15 bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-ink)]/55 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/25";

const searchClass =
  "w-full rounded-xl border border-[var(--color-ink)]/20 bg-white px-10 py-3 text-sm font-medium text-[var(--color-ink)] shadow-sm outline-none transition placeholder:font-normal placeholder:text-[var(--color-ink)]/65 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30";

const XL_MEDIA = "(min-width: 1280px)";
const AUTO_SAVE_DELAY_MS = 2000;

export function AdminMenuEditor({ items }: { items: AdminMenuItem[] }) {
  const { lang } = useI18n();
  const router = useRouter();
  const [drafts, setDrafts] = useState(() => draftsFromItems(items));
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [mobileStep, setMobileStep] = useState<MobileStep>("list");
  const [isWide, setIsWide] = useState(false);
  const [langTab, setLangTab] = useState<LangTab>("en");
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [removeTierIndex, setRemoveTierIndex] = useState<number | null>(null);
  const savingRef = useRef(false);
  const nextPriceIdRef = useRef(-1);

  useEffect(() => {
    setDrafts(draftsFromItems(items));
  }, [items]);

  useEffect(() => {
    const mq = window.matchMedia(XL_MEDIA);
    const sync = () => setIsWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isWide && selectedId == null && drafts[0]) {
      setSelectedId(drafts[0].id);
    }
  }, [isWide, selectedId, drafts]);

  const originalById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);

  const dirtyIds = useMemo(
    () =>
      new Set(
        drafts
          .filter((d) => {
            const orig = originalById.get(d.id);
            return orig ? isDraftDirty(d, orig) : false;
          })
          .map((d) => d.id),
      ),
    [drafts, originalById],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return drafts;
    return drafts.filter(
      (d) =>
        d.slug.includes(q) ||
        d.nameEn.toLowerCase().includes(q) ||
        d.nameFr.toLowerCase().includes(q) ||
        d.nameZh.includes(q),
    );
  }, [drafts, query]);

  const selected = selectedId != null ? drafts.find((d) => d.id === selectedId) : undefined;
  const showList = isWide || mobileStep === "list";
  const showEditor = isWide || mobileStep === "edit";

  function selectItem(id: number) {
    setSelectedId(id);
    setRemoveTierIndex(null);
    if (!isWide) {
      setMobileStep("edit");
      setMessage(null);
    }
  }

  function backToList() {
    setMobileStep("list");
    setRemoveTierIndex(null);
    setMessage(null);
  }

  function patchSelected(patch: Partial<ItemDraft>) {
    if (!selected) return;
    setDrafts((prev) => prev.map((d) => (d.id === selected.id ? { ...d, ...patch } : d)));
  }

  function setPriceField(index: number, patch: Partial<PriceDraft>) {
    if (!selected) return;
    setDrafts((prev) =>
      prev.map((d) => {
        if (d.id !== selected.id) return d;
        const prices = [...d.prices];
        prices[index] = { ...prices[index], ...patch };
        return { ...d, prices };
      }),
    );
  }

  function addPriceTier() {
    if (!selected) return;
    const id = nextPriceIdRef.current;
    nextPriceIdRef.current -= 1;
    setDrafts((prev) =>
      prev.map((d) => {
        if (d.id !== selected.id) return d;
        return {
          ...d,
          prices: [
            ...d.prices,
            {
              id,
              labelEn: "New tier",
              labelFr: "Nouveau",
              labelZh: "新规格",
              count: "",
              price: "0.00",
              sortOrder: d.prices.length,
            },
          ],
        };
      }),
    );
  }

  function requestRemovePriceTier(index: number) {
    if (!selected || selected.prices.length <= 1) return;
    setRemoveTierIndex(index);
  }

  function confirmRemovePriceTier() {
    if (removeTierIndex == null || !selected || selected.prices.length <= 1) {
      setRemoveTierIndex(null);
      return;
    }

    const index = removeTierIndex;
    setRemoveTierIndex(null);
    setDrafts((prev) =>
      prev.map((d) => {
        if (d.id !== selected.id) return d;
        return {
          ...d,
          prices: d.prices
            .filter((_, i) => i !== index)
            .map((p, i) => ({ ...p, sortOrder: i })),
        };
      }),
    );
  }

  const removeTierDraft =
    removeTierIndex != null && selected ? selected.prices[removeTierIndex] : undefined;

  const saveDirty = useCallback(async () => {
    if (savingRef.current) return;

    const dirty = drafts.filter((d) => {
      const orig = originalById.get(d.id);
      return orig ? isDraftDirty(d, orig) : false;
    });
    if (dirty.length === 0) return;

    savingRef.current = true;
    setSaving(true);
    setMessage(null);

    const payload = dirty.map((d) => ({
      id: d.id,
      nameEn: d.nameEn,
      nameFr: d.nameFr,
      nameZh: d.nameZh,
      descriptionEn: d.descriptionEn,
      descriptionFr: d.descriptionFr,
      descriptionZh: d.descriptionZh,
      detailEn: d.detailEn,
      detailFr: d.detailFr,
      detailZh: d.detailZh,
      prices: d.prices.map((p, i) => ({
        id: p.id,
        price: Number(p.price),
        labelEn: p.labelEn.trim() || null,
        labelFr: p.labelFr.trim() || null,
        labelZh: p.labelZh.trim() || null,
        count: parseCount(p.count),
        sortOrder: i,
      })),
    }));

    const res = await fetch("/api/admin/menu", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: payload }),
    });

    savingRef.current = false;
    setSaving(false);

    if (!res.ok) {
      setMessage({ type: "err", text: "Could not save. Check all fields and try again." });
      return;
    }

    router.refresh();
  }, [drafts, originalById, router]);

  useEffect(() => {
    if (dirtyIds.size === 0 || saving) return;

    const timer = window.setTimeout(() => {
      void saveDirty();
    }, AUTO_SAVE_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [dirtyIds.size, drafts, saveDirty, saving]);

  const saveStatus =
    saving ? "Saving…" : dirtyIds.size > 0 ? "Unsaved changes" : "All changes saved";

  const nameKey = `${langTab === "en" ? "nameEn" : langTab === "fr" ? "nameFr" : "nameZh"}` as const;
  const descKey =
    `${langTab === "en" ? "descriptionEn" : langTab === "fr" ? "descriptionFr" : "descriptionZh"}` as const;
  const detailKey =
    `${langTab === "en" ? "detailEn" : langTab === "fr" ? "detailFr" : "detailZh"}` as const;
  const priceLabelKey =
    `${langTab === "en" ? "labelEn" : langTab === "fr" ? "labelFr" : "labelZh"}` as const;

  return (
    <>
      <AdminConfirmDialog
        open={removeTierIndex != null}
        title="Remove this price tier?"
        description={
          removeTierDraft
            ? `“${draftPriceLabel(removeTierDraft, langTab)}” will be deleted from this dish. This can’t be undone until you add it back manually.`
            : "This price tier will be deleted from this dish."
        }
        confirmLabel="Remove tier"
        onConfirm={confirmRemovePriceTier}
        onCancel={() => setRemoveTierIndex(null)}
      />

      <section className="relative mx-auto max-w-6xl px-5 py-5 sm:px-8 sm:py-6 xl:pb-8">
        {message?.type === "err" && (
          <p
            className={`mb-4 rounded-xl px-4 py-3 text-sm font-semibold bg-[var(--color-lacquer)]/10 text-[var(--color-lacquer)]`}
          >
            {message.text}
          </p>
        )}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] xl:items-start">
        {/* step 1 — dish list */}
        {showList && (
          <aside className="xl:sticky xl:top-4 xl:self-start">
            <div className="mb-3">
              <p className="eyebrow text-[var(--color-lacquer)]">Choose a dish</p>
              <h2 className="font-display text-xl text-[var(--color-ink)]">Select a dish to edit</h2>
              <p
                className={`mt-1 text-sm ${
                  saving || dirtyIds.size > 0
                    ? "font-semibold text-[var(--color-gold)]"
                    : "text-[var(--color-ink)]/50"
                }`}
              >
                {saveStatus}
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink)]/60 xl:hidden">
                Tap a dish to open the editor.
              </p>
            </div>

            <label className="sr-only" htmlFor="admin-search">
              Search dishes
            </label>
            <div className="relative mb-3">
              <span
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-ink)]/50"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </span>
              <input
                id="admin-search"
                type="search"
                placeholder="Search dishes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={searchClass}
              />
            </div>

            <p className="mb-2 text-xs font-semibold text-[var(--color-ink)]/45">
              {filtered.length} dish{filtered.length === 1 ? "" : "es"}
            </p>

            <ul className="space-y-2 overflow-y-auto rounded-2xl border border-[var(--color-ink)]/10 bg-white/70 p-2 shadow-sm xl:max-h-[min(70vh,42rem)]">
              {filtered.map((d) => {
                const active = d.id === selectedId;
                const dirty = dirtyIds.has(d.id);
                return (
                  <li key={d.id}>
                    <button
                      type="button"
                      onClick={() => selectItem(d.id)}
                      className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition xl:p-2 ${
                        active
                          ? "bg-[var(--color-lacquer)] text-[var(--color-cream)] shadow-md"
                          : "hover:bg-[var(--color-cream-2)]/80 active:bg-[var(--color-cream-2)]"
                      }`}
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[var(--color-cream-2)]">
                        {d.image ? (
                          <Image
                            src={dishThumb(d.image)}
                            alt=""
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="grid size-full place-items-center text-2xl">{d.emoji}</span>
                        )}
                      </div>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold leading-tight">
                          {draftName(d, lang)}
                        </span>
                        <span
                          className={`mt-0.5 block truncate text-[0.65rem] uppercase tracking-wide ${
                            active ? "text-[var(--color-cream)]/60" : "text-[var(--color-ink)]/45"
                          }`}
                        >
                          {d.slug}
                          {dirty ? " · edited" : ""}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 text-lg leading-none xl:hidden ${
                          active ? "text-[var(--color-gold)]" : "text-[var(--color-ink)]/25"
                        }`}
                        aria-hidden
                      >
                        ›
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

        {/* step 2 — editor */}
        {showEditor && selected ? (
          <div>
            {/* mobile edit header */}
            {!isWide && (
              <div className="sticky top-0 z-20 -mx-1 mb-4 flex items-center gap-2 rounded-2xl border border-[var(--color-ink)]/10 bg-[var(--color-cream)]/95 px-2 py-2 shadow-sm backdrop-blur-md">
                <button
                  type="button"
                  onClick={backToList}
                  className="flex shrink-0 items-center gap-1 rounded-xl px-3 py-2 text-sm font-bold text-[var(--color-lacquer)] transition hover:bg-[var(--color-cream-2)]"
                >
                  <span aria-hidden>←</span>
                  Dishes
                </button>
                <span className="min-w-0 flex-1 text-center">
                  <span className="block truncate text-sm font-bold text-[var(--color-ink)]">
                    {draftName(selected, lang)}
                  </span>
                  <span
                    className={`block text-[0.65rem] font-semibold ${
                      saving || dirtyIds.size > 0
                        ? "text-[var(--color-gold)]"
                        : "text-[var(--color-jade)]"
                    }`}
                  >
                    {saveStatus}
                  </span>
                </span>
                <span className="w-[5.5rem] shrink-0" aria-hidden />
              </div>
            )}

            {!isWide && message?.type === "err" && (
              <p
                className="mb-4 rounded-xl bg-[var(--color-lacquer)]/10 px-4 py-3 text-sm font-semibold text-[var(--color-lacquer)]"
              >
                {message.text}
              </p>
            )}

            <div className="overflow-hidden rounded-3xl border border-[var(--color-ink)]/10 bg-white/80 shadow-[0_24px_60px_-40px_rgba(28,14,11,0.45)]">
              <div className="relative grid gap-0 md:grid-cols-[minmax(0,11rem)_1fr]">
                <div className="relative aspect-[4/3] min-h-[10rem] bg-[var(--color-cream-2)] md:aspect-auto md:min-h-[12rem]">
                  {selected.image ? (
                    <Image
                      src={selected.image}
                      alt={draftName(selected, lang)}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="grid size-full place-items-center text-6xl">{selected.emoji}</span>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-lacquer)]/55 to-transparent md:bg-gradient-to-r" />
                </div>
                <div className="flex flex-col justify-center bg-[var(--color-lacquer)] p-5 text-[var(--color-cream)] md:p-6">
                  <span className="text-2xl md:text-3xl">{selected.emoji}</span>
                  <h2 className="font-display mt-2 text-xl leading-tight md:text-2xl">
                    {draftName(selected, langTab)}
                  </h2>
                  <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-soft)]">
                    {selected.slug}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap gap-2 border-b border-[var(--color-ink)]/10 pb-4">
                  {(["en", "fr", "zh"] as const).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setLangTab(code)}
                      className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                        langTab === code
                          ? "bg-[var(--color-lacquer)] text-[var(--color-cream)]"
                          : "bg-[var(--color-cream-2)]/70 text-[var(--color-ink)]/70 hover:bg-[var(--color-cream-2)]"
                      }`}
                    >
                      {languageLabels[code]}
                    </button>
                  ))}
                </div>

                <div className="mt-5 space-y-4">
                  <label className="block">
                    <span className="eyebrow text-[var(--color-lacquer)]">Name</span>
                    <input
                      type="text"
                      value={selected[nameKey]}
                      onChange={(e) => patchSelected({ [nameKey]: e.target.value })}
                      className={`${fieldClass} mt-1.5`}
                    />
                  </label>

                  <label className="block">
                    <span className="eyebrow text-[var(--color-lacquer)]">Short description</span>
                    <span className="ml-2 text-[0.65rem] text-[var(--color-ink)]/45">(card)</span>
                    <textarea
                      rows={2}
                      value={selected[descKey]}
                      onChange={(e) => patchSelected({ [descKey]: e.target.value })}
                      className={`${fieldClass} mt-1.5 resize-y`}
                    />
                  </label>

                  <label className="block">
                    <span className="eyebrow text-[var(--color-lacquer)]">Full description</span>
                    <span className="ml-2 text-[0.65rem] text-[var(--color-ink)]/45">(modal)</span>
                    <textarea
                      rows={4}
                      value={selected[detailKey]}
                      onChange={(e) => patchSelected({ [detailKey]: e.target.value })}
                      className={`${fieldClass} mt-1.5 resize-y`}
                    />
                  </label>
                </div>

                <div className="mt-8 rounded-2xl bg-[var(--color-cream-2)]/50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="eyebrow text-[var(--color-lacquer)]">Prices</p>
                    <button
                      type="button"
                      onClick={addPriceTier}
                      className="rounded-full border border-[var(--color-lacquer)]/20 bg-white px-3.5 py-1.5 text-xs font-bold text-[var(--color-lacquer)] transition hover:border-[var(--color-lacquer)] hover:bg-[var(--color-cream)]"
                    >
                      + Add tier
                    </button>
                  </div>
                  <div className="mt-3 space-y-3">
                    {selected.prices.map((priceDraft, index) => (
                      <div
                        key={priceDraft.id}
                        className="rounded-xl border border-[var(--color-ink)]/10 bg-white/80 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-[var(--color-ink)]">
                            {draftPriceLabel(priceDraft, langTab)}
                          </span>
                          <button
                            type="button"
                            onClick={() => requestRemovePriceTier(index)}
                            disabled={selected.prices.length <= 1}
                            className="text-xs font-bold text-[var(--color-lacquer)] transition hover:underline disabled:cursor-not-allowed disabled:opacity-35"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <label className="block sm:col-span-2">
                            <span className="text-xs font-semibold text-[var(--color-ink)]/60">
                              Tier name ({languageLabels[langTab]})
                            </span>
                            <input
                              type="text"
                              value={priceDraft[priceLabelKey]}
                              onChange={(e) =>
                                setPriceField(index, { [priceLabelKey]: e.target.value })
                              }
                              placeholder="e.g. Small"
                              className={`${fieldClass} mt-1`}
                            />
                          </label>
                          <label className="block">
                            <span className="text-xs font-semibold text-[var(--color-ink)]/60">
                              Piece count
                            </span>
                            <span className="ml-1 text-[0.65rem] text-[var(--color-ink)]/40">
                              (optional)
                            </span>
                            <input
                              type="number"
                              min="1"
                              step="1"
                              inputMode="numeric"
                              value={priceDraft.count}
                              onChange={(e) => setPriceField(index, { count: e.target.value })}
                              placeholder="e.g. 10"
                              className={`${fieldClass} mt-1`}
                            />
                          </label>
                          <label className="block">
                            <span className="text-xs font-semibold text-[var(--color-ink)]/60">
                              Price
                            </span>
                            <div className="relative mt-1">
                              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--color-ink)]/40">
                                $
                              </span>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                inputMode="decimal"
                                value={priceDraft.price}
                                onChange={(e) => setPriceField(index, { price: e.target.value })}
                                className={`${fieldClass} pl-8`}
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : showEditor ? (
          <p className="rounded-2xl border border-dashed border-[var(--color-ink)]/15 p-10 text-center text-[var(--color-ink)]/50">
            Select a dish to edit.
          </p>
        ) : null}
        </div>
      </section>
    </>
  );
}
