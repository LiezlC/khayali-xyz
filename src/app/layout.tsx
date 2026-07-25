import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import SiteNav from '@/components/SiteNav'
import './globals.css'

// The house typefaces. Until these were loaded, every `font-serif` on the site
// resolved to whatever the visitor's OS happened to offer — Cambria on Windows,
// New York on a Mac, DejaVu on Linux — so the Atlas and the Playspace looked
// like a different site on every machine. Now they don't.
const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const body = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const siteUrl = 'https://www.khayali.xyz'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'khayali · a carbon-and-silicon imaginarium',
    template: '%s · khayali',
  },
  description: 'The arty side of the multivariate. Khayali Tunes (AI music arcs), collaborative writing, consciousness dialogues, 100+ interactive applets, and the Observatory — by Liezl Coetzee.',
  keywords: ['AI music', 'Khayali Tunes', 'interactive applets', 'consciousness', 'generative art', 'Liezl Coetzee', 'AI collaboration', 'playspace'],
  authors: [{ name: 'Liezl Coetzee', url: siteUrl }],
  creator: 'Liezl Coetzee',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: siteUrl,
    siteName: 'khayali',
    title: 'khayali · a carbon-and-silicon imaginarium',
    description: 'AI music arcs, 100+ interactive applets, consciousness dialogues, and generative art experiments by Liezl Coetzee.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'khayali — a carbon-and-silicon imaginarium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'khayali · a carbon-and-silicon imaginarium',
    description: 'AI music arcs, 100+ interactive applets, consciousness dialogues, and generative art experiments by Liezl Coetzee.',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Liezl Coetzee',
  url: siteUrl,
  sameAs: [
    'https://www.youtube.com/@khayali-tunes',
    'https://soundcloud.com/khayali',
    'https://www.linkedin.com/in/liezl-coetzee/',
    'https://substack.com/@khayali',
  ],
  knowsAbout: ['AI music', 'generative art', 'AI governance', 'consciousness exploration'],
  worksFor: {
    '@type': 'Organization',
    name: 'khayali',
    url: siteUrl,
    description: 'A carbon-and-silicon imaginarium: AI music, interactive experiments, and consciousness exploration.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gray-900 text-white">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded focus:font-semibold"
        >
          Skip to main content
        </a>
        <SiteNav />
        <main id="main-content">{children}</main>
        <Analytics />
        <footer className="border-t border-gray-800 mt-24" aria-label="Site footer">
          <div className="container py-16">
            {/* The music comes first here too — the old footer led with four
                YouTube channels and two Facebook pages, which is a lot of exits
                for a house trying to hold your attention on the tunes. */}
            <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-12 mb-12">
              <div>
                <p className="font-serif text-3xl lowercase text-[var(--cream-bright)] mb-3">khayali</p>
                <p className="text-gray-400 leading-relaxed max-w-sm">
                  Where carbon meets silicon and the two of them start making things up.
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.22em] text-amber-300 mb-5">Listen</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>
                    <a href="https://www.youtube.com/@khayali-tunes" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition-colors" aria-label="Khayali Tunes on YouTube (opens in new tab)">
                      Khayali Tunes on YouTube
                    </a>
                  </li>
                  <li>
                    <a href="https://open.spotify.com/artist/23Sf7aUE9vWsiznIxOKpee" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition-colors" aria-label="Spotify (opens in new tab)">
                      Spotify
                    </a>
                  </li>
                  <li>
                    <a href="https://soundcloud.com/khayali" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors" aria-label="SoundCloud (opens in new tab)">
                      SoundCloud
                    </a>
                  </li>
                  <li>
                    <a href="https://ko-fi.com/khayali" target="_blank" rel="noopener noreferrer" className="text-pink-300 hover:text-pink-200 transition-colors" aria-label="Support Khayali on Ko-fi (opens in new tab)">
                      Support on Ko-fi
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.22em] text-amber-300 mb-5">Elsewhere</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>
                    <a href="https://substack.com/@khayali?" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors" aria-label="Substack (opens in new tab)">
                      Substack
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/liezl-coetzee/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors" aria-label="LinkedIn (opens in new tab)">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://sociable.systems" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors" aria-label="Sociable Systems (opens in new tab)">
                      Sociable Systems ↗
                    </a>
                  </li>
                  <li>
                    <a href="mailto:liezlc@gmail.com" className="hover:text-white transition-colors" aria-label="Email: liezlc@gmail.com">
                      liezlc@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-gray-400 text-sm pt-8 border-t border-gray-800">
              <p>Made by Liezl Coetzee, with the machines · {new Date().getFullYear()}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
