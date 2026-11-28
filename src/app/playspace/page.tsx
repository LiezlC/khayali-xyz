import { pageMeta } from '@/lib/pageMeta';

export const metadata = pageMeta("/playspace", "The Playspace", "Explore Khayali’s collection of interactive applets and creative experiments.");

import CuratedPlayspace from '@/components/CuratedPlayspace';

export default function PlayspacePage() {
  return <CuratedPlayspace />;
}
