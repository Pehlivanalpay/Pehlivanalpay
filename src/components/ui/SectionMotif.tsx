import Image from 'next/image'

/**
 * Fotoğraf motifi — açık zeminli bölümlerde filigran dokusu (§4).
 * Bölüm `relative overflow-hidden`, içerik `relative z-[1]` olmalı.
 * side: fotoğrafın durduğu kenar. Perde metnin olduğu karşı kenardan başlar.
 */
export function SectionMotif({ side = 'right', src = '/hero-bg.jpg' }: { side?: 'left' | 'right'; src?: string }) {
  const right = side === 'right'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt=""
        quality={50}
        width={1376}
        height={768}
        sizes="64vw"
        className={`absolute top-1/2 h-auto w-[64%] min-w-[760px] max-w-none opacity-[0.055] contrast-[1.45] grayscale ${
          right ? '-right-[6%] -translate-y-1/2 -scale-x-100' : '-left-[6%] -translate-y-1/2'
        }`}
      />
      <div className={`absolute inset-0 ${right ? 'bg-motif-veil-r' : 'bg-motif-veil-l'}`} />
      <div className="absolute inset-0 bg-motif-scan" />
      <div className="absolute inset-0 bg-motif-grid bg-[length:80px_80px]" />
    </div>
  )
}
