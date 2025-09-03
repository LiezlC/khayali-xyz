import type { Metadata } from 'next'
import { getContentItem } from '@/utils/content'
import { remark } from 'remark'
import html from 'remark-html'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug)
  const item = getContentItem('writings', slug)
  return {
    title: item?.title || 'Creative Work',
    description: item?.excerpt || undefined
  }
}

export default async function CreativeItemPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug)
  const item = getContentItem('writings', slug)

  if (!item) {
    return <div className="p-8 text-center text-gray-400">Content not found.</div>
  }

  const processed = await remark().use(html).process(item.content)
  const contentHtml = processed.toString()

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      {item.date && <p className="text-sm text-gray-400 mb-6">{new Date(item.date).toLocaleDateString()}</p>}
      <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </main>
  )
}