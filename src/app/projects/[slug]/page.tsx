import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudy } from '@/components/projects/CaseStudy'
import { caseStudies } from '@/data/projects'

type Params = { slug: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return caseStudies.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project = caseStudies.find((p) => p.slug === slug)
  if (!project) return {}
  const title = `${project.title}: ${project.category}`
  const url = `/projects/${project.slug}`
  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description: project.summary,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const i = caseStudies.findIndex((p) => p.slug === slug)
  if (i === -1) notFound()
  const project = caseStudies[i]
  const next = caseStudies[(i + 1) % caseStudies.length]
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length]
  return <CaseStudy project={project} next={next} prev={prev} />
}
