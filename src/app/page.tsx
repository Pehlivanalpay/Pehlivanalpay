import type { Metadata } from 'next'
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
import { about, contact, hero, manifesto, news, selectedProjects, serviceAreas, twoArms } from '@/content/home'
import { projeler } from '@/content/pages'
import { JsonLd, servicesLd } from '@/lib/seo'
import { getPosts } from '@/lib/wp/client'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export const revalidate = 60

/**
 * Ana sayfa — sıralama 2026-11 önerisi (PDF s.9): hero + güven göstergeleri → iki ana hizmet kolu →
 * biz kimiz → hizmet alanları → seçili projeler → ELIS360 Journal → hızlı destek.
 */
export default async function HomePage() {
  const [latest, dossiers] = await Promise.all([getPosts({ first: 8 }), getPosts({ first: 3, category: 'ozel-dosyalar' })])
  const lead = latest.find((p) => p.isExclusive) ?? latest[0]
  const rest = latest.filter((p) => p !== lead && !dossiers.some((d) => d.id === p.id)).slice(0, 4)

  return (
    <main>
      <JsonLd data={servicesLd()} />
      <Hero content={hero} />
      <TwoArms content={twoArms} />
      <About content={about} />
      <Manifesto lines={manifesto.lines} text={manifesto.text} image={manifesto.image} stats={manifesto.stats} />
      <ServiceAreas content={serviceAreas} />

      <section aria-labelledby="projeler-baslik" className="border-t border-rule bg-paper-cream">
        <div className="shell py-section">
          <div className="mb-12 grid grid-cols-1 items-end gap-y-5 lg:grid-cols-12 lg:gap-x-6">
            <div className="min-w-0 lg:col-span-8">
              <SectionLabel index={selectedProjects.index}>{selectedProjects.label}</SectionLabel>
              <h2 id="projeler-baslik" className="font-display text-h2 font-bold">
                {selectedProjects.title}
              </h2>
            </div>
            <div className="flex min-w-0 lg:col-span-4 lg:justify-end">
              <Link href={selectedProjects.allLink.href} className={buttonClass('secondary', 'lg', '!min-h-12 !px-7 !py-3.5')}>
                {selectedProjects.allLink.label}
              </Link>
            </div>
          </div>
          <ProjectCards cards={projeler.cards} />
        </div>
      </section>

      <News content={news} lead={lead} latest={rest} dossiers={dossiers} />
      <ContactSection content={contact} />
    </main>
  )
}
