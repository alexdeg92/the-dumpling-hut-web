import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCopy, isLang, languages, restaurant } from "@/lib/content";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;

  if (!isLang(rawLang)) {
    return {};
  }

  const pageCopy = getCopy(rawLang);

  return {
    title: pageCopy.metadata.title,
    description: pageCopy.metadata.description,
    alternates: {
      canonical: `/${rawLang}`,
      languages: Object.fromEntries(languages.map((lang) => [lang, `/${lang}`])),
    },
    openGraph: {
      title: pageCopy.metadata.title,
      description: pageCopy.metadata.description,
      type: "website",
      locale: rawLang === "fr" ? "fr_CA" : rawLang === "zh" ? "zh_CN" : "en_CA",
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
  const { lang: rawLang } = await params;

  if (!isLang(rawLang)) {
    notFound();
  }

  return children;
}
