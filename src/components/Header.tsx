'use client';

export default function Header({ title, subtitle, right }: { title: string; subtitle: string; right?: React.ReactNode }) {
  return (
    <header className="hk-primary-bg relative overflow-hidden px-5 pb-5 pt-10 text-white">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-16 left-12 h-44 w-44 rounded-full bg-cyan-200/20 blur-3xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">Kumamoto University</p>
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
