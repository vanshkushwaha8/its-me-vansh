export function TagList({ items, tone = 'light', label = 'Technologies' }: { items: string[]; tone?: 'light' | 'dark'; label?: string }) {
  if (!items.length) return null
  const cls = tone === 'light' ? 'border-ink/15 text-ink/75' : 'border-bone/15 text-bone/75'
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((item) => (
        <li key={item} className={`rounded-full border px-2.5 py-1 font-mono text-[0.7rem] tracking-wide ${cls}`}>
          {item}
        </li>
      ))}
    </ul>
  )
}

const statusTone: Record<string, string> = {
  Live: 'bg-signal text-ink',
  Delivered: 'bg-bone text-ink',
  'In development': 'border border-current/40',
  Prototype: 'border border-current/40',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem]! ${statusTone[status] ?? ''}`}>
      {status === 'Live' && <span aria-hidden className="size-1.5 rounded-full bg-ink" />}
      {status}
    </span>
  )
}
