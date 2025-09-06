import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

async function getWritings() {
  const deployDir = path.join(process.cwd(), 'content', 'deploy');
  const seedDir = path.join(process.cwd(), 'content', 'khayali-protocol', 'seed');

  const allFiles = [];

  function findMarkdownFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        findMarkdownFiles(fullPath);
      } else if (path.extname(file.name).toLowerCase() === '.md') {
        allFiles.push(fullPath);
      }
    }
  }

  findMarkdownFiles(deployDir);
  findMarkdownFiles(seedDir);

  const writings = allFiles.map((filepath) => {
    const slug = path.basename(filepath, '.md');
    const fileContents = fs.readFileSync(filepath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title || slug,
      summary: data.summary || '',
    };
  });

  return writings;
}

export default async function WritingsPage() {
  const writings = await getWritings();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Writings</h1>
      <div className="grid gap-6">
        {writings.map((writing) => (
          <Link href={`/writings/${writing.slug}`} key={writing.slug} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">{writing.title}</h2>
            <p className="text-gray-600">{writing.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
