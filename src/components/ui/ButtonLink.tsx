import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'

type Variant = 'solid' | 'outline' | 'signal' | 'ghost'
type Icon = 'right' | 'down' | 'external' | 'none'

const variants: Record<Variant, string> = {
  solid: 'bg-bone text-ink hover:bg-signal',
  signal: 'bg-signal text-ink hover:bg-bone',
  outline: 'border border-current/35 hover:border-current hover:bg-current/[0.06]',
  ghost: 'px-0! min-h-0! link-draw',
}

const icons = { right: ArrowRight, down: ArrowDown, external: ArrowUpRight }

type Props = {
  href: string
  children: React.ReactNode
  variant?: Variant
  icon?: Icon
  className?: string
  download?: string | boolean
  /** Adds target=_blank + rel for off-site links. */
  external?: boolean
  'aria-label'?: string
}

/** Square, typographic CTA. Renders next/link for internal routes, <a> otherwise. */
export function ButtonLink({ href, children, variant = 'solid', icon = 'right', className = '', download, external, ...rest }: Props) {
  const Icon = icon === 'none' ? null : icons[icon]
  const cls = `group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.95rem] font-medium tracking-tight transition-colors duration-300 ${variants[variant]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden
          className={`size-4 shrink-0 transition-transform duration-300 ease-out-expo ${
            icon === 'down' ? 'group-hover:translate-y-0.5' : icon === 'external' ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5' : 'group-hover:translate-x-1'
          }`}
        />
      )}
    </>
  )

  const isInternal = href.startsWith('/') && !download && !href.endsWith('.pdf')
  if (isInternal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className={cls}
      download={download}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  )
}
