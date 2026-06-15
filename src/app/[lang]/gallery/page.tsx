import { FeedPageBody } from "@/components/pages/feed-page";
import { createPageMetadata } from "@/lib/seo";

export const generateMetadata = createPageMetadata("gallery");

export default function GalleryPage() {
  return <FeedPageBody />;
}
