import { redirect } from "next/navigation";
import { defaultLang } from "@/lib/content";

export default function RootPage() {
  redirect(`/${defaultLang}`);
}
