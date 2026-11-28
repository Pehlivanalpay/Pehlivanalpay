import Link from 'next/link'
import { LatestList } from '@/components/news/LatestList'
import { buttonClass } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ROUTES, type Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'
import { searchPages } from '@/lib/search'
import { searchPosts } from '@/lib/wp/client'

/** Site araması — önce haberler (WordPress), sonra kategoriler ve sabit sayfalar. */
export async function SearchPage({ locale, q: raw }: { locale: Locale; q?: string }) {
  const t = ui(locale).searchPage
  const q = (raw ?? '').trim().slice(0, 100)
  const pages = q ? searchPages(q, locale) : []
  const posts = q ? await searchPosts(q, 20) : []
  const total = pages.length + posts.length

  return (
    <main className="bg-paper-cream">
      <section aria-labelledby="arama-baslik">
        <div className="shell py-section-sm">
          <SectionLabel>{t.label}</SectionLabel>
          <h1 id="arama-baslik" className="mb-8 font-display text-h1 font-bold">
            {t.title}
          </h1>
          <form role="search" aria-label={locale === 'en' ? 'Search results' : 'Arama sonuçları'} action={ROUTES.search[locale]} className="mb-10 flex max-w-[720px] flex-wrap gap-3">
            <label htmlFor="arama-q" className="sr-only">
              {t.label}
            </label>
            <input
              id="arama-q"
              name="q"
              type="search"
              defaultValue={q}
              maxLength={100}
              className="h-[52px] min-w-0 flex-[1_1_260px] rounded-none border border-ink/30 bg-white px-4 text-[16px] text-ink"
            />
            <button type="submit" className={buttonClass('primary', 'lg', 'cursor-pointer border-0')}>
              {t.title}
            </button>
          </form>

          <p role="status" className="mb-8 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted">
            {!q ? t.empty : total ? t.results(total, q) : t.none}
          </p>

          {posts.length > 0 && (
            <section aria-label={t.articles} className="mb-12 max-w-[860px]">
              <LatestList posts={posts} title={t.articles} />
            </section>
          )}

          {pages.length > 0 && (
            <section aria-labelledby="arama-sayfalar" className="mb-12">
              <h2 id="arama-sayfalar" className="mb-4 font-mono text-label font-semibold uppercase text-accent">
                {t.pages}
              </h2>
              <ul className="border-t border-rule">
                {pages.map((p) => (
                  <li key={p.href} className="border-b border-rule">
                    <Link href={p.href} className="block py-5">
                      <span className="mb-1.5 block font-display text-[21px] font-bold leading-snug">{p.title}</span>
                      <span className="block max-w-[760px] text-[15px] leading-[1.6] text-ink-body">{p.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {q && !total && (
            <Link href={ROUTES.contact[locale]} className={buttonClass('secondary', 'lg')}>
              {ui(locale).footer.contact} →
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
