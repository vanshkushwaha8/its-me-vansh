import { FeatureProject, LeadProject, ProjectCard } from '@/components/projects/ProjectShowcase'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { media } from '@/config/media'
import { independentProjects, professionalProjects } from '@/data/projects'
import type { Project } from '@/data/types'

const byTier = (list: Project[], tier: Project['tier']) => list.filter((p) => p.tier === tier)

function ChapterHeading({ n, title, note, tone }: { n: string; title: string; note: string; tone: 'light' | 'dark' }) {
  const mute = tone === 'light' ? 'text-mute-light' : 'text-mute-dark'
  const line = tone === 'light' ? 'border-ink' : 'border-bone/40'
  return (
    <div className={`flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-baseline sm:justify-between ${line}`} data-reveal>
      <h3 className="eyebrow text-[0.8rem]!">
        <span className={tone === 'light' ? 'text-signal-deep' : 'text-signal'}>Chapter {n}</span> — {title}
      </h3>
      <p className={`max-w-md text-sm ${mute}`}>{note}</p>
    </div>
  )
}

export function SelectedWork() {
  const ind = independentProjects
  const pro = professionalProjects
  const [lead] = byTier(ind, 'lead')
  const indFeatures = byTier(ind, 'feature')
  const indGrid = byTier(ind, 'grid')
  const proFeatures = byTier(pro, 'feature')
  const proGrid = byTier(pro, 'grid')
  let n = 0
  const idx = () => `/${String(++n).padStart(2, '0')}`

  return (
    <section id="work" aria-labelledby="work-title">
      {/* Independent products */}
      <div className="bg-bone pt-24 pb-24 text-ink md:pt-32 md:pb-36">
        <div className="container-x">
          <SectionHeader
            id="work-title"
            index="03"
            label="Portfolio"
            title={
              <>
                Selected <br className="hidden sm:block" />
                work<span className="text-signal">.</span>
              </>
            }
            intro="A selection of products, platforms and engineering challenges I’ve worked on, from products I run myself to client platforms in regulated industries."
          />
          <div className="mt-20 md:mt-28">
            <ChapterHeading n="A" title="Independent products" note="Products I design, build and run myself." tone="light" />
          </div>
        </div>

        <div className="mt-12 md:mt-16">{lead && <LeadProject project={lead} index={idx()} mobile={media.projects.jobnirdesh.mobile} />}</div>

        <div className="container-x mt-28 grid gap-24 md:mt-40 md:gap-32">
          {indFeatures.map((p, i) => (
            <FeatureProject key={p.slug} project={p} index={idx()} reverse={i % 2 === 1} />
          ))}
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {indGrid.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={idx()} i={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Professional work */}
      <div className="bg-ink py-24 text-bone md:py-36">
        <div className="container-x">
          <ChapterHeading
            n="B"
            title="Professional work · Brain Technosys"
            note="Client platforms I worked on as a Software Developer. Out of respect for client confidentiality, there’s no source code, internal URLs or screenshots here, only my own contributions."
            tone="dark"
          />
          <div className="mt-16 grid gap-24 md:mt-20 md:gap-32">
            {proFeatures.map((p, i) => (
              <FeatureProject key={p.slug} project={p} index={idx()} reverse={i % 2 === 1} tone="dark" />
            ))}
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
              {proGrid.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={idx()} tone="dark" i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
