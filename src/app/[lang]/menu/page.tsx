import { notFound } from "next/navigation";
import { PageIntro, SiteChrome } from "@/components/site-shell";
import { getCopy, isLang, type Lang } from "@/lib/content";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();

  const lang = rawLang as Lang;
  const copy = getCopy(lang);

  return (
    <SiteChrome lang={lang} copy={copy} active="menu">
      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageIntro eyebrow={copy.menu.eyebrow} title={copy.menu.title} intro={copy.menu.intro} />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {copy.menu.sections.map((section) => (
              <section key={section.title} className="card p-6 sm:p-8">
                <div className="flex flex-col gap-4 border-b border-red-950/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-red-950">{section.title}</h2>
                    <p className="mt-2 leading-7 text-red-950/65">{section.description}</p>
                  </div>
                  <p className="shrink-0 rounded-full bg-gold px-4 py-2 text-sm font-black text-red-950">
                    {section.price}
                  </p>
                </div>
                <div className="mt-6 grid gap-5">
                  {section.items.map(([name, description]) => (
                    <article key={name} className="flex gap-4">
                      <span className="mt-2 size-2.5 shrink-0 rounded-full bg-red-800" />
                      <div>
                        <h3 className="text-lg font-black text-red-950">{name}</h3>
                        <p className="mt-1 leading-7 text-red-950/65">{description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
