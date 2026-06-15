import { VisitPageBody } from "@/components/pages/visit-page";
import { createPageMetadata } from "@/lib/seo";

export const generateMetadata = createPageMetadata("location");

export default function LocationPage() {
  return <VisitPageBody />;
}
