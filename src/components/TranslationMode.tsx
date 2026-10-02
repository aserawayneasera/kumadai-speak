'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Phrase } from '@/data/communicationBook';
import { LANGUAGE_OPTIONS, type UnderstandingLanguage } from '@/lib/phraseDisplay';
import { speakText, type SpeechSettings } from '@/lib/speech';
import {
  MAX_TRANSLATION_LENGTH, TRANSLATION_PROVIDER_LABELS, findExactTranslation, getTranslationReferences, isTranslationProvider, searchTranslationReferences,
  type TranslationLanguage, type TranslationProvider, type TranslationReference, type TranslationResult, type TranslationServiceConfig, type TranslationTurn,
} from '@/lib/translation';
import { getTranslationCopy, NATIVE_LANGUAGE_NAMES, NATIVE_TALK_LABELS, type TranslationCopy } from '@/lib/translationCopy';
import { useVoiceInput, type VoiceInputEngine } from '@/lib/useVoiceInput';

function errorMessage(code: string, copy: TranslationCopy) {
  const errors: Record<string, string> = {
    not_configured: copy.offline, no_voice: copy.noVoice, denied: copy.denied,
    provider_unavailable: copy.providerUnavailable,
    no_speech: copy.noSpeech, timeout: copy.timeout, rate_limit: copy.rateLimit,
    too_long: copy.tooLong, speech_failed: copy.speechFailed,
    transcription_failed: copy.speechFailed, invalid_recording: copy.speechFailed,
    no_output_voice: copy.noOutputVoice, copy_failed: copy.copyFailed, same_language: copy.sameLanguage,
  };
  return errors[code] ?? copy.failed;
}

export default function TranslationMode({ active, preferredLanguage, onLanguageChange, settings, customPhrases, onOpenPhrase, onBack }: {
  active: boolean;
  preferredLanguage: UnderstandingLanguage;
  onLanguageChange: (language: UnderstandingLanguage) => void;
  settings: SpeechSettings;
  customPhrases: Phrase[];
  onOpenPhrase: (id: string) => void;
  onBack: () => void;
}) {
  const copy = getTranslationCopy(preferredLanguage);
  const [left, setLeft] = useState<TranslationLanguage>(preferredLanguage === 'ja' ? 'en' : preferredLanguage);
  const [right, setRight] = useState<TranslationLanguage>('ja');
  const [draftFrom, setDraftFrom] = useState<TranslationLanguage>(left);
  const [draft, setDraft] = useState('');
  const [mode, setMode] = useState<'talk' | 'type'>('talk');
  const [engine, setEngine] = useState<VoiceInputEngine>('browser');
  const [autoRead, setAutoRead] = useState(true);
  const [review, setReview] = useState(false);
  const [turns, setTurns] = useState<TranslationTurn[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [show, setShow] = useState<TranslationTurn | null>(null);
  const [online, setOnline] = useState(true);
  const [service, setService] = useState<TranslationServiceConfig | null>(null);
  const [provider, setProvider] = useState<TranslationProvider>('openai');
  const providerPreference = useRef<TranslationProvider | null>(null);
  const locked = useRef(false);
  const requestId = useRef(0);
  const request = useRef<AbortController | null>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);
  const references = useMemo(() => getTranslationReferences(customPhrases), [customPhrases]);
  const suggestions = useMemo(() => draft.trim()
    ? searchTranslationReferences(draft, references)
    : ['h1-2', 'h1-3', 'e1-1'].map(id => references.find(reference => reference.id === id)).filter((item): item is TranslationReference => Boolean(item)), [draft, references]);

  const stopTranslation = useCallback(() => {
    requestId.current += 1;
    request.current?.abort();
    request.current = null;
    locked.current = false;
    setBusy(false);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kts-translation-provider');
      if (isTranslationProvider(saved)) { providerPreference.current = saved; setProvider(saved); }
    } catch { /* Translation works when browser storage is unavailable. */ }
  }, []);

  useEffect(() => {
    if (active && !initialized.current) {
      const first = preferredLanguage === 'ja' ? 'en' : preferredLanguage;
      setLeft(first); setRight('ja'); setDraftFrom(first);
      initialized.current = true;
    }
  }, [active, preferredLanguage]);

  useEffect(() => {
    const connection = () => setOnline(navigator.onLine);
    const hide = () => {
      if (document.hidden) { stopTranslation(); window.speechSynthesis?.cancel(); }
    };
    connection();
    window.addEventListener('online', connection);
    window.addEventListener('offline', connection);
    document.addEventListener('visibilitychange', hide);
    return () => {
      stopTranslation();
      window.removeEventListener('online', connection);
      window.removeEventListener('offline', connection);
      document.removeEventListener('visibilitychange', hide);
    };
  }, [stopTranslation]);

  useEffect(() => {
    if (!active) { stopTranslation(); window.speechSynthesis?.cancel(); setShow(null); return; }
    const controller = new AbortController();
    let disposed = false;
    const timeout = setTimeout(() => controller.abort(), 8000);
    fetch('/api/translate', { cache: 'no-store', signal: controller.signal })
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(result => {
        if (disposed) return;
        const providers = { openai: result.providers?.openai === true, claude: result.providers?.claude === true };
        const defaultProvider = isTranslationProvider(result.defaultProvider) ? result.defaultProvider : 'openai';
        setService({ translationEnabled: providers.openai || providers.claude, recordingEnabled: result.recordingEnabled === true, defaultProvider, providers });
        const saved = providerPreference.current;
        setProvider(saved && providers[saved] ? saved : defaultProvider);
      })
      .catch(() => { if (!disposed) setService({ translationEnabled: false, recordingEnabled: false, defaultProvider: 'openai', providers: { openai: false, claude: false } }); })
      .finally(() => clearTimeout(timeout));
    return () => { disposed = true; clearTimeout(timeout); controller.abort(); };
  }, [active, online, stopTranslation]);

  const play = useCallback((turn: TranslationTurn) => {
    const lang = LANGUAGE_OPTIONS.find(option => option.id === turn.to)!.speechLang;
    if (!('speechSynthesis' in window)) { setError('no_output_voice'); return; }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length && !voices.some(voice => voice.lang.toLowerCase().startsWith(turn.to))) {
      setError('no_output_voice'); return;
    }
    if (!speakText(turn.text, settings, lang)) setError('no_output_voice');
  }, [settings]);

  const submit = useCallback(async (value: string, from: TranslationLanguage) => {
    if (!active || locked.current) return;
    const text = value.trim();
    if (!text) return;
    if (text.length > MAX_TRANSLATION_LENGTH) { setError('too_long'); return; }
    const to = from === left ? right : left;
    if (from === to || (from !== left && from !== right)) { setError('same_language'); return; }
    setDraft(text);
    setDraftFrom(from);
    setError('');
    locked.current = true;
    const id = ++requestId.current;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      let result: TranslationResult | undefined = findExactTranslation(text, from, to, references);
      if (!result) {
        if (!online || service?.translationEnabled === false) throw new Error('not_configured');
        if (service && !service.providers[provider]) throw new Error('provider_unavailable');
        setBusy(true);
        const controller = new AbortController();
        request.current = controller;
        timeout = setTimeout(() => controller.abort(), 40_000);
        const response = await fetch('/api/translate', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, from, to, provider }), signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.code || 'translation_failed');
        if (typeof data.text !== 'string' || !data.text.trim() || !['phrasebook', 'online'].includes(data.source)) throw new Error('translation_failed');
        if (data.source === 'online' && data.provider !== provider) throw new Error('translation_failed');
        result = data as TranslationResult;
      }
      if (id !== requestId.current) return;
      const turn: TranslationTurn = {
        ...result, id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}-${id}`,
        original: text, from, to,
      };
      setTurns(current => [...current.slice(-19), turn]);
      setCopied(null);
      if (autoRead) play(turn);
    } catch (failure) {
      if (id === requestId.current) setError(failure instanceof Error
        ? failure.name === 'AbortError' ? 'timeout' : failure.message : 'translation_failed');
    } finally {
      if (timeout) clearTimeout(timeout);
      if (id === requestId.current) {
        locked.current = false;
        request.current = null;
        setBusy(false);
      }
    }
  }, [active, autoRead, left, online, play, provider, references, right, service]);

  const voice = useVoiceInput({
    active, recordingEnabled: service?.recordingEnabled === true && online,
    onDraft: (text, language) => { setDraft(text); setDraftFrom(language); },
    onText: (text, language) => {
      setDraft(text); setDraftFrom(language);
      if (review) { setMode('type'); requestAnimationFrame(() => textarea.current?.focus()); }
      else void submit(text, language);
    },
    onError: setError,
  });

  useEffect(() => {
    if (!voice.browserAvailable && voice.recorderAvailable && service?.recordingEnabled) setEngine('recorder');
  }, [service?.recordingEnabled, voice.browserAvailable, voice.recorderAvailable]);

  const voiceBusy = voice.state !== 'idle';
  const disabled = busy || voiceBusy;
  const voiceReady = engine === 'browser' ? voice.browserAvailable : voice.recorderAvailable && service?.recordingEnabled && online;
  const latest = turns[turns.length - 1];

  async function copyTurn(turn: TranslationTurn) {
    try {
      if (!navigator.clipboard) throw new Error('clipboard_unavailable');
      await navigator.clipboard.writeText(`${turn.original}\n${turn.text}`);
      setCopied(turn.id);
    } catch { setError('copy_failed'); }
  }

  function editTurn(turn: TranslationTurn) {
    setLeft(turn.from); setRight(turn.to); setDraftFrom(turn.from); setDraft(turn.original);
    setMode('type'); setError('');
    requestAnimationFrame(() => { textarea.current?.focus(); textarea.current?.scrollIntoView({ block: 'center' }); });
  }

  function newConversation() {
    voice.cancel(); stopTranslation(); window.speechSynthesis?.cancel();
    setTurns([]); setDraft(''); setError(''); setCopied(null); setShow(null);
  }

  function useReference(reference: TranslationReference) {
    if (reference.template && reference.phraseId) { onOpenPhrase(reference.phraseId); return; }
    const from = reference.texts[draftFrom] ? draftFrom : reference.texts[left] ? left : right;
    const text = reference.texts[from];
    if (text) void submit(text, from);
  }

  return (
    <section hidden={!active} aria-label={copy.title} lang={preferredLanguage}>
      <header className="hk-primary-bg px-5 pb-5 pt-8 text-white">
        <div className="mx-auto flex max-w-md items-start justify-between gap-3">
          <div><p className="text-xs font-bold text-white/75">KumaSpeak</p><h1 className="mt-1 text-2xl font-black">{copy.title}</h1><p className="mt-1 text-sm text-white/85">{copy.subtitle}</p></div>
          <button type="button" onClick={onBack} className="min-h-[44px] rounded-2xl bg-white/15 px-3 py-2 text-xs font-bold">← {copy.back}</button>
        </div>
      </header>
      <main className="mx-auto max-w-md space-y-4 px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex rounded-2xl bg-slate-200/70 p-1" role="group" aria-label={copy.title}>
            {(['talk', 'type'] as const).map(item => <button key={item} type="button" aria-pressed={mode === item} disabled={disabled} onClick={() => setMode(item)} className={`min-h-[44px] rounded-xl px-5 text-sm font-bold disabled:opacity-50 ${mode === item ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600'}`}>{item === 'talk' ? '🎙️' : '⌨️'} {copy[item]}</button>)}
          </div>
          <button type="button" onClick={newConversation} className="min-h-[44px] rounded-xl px-2 text-xs font-bold text-teal-800">{copy.newChat}</button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="mb-4 block text-xs font-bold text-slate-600">{copy.provider}
            <select aria-label={copy.provider} value={provider} disabled={disabled || !service?.translationEnabled} onChange={event => {
              const next = event.target.value;
              if (!isTranslationProvider(next)) return;
              setProvider(next); providerPreference.current = next; setError('');
              try { localStorage.setItem('kts-translation-provider', next); } catch { /* Optional device preference. */ }
            }} className="mt-2 min-h-[44px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-base font-bold text-slate-800 disabled:opacity-60">
              {(['openai', 'claude'] as const).map(item => <option key={item} value={item} disabled={!service?.providers[item]}>{TRANSLATION_PROVIDER_LABELS[item]}{service && !service.providers[item] ? ` (${copy.unavailable})` : ''}</option>)}
            </select>
          </label>
          <div className="grid grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] items-end gap-1">
            <label className="min-w-0 text-xs font-bold text-slate-600">{copy.first}
              <select aria-label={copy.first} value={left} disabled={disabled} onChange={event => {
                const next = event.target.value as TranslationLanguage;
                if (next === right) setRight(left);
                if (draftFrom === left) setDraftFrom(next);
                setLeft(next); setError('');
              }} className="mt-2 min-h-[44px] w-full rounded-xl border border-slate-200 bg-teal-50 px-2 text-base font-bold text-teal-900">
                {LANGUAGE_OPTIONS.map(option => <option key={option.id} value={option.id}>{NATIVE_LANGUAGE_NAMES[option.id]}</option>)}
              </select>
            </label>
            <button type="button" aria-label={copy.swap} disabled={disabled} onClick={() => { setLeft(right); setRight(left); setError(''); }} className="min-h-[44px] rounded-xl text-xl font-bold text-slate-500 disabled:opacity-40">⇄</button>
            <label className="min-w-0 text-xs font-bold text-slate-600">{copy.second}
              <select aria-label={copy.second} value={right} disabled={disabled} onChange={event => {
                const next = event.target.value as TranslationLanguage;
                if (next === left) setLeft(right);
                if (draftFrom === right) setDraftFrom(next);
                setRight(next); setError('');
              }} className="mt-2 min-h-[44px] w-full rounded-xl border border-slate-200 bg-indigo-50 px-2 text-base font-bold text-indigo-900">
                {LANGUAGE_OPTIONS.map(option => <option key={option.id} value={option.id}>{NATIVE_LANGUAGE_NAMES[option.id]}</option>)}
              </select>
            </label>
          </div>

          {mode === 'talk' && (
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {[left, right].map((language, index) => <button key={`${index}-${language}`} type="button" lang={language} aria-label={NATIVE_TALK_LABELS[language]} disabled={disabled || !voiceReady} onClick={() => { setError(''); void voice.start(language, engine); }} className={`flex min-h-[100px] min-w-0 flex-col items-center justify-center gap-2 rounded-2xl px-3 py-4 text-center text-sm font-black text-white shadow-sm disabled:opacity-45 ${index === 0 ? 'bg-teal-700' : 'bg-indigo-700'}`}>
                  <span aria-hidden="true" className="text-3xl">🎙️</span><span className="break-words">{NATIVE_TALK_LABELS[language]}</span>
                </button>)}
              </div>
              {!voiceReady && <p className="mt-3 text-xs leading-relaxed text-slate-600">{copy.noVoice}</p>}
              {voiceBusy && <div className="mt-3 rounded-2xl bg-teal-50 p-3">
                <p role="status" className="text-sm font-bold text-teal-900">{copy[voice.state === 'starting' ? 'starting' : voice.state === 'processing' ? 'processing' : 'listening']} {voice.language ? NATIVE_LANGUAGE_NAMES[voice.language] : ''}</p>
                {draft && <p lang={draftFrom} dir="auto" className="mt-2 break-words text-sm leading-relaxed text-slate-700">{draft}</p>}
                <div className="mt-2 flex gap-2">
                  {voice.state === 'listening' && <button type="button" onClick={voice.finish} className="min-h-[44px] flex-1 rounded-xl bg-teal-700 px-4 text-sm font-bold text-white">■ {copy.finish}</button>}
                  <button type="button" onClick={voice.cancel} className="min-h-[44px] flex-1 rounded-xl border border-teal-200 bg-white px-4 text-sm font-bold text-teal-900">{copy.cancel}</button>
                </div>
              </div>}
              {engine === 'recorder' && <p className="mt-3 text-xs leading-relaxed text-slate-600">{copy.recordingPrivacy}</p>}
            </div>
          )}

          {mode === 'type' && <form className="mt-4" onSubmit={event => { event.preventDefault(); void submit(draft, draftFrom); }}>
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="translation-draft" className="text-sm font-bold text-slate-800">{copy.input}</label>
              <span className="text-xs text-slate-500">{draft.length}/{MAX_TRANSLATION_LENGTH}</span>
            </div>
            <div className="mt-2 flex gap-2" role="group" aria-label={copy.original}>
              {[left, right].map(language => <button key={language} type="button" disabled={disabled} aria-pressed={draftFrom === language} onClick={() => setDraftFrom(language)} className={`min-h-[44px] rounded-xl px-3 text-xs font-bold disabled:opacity-50 ${draftFrom === language ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}>{NATIVE_LANGUAGE_NAMES[language]} → {NATIVE_LANGUAGE_NAMES[language === left ? right : left]}</button>)}
            </div>
            <textarea ref={textarea} id="translation-draft" lang={draftFrom} dir="auto" rows={mode === 'type' ? 4 : 2} value={draft} readOnly={disabled} maxLength={MAX_TRANSLATION_LENGTH} onChange={event => { setDraft(event.target.value); setError(''); }} placeholder={copy.placeholder} className="mt-2 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-3 text-base leading-relaxed outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100" />
            <div className="mt-2 flex gap-2">
              <button type="submit" disabled={disabled || !draft.trim()} className="min-h-[48px] flex-1 rounded-2xl bg-teal-700 px-4 text-sm font-black text-white disabled:opacity-40">{busy ? copy.translating : copy.send}</button>
              <button type="button" disabled={disabled || !draft} onClick={() => { setDraft(''); setError(''); }} className="min-h-[48px] rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-600 disabled:opacity-40">{copy.clear}</button>
            </div>
          </form>}
          {busy && <div className="mt-2 flex items-center justify-between gap-2"><p role="status" className="text-xs text-teal-800">{copy.translating}</p><button type="button" onClick={stopTranslation} className="min-h-[44px] px-3 text-xs font-bold text-slate-600">{copy.cancel}</button></div>}
        </div>

        {error && <p role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">{errorMessage(error, copy)}</p>}
        {latest ? <TranslationCard turn={latest} copy={copy} copied={copied === latest.id} disabled={disabled} onPlay={() => play(latest)} onCopy={() => void copyTurn(latest)} onShow={() => setShow(latest)} onEdit={() => editTurn(latest)} />
          : <div className="rounded-3xl border border-dashed border-teal-200 bg-teal-50/50 p-5 text-center"><p className="text-lg font-black text-teal-900">{copy.emptyTitle}</p><p className="mt-2 text-sm leading-relaxed text-slate-600">{copy.emptyText}</p></div>}
        {turns.length > 1 && <details className="rounded-3xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer py-2 text-sm font-bold text-slate-700">{copy.history} ({turns.length - 1})</summary><div className="mt-3 space-y-3">{turns.slice(0, -1).reverse().map(turn => <TranslationCard key={turn.id} turn={turn} copy={copy} copied={copied === turn.id} disabled={disabled} onPlay={() => play(turn)} onCopy={() => void copyTurn(turn)} onShow={() => setShow(turn)} onEdit={() => editTurn(turn)} />)}</div></details>}

        {Boolean(suggestions.length) && <details className="rounded-3xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer py-2 text-sm font-bold text-slate-700">📖 {copy.suggestions}</summary><p className="mt-2 text-xs text-slate-500">{copy.suggestionHelp}</p><div className="mt-3 space-y-3">{suggestions.map(reference => <div key={reference.id} className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">{reference.icon} {reference.topic}</p><p lang="ja" className="mt-1 break-words text-sm font-bold text-slate-900">{reference.texts.ja?.replace(/{{.+?}}/g, '□')}</p><p lang="en" className="mt-1 text-xs leading-relaxed text-slate-600">{reference.texts.en}</p>
          <div className="mt-2 flex flex-wrap gap-2">{!reference.template && <button type="button" disabled={disabled} onClick={() => useReference(reference)} className="min-h-[44px] rounded-xl bg-teal-50 px-3 text-xs font-bold text-teal-800 disabled:opacity-40">{copy.usePhrase}</button>}{reference.phraseId && <button type="button" disabled={disabled} onClick={() => onOpenPhrase(reference.phraseId!)} className="min-h-[44px] rounded-xl bg-white px-3 text-xs font-bold text-slate-600 disabled:opacity-40">{copy.openCard}</button>}</div>
        </div>)}</div></details>}

        <details className="rounded-3xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer py-2 text-sm font-bold text-slate-700">⚙️ {copy.engine} / {copy.menuLanguage}</summary>
          <div className="mt-3 space-y-4">
            <label className="block text-sm font-bold text-slate-600">{copy.menuLanguage}<select aria-label={copy.menuLanguage} value={preferredLanguage} disabled={disabled} onChange={event => onLanguageChange(event.target.value as UnderstandingLanguage)} className="mt-2 min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3 text-base">{LANGUAGE_OPTIONS.map(option => <option key={option.id} value={option.id}>{NATIVE_LANGUAGE_NAMES[option.id]}</option>)}</select></label>
            <label className="block text-sm font-bold text-slate-600">{copy.engine}<select aria-label={copy.engine} disabled={disabled} value={engine} onChange={event => setEngine(event.target.value as VoiceInputEngine)} className="mt-2 min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-3 text-base"><option value="browser" disabled={!voice.browserAvailable}>{copy.browser}</option><option value="recorder" disabled={!voice.recorderAvailable || !service?.recordingEnabled || !online}>{copy.recorder}</option></select></label>
            <label className="flex min-h-[44px] items-center gap-3 text-sm text-slate-700"><input type="checkbox" checked={autoRead} onChange={event => setAutoRead(event.target.checked)} className="h-5 w-5 accent-teal-700" />{copy.autoRead}</label>
            <label className="flex min-h-[44px] items-center gap-3 text-sm text-slate-700"><input type="checkbox" checked={review} onChange={event => setReview(event.target.checked)} className="h-5 w-5 accent-teal-700" />{copy.review}</label>
          </div>
        </details>
        {(!online || service?.translationEnabled === false) && <p className="rounded-2xl bg-slate-100 p-3 text-xs leading-relaxed text-slate-600">{copy.offline}</p>}
        <p className="px-1 text-xs leading-relaxed text-slate-500">{copy.privacy.replace('{provider}', TRANSLATION_PROVIDER_LABELS[provider])} <a href="/privacy" className="font-bold text-teal-700 underline">{copy.privacyLink}</a></p>
      </main>
      {show && <TranslationShow turn={show} copy={copy} onClose={() => setShow(null)} onPlay={() => play(show)} />}
    </section>
  );
}

function TranslationCard({ turn, copy, copied, disabled, onPlay, onCopy, onShow, onEdit }: {
  turn: TranslationTurn; copy: TranslationCopy; copied: boolean; disabled: boolean;
  onPlay: () => void; onCopy: () => void; onShow: () => void; onEdit: () => void;
}) {
  return <article className="rounded-3xl border border-teal-200 bg-white p-4 shadow-sm" aria-label={copy.result}>
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold"><span className="text-slate-600">{NATIVE_LANGUAGE_NAMES[turn.from]} → {NATIVE_LANGUAGE_NAMES[turn.to]}</span><span className="rounded-full bg-teal-50 px-2 py-1 text-teal-800">{turn.source === 'phrasebook' ? copy.phrasebook : turn.provider ? `${copy.online} · ${TRANSLATION_PROVIDER_LABELS[turn.provider]}` : copy.online}</span></div>
    <p lang={turn.from} dir="auto" className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-500">{turn.original}</p>
    <p lang={turn.to} dir="auto" className="mt-3 whitespace-pre-wrap break-words text-2xl font-bold leading-relaxed text-slate-900" data-translation-text>{turn.text}</p>
    <div className="mt-4 grid grid-cols-4 gap-1">
      {[[copy.read, '🔊', onPlay], [copied ? copy.copied : copy.copy, '📋', onCopy], [copy.show, '↗', onShow], [copy.edit, '✏️', onEdit]].map(([label, icon, action]) => <button key={String(icon)} type="button" disabled={disabled} onClick={action as () => void} className="flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl bg-slate-50 px-1 py-2 text-xs font-bold text-slate-700 disabled:opacity-40"><span aria-hidden="true">{icon as string}</span>{label as string}</button>)}
    </div>
  </article>;
}

function TranslationShow({ turn, copy, onClose, onPlay }: { turn: TranslationTurn; copy: TranslationCopy; onClose: () => void; onPlay: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => { element?.close(); };
  }, []);
  return <dialog ref={dialog} aria-label={copy.show} onCancel={onClose} className="max-h-[90dvh] w-[94vw] max-w-2xl overflow-y-auto rounded-3xl p-6 shadow-2xl backdrop:bg-slate-950/70">
    <div className="flex items-center justify-between gap-2"><p className="text-sm font-bold text-teal-800">{NATIVE_LANGUAGE_NAMES[turn.to]}</p><button autoFocus type="button" onClick={onClose} className="min-h-[44px] rounded-xl bg-slate-100 px-4 text-sm font-bold">{copy.close}</button></div>
    <p lang={turn.to} dir="auto" className="my-8 whitespace-pre-wrap break-words text-3xl font-bold leading-relaxed sm:text-5xl">{turn.text}</p>
    <p lang={turn.from} dir="auto" className="mb-6 whitespace-pre-wrap break-words text-sm text-slate-500">{turn.original}</p>
    <button type="button" onClick={onPlay} className="min-h-[48px] w-full rounded-2xl bg-teal-700 px-4 text-base font-bold text-white">🔊 {copy.read}</button>
  </dialog>;
}
