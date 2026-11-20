/**
 * Saha arşivinden fotoğraflar (public/images). Alternatif metinler ekran okuyucular ve Google içindir.
 * Kural (PDF s.8): fotoğraf üzerine kalıcı yazı basılmaz — kontrol odası görselindeki logo ve
 * "Savaşın Çocukları" kolajındaki başlık kırpılarak çıkarıldı.
 */
export const images = {
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
} as const
