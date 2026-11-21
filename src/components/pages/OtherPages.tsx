import Link from 'next/link'
import { ContactSection } from '@/components/contact/ContactSection'
import { LatestList } from '@/components/news/LatestList'
import { CtaBand } from '@/components/sections/CtaBand'
import { ProjectCards } from '@/components/sections/ProjectCards'
import { Showcase } from '@/components/sections/Showcase'
import { buttonClass } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { contact as contactEn } from '@/content/en/home'
import { contact as contactTr } from '@/content/home'
import { ROUTES, type Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'
import { breadcrumbLd, JsonLd, ORG_ID, SITE_URL } from '@/lib/seo'
import { getPosts } from '@/lib/wp/client'
import { pageContent } from './content'

/** Haberler / Projects — PDF s.7: vitrin + proje kartları + ELIS360 Journal (WordPress; yazılar Türkçe → yalnızca TR). */
export async function ProjectsPage({ locale }: { locale: Locale }) {
  const c = pageContent(locale).projects
  const t = ui(locale)
  const tr = locale === 'tr'
  const journal = tr ? await getPosts({ first: 6 }) : []
  const pageName = tr ? 'Haberler' : 'Projects'
  return (
    <main className="bg-paper-cream">
      <JsonLd data={breadcrumbLd([{ name: t.home, path: ROUTES.home[locale] }, { name: pageName, path: ROUTES.projects[locale] }])} />
      <section aria-labelledby="haberler-baslik">
        <div className="shell pb-section-sm pt-[clamp(56px,6vw,96px)]">
          <nav aria-label={t.breadcrumb} className="mb-[34px] font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            <ol className="flex flex-wrap items-center">
              <li>
                <Link href={ROUTES.home[locale]} className="border-b border-ink/30">
                  {t.home}
                </Link>
              </li>
              <li className="flex items-center">
                <span aria-hidden="true" className="px-[0.6em]">
                  /
                </span>
                <span aria-current="page" className="text-ink">
                  {pageName}
                </span>
              </li>
            </ol>
          </nav>
          <SectionLabel>{c.hero.label}</SectionLabel>
          <h1 id="haberler-baslik" className="mb-14 max-w-[900px] font-display text-h1 font-bold">
            {c.hero.title}
          </h1>
          <Showcase content={c} />
        </div>
      </section>

      <section aria-labelledby="proje-kartlari-baslik" className="border-t border-rule">
        <div className="shell py-section-sm">
          <h2 id="proje-kartlari-baslik" className="mb-8 font-mono text-label font-semibold uppercase text-accent">
            {c.cardsLabel}
          </h2>
          <ProjectCards cards={c.cards} />
        </div>
      </section>

      {journal.length > 0 && (
        <section aria-labelledby="journal-baslik" className="border-t border-rule bg-paper">
          <div className="shell py-section-sm">
            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
              <div className="min-w-0 lg:col-span-5">
                <SectionLabel>ELIS360 Journal</SectionLabel>
                <h2 id="journal-baslik" className="mb-6 font-display text-h2-block font-bold">
                  Haber, rehber, analiz ve saha hikâyeleri
                </h2>
                <Link href="/haber" className={buttonClass('secondary', 'lg')}>
                  Tüm yazılar →
                </Link>
              </div>
              <div className="min-w-0 lg:col-span-7">
                <LatestList posts={journal} title="Son yazılar" />
              </div>
            </div>
          </div>
        </section>
      )}

      <CtaBand locale={locale} />
    </main>
  )
}

/** İletişim / Contact — JS kapalı gönderimden sonra /api/contact buraya durum parametresiyle döner. */
export function ContactPage({ locale, status }: { locale: Locale; status?: 'ok' | 'hata' }) {
  const content = locale === 'en' ? contactEn : contactTr
  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          url: `${SITE_URL}${ROUTES.contact[locale]}`,
          name: ui(locale).footer.contact,
          inLanguage: locale,
          about: { '@id': ORG_ID },
        }}
      />
      <ContactSection content={content} headingLevel={1} status={status} showIndex={false} locale={locale} />
    </main>
  )
}
