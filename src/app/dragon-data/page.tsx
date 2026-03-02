// src/app/dragon-data/page.tsx
export default function DragonDataPage() {
  const stories = [
    { title: "Genesis: The First Data Dragon", file: "genesis-of-dragons.md", description: "The origin story of how Data Dragons came to be" },
    { title: "The Query Realm: Where Data Dragons Dwell", file: "data-dragons-story.md", description: "Complete taxonomy and world-building" },
    { title: "The Ghost Drake Uprising", file: "ghost-drake-uprising.md", description: "When null values gain sentience" },
    { title: "The Merge Dragon Scene", file: "merge-dragon-scene.md", description: "Identity crisis in joined tables" },
    { title: "Select All Finale", file: "select-all-finale.md", description: "The ultimate query that unites all dragons" },
    { title: "Three Moments", file: "three-moments.md", description: "Pivotal scenes in the Data Dragon saga" },
    { title: "Dragon-Verse Scene", file: "dragon-verse-scene.md", description: "Poetic exploration of the data realm" },
  ];

  const frameworks = [
    { title: "Data Story Framework", file: "data-story-framework.md", description: "The Ledger of Lost Lands narrative structure" },
    { title: "Databases & Dragons Poem", file: "databases_and_dragons_poem.md", description: "Poetic exploration of data ethics" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-emerald-900">
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
        <div className="absolute inset-0 opacity-10 bg-[url('/images/cosmic/grok/00e09f3f-a612-4214-915b-45b23c05c2f9.jpg')] bg-cover bg-center" />

        <div className="relative container mx-auto max-w-6xl text-center">
          <div className="text-8xl mb-6">🐉</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dragon Data Course
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Where Fantasy Meets Data Ethics
          </p>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            An immersive educational experience teaching responsible data management through
            epic narratives, mythical creatures, and interactive games. Learn how Data Dragons
            are born from the gap between human complexity and digital simplification.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 pb-20">

        {/* YouTube Playlist Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-800/50 to-pink-800/50 rounded-2xl p-8 border border-red-500/30">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">📺</span>
              <div>
                <h2 className="text-3xl font-bold text-red-300">Video Series</h2>
                <p className="text-gray-400">Watch the Data Dragons video playlist</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Explore the complete Data Dragons video series on YouTube, featuring tutorials,
              storytelling, and data ethics lessons.
            </p>
            <a
              href="https://youtube.com/playlist?list=PLOobCQw33iKWe-y8o4jrGnPKkv2HubT5u&si=scdR1MTLlOy2x4_l"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 rounded-lg font-semibold transition-colors text-white"
            >
              📺 Watch on YouTube
            </a>
          </div>
        </section>

        {/* Story Chapters */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-emerald-400 flex items-center gap-3">
            <span>📖</span>
            Story Chapters
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-emerald-500 transition-all"
              >
                <h3 className="text-xl font-bold text-emerald-300 mb-2">{story.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{story.description}</p>
                <a
                  href={`/dragon-data/${story.file.replace('.md', '')}`}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold"
                >
                  Read Story →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Frameworks & Theory */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-purple-400 flex items-center gap-3">
            <span>📚</span>
            Frameworks & Theory
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {frameworks.map((fw, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all"
              >
                <h3 className="text-xl font-bold text-purple-300 mb-2">{fw.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{fw.description}</p>
                <a
                  href={`/dragon-data/${fw.file.replace('.md', '')}`}
                  className="text-purple-400 hover:text-purple-300 text-sm font-semibold"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Experiences */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-cyan-400 flex items-center gap-3">
            <span>🎮</span>
            Interactive Experiences
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-300 mb-2">Data Dragon Realms</h3>
              <p className="text-gray-400 text-sm mb-4">Explore the complete dragon data realms</p>
              <a
                href="/dragon-data/data-dragon-realms-complete.html"
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
              >
                Enter Realms →
              </a>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-300 mb-2">Data Dragon Slayer</h3>
              <p className="text-gray-400 text-sm mb-4">Complete data dragon slayer experience</p>
              <a
                href="/dragon-data/data-dragon-slayer-complete.html"
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
              >
                Start Quest →
              </a>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-300 mb-2">Dragon Slayer Quest</h3>
              <p className="text-gray-400 text-sm mb-4">Interactive quest game</p>
              <a
                href="/dragon-data/DataDragonSlayerQuest.html"
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
              >
                Begin Quest →
              </a>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-all">
              <h3 className="text-xl font-bold text-cyan-300 mb-2">Dragon Taming 101</h3>
              <p className="text-gray-400 text-sm mb-4">Learn to tame data dragons</p>
              <a
                href="/dragon-data/DataDragonTaming101.html"
                target="_blank"
                className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
              >
                Start Training →
              </a>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-blue-400 flex items-center gap-3">
            <span>📦</span>
            Resources & Materials
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-bold text-blue-300 mb-2">Visual Course</h3>
              <p className="text-gray-400 text-sm mb-4">Interactive visual presentation</p>
              <a
                href="/dragon-data/dd101.html"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
              >
                View Presentation →
              </a>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-bold text-blue-300 mb-2">PDF Materials</h3>
              <p className="text-gray-400 text-sm mb-4">Course materials — click to view, or right-click to download</p>
              <div className="space-y-2">
                <a
                  href="/dragon-data/pdf/Data Dragon ID Kit"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Data Dragon ID Kit
                </a>
                <a
                  href="/dragon-data/pdf/DragonDataIntro"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Dragon Data Intro
                </a>
                <a
                  href="/dragon-data/pdf/Foundation_DataDecay"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Foundation: Data Decay
                </a>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
              <h3 className="text-xl font-bold text-blue-300 mb-2">Character Stories</h3>
              <p className="text-gray-400 text-sm mb-4">Meet the protagonists</p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/dragon-data/chimwemwe_Batch Compress.pdf"
                  target="_blank"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Chimwemwe
                </a>
                <a
                  href="/dragon-data/noela_Batch Compress.pdf"
                  target="_blank"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Noela
                </a>
                <a
                  href="/dragon-data/2head_Batch Compress.pdf"
                  target="_blank"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Two-Head
                </a>
                <a
                  href="/dragon-data/leo_Batch Compress.pdf"
                  target="_blank"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Leo
                </a>
                <a
                  href="/dragon-data/pixel_Batch Compress.pdf"
                  target="_blank"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Pixel
                </a>
                <a
                  href="/dragon-data/puzzle_Batch Compress.pdf"
                  target="_blank"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Puzzle
                </a>
                <a
                  href="/dragon-data/scribbles_Batch Compress.pdf"
                  target="_blank"
                  className="block text-blue-400 hover:text-blue-300 text-sm"
                >
                  📄 Scribbles
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 border border-gray-600">
          <h2 className="text-3xl font-bold mb-4 text-gray-200">About the Course</h2>
          <div className="text-gray-300 space-y-4">
            <p>
              The Dragon Data Course uses fantasy storytelling to teach critical concepts in data ethics,
              particularly around resettlement projects and development initiatives. Data Dragons represent
              the gap between human complexity and digital simplification—they are born when we try to
              compress infinite human stories into finite database fields.
            </p>
            <p>
              <strong className="text-emerald-400">Core Themes:</strong> Digital dehumanization,
              quantification of loss, systemic inequality, and the responsibility of data stewards to
              honor the humanity behind every data point.
            </p>
            <p>
              <strong className="text-purple-400">Educational Approach:</strong> Through character-driven
              narratives, mythical creatures, interactive games, and practical modules, learners explore
              real-world data challenges in infrastructure projects while maintaining engagement through
              fantasy elements.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
