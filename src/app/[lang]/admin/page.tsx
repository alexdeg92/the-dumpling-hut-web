import { redirect } from "next/navigation";

import { AdminMenuEditor } from "@/components/admin-menu-editor";
import { isAdminSession } from "@/lib/admin-session";
import { isLang, languages } from "@/lib/content";
import { loadAdminMenu } from "@/lib/menu-db";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) redirect("/en/admin");

  if (!(await isAdminSession())) {
    redirect(`/${lang}/admin/login`);
  }

  const items = await loadAdminMenu();

  return <AdminMenuEditor items={items} />;
}
