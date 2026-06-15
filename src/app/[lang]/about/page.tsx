import { StoryPageBody } from "@/components/pages/story-page";
import { createPageMetadata } from "@/lib/seo";

export const generateMetadata = createPageMetadata("about");

export default function AboutPage() {
  return <StoryPageBody />;
}
