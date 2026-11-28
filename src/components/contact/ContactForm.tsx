'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { buttonClass } from '@/components/ui/Button'
import { route, type Locale } from '@/i18n/config'
import { ui } from '@/i18n/ui'
import {
  contactFields,
  HONEYPOT,
  normalize,
  TIMESTAMP,
  validate,
  type ContactErrors,
  type ContactField,
} from '@/lib/contact'

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'ok' } | { kind: 'error'; message: string }

const label = 'font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted'
const field =
  'w-full rounded-none border border-ink/30 bg-white px-[15px] font-sans text-[15px] text-ink focus-visible:outline-offset-0 aria-[invalid=true]:border-accent'

/**
 * Proje bilgi formu (PDF: hızlı destek seçenekleri + kurum, ülke, tarih, şehir, ekip ihtiyacı, proje özeti).
 * JS yoksa klasik POST ile /api/contact'a gider (sunucu 303 ile döner); JS varsa fetch ile gönderir,
 * alan hatalarını yerinde gösterir.
 */
export function ContactForm({
  initial,
  headingLevel = 3,
  quickOptions = [],
  locale = 'tr',
}: {
  initial?: 'ok' | 'hata'
  headingLevel?: 2 | 3
  quickOptions?: readonly string[]
  locale?: Locale
}) {
  const t = ui(locale).form
  const FormHeading = headingLevel === 2 ? 'h2' : 'h3'
  const tsRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLParagraphElement>(null)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>(
    initial === 'ok'
      ? { kind: 'ok' }
      : initial === 'hata'
        ? { kind: 'error', message: ui(locale).form.failed }
        : { kind: 'idle' },
  )

  // Zaman tuzağı: formun açıldığı an. DOM'a doğrudan yazılır (render tetiklemez).
  useEffect(() => {
    if (tsRef.current) tsRef.current.value = String(Date.now())
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const errs = validate(normalize(data), locale)
    setErrors(errs)
    const first = Object.keys(errs)[0] as ContactField | undefined
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const res = await fetch(`/api/contact?lang=${locale}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: string; fields?: ContactErrors }
        | null
      if (body?.ok) {
        form.reset()
        if (tsRef.current) tsRef.current.value = String(Date.now())
        setStatus({ kind: 'ok' })
      } else {
        if (body && !body.ok && body.fields) setErrors(body.fields)
        setStatus({ kind: 'error', message: body && !body.ok ? body.error : t.retry })
      }
    } catch {
      setStatus({ kind: 'error', message: t.network })
    }
    statusRef.current?.focus()
  }

  const describe = (k: ContactField) => (errors[k] ? `${k}-hata` : undefined)
  const err = (k: ContactField) =>
    errors[k] ? (
      <p id={`${k}-hata`} className="text-[13px] leading-snug text-accent">
        {errors[k]}
      </p>
    ) : null

  // wide: tek başına tam satır (flex-col içinde 220px'lik esneme tabanı yükseklik olurdu)
  const input = (k: Exclude<ContactField, 'message' | 'need'>, type: string, autoComplete: string, placeholder?: string, wide = false) => (
    <div className={`flex min-w-0 flex-col gap-[9px] ${wide ? '' : 'flex-[1_1_220px]'}`}>
      <label htmlFor={`f-${k}`} className={label}>
        {t.labels[k]}
        {contactFields[k].required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={`f-${k}`}
        name={k}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={contactFields[k].required}
        maxLength={contactFields[k].max}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={describe(k)}
        className={`${field} h-[50px] placeholder:text-ink-muted/70`}
      />
      {err(k)}
    </div>
  )

  return (
    <form
      action={`/api/contact?lang=${locale}`}
      method="post"
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="form-baslik"
      className="flex min-w-0 flex-col gap-[22px] border border-ink/[0.22] bg-white/70 p-[clamp(24px,3vw,40px)] lg:col-span-7"
    >
      <div>
        <FormHeading id="form-baslik" className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-ink-muted">
          {t.heading}
        </FormHeading>
        <p className="mt-2 text-[13px] text-ink-muted">{t.required}</p>
      </div>

      {quickOptions.length > 0 && (
        <fieldset className="min-w-0">
          <legend className={`${label} mb-3`}>{t.quick}</legend>
          <div className="flex flex-wrap gap-2.5">
            {quickOptions.map((o) => (
              <label
                key={o}
                className="flex min-h-11 cursor-pointer items-center gap-2.5 border border-ink/25 bg-white px-4 py-2 text-[14px] font-medium text-ink has-[:checked]:border-accent has-[:checked]:bg-[color-mix(in_srgb,var(--accent)_8%,white)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink"
              >
                <input type="radio" name="need" value={o} className="h-4 w-4 flex-none accent-[#A3133D]" />
                {o}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* Haber sitesi: ülke ve ekip ihtiyacı alanları kullanılmıyor (prodüksiyon formundan kalma, isteğe bağlı alanlar) */}
      <div className="flex flex-wrap gap-[22px]">
        {input('name', 'text', 'name')}
        {input('email', 'email', 'email')}
      </div>
      <div className="flex flex-wrap gap-[22px]">
        {input('city', 'text', 'off', t.placeholders.city)}
        {input('dates', 'text', 'off', t.placeholders.dates)}
      </div>
      {input('org', 'text', 'organization', undefined, true)}
      <div className="flex flex-col gap-[9px]">
        <label htmlFor="f-message" className={label}>
          {t.labels.message}
          <span aria-hidden="true"> *</span>
        </label>
        <textarea
          id="f-message"
          name="message"
          rows={6}
          required
          maxLength={contactFields.message.max}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe('message')}
          className={`${field} resize-y py-3.5 leading-[1.6]`}
        />
        {err('message')}
      </div>

      {/* Spam koruması: bal küpü (görünmez) + açılış zamanı */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">{t.honeypot}</label>
        <input id="f-website" name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={tsRef} type="hidden" name={TIMESTAMP} defaultValue="" />

      <p className="text-[13px] leading-[1.6] text-ink-muted">
        {t.privacy[0]}{' '}
        <Link href={route('privacy', locale)} className="border-b border-ink/40 text-ink">
          {t.privacy[1]}
        </Link>
        {locale === 'en' ? '' : ' '}
        {t.privacy[2]}
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={status.kind === 'sending'}
          className={buttonClass('primary', 'lg', 'cursor-pointer border-0 px-9 disabled:cursor-wait disabled:opacity-70')}
        >
          {status.kind === 'sending' ? t.sending : t.submit}
        </button>
        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className={`text-[14px] outline-none ${status.kind === 'error' ? 'text-accent' : 'text-ink-body'}`}
        >
          {status.kind === 'ok' && t.ok}
          {status.kind === 'error' && status.message}
        </p>
      </div>
    </form>
  )
}
