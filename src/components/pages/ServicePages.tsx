import Image from 'next/image'
import { Process } from '@/components/home/Process'
import { Regions } from '@/components/home/Regions'
import { BulletColumns } from '@/components/sections/BulletColumns'
import { CtaBand } from '@/components/sections/CtaBand'
import { ImageBand } from '@/components/sections/ImageBand'
import { ListSection } from '@/components/sections/ListSection'
import { Manifesto } from '@/components/sections/Manifesto'
import { MediaSplit } from '@/components/sections/MediaSplit'
import { PageHero } from '@/components/sections/PageHero'
import { ROUTES, type Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'
import { breadcrumbLd, JsonLd, serviceLd } from '@/lib/seo'
import { pageContent } from './content'
import { blurProps } from '@/content/images'

const crumbs = (locale: Locale, name: string, key: keyof typeof ROUTES) =>
  breadcrumbLd([
    { name: ui(locale).home, path: ROUTES.home[locale] },
    { name, path: ROUTES[key][locale] },
  ])

/* ── Fikserlik / Fixer in Türkiye ───────────────────────────────────────── */
export function FixerPage({ locale }: { locale: Locale }) {
  const c = pageContent(locale).fixer
  return (
    <main>
      <JsonLd
        data={serviceLd({
          path: ROUTES.fixer[locale],
          name: 'Fixer in Türkiye',
          serviceType: 'Fixing',
          description: c.meta.description,
          items: [...c.columns.flatMap((x) => x.items), ...c.logistics.points, ...c.detail.items],
          lang: locale,
        })}
      />
      <JsonLd data={crumbs(locale, c.hero.breadcrumb[1].label, 'fixer')} />
      <PageHero
        label={c.hero.label}
        title={c.hero.title}
        lead={c.hero.lead}
        leadSecondary={c.hero.leadTr}
        cta={c.hero.cta}
        image={c.hero.image}
        breadcrumb={c.hero.breadcrumb}
        locale={locale}
      />
      <BulletColumns columns={c.columns} locale={locale} />
      <MediaSplit id="lojistik" label={c.logistics.label} title={c.logistics.title} text={c.logistics.text} points={c.logistics.points} image={c.logistics.image} />
      <ImageBand label={c.band.label} title={c.band.title} text={c.band.text} image={c.band.image} />
      <ListSection id="hizmet-listesi" label={c.detail.label} title={c.detail.title} text={c.detail.text} items={c.detail.items} motif />
      <CtaBand locale={locale} />
    </main>
  )
}

/* ── Prodüksiyon / Production ───────────────────────────────────────────── */
export function ProductionPage({ locale }: { locale: Locale }) {
  const c = pageContent(locale).production
  return (
    <main>
      <JsonLd data={serviceLd({ path: ROUTES.production[locale], name: c.meta.title, serviceType: 'Production', description: c.meta.description, items: c.list.items, lang: locale })} />
      <JsonLd data={crumbs(locale, c.hero.breadcrumb[1].label, 'production')} />
      <PageHero tone="dark" label={c.hero.label} title={c.hero.title} lead={c.hero.lead} cta={c.hero.cta} image={c.hero.image} breadcrumb={c.hero.breadcrumb} locale={locale} />
      <ListSection id="produksiyon-hizmetleri" label={c.list.label} title={c.list.title} items={c.list.items} tone="cream" />
      <ImageBand label={c.band.label} title={c.band.title} text={c.band.text} image={c.band.image} />
      <Process content={c.method} stepLabel={locale === 'en' ? 'STEP' : 'AŞAMA'} />
      <CtaBand locale={locale} />
    </main>
  )
}

/* ── Marka & PR / Brand & PR — PDF: bu sayfada savaş/haber arşivi görseli yok ─ */
export function BrandPage({ locale }: { locale: Locale }) {
  const c = pageContent(locale).brand
  const en = locale === 'en'
  return (
    <main>
      <JsonLd data={serviceLd({ path: ROUTES.brand[locale], name: c.meta.title, serviceType: 'Brand & PR', description: c.meta.description, items: c.list.items, lang: locale })} />
      <JsonLd data={crumbs(locale, c.hero.breadcrumb[1].label, 'brand')} />
      <PageHero tone="dark" label={c.hero.label} title={c.hero.title} lead={c.hero.lead} cta={c.hero.cta} image={c.hero.image} breadcrumb={c.hero.breadcrumb} locale={locale} />
      <ListSection id="marka-hizmetleri" label={c.list.label} title={c.list.title} items={c.list.items} tone="cream" />
      <Manifesto lines={c.why.lines} text={c.why.text} locale={locale} />
      <CtaBand
        locale={locale}
        label={en ? 'Brand & communications' : 'Marka ve iletişim'}
        title={en ? 'Let’s tell your brand’s story together.' : 'Markanızı birlikte anlatalım.'}
        text={en ? 'Tell us your goals, audience and timeline — we’ll build the communications plan with you.' : 'Hedefinizi, kitlenizi ve takviminizi bize yazın; iletişim planını birlikte kuralım.'}
      />
    </main>
  )
}

/* ── Belgesel / Documentary — savaş/kriz deneyimi uzmanlık kanıtı olarak burada (PDF not 06) ─ */
export function DocumentaryPage({ locale }: { locale: Locale }) {
  const c = pageContent(locale).documentary
  const en = locale === 'en'
  return (
    <main>
      <JsonLd data={serviceLd({ path: ROUTES.documentary[locale], name: c.meta.title, serviceType: 'Documentary production', description: c.meta.description, items: c.cards.flatMap((k) => k.points), lang: locale })} />
      <JsonLd data={crumbs(locale, c.hero.breadcrumb[1].label, 'documentary')} />
      <PageHero label={c.hero.label} title={c.hero.title} lead={c.hero.lead} cta={c.hero.cta} image={c.hero.image} breadcrumb={c.hero.breadcrumb} locale={locale} />

      <section aria-label={en ? 'Documentary and hostile environment services' : 'Belgesel ve zorlu saha hizmetleri'}>
        <div className="shell py-section">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {c.visuals.map((v) => (
              <figure key={v.caption} className="relative m-0 min-w-0 overflow-hidden bg-ink">
                <Image src={v.image.src} alt={v.image.alt} width={v.image.width} height={v.image.height} {...blurProps(v.image)} sizes="(min-width: 960px) 50vw, 100vw" className="block aspect-[16/10] w-full object-cover" />
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
              <Image src={c.feature.image.src} alt={c.feature.image.alt} width={c.feature.image.width} height={c.feature.image.height} {...blurProps(c.feature.image)} sizes="(min-width: 960px) 55vw, 100vw" className="block h-auto w-full" />
            </figure>
          </div>
        </div>
      </section>

      <CtaBand
        locale={locale}
        label={en ? 'Documentary & field' : 'Belgesel ve saha'}
        title={en ? 'Let’s build your story on the ground.' : 'Hikâyenizi sahada birlikte kuralım.'}
        text={en ? 'Tell us the topic, the region and the timeline — we’ll plan research, crew and safety with you.' : 'Konuyu, bölgeyi ve takvimi bize yazın; araştırma, ekip ve güvenlik planını birlikte oluşturalım.'}
      />
    </main>
  )
}
