import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import {
  FeaturedDishes,
  StatsBand,
  StoryStrip,
} from "@/components/home-sections";
import { Feed } from "@/components/feed";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedDishes />
      <StoryStrip />
      <StatsBand />
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <Feed />
      </section>
    </>
  );
}
