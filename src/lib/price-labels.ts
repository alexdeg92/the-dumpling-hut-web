import type { Lang } from "@/lib/content";

const TIER_LABELS: Partial<Record<number, Record<Lang, string>>> = {
  10: { en: "Small", fr: "Petit", zh: "小份" },
  16: { en: "Regular", fr: "Régulier", zh: "标准" },
};

export function inferPriceLabels(count: number | null): Record<Lang, string> | null {
  if (count == null) return null;
  return TIER_LABELS[count] ?? null;
}

export function resolvePriceLabels(
  count: number | null,
  stored: { en: string | null; fr: string | null; zh: string | null },
): { en: string | null; fr: string | null; zh: string | null } {
  const inferred = inferPriceLabels(count);
  return {
    en: stored.en ?? inferred?.en ?? null,
    fr: stored.fr ?? inferred?.fr ?? null,
    zh: stored.zh ?? inferred?.zh ?? null,
  };
}
