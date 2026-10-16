import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/types'

type Props = { project: Project; tone?: 'light' | 'dark'; showCaseStudy?: boolean }

/** Case study / live / source links. Only renders links that exist. */
export function ProjectLinks({ project, tone = 'light', showCaseStudy = true }: Props) {
  const strong = tone === 'light' ? 'text-ink' : 'text-bone'
  const soft = tone === 'light' ? 'text-mute-light hover:text-ink' : 'text-mute-dark hover:text-bone'
  const hasCase = showCaseStudy && Boolean(project.caseStudy)
  if (!hasCase && !project.links.live && !project.links.source?.length) return null

  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem]">
      {hasCase && (
        <li>
          <Link href={`/projects/${project.slug}`} className={`group inline-flex min-h-11 items-center gap-2 font-medium ${strong}`}>
            <span className="link-draw">View Case Study</span>
            <span className="sr-only">: {project.title}</span>
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </li>
      )}
      {project.links.live && (
        <li>
          <a href={project.links.live.href} target="_blank" rel="noopener noreferrer" className={`group inline-flex min-h-11 items-center gap-1.5 transition-colors ${soft}`}>
            Live Project<span className="sr-only">: {project.links.live.label} (opens in a new tab)</span>
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </li>
      )}
      {project.links.source?.map((s) => (
        <li key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" className={`group inline-flex min-h-11 items-center gap-1.5 transition-colors ${soft}`}>
            {s.label}
            <span className="sr-only"> on GitHub (opens in a new tab)</span>
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </li>
      ))}
    </ul>
  )
}
