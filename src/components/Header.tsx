'use client';
import Image from 'next/image';
import { AppearanceControl } from './Appearance';

export default function Header({ title, subtitle, right, language = 'en' }: { title: string; subtitle: string; right?: React.ReactNode; language?: string }) {
  return (
    <header className="hk-home-gradient kuma-speak-header relative overflow-hidden px-5 pb-5 pt-4 text-white">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-16 left-12 h-44 w-44 rounded-full bg-cyan-200/20 blur-3xl" />
      <div className="relative mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image src="/favicon-96x96.png" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-2xl" />
          <p className="text-xs font-bold tracking-wide text-white/80">Kumamoto</p>
        </div>
        <AppearanceControl language={language} />
      </div>
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="mt-1 text-2xl font-black leading-tight">{title}</h1>
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-white/75">{subtitle}</p>
        </div>
        {right}
      </div>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6011878067417552"
        crossOrigin="anonymous"
      />
    </header>
  );
}
