import HouseArrow from '@/components/HouseArrow'
import Link from 'next/link'
import { getContentByCategory } from '@/utils/content'
import { DepthScene } from '@/components/Immersion'

export default async function WritingsPage() {
  const writings = await getContentByCategory('writings')
  const featured = writings.find(writing => writing.slug === 'Whether It Still Sings') || writings[0]
  const rest = writings.filter(writing => writing.slug !== featured?.slug)
  return <div className="house-library">
    <DepthScene className="library-opening">
      <img src="/images/imaginarium/library.webp" alt="An open illustrated book beneath a brass lamp in a midnight library" className="library-art" fetchPriority="high" />
      <div className="library-heading"><h1>Writings &amp;<br/>Creative Works</h1><p>Collaborative explorations at the intersection of human and artificial intelligence.</p></div>
      {featured && <Link href={`/writings/${encodeURIComponent(featured.slug)}`} className="library-feature"><h2>{featured.title}</h2><p>{featured.excerpt}</p><span>Read the story <HouseArrow /></span></Link>}
    </DepthScene>
    <div className="library-index">{rest.map((writing, index) => <Link href={`/writings/${encodeURIComponent(writing.slug)}`} key={writing.slug} className="library-entry"><span className="library-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><div><h2>{writing.title}</h2><p>{writing.excerpt}</p><span className="library-read">Read <HouseArrow /></span></div></Link>)}</div>
  </div>
}
