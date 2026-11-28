/**
 * Paylaşılan içerik türleri ve iletişim sayfası metni (haber sitesi, 2026-11-28).
 * Haber içeriğinin kendisi WordPress'ten gelir (src/lib/wp/).
 */
export type Img = { src: string; alt: string; width: number; height: number; blurDataURL?: string }

/** /iletisim — haber ihbarı, düzeltme talebi, reklam ve genel iletişim. */
export const contact = {
  index: '',
  label: 'Haber merkezi',
  title: 'Haber ihbarı ve iletişim',
  text: 'Tanık olduğunuz bir olayı, belgeyi ya da görüntüyü bize iletin; editörlerimiz doğrulayıp değerlendirir. Haber kaynaklarımızın kimliğini her koşulda gizli tutarız. Düzeltme ve cevap hakkı talepleri, reklam ve iş birlikleri için de bu formu kullanabilirsiniz.',
  quickOptions: ['Haber ihbarı', 'Fotoğraf / video gönderimi', 'Düzeltme veya cevap hakkı', 'Reklam ve iş birliği', 'Diğer'],
  facts: [
    { label: 'Kaynak gizliliği', value: 'Kimliğiniz gizli tutulur' },
    { label: 'Yanıt', value: 'Editörlerimiz en kısa sürede döner' },
  ],
}
