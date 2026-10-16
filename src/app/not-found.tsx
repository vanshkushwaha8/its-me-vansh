import { ButtonLink } from '@/components/ui/ButtonLink'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-end bg-ink pt-32 pb-16 text-bone">
      <div className="container-x">
        <p className="eyebrow text-mute-dark">Error 404</p>
        <h1 className="font-display mt-6 text-[length:var(--text-hero)]">
          Page not found<span className="text-signal">.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-bone/75">That page doesn’t exist or has moved. The work is still here.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/projects" variant="outline" className="text-bone">
            All projects
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
