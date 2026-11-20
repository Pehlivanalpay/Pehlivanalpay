import type { Metadata } from 'next'
import Link from 'next/link'
import { LatestList } from '@/components/news/LatestList'
import { CtaBand } from '@/components/sections/CtaBand'
import { ProjectCards } from '@/components/sections/ProjectCards'
import { Showcase } from '@/components/sections/Showcase'
import { buttonClass } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { projeler as c } from '@/content/pages'
import { breadcrumbLd, JsonLd, ogDefaults } from '@/lib/seo'
import { getPosts } from '@/lib/wp/client'

export const revalidate = 60

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: '/haberler' },
  openGraph: { ...ogDefaults, title: `${c.meta.title} – ELIS360 NEWS`, description: c.meta.description, url: '/haberler' },
}

/** Haberler — PDF s.7: seçili projeler vitrini + proje kartları + ELIS360 Journal (WordPress). */
export default async function HaberlerPage() {
  const journal = await getPosts({ first: 6 })
  return (
    <main className="bg-paper-cream">
      <JsonLd data={breadcrumbLd([{ name: 'Ana sayfa', path: '/' }, { name: 'Haberler', path: '/haberler' }])} />
      <section aria-labelledby="haberler-baslik">
        <div className="shell pb-section-sm pt-[clamp(56px,6vw,96px)]">
          <nav aria-label="Konum" className="mb-[34px] font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            <ol className="flex flex-wrap items-center">
              <li>
                <Link href="/" className="border-b border-ink/30">
                  Ana sayfa
                </Link>
              </li>
              <li className="flex items-center">
                <span aria-hidden="true" className="px-[0.6em]">
                  /
                </span>
                <span aria-current="page" className="text-ink">
                  Haberler
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

      <CtaBand />
    </main>
  )
}
