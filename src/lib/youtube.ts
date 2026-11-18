/** YouTube adresinden video kimliği: watch?v=, youtu.be/, /embed/, /shorts/, /live/. Geçersizse null. */
export function youtubeId(url: string | null): string | null {
  if (!url) return null
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\.|^m\./, '')
    let id: string | null = null
    if (host === 'youtu.be') id = u.pathname.slice(1)
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      id = u.searchParams.get('v') ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1] ?? null
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null
  } catch {
    return null
  }
}
