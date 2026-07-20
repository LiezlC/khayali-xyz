import { MetadataRoute } from 'next';
import { getContentByCategory, getContentCategories } from '@/utils/content';

const BASE_URL = 'https://www.khayali.xyz';

// Static routes with their priorities and change frequencies
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/music`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/playspace`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/observatory`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/writings`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/chats`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  { url: `${BASE_URL}/labs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/ai-village`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
];

// Categories that have [slug] dynamic routes wired to content.ts
const DYNAMIC_CATEGORIES: { category: string; basePath: string; priority: number }[] = [
  { category: 'writings', basePath: '/writings', priority: 0.7 },
  { category: 'chats', basePath: '/chats', priority: 0.6 },
  { category: 'ai-village', basePath: '/ai-village', priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicEntries: MetadataRoute.Sitemap = [];

  for (const { category, basePath, priority } of DYNAMIC_CATEGORIES) {
    try {
      const items = await getContentByCategory(category);
      for (const item of items) {
        dynamicEntries.push({
          url: `${BASE_URL}${basePath}/${item.slug}`,
          lastModified: item.date ? new Date(item.date) : new Date(),
          changeFrequency: 'monthly',
          priority,
        });
      }
    } catch {
      // Silently skip categories with no content directory
    }
  }

  return [...STATIC_ROUTES, ...dynamicEntries];
}
