import 'server-only'
import { fixtureArticle, fixturePosts } from './fixtures'
import { sanitizeArticle, toPlainText } from './sanitize'
import type { NewsArticle, NewsCategory, NewsPost } from './types'

/**
 * WordPress (WPGraphQL) veri katmanı.
 *
 * Ortam değişkenleri:
 *   WP_URL                  https://cms.elis360news.com/wp   (yoksa örnek veri kullanılır)
 *   WP_PREVIEW_USER         önizleme için WordPress kullanıcı adı
 *   WP_PREVIEW_APP_PASSWORD o kullanıcının "Uygulama Parolası" (Profil → Uygulama Parolaları)
 *
 * Önbellek: tüm istekler `posts` etiketiyle; WordPress yayın bildirimi (/api/revalidate) bu
 * etiketi geçersiz kılar. Bildirim kaçsa bile listeler 60 sn'de bir tazelenir.
 * Hata olursa fırlatır: Next o sırada eski (son başarılı) sayfayı sunmaya devam eder —
 * WordPress geçici olarak çökse de site boş görünmez.
 */

export const WP_URL = process.env.WP_URL?.replace(/\/$/, '') || null
/**
 * Örnek veri yalnızca WordPress bağlı değilken VE geliştirme modunda (`next dev`) kullanılır.
 * Üretim derlemesinde (`next build` / `next start`, hangi sunucuda olursa olsun) WP_URL yoksa
 * yer tutucu haberler yayına girmez: listeler boş döner, haber bölümleri ve son dakika şeridi
 * kendiliğinden gizlenir. Üretim derlemesini örnek veriyle denemek için: WP_FIXTURES=1
 */
export const usingFixtures = !WP_URL && (process.env.NODE_ENV !== 'production' || process.env.WP_FIXTURES === '1')

const REVALIDATE = 60
export const POSTS_TAG = 'posts'

// date/modified: WPGraphQL'de saat dilimsiz yerel saattir — GMT sürümleri alınıp UTC'ye çevrilir (utc()).
const POST_FIELDS = /* GraphQL */ `
  databaseId slug title dateGmt modifiedGmt excerpt
  author { node { name } }
  categories(first: 10) { nodes { name slug } }
  featuredImage { node { sourceUrl altText mediaDetails { width height } } }
  isBreaking isExclusive isSponsored sponsorName videoUrl videoDuration
`

type GqlPost = {
  databaseId: number
  slug: string
  title: string | null
  dateGmt: string
  modifiedGmt: string
  excerpt: string | null
  content?: string | null
  author: { node: { name: string } } | null
  categories: { nodes: NewsCategory[] } | null
  featuredImage: { node: { sourceUrl: string; altText: string | null; mediaDetails: { width: number; height: number } | null } } | null
  isBreaking: boolean | null
  isExclusive: boolean | null
  isSponsored: boolean | null
  sponsorName: string | null
  videoUrl: string | null
  videoDuration: string | null
}

async function gql<T>(query: string, variables: Record<string, unknown>, opts: { preview?: boolean; tags?: string[] } = {}): Promise<T> {
  if (!WP_URL) throw new Error('WP_URL tanımlı değil')
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (opts.preview) {
    const user = process.env.WP_PREVIEW_USER
    const pass = process.env.WP_PREVIEW_APP_PASSWORD
    if (!user || !pass) throw new Error('Önizleme için WP_PREVIEW_USER / WP_PREVIEW_APP_PASSWORD gerekli')
    headers.Authorization = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64')
  }
  const res = await fetch(`${WP_URL}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    ...(opts.preview ? { cache: 'no-store' as const } : { next: { revalidate: REVALIDATE, tags: [POSTS_TAG, ...(opts.tags ?? [])] } }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw new Error(`WPGraphQL ${res.status}`)
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] }
  if (json.errors?.length) throw new Error('WPGraphQL: ' + json.errors.map((e) => e.message).join('; '))
  return json.data as T
}

/** WPGraphQL GMT tarihi ("2026-11-18T17:45:00") → ISO UTC ("2026-11-18T17:45:00Z") */
const utc = (s: string) => (/[zZ]|[+-]\d\d:?\d\d$/.test(s) ? s : `${s}Z`)

function normalize(p: GqlPost): NewsPost {
  const categories = p.categories?.nodes ?? []
  const img = p.featuredImage?.node
  return {
    id: p.databaseId,
    slug: p.slug,
    title: toPlainText(p.title ?? ''),
    excerpt: toPlainText(p.excerpt ?? ''),
    date: utc(p.dateGmt),
    modified: utc(p.modifiedGmt),
    author: p.author?.node.name ?? null,
    category: categories[0] ?? null,
    categories,
    image: img?.sourceUrl
      ? { src: img.sourceUrl, alt: img.altText ?? '', width: img.mediaDetails?.width ?? 1600, height: img.mediaDetails?.height ?? 900 }
      : null,
    isBreaking: !!p.isBreaking,
    isExclusive: !!p.isExclusive,
    isSponsored: !!p.isSponsored,
    sponsorName: p.sponsorName,
    videoUrl: p.videoUrl,
    videoDuration: p.videoDuration,
  }
}

/* ── Sorgular ─────────────────────────────────────────────────────────────── */

type ListOpts = { first?: number; category?: string; breaking?: boolean; sponsored?: boolean }

/** Son yazılar. Sponsorlu içerik, açıkça istenmedikçe haber listelerine karışmaz. */
export async function getPosts({ first = 10, category, breaking, sponsored = false }: ListOpts = {}): Promise<NewsPost[]> {
  if (!WP_URL) {
    if (!usingFixtures) return []
    return fixturePosts
      .filter((p) => (category ? p.categories.some((c) => c.slug === category) : true))
      .filter((p) => (breaking ? p.isBreaking : true))
      .filter((p) => p.isSponsored === sponsored)
      .slice(0, first)
  }
  const where = [
    'orderby: { field: DATE, order: DESC }',
    category ? 'categoryName: $category' : '',
    breaking ? 'isBreaking: true' : '',
    `isSponsored: ${sponsored ? 'true' : 'false'}`,
  ]
    .filter(Boolean)
    .join(', ')
  const data = await gql<{ posts: { nodes: GqlPost[] } }>(
    `query Posts($first: Int!${category ? ', $category: String' : ''}) {
      posts(first: $first, where: { ${where} }) { nodes { ${POST_FIELDS} } }
    }`,
    { first, ...(category ? { category } : {}) },
  )
  return data.posts.nodes.map(normalize)
}

export async function getArticle(slug: string): Promise<NewsArticle | null> {
  if (!WP_URL) return usingFixtures ? fixtureArticle(slug) : null
  const data = await gql<{ post: GqlPost | null }>(
    `query Article($slug: ID!) { post(id: $slug, idType: SLUG) { ${POST_FIELDS} content } }`,
    { slug },
    { tags: [`post:${slug}`] },
  )
  return data.post ? { ...normalize(data.post), contentHtml: sanitizeArticle(data.post.content ?? '') } : null
}

/** Taslak önizleme — kimlik doğrulamalı, önbelleksiz. */
export async function getPreview(id: number): Promise<NewsArticle | null> {
  if (!WP_URL) return usingFixtures ? fixtureArticle(fixturePosts[0].slug) : null
  const data = await gql<{ post: GqlPost | null }>(
    `query Preview($id: ID!) { post(id: $id, idType: DATABASE_ID, asPreview: true) { ${POST_FIELDS} content } }`,
    { id },
    { preview: true },
  )
  return data.post ? { ...normalize(data.post), contentHtml: sanitizeArticle(data.post.content ?? '') } : null
}

/** Site haritaları için yayındaki (sponsorlu olmayan) yazılar, en yeniden eskiye, en çok 1000. */
export async function getAllSlugs(): Promise<{ slug: string; modified: string; date: string; title: string }[]> {
  if (!WP_URL) return []
  type Node = { slug: string; modifiedGmt: string; dateGmt: string; title: string }
  const out: { slug: string; modified: string; date: string; title: string }[] = []
  let after: string | null = null
  for (let page = 0; page < 10; page++) {
    const data: { posts: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: Node[] } } = await gql(
      `query Slugs($after: String) { posts(first: 100, after: $after, where: { orderby: { field: DATE, order: DESC }, isSponsored: false }) {
        pageInfo { hasNextPage endCursor } nodes { slug modifiedGmt dateGmt title } } }`,
      { after },
    )
    out.push(...data.posts.nodes.map((n) => ({ slug: n.slug, modified: utc(n.modifiedGmt), date: utc(n.dateGmt), title: toPlainText(n.title) })))
    if (!data.posts.pageInfo.hasNextPage) break
    after = data.posts.pageInfo.endCursor
  }
  return out
}

/** Site araması — WordPress'in yerleşik `search` filtresi. Hata olursa boş döner (arama sayfası çökmez). */
export async function searchPosts(term: string, first = 10): Promise<NewsPost[]> {
  const q = term.trim().slice(0, 100)
  if (!q) return []
  if (!WP_URL) {
    if (!usingFixtures) return []
    const n = q.toLocaleLowerCase('tr')
    return fixturePosts.filter((p) => `${p.title} ${p.excerpt}`.toLocaleLowerCase('tr').includes(n)).slice(0, first)
  }
  try {
    const data = await gql<{ posts: { nodes: GqlPost[] } }>(
      `query Search($first: Int!, $q: String!) { posts(first: $first, where: { search: $q, isSponsored: false }) { nodes { ${POST_FIELDS} } } }`,
      { first, q },
    )
    return data.posts.nodes.map(normalize)
  } catch {
    return []
  }
}

/**
 * ELIS360 Journal yayında mı? (en az bir yazı var mı) — yazı yokken Journal bağlantıları gizlenir ve
 * /haber sayfaları Projeler'e yönlenir. WordPress'e ulaşılamazsa da false (site çökmez).
 */
export async function hasJournal(): Promise<boolean> {
  try {
    return (await getPosts({ first: 1 })).length > 0
  } catch {
    return false
  }
}
