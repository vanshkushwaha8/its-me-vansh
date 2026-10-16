import { AmbientVideo } from '@/components/media/AmbientVideo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { media } from '@/config/media'
import { site } from '@/config/site'
import { profile } from '@/data/profile'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

export function Hero() {
  const { hero } = profile
  const meta = [
    { k: 'Based in', v: site.location },
    { k: 'Relocation', v: site.relocation.replace('Open to relocation: ', 'Open to ') },
    { k: 'Status', v: site.availability },
  ]

  return (
    <section aria-labelledby="hero-title" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-bone">
      <AmbientVideo video={media.hero} loading="eager" className="-z-20" />
      {/* Contrast layers: bottom-up for the type block, left-to-right for small screens. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" />

      <div className="container-x flex flex-1 flex-col justify-end pt-28 pb-8 md:pb-10">
        <p className="eyebrow fade-up mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-bone/80 md:mb-8" style={d(100)}>
          <span className="text-signal">(01)</span>
          <span>{hero.eyebrow}</span>
          <span aria-hidden className="hidden h-px w-10 bg-bone/40 sm:block" />
          <span className="hidden text-bone/55 sm:inline">{site.name}</span>
        </p>

        <h1 id="hero-title" className="font-display max-w-[16ch] text-[length:var(--text-hero)] leading-[0.92]!">
          <span className="mask-line">
            <span style={d(150)}>
              {hero.lines[0].replace(/\.$/, '')}
              <span className="text-signal">.</span>
            </span>
          </span>
          <span className="mask-line text-bone/55">
            <span style={d(300)}>{hero.lines[1]}</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 border-t border-bone/15 pt-8 md:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="fade-up max-w-xl text-[length:var(--text-lede)] leading-snug text-bone/85" style={d(550)}>
              {hero.intro}
            </p>
            <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={d(700)}>
              <ButtonLink href="/#work" variant="solid">
                Explore My Work
              </ButtonLink>
              <ButtonLink href={site.resume.href} download={site.resume.fileName} variant="outline" icon="down" className="text-bone">
                Download Resume
              </ButtonLink>
            </div>
          </div>

          <dl className="fade-up grid grid-cols-1 gap-4 text-sm sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:justify-self-end lg:text-right" style={d(850)}>
            {meta.map((m) => (
              <div key={m.k} className="flex items-baseline justify-between gap-4 border-b border-bone/10 pb-2 sm:block sm:border-0 sm:pb-0">
                <dt className="eyebrow text-[0.62rem]! text-bone/50">{m.k}</dt>
                <dd className="mt-1 text-bone/90">
                  {m.k === 'Status' && <span aria-hidden className="mr-2 inline-block size-1.5 animate-pulse rounded-full bg-signal align-middle" />}
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
