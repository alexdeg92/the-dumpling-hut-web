import Image from "next/image";
import { notFound } from "next/navigation";
import { PageIntro, SiteChrome } from "@/components/site-shell";
import { getCopy, imageUrls, isLang, restaurant, type Lang } from "@/lib/content";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();

  const lang = rawLang as Lang;
  const copy = getCopy(lang);

  return (
    <SiteChrome lang={lang} copy={copy} active="location">
      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro eyebrow={copy.location.eyebrow} title={copy.location.title} intro={copy.location.intro} />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="card overflow-hidden">
              <div className="relative min-h-[430px] bg-red-900">
                <Image
                  src={imageUrls.table}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/95 via-red-950/75 to-red-800/65" />
                <div className="relative flex min-h-[430px] flex-col justify-end p-8 text-white">
                  <p className="eyebrow text-gold">{copy.location.mapTitle}</p>
                  <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight">{restaurant.address}</h2>
                  <p className="mt-5 max-w-lg text-lg leading-8 text-white/78">{copy.location.transit}</p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a className="button-primary" href={restaurant.mapsHref} target="_blank" rel="noreferrer">
                      {copy.common.directions}
                    </a>
                    <a className="button-secondary border-white/30 bg-white/10 text-white hover:bg-white hover:text-red-950" href={restaurant.phoneHref}>
                      {copy.common.order}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <aside className="grid gap-6">
              <section className="card p-7">
                <h2 className="text-2xl font-black text-red-950">{copy.common.hours}</h2>
                <div className="mt-5 divide-y divide-red-950/10">
                  {copy.hours.map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between gap-4 py-3">
                      <p className="font-bold text-red-950">{day}</p>
                      <p className="text-right font-black text-red-800">{hours}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="card p-7">
                <h2 className="text-2xl font-black text-red-950">{copy.common.phone}</h2>
                <a href={restaurant.phoneHref} className="mt-3 block text-xl font-black text-red-800 hover:text-red-950">
                  {restaurant.phone}
                </a>
                <h2 className="mt-7 text-2xl font-black text-red-950">{copy.common.instagram}</h2>
                <a href={restaurant.instagramHref} target="_blank" rel="noreferrer" className="mt-3 block text-xl font-black text-red-800 hover:text-red-950">
                  {restaurant.instagram}
                </a>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
