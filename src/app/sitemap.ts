import type { MetadataRoute } from 'next'
import { site } from '@/config/site'
import { caseStudies } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...caseStudies.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
