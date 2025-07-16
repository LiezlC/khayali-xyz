import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ContentItem {
  slug: string
  title: string
  content: string
  excerpt?: string
  date?: string
  category?: string
  frontmatter: { [key: string]: any }
}

export function getContentByCategory(category: string): ContentItem[] {
  const categoryPath = path.join(contentDirectory, category)
  
  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const fileNames = fs.readdirSync(categoryPath)
  const items: ContentItem[] = []

  fileNames.forEach(fileName => {
    if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
      const filePath = path.join(categoryPath, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      items.push({
        slug: fileName.replace(/\.mdx?$/, ''),
        title: data.title || fileName.replace(/\.mdx?$/, '').replace(/-/g, ' '),
        content,
        excerpt: data.excerpt || content.slice(0, 200) + '...',
        date: data.date,
        category: data.category || category,
        frontmatter: data
      })
    }
  })

  return items.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return a.title.localeCompare(b.title)
  })
}

export function getContentItem(category: string, slug: string): ContentItem | null {
  const filePath = path.join(contentDirectory, category, `${slug}.md`)
  const mdxPath = path.join(contentDirectory, category, `${slug}.mdx`)
  
  let targetPath = filePath
  if (!fs.existsSync(filePath) && fs.existsSync(mdxPath)) {
    targetPath = mdxPath
  }
  
  if (!fs.existsSync(targetPath)) {
    return null
  }

  const fileContents = fs.readFileSync(targetPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    title: data.title || slug.replace(/-/g, ' '),
    content,
    excerpt: data.excerpt || content.slice(0, 200) + '...',
    date: data.date,
    category: data.category || category,
    frontmatter: data
  }
}

export function getAllCategories(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  return fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

export function getContentStructure() {
  const categories = getAllCategories()
  const structure: { [key: string]: ContentItem[] } = {}

  categories.forEach(category => {
    structure[category] = getContentByCategory(category)
  })

  return structure
}