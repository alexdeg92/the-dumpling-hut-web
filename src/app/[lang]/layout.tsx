import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCopy, isLang, languages, restaurant, type Lang } from "@/lib/content";
import { I18nProvider } from "@/lib/i18n";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LanguageDetector } from "@/components/language-detector";
import { OrderModalProvider } from "@/components/order-modal";

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

  const c = getCopy(lang);
  return {
    title: c.metadata.title,
    description: c.metadata.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(languages.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: c.metadata.title,
      description: c.metadata.description,
      type: "website",
      locale: c.locale,
      siteName: restaurant.name,
    },
  };
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
        <LanguageDetector current={lang as Lang} />
        <div className="relative flex min-h-screen flex-col">
          <Nav />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </div>
      </OrderModalProvider>
    </I18nProvider>
  );
}
