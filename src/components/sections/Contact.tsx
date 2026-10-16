import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { site } from '@/config/site'
import { profile } from '@/data/profile'

export function Contact() {
  const { contact } = profile
  const subject = encodeURIComponent('Hello Vansh, let’s talk')
  const links = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}`, external: false },
    { label: 'LinkedIn', value: 'in/vansh-kushwaha', href: site.socials.linkedin.href, external: true },
    { label: 'GitHub', value: `@${site.socials.github.handle}`, href: site.socials.github.href, external: true },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-ink text-bone">
      <div className="container-x py-24 md:py-40">
        <p className="eyebrow mb-8 text-mute-dark" data-reveal>
          (08) — Contact
        </p>
        <h2 id="contact-title" className="font-display text-[length:var(--text-hero)]" data-reveal>
          <span className="block text-bone/55">{contact.lines[0]}</span>
          <span className="block">
            {contact.lines[1].replace(/\.$/, '')}
            <span className="text-signal">.</span>
          </span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal>
            <p className="max-w-xl text-xl leading-relaxed text-bone/80">{contact.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`mailto:${site.email}?subject=${subject}`} variant="signal" icon="external">
                Start a Conversation
              </ButtonLink>
              <ButtonLink href={site.resume.href} download={site.resume.fileName} variant="outline" icon="down" className="text-bone">
                Download Resume
              </ButtonLink>
            </div>
          </div>

          <ul className="border-t border-bone/20 lg:col-span-5 lg:col-start-8" data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
            {links.map((l) => (
              <li key={l.label} className="border-b border-bone/20">
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex min-h-16 items-center justify-between gap-4 py-4 transition-colors duration-300 hover:text-signal"
                >
                  <span className="eyebrow w-20 shrink-0 text-mute-dark group-hover:text-signal">{l.label}</span>
                  <span className="min-w-0 flex-1 text-base break-all sm:text-xl">{l.value}</span>
                  <ArrowUpRight aria-hidden className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
