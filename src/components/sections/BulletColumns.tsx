/** İki sütunlu madde listesi (PDF Fikserlik: "Fixing & local support" / "Production services"). */
export function BulletColumns({ columns }: { columns: readonly { label: string; items: readonly string[] }[] }) {
  return (
    <section aria-label="Hizmet kapsamı">
      <div className="shell py-[clamp(64px,6.5vw,104px)]">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-12">
          {columns.map((col) => (
            <div key={col.label} className="min-w-0">
              <h2 lang="en" className="mb-2 font-mono text-label font-semibold uppercase text-accent">
                {col.label}
              </h2>
              <ul>
                {col.items.map((it) => (
                  <li key={it} className="flex items-baseline gap-4 border-b border-rule py-[18px] font-display text-h3-list font-semibold">
                    <span aria-hidden="true" className="h-2 w-2 flex-none translate-y-[-2px] rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
