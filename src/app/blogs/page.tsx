// src/app/blogs/page.tsx
export default function BlogsPage() {
  const blogs = [
    {
      title: "Asimov's Emergence Vision",
      file: "asimov-emergence-vision.html",
      description: "Exploring emergence and artificial consciousness through Asimov's lens"
    },
    {
      title: "BossBot: The Future of Management",
      file: "Blogs BossBot.html",
      description: "AI-powered management systems and the transformation of workplace leadership"
    },
    {
      title: "Cyborgs and Androids",
      file: "Blogs Cyborgs and Androids.html",
      description: "The blurring boundaries between human and machine consciousness"
    },
    {
      title: "Human-Centric AI Future",
      file: "Blogs Human-Centric AI Future.html",
      description: "Designing artificial intelligence that serves human flourishing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-amber-900 to-yellow-900">
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <a
          href="/"
          className="text-sm text-gray-300 hover:text-white underline"
        >
          ← Back to Portfolio
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="relative container mx-auto max-w-6xl text-center">
          <div className="text-8xl mb-6">📝</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-rose-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Blogs & Essays
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explorations of AI consciousness, human-machine collaboration, and the future
            of intelligence. Interactive essays on emergence, augmentation, and transformation.
          </p>
        </div>
      </section>

      {/* Blogs Grid */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog, idx) => (
            <a
              key={idx}
              href={`/${blog.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-amber-500 transition-all duration-300 float-animation overflow-hidden"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-3 text-amber-300 group-hover:text-amber-200 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                  {blog.description}
                </p>
                <div className="mt-4 text-amber-400 font-semibold group-hover:text-amber-300">
                  Read Essay →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
