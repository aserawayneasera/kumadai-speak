'use client';

import type { Category } from '@/data/communicationBook';

export default function CategoryCard({ category, onClick }: { category: Category; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="card-lift overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm">
      <div className={`bg-gradient-to-r ${category.color} p-4 text-white`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <p className="text-base font-black">{category.label}</p>
            <p className="text-xs text-white/70">{category.short}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs leading-relaxed text-slate-600">{category.desc}</p>
        <p className="mt-3 text-xs font-black text-blue-700">Open phrases →</p>
      </div>
    </button>
  );
}
