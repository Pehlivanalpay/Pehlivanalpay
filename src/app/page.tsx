import { ContactSection } from '@/components/contact/ContactSection'
import { About } from '@/components/home/About'
import { Hero } from '@/components/home/Hero'
import { News } from '@/components/home/News'
import { NewsBanner } from '@/components/home/NewsBanner'
import { Process } from '@/components/home/Process'
import { Regions } from '@/components/home/Regions'
import { Services } from '@/components/home/Services'
import { Why } from '@/components/home/Why'
import { about, contact, hero, method, news, newsBanner, regions, services, why } from '@/content/home'

export default function HomePage() {
  return (
    <main>
      <Hero content={hero} />
      <Regions content={regions} />
      <About content={about} />
      <Services content={services} />
      <News content={news} />
      <Why content={why} />
      <Process content={method} />
      <NewsBanner content={newsBanner} />
      <ContactSection content={contact} />
    </main>
  )
}
