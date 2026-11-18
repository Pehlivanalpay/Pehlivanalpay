import sanitizeHtml from 'sanitize-html'

/**
 * WordPress gövde HTML'i için izin listesi. Editörler güvenilir olsa da (2–3 kişi) ele geçirilmiş
 * bir hesap veya kopyala-yapıştır ile gelen betik siteye sızmasın: yalnızca metin biçimlendirme,
 * görsel, tablo ve YouTube (nocookie) gömmeleri geçer.
 */
export function sanitizeArticle(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup', 'mark',
      'a', 'ul', 'ol', 'li', 'blockquote', 'cite', 'q', 'hr', 'figure', 'figcaption', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'iframe', 'pre', 'code',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading'],
      iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen'],
      th: ['scope', 'colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
    },
    allowedSchemes: ['https', 'mailto', 'tel'],
    allowedIframeHostnames: ['www.youtube-nocookie.com', 'www.youtube.com'],
    transformTags: {
      a: (tag, attribs) => {
        const external = /^https?:\/\//.test(attribs.href ?? '') && !/elis360news\.com/.test(attribs.href ?? '')
        return { tagName: 'a', attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : attribs }
      },
      img: (tag, attribs) => ({ tagName: 'img', attribs: { ...attribs, loading: 'lazy' } }),
      // Gövdede h1 olmaz — sayfa başlığı zaten h1
      h1: 'h2',
    },
  })
}

/** HTML'i düz metne çevirir: etiketler atılır, karakter varlıkları çözülür ("&#8217;" → "’"). */
export function toPlainText(html: string): string {
  const named: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—' }
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, k) => named[k.toLowerCase()] ?? m)
    .replace(/\[…\]/g, '…')
    .replace(/\s+/g, ' ')
    .trim()
}
