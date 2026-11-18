import { Clocks } from './Clocks'
import { Conditions } from './Conditions'
import { InstagramIcon, LinkedInIcon, YouTubeIcon } from '@/components/ui/icons'
import type { SocialLink } from '@/content/site'

const socialIcons = { LinkedIn: LinkedInIcon, Instagram: InstagramIcon, YouTube: YouTubeIcon }

type ServiceBarProps = {
  clocks: readonly { label: string; timeZone: string }[]
  social: readonly SocialLink[]
  email: string
}

/** Header 2. katman (42px): konum, hava, 4 saat, sosyal, e-posta. Kayar. */
export function ServiceBar({ clocks, social, email }: ServiceBarProps) {
  return (
    <div className="border-b border-white/10 text-onDark-glass">
      <div className="shell flex min-h-[42px] flex-wrap items-center justify-between gap-x-7 gap-y-1 font-mono text-[11px] tracking-[0.14em]">
        <div className="flex flex-wrap items-center gap-x-[22px] gap-y-1.5">
          <Conditions />
          <span aria-hidden="true" className="hidden h-3.5 w-px bg-white/20 lg:inline-block" />
          <Clocks clocks={clocks} />
        </div>
        <div className="flex flex-wrap items-center gap-x-[18px] gap-y-1.5">
          <ul className="flex items-center">
            {social.map(({ name, href }) => {
              const Icon = socialIcons[name]
              return (
                <li key={name}>
                  {/* Dokunma alanı 44px (§8). Negatif dikey boşluk, 42px'lik bar yüksekliğini korur. */}
                  <a
                    href={href}
                    aria-label={name}
                    className="-my-px flex h-11 w-11 items-center justify-center text-onDark-glass"
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon />
                  </a>
                </li>
              )
            })}
          </ul>
          <a href={`mailto:${email}`} className="hidden text-white lg:inline">
            {email}
          </a>
        </div>
      </div>
    </div>
  )
}
