/**
 * Fosforlu vurgulu numaralı liste (§4). Numara kutucuğu `.mark-num`, metin `.mark`
 * (inline span — çok satırda her satıra uygulanır). Koyu zeminde `-dark` sürümleri.
 * Izgara akışkan: auto-fit, en dar sütun `minCol`.
 */
export function NumberedList({
  items,
  tone = 'light',
  minCol = 190,
  className = '',
}: {
  items: readonly string[]
  tone?: 'light' | 'dark'
  minCol?: number
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <ol
      className={`grid gap-x-6 ${className}`}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${minCol}px, 100%), 1fr))` }}
    >
      {items.map((item, i) => (
        <li key={item} className={`flex items-baseline gap-3 border-t py-[13px] ${dark ? 'border-rule-dark' : 'border-rule'}`}>
          <span
            className={`flex-none font-mono text-[11px] font-semibold tracking-[0.14em] ${dark ? 'mark-num-dark text-accent-light' : 'mark-num text-accent'}`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="font-display text-[19px] font-medium tracking-[0.01em]">
            <span className={dark ? 'mark-dark' : 'mark'}>{item}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
