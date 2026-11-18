import { ContactSection } from '@/components/contact/ContactSection'
import { About } from '@/components/home/About'
import { Hero } from '@/components/home/Hero'
import { News } from '@/components/home/News'
import { NewsBanner } from '@/components/home/NewsBanner'
import { Process } from '@/components/home/Process'
import { Regions } from '@/components/home/Regions'
import { Services } from '@/components/home/Services'
import { Why } from '@/components/home/Why'
import type { Metadata } from 'next'
import { JsonLd, servicesLd } from '@/lib/seo'
import { getPosts } from '@/lib/wp/client'
import { about, contact, hero, method, news, newsBanner, regions, services, why } from '@/content/home'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export const revalidate = 60

export default async function HomePage() {
  const [latest, dossiers] = await Promise.all([getPosts({ first: 8 }), getPosts({ first: 3, category: 'ozel-dosyalar' })])
  const lead = latest.find((p) => p.isExclusive) ?? latest[0]
  const rest = latest.filter((p) => p !== lead && !dossiers.some((d) => d.id === p.id)).slice(0, 4)

  return (
    <main>
      <JsonLd data={servicesLd()} />
      <Hero content={hero} />
      <Regions content={regions} />
      <About content={about} />
      <Services content={services} />
      <News content={news} lead={lead} latest={rest} dossiers={dossiers} />
      <Why content={why} />
      <Process content={method} />
      <NewsBanner content={newsBanner} />
      <ContactSection content={contact} />
    </main>
  )
}
