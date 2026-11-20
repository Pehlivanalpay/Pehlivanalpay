import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import { site } from '@/content/site'

/** Sayfa sonu çağrı şeridi — surface-dark. Birincil: iletişim formu; ikincil: e-posta. */
export function CtaBand({
  label = 'Projenizi birlikte planlayalım',
  title = 'Türkiye’de ne çekmek istiyorsunuz?',
  text = 'Konuyu, tarihleri ve ihtiyaçlarınızı bize yazın; size özel ekip ve çalışma planını birlikte oluşturalım.',
}: {
  label?: string
  title?: string
  text?: string
}) {
  return (
    <section aria-labelledby="cta-baslik" className="surface-dark bg-glass-surface text-onDark">
      <div className="shell flex flex-wrap items-center justify-between gap-x-16 gap-y-8 py-section-sm">
        <div className="min-w-0 flex-[1_1_460px]">
          <p className="mb-3.5 font-mono text-label font-semibold uppercase text-onDark-glass">{label}</p>
          <h2 id="cta-baslik" className="mb-2.5 font-display text-[clamp(26px,3vw,38px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            {title}
          </h2>
          <p className="max-w-[560px] text-body font-light leading-[1.7] text-onDark-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/iletisim" className={buttonClass('primary', 'lg')}>
            Formu doldurun
          </Link>
          {/* lang="en": büyük harfte "İNFO@ELİS…" olmasın */}
          <a href={`mailto:${site.email}`} lang="en" className={buttonClass('secondary-dark', 'lg', 'break-all')}>
            {site.email}
          </a>
        </div>
      </div>
    </section>
  )
}
