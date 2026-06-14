"use client";

import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { MenuExplorer } from "@/components/menu-explorer";

export function MenuPageBody() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t.menu.eyebrow} title={t.menu.title} lead={t.menu.lead} />
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8">
        <MenuExplorer />
      </section>
    </>
  );
}
