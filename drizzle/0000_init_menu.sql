CREATE TABLE "menu_item_prices" (
	"id" serial PRIMARY KEY NOT NULL,
	"menu_item_id" integer NOT NULL,
	"label_en" text,
	"label_fr" text,
	"label_zh" text,
	"count" integer,
	"price" numeric(10, 2) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "menu_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name_en" text NOT NULL,
	"name_fr" text NOT NULL,
	"name_zh" text NOT NULL,
	"description_en" text NOT NULL,
	"description_fr" text NOT NULL,
	"description_zh" text NOT NULL,
	"detail_en" text NOT NULL,
	"detail_fr" text NOT NULL,
	"detail_zh" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "menu_items_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "menu_item_prices" ADD CONSTRAINT "menu_item_prices_menu_item_id_menu_items_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;