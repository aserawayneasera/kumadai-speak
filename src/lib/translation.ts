import {
  getAllPhrases, quickBuilders, slotOptions, vocabularyGroups,
  type Phrase,
} from '@/data/communicationBook';
import {
  LANGUAGE_OPTIONS, getTranslatedStaffText, hasTranslatedStaffText,
  type UnderstandingLanguage,
} from '@/lib/phraseDisplay';

export type TranslationLanguage = UnderstandingLanguage;
export type TranslationProvider = 'openai' | 'claude';
export const TRANSLATION_PROVIDER_LABELS: Record<TranslationProvider, string> = { openai: 'OpenAI', claude: 'Claude' };
export interface TranslationServiceConfig {
  translationEnabled: boolean;
  recordingEnabled: boolean;
  defaultProvider: TranslationProvider;
  providers: Record<TranslationProvider, boolean>;
}
export const MAX_TRANSLATION_LENGTH = 1000;
export const MAX_RECORDING_BYTES = 3 * 1024 * 1024;

export interface TranslationResult {
  text: string;
  source: 'phrasebook' | 'online';
  referenceId?: string;
  provider?: TranslationProvider;
}

export interface TranslationTurn extends TranslationResult {
  id: string;
  original: string;
  from: TranslationLanguage;
  to: TranslationLanguage;
}

export interface TranslationReference {
  id: string;
  phraseId?: string;
  categoryId?: string;
  topic: string;
  icon: string;
  template: boolean;
  texts: Partial<Record<TranslationLanguage, string>>;
}

export function isTranslationLanguage(value: unknown): value is TranslationLanguage {
  return LANGUAGE_OPTIONS.some(language => language.id === value);
}

export function isTranslationProvider(value: unknown): value is TranslationProvider {
  return value === 'openai' || value === 'claude';
}

// Preserve internal punctuation, signs, numbers and word boundaries. Fuzzy
// search uses a different normalization and never produces a translation.
export function normalizeExactText(text: string) {
  return text.normalize('NFKC').trim().toLocaleLowerCase()
    .replace(/[‘’]/g, "'").replace(/\s+/g, ' ')
    .replace(/[.!?。！？]+$/g, '').trim();
}

function phraseReference(phrase: Phrase & { categoryId?: string; deckTitle?: string }): TranslationReference {
  const template = Boolean(phrase.slots?.length || /{{.+?}}/.test(phrase.ja));
  const texts: TranslationReference['texts'] = { en: phrase.en, ja: phrase.ja };
  // Other languages exist on some staff cards only. Never treat an English
  // fallback as a translation into another language.
  if (!template && (phrase.role === 'staff' || phrase.role === 'info')) {
    LANGUAGE_OPTIONS.forEach(language => {
      if (hasTranslatedStaffText(phrase, language.id)) {
        texts[language.id] = getTranslatedStaffText(phrase, {}, language.id);
      }
    });
  }
  return {
    id: phrase.id, phraseId: phrase.id, categoryId: phrase.categoryId,
    topic: phrase.deckTitle ?? 'KumaSpeak', icon: phrase.icon, template, texts,
  };
}

const BUILTIN_REFERENCES: TranslationReference[] = [
  ...getAllPhrases().map(phraseReference),
  ...quickBuilders.map(phraseReference),
  ...vocabularyGroups.flatMap(group => group.items.map((word, index) => ({
    id: `word:${group.id}:${index}`, topic: group.title, icon: group.icon,
    template: false, texts: { en: word.en, ja: word.ja },
  }))),
  ...Object.entries(slotOptions).flatMap(([key, words]) => words.map((word, index) => ({
    id: `slot:${key}:${index}`, topic: 'Word choices', icon: '📖',
    template: false, texts: { en: word.en, ja: word.ja },
  }))),
];

export function getTranslationReferences(customPhrases: Phrase[] = []) {
  return customPhrases.length
    ? [...BUILTIN_REFERENCES, ...customPhrases.map(phraseReference)]
    : BUILTIN_REFERENCES;
}

export function findExactTranslation(
  text: string, from: TranslationLanguage, to: TranslationLanguage,
  references = BUILTIN_REFERENCES,
): TranslationResult | undefined {
  const query = normalizeExactText(text);
  if (!query || from === to) return undefined;
  const found = references.find(reference => !reference.template && reference.texts[from]
    && reference.texts[to] && normalizeExactText(reference.texts[from]!) === query);
  return found ? { text: found.texts[to]!, source: 'phrasebook', referenceId: found.id } : undefined;
}

const STOP_WORDS = new Set(['a', 'an', 'and', 'at', 'be', 'do', 'for', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'please', 'the', 'this', 'to', 'you', 'your']);
const WORD_BOUNDARY = new RegExp('[^\\p{L}\\p{M}\\p{N}]+', 'u');

export function searchTranslationReferences(text: string, references = BUILTIN_REFERENCES, limit = 5) {
  const query = normalizeExactText(text);
  if (query.length < 2) return [];
  const tokens = query.split(WORD_BOUNDARY).filter(token => token.length > 1 && !STOP_WORDS.has(token));
  return references.map(reference => {
    let score = 0;
    Object.values(reference.texts).forEach(value => {
      const candidate = normalizeExactText(value ?? '');
      if (candidate === query) score = Math.max(score, 100);
      else if (candidate.includes(query)) score = Math.max(score, 30);
      else {
        const words = candidate.split(WORD_BOUNDARY);
        const matches = tokens.filter(token => words.includes(token)
          || (/[^\x00-\x7f]/.test(token) && candidate.includes(token))).length;
        score = Math.max(score, matches * 3);
      }
    });
    return { reference, score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score)
    .slice(0, limit).map(item => item.reference);
}
