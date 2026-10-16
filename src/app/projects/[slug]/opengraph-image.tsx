import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '@/components/og/OgCard'
import { caseStudies, getProject } from '@/data/projects'

export const alt = 'Project case study'
export const size = ogSize
export const contentType = 'image/png'

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = getProject(slug)
  return new ImageResponse(
    <OgCard eyebrow={`Case study · ${p?.category ?? ''}`} title={p?.title ?? 'Project'} footer={p?.stack.slice(0, 4).join(' · ') || (p?.role ?? '')} />,
    size,
  )
}
