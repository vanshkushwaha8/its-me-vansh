import { profile } from '@/data/profile'

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="bg-bone text-ink">
      <div className="container-x py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-12">
          <p className="eyebrow text-mute-light md:col-span-3" data-reveal>
            (02) — In short
          </p>
          <h2 id="intro-title" className="text-[clamp(1.75rem,4vw,3.6rem)] leading-[1.08] font-medium tracking-[-0.025em] md:col-span-9" data-reveal>
            {profile.statement}
          </h2>
        </div>

        <dl className="mt-20 grid grid-cols-2 border-t border-ink/15 md:mt-28 md:grid-cols-4">
          {profile.facts.map((f, i) => (
            <div
              key={f.label}
              className={`border-b border-ink/15 py-8 pr-4 md:border-b-0 md:py-10 ${i % 2 === 1 ? 'pl-4 md:pl-8' : ''} ${i > 0 ? 'md:border-l md:pl-8' : ''} ${i === 1 ? 'border-l' : ''} ${i === 3 ? 'border-l' : ''}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
            >
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="font-display block text-[clamp(3.5rem,8vw,7rem)]">{f.value}</span>
                <span className="mt-3 block max-w-[18ch] text-sm leading-snug text-mute-light">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
