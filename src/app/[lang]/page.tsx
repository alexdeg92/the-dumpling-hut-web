import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageIntro, SiteChrome } from "@/components/site-shell";
import { featuredDishes, getCopy, imageUrls, isLang, restaurant, type Lang } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();

  const lang = rawLang as Lang;
  const copy = getCopy(lang);

  return (
    <SiteChrome lang={lang} copy={copy} active="home">
      <section className="relative isolate overflow-hidden bg-red-950 text-white">
        <Image
          src={imageUrls.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-950 via-red-950/85 to-red-950/35" />
        <div className="mx-auto grid min-h-[calc(86svh-76px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold">{copy.home.eyebrow}</p>
            <h1 className="mt-5 text-balance text-5xl font-black leading-[1.02] sm:text-6xl lg:text-7xl">
              {copy.home.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/82">
              {copy.home.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/${lang}/menu`} className="button-primary">
                {copy.home.ctaPrimary}
              </Link>
              <Link href={`/${lang}/location`} className="button-secondary border-white/30 bg-white/10 text-white hover:bg-white hover:text-red-950">
                {copy.home.ctaSecondary}
              </Link>
            </div>
          </div>

          <aside className="self-end rounded-3xl border border-white/20 bg-white/12 p-5 shadow-2xl backdrop-blur-md">
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {copy.home.stats.map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-white p-5 text-red-950">
                  <p className="text-4xl font-black text-red-800">{value}</p>
                  <p className="mt-2 text-sm font-bold leading-5 text-red-950/70">{label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro
            eyebrow={copy.home.featuredTitle}
            title={copy.home.featuredIntro}
            intro={`${restaurant.address} · ${restaurant.phone}`}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredDishes.map((dish, index) => (
              <article key={dish.name.en} className="card overflow-hidden">
                <div className="relative h-56">
                  <Image
                    src={[imageUrls.dumplings, imageUrls.steam, imageUrls.vegetables][index]}
                    alt={dish.name[lang]}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-black text-red-950">{dish.name[lang]}</h2>
                  <p className="mt-3 leading-7 text-red-950/70">{dish.text[lang]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="eyebrow">{copy.common.openKitchen}</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-red-950">
                {copy.home.testimonialsTitle}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {copy.home.testimonials.map((item) => (
                <figure key={item.author} className="rounded-2xl border border-red-950/10 bg-cream p-6">
                  <blockquote className="text-lg font-bold leading-7 text-red-950">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-black text-red-800">
                    {item.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
