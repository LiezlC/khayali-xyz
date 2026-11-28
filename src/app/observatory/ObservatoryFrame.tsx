'use client';

import { useEffect, useState } from 'react';

// The dome lives in a static iframe. Pass the page's #hash through so a link
// like /observatory#three-body opens that instrument directly. Named routes
// supply their instrument on the server; the dome reads hashes after mount.
export default function ObservatoryFrame({ instrument }: { instrument?: string }) {
  const [src, setSrc] = useState<string | null>(instrument ? `/observatory/index.html#${instrument}` : null);
  useEffect(() => {
    const sync = () => setSrc('/observatory/index.html' + (instrument ? `#${instrument}` : window.location.hash));
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [instrument]);
  if (!src) return null;
  return (
    <iframe
      key={src}
      src={src}
      title="The Observatory — consolidated cosmic instruments"
      className="h-full w-full border-0"
      allow="fullscreen; autoplay"
    />
  );
}
