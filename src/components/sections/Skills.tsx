import { Bot, Database, Layers, Server, ShieldCheck } from 'lucide-react'
import { skills } from '@/data/skills'

const icons = { backend: Server, data: Database, frontend: Layers, ai: Bot, domain: ShieldCheck } as const

export function Skills() {
  return (
    <section aria-labelledby="skills-title" className="bg-ink text-bone">
      <div className="container-x py-24 md:py-36">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7" data-reveal>
            <p className="eyebrow mb-6 text-mute-dark">(06) — Toolkit</p>
            <h2 id="skills-title" className="font-display text-[length:var(--text-display)]">
              The stack<span className="text-signal">.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-mute-dark md:col-span-5 md:justify-self-end" data-reveal>
            Grouped by where I use them. No percentages, just what I’ve shipped with.
          </p>
        </div>

        <div className="mt-16 border-t border-bone/20 md:mt-24">
          {skills.map((g, i) => {
            const Icon = icons[g.id as keyof typeof icons] ?? Server
            return (
              <div
                key={g.id}
                className="group grid gap-5 border-b border-bone/20 py-8 transition-colors duration-500 hover:bg-bone/[0.03] md:grid-cols-12 md:gap-8 md:py-10"
                data-reveal
                style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
              >
                <div className="flex items-start gap-4 md:col-span-4">
                  <span className="font-mono pt-2 text-xs text-bone/40">0{i + 1}</span>
                  <div>
                    <h3 className="font-display flex items-center gap-3 text-[clamp(2rem,3.6vw,3rem)]">
                      {g.title}
                      <Icon aria-hidden className="size-5 text-bone/35 transition-colors duration-500 group-hover:text-signal" strokeWidth={1.5} />
                    </h3>
                    <p className="mt-2 text-sm text-mute-dark">{g.note}</p>
                  </div>
                </div>
                <ul className="flex flex-wrap content-center gap-x-2 gap-y-2 md:col-span-8" aria-label={`${g.title} skills`}>
                  {g.items.map((s) => (
                    <li key={s} className="border border-bone/20 px-3.5 py-2 text-[0.95rem] text-bone/90 transition-colors duration-300 hover:border-bone/60">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
