'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSenseAdProps = {
  slot: string;
  label?: string;
};

export default function AdSenseAd({
  slot,
  label = 'Advertisement',
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Keep the app running even if ads are blocked.
    }
  }, []);

  return (
    <section
      aria-label={label}
      className="mx-auto my-8 w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm"
    >
      <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>

      <ins
        className="adsbygoogle block min-h-[120px] w-full"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6011878067417552"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </section>
  );
}