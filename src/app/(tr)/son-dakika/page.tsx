import type { Metadata } from 'next'
import { PostsListPage } from '@/components/news/PostsListPage'
import { breadcrumbLd, JsonLd, ogDefaults } from '@/lib/seo'
import { getPostsPage } from '@/lib/wp/client'

const description = 'Türkiye’den ve dünyadan son dakika haberleri; en yeni gelişmeler en üstte.'

type Props = { searchParams: Promise<{ sonra?: string | string[] }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { sonra } = await searchParams
  return {
    title: 'Son dakika haberleri',
    description,
    alternates: { canonical: '/son-dakika' },
    openGraph: { ...ogDefaults, title: 'Son dakika haberleri – ELIS360 NEWS', description, url: '/son-dakika' },
    ...(sonra ? { robots: { index: false, follow: true } } : {}),
  }
}

/** Son dakika: tüm yazılar, en yeniden eskiye (WordPress "son dakika" işaretlileri şeritte öne çıkar). */
export default async function BreakingPage({ searchParams }: Props) {
  const sp = await searchParams
  const after = (Array.isArray(sp.sonra) ? sp.sonra[0] : sp.sonra)?.slice(0, 200) || null
  const page = await getPostsPage({ first: after ? 24 : 25, after })
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Ana sayfa', path: '/' }, { name: 'Son dakika', path: '/son-dakika' }])} />
      <PostsListPage label="Canlı akış" title="Son dakika" description={description} page={page} basePath="/son-dakika" isFirst={!after} emptyText="Henüz yayımlanmış haber yok." />
    </>
  )
}
