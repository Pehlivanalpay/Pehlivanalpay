import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleView } from '@/components/news/ArticleView'
import { JsonLd, ogDefaults, ORG_ID, SITE_URL } from '@/lib/seo'
import { getArticle, getPosts } from '@/lib/wp/client'

/** Yazılar ilk ziyarette üretilir ve önbelleğe alınır; WordPress yayın bildirimi anında tazeler. */
export const revalidate = 60
export function generateStaticParams() {
  return []
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getArticle(decodeURIComponent(slug))
  if (!post) return {}
  const url = `/haber/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: url },
    openGraph: {
      ...ogDefaults,
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt || undefined,
      publishedTime: post.date,
      modifiedTime: post.modified,
      section: post.category?.name,
      ...(post.image ? { images: [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }] } : {}),
    },
    // Sponsorlu içerik arama motorlarında haber olarak sıralanmasın
    ...(post.isSponsored ? { robots: { index: false, follow: true } } : {}),
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const [post, latest] = await Promise.all([getArticle(decodeURIComponent(slug)), getPosts({ first: 6 })])
  if (!post) notFound()

  const url = `${SITE_URL}/haber/${post.slug}`
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': post.isSponsored ? 'Article' : 'NewsArticle',
          '@id': url,
          mainEntityOfPage: url,
          url,
          headline: post.title.slice(0, 110),
          description: post.excerpt || undefined,
          datePublished: post.date,
          dateModified: post.modified,
          articleSection: post.category?.name,
          inLanguage: 'tr',
          ...(post.image ? { image: [post.image.src] } : {}),
          author: post.author ? [{ '@type': 'Person', name: post.author }] : [{ '@id': ORG_ID }],
          publisher: { '@id': ORG_ID },
          ...(post.isSponsored && post.sponsorName ? { sponsor: { '@type': 'Organization', name: post.sponsorName } } : {}),
        }}
      />
      <ArticleView post={post} latest={latest} />
    </>
  )
}
