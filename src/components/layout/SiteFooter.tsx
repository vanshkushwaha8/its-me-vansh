import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { navItems, site } from '@/config/site'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-bone/10 bg-ink text-bone">
      <div className="container-x grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Link href="/" className="font-display text-3xl">
            {site.name}
            <span aria-hidden className="text-signal">.</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute-dark">
            {site.role}. {site.location}. {site.relocation.replace(':', '')}.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-4 text-mute-dark">Index</p>
          <ul className="grid gap-2 text-[0.95rem]">
            {navItems.map((n) => (
              <li key={n.id}>
                <Link href={n.href} className="link-draw py-1">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects" className="link-draw py-1">
                All projects
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-4 text-mute-dark">Elsewhere</p>
          <ul className="grid gap-2 text-[0.95rem]">
            <li>
              <a href={`mailto:${site.email}`} className="link-draw py-1 break-all">
                {site.email}
              </a>
            </li>
            {Object.values(site.socials).map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-1 hover:text-signal">
                  {s.label} <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              </li>
            ))}
            <li>
              <a href={site.resume.href} download={site.resume.fileName} className="link-draw py-1">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-bone/10 py-6 text-xs text-mute-dark sm:flex-row sm:justify-between">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p>Built with Next.js · Designed &amp; developed by {site.shortName}</p>
      </div>
    </footer>
  )
}
