import Image from 'next/image'
import Link from 'next/link'
import { LatestList } from './LatestList'
import { ShareLinks } from './ShareLinks'
import { CategoryTag } from '@/components/ui/CategoryTag'
import { newsDateLong } from '@/lib/format'
import type { NewsArticle, NewsPost } from '@/lib/wp/types'
import { youtubeId } from '@/lib/youtube'

/**
 * Haber yazısı. Referansta yazı sayfası tasarımı yok; token'lardaki h1-haber ölçeği ve haber.html
 * kalıpları (kategori şeridi, etiket, "Son eklenenler") ile kuruldu. Kesik köşe KULLANILMAZ (§4).
 *
 * Sponsorlu yazıda "Sponsorlu içerik" etiketi başlığın üstünde, her zaman görünür.
 */
export function ArticleView({ post, latest, preview = false }: { post: NewsArticle; latest: NewsPost[]; preview?: boolean }) {
  const yt = youtubeId(post.videoUrl)
  const crumbs = [{ label: 'Ana sayfa', href: '/' }, ...(post.category ? [{ label: post.category.name, href: `/${post.category.slug}` }] : [])]

  return (
    <main>
      {preview && (
        <p role="status" className="bg-accent px-edge py-2 text-center font-mono text-meta font-semibold uppercase text-white">
          Önizleme — bu sayfa yayımlanmadı · <Link href="/api/preview/exit" className="underline">Önizlemeden çık</Link>
        </p>
      )}
      <div className="shell py-[clamp(40px,4.5vw,64px)]">
        <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-6">
          <article className="min-w-0 lg:col-span-8">
            <nav aria-label="Konum" className="mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              <ol className="flex flex-wrap items-center">
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center">
                    {i > 0 && (
                      <span aria-hidden="true" className="px-[0.6em]">
                        /
                      </span>
                    )}
                    <Link href={c.href} className="border-b border-ink/30">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            {post.isSponsored && (
              <p className="mb-5">
                <span className="inline-block border-[1.5px] border-ink px-[11px] py-[5px] font-mono text-meta-xs font-semibold uppercase">Sponsorlu içerik</span>
                {post.sponsorName && <span className="ml-3 font-mono text-meta-xs uppercase tracking-[0.2em] text-ink-muted">{post.sponsorName}</span>}
              </p>
            )}

            <p className="mb-4 flex flex-wrap items-center gap-x-3.5 gap-y-2.5 font-mono text-meta font-semibold uppercase">
              {post.isExclusive && <span className="bg-accent px-2.5 py-[5px] text-meta-xs text-white">Özel haber</span>}
              {post.category && <CategoryTag className="!px-2.5 !py-[5px] !text-meta-xs">{post.category.name}</CategoryTag>}
              <time dateTime={post.date} className="tracking-[0.2em] text-ink-muted">
                {newsDateLong(post.date)}
              </time>
            </p>

            <h1 className="mb-5 font-display text-h1-news font-bold">{post.title}</h1>
            {post.excerpt && <p className="mb-8 max-w-[720px] text-lead font-light text-[#232A33]">{post.excerpt}</p>}

            {yt ? (
              <div className="relative mb-8 aspect-video bg-ink">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${yt}`}
                  title={`Video: ${post.title}`}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            ) : post.image ? (
              <figure className="mb-8">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  width={post.image.width}
                  height={post.image.height}
                  sizes="(min-width: 960px) 66vw, 100vw"
                  className="h-auto w-full"
                />
                {post.image.alt && <figcaption className="mt-2.5 font-mono text-[11px] tracking-[0.06em] text-ink-muted">{post.image.alt}</figcaption>}
              </figure>
            ) : null}

            <div className="article-body max-w-[720px]" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

            {!preview && <ShareLinks title={post.title} path={`/haber/${post.slug}`} className="mt-10 max-w-[720px]" />}

            <footer className="mt-12 max-w-[720px] border-t-2 border-ink pt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              {post.author && <p className="mb-1.5">Hazırlayan: <span className="text-ink">{post.author}</span></p>}
              {post.modified !== post.date && (
                <p>
                  Güncellendi: <time dateTime={post.modified}>{newsDateLong(post.modified)}</time>
                </p>
              )}
            </footer>
          </article>

          <aside aria-label="Son eklenenler" className="min-w-0 lg:col-span-4">
            <LatestList posts={latest.filter((p) => p.slug !== post.slug).slice(0, 5)} dense />
          </aside>
        </div>
      </div>
    </main>
  )
}
