'use client'

import { useState } from 'react'
import type { PhraseCard } from '@/lib/partnerOrgDemo'

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ja-JP'
  utterance.rate = 0.85
  window.speechSynthesis.speak(utterance)
}

export default function TapSpeakClient({ phrases }: { phrases: PhraseCard[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {phrases.map((phrase, index) => {
        const active = activeIndex === index
        return (
          <article key={phrase.ja} className={`rounded-3xl border bg-white p-5 shadow-sm ${active ? 'border-teal-500 ring-4 ring-teal-100' : 'border-slate-200'}`}>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">{phrase.category}</p>
            <button
              type="button"
              className="mt-4 w-full rounded-2xl bg-teal-700 px-5 py-4 text-left text-lg font-black leading-8 text-white hover:bg-teal-800"
              onClick={() => {
                setActiveIndex(index)
                speak(phrase.ja)
              }}
            >
              {phrase.ja}
            </button>
            <p className="mt-3 text-sm leading-6 text-slate-600">{phrase.en}</p>
            {phrase.reading && <p className="mt-2 text-xs leading-5 text-slate-500">{phrase.reading}</p>}
          </article>
        )
      })}
    </div>
  )
}
