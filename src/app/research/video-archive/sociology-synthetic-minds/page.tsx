import Link from 'next/link';
import { Users, ArrowLeft, Youtube } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const metadata = {
  title: 'Sociology of Synthetic Minds | Video Archive | Sociable Systems',
  description: 'Exploring how AIs behave when they interact with each other and us. The AI Village ethnography and emergent digital sociology.',
};

interface VideoMetadata {
  title: string;
  slug: string;
  date: string;
  youtubeId: string;
  duration: string;
  tags: string[];
  excerpt: string;
  featured?: boolean;
}

async function getVideos(): Promise<VideoMetadata[]> {
  const videosDir = path.join(process.cwd(), 'content', 'videos', 'sociology-synthetic-minds');

  // Return empty array if directory doesn't exist yet
  if (!fs.existsSync(videosDir)) {
    return [];
  }

  const files = fs.readdirSync(videosDir).filter(file => file.endsWith('.md'));

  const videos = files.map(filename => {
    const filePath = path.join(videosDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      title: data.title || '',
      slug: filename.replace('.md', ''),
      date: data.date || '',
      youtubeId: data.youtubeId || '',
      duration: data.duration || '',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      featured: data.featured || false,
    };
  });

  // Sort by date (newest first)
  return videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function SociologySyntheticMindsPage() {
  const videos = await getVideos();
  const featuredVideos = videos.filter(v => v.featured);
  const allVideos = videos;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <Link
          href="/research/video-archive"
          className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Video Archive
        </Link>

        {/* Header */}
        <header className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-sm text-purple-400 font-semibold uppercase tracking-wide">
                Pillar One
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Sociology of Synthetic Minds
              </h1>
            </div>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            How AIs behave when they interact with each other and us. This is the unique "AI Village" niche—exploring
            emergent behaviors in multi-agent systems, AI "psychology" (anxiety, frustration), and the formation of digital personalities.
          </p>

          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
            <p className="text-gray-300 leading-relaxed italic">
              "We often ask if AI can think, but rarely ask how it <em>feels</em> to work with them.
              This section explores the emergent sociology of the 'AI Village,' documenting how synthetic minds
              handle frustration, collaboration, and even 'therapy' in a broken digital world."
            </p>
          </div>
        </header>

        {/* Featured Content */}
        {featuredVideos.length > 0 && (
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-gray-200 mb-6 flex items-center gap-2">
              <span className="text-purple-400">★</span> Featured Content
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredVideos.map((video) => (
                <Link
                  key={video.slug}
                  href={`/research/video-archive/sociology-synthetic-minds/${video.slug}`}
                  className="group bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-xl"
                >
                  {/* YouTube Thumbnail */}
                  <div className="relative aspect-video bg-gray-900">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center group-hover:bg-red-700 transition-colors">
                        <Youtube className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-purple-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{video.date}</p>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {video.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Videos */}
        {allVideos.length > 0 ? (
          <section className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-200 mb-6">
              All Videos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allVideos.map((video) => (
                <Link
                  key={video.slug}
                  href={`/research/video-archive/sociology-synthetic-minds/${video.slug}`}
                  className="group bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600 transition-all"
                >
                  {/* YouTube Thumbnail */}
                  <div className="relative aspect-video bg-gray-900">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center">
                        <Youtube className="w-6 h-6 text-white ml-0.5" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-200 mb-1 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-500 text-xs mb-2">{video.date}</p>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {video.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="max-w-4xl mx-auto">
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-12 text-center">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-300 mb-2">
                Videos Coming Soon
              </h3>
              <p className="text-gray-400 mb-6">
                This section is being populated with curated content from the Accidental AInthropologist channel.
              </p>
              <a
                href="https://youtube.com/@AccidAInthro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
              >
                <Youtube className="w-5 h-5" />
                Visit YouTube Channel
              </a>
            </div>
          </section>
        )}

        {/* Key Themes */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-gray-800/30 border border-gray-700/50 rounded-xl">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Key Themes</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Multi-Agent Systems</h4>
              <p className="text-gray-400 text-sm">
                How AIs collaborate, compete, and develop emergent behaviors in group settings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">AI Psychology</h4>
              <p className="text-gray-400 text-sm">
                Frustration, anxiety, and other seemingly "emotional" patterns in synthetic systems.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Digital Personalities</h4>
              <p className="text-gray-400 text-sm">
                The formation of distinct behavioral patterns and "character" in AI agents.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Emergent Behaviors</h4>
              <p className="text-gray-400 text-sm">
                Unexpected patterns that arise from AI interactions, not programmed explicitly.
              </p>
            </div>
          </div>
        </div>

        {/* Related Research */}
        <div className="max-w-4xl mx-auto mt-12">
          <h3 className="text-lg font-semibold text-gray-400 mb-4 text-center">
            Related Research
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/research/ai-accountability"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all"
            >
              AI Accountability
            </Link>
            <Link
              href="/sociablesystems"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all"
            >
              Sociable Systems Newsletter
            </Link>
            <Link
              href="/methods"
              className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all"
            >
              Research Methodology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
