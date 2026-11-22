'use client';

import { useEffect, useState } from 'react';

// The dome lives in a static iframe. Pass the page's #hash through so a link
// like /observatory#three-body opens that instrument directly. The src is set
// only after mount, so the hash is known before the frame starts loading.
export default function ObservatoryFrame() {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => setSrc('/observatory/index.html' + window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
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
