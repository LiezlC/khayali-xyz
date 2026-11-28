import { pageMeta } from "@/lib/pageMeta";
import ObservatoryFrame from "./ObservatoryFrame";

export const metadata = pageMeta("/observatory", "The Observatory", "Explore cosmic instruments, including the Three-Body Studio and simulations of warp drives.");

export default function ObservatoryPage() {
  return (
    // Fills the viewport below the header rather than a flat 100vh: at
    // `h-screen` the star map's bottom was hidden behind the fold, and
    // `w-screen` included the scrollbar and pushed the nav sideways.
    <div className="w-full bg-[#050a18] h-[calc(100dvh-var(--nav-h))]">
      <ObservatoryFrame />
    </div>
  );
}
