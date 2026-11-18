import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import type { fikserlik } from '@/content/fikserlik'
import { site } from '@/content/site'

/** Sayfa sonu çağrı şeridi — surface-dark. Birincil buton e-posta, ikincil iletişim formu. */
export function CtaBand({ content: c }: { content: (typeof fikserlik)['cta'] }) {
  return (
    <section id="iletisim" aria-labelledby="cta-baslik" className="surface-dark bg-glass-surface text-onDark">
      <div className="shell flex flex-wrap items-center justify-between gap-x-16 gap-y-8 py-section-sm">
        <div className="min-w-0 flex-[1_1_460px]">
          <p className="mb-3.5 font-mono text-label font-semibold uppercase text-onDark-glass">{c.label}</p>
          <h2 id="cta-baslik" className="mb-2.5 font-display text-[clamp(26px,3vw,38px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            {c.title}
          </h2>
          <p className="max-w-[560px] text-body font-light leading-[1.7] text-onDark-muted">{c.text}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {/* lang="en": büyük harfte "İNFO@ELİS…" olmasın */}
          <a href={`mailto:${site.email}`} lang="en" className={buttonClass('primary', 'lg', 'break-all')}>
            {site.email}
          </a>
          <Link href={c.form.href} className={buttonClass('secondary-dark', 'lg')}>
            {c.form.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
