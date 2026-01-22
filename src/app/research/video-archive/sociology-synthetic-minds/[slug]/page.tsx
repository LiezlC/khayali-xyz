import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Youtube, Calendar, Clock, Tag } from 'lucide-react';

interface VideoPageProps {
  params: {
    slug: string;
  };
}

interface VideoData {
  title: string;
  date: string;
  youtubeId: string;
  duration: string;
  tags: string[];
  excerpt: string;
  content: string;
  relatedEpisodes?: string[];
  relatedResearch?: string[];
}

async function getVideoContent(slug: string): Promise<VideoData | null> {
  const videosDir = path.join(process.cwd(), 'content', 'videos', 'sociology-synthetic-minds');

  if (!fs.existsSync(videosDir)) {
    return null;
  }

  const filePath = path.join(videosDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || '',
      date: data.date || '',
      youtubeId: data.youtubeId || '',
      duration: data.duration || '',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      content,
      relatedEpisodes: data.relatedEpisodes || [],
      relatedResearch: data.relatedResearch || [],
    };
  } catch (error) {
    console.error(`Error reading video file ${filePath}:`, error);
    return null;
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const video = await getVideoContent(params.slug);

  if (!video) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20">
      <article className="container mx-auto px-4 max-w-5xl">
        {/* Back Link */}
        <Link
          href="/research/video-archive/sociology-synthetic-minds"
          className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Sociology of Synthetic Minds
        </Link>

        {/* Video Header */}
        <header className="mb-8">
          <div className="text-sm text-purple-400 font-semibold mb-2 uppercase tracking-wide">
            The Sociology of Synthetic Minds
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {video.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
            {video.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{video.date}</span>
              </div>
            )}
            {video.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{video.duration}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {video.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 text-purple-400 text-sm rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Excerpt */}
          {video.excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed italic border-l-4 border-purple-400 pl-6 py-2">
              {video.excerpt}
            </p>
          )}
        </header>

        {/* YouTube Embed */}
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl mb-12 bg-gray-900">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4 text-gray-200">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-3 mt-8 text-gray-200">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mb-2 mt-6 text-gray-300">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-400 mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-400 mb-4 space-y-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-400 mb-4 space-y-2">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-400">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-purple-400 pl-6 py-2 italic text-gray-300 my-6">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-purple-400 hover:text-purple-300 underline"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {video.content}
          </ReactMarkdown>
        </div>

        {/* Related Content */}
        {((video.relatedEpisodes && video.relatedEpisodes.length > 0) ||
          (video.relatedResearch && video.relatedResearch.length > 0)) && (
          <div className="border-t border-gray-700 pt-8">
            <h2 className="text-2xl font-bold text-gray-200 mb-6">Related Content</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Related Newsletter Episodes */}
              {video.relatedEpisodes && video.relatedEpisodes.length > 0 && (
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
                  <h3 className="font-semibold text-teal-400 mb-3">Newsletter Episodes</h3>
                  <ul className="space-y-2">
                    {video.relatedEpisodes.map((episode: string) => (
                      <li key={episode}>
                        <Link
                          href={`/sociablesystems/${episode}`}
                          className="text-gray-300 hover:text-teal-400 transition-colors"
                        >
                          {episode}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Research */}
              {video.relatedResearch && video.relatedResearch.length > 0 && (
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
                  <h3 className="font-semibold text-teal-400 mb-3">Related Research</h3>
                  <ul className="space-y-2">
                    {video.relatedResearch.map((research: string) => (
                      <li key={research}>
                        <Link
                          href={`/research/${research}`}
                          className="text-gray-300 hover:text-teal-400 transition-colors"
                        >
                          {research}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* YouTube Channel CTA */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 mb-6">
            Watch more from the Accidental AInthropologist
          </p>
          <a
            href="https://youtube.com/@AccidAInthro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
          >
            <Youtube className="w-5 h-5" />
            Subscribe on YouTube
          </a>
        </div>
      </article>
    </div>
  );
}

// This would need to be generated based on your actual video content
export async function generateStaticParams() {
  const videosDir = path.join(process.cwd(), 'content', 'videos', 'sociology-synthetic-minds');

  if (!fs.existsSync(videosDir)) {
    return [];
  }

  const files = fs.readdirSync(videosDir).filter(file => file.endsWith('.md'));

  return files.map(filename => ({
    slug: filename.replace('.md', ''),
  }));
}
