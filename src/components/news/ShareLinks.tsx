import { SITE_URL } from '@/lib/seo'

/**
 * Paylaşım bağlantıları — JavaScript ve izleme betiği yok, yalnızca düz bağlantılar
 * (yeni sekmede açılır; KVKK açısından üçüncü taraf çerezi yüklenmez).
 */
export function ShareLinks({ title, path, className = '' }: { title: string; path: string; className?: string }) {
  const url = `${SITE_URL}${path}`
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { name: 'X', href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: 'E-posta', href: `mailto:?subject=${t}&body=${u}` },
  ]
  return (
    <nav aria-label="Haberi paylaş" className={`flex flex-wrap items-center gap-x-2.5 gap-y-2.5 border-y border-rule py-4 ${className}`}>
      <span className="mr-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Paylaş</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target={l.href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center border border-ink/25 px-4 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-ink"
        >
          {l.name}
          {!l.href.startsWith('mailto:') && <span className="sr-only"> (yeni sekmede açılır)</span>}
        </a>
      ))}
    </nav>
  )
}
