import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/CtaBand'
import { ListSection } from '@/components/sections/ListSection'
import { Manifesto } from '@/components/sections/Manifesto'
import { PageHero } from '@/components/sections/PageHero'
import { markaPr as c } from '@/content/pages'
import { breadcrumbLd, JsonLd, ogDefaults, serviceLd } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: '/marka-pr' },
  openGraph: { ...ogDefaults, title: `${c.meta.title} – ELIS360 NEWS`, description: c.meta.description, url: '/marka-pr' },
}

/** Marka & PR — PDF s.4. Bu sayfada savaş/haber arşivi görseli kullanılmaz (PDF görsel notu). */
export default function MarkaPrPage() {
  return (
    <main>
      <JsonLd data={serviceLd({ path: '/marka-pr', name: c.meta.title, serviceType: 'Brand & PR', description: c.meta.description, items: c.list.items })} />
      <JsonLd data={breadcrumbLd([{ name: 'Ana sayfa', path: '/' }, { name: 'Marka & PR', path: '/marka-pr' }])} />
      <PageHero tone="dark" label={c.hero.label} title={c.hero.title} lead={c.hero.lead} cta={c.hero.cta} image={c.hero.image} breadcrumb={c.hero.breadcrumb} />
      <ListSection id="marka-hizmetleri" label={c.list.label} title={c.list.title} items={c.list.items} tone="cream" />
      <Manifesto lines={c.why.lines} text={c.why.text} />
      <CtaBand label="Marka ve iletişim" title="Markanızı birlikte anlatalım." text="Hedefinizi, kitlenizi ve takviminizi bize yazın; iletişim planını birlikte kuralım." />
    </main>
  )
}
