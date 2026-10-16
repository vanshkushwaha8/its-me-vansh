import Image from 'next/image'
import type { ProjectCover as Cover } from '@/data/types'

const tones = {
  ink: 'bg-ink-3 text-bone',
  signal: 'bg-signal text-ink',
  bone: 'bg-bone-3 text-ink',
  moss: 'bg-moss text-bone',
} as const

type Props = {
  cover: Cover
  title: string
  /** Tailwind aspect / sizing classes for the frame. */
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Project visual. Real screenshots render through next/image; projects without public
 * visuals get a typographic composition built only from their verified scope.
 */
export function ProjectCover({ cover, title, className = 'aspect-[16/10]', sizes = '100vw', priority }: Props) {
  if (cover.type === 'image') {
    const contain = cover.fit === 'contain'
    return (
      <div className={`relative overflow-hidden ${contain ? 'bg-white' : 'bg-ink-2'} ${className}`}>
        <Image
          src={cover.image.src}
          alt={cover.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.035] ${
            contain ? 'object-contain p-[8%]' : 'object-cover object-top'
          }`}
        />
      </div>
    )
  }

  return (
    <div className={`@container relative overflow-hidden ${tones[cover.tone]} ${className}`} role="img" aria-label={`${title}: ${cover.lines.join(', ')}`}>
      <div aria-hidden className="blueprint absolute inset-0 opacity-[0.07]" />
      <ul aria-hidden className="absolute top-[7%] right-[6%] left-[6%] grid gap-1.5 font-mono text-[clamp(0.6rem,2.6cqw,0.85rem)] tracking-wide sm:left-auto sm:max-w-[60%]">
        {cover.lines.map((line, i) => (
          <li key={line} className="flex gap-3 border-b border-current/15 pb-1.5 opacity-80">
            <span className="opacity-50">{String(i + 1).padStart(2, '0')}</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <span
        aria-hidden
        className="font-display absolute -bottom-[0.08em] left-[4%] text-[34cqw] leading-[0.8] transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-[3%]"
      >
        {cover.mark}
      </span>
    </div>
  )
}
