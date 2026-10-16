import { AmbientVideo } from '@/components/media/AmbientVideo'
import { media } from '@/config/media'
import { profile } from '@/data/profile'

/** Full-bleed cinematic band between work and experience. Video is lazy-loaded. */
export function Approach() {
  const { approach } = profile
  return (
    <section aria-labelledby="approach-title" className="grain relative isolate overflow-hidden bg-ink text-bone">
      <AmbientVideo video={media.approach} loading="lazy" className="-z-20 opacity-70" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/40 to-ink" />
      <div className="container-x py-28 md:py-44">
        <p className="eyebrow mb-6 text-bone/60" data-reveal>
          (04) — How I work
        </p>
        <h2 id="approach-title" className="font-display max-w-[12ch] text-[length:var(--text-display)]" data-reveal>
          {approach.title}
        </h2>
        <ol className="mt-16 grid border-t border-bone/20 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {approach.steps.map((s, i) => (
            <li
              key={s.n}
              className={`border-b border-bone/20 py-8 sm:pr-8 lg:border-b-0 ${i > 0 ? 'lg:border-l lg:pl-8' : ''} ${i % 2 === 1 ? 'sm:border-l sm:pl-8' : ''}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <span className="font-mono text-xs text-signal">{s.n}</span>
              <h3 className="font-display mt-4 text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-[30ch] leading-relaxed text-bone/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
