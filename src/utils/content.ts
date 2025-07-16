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
  try {
    const categoryPath = path.join(contentDirectory, category)
    
    if (!fs.existsSync(categoryPath)) {
      return []
    }

    const fileNames = fs.readdirSync(categoryPath)
    const items: ContentItem[] = []

    fileNames.forEach(fileName => {
      if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
        try {
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
        } catch (error) {
          console.warn(`Error reading file ${fileName}:`, error)
        }
      }
    })

    return items.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return a.title.localeCompare(b.title)
    })
  } catch (error) {
    console.warn(`Error reading category ${category}:`, error)
    return []
  }
}

export function getContentItem(category: string, slug: string): ContentItem | null {
  try {
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
  } catch (error) {
    console.warn(`Error reading content item ${category}/${slug}:`, error)
    return null
  }
}

export function getAllCategories(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return []
    }

    return fs.readdirSync(contentDirectory, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  } catch (error) {
    console.warn('Error reading categories:', error)
    return []
  }
}

export function getContentStructure() {
  try {
    const categories = getAllCategories()
    const structure: { [key: string]: ContentItem[] } = {}

    categories.forEach(category => {
      structure[category] = getContentByCategory(category)
    })

    return structure
  } catch (error) {
    console.warn('Error getting content structure:', error)
    return {}
  }
}