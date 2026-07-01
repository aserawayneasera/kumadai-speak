'use client';

import { slotOptions, type Phrase, type SlotKey, type SlotOption } from '@/data/communicationBook';

interface SlotPickerProps {
  phrase?: Phrase;
  selections: Partial<Record<SlotKey, SlotOption>>;
  onSelect: (key: SlotKey, option: SlotOption) => void;
}

export default function SlotPicker({ phrase, selections, onSelect }: SlotPickerProps) {
  if (!phrase?.slots?.length) return null;

  return (
    <div className="space-y-3 rounded-3xl border border-blue-100 bg-blue-50 p-3">
      <div className="flex items-start gap-2">
        <span className="text-lg">🧩</span>
        <div>
          <p className="text-xs font-black text-blue-900">Smart blank picker</p>
          <p className="text-[11px] leading-relaxed text-blue-700">Choose a suitable word. The Japanese phrase updates immediately.</p>
        </div>
      </div>
      {phrase.slots.map(slot => (
        <div key={slot.key}>
          <p className="mb-1.5 text-[11px] font-black uppercase tracking-wide text-blue-700">{slot.label}</p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {slotOptions[slot.key].map(option => {
              const selected = selections[slot.key]?.ja === option.ja;
              return (
                <button
                  key={`${slot.key}-${option.ja}`}
                  type="button"
                  onClick={() => onSelect(slot.key, option)}
                  className={`flex-shrink-0 rounded-2xl border px-3 py-2 text-left transition ${selected ? 'border-blue-600 bg-blue-600 text-white shadow-md' : 'border-blue-100 bg-white text-slate-700'}`}
                >
                  <span className="block text-sm font-black">{option.ja}</span>
                  <span className={`block text-[10px] ${selected ? 'text-white/80' : 'text-slate-500'}`}>{option.en}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
