import type { Metadata } from 'next'
import { Process } from '@/components/home/Process'
import { CtaBand } from '@/components/sections/CtaBand'
import { ImageBand } from '@/components/sections/ImageBand'
import { ListSection } from '@/components/sections/ListSection'
import { PageHero } from '@/components/sections/PageHero'
import { produksiyon as c } from '@/content/pages'
import { breadcrumbLd, JsonLd, ogDefaults, serviceLd } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: '/produksiyon' },
  openGraph: { ...ogDefaults, title: `${c.meta.title} – ELIS360 NEWS`, description: c.meta.description, url: '/produksiyon' },
}

export default function ProduksiyonPage() {
  return (
    <main>
      <JsonLd data={serviceLd({ path: '/produksiyon', name: c.meta.title, serviceType: 'Production', description: c.meta.description, items: c.list.items })} />
      <JsonLd data={breadcrumbLd([{ name: 'Ana sayfa', path: '/' }, { name: 'Prodüksiyon', path: '/produksiyon' }])} />
      <PageHero tone="dark" label={c.hero.label} title={c.hero.title} lead={c.hero.lead} cta={c.hero.cta} image={c.hero.image} breadcrumb={c.hero.breadcrumb} />
      <ListSection id="produksiyon-hizmetleri" label={c.list.label} title={c.list.title} items={c.list.items} tone="cream" />
      <ImageBand label={c.band.label} title={c.band.title} text={c.band.text} image={c.band.image} />
      <Process content={c.method} />
      <CtaBand />
    </main>
  )
}
