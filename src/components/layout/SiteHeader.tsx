'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { navItems, site } from '@/config/site'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [spy, setSpy] = useState<string | null>(null)
  const active = pathname === '/' ? spy : pathname.startsWith('/projects') ? 'work' : null
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy on the home page; case-study pages belong to "Selected Work".
  useEffect(() => {
    if (pathname !== '/') return
    const sections = navItems.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => Boolean(el))
    // The active section is the one crossing a line 40% down the viewport; none between sections.
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      const hit = sections.find((s) => {
        const r = s.getBoundingClientRect()
        return r.top <= line && r.bottom > line
      })
      setSpy(hit?.id ?? null)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  // Mobile menu: lock scroll, Escape to close, keep Tab inside the panel.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>('a')].filter(Boolean) as HTMLElement[]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && close(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open, close])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? 'border-b border-bone/10 bg-ink/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href="/" className="group flex items-baseline gap-2 text-bone" aria-label={`${site.name}, home`}>
          <span className="font-display text-[1.35rem] leading-none tracking-wide md:text-2xl">{site.name}</span>
          <span aria-hidden className="size-1.5 bg-signal transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item, i) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`group relative flex items-baseline gap-1.5 py-2 text-[0.92rem] transition-colors duration-300 ${
                      isActive ? 'text-bone' : 'text-bone/65 hover:text-bone'
                    }`}
                  >
                    <span className="font-mono text-[0.62rem] text-bone/40">0{i + 1}</span>
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-signal transition-transform duration-500 ease-out-expo ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.resume.href}
            download={site.resume.fileName}
            className="group hidden min-h-10 items-center gap-2 border border-bone/30 px-4 text-[0.85rem] text-bone transition-colors duration-300 hover:border-bone hover:bg-bone hover:text-ink sm:inline-flex"
          >
            Resume
            <ArrowDown aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-3 px-2 text-[0.85rem] text-bone lg:hidden"
          >
            <span className="eyebrow">{open ? 'Close' : 'Menu'}</span>
            <span aria-hidden className="relative block h-3 w-6">
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ease-out-expo ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-6 bg-current transition-transform duration-500 ease-out-expo ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100svh-4rem)] overflow-y-auto bg-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between gap-12 pt-10 pb-10">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.id} className="border-b border-bone/10">
                <Link
                  href={item.href}
                  onClick={() => close(false)}
                  aria-current={active === item.id ? 'location' : undefined}
                  className="fade-up flex items-baseline justify-between gap-4 py-5 text-bone"
                  style={{ '--d': `${80 + i * 60}ms` } as React.CSSProperties}
                >
                  <span className="font-display text-[clamp(2.6rem,12vw,4.5rem)]">{item.label}</span>
                  <span className={`font-mono text-xs ${active === item.id ? 'text-signal' : 'text-bone/40'}`}>0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid gap-6 text-bone/70">
            <a href={site.resume.href} download={site.resume.fileName} className="inline-flex min-h-12 items-center justify-between border border-bone/30 px-5 text-bone">
              Download Resume <ArrowDown aria-hidden className="size-4" />
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href={`mailto:${site.email}`} className="link-draw py-1">{site.email}</a>
              {Object.values(site.socials).map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 py-1">
                  {s.label} <ArrowUpRight aria-hidden className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
