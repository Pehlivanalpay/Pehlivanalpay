import { ContactForm } from './ContactForm'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionMotif } from '@/components/ui/SectionMotif'
import { WhatsAppLink } from '@/components/ui/WhatsApp'
import type { contact as Content } from '@/content/home'
import { site } from '@/content/site'

const dt = 'font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted'

/**
 * Hızlı destek / iletişim bölümü — ana sayfada (h2) ve /iletisim sayfasında (h1) aynı bileşen.
 * Solda: başlık, metin, e-posta, WhatsApp (masaüstünde iletişim alanının yanında — PDF not 03).
 */
export function ContactSection({
  content: c,
  headingLevel = 2,
  status,
  showIndex = true,
}: {
  content: typeof Content
  headingLevel?: 1 | 2
  status?: 'ok' | 'hata'
  showIndex?: boolean
}) {
  const H = headingLevel === 1 ? 'h1' : 'h2'
  return (
    <section id="iletisim" aria-labelledby="iletisim-baslik" className="relative overflow-hidden">
      <SectionMotif side="left" />
      <div className="shell relative z-[1] py-section">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-14">
          <div className="min-w-0 lg:col-span-5">
            <SectionLabel index={showIndex ? c.index : undefined}>{c.label}</SectionLabel>
            <H id="iletisim-baslik" className="mb-[26px] font-display text-h2 font-bold">
              {c.title}
            </H>
            <p className="mb-9 text-body font-light leading-[1.75] text-[#232A33]">{c.text}</p>
            <dl>
              <div className="flex justify-between gap-4 border-t border-rule py-4">
                <dt className={dt}>E-posta</dt>
                <dd className="min-w-0">
                  <a href={`mailto:${site.email}`} className="break-all border-b-2 border-accent pb-0.5 font-mono text-[14px] font-semibold">
                    {site.email}
                  </a>
                </dd>
              </div>
              {site.whatsapp && (
                <div className="flex justify-between gap-4 border-t border-rule py-4">
                  <dt className={dt}>WhatsApp</dt>
                  <dd>
                    <WhatsAppLink className="border-b-2 border-accent pb-0.5 font-mono text-[14px] font-semibold" />
                  </dd>
                </div>
              )}
              {c.facts.map((f, i) => (
                <div key={f.label} className={`flex justify-between gap-4 border-t border-rule py-4 ${i === c.facts.length - 1 ? 'border-b' : ''}`}>
                  <dt className={dt}>{f.label}</dt>
                  <dd className="font-mono text-[14px]">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ContactForm initial={status} headingLevel={headingLevel === 1 ? 2 : 3} quickOptions={c.quickOptions} />
        </div>
      </div>
    </section>
  )
}
