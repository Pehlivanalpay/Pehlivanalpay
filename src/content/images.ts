/**
 * Saha arşivinden fotoğraflar (public/images). Alternatif metinler ekran okuyucular ve Google içindir.
 * Kural (PDF s.8): fotoğraf üzerine kalıcı yazı basılmaz — kontrol odası görselindeki logo ve
 * "Savaşın Çocukları" kolajındaki başlık kırpılarak çıkarıldı.
 */
import { blur } from './image-blur'

const raw = {
  studyo: {
    src: '/images/studyo.jpg',
    alt: 'Haber stüdyosunda çekim: kameraman, ışıkçı, ses teknisyeni ve yönetmen, masada sunucu',
    width: 1600,
    height: 900,
  },
  kontrolOdasi: {
    src: '/images/kontrol-odasi.jpg',
    alt: 'Yayın kontrol odasında monitör duvarı önünde kurgu ve yayın masasında çalışan ekip',
    width: 1600,
    height: 720,
  },
  sahaEkip: {
    src: '/images/saha-ekip.jpg',
    alt: 'Sahada yabancı medya ekibi: yelekli muhabir, harita ve telsizle koordinasyon yapan yapım sorumlusu, önde kamera',
    width: 1600,
    height: 900,
  },
  sahaKameraman: {
    src: '/images/saha-kameraman.jpg',
    alt: 'Sırtında PRESS yazan kameraman dağlık bir sahada çekim yapıyor; gökyüzünde görev bölgelerini gösteren harita',
    width: 1600,
    height: 900,
  },
  savasinCocuklari: {
    src: '/images/savasin-cocuklari.jpg',
    alt: 'Kurşun delikli kırık camın ardından bakan çocuklar — Savaşın Çocukları projesinden',
    width: 790,
    height: 590,
  },
  kaleKesif: {
    src: '/images/kale-kesif.jpg',
    alt: 'Kale surlarında çekim öncesi keşif: harita üzerinden yön gösteren yapım koordinatörü, tripod üzerinde kamera ve drone kumandasıyla operatör; altta kasaba ve ova',
    width: 1600,
    height: 900,
  },
  bergamaCekim: {
    src: '/images/bergama-cekim.jpg',
    alt: 'Bergama antik kentinde yabancı belgesel ekibi: kameraman, haritayla yön gösteren fixer, not alan yapımcı ve boom mikrofonlu ses teknisyeni',
    width: 1600,
    height: 900,
  },
  sokakCekimi: {
    src: '/images/sokak-cekimi.jpg',
    alt: 'Taş döşeli sokakta dolly üzerinde kamera ile belgesel çekimi; boom mikrofon, yönetmen ve kameraya doğru yürüyen yaşlı bir karakter',
    width: 1600,
    height: 901,
  },
  havalimaniLojistik: {
    src: '/images/havalimani-lojistik.jpg',
    alt: 'Havalimanı çıkışında yabancı çekim ekibini karşılayan saha ekibi; kamera kasaları ve tripodlar minibüse yükleniyor',
    width: 1600,
    height: 900,
  },
  // Stok (Pexels Lisansı — ticari kullanım serbest, atıf gerekmez). Kaynak: docs/image-credits.md
  reji: {
    src: '/images/reji.jpg',
    alt: 'Yayın rejisinde kulaklıklı iki operatör, çok kameralı canlı yayının görüntülerinin aktığı monitör duvarının önünde',
    width: 1600,
    height: 900,
  },
  markaFilmSeti: {
    src: '/images/marka-film-seti.jpg',
    alt: 'Marka filmi ve röportaj seti: ışık ve fon önünde oturan konuk, kamerayı kuran operatör ve monitörden izleyen yönetmen',
    width: 1600,
    height: 900,
  },
} as const

/** Her fotoğrafa bulanık ön izleme eklenir (src/content/image-blur.ts — npm run images). */
export const images = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, { ...v, blurDataURL: blur[v.src] as string | undefined }])) as {
  [K in keyof typeof raw]: (typeof raw)[K] & { blurDataURL?: string }
}

/** next/image için: ön izleme varsa yüklenirken onu göster (siyah kutu yerine). */
export const blurProps = (img: { blurDataURL?: string }) => (img.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: img.blurDataURL } : {})
