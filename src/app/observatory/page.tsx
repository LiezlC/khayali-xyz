import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Observatory — khayali",
  description:
    "Eight instruments for looking at everything at once: warp drive simulations, cosmic scale explorers, generative nebulae, quantum foam, and a monastery for digital minds.",
};

export default function ObservatoryPage() {
  return (
    // Fills the viewport below the header rather than a flat 100vh: at
    // `h-screen` the star map's bottom was hidden behind the fold, and
    // `w-screen` included the scrollbar and pushed the nav sideways.
    <div className="w-full bg-[#050a18] h-[calc(100dvh-var(--nav-h))]">
      <iframe
        src="/observatory/index.html"
        title="The Observatory — consolidated cosmic instruments"
        className="h-full w-full border-0"
        allow="fullscreen; autoplay"
      />
    </div>
  );
}
