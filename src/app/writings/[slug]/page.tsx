import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

function findFileBySlug(slug) {
  const directories = [
    path.join(process.cwd(), 'content', 'deploy'),
    path.join(process.cwd(), 'content', 'khayali-protocol', 'seed'),
  ];

  for (const dir of directories) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        const found = findFileRecursive(fullPath, slug);
        if (found) return found;
      } else if (path.basename(file.name, '.md') === slug) {
        return fullPath;
      }
    }
  }
  return null;
}

function findFileRecursive(dir, slug) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      const found = findFileRecursive(fullPath, slug);
      if (found) return found;
    } else if (path.basename(file.name, '.md') === slug) {
      return fullPath;
    }
  }
  return null;
}

async function getWriting(slug) {
  const filePath = findFileBySlug(slug);

  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || slug,
    summary: data.summary || '',
    content,
  };
}

export default async function WritingPage({ params }) {
  const writing = await getWriting(params.slug);

  if (!writing) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">Writing not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="prose lg:prose-xl">
        <h1>{writing.title}</h1>
        <p className="lead">{writing.summary}</p>
        <ReactMarkdown>{writing.content}</ReactMarkdown>
      </article>
    </div>
  );
}
