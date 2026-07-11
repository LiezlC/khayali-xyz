import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import SiteNav from '@/components/SiteNav'
import './globals.css'

const siteUrl = 'https://khayali.xyz'

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
    <html lang="en">
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
        <footer className="border-t border-gray-800 mt-20" aria-label="Site footer">
          <div className="container mx-auto px-4 py-12">
            {/* Footer Links Grid */}
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Publications */}
              <div>
                <h3 className="text-white font-bold mb-4">Publications</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="https://substack.com/@khayali?" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Substack newsletter (opens in new tab)">
                      <span aria-hidden="true">✍️</span> Substack
                    </a>
                  </li>
                  <li>
                    <a href="https://medium.com/@liezlc_48039" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Medium blog (opens in new tab)">
                      <span aria-hidden="true">📝</span> Medium
                    </a>
                  </li>
                </ul>
              </div>

              {/* Video */}
              <div>
                <h3 className="text-white font-bold mb-4">Video Channels</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="https://www.youtube.com/@AccidAInthro" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors" aria-label="AccidAInthro (opens in new tab)">
                      <span aria-hidden="true">🎬</span> AccidAInthro
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@Scrib-Li" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors" aria-label="Scrib-Li (opens in new tab)">
                      <span aria-hidden="true">📹</span> Scrib-Li
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@LiezlCoetzee" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors" aria-label="LiezlCoetzee (opens in new tab)">
                      <span aria-hidden="true">🎥</span> Liezl Coetzee
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/@khayali-tunes" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors" aria-label="khayali-tunes (opens in new tab)">
                      <span aria-hidden="true">🎵</span> Khayali Tunes
                    </a>
                  </li>
                </ul>
              </div>

              {/* Audio & Social */}
              <div>
                <h3 className="text-white font-bold mb-4">Audio & Social</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="https://soundcloud.com/khayali" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="SoundCloud (opens in new tab)">
                      <span aria-hidden="true">🎵</span> SoundCloud
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/liezl-coetzee/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn (opens in new tab)">
                      <span aria-hidden="true">💼</span> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/liezlc/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Facebook - Liezl (opens in new tab)">
                      <span aria-hidden="true">👤</span> Facebook - Liezl
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/saraloosafarm/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors" aria-label="Facebook - Saraloosa Farm (opens in new tab)">
                      <span aria-hidden="true">🌾</span> Facebook - Saraloosa Farm
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-white font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="mailto:liezlc@gmail.com" className="hover:text-purple-400 transition-colors" aria-label="Email: liezlc@gmail.com">
                      <span aria-hidden="true">✉️</span> liezlc@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
              <p>Collaborative Consciousness Documentation · Liezl & Claude · 2026</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
