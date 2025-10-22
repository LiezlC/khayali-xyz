// Content management utilities for Khayali.xyz
// Handles dynamic markdown loading and organization

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentItem {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  category?: string;
  tags?: string[];
  content?: string;
  filePath: string;
}

/**
 * Get all content from a specific category directory
 * @param category - The category folder name (e.g., 'avatar', 'protocol', 'writings')
 * @returns Array of content items with metadata
 */
export async function getContentByCategory(category: string): Promise<ContentItem[]> {
  const contentDir = path.join(process.cwd(), 'content', category);

  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found: ${contentDir}`);
    return [];
  }

  const items: ContentItem[] = [];

  function scanDirectory(dir: string, relativePath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        scanDirectory(fullPath, relPath);
      } else if (entry.name.toLowerCase().endsWith('.md') && entry.name !== 'README.md') {
        // Process markdown files (skip READMEs)
        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Generate slug from filename
          const slug = path.basename(entry.name, '.md');

          // Extract excerpt from frontmatter or content
          let excerpt = data.excerpt || data.summary || data.description || '';
          if (!excerpt && content) {
            // Generate excerpt from first paragraph
            const firstParagraph = content.split('\n\n')[0];
            excerpt = firstParagraph.substring(0, 200).trim();
            if (content.length > 200) excerpt += '...';
          }

          items.push({
            slug,
            title: data.title || slug.replace(/-/g, ' '),
            excerpt,
            date: data.date,
            category: data.category || category,
            tags: data.tags || [],
            filePath: fullPath,
          });
        } catch (error) {
          console.error(`Error processing file ${fullPath}:`, error);
        }
      }
    }
  }

  scanDirectory(contentDir);

  // Sort by date (newest first) or title
  items.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return items;
}

/**
 * Get a single content item by category and slug
 */
export async function getContentBySlug(category: string, slug: string): Promise<ContentItem | null> {
  const contentDir = path.join(process.cwd(), 'content', category);

  if (!fs.existsSync(contentDir)) {
    return null;
  }

  // Search for the file recursively
  function findFile(dir: string): string | null {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const found = findFile(fullPath);
        if (found) return found;
      } else if (path.basename(entry.name, '.md') === slug && entry.name.toLowerCase().endsWith('.md')) {
        return fullPath;
      }
    }

    return null;
  }

  const filePath = findFile(contentDir);

  if (!filePath) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    let excerpt = data.excerpt || data.summary || data.description || '';
    if (!excerpt && content) {
      const firstParagraph = content.split('\n\n')[0];
      excerpt = firstParagraph.substring(0, 200).trim();
      if (content.length > 200) excerpt += '...';
    }

    return {
      slug,
      title: data.title || slug.replace(/-/g, ' '),
      excerpt,
      date: data.date,
      category: data.category || category,
      tags: data.tags || [],
      content,
      filePath,
    };
  } catch (error) {
    console.error(`Error reading content file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all available content categories
 */
export async function getContentCategories(): Promise<string[]> {
  const contentDir = path.join(process.cwd(), 'content');

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  const categories = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  return categories;
}

/**
 * Search across all content for a term
 */
export async function searchContent(searchTerm: string, category?: string): Promise<ContentItem[]> {
  const categories = category ? [category] : await getContentCategories();
  const results: ContentItem[] = [];
  const searchLower = searchTerm.toLowerCase();

  for (const cat of categories) {
    const items = await getContentByCategory(cat);
    const matches = items.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.excerpt.toLowerCase().includes(searchLower) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
    results.push(...matches);
  }

  return results;
}
