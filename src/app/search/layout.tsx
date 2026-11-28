import { pageMeta } from '@/lib/pageMeta';

export const metadata = pageMeta("/search", "Search Khayali", "Search Khayali’s writing and creative experiments.");

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
