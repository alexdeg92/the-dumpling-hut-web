import Image from "next/image";
import { notFound } from "next/navigation";
import { PageIntro, SiteChrome } from "@/components/site-shell";
import { getCopy, imageUrls, isLang, type Lang } from "@/lib/content";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();

  const lang = rawLang as Lang;
  const copy = getCopy(lang);

  return (
    <SiteChrome lang={lang} copy={copy} active="about">
      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro eyebrow={copy.about.eyebrow} title={copy.about.title} intro={copy.about.intro} />

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <Image src={imageUrls.kitchen} alt="" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
            </div>
            <div className="grid gap-5">
              <article className="card p-7">
                <h2 className="text-3xl font-black text-red-950">{copy.about.storyTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-red-950/70">{copy.about.story}</p>
              </article>
              <article className="card p-7">
                <h2 className="text-3xl font-black text-red-950">{copy.about.atmosphereTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-red-950/70">{copy.about.atmosphere}</p>
              </article>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.about.values.map((value) => (
              <div key={value} className="rounded-2xl border border-red-950/10 bg-white p-5 shadow-sm">
                <span className="block size-3 rounded-full bg-gold" />
                <p className="mt-4 text-lg font-black leading-6 text-red-950">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
