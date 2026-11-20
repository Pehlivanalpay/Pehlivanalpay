import { NumberedList } from '@/components/ui/NumberedList'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SectionMotif } from '@/components/ui/SectionMotif'

/**
 * Başlık (4 sütun) + fosforlu numaralı liste (8 sütun).
 * tone: light (kâğıt), cream (kırık beyaz — PDF Marka & PR), dark (gece laciverti).
 */
export function ListSection({
  id,
  label,
  title,
  text,
  items,
  tone = 'light',
  motif = false,
}: {
  id: string
  label: string
  title: string
  text?: string
  items: readonly string[]
  tone?: 'light' | 'cream' | 'dark'
  motif?: boolean
}) {
  const dark = tone === 'dark'
  return (
    <section
      id={id}
      aria-labelledby={`${id}-baslik`}
      className={`relative overflow-hidden ${dark ? 'surface-dark bg-ink text-onDark' : tone === 'cream' ? 'bg-paper-cream' : ''}`}
    >
      {motif && !dark && <SectionMotif side="right" />}
      <div className="shell relative z-[1] py-[clamp(72px,7.5vw,112px)]">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-12">
          <div className="min-w-0 lg:col-span-4">
            <SectionLabel tone={dark ? 'dark' : 'light'}>{label}</SectionLabel>
            <h2 id={`${id}-baslik`} className="mb-5 font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.08] tracking-[-0.02em]">
              {title}
            </h2>
            {text && <p className={`text-[15px] font-light leading-[1.7] ${dark ? 'text-onDark-muted' : 'text-ink-muted'}`}>{text}</p>}
          </div>
          <NumberedList items={items} tone={dark ? 'dark' : 'light'} variant="text" minCol={330} className="min-w-0 self-start lg:col-span-8" />
        </div>
      </div>
    </section>
  )
}
