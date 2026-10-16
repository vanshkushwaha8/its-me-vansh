import Image from 'next/image'
import Link from 'next/link'
import { ProjectCover } from './ProjectCover'
import { ProjectLinks } from './ProjectLinks'
import { StatusBadge, TagList } from '@/components/ui/Tag'
import type { ImageAsset } from '@/config/media'
import type { Project } from '@/data/types'

type Tone = 'light' | 'dark'
const mute = (t: Tone) => (t === 'light' ? 'text-mute-light' : 'text-mute-dark')
const rule = (t: Tone) => (t === 'light' ? 'border-ink/15' : 'border-bone/15')
const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties

function Meta({ project, index, tone }: { project: Project; index: string; tone: Tone }) {
  return (
    <div className={`eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 ${mute(tone)}`}>
      <span className={tone === 'light' ? 'text-signal-deep' : 'text-signal'}>{index}</span>
      <span>{project.category}</span>
      <StatusBadge status={project.status} />
    </div>
  )
}

function TitleLink({ project, className }: { project: Project; className: string }) {
  return project.caseStudy ? (
    <Link href={`/projects/${project.slug}`} className={`transition-colors duration-300 hover:text-signal ${className}`}>
      {project.title}
    </Link>
  ) : (
    <span className={className}>{project.title}</span>
  )
}

/** Strongest project: oversized title, edge-to-edge visual, optional floating mobile capture. */
export function LeadProject({ project, index, mobile }: { project: Project; index: string; mobile?: ImageAsset }) {
  return (
    <article className="group" aria-labelledby={`p-${project.slug}`}>
      <div className="container-x">
        <div data-reveal>
          <Meta project={project} index={index} tone="light" />
        </div>
        <h3 id={`p-${project.slug}`} className="font-display mt-5 text-[length:var(--text-mega)] text-ink" data-reveal style={delay(80)}>
          <TitleLink project={project} className="" />
        </h3>
      </div>

      <div className="relative mt-6 md:mt-10" data-reveal style={delay(160)}>
        <div className="container-x">
          <ProjectCover cover={project.cover} title={project.title} className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/8]" sizes="(min-width: 1792px) 1680px, 100vw" />
        </div>
        {mobile && (
          <div className="absolute right-[6%] -bottom-12 hidden w-[15%] min-w-40 max-w-64 overflow-hidden border-[6px] border-ink bg-ink shadow-2xl shadow-ink/30 md:block lg:-bottom-16">
            <Image src={mobile.src} alt={mobile.alt} width={mobile.width} height={mobile.height} sizes="256px" className="h-auto w-full" />
          </div>
        )}
      </div>

      <div className="container-x mt-10 grid gap-10 md:mt-20 md:grid-cols-12">
        <p className="text-xl leading-relaxed text-ink md:col-span-5" data-reveal>
          {project.summary}
        </p>
        <div className="md:col-span-4" data-reveal style={delay(80)}>
          <p className="eyebrow mb-3 text-mute-light">Role · {project.role}</p>
          <ul className="grid gap-3 text-[0.95rem] leading-snug text-ink/80">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-2 size-1 shrink-0 bg-signal" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid content-start gap-6 md:col-span-3" data-reveal style={delay(160)}>
          <TagList items={project.stack} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}

/** Alternating image / text split. */
export function FeatureProject({ project, index, reverse, tone = 'light' }: { project: Project; index: string; reverse?: boolean; tone?: Tone }) {
  const text = tone === 'light' ? 'text-ink' : 'text-bone'
  return (
    <article className={`group grid items-center gap-8 md:grid-cols-12 md:gap-12 ${text}`} aria-labelledby={`p-${project.slug}`}>
      <div className={`md:col-span-7 ${reverse ? 'md:order-2' : ''}`} data-reveal>
        <ProjectCover cover={project.cover} title={project.title} className="aspect-[4/3] md:aspect-[5/4] lg:aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" />
      </div>
      <div className={`md:col-span-5 ${reverse ? 'md:order-1' : ''}`} data-reveal style={delay(120)}>
        <Meta project={project} index={index} tone={tone} />
        <h3 id={`p-${project.slug}`} className="font-display mt-5 text-[length:var(--text-title)]">
          <TitleLink project={project} className="" />
        </h3>
        {project.client && <p className={`mt-3 text-sm ${mute(tone)}`}>{project.client}</p>}
        <p className={`mt-5 text-lg leading-relaxed ${tone === 'light' ? 'text-ink/85' : 'text-bone/85'}`}>{project.summary}</p>
        <ul className={`mt-6 grid gap-2.5 border-t pt-5 text-[0.95rem] leading-snug ${rule(tone)} ${tone === 'light' ? 'text-ink/75' : 'text-bone/75'}`}>
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden className="mt-2 size-1 shrink-0 bg-signal" />
              {h}
            </li>
          ))}
        </ul>
        <p className={`eyebrow mt-6 ${mute(tone)}`}>Role · {project.role}</p>
        <div className="mt-4">
          <TagList items={project.stack} tone={tone} />
        </div>
        <div className="mt-5">
          <ProjectLinks project={project} tone={tone} />
        </div>
      </div>
    </article>
  )
}

/** Compact card for the responsive grid. */
export function ProjectCard({ project, index, tone = 'light', i = 0 }: { project: Project; index: string; tone?: Tone; i?: number }) {
  const text = tone === 'light' ? 'text-ink' : 'text-bone'
  return (
    <article className={`group flex flex-col ${text}`} aria-labelledby={`p-${project.slug}`} data-reveal style={delay(i * 90)}>
      <ProjectCover cover={project.cover} title={project.title} className="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <div className={`mt-5 flex flex-1 flex-col border-t pt-5 ${rule(tone)}`}>
        <Meta project={project} index={index} tone={tone} />
        <h3 id={`p-${project.slug}`} className="font-display mt-4 text-[clamp(1.9rem,3.2vw,2.75rem)]">
          <TitleLink project={project} className="" />
        </h3>
        {project.client && <p className={`mt-2 text-sm ${mute(tone)}`}>{project.client}</p>}
        <p className={`mt-3 flex-1 leading-relaxed ${tone === 'light' ? 'text-ink/80' : 'text-bone/80'}`}>{project.summary}</p>
        <p className={`eyebrow mt-5 ${mute(tone)}`}>Role · {project.role}</p>
        {project.stack.length > 0 && (
          <div className="mt-4">
            <TagList items={project.stack} tone={tone} />
          </div>
        )}
        <div className="mt-4">
          <ProjectLinks project={project} tone={tone} />
        </div>
      </div>
    </article>
  )
}
