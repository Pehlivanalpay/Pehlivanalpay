import Link from 'next/link'
import { ContactSection } from '@/components/contact/ContactSection'
import { About } from '@/components/home/About'
import { Hero } from '@/components/home/Hero'
import { News } from '@/components/home/News'
import { Manifesto } from '@/components/sections/Manifesto'
import { ProjectCards } from '@/components/sections/ProjectCards'
import { ServiceAreas } from '@/components/sections/ServiceAreas'
import { TwoArms } from '@/components/sections/TwoArms'
import { buttonClass } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { news } from '@/content/home'
import type { Locale } from '@/i18n/config'
import { JsonLd, servicesLd } from '@/lib/seo'
import { getPosts } from '@/lib/wp/client'
import { homeContent } from './content'

/**
 * Ana sayfa — sıralama 2026-11 önerisi (PDF s.9): hero + göstergeler → iki ana hizmet kolu → biz kimiz →
 * hizmet alanları → seçili projeler → ELIS360 Journal (yalnızca Türkçe; yazılar Türkçe) → hızlı destek.
 */
export async function HomePage({ locale }: { locale: Locale }) {
  const c = homeContent(locale)
  const tr = locale === 'tr'
  const [latest, dossiers] = tr ? await Promise.all([getPosts({ first: 8 }), getPosts({ first: 3, category: 'ozel-dosyalar' })]) : [[], []]
  const lead = latest.find((p) => p.isExclusive) ?? latest[0]
  const rest = latest.filter((p) => p !== lead && !dossiers.some((d) => d.id === p.id)).slice(0, 4)

  return (
    <main>
      <JsonLd data={servicesLd(c.serviceAreas.items, locale)} />
      <Hero content={c.hero} />
      <TwoArms content={c.twoArms} locale={locale} />
      <About content={c.about} />
      <Manifesto lines={c.manifesto.lines} text={c.manifesto.text} image={c.manifesto.image} stats={c.manifesto.stats} locale={locale} />
      <ServiceAreas content={c.serviceAreas} locale={locale} />

      <section aria-labelledby="projeler-baslik" className="border-t border-rule bg-paper-cream">
        <div className="shell py-section">
          <div className="mb-12 grid grid-cols-1 items-end gap-y-5 lg:grid-cols-12 lg:gap-x-6">
            <div className="min-w-0 lg:col-span-8">
              <SectionLabel index={c.selectedProjects.index}>{c.selectedProjects.label}</SectionLabel>
              <h2 id="projeler-baslik" className="font-display text-h2 font-bold">
                {c.selectedProjects.title}
              </h2>
            </div>
            <div className="flex min-w-0 lg:col-span-4 lg:justify-end">
              <Link href={c.selectedProjects.allLink.href} className={buttonClass('secondary', 'lg', '!min-h-12 !px-7 !py-3.5')}>
                {c.selectedProjects.allLink.label}
              </Link>
            </div>
          </div>
          <ProjectCards cards={c.projectCards} />
        </div>
      </section>

      {tr && <News content={news} lead={lead} latest={rest} dossiers={dossiers} />}
      <ContactSection content={c.contact} locale={locale} />
    </main>
  )
}
