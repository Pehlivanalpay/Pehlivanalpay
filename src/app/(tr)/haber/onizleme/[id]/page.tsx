import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { ArticleView } from '@/components/news/ArticleView'
import { getPosts, getPreview } from '@/lib/wp/client'

export const metadata: Metadata = { robots: { index: false, follow: false }, title: 'Önizleme' }

/** WordPress "Önizle" düğmesi → /api/preview → buraya. Yalnızca taslak modunda açılır. */
export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { isEnabled } = await draftMode()
  if (!isEnabled) notFound()
  const id = Number((await params).id)
  if (!Number.isInteger(id) || id <= 0) notFound()
  const [post, latest] = await Promise.all([getPreview(id), getPosts({ first: 6 })])
  if (!post) notFound()
  return <ArticleView post={post} latest={latest} preview />
}
