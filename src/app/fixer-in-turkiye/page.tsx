import type { Metadata } from 'next'
import { BulletColumns } from '@/components/sections/BulletColumns'
import { CtaBand } from '@/components/sections/CtaBand'
import { ImageBand } from '@/components/sections/ImageBand'
import { ListSection } from '@/components/sections/ListSection'
import { PageHero } from '@/components/sections/PageHero'
import { fikserlik as c } from '@/content/pages'
import { breadcrumbLd, JsonLd, ogDefaults, serviceLd } from '@/lib/seo'

export const revalidate = 60

// PDF not 02: "Fixer in Türkiye" ifadesi sayfa başlığında, adreste ve SEO açıklamasında.
export const metadata: Metadata = {
  title: { absolute: 'Fixer in Türkiye — Fikserlik | ELIS360 NEWS' },
  description: c.meta.description,
  alternates: { canonical: '/fixer-in-turkiye' },
  openGraph: { ...ogDefaults, title: 'Fixer in Türkiye — ELIS360 NEWS', description: c.meta.description, url: '/fixer-in-turkiye' },
}

export default function FixerPage() {
  return (
    <main>
      <JsonLd data={serviceLd({ path: '/fixer-in-turkiye', name: 'Fixer in Türkiye', serviceType: 'Fixing', description: c.meta.description, items: [...c.columns.flatMap((x) => x.items), ...c.detail.items] })} />
      <JsonLd data={breadcrumbLd([{ name: 'Ana sayfa', path: '/' }, { name: 'Fikserlik', path: '/fixer-in-turkiye' }])} />
      <PageHero
        label={c.hero.label}
        title={c.hero.title}
        titleLang={c.hero.titleLang}
        lead={c.hero.lead}
        leadLang={c.hero.leadLang}
        leadSecondary={c.hero.leadTr}
        cta={c.hero.cta}
        image={c.hero.image}
        breadcrumb={c.hero.breadcrumb}
      />
      <BulletColumns columns={c.columns} />
      <ImageBand label={c.band.label} title={c.band.title} text={c.band.text} image={c.band.image} />
      <ListSection id="hizmet-listesi" label={c.detail.label} title={c.detail.title} text={c.detail.text} items={c.detail.items} motif />
      <CtaBand />
    </main>
  )
}
