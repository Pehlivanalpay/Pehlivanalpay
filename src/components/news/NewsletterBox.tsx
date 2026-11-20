'use client'

import { useState, type FormEvent } from 'react'

type State = { kind: 'idle' | 'sending' | 'ok' } | { kind: 'error'; message: string }

/** Bülten kutusu (haber.html). Açık rıza onayı zorunlu (KVKK). */
export function NewsletterBox({ className = '' }: { className?: string }) {
  const [state, setState] = useState<State>({ kind: 'idle' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setState({ kind: 'sending' })
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), consent: data.get('consent') === 'on', website: data.get('website') }),
      })
      const body = (await res.json().catch(() => null)) as { ok: boolean; error?: string } | null
      if (body?.ok) {
        form.reset()
        setState({ kind: 'ok' })
      } else setState({ kind: 'error', message: body?.error ?? 'Abonelik alınamadı. Lütfen tekrar deneyin.' })
    } catch {
      setState({ kind: 'error', message: 'Bağlantı kurulamadı. Lütfen tekrar deneyin.' })
    }
  }

  return (
    <div className={`surface-dark min-w-0 bg-glass-surface p-8 text-onDark ${className}`}>
      <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-onDark-glass">Bülten</p>
      <h2 className="mb-3 font-display text-[28px] font-bold leading-[1.12] tracking-[-0.02em] text-white">Sahadan gelenleri e-postayla alın</h2>
      <p className="mb-6 text-small text-onDark-muted">Özel dosyalar ve saha notları haftada bir kez.</p>
      <form onSubmit={onSubmit} noValidate className="flex flex-wrap gap-3">
        <label htmlFor="b-mail" className="sr-only">
          E-posta adresiniz
        </label>
        <input
          id="b-mail"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="E-posta adresiniz"
          className="h-[50px] min-w-0 flex-[1_1_200px] rounded-none border border-white/[0.26] bg-white/[0.06] px-[15px] text-[15px] text-white placeholder:text-[#99A1AD] focus-visible:outline-offset-0"
        />
        <button
          type="submit"
          disabled={state.kind === 'sending'}
          className="h-[50px] cursor-pointer border-0 bg-accent px-[26px] font-mono text-[13px] font-semibold uppercase tracking-[0.16em] text-white disabled:cursor-wait disabled:opacity-70"
        >
          {state.kind === 'sending' ? 'Gönderiliyor…' : 'Abone ol'}
        </button>
        <label className="flex w-full items-start gap-2.5 text-[13px] leading-[1.5] text-onDark-muted">
          <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 flex-none accent-[#F2667D]" />
          <span>Bülten gönderimi için e-posta adresimin saklanmasına onay veriyorum. İstediğim zaman ayrılabilirim.</span>
        </label>
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="b-website">Web siteniz (boş bırakın)</label>
          <input id="b-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </form>
      <p role="status" className={`mt-3 min-h-[1.5em] text-[14px] ${state.kind === 'error' ? 'text-accent-light' : 'text-onDark'}`}>
        {state.kind === 'ok' && 'Teşekkürler — bültene kaydoldunuz.'}
        {state.kind === 'error' && state.message}
      </p>
    </div>
  )
}
