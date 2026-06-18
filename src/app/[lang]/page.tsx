import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import {
  FeaturedDishes,
  StatsBand,
  StoryStrip,
} from "@/components/home-sections";
import { Feed } from "@/components/feed";
import { loadMenuItems } from "@/lib/menu-db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const menuItems = await loadMenuItems();

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedDishes menuItems={menuItems} />
      <StoryStrip />
      <StatsBand />
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Feed />
      </section>
    </>
  );
}
