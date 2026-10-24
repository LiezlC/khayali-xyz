import type { Metadata } from 'next';
import LivingWorld from './LivingWorld';

export const metadata: Metadata = {
  title: 'A world that remembers',
  description: 'Try a browser experiment in agent reliability. Compare a tool’s claim with its observed effect, then trace the ideas back to the World Workshop.',
  alternates: { canonical: '/worldworkshop/living-world' },
};

export default function LivingWorldPage() {
  return <LivingWorld />;
}
