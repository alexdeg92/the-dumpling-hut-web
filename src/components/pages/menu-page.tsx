"use client";

import type { MenuItem } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { MenuExplorer } from "@/components/menu-explorer";

export function MenuPageBody({ items }: { items: MenuItem[] }) {
  const { t } = useI18n();
  return (
    <>
      <div className="hidden md:block">
        <PageHeader eyebrow={t.menu.eyebrow} title={t.menu.title} lead={t.menu.lead} />
      </div>
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-24 sm:px-8 md:pt-10">
        <MenuExplorer items={items} />
      </section>
    </>
  );
}
