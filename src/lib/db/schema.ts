import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/** Editable menu copy and metadata (filter tags stay in code for now). */
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameEn: text("name_en").notNull(),
  nameFr: text("name_fr").notNull(),
  nameZh: text("name_zh").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionFr: text("description_fr").notNull(),
  descriptionZh: text("description_zh").notNull(),
  detailEn: text("detail_en").notNull(),
  detailFr: text("detail_fr").notNull(),
  detailZh: text("detail_zh").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/** One row per price tier (e.g. 10 pcs / 16 pcs, or a single side price). */
export const menuItemPrices = pgTable("menu_item_prices", {
  id: serial("id").primaryKey(),
  menuItemId: integer("menu_item_id")
    .notNull()
    .references(() => menuItems.id, { onDelete: "cascade" }),
  /** Tier name per language (e.g. "Small") — count lives in `count`, not here. */
  labelEn: text("label_en"),
  labelFr: text("label_fr"),
  labelZh: text("label_zh"),
  /** Piece count when relevant (10, 16); null for single-price sides. */
  count: integer("count"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type MenuItemRow = typeof menuItems.$inferSelect;
export type MenuItemPriceRow = typeof menuItemPrices.$inferSelect;
