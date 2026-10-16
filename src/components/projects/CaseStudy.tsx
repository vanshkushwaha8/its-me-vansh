import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { ProjectCover } from './ProjectCover'
import { ProjectLinks } from './ProjectLinks'
import { StatusBadge } from '@/components/ui/Tag'
import type { CaseStudy as CaseStudyData, Project } from '@/data/types'

type Props = { project: Project & { caseStudy: CaseStudyData }; next: Project; prev: Project }

function Block({ n, title, children, id }: { n: string; title: string; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-ink/15 py-14 md:grid-cols-12 md:py-20">
      <div className="md:col-span-4" data-reveal>
        <p className="font-mono text-xs text-signal-deep">{n}</p>
        <h2 id={id} className="font-display mt-3 text-[clamp(2rem,3.6vw,3.25rem)]">
          {title}
        </h2>
      </div>
      <div className="md:col-span-8" data-reveal style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
        {children}
      </div>
    </section>
  )
}

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="grid gap-3 text-lg leading-relaxed text-ink/85">
    {items.map((t) => (
      <li key={t} className="flex gap-4">
        <span aria-hidden className="mt-3 size-1.5 shrink-0 bg-signal" />
        {t}
      </li>
    ))}
  </ul>
)

export function CaseStudy({ project, next, prev }: Props) {
  const cs = project.caseStudy
  let n = 0
  const num = () => String(++n).padStart(2, '0')

  return (
    <article>
      {/* Hero */}
      <header className="bg-ink pt-28 text-bone md:pt-36">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="fade-up">
            <ol className="eyebrow flex flex-wrap items-center gap-2 text-mute-dark">
              <li>
                <Link href="/" className="hover:text-bone">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/projects" className="hover:text-bone">Projects</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-bone">{project.title}</li>
            </ol>
          </nav>
          <h1 className="font-display mt-8 text-[length:var(--text-mega)]">
            <span className="mask-line">
              <span style={{ '--d': '100ms' } as React.CSSProperties}>{project.title}</span>
            </span>
          </h1>
          <div className="fade-up mt-8 grid gap-8 border-t border-bone/15 pt-8 md:grid-cols-12" style={{ '--d': '300ms' } as React.CSSProperties}>
            <p className="text-[length:var(--text-lede)] leading-snug text-bone/85 md:col-span-6">{project.summary}</p>
            <dl className="grid grid-cols-2 gap-6 text-sm md:col-span-5 md:col-start-8">
              <div>
                <dt className="eyebrow text-mute-dark">Category</dt>
                <dd className="mt-1.5">{project.category}</dd>
              </div>
              <div>
                <dt className="eyebrow text-mute-dark">Role</dt>
                <dd className="mt-1.5">{project.role}</dd>
              </div>
              <div>
                <dt className="eyebrow text-mute-dark">{project.kind === 'professional' ? 'Context' : 'Type'}</dt>
                <dd className="mt-1.5">{project.client ?? 'Independent product'}</dd>
              </div>
              <div>
                <dt className="eyebrow text-mute-dark">Status</dt>
                <dd className="mt-1.5">
                  <StatusBadge status={project.status} />
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-8">
            <ProjectLinks project={project} tone="dark" showCaseStudy={false} />
          </div>
        </div>
        <div className="container-x mt-12 pb-0 md:mt-16">
          <div className="fade-up translate-y-px" style={{ '--d': '450ms' } as React.CSSProperties}>
            <ProjectCover cover={project.cover} title={project.title} className="aspect-[4/3] sm:aspect-[16/9]" sizes="(min-width: 1792px) 1680px, 100vw" priority />
          </div>
        </div>
      </header>

      <div className="bg-bone text-ink">
        <div className="container-x pt-14 pb-24 md:pt-20 md:pb-32">
          {cs.statusNote && (
            <p className="mb-6 flex items-start gap-3 border border-ink/15 bg-bone-2 p-5 text-[0.95rem] leading-relaxed" role="note">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-signal-deep" />
              {cs.statusNote}
            </p>
          )}

          <Block n={num()} title="Overview" id="overview">
            <p className="text-[clamp(1.25rem,2vw,1.6rem)] leading-normal">{cs.overview}</p>
          </Block>

          <Block n={num()} title="Problem & goals" id="problem">
            <p className="text-lg leading-relaxed text-ink/85">{cs.problem}</p>
            <div className="mt-8">
              <p className="eyebrow mb-4 text-mute-light">Goals</p>
              <Bullets items={cs.goals} />
            </div>
          </Block>

          <Block n={num()} title="My role" id="role">
            <p className="eyebrow mb-5 text-mute-light">{project.role}</p>
            <Bullets items={cs.contributions} />
          </Block>

          {cs.stack.length > 0 && (
            <Block n={num()} title="Stack" id="stack">
              <dl className="grid gap-6 sm:grid-cols-2">
                {cs.stack.map((g) => (
                  <div key={g.group} className="border-t border-ink/15 pt-4">
                    <dt className="eyebrow text-mute-light">{g.group}</dt>
                    <dd className="mt-2 text-lg">{g.items.join(' · ')}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          {cs.workflow && (
            <Block n={num()} title={cs.workflow.title} id="workflow">
              {cs.workflow.intro && <p className="mb-8 text-lg leading-relaxed text-ink/85">{cs.workflow.intro}</p>}
              <ol className="grid border-t border-l border-ink/15 sm:grid-cols-2 xl:grid-cols-3">
                {cs.workflow.steps.map((s, i) => (
                  <li key={s.title} className="relative border-r border-b border-ink/15 p-6 pt-5">
                    <span className="font-mono text-xs text-signal-deep">
                      {String(i + 1).padStart(2, '0')}
                      {i < cs.workflow!.steps.length - 1 && <span aria-hidden> →</span>}
                    </span>
                    <h3 className="font-display mt-3 text-2xl">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/80">{s.body}</p>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {cs.challenges && cs.challenges.length > 0 && (
            <Block n={num()} title="Challenges & solutions" id="challenges">
              <div className="grid gap-10">
                {cs.challenges.map((c) => (
                  <div key={c.challenge} className="grid gap-3 border-l-2 border-signal pl-6">
                    <h3 className="text-xl leading-snug font-medium">{c.challenge}</h3>
                    <p className="text-lg leading-relaxed text-ink/80">{c.solution}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {cs.outcomes && cs.outcomes.length > 0 && (
            <Block n={num()} title="Outcomes" id="outcomes">
              <Bullets items={cs.outcomes} />
            </Block>
          )}
        </div>

        {cs.gallery && cs.gallery.length > 0 && (
          <section aria-labelledby="gallery" className="bg-bone-2 py-20 md:py-28">
            <div className="container-x">
              <h2 id="gallery" className="font-display text-[clamp(2rem,3.6vw,3.25rem)]">
                Selected screens
              </h2>
              <div className="mt-10 grid items-start gap-6 md:grid-cols-12">
                {cs.gallery.map((img, i) => {
                  const portrait = img.height > img.width
                  return (
                    <figure
                      key={img.src}
                      className={portrait ? 'md:col-span-4 md:col-start-auto' : i === 0 ? 'md:col-span-12' : 'md:col-span-8'}
                      data-reveal
                    >
                      <div className="overflow-hidden border border-ink/10 bg-white">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          sizes={portrait ? '(min-width: 768px) 33vw, 100vw' : i === 0 ? '100vw' : '(min-width: 768px) 66vw, 100vw'}
                          className="h-auto w-full"
                        />
                      </div>
                      <figcaption className="mt-3 text-sm text-mute-light">{img.alt}</figcaption>
                    </figure>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Next / previous */}
      <nav aria-label="More projects" className="bg-ink text-bone">
        <div className="container-x grid md:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-3 border-b border-bone/15 py-12 md:border-r md:border-b-0 md:py-16 md:pr-10">
            <span className="eyebrow flex items-center gap-2 text-mute-dark">
              <ArrowLeft aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-1" /> Previous
            </span>
            <span className="font-display text-[clamp(2.4rem,5vw,4.5rem)] transition-colors group-hover:text-signal">{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group flex flex-col items-end gap-3 py-12 text-right md:py-16 md:pl-10">
            <span className="eyebrow flex items-center gap-2 text-mute-dark">
              Next project <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="font-display text-[clamp(2.4rem,5vw,4.5rem)] transition-colors group-hover:text-signal">{next.title}</span>
          </Link>
        </div>
      </nav>
    </article>
  )
}
