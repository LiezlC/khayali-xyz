import { pageMeta } from '@/lib/pageMeta';

export const metadata = pageMeta("/playspace/night-garden", "The Night Garden", "Enter an interactive garden in Khayali’s Playspace.");

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
