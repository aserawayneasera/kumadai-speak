export interface SpeechSettings {
  rate: number;
  pitch: number;
}

export type SpeechLanguage =
  | 'ja-JP'
  | 'en-US'
  | 'id-ID'
  | 'my-MM'
  | 'zh-CN'
  | 'ko-KR'
  | 'vi-VN';

export function speakText(text: string, settings: SpeechSettings, lang: SpeechLanguage = 'ja-JP') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;

  const voices = window.speechSynthesis.getVoices();
  const exact = voices.find(voice => voice.lang.toLowerCase() === lang.toLowerCase());
  const sameFamily = voices.find(voice => voice.lang.toLowerCase().startsWith(lang.toLowerCase().slice(0, 2)));
  utterance.voice = exact ?? sameFamily ?? null;

  window.speechSynthesis.speak(utterance);
  return true;
}

export function speakJapanese(text: string, settings: SpeechSettings) {
  return speakText(text, settings, 'ja-JP');
}

export function copyText(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  return Promise.resolve();
}
