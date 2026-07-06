'use client';

import type { MainTab } from './types';

const items: { id: MainTab; icon: string; label: string }[] = [
  { id: 'home', icon: '🧭', label: 'Home' },
  { id: 'speak', icon: '🗣️', label: 'Speak' },
  { id: 'staff', icon: '👂', label: 'Staff' },
  { id: 'saved', icon: '⭐', label: 'Saved' },
  { id: 'more', icon: '🧩', label: 'More' },
];

export default function BottomNav({ active, onChange }: { active: MainTab; onChange: (tab: MainTab) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-safe pt-2 shadow-2xl backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`rounded-2xl px-2 py-2 text-center transition ${active === item.id ? 'hk-primary-bg text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}
            aria-label={item.label}
          >
            <span className="block text-lg leading-none">{item.icon}</span>
            <span className="mt-1 block text-[10px] font-black">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
