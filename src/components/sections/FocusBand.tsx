import { profile } from '@/data/profile'

/** Slow marquee of focus areas. Duplicated once for a seamless loop; the copy is aria-hidden. */
export function FocusBand() {
  const items = profile.focusAreas
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="font-display flex items-center gap-8 pr-8 text-[clamp(1.6rem,3.4vw,2.75rem)] whitespace-nowrap">
          {t}
          <span aria-hidden className="size-2 rotate-45 bg-ink" />
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Focus areas" className="overflow-hidden border-y border-ink bg-signal py-4 text-ink md:py-5">
      <div className="marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
