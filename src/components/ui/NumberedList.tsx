/**
 * Fosforlu vurgulu numaralı liste (§4).
 *
 * variant="display": Archivo 19px (ana sayfa Sahalar).
 * variant="text": Inter 16px, satır 1.6 (Fikserlik hizmet listeleri). Koyu zeminde referans
 *   bu varyantta daha güçlü vurgu kullanıyor (wash %26, kutucuk %16) — gövde boyutunda
 *   metin üzerinde %15 yetersiz okunuyor. docs/reference/fikserlik.html'den. Numara kutucuğu `.mark-num`, metin `.mark`
 * (inline span — çok satırda her satıra uygulanır). Koyu zeminde `-dark` sürümleri.
 * Izgara akışkan: auto-fit, en dar sütun `minCol`.
 */
export function NumberedList({
  items,
  tone = 'light',
  minCol = 190,
  variant = 'display',
  className = '',
}: {
  items: readonly string[]
  tone?: 'light' | 'dark'
  minCol?: number
  variant?: 'display' | 'text'
  className?: string
}) {
  const dark = tone === 'dark'
  const text = variant === 'text'
  const numCls = dark
    ? text
      ? 'bg-[color-mix(in_srgb,var(--accent-light)_16%,transparent)] px-2 py-1 text-accent-light'
      : 'mark-num-dark text-accent-light'
    : // Token'daki %11 (.mark-num) açık zeminde 4.46:1 veriyor — 4.5 eşiğinin altında (axe).
      // %9 → 4.6:1. Görsel fark ihmal edilebilir. docs/design-tokens.md §4 güncellenmeli.
      'bg-[color-mix(in_srgb,var(--accent)_9%,transparent)] px-2 py-1 text-accent'
  const markCls = dark
    ? text
      ? 'mark-dark [background-image:linear-gradient(to_top,color-mix(in_srgb,var(--accent-light)_26%,transparent)_0,color-mix(in_srgb,var(--accent-light)_26%,transparent)_.64em,transparent_.64em)]'
      : 'mark-dark'
    : 'mark'
  return (
    <ol
      className={`grid ${text ? 'gap-x-12' : 'gap-x-6'} ${className}`}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${minCol}px, 100%), 1fr))` }}
    >
      {items.map((item, i) => (
        <li
          key={item}
          className={`flex items-baseline border-t ${text ? 'gap-3.5 py-[15px]' : 'gap-3 py-[13px]'} ${
            dark ? (text ? 'border-white/[0.16]' : 'border-rule-dark') : 'border-rule'
          }`}
        >
          <span className={`flex-none font-mono text-[11px] font-semibold tracking-[0.14em] ${numCls}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <span
            className={
              text
                ? `min-w-0 text-[16px] leading-[1.6] ${dark ? 'text-white' : 'text-ink'}`
                : 'font-display text-[19px] font-medium tracking-[0.01em]'
            }
          >
            <span className={markCls}>{item}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
