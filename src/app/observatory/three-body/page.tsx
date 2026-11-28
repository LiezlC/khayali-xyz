import { pageMeta } from '@/lib/pageMeta';
import ObservatoryFrame from '../ObservatoryFrame';

export const metadata = pageMeta(
  '/observatory/three-body',
  'Three-Body Studio',
  'Explore three bodies in motion. Change the starting conditions and watch gravity reshape their orbits in Khayali’s Observatory.',
  '/images/og/three-body-studio.webp',
);

export default function ThreeBodyPage() {
  return <div className="w-full bg-[#050a18] h-[calc(100dvh-var(--nav-h))]">
    <ObservatoryFrame instrument="three-body" />
  </div>;
}
