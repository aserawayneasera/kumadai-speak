'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { LANGUAGE_OPTIONS } from './phraseDisplay';
import { MAX_RECORDING_BYTES, MAX_TRANSLATION_LENGTH, type TranslationLanguage } from './translation';

interface RecognitionResult {
  isFinal: boolean;
  0: { transcript: string };
}
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: { results: ArrayLike<RecognitionResult> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}
type RecognitionConstructor = new () => Recognition;

function recognitionConstructor() {
  const browser = window as unknown as { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor };
  return browser.SpeechRecognition ?? browser.webkitSpeechRecognition;
}

export type VoiceInputState = 'idle' | 'starting' | 'listening' | 'processing';
export type VoiceInputEngine = 'browser' | 'recorder';

export function useVoiceInput({ active, recordingEnabled, onText, onDraft, onError }: {
  active: boolean;
  recordingEnabled: boolean;
  onText: (text: string, language: TranslationLanguage) => void;
  onDraft: (text: string, language: TranslationLanguage) => void;
  onError: (code: string) => void;
}) {
  const [state, setState] = useState<VoiceInputState>('idle');
  const [language, setLanguage] = useState<TranslationLanguage | null>(null);
  const [browserAvailable, setBrowserAvailable] = useState(false);
  const [recorderAvailable, setRecorderAvailable] = useState(false);
  const recognition = useRef<Recognition | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const upload = useRef<AbortController | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const generation = useRef(0);
  const callbacks = useRef({ onText, onDraft, onError });
  callbacks.current = { onText, onDraft, onError };

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const releaseStream = useCallback(() => {
    stream.current?.getTracks().forEach(track => track.stop());
    stream.current = null;
  }, []);

  const cancel = useCallback(() => {
    generation.current += 1;
    clearTimer();
    if (recognition.current) {
      recognition.current.onend = null;
      recognition.current.onresult = null;
      recognition.current.onerror = null;
      recognition.current.onstart = null;
      try { recognition.current.abort(); } catch {}
      recognition.current = null;
    }
    if (recorder.current) {
      recorder.current.onstop = null;
      recorder.current.ondataavailable = null;
      recorder.current.onerror = null;
      if (recorder.current.state !== 'inactive') {
        try { recorder.current.stop(); } catch {}
      }
      recorder.current = null;
    }
    releaseStream();
    upload.current?.abort();
    upload.current = null;
    setState('idle');
    setLanguage(null);
  }, [clearTimer, releaseStream]);

  useEffect(() => {
    setBrowserAvailable(Boolean(recognitionConstructor()) && window.isSecureContext);
    setRecorderAvailable(typeof navigator.mediaDevices?.getUserMedia === 'function' && typeof window.MediaRecorder !== 'undefined' && window.isSecureContext);
    const hide = () => { if (document.hidden) cancel(); };
    window.addEventListener('pagehide', cancel);
    document.addEventListener('visibilitychange', hide);
    return () => {
      cancel();
      window.removeEventListener('pagehide', cancel);
      document.removeEventListener('visibilitychange', hide);
    };
  }, [cancel]);

  useEffect(() => { if (!active) cancel(); }, [active, cancel]);

  const finish = useCallback(() => {
    clearTimer();
    if (recognition.current) {
      try {
        recognition.current.stop();
        setState('processing');
        timer.current = setTimeout(() => { callbacks.current.onError('timeout'); cancel(); }, 5000);
      } catch { cancel(); }
    } else if (recorder.current?.state === 'recording') {
      recorder.current.stop();
      setState('processing');
      // Stop tracks immediately, before transcription or translation begins.
      releaseStream();
    }
  }, [cancel, clearTimer, releaseStream]);

  const start = useCallback(async (nextLanguage: TranslationLanguage, engine: VoiceInputEngine) => {
    if (!active || !window.isSecureContext) return;
    cancel();
    window.speechSynthesis?.cancel();
    const id = generation.current;
    const current = () => id === generation.current;
    setLanguage(nextLanguage);
    setState('starting');
    callbacks.current.onDraft('', nextLanguage);
    const Constructor = recognitionConstructor();
    if (engine === 'browser' && Constructor) {
      let finalText = '';
      let failed = false;
      const instance = new Constructor();
      recognition.current = instance;
      instance.lang = LANGUAGE_OPTIONS.find(option => option.id === nextLanguage)!.speechLang;
      instance.continuous = false;
      instance.interimResults = true;
      instance.maxAlternatives = 1;
      instance.onstart = () => { if (current()) setState('listening'); };
      instance.onresult = event => {
        if (!current()) return;
        const results = Array.from(event.results);
        finalText = results.filter(result => result.isFinal).map(result => result[0].transcript).join(' ').trim();
        const draft = results.map(result => result[0].transcript).join(' ').trim();
        callbacks.current.onDraft(draft, nextLanguage);
        if (draft.length > MAX_TRANSLATION_LENGTH) {
          failed = true;
          callbacks.current.onError('too_long');
          cancel();
        }
      };
      instance.onerror = event => {
        if (!current()) return;
        failed = true;
        callbacks.current.onError(
          ['not-allowed', 'service-not-allowed', 'audio-capture'].includes(event.error) ? 'denied'
            : event.error === 'no-speech' ? 'no_speech' : 'speech_failed',
        );
        cancel();
      };
      instance.onend = () => {
        if (!current()) return;
        clearTimer();
        recognition.current = null;
        setState('idle');
        setLanguage(null);
        if (!failed && finalText) callbacks.current.onText(finalText, nextLanguage);
        else if (!failed) callbacks.current.onError('no_speech');
      };
      try {
        instance.start();
        timer.current = setTimeout(finish, 30_000);
      } catch {
        callbacks.current.onError('speech_failed');
        cancel();
      }
      return;
    }

    if (!recordingEnabled || !navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      callbacks.current.onError('no_voice');
      cancel();
      return;
    }
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!current()) { media.getTracks().forEach(track => track.stop()); return; }
      stream.current = media;
      const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find(type => MediaRecorder.isTypeSupported(type));
      if (!mime) throw new Error('unsupported_recording');
      const instance = new MediaRecorder(media, { mimeType: mime });
      recorder.current = instance;
      const chunks: Blob[] = [];
      let bytes = 0;
      instance.ondataavailable = event => {
        if (!current() || !event.data.size) return;
        bytes += event.data.size;
        if (bytes > MAX_RECORDING_BYTES) {
          callbacks.current.onError('invalid_recording');
          cancel();
        } else chunks.push(event.data);
      };
      instance.onerror = () => {
        if (!current()) return;
        callbacks.current.onError('speech_failed');
        cancel();
      };
      instance.onstop = async () => {
        if (!current()) return;
        clearTimer();
        releaseStream();
        recorder.current = null;
        const audio = new Blob(chunks, { type: instance.mimeType });
        if (!audio.size) {
          callbacks.current.onError('no_speech');
          cancel();
          return;
        }
        setState('processing');
        const controller = new AbortController();
        upload.current = controller;
        const requestTimer = setTimeout(() => controller.abort(), 40_000);
        try {
          const form = new FormData();
          form.set('audio', audio, instance.mimeType.includes('mp4') ? 'speech.mp4' : 'speech.webm');
          form.set('language', nextLanguage);
          const response = await fetch('/api/transcribe', { method: 'POST', body: form, signal: controller.signal });
          const result = await response.json();
          if (!current()) return;
          if (!response.ok || typeof result.text !== 'string') throw new Error(result.code || 'speech_failed');
          setState('idle');
          setLanguage(null);
          callbacks.current.onText(result.text, nextLanguage);
        } catch (error) {
          if (current()) {
            callbacks.current.onError(error instanceof Error ? (error.name === 'AbortError' ? 'timeout' : error.message) : 'speech_failed');
            setState('idle');
            setLanguage(null);
          }
        } finally {
          clearTimeout(requestTimer);
          if (current()) upload.current = null;
        }
      };
      instance.start(250);
      setState('listening');
      timer.current = setTimeout(finish, 30_000);
    } catch (error) {
      if (!current()) return;
      callbacks.current.onError(error instanceof Error && error.name === 'NotAllowedError' ? 'denied' : 'speech_failed');
      cancel();
    }
  }, [active, cancel, clearTimer, finish, recordingEnabled, releaseStream]);

  return { state, language, browserAvailable, recorderAvailable, start, finish, cancel };
}
