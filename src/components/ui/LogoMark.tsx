/**
 * ELIS360 amblemi — eskizden (docs/brand/logo-eskiz.webp) türetildi.
 *
 * Yapı (64×64 ızgara, merkez 32,32):
 *  - Halka r=27.6, kalınlık 5.6, düz uçlu; üstte ve altta boşlukla ikiye bölünmüş.
 *    Sol yay gri (262°→98°), sağ yay kırmızı (281°→81°). "360" = tam tur, iki yarım.
 *  - Kırmızı yayın başında nokta (r=4.3): yayın canlı noktası / kayıt ışığı.
 *  - Üç çubuklu "E": üst ve alt çubuğun sağ ucu eğik kesik — sitedeki kesik köşe
 *    (notch) diliyle aynı. Orta çubuk kısa ve düz.
 *
 * Renkler token'lardan: koyu zeminde accent-light, açık zeminde accent (§1).
 * Dekoratif kullanımda aria-hidden; tek başına kullanılıyorsa `title` verin.
 */
type Tone = 'dark' | 'light'

const palette: Record<Tone, { ring: string; red: string; e: string }> = {
  dark: { ring: '#AAB3C0', red: '#F2667D', e: '#F3EFE7' },
  light: { ring: '#AAB3C0', red: '#A3133D', e: '#07111F' },
}

export function LogoMark({ size = 40, tone = 'dark', title, className }: { size?: number; tone?: Tone; title?: string; className?: string }) {
  const p = palette[tone]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <g fill="none" strokeWidth="5.6" strokeLinecap="butt">
        <path d="M28.16 4.67 A27.6 27.6 0 0 0 28.16 59.33" stroke={p.ring} />
        <path d="M37.27 4.91 A27.6 27.6 0 0 1 36.32 59.26" stroke={p.red} />
      </g>
      <circle cx="37.27" cy="4.91" r="4.3" fill={p.red} />
      <g fill={p.e}>
        <path d="M19 19.2h25.6l-3.5 5.3H19z" />
        <path d="M19 29.35h17.3v5.3H19z" />
        <path d="M19 39.5h25.6l-3.5 5.3H19z" />
      </g>
    </svg>
  )
}
