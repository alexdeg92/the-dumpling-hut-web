"use client";

import { useI18n } from "@/lib/i18n";
import { PageHeader } from "@/components/page-header";
import { Feed } from "@/components/feed";

export function FeedPageBody() {
  const { t } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t.feed.eyebrow} title={t.feed.title} lead={t.feed.lead} />
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Feed />
      </section>
    </>
  );
}
