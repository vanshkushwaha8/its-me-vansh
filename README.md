# Vansh Kushwaha: Portfolio

A static portfolio built with Next.js (App Router), TypeScript and Tailwind CSS v4. There is no backend. All content lives in typed local files.

```bash
npm install
npm run dev        # http://localhost:3000
npm run validate   # typecheck + lint + production build
```

## Where to edit things

| What | File |
| --- | --- |
| Name, email, socials, resume path, location, availability, nav | `src/config/site.ts` |
| Hero / ambient video, posters, project screenshots | `src/config/media.ts` |
| Projects and case studies | `src/data/projects.ts` (types in `src/data/types.ts`) |
| Work experience | `src/data/experience.ts` |
| Skills | `src/data/skills.ts` |
| Education, certifications | `src/data/education.ts` |
| Hero, intro, about, approach and contact copy | `src/data/profile.ts` |
| Resume PDF | `public/resume/Vansh_Kushwaha_Resume.pdf` |

### Projects

- `kind` is `independent` or `professional`. It decides which chapter of Selected Work the project appears in.
- `tier` sets prominence: `lead` (one full-width hero project), `feature` (alternating split layout) or `grid` (cards).
- Add a `caseStudy` object to generate `/projects/<slug>`. Pages, sitemap entries and OG images are created automatically. Leave out optional fields (`workflow`, `gallery`, `challenges`, `outcomes`) and their sections disappear.
- Add `links.live` or `links.source` only for public URLs. Missing links are simply not rendered.

### Replacing media

Everything marked `placeholder: true` in `src/config/media.ts` should be replaced.

- **Hero video.** Drop an MP4 (H.264) and/or WebM into `public/media/` and list them in `media.hero.sources`. Put MP4 first for widest Safari support. Use a 1920×1080 file under ~4 MB, plus a matching `poster` JPG. External URLs work too.
  - The current loop is original. It is rendered from `scripts/ambient-loop.html` by `scripts/render-hero-loop.mjs`.
  - The suggested Google sample (`gtv-videos-bucket/.../ForBiggerEscapes.mp4`) now returns **403 AccessDenied**, so it is not used.
- **Project screenshots.** Add images under `public/projects/<slug>/` and register them in `media.projects`. Then point a project's `cover` at them with `{ type: 'image', image: media.projects.x.y }`. Projects without public visuals use `{ type: 'typographic', … }` covers instead of fake screenshots.
- JobNirdesh images are real captures of the live site (Oct 2026). The Build Material cover is the product's own OG image.

## Deploying (Vercel)

1. Push to GitHub and import the repo in Vercel. No build settings need changing.
2. Set `NEXT_PUBLIC_SITE_URL` to the final domain, e.g. `https://vanshkushwaha.dev`. Canonical URLs, Open Graph, `sitemap.xml` and `robots.txt` use it. Until then it falls back to `https://vanshkushwaha.vercel.app`.

## Design system

- **Colour.** Ink `#0a0a0b`, bone `#f2efe9` and a single signal orange `#ff4d1c`. `signal-deep` is used for small text on light backgrounds so it meets contrast requirements.
- **Type.** Anton for display (uppercase, set with fluid `clamp()` sizes), Inter Tight for text, JetBrains Mono for labels.
- **Shape.** Square edges everywhere. Pill shapes only for small tags.
- **Motion.** CSS-only reveals driven by one shared IntersectionObserver (`RevealObserver`). Under `prefers-reduced-motion`, every animation and the videos are switched off. Content stays visible if JavaScript fails.
