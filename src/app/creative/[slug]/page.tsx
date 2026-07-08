import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import { getContentBySlug } from '@/utils/content'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug)
  const item = await getContentBySlug('writings', slug)
  return {
    title: item?.title || 'Creative Work',
    description: item?.excerpt || undefined
  }
}

export default async function CreativeItemPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug)
  const item = await getContentBySlug('writings', slug)

  if (!item) {
    return <div className="p-8 text-center text-gray-400">Content not found.</div>
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      {item.date && <p className="text-sm text-gray-400 mb-6">{new Date(item.date).toLocaleDateString()}</p>}
      <article className="prose max-w-none">
        <ReactMarkdown>{item.content || ''}</ReactMarkdown>
      </article>
    </main>
  )
}
