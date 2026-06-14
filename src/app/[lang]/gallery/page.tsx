import Image from "next/image";
import { notFound } from "next/navigation";
import { PageIntro, SiteChrome } from "@/components/site-shell";
import { getCopy, imageUrls, isLang, type Lang } from "@/lib/content";

const galleryImages = [
  imageUrls.dumplings,
  imageUrls.kitchen,
  imageUrls.table,
  imageUrls.steam,
  imageUrls.vegetables,
  imageUrls.hero,
] as const;

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();

  const lang = rawLang as Lang;
  const copy = getCopy(lang);

  return (
    <SiteChrome lang={lang} copy={copy} active="gallery">
      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro eyebrow={copy.gallery.eyebrow} title={copy.gallery.title} intro={copy.gallery.intro} />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {copy.gallery.images.map(([title, caption], index) => (
              <figure
                key={title}
                className={`card overflow-hidden ${index === 0 || index === 5 ? "lg:row-span-2" : ""}`}
              >
                <div className={`relative ${index === 0 || index === 5 ? "h-[520px]" : "h-64"}`}>
                  <Image
                    src={galleryImages[index]}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-5">
                  <h2 className="text-xl font-black text-red-950">{title}</h2>
                  <p className="mt-2 leading-7 text-red-950/65">{caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
