type Props = {
  index: string
  label: string
  title: React.ReactNode
  intro?: React.ReactNode
  id?: string
  tone?: 'dark' | 'light'
  as?: 'h1' | 'h2'
}

/** Numbered editorial section opener: "(02) — Label", oversized title, short intro. */
export function SectionHeader({ index, label, title, intro, id, tone = 'light', as: Tag = 'h2' }: Props) {
  const mute = tone === 'light' ? 'text-mute-light' : 'text-mute-dark'
  return (
    <header className="grid gap-8 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8" data-reveal>
        <p className={`eyebrow mb-6 flex items-center gap-3 ${mute}`}>
          <span>({index})</span>
          <span aria-hidden className="h-px w-10 bg-current" />
          <span>{label}</span>
        </p>
        <Tag id={id} className="font-display text-[length:var(--text-display)]">
          {title}
        </Tag>
      </div>
      {intro && (
        <p className={`max-w-md text-lg leading-relaxed md:col-span-4 md:pb-2 ${mute}`} data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          {intro}
        </p>
      )}
    </header>
  )
}
