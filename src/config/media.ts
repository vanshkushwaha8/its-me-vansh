/**
 * Central media registry. Swap any file or URL here and every component picks it up.
 *
 * PLACEHOLDER STRATEGY
 * - `placeholder: true` marks an asset that should be replaced with final material.
 * - Hero/ambient video: an original loop rendered from scripts/ambient-loop.html
 *   (see scripts/render-hero-loop.mjs). The brief's suggested Google sample
 *   (gtv-videos-bucket/ForBiggerEscapes.mp4) now returns 403 AccessDenied, so it is kept
 *   below only as a reference and is NOT used.
 * - Project screenshots are real captures of the live products. Projects without public
 *   visuals (client work under NDA, unreleased products) use a typographic cover instead
 *   of fabricated screenshots.
 */

export type VideoSource = { src: string; type: 'video/webm' | 'video/mp4' }

export type VideoAsset = {
  sources: VideoSource[]
  poster: string
  /** Short description for assistive tech; ambient videos are decorative and hidden. */
  label: string
  placeholder?: boolean
}

export type ImageAsset = {
  src: string
  alt: string
  width: number
  height: number
  placeholder?: boolean
}

/** Kept for reference: no longer publicly readable (HTTP 403 as of Oct 2026). */
export const GOOGLE_SAMPLE_VIDEO = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'

export const media = {
  hero: {
    sources: [{ src: '/media/hero-loop.webm', type: 'video/webm' }],
    poster: '/media/hero-poster.jpg',
    label: 'Slow streaks of light moving across a dark field',
    placeholder: true,
  } satisfies VideoAsset,

  /** Below-the-fold band in the "Approach" section. Lazy-loaded. */
  approach: {
    sources: [{ src: '/media/hero-loop.webm', type: 'video/webm' }],
    poster: '/media/hero-poster.jpg',
    label: 'Slow streaks of light moving across a dark field',
    placeholder: true,
  } satisfies VideoAsset,

  projects: {
    jobnirdesh: {
      home: {
        src: '/projects/jobnirdesh/home-desktop.png',
        alt: 'JobNirdesh home page showing a featured recruitment notification, exam alerts ticker and popular exam categories',
        width: 2400,
        height: 1500,
      },
      jobs: {
        src: '/projects/jobnirdesh/government-jobs.png',
        alt: 'JobNirdesh government jobs listing with a featured job carousel, search and category filters',
        width: 2400,
        height: 1500,
      },
      tools: {
        src: '/projects/jobnirdesh/pdf-image-tools.png',
        alt: 'JobNirdesh PDF and image tools page explaining that files are processed in the browser and never uploaded',
        width: 2400,
        height: 1500,
      },
      mobile: {
        src: '/projects/jobnirdesh/home-mobile.png',
        alt: 'JobNirdesh home page on a mobile phone',
        width: 780,
        height: 1688,
      },
    },
    buildMaterial: {
      brand: {
        src: '/projects/building-material-marketplace/brand-cover.png',
        alt: 'Build Material brand mark with the line “Buy New. Buy Surplus. Buy Nearby.”',
        width: 1200,
        height: 630,
        placeholder: true,
      },
    },
  },
} as const satisfies {
  hero: VideoAsset
  approach: VideoAsset
  projects: Record<string, Record<string, ImageAsset>>
}
