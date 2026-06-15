import type { Metadata } from "next";
import { getCopy, isLang, languages, restaurant, type Lang } from "@/lib/content";
import {
  absoluteUrl,
  defaultOgImage,
  langPath,
  type SiteRoute,
} from "@/lib/site";

type PageSeo = {
  title: string;
  description: string;
};

function getPageSeo(lang: Lang, route: SiteRoute): PageSeo {
  const c = getCopy(lang);

  switch (route) {
    case "":
      return {
        title: c.metadata.title,
        description: c.metadata.description,
      };
    case "menu":
      return {
        title: `${c.nav.menu} | ${restaurant.name}`,
        description: `${c.menu.lead} ${restaurant.address}.`,
      };
    case "about":
      return {
        title: `${c.nav.story} | ${restaurant.name}`,
        description: c.story.lead,
      };
    case "gallery":
      return {
        title: `${c.nav.feed} | ${restaurant.name}`,
        description: c.feed.lead,
      };
    case "location":
      return {
        title: `${c.nav.visit} | ${restaurant.name}`,
        description: `${c.visit.lead} ${restaurant.address}.`,
      };
    default: {
      const never: never = route;
      throw new Error(`Unhandled site route: ${never}`);
    }
  }
}

export function buildPageMetadata(lang: Lang, route: SiteRoute): Metadata {
  const seo = getPageSeo(lang, route);
  const path = langPath(lang, route);
  const url = absoluteUrl(path);
  const copy = getCopy(lang);
  const ogImage = absoluteUrl(defaultOgImage);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(languages.map((l) => [l, langPath(l, route)])),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: restaurant.name,
      locale: copy.locale.replace("_", "-"),
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 1200,
          alt: `${restaurant.name} dumplings`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
  };
}

export function createPageMetadata(route: SiteRoute) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ lang: string }>;
  }): Promise<Metadata> {
    const { lang } = await params;
    if (!isLang(lang)) return {};
    return buildPageMetadata(lang, route);
  };
}
