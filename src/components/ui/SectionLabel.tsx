/** Bölüm üst etiketi: "01 — Sahalar". Mono 600 / 11px / 0.26em / uppercase. */
export function SectionLabel({
  index,
  children,
  tone = 'light',
  className = 'mb-5',
}: {
  index?: string
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <p className={`font-mono text-label font-semibold uppercase ${tone === 'dark' ? 'text-accent-light' : 'text-accent'} ${className}`}>
      {index && <>{index} — </>}
      {children}
    </p>
  )
}
