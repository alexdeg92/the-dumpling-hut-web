import { config } from "dotenv";

config({ path: ".env.local" });

import { eq, isNull, or } from "drizzle-orm";

import { getDb, schema } from "@/lib/db";
import { inferPriceLabels } from "@/lib/price-labels";

async function backfillPriceLabels() {
  const db = getDb();
  const rows = await db
    .select()
    .from(schema.menuItemPrices)
    .where(or(isNull(schema.menuItemPrices.labelEn), isNull(schema.menuItemPrices.labelFr)));

  let updated = 0;
  for (const row of rows) {
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
    updated += 1;
  }

  console.log(`Backfilled labels on ${updated} price tier(s).`);
}

backfillPriceLabels().catch((error) => {
  console.error(error);
  process.exit(1);
});
