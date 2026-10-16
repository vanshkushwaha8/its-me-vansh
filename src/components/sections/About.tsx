import { activities, certifications, education } from '@/data/education'
import { profile } from '@/data/profile'

export function About() {
  const { about } = profile
  return (
    <section id="about" aria-labelledby="about-title" className="bg-bone text-ink">
      <div className="container-x py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5" data-reveal>
            <p className="eyebrow mb-6 text-mute-light">(07) — About</p>
            <h2 id="about-title" className="font-display text-[length:var(--text-display)]">
              About<span className="text-signal">.</span>
            </h2>
          </div>
          <div className="md:col-span-7" data-reveal style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
            <p className="text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.15] font-medium tracking-[-0.02em]">{about.lead}</p>
            <div className="mt-8 grid gap-5 text-lg leading-relaxed text-ink/80">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-20 grid border-t border-ink/15 sm:grid-cols-3 md:mt-28">
          {about.principles.map((p, i) => (
            <li
              key={p.title}
              className={`border-b border-ink/15 py-8 sm:border-b-0 sm:pr-6 ${i > 0 ? 'sm:border-l sm:pl-6' : ''}`}
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
            >
              <h3 className="font-display text-3xl">{p.title}</h3>
              <p className="mt-2 text-mute-light">{p.body}</p>
            </li>
          ))}
        </ul>

        {/* Education: deliberately compact. */}
        <div className="mt-20 grid gap-8 bg-bone-2 p-6 sm:p-8 md:mt-28 md:grid-cols-12 md:p-10" aria-labelledby="education-title" role="group">
          <h3 id="education-title" className="eyebrow text-mute-light md:col-span-3">
            Education
          </h3>
          {education.map((e) => (
            <div key={e.institution} className="md:col-span-5">
              <p className="text-xl font-medium">
                {e.degree}, {e.field}
              </p>
              <p className="mt-1 text-ink/80">{e.institution}</p>
              <p className="mt-3 font-mono text-sm text-mute-light">
                {e.start}–{e.end} · {e.grade}
              </p>
            </div>
          ))}
          <div className="text-sm leading-relaxed text-ink/80 md:col-span-4">
            <p className="eyebrow mb-2 text-mute-light">Certifications</p>
            <ul className="grid gap-1">
              {certifications.map((c) => (
                <li key={c.title}>
                  {c.title} — <span className="text-mute-light">{c.issuer}</span>
                </li>
              ))}
              {activities.map((a) => (
                <li key={a} className="mt-2">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
