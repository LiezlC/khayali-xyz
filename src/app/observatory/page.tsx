import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Observatory — khayali",
  description:
    "Eight instruments for looking at everything at once: warp drive simulations, cosmic scale explorers, generative nebulae, quantum foam, and a monastery for digital minds.",
};

export default function ObservatoryPage() {
  return (
    <div className="h-screen w-screen bg-[#050a18]">
      <iframe
        src="/observatory/index.html"
        title="The Observatory — consolidated cosmic instruments"
        className="h-full w-full border-0"
        allow="fullscreen; autoplay"
      />
    </div>
  );
}
