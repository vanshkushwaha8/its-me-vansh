import type { Metadata } from 'next'
import { ProjectCard } from '@/components/projects/ProjectShowcase'
import { independentProjects, professionalProjects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Independent products and professional client platforms built by Vansh Kushwaha: fintech compliance, marketplaces, workforce tools and AI assistants.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  const groups = [
    { id: 'independent', title: 'Independent products', note: 'Products I design, build and run myself.', items: independentProjects },
    { id: 'professional', title: 'Professional work', note: 'Client platforms delivered at Brain Technosys.', items: professionalProjects },
  ]
  let n = 0
  return (
    <>
      <header className="bg-ink pt-32 pb-16 text-bone md:pt-44 md:pb-24">
        <div className="container-x">
          <p className="eyebrow fade-up text-mute-dark">Index — {independentProjects.length + professionalProjects.length} projects</p>
          <h1 className="font-display mt-6 text-[length:var(--text-mega)]">
            <span className="mask-line">
              <span>
                All work<span className="text-signal">.</span>
              </span>
            </span>
          </h1>
        </div>
      </header>
      <div className="bg-bone text-ink">
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={g.id} className="container-x py-16 md:py-24">
            <div className="mb-12 flex flex-col gap-2 border-t border-ink pt-5 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 id={g.id} className="eyebrow text-[0.8rem]!">
                {g.title}
              </h2>
              <p className="text-sm text-mute-light">{g.note}</p>
            </div>
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={`/${String(++n).padStart(2, '0')}`} i={i % 3} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
