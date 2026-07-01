'use client';

import type { Phrase, SlotKey, SlotOption } from '@/data/communicationBook';
import { getPhraseDisplayText, getPhraseSubText, getPreviewLabels, type UnderstandingLanguage } from '@/lib/phraseDisplay';

interface PhonePreviewProps {
  phrase?: Phrase;
  selections: Partial<Record<SlotKey, SlotOption>>;
  preferredLanguage: UnderstandingLanguage;
  onReplay: () => void;
  onCopy: () => void;
  copied: boolean;
  speaking: boolean;
  noiseMode: boolean;
  favorite: boolean;
  onToggleFavorite: () => void;
  onFullscreen: () => void;
}

export default function PhonePreview({ phrase, selections, preferredLanguage, onReplay, onCopy, copied, speaking, noiseMode, favorite, onToggleFavorite, onFullscreen }: PhonePreviewProps) {
  const displayText = getPhraseDisplayText(phrase, selections, preferredLanguage);
  const helperText = getPhraseSubText(phrase, selections, preferredLanguage);
  const labels = getPreviewLabels(phrase, preferredLanguage);
  const sizeClass = noiseMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl';

  return (
    <div className="phone-shell shadow-phone relative overflow-hidden p-4">
      <div className="absolute left-1/2 top-2 h-1.5 w-20 -translate-x-1/2 rounded-full bg-slate-900/80" />
      <div className="rounded-[1.8rem] bg-white p-4 pt-7 shadow-inner">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">{labels.eyebrow}</p>
            <p className="text-xs font-bold text-teal-700">{labels.title}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={onToggleFavorite} className={`flex h-9 w-9 items-center justify-center rounded-full text-lg ${favorite ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`} aria-label="Save phrase">
              {favorite ? '★' : '☆'}
            </button>
            <button type="button" onClick={onFullscreen} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600" aria-label="Fullscreen show mode">
              ⛶
            </button>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-xl">
              {speaking && <span className="absolute inset-0 rounded-full bg-violet-400 animate-pulse-ring" />}
              <span className="relative">🔊</span>
            </div>
          </div>
        </div>

        <button type="button" onClick={onFullscreen} className={`w-full min-h-[142px] rounded-3xl bg-gradient-to-br ${noiseMode ? 'from-black to-slate-950' : 'from-slate-950 to-slate-800'} p-4 text-left text-white shadow-inner`}>
          <p className="text-[11px] font-black uppercase tracking-wide text-white/45">{labels.screenLabel}</p>
          <p className={`mt-3 break-words font-black leading-snug ${sizeClass}`}>{displayText}</p>
          {speaking && (
            <div className="mt-4 flex h-8 items-end gap-1.5">
              {[1, 2, 3, 4, 5].map(n => <span key={n} className="sound-bar w-1.5 rounded-full bg-teal-300" />)}
            </div>
          )}
        </button>

        <p className={`mt-3 leading-relaxed text-slate-600 ${noiseMode ? 'text-sm font-bold' : 'text-xs'}`}>{helperText}</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" onClick={onReplay} className="rounded-2xl bg-slate-900 px-3 py-3 text-xs font-black text-white shadow-sm">
            🔊 Replay
          </button>
          <button type="button" onClick={onCopy} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-xs font-black text-slate-700 shadow-sm">
            {copied ? '✅ Copied' : '📋 Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
