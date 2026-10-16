import type { Metadata, Viewport } from 'next'
import { Anton, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { RevealObserver } from '@/components/ui/RevealObserver'
import { site } from '@/config/site'
import './globals.css'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton', display: 'swap' })
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ['Full-Stack Software Engineer', 'Node.js', 'TypeScript', 'React', 'Next.js', 'PostgreSQL', 'KYC/AML', 'Backend Developer', 'Vansh Kushwaha'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: '/',
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  colorScheme: 'dark light',
}

/**
 * Runs before paint: marks the document as JS-capable so scroll-reveal styles apply,
 * and un-hides everything after 3s if the observer never boots.
 */
const preflight = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__reveal)document.documentElement.classList.remove('js')},3000)`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: site.url,
    address: { '@type': 'PostalAddress', addressLocality: 'Darbhanga', addressCountry: 'IN' },
    sameAs: [site.socials.github.href, site.socials.linkedin.href],
    alumniOf: 'Centurion University of Technology and Management',
  }

  return (
    <html lang="en" className={`${anton.variable} ${interTight.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preflight }} />
        {/* Without JS the header can't detect scrolling, so keep it solid over light sections. */}
        <noscript>
          <style>{'body>header{background:rgb(10 10 11/.92)}'}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] bg-bone px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
