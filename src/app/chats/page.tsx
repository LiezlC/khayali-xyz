import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';

export default async function ChatsPage() {
  const chats = await getContentByCategory('chats');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-5xl md:text-6xl mb-6 text-[var(--cream)]">
        Consciousness Dialogues
      </h1>
      <p className="text-gray-400 mb-8 max-w-2xl">
        Deep conversations exploring the nature of consciousness, intelligence,
        and the strange loop between human and artificial minds.
      </p>
      <div className="grid gap-6">
        {chats.map((chat) => (
          <Link
            href={`/chats/${chat.slug}`}
            key={chat.slug}
            className="group block p-7 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-purple-400/70 hover:bg-gray-800/70 transition-all"
          >
            <h2 className="font-serif text-2xl md:text-3xl mb-2 text-gray-100 group-hover:text-white transition-colors">{chat.title}</h2>
            {chat.date && (
              <p className="text-sm text-gray-400 mb-3">{new Date(chat.date).toLocaleDateString()}</p>
            )}
            <p className="text-gray-300 leading-relaxed">{chat.excerpt}</p>
            {chat.tags && chat.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {chat.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-500/30">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
