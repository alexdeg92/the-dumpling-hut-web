import type { MetadataRoute } from "next";
import { languages } from "@/lib/content";
import { absoluteUrl, langPath, siteRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return siteRoutes.flatMap((route) =>
    languages.map((lang) => ({
      url: absoluteUrl(langPath(lang, route)),
      lastModified,
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          languages.map((altLang) => [altLang, absoluteUrl(langPath(altLang, route))]),
        ),
      },
    })),
  );
}
