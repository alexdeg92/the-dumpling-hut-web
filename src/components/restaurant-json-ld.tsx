import { getCopy, restaurant } from "@/lib/content";
import { absoluteUrl, defaultOgImage } from "@/lib/site";

const dayNames: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
  Lun: "Monday",
  Mar: "Tuesday",
  Mer: "Wednesday",
  Jeu: "Thursday",
  Ven: "Friday",
  Sam: "Saturday",
  Dim: "Sunday",
  周一: "Monday",
  周二: "Tuesday",
  周三: "Wednesday",
  周四: "Thursday",
  周五: "Friday",
  周六: "Saturday",
  周日: "Sunday",
};

function buildOpeningHours() {
  return getCopy("en").hours.flatMap(([dayLabel, hoursLabel]) => {
    if (/closed|fermé|休息/i.test(hoursLabel)) return [];

    const [opens, closes] = hoursLabel.split("—").map((part) => part.trim());
    const dayOfWeek = dayNames[dayLabel];
    if (!dayOfWeek || !opens || !closes) return [];

    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayOfWeek}`,
        opens,
        closes,
      },
    ];
  });
}

export function RestaurantJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    alternateName: [restaurant.altName, restaurant.hanzi],
    image: absoluteUrl(defaultOgImage),
    url: absoluteUrl("/en"),
    telephone: restaurant.phoneHref.replace("tel:", ""),
    servesCuisine: "Chinese",
    priceRange: "$$",
    sameAs: [restaurant.instagramHref, restaurant.mapsHref],
    address: {
      "@type": "PostalAddress",
      streetAddress: "3591 Rue Clark",
      addressLocality: "Montréal",
      addressRegion: "QC",
      postalCode: "H2X 2R9",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.5149,
      longitude: -73.5698,
    },
    openingHoursSpecification: buildOpeningHours(),
    hasMenu: absoluteUrl("/en/menu"),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
