import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostsListPage } from '@/components/news/PostsListPage'
import { categoryInfo } from '@/content/news'
import { breadcrumbLd, JsonLd, ogDefaults } from '@/lib/seo'
import { getPostsPage } from '@/lib/wp/client'
import { NEWS_CATEGORIES } from '@/lib/wp/types'

/** Kategori sayfaları: /gundem, /turkiye, /izmir-ve-ege, /dunya, /video, /ozel-dosyalar — başka adres 404. */
export const dynamicParams = false
export function generateStaticParams() {
  return NEWS_CATEGORIES.map((c) => ({ kategori: c.slug }))
}

type Props = { params: Promise<{ kategori: string }>; searchParams: Promise<{ sonra?: string | string[] }> }

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { kategori } = await params
  const { sonra } = await searchParams
  const c = NEWS_CATEGORIES.find((x) => x.slug === kategori)
  if (!c) return {}
  const description = categoryInfo[c.slug]?.description
  return {
    title: `${c.name} haberleri`,
    description,
    alternates: { canonical: `/${c.slug}` },
    openGraph: { ...ogDefaults, title: `${c.name} haberleri – ELIS360 NEWS`, description, url: `/${c.slug}` },
    // Eski sayfalar (sayfalama) dizine eklenmez, bağlantıları izlenir
    ...(sonra ? { robots: { index: false, follow: true } } : {}),
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { kategori } = await params
  const c = NEWS_CATEGORIES.find((x) => x.slug === kategori)
  if (!c) notFound()
  const sp = await searchParams
  const after = (Array.isArray(sp.sonra) ? sp.sonra[0] : sp.sonra)?.slice(0, 200) || null
  const page = await getPostsPage({ first: after ? 24 : 25, category: c.slug, after })
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Ana sayfa', path: '/' }, { name: c.name, path: `/${c.slug}` }])} />
      <PostsListPage
        label="Kategori"
        title={c.name}
        description={categoryInfo[c.slug]?.description}
        page={page}
        basePath={`/${c.slug}`}
        isFirst={!after}
      />
    </>
  )
}
