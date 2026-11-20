import { site } from '@/content/site'

/**
 * WhatsApp (PDF not 03): mobilde sabit yüzen düğme; masaüstünde iletişim alanının yanında metin bağlantısı.
 * `site.whatsapp` boşken hiçbiri gösterilmez.
 */
const href = () => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Merhaba, bir proje hakkında bilgi almak istiyorum.')}`

export const WhatsAppIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43a9.37 9.37 0 0 1 9.42 9.44c0 5.2-4.23 9.43-9.43 9.43m8.03-17.46A11.32 11.32 0 0 0 12.05.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.62l6.03-1.58a11.32 11.32 0 0 0 5.42 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
  </svg>
)

export function WhatsAppLink({ className }: { className?: string }) {
  if (!site.whatsapp) return null
  return (
    <a href={href()} target="_blank" rel="noopener noreferrer" className={className}>
      +{site.whatsapp}
    </a>
  )
}

/** Mobilde sağ altta sabit düğme (960px ve üstünde gizli). */
export function WhatsAppFloat() {
  if (!site.whatsapp) return null
  return (
    <a
      href={href()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F7A4D] text-white shadow-[0_6px_20px_rgba(7,17,31,.35)] lg:hidden"
    >
      <WhatsAppIcon />
    </a>
  )
}
