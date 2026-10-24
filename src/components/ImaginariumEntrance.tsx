import HouseArrow from '@/components/HouseArrow'
import Link from 'next/link'
import { DepthScene, MotionToggle } from './Immersion'

export default function ImaginariumEntrance() {
  return <section className="entrance" aria-labelledby="entrance-title">
    <DepthScene className="entrance-scene">
      <img className="entrance-forest" src="/images/imaginarium/forest.webp" alt="" fetchPriority="high" />
      <div className="entrance-shade" />
      <img className="entrance-dj" src="/images/imaginarium/dj-foreground.webp" alt="A blue-faced DJ in a golden hood at her mixing desk, among woodland lights" fetchPriority="high" />
      <div className="entrance-copy">
        <h1 id="entrance-title">khayali</h1>
        <p className="entrance-line">Where carbon meets silicon and the two of them start making things up.</p>
        <p className="entrance-note">The arty end of the multivariate.</p>
        <div className="entrance-actions"><Link className="house-button" href="/music">Listen to Khayali Tunes</Link><Link className="house-button house-button-outline" href="/wander">Open the Atlas <HouseArrow /></Link></div>
      </div>
      <div className="entrance-foot"><a href="#tunes">Khayali Tunes <HouseArrow down /></a><MotionToggle /></div>
    </DepthScene>
  </section>
}
