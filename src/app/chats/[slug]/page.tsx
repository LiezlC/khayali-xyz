import ReactMarkdown from 'react-markdown';
import { getContentBySlug } from '@/utils/content';
import Link from 'next/link';

async function getChat(slug: string) {
  return await getContentBySlug('chats', slug);
}

export default async function ChatPage({ params }: { params: { slug: string } }) {
  const chat = await getChat(params.slug);

  if (!chat) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold">Conversation not found</h1>
        <Link href="/chats" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to all conversations
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/chats" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to all conversations
      </Link>
      <article className="prose lg:prose-xl max-w-4xl mx-auto">
        <h1 className="bg-gradient-to-r from-blue-600 to-teal-600 text-transparent bg-clip-text">
          {chat.title}
        </h1>
        {chat.date && (
          <p className="text-sm text-gray-500">{new Date(chat.date).toLocaleDateString()}</p>
        )}
        {chat.excerpt && <p className="lead text-xl text-gray-600">{chat.excerpt}</p>}
        {chat.tags && chat.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
            {chat.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-8">
          <ReactMarkdown>{chat.content || ''}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
