import { MenuPageBody } from "@/components/pages/menu-page";
import { loadMenuItems } from "@/lib/menu-db";
import { createPageMetadata } from "@/lib/seo";

export const generateMetadata = createPageMetadata("menu");

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const items = await loadMenuItems();
  return <MenuPageBody items={items} />;
}
