'use client';

import { useEffect, useRef } from 'react';

// The dome lives in a static iframe. Pass the page's #hash through so a link
// like /observatory#three-body opens that instrument directly.
export default function ObservatoryFrame() {
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const sync = () => {
      const frame = ref.current;
      if (!frame) return;
      const target = '/observatory/index.html' + window.location.hash;
      if (window.location.hash && frame.contentWindow) {
        try {
          if (frame.contentWindow.location.hash !== window.location.hash) {
            frame.contentWindow.location.hash = window.location.hash;
          }
          return;
        } catch { /* fall through to a reload */ }
      }
      if (window.location.hash) frame.src = target;
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  return (
    <iframe
      ref={ref}
      src="/observatory/index.html"
      title="The Observatory — consolidated cosmic instruments"
      className="h-full w-full border-0"
      allow="fullscreen; autoplay"
    />
  );
}
