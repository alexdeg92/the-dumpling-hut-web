import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, languages, type Lang } from "@/lib/content";
import { I18nProvider } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { LanguageDetector } from "@/components/language-detector";
import { OrderModalProvider } from "@/components/order-modal";
import { RestaurantJsonLd } from "@/components/restaurant-json-ld";
import { SiteChrome } from "@/components/site-chrome";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  return buildPageMetadata(lang, "");
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <I18nProvider lang={lang as Lang}>
      <OrderModalProvider>
        <RestaurantJsonLd />
        <LanguageDetector current={lang as Lang} />
        <SiteChrome>{children}</SiteChrome>
      </OrderModalProvider>
    </I18nProvider>
  );
}
