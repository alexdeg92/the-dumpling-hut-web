import { config } from "dotenv";

config({ path: ".env.local" });

import { eq, isNull, or } from "drizzle-orm";

import { getItemSizes, menuItems as staticMenuItems } from "@/lib/content";
import { getDb, schema } from "@/lib/db";
import { inferPriceLabels } from "@/lib/price-labels";

function priceLabel(count: number, lang: "en" | "fr" | "zh"): string {
  return inferPriceLabels(count)?.[lang] ?? (count === 10 ? "Small" : "Regular");
}

async function seedMenu() {
  const db = getDb();

  for (const item of staticMenuItems) {
    const [saved] = await db
      .insert(schema.menuItems)
      .values({
        slug: item.id,
        nameEn: item.name.en,
        nameFr: item.name.fr,
        nameZh: item.name.zh,
        descriptionEn: item.blurb.en,
        descriptionFr: item.blurb.fr,
        descriptionZh: item.blurb.zh,
        detailEn: item.detail.en,
        detailFr: item.detail.fr,
        detailZh: item.detail.zh,
      })
      .onConflictDoUpdate({
        target: schema.menuItems.slug,
        set: {
          nameEn: item.name.en,
          nameFr: item.name.fr,
          nameZh: item.name.zh,
          descriptionEn: item.blurb.en,
          descriptionFr: item.blurb.fr,
          descriptionZh: item.blurb.zh,
          detailEn: item.detail.en,
          detailFr: item.detail.fr,
          detailZh: item.detail.zh,
          updatedAt: new Date(),
        },
      })
      .returning({ id: schema.menuItems.id });

    if (!saved) {
      throw new Error(`Failed to upsert menu item ${item.id}`);
    }

    await db.delete(schema.menuItemPrices).where(eq(schema.menuItemPrices.menuItemId, saved.id));

    const tiers = getItemSizes(item);
    const priceRows =
      tiers.length > 0
        ? tiers.map((tier, index) => {
            const count = tier.count ?? 0;
            return {
              menuItemId: saved.id,
              labelEn: priceLabel(count, "en"),
              labelFr: priceLabel(count, "fr"),
              labelZh: priceLabel(count, "zh"),
              count,
              price: tier.price.toFixed(2),
              sortOrder: index,
            };
          })
        : [
            {
              menuItemId: saved.id,
              labelEn: null,
              labelFr: null,
              labelZh: null,
              count: item.count,
              price: item.price.toFixed(2),
              sortOrder: 0,
            },
          ];

    await db.insert(schema.menuItemPrices).values(priceRows);
  }

  const missingLabels = await db
    .select()
    .from(schema.menuItemPrices)
    .where(or(isNull(schema.menuItemPrices.labelEn), isNull(schema.menuItemPrices.labelFr)));

  for (const row of missingLabels) {
    const inferred = inferPriceLabels(row.count);
    if (!inferred) continue;
    await db
      .update(schema.menuItemPrices)
      .set({
        labelEn: row.labelEn ?? inferred.en,
        labelFr: row.labelFr ?? inferred.fr,
        labelZh: row.labelZh ?? inferred.zh,
      })
      .where(eq(schema.menuItemPrices.id, row.id));
  }

  console.log(`Seeded ${staticMenuItems.length} menu items into Neon.`);
}

seedMenu().catch((error) => {
  console.error(error);
  process.exit(1);
});
