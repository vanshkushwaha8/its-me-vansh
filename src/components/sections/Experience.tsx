import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TagList } from '@/components/ui/Tag'
import { experience } from '@/data/experience'
import { getProject } from '@/data/projects'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-bone text-ink">
      <div className="container-x py-24 md:py-36">
        <SectionHeader
          id="experience-title"
          index="05"
          label="Experience"
          title={
            <>
              Experience<span className="text-signal">.</span>
            </>
          }
          intro="Production work for client teams in Europe and Australia: APIs, compliance workflows and the systems around them."
        />

        <ol className="mt-16 md:mt-24">
          {experience.map((job) => (
            <li key={job.company} className="grid gap-10 border-t border-ink py-10 md:grid-cols-12 md:py-14">
              <div className="md:col-span-4" data-reveal>
                <p className="eyebrow text-mute-light">
                  <time dateTime={job.startIso}>{job.start}</time> — <time dateTime={job.endIso}>{job.end}</time>
                </p>
                <h3 className="font-display mt-4 text-[clamp(2.2rem,4vw,3.5rem)]">{job.role}</h3>
                <p className="mt-2 text-lg font-medium">{job.company}</p>
                <p className="mt-1 text-sm text-mute-light">{job.location}</p>
              </div>

              <div className="md:col-span-5" data-reveal style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
                <p className="text-lg leading-relaxed">{job.summary}</p>
                <ul className="mt-6 grid gap-3 leading-snug text-ink/80">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1 shrink-0 bg-signal" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid content-start gap-8 md:col-span-3" data-reveal style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>
                <div>
                  <p className="eyebrow mb-3 text-mute-light">Products</p>
                  <ul className="grid">
                    {job.projects.map((slug) => {
                      const p = getProject(slug)
                      if (!p) return null
                      return (
                        <li key={slug} className="border-b border-ink/15">
                          {p.caseStudy ? (
                            <Link href={`/projects/${slug}`} className="group flex min-h-11 items-center justify-between gap-3 py-2 hover:text-signal-deep">
                              <span className="font-medium">{p.title}</span>
                              <span className="text-xs text-mute-light group-hover:text-signal-deep">Case study →</span>
                            </Link>
                          ) : (
                            <span className="flex min-h-11 items-center justify-between gap-3 py-2">
                              <span className="font-medium">{p.title}</span>
                              <span className="text-xs text-mute-light">{p.category}</span>
                            </span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <TagList items={job.stack} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
