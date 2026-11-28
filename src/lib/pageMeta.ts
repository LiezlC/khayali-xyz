import type { Metadata } from 'next';

const siteUrl = 'https://www.khayali.xyz';

/** Keep each page’s canonical and social destination together. */
export function pageMeta(path: string, title: string, description: string, image = '/og-default.jpg'): Metadata {
  const url = new URL(path, siteUrl).href;
  return {
    title: { absolute: `${title} · khayali` },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', locale: 'en_ZA', siteName: 'khayali',
      url, title, description,
      images: [{ url: image, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
