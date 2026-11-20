import type { Metadata } from 'next'
import Image from 'next/image'
import { Regions } from '@/components/home/Regions'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { belgesel as c } from '@/content/pages'
import { breadcrumbLd, JsonLd, ogDefaults, serviceLd } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: '/belgesel' },
  openGraph: { ...ogDefaults, title: `${c.meta.title} – ELIS360 NEWS`, description: c.meta.description, url: '/belgesel' },
}

/**
 * Belgesel ve zorlu saha — PDF s.6. Savaş/kriz deneyimi uzmanlık kanıtı olarak burada durur;
 * sitenin geneline hâkim olmaz (PDF not 06).
 */
export default function BelgeselPage() {
  return (
    <main>
      <JsonLd
        data={serviceLd({
          path: '/belgesel',
          name: c.meta.title,
          serviceType: 'Documentary production',
          description: c.meta.description,
          items: c.cards.flatMap((k) => k.points),
        })}
      />
      <JsonLd data={breadcrumbLd([{ name: 'Ana sayfa', path: '/' }, { name: 'Belgesel', path: '/belgesel' }])} />
      <PageHero label={c.hero.label} title={c.hero.title} lead={c.hero.lead} cta={c.hero.cta} image={c.hero.image} breadcrumb={c.hero.breadcrumb} />

      {/* İki görsel + iki hizmet kartı */}
      <section aria-label="Belgesel ve zorlu saha hizmetleri">
        <div className="shell py-section">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {c.visuals.map((v) => (
              <figure key={v.caption} className="relative m-0 min-w-0 overflow-hidden bg-ink">
                <Image src={v.image.src} alt={v.image.alt} width={v.image.width} height={v.image.height} sizes="(min-width: 960px) 50vw, 100vw" className="block aspect-[16/10] w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/[0.92] to-ink/0 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white">
                  {v.caption}
                </figcaption>
              </figure>
            ))}
            {c.cards.map((k) => {
              const dark = k.tone === 'dark'
              return (
                <article key={k.num} className={`min-w-0 border p-[clamp(24px,3vw,40px)] ${dark ? 'surface-dark border-ink bg-ink text-onDark' : 'border-rule bg-white'}`}>
                  <p className={`mb-4 font-mono text-[12px] font-semibold tracking-[0.2em] ${dark ? 'text-accent-light' : 'text-accent'}`}>{k.num}</p>
                  <h2 className={`mb-4 font-display text-h3-svc font-bold ${dark ? 'text-white' : ''}`}>{k.title}</h2>
                  <p className={`mb-6 text-body leading-[1.7] ${dark ? 'text-onDark-muted' : 'text-ink-body'}`}>{k.text}</p>
                  <ul className={`font-mono text-[12px] leading-[1.5] tracking-[0.04em] ${dark ? 'text-onDark-muted' : 'text-ink-mono'}`}>
                    {k.points.map((pt) => (
                      <li key={pt} className={`border-t py-[9px] ${dark ? 'border-white/[0.12]' : 'border-ink/[0.12]'}`}>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <Regions content={c.regions} />

      {/* Öne çıkan özel proje */}
      <section aria-labelledby="ozel-proje-baslik" className="bg-paper-cream">
        <div className="shell py-section">
          <div className="grid grid-cols-1 items-center gap-y-10 border border-rule bg-white p-[clamp(24px,3.5vw,48px)] lg:grid-cols-12 lg:gap-x-10">
            <div className="min-w-0 lg:col-span-5">
              <p className="mb-5 font-mono text-label font-semibold uppercase text-accent">{c.feature.label}</p>
              <h2 id="ozel-proje-baslik" className="mb-5 font-display text-h2 font-bold">
                {c.feature.title}
              </h2>
              <p className="mb-6 text-body leading-[1.7] text-ink-body">{c.feature.text}</p>
              <blockquote className="border-l-[3px] border-accent pl-5 font-display text-[21px] font-semibold italic leading-[1.4]">{c.feature.quote}</blockquote>
            </div>
            <figure className="m-0 min-w-0 lg:col-span-7">
              <Image src={c.feature.image.src} alt={c.feature.image.alt} width={c.feature.image.width} height={c.feature.image.height} sizes="(min-width: 960px) 55vw, 100vw" className="block h-auto w-full" />
            </figure>
          </div>
        </div>
      </section>

      <CtaBand label="Belgesel ve saha" title="Hikâyenizi sahada birlikte kuralım." text="Konuyu, bölgeyi ve takvimi bize yazın; araştırma, ekip ve güvenlik planını birlikte oluşturalım." />
    </main>
  )
}
