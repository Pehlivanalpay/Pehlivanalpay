import Link from 'next/link'
import { LeadStory } from './LeadStory'
import { CardGrid, NewsCard } from './NewsCard'
import { buttonClass } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { PostsPage } from '@/lib/wp/client'

/**
 * Kategori ve son dakika sayfalarının ortak gövdesi: başlık + (ilk sayfada) manşet + kart ızgarası +
 * "Daha eski haberler" (imleç tabanlı sayfalama, ?sonra=…).
 */
export function PostsListPage({
  label,
  title,
  description,
  page,
  basePath,
  isFirst,
  emptyText = 'Bu bölümde henüz yayımlanmış haber yok.',
}: {
  label: string
  title: string
  description?: string
  page: PostsPage
  basePath: string
  isFirst: boolean
  emptyText?: string
}) {
  const [lead, ...rest] = page.posts
  const grid = isFirst ? rest : page.posts
  return (
    <main>
      <section aria-labelledby="liste-baslik" className="border-b border-rule bg-paper-cream">
        <div className="shell pb-10 pt-[clamp(40px,4.5vw,64px)]">
          <nav aria-label="Konum" className="mb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            <ol className="flex flex-wrap items-center">
              <li>
                <Link href="/" className="border-b border-ink/30">
                  Ana sayfa
                </Link>
              </li>
              <li className="flex items-center">
                <span aria-hidden="true" className="px-[0.6em]">
                  /
                </span>
                <span aria-current="page" className="text-ink">
                  {title}
                </span>
              </li>
            </ol>
          </nav>
          <SectionLabel>{label}</SectionLabel>
          <h1 id="liste-baslik" className="mb-4 font-display text-h1 font-bold">
            {title}
          </h1>
          {description && <p className="max-w-[720px] text-lead font-light text-ink-body">{description}</p>}
        </div>
      </section>

      <div className="shell py-[clamp(40px,4.5vw,64px)]">
        {page.posts.length === 0 ? (
          <div className="py-10">
            <p className="mb-8 text-[17px] text-ink-muted">{emptyText}</p>
            <Link href="/" className={buttonClass('secondary', 'lg')}>
              Ana sayfaya dön
            </Link>
          </div>
        ) : (
          <>
            {isFirst && lead && (
              <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
                <div className="min-w-0 lg:col-span-8">
                  <LeadStory post={lead} variant="portal" as="h2" />
                </div>
              </div>
            )}
            {grid.length > 0 && (
              <>
                <h2 className="sr-only">{isFirst ? 'Diğer haberler' : 'Daha eski haberler'}</h2>
                <CardGrid>
                  {grid.map((p) => (
                    <NewsCard key={p.id} post={p} />
                  ))}
                </CardGrid>
              </>
            )}
            <div className="mt-14 flex flex-wrap gap-3.5 border-t border-rule pt-8">
              {!isFirst && (
                <Link href={basePath} className={buttonClass('secondary', 'lg')}>
                  ← En yeni haberler
                </Link>
              )}
              {page.hasNextPage && page.endCursor && (
                <Link href={`${basePath}?sonra=${encodeURIComponent(page.endCursor)}`} rel="next" className={buttonClass('primary', 'lg')}>
                  Daha eski haberler →
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
