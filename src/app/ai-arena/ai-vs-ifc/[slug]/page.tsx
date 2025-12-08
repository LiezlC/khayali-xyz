import { promises as fs } from 'fs';
import path from 'path';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all markdown files
export async function generateStaticParams() {
  const aiVsIfcPath = path.join(process.cwd(), 'public', 'ai-vs-ifc');

  try {
    const files = await fs.readdir(aiVsIfcPath);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    return mdFiles.map(file => ({
      slug: file.replace('.md', ''),
    }));
  } catch (error) {
    return [];
  }
}

export default async function AIvsIFCArticlePage({ params }: PageProps) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'public', 'ai-vs-ifc', `${slug}.md`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');

    // Extract title from first heading or use slug
    const titleMatch = fileContent.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return <MarkdownRenderer content={fileContent} title={title} />;
  } catch (error) {
    notFound();
  }
}
