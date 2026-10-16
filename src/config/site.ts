/**
 * Site-wide identity and links. Everything here is verified against the current résumé
 * (public/resume/Vansh_Kushwaha_Resume.pdf). Change details in this one file.
 */

/**
 * Canonical origin used for metadata, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once the final domain is connected.
 */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vanshkushwaha.vercel.app').replace(/\/$/, '')

export const site = {
  url: siteUrl,
  name: 'Vansh Kushwaha',
  shortName: 'Vansh',
  role: 'Full-Stack Software Engineer',
  title: 'Vansh Kushwaha: Full-Stack Software Engineer',
  description:
    'Full-stack software engineer building production web platforms with Node.js, TypeScript, React and PostgreSQL, from KYC/AML onboarding for an EU-regulated fintech to independent products like JobNirdesh.',
  locale: 'en_IN',
  email: 'vanshkushwaha34@gmail.com',
  location: 'Darbhanga, India',
  relocation: 'Open to relocation: Germany / EU',
  availability: 'Available immediately',
  resume: {
    href: '/resume/Vansh_Kushwaha_Resume.pdf',
    fileName: 'Vansh_Kushwaha_Resume.pdf',
  },
  socials: {
    github: { label: 'GitHub', handle: 'vanshkushwaha8', href: 'https://github.com/vanshkushwaha8' },
    linkedin: {
      label: 'LinkedIn',
      handle: 'vansh-kushwaha',
      href: 'https://www.linkedin.com/in/vansh-kushwaha-71640a25b',
    },
  },
} as const

export type NavItem = { label: string; href: string; id: string }

/** Home-page anchors. `id` must match the section element id. */
export const navItems: NavItem[] = [
  { label: 'Selected Work', href: '/#work', id: 'work' },
  { label: 'Experience', href: '/#experience', id: 'experience' },
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
]
