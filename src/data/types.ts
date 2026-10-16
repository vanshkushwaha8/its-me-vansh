import type { ImageAsset } from '@/config/media'

export type ProjectKind = 'independent' | 'professional'

export type ProjectStatus = 'Live' | 'In development' | 'Delivered' | 'Prototype'

/** How a project is visualised when no (or no public) screenshots exist. */
export type TypographicCover = {
  type: 'typographic'
  /** Large word set in the display face, e.g. "KYC". */
  mark: string
  /** Short lines rendered as a schematic list, drawn only from verified scope. */
  lines: string[]
  tone: 'ink' | 'signal' | 'bone' | 'moss'
}

export type ImageCover = { type: 'image'; image: ImageAsset; fit?: 'cover' | 'contain' }

export type ProjectCover = TypographicCover | ImageCover

export type ProjectLink = { label: string; href: string }

export type CaseStudy = {
  overview: string
  problem: string
  goals: string[]
  contributions: string[]
  stack: { group: string; items: string[] }[]
  workflow?: { title: string; intro?: string; steps: { title: string; body: string }[] }
  gallery?: ImageAsset[]
  challenges?: { challenge: string; solution: string }[]
  /** Verified outcomes only; leave undefined rather than estimate. */
  outcomes?: string[]
  /** Honest note on current state, shown near the top of the page. */
  statusNote?: string
}

export type Project = {
  slug: string
  title: string
  kind: ProjectKind
  category: string
  /** One or two sentences for cards. */
  summary: string
  role: string
  /** Two to four short bullets for cards. */
  highlights: string[]
  stack: string[]
  status: ProjectStatus
  period?: string
  client?: string
  cover: ProjectCover
  links: { live?: ProjectLink; source?: ProjectLink[] }
  /** Visual prominence on the home page. */
  tier: 'lead' | 'feature' | 'grid'
  caseStudy?: CaseStudy
}
