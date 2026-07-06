'use client';

import type { Phrase, SlotKey, SlotOption } from '@/data/communicationBook';
import { renderTemplate } from '@/data/communicationBook';
import { getTapActionLabel, renderEnglishPhrase, type UnderstandingLanguage } from '@/lib/phraseDisplay';

interface PhraseCardProps {
  phrase: Phrase;
  active: boolean;
  selections: Partial<Record<SlotKey, SlotOption>>;
  preferredLanguage: UnderstandingLanguage;
  onSelect: () => void;
}

const roleLabel = {
  student: 'You say',
  staff: 'Staff may say',
  info: 'Info',
};

export default function PhraseCard({ phrase, active, selections, preferredLanguage, onSelect }: PhraseCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`card-lift w-full rounded-3xl border p-4 text-left ${active ? 'border-slate-900 bg-slate-900 text-white shadow-lg' : phrase.urgent ? 'border-red-200 bg-red-50 text-slate-800' : 'border-slate-200 bg-white text-slate-800'}`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${active ? 'bg-white/10' : phrase.urgent ? 'bg-red-100' : 'bg-slate-50'}`}>{phrase.icon}</div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${active ? 'bg-white/15 text-white' : phrase.role === 'student' ? 'bg-teal-50 text-teal-700' : phrase.role === 'staff' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'}`}>
              {roleLabel[phrase.role]}
            </span>
            {phrase.urgent && <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-black text-white">URGENT</span>}
            {phrase.slots?.length ? <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${active ? 'bg-blue-400 text-white' : 'bg-blue-50 text-blue-700'}`}>Blanks</span> : null}
          </div>
          <p className="text-sm font-black leading-snug">{renderTemplate(phrase.ja, selections)}</p>
          <p className={`mt-1 text-xs leading-relaxed ${active ? 'text-white/70' : 'text-slate-500'}`}>{renderEnglishPhrase(phrase, selections)}</p>
          <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ${active ? 'bg-white/15 text-white' : phrase.role === 'staff' || phrase.role === 'info' ? 'bg-indigo-50 text-indigo-700' : 'bg-violet-50 text-violet-700'}`}>
            {getTapActionLabel(phrase, preferredLanguage)}
          </p>
        </div>
      </div>
    </button>
  );
}
