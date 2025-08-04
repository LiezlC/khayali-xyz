import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Content item interface
export interface ContentItem {
  slug: string
  title: string
  excerpt?: string
  date?: string
  category?: string
  tags?: string[]
  content: string
  rawContent: string
}

// Get all content files from a category directory
export function getContentByCategory(category: string): ContentItem[] {
  try {
    const contentDir = path.join(process.cwd(), 'content', category)
    
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      console.warn(`Content directory not found: ${contentDir}`)
      return []
    }

    const files = fs.readdirSync(contentDir)
    
    const content = files
      .filter(file => file.endsWith('.md') && !file.startsWith('README'))
      .map(file => {
        const filePath = path.join(contentDir, file)
        const slug = file.replace('.md', '')
        
        try {
          const fileContent = fs.readFileSync(filePath, 'utf8')
          const { data, content: rawContent } = matter(fileContent)
          
          // Extract title from frontmatter or first heading
          let title = data.title || extractTitleFromContent(rawContent) || slug
          
          // Generate excerpt if not provided
          const excerpt = data.excerpt || generateExcerpt(rawContent)
          
          return {
            slug,
            title,
            excerpt,
            date: data.date,
            category: data.category || category,
            tags: data.tags || [],
            content: rawContent,
            rawContent: fileContent
          }
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error)
          return null
        }
      })
      .filter(Boolean) as ContentItem[]
    
    // Sort by date (newest first) or by title
    return content.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return a.title.localeCompare(b.title)
    })
    
  } catch (error) {
    console.error(`Error getting content for category ${category}:`, error)
    return []
  }
}

// Get specific content item by category and slug
export function getContentItem(category: string, slug: string): ContentItem | null {
  try {
    const filePath = path.join(process.cwd(), 'content', category, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      console.warn(`Content file not found: ${filePath}`)
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content: rawContent } = matter(fileContent)
    
    // Extract title from frontmatter or first heading
    let title = data.title || extractTitleFromContent(rawContent) || slug
    
    // Generate excerpt if not provided
    const excerpt = data.excerpt || generateExcerpt(rawContent)
    
    return {
      slug,
      title,
      excerpt,
      date: data.date,
      category: data.category || category,
      tags: data.tags || [],
      content: rawContent,
      rawContent: fileContent
    }
    
  } catch (error) {
    console.error(`Error getting content item ${category}/${slug}:`, error)
    return null
  }
}

// Helper function to extract title from markdown content
function extractTitleFromContent(content: string): string | null {
  const lines = content.split('\n')
  
  // Look for first # heading
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/)
    if (match) {
      return match[1].trim()
    }
  }
  
  return null
}

// Helper function to generate excerpt from content
function generateExcerpt(content: string, length: number = 150): string {
  // Remove markdown syntax and get plain text
  const plainText = content
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()
  
  if (plainText.length <= length) {
    return plainText
  }
  
  // Find last complete sentence within length limit
  const truncated = plainText.substring(0, length)
  const lastSentence = truncated.lastIndexOf('.')
  
  if (lastSentence > length * 0.7) {
    return truncated.substring(0, lastSentence + 1)
  }
  
  // If no good sentence break, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.substring(0, lastSpace) + '...'
}

// Get all available categories
export function getCategories(): string[] {
  try {
    const contentDir = path.join(process.cwd(), 'content')
    
    if (!fs.existsSync(contentDir)) {
      return []
    }
    
    const items = fs.readdirSync(contentDir)
    
    return items.filter(item => {
      const itemPath = path.join(contentDir, item)
      return fs.statSync(itemPath).isDirectory()
    })
    
  } catch (error) {
    console.error('Error getting categories:', error)
    return []
  }
}