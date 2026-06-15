import { MenuPageBody } from "@/components/pages/menu-page";
import { createPageMetadata } from "@/lib/seo";

export const generateMetadata = createPageMetadata("menu");

export default function MenuPage() {
  return <MenuPageBody />;
}
