import { asc, eq, inArray } from "drizzle-orm";

import {
  menuItems as staticMenuItems,
  type MenuItem,
  type MenuSize,
} from "@/lib/content";
import { getDb, schema } from "@/lib/db";
import { inferPriceLabels, resolvePriceLabels } from "@/lib/price-labels";

function parsePrice(value: string): number {
  return Number(value);
}

const staticBySlug = new Map(staticMenuItems.map((item) => [item.id, item]));

export type AdminMenuPrice = {
  id: number;
  count: number | null;
  price: number;
  labelEn: string | null;
  labelFr: string | null;
  labelZh: string | null;
  sortOrder: number;
};

export type AdminMenuItem = {
  id: number;
  slug: string;
  nameEn: string;
  nameFr: string;
  nameZh: string;
  descriptionEn: string;
  descriptionFr: string;
  descriptionZh: string;
  detailEn: string;
  detailFr: string;
  detailZh: string;
  image: string;
  emoji: string;
  prices: AdminMenuPrice[];
};

export type AdminMenuPriceUpdate = {
  id: number;
  price: number;
  labelEn: string | null;
  labelFr: string | null;
  labelZh: string | null;
  count: number | null;
  sortOrder: number;
};

export type AdminMenuItemUpdate = {
  id: number;
  nameEn: string;
  nameFr: string;
  nameZh: string;
  descriptionEn: string;
  descriptionFr: string;
  descriptionZh: string;
  detailEn: string;
  detailFr: string;
  detailZh: string;
  prices: AdminMenuPriceUpdate[];
};

export async function loadAdminMenu(): Promise<AdminMenuItem[]> {
  const db = getDb();
  const rows = await db.select().from(schema.menuItems).orderBy(asc(schema.menuItems.id));
  const priceRows = await db
    .select()
    .from(schema.menuItemPrices)
    .orderBy(asc(schema.menuItemPrices.menuItemId), asc(schema.menuItemPrices.sortOrder));

  const pricesByItem = new Map<number, AdminMenuPrice[]>();
  for (const row of priceRows) {
    const list = pricesByItem.get(row.menuItemId) ?? [];
    const labels = resolvePriceLabels(row.count, {
      en: row.labelEn,
      fr: row.labelFr,
      zh: row.labelZh,
    });
    list.push({
      id: row.id,
      count: row.count,
      price: parsePrice(row.price),
      labelEn: labels.en,
      labelFr: labels.fr,
      labelZh: labels.zh,
      sortOrder: row.sortOrder,
    });
    pricesByItem.set(row.menuItemId, list);
  }

  return rows.map((row) => {
    const meta = staticBySlug.get(row.slug);
    return {
      id: row.id,
      slug: row.slug,
      nameEn: row.nameEn,
      nameFr: row.nameFr,
      nameZh: row.nameZh,
      descriptionEn: row.descriptionEn,
      descriptionFr: row.descriptionFr,
      descriptionZh: row.descriptionZh,
      detailEn: row.detailEn,
      detailFr: row.detailFr,
      detailZh: row.detailZh,
      image: meta?.image ?? "",
      emoji: meta?.emoji ?? "🥟",
      prices: pricesByItem.get(row.id) ?? [],
    };
  });
}

export async function loadMenuItems(): Promise<MenuItem[]> {
  if (!process.env.DATABASE_URL) {
    return staticMenuItems;
  }

  try {
    const db = getDb();
    const rows = await db.select().from(schema.menuItems);
    const priceRows = await db
      .select()
      .from(schema.menuItemPrices)
      .orderBy(asc(schema.menuItemPrices.menuItemId), asc(schema.menuItemPrices.sortOrder));

    const rowBySlug = new Map(rows.map((row) => [row.slug, row]));
    const pricesByItemId = new Map<number, typeof priceRows>();
    for (const price of priceRows) {
      const list = pricesByItemId.get(price.menuItemId) ?? [];
      list.push(price);
      pricesByItemId.set(price.menuItemId, list);
    }

    return staticMenuItems.map((item) => {
      const row = rowBySlug.get(item.id);
      if (!row) return item;

      const dbPrices = pricesByItemId.get(row.id) ?? [];
      const isSingleSidePrice = dbPrices.length === 1 && dbPrices[0].count == null;

      const sizes: MenuSize[] = isSingleSidePrice
        ? []
        : dbPrices.map((p) => {
            const labels = resolvePriceLabels(p.count, {
              en: p.labelEn,
              fr: p.labelFr,
              zh: p.labelZh,
            });
            return {
              id: p.id,
              count: p.count ?? undefined,
              price: parsePrice(p.price),
              label:
                labels.en || labels.fr || labels.zh
                  ? {
                      en: labels.en ?? undefined,
                      fr: labels.fr ?? undefined,
                      zh: labels.zh ?? undefined,
                    }
                  : undefined,
            };
          });

      const single = isSingleSidePrice ? dbPrices[0] : dbPrices.find((p) => p.count == null);

      return {
        ...item,
        name: { en: row.nameEn, fr: row.nameFr, zh: row.nameZh },
        blurb: {
          en: row.descriptionEn,
          fr: row.descriptionFr,
          zh: row.descriptionZh,
        },
        detail: { en: row.detailEn, fr: row.detailFr, zh: row.detailZh },
        sizes: sizes.length > 0 ? sizes : undefined,
        price:
          single != null
            ? parsePrice(single.price)
            : sizes.length > 0
              ? Math.min(...sizes.map((s) => s.price))
              : item.price,
      };
    });
  } catch (error) {
    console.error("Failed to load menu from database, using static fallback:", error);
    return staticMenuItems;
  }
}

export async function updateMenuItems(updates: AdminMenuItemUpdate[]): Promise<void> {
  const db = getDb();

  for (const item of updates) {
    if (item.prices.length === 0) {
      throw new Error(`Item ${item.id} must have at least one price tier`);
    }

    await db
      .update(schema.menuItems)
      .set({
        nameEn: item.nameEn.trim(),
        nameFr: item.nameFr.trim(),
        nameZh: item.nameZh.trim(),
        descriptionEn: item.descriptionEn.trim(),
        descriptionFr: item.descriptionFr.trim(),
        descriptionZh: item.descriptionZh.trim(),
        detailEn: item.detailEn.trim(),
        detailFr: item.detailFr.trim(),
        detailZh: item.detailZh.trim(),
        updatedAt: new Date(),
      })
      .where(eq(schema.menuItems.id, item.id));

    const existing = await db
      .select({ id: schema.menuItemPrices.id })
      .from(schema.menuItemPrices)
      .where(eq(schema.menuItemPrices.menuItemId, item.id));

    const keepIds = item.prices.filter((p) => p.id > 0).map((p) => p.id);
    const deleteIds = existing.map((row) => row.id).filter((id) => !keepIds.includes(id));

    if (deleteIds.length > 0) {
      await db.delete(schema.menuItemPrices).where(inArray(schema.menuItemPrices.id, deleteIds));
    }

    for (let i = 0; i < item.prices.length; i++) {
      const tier = item.prices[i];
      if (!Number.isFinite(tier.price) || tier.price < 0) {
        throw new Error(`Invalid price for tier ${tier.id}`);
      }

      const values = {
        labelEn: tier.labelEn?.trim() || inferPriceLabels(tier.count)?.en || null,
        labelFr: tier.labelFr?.trim() || inferPriceLabels(tier.count)?.fr || null,
        labelZh: tier.labelZh?.trim() || inferPriceLabels(tier.count)?.zh || null,
        count: tier.count,
        price: tier.price.toFixed(2),
        sortOrder: i,
      };

      if (tier.id < 0) {
        await db.insert(schema.menuItemPrices).values({
          menuItemId: item.id,
          ...values,
        });
      } else {
        await db
          .update(schema.menuItemPrices)
          .set(values)
          .where(eq(schema.menuItemPrices.id, tier.id));
      }
    }
  }
}
