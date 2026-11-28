import { pageMeta } from '@/lib/pageMeta';
import LivingWorld from './LivingWorld';

export const metadata = pageMeta("/worldworkshop/living-world", "A world that remembers", "Try a browser experiment in agent reliability. Compare a tool’s claim with its observed effect, then trace the ideas back to the World Workshop.");

export default function LivingWorldPage() {
  return <LivingWorld />;
}
