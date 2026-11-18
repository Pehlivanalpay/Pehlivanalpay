/**
 * Kategori etiketi — haber sitesi karakterinin taşıyıcısı. Köşe yok, keskin.
 * Açık zeminde ink üzeri beyaz; koyu zeminde accent-light üzeri ink (§4).
 *
 * size: xs = liste (10px, 4/9) · sm = kart (11px, 6/12) · svc = hizmet başlığı (11px, 8/15)
 * `num` verilirse iki parçalı: kırmızı numara + kod ("01 FIXING").
 */
type Size = 'xs' | 'sm' | 'svc'

const sizes: Record<Size, string> = {
  xs: 'px-[9px] py-1 text-meta-xs',
  sm: 'px-3 py-1.5 text-meta',
  svc: 'gap-[11px] px-[15px] py-2 text-[11px] tracking-[0.22em]',
}

export function CategoryTag({
  children,
  num,
  size = 'xs',
  tone = 'light',
  className = '',
}: {
  children: React.ReactNode
  num?: string
  size?: Size
  tone?: 'light' | 'dark'
  className?: string
}) {
  const colors = tone === 'dark' ? 'bg-accent-light text-ink' : 'bg-ink text-white'
  return (
    <span className={`inline-flex items-center font-mono font-semibold uppercase ${sizes[size]} ${colors} ${className}`}>
      {num && <span className={tone === 'dark' ? 'text-ink' : 'text-accent-light'}>{num}</span>}
      {children}
    </span>
  )
}
