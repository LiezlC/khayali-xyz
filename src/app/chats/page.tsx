import Link from 'next/link';
import { getContentByCategory } from '@/utils/content';

export default async function ChatsPage() {
  const chats = await getContentByCategory('chats');

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
        Consciousness Dialogues
      </h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Deep conversations exploring the nature of consciousness, intelligence,
        and the strange loop between human and artificial minds.
      </p>
      <div className="grid gap-6">
        {chats.map((chat) => (
          <Link
            href={`/chats/${chat.slug}`}
            key={chat.slug}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{chat.title}</h2>
            {chat.date && (
              <p className="text-sm text-gray-500 mb-2">{new Date(chat.date).toLocaleDateString()}</p>
            )}
            <p className="text-gray-600">{chat.excerpt}</p>
            {chat.tags && chat.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {chat.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
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
