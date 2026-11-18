# ELIS360 NEWS — web sitesi

Next.js (App Router) + TypeScript + Tailwind 3. Headless WordPress (WPGraphQL) Faz 2'de bağlanacak.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run lint
npm run typecheck
npm run check:content  # yayın öncesi yer tutucu denetimi
```

## Tasarım kaynağı

- `docs/design-tokens.md` — tasarım sistemi (renk, tipografi, ızgara, bileşen kuralları)
- `docs/reference/*.html` — tasarımın birebir çıktısı; emin olunmayan her değer buradan okunur
- `tailwind.config.ts` — token'lar; elle değiştirmeyin, dökümanla birebir aynı

## Yapı

```
src/app/layout.tsx          header katmanları (reklam → header → yapışkan nav → son dakika)
src/app/api/conditions      ziyaretçi şehri (Vercel geo başlıkları) + hava (Open-Meteo)
src/components/header/      AdSlot, ServiceBar, Masthead, StickyNav, BreakingBar, Clocks, Conditions
src/components/ui/          Button, ikonlar
src/content/site.ts         paylaşılan içerik — yer tutucular tek yerde
TODO-CONTENT.md             yayın öncesi beklenen içerik listesi
```

**Yapışkan navigasyon `<header>`'ın içine taşınmamalı** — açıklaması `StickyNav.tsx` ve `layout.tsx` içinde.
