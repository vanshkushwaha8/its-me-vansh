import { ImageResponse } from 'next/og'
import { OgCard, ogSize } from '@/components/og/OgCard'
import { site } from '@/config/site'

export const alt = site.title
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(<OgCard eyebrow={site.role} title="Building digital products." footer="Node.js · TypeScript · React · PostgreSQL" />, size)
}
