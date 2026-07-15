'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import BottomNav from './BottomNav';
import Header from './Header';
import CategoryCard from './CategoryCard';
import PhonePreview from './PhonePreview';
import SlotPicker from './SlotPicker';
import PhraseCard from './PhraseCard';
import AppFooter from './AppFooter';
import type { AppRoute, MainTab } from './types';
import {
  categories,
  defaultSelections,
  getAllPhrases,
  getDecksByCategory,
  phraseDecks,
  quickBuilders,
  renderTemplate,
  type Phrase,
  type PhraseDeck,
  type SlotKey,
  type SlotOption,
  type Role,
  vocabularyGroups,
} from '@/data/communicationBook';
import { copyText, speakText, speakJapanese, type SpeechSettings } from '@/lib/speech';
import {
  LANGUAGE_OPTIONS,
  getLanguageLabel,
  getPhraseDisplayText,
  getPhraseSubText,
  getSpeechTarget,
  hasTranslatedStaffText,
  renderEnglishPhrase,
  type UnderstandingLanguage,
} from '@/lib/phraseDisplay';
import SupportFreeApp from './SupportFreeApp';

const DEFAULT_ROUTE: AppRoute = { tab: 'home' };

type RoleFilter = 'all' | Role;
type SavedKind = 'favorites' | 'recent' | 'custom';

type CustomPhrase = Phrase & {
  custom?: true;
  categoryId: string;
};

function routeKey(route: AppRoute) {
  return JSON.stringify(route);
}

function makeHash(route: AppRoute) {
  const params = new URLSearchParams();
  params.set('tab', route.tab);
  if (route.categoryId) params.set('category', route.categoryId);
  if (route.deckId) params.set('deck', route.deckId);
  if (route.vocabGroupId) params.set('vocab', route.vocabGroupId);
  if (route.roleFilter) params.set('role', route.roleFilter);
  if (route.morePanel) params.set('panel', route.morePanel);
  if (route.savedKind) params.set('saved', route.savedKind);
  return `#${params.toString()}`;
}

function routeFromHash(): AppRoute | null {
  if (typeof window === 'undefined' || !window.location.hash) return null;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const tab = params.get('tab') as MainTab | null;
  if (!tab) return null;
  return {
    tab,
    categoryId: params.get('category') ?? undefined,
    deckId: params.get('deck') ?? undefined,
    vocabGroupId: params.get('vocab') ?? undefined,
    roleFilter: (params.get('role') as RoleFilter | null) ?? undefined,
    morePanel: (params.get('panel') as AppRoute['morePanel'] | null) ?? undefined,
    savedKind: (params.get('saved') as AppRoute['savedKind'] | null) ?? undefined,
  };
}

function getInitialRoute(): AppRoute {
  if (typeof window === 'undefined') return DEFAULT_ROUTE;
  const hashRoute = routeFromHash();
  if (hashRoute?.tab) return hashRoute;
  const state = window.history.state as { appRoute?: AppRoute } | null;
  if (state?.appRoute?.tab) return state.appRoute;
  try {
    const saved = window.sessionStorage.getItem('kts-route');
    if (saved) return JSON.parse(saved) as AppRoute;
  } catch {}
  return DEFAULT_ROUTE;
}

function getInitialSettings(): SpeechSettings {
  if (typeof window === 'undefined') return { rate: 0.88, pitch: 1 };
  try {
    const saved = window.localStorage.getItem('kts-speech');
    if (saved) return JSON.parse(saved) as SpeechSettings;
  } catch {}
  return { rate: 0.88, pitch: 1 };
}

function getInitialLanguage(): UnderstandingLanguage {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem('kts-understand-language') as UnderstandingLanguage | null;
    if (saved && LANGUAGE_OPTIONS.some(item => item.id === saved)) return saved;
  } catch {}
  return 'en';
}

function loadStringList(key: string) {
  if (typeof window === 'undefined') return [] as string[];
  try {
    const saved = window.localStorage.getItem(key);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function loadCustomPhrases() {
  if (typeof window === 'undefined') return [] as CustomPhrase[];
  try {
    const saved = window.localStorage.getItem('kts-custom-phrases');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed as CustomPhrase[] : [];
  } catch {
    return [];
  }
}

export default function AppShell() {
  const [route, setRoute] = useState<AppRoute>(() => getInitialRoute());
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase>(() => phraseDecks[0].phrases[0]);
  const [selections, setSelections] = useState<Partial<Record<SlotKey, SlotOption>>>(() => defaultSelections(phraseDecks[0].phrases[0]));
  const [settings, setSettings] = useState<SpeechSettings>(() => getInitialSettings());
  const [preferredLanguage, setPreferredLanguage] = useState<UnderstandingLanguage>(() => getInitialLanguage());
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [noiseMode, setNoiseMode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [slotSheetOpen, setSlotSheetOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => loadStringList('kts-favorites'));
  const [recents, setRecents] = useState<string[]>(() => loadStringList('kts-recents'));
  const [customPhrases, setCustomPhrases] = useState<CustomPhrase[]>(() => loadCustomPhrases());

  const allPhraseList = useMemo(() => [...getAllPhrases(), ...quickBuilders, ...customPhrases], [customPhrases]);

  useEffect(() => {
    window.sessionStorage.setItem('kts-route', JSON.stringify(route));
  }, [route]);

  useEffect(() => {
    window.localStorage.setItem('kts-speech', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    window.localStorage.setItem('kts-understand-language', preferredLanguage);
  }, [preferredLanguage]);

  useEffect(() => {
    window.localStorage.setItem('kts-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    window.localStorage.setItem('kts-recents', JSON.stringify(recents));
  }, [recents]);

  useEffect(() => {
    window.localStorage.setItem('kts-custom-phrases', JSON.stringify(customPhrases));
  }, [customPhrases]);

  useEffect(() => {
    const current = window.history.state as { appRoute?: AppRoute } | null;
    if (!current?.appRoute) window.history.replaceState({ appRoute: route }, '', makeHash(route));
    const handler = (event: PopStateEvent) => {
      const next = (event.state as { appRoute?: AppRoute } | null)?.appRoute ?? routeFromHash() ?? DEFAULT_ROUTE;
      setRoute(next);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useCallback((next: AppRoute) => {
    setRoute(current => {
      if (routeKey(current) === routeKey(next)) return current;
      window.history.pushState({ appRoute: next }, '', makeHash(next));
      return next;
    });
  }, []);

  const speak = useCallback((phrase: Phrase, nextSelections: Partial<Record<SlotKey, SlotOption>>) => {
    const target = getSpeechTarget(phrase, nextSelections, preferredLanguage);
    setSpeaking(true);
    speakText(target.text, settings, target.lang);
    window.setTimeout(() => setSpeaking(false), Math.max(900, target.text.length * 80));
  }, [preferredLanguage, settings]);

  const addRecent = useCallback((phrase: Phrase) => {
    setRecents(current => [phrase.id, ...current.filter(id => id !== phrase.id)].slice(0, 12));
  }, []);

  const selectPhrase = useCallback((phrase: Phrase, autoSpeak = true) => {
    const defaults = defaultSelections(phrase);
    setSelectedPhrase(phrase);
    setSelections(defaults);
    setCopied(false);
    addRecent(phrase);
    setSlotSheetOpen(Boolean(phrase.slots?.length));
    if (autoSpeak) speak(phrase, defaults);
  }, [addRecent, speak]);

  const selectSlot = useCallback((key: SlotKey, option: SlotOption) => {
    const next = { ...selections, [key]: option };
    setSelections(next);
    setCopied(false);
    speak(selectedPhrase, next);
  }, [selectedPhrase, selections, speak]);

  const replay = useCallback(() => speak(selectedPhrase, selections), [selectedPhrase, selections, speak]);

  const copySelected = useCallback(async () => {
    const primary = getPhraseDisplayText(selectedPhrase, selections, preferredLanguage);
    const helper = getPhraseSubText(selectedPhrase, selections, preferredLanguage);
    const ja = renderTemplate(selectedPhrase.ja, selections);
    const en = renderEnglishPhrase(selectedPhrase, selections);
    await copyText(`${primary}\n${helper}\nJapanese: ${ja}\nEnglish: ${en}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }, [preferredLanguage, selectedPhrase, selections]);

  const toggleFavorite = useCallback((phraseId = selectedPhrase.id) => {
    setFavorites(current => current.includes(phraseId) ? current.filter(id => id !== phraseId) : [phraseId, ...current].slice(0, 80));
  }, [selectedPhrase.id]);

  const changeTab = (tab: MainTab) => navigate({ tab });

  const deleteCustomPhrase = useCallback((id: string) => {
    setCustomPhrases(current => current.filter(phrase => phrase.id !== id));
    setFavorites(current => current.filter(item => item !== id));
    setRecents(current => current.filter(item => item !== id));
  }, []);

  const activeCategoryId = route.categoryId ?? selectedCategoryId(selectedPhrase, customPhrases) ?? 'hospital';

  return (
    <div className={`min-h-screen bg-slate-50 pb-28 ${noiseMode ? 'text-[17px]' : ''}`}>
      {route.tab === 'home' && <HomeView onOpenCategory={categoryId => navigate({ tab: 'speak', categoryId })} onOpenStaff={categoryId => navigate({ tab: 'staff', categoryId })} onOpenMore={(panel) => navigate({ tab: 'more', morePanel: panel })} />}
      {route.tab === 'speak' && (
        <ConversationView
          mode="student"
          route={route}
          navigate={navigate}
          customPhrases={customPhrases}
          selectedPhrase={selectedPhrase}
          selections={selections}
          preferredLanguage={preferredLanguage}
          onLanguageChange={setPreferredLanguage}
          speaking={speaking}
          copied={copied}
          noiseMode={noiseMode}
          onToggleNoise={() => setNoiseMode(value => !value)}
          favorite={favorites.includes(selectedPhrase.id)}
          onToggleFavorite={() => toggleFavorite()}
          onFullscreen={() => setFullscreen(true)}
          onSelectPhrase={selectPhrase}
          onSelectSlot={selectSlot}
          onReplay={replay}
          onCopy={copySelected}
        />
      )}
      {route.tab === 'staff' && (
        <ConversationView
          mode="staff"
          route={route}
          navigate={navigate}
          customPhrases={customPhrases}
          selectedPhrase={selectedPhrase}
          selections={selections}
          preferredLanguage={preferredLanguage}
          onLanguageChange={setPreferredLanguage}
          speaking={speaking}
          copied={copied}
          noiseMode={noiseMode}
          onToggleNoise={() => setNoiseMode(value => !value)}
          favorite={favorites.includes(selectedPhrase.id)}
          onToggleFavorite={() => toggleFavorite()}
          onFullscreen={() => setFullscreen(true)}
          onSelectPhrase={selectPhrase}
          onSelectSlot={selectSlot}
          onReplay={replay}
          onCopy={copySelected}
        />
      )}
      {route.tab === 'saved' && (
        <SavedView
          selectedKind={route.savedKind ?? 'favorites'}
          navigate={navigate}
          allPhrases={allPhraseList}
          customPhrases={customPhrases}
          favorites={favorites}
          recents={recents}
          selections={selections}
          preferredLanguage={preferredLanguage}
          onSelectPhrase={selectPhrase}
          onDeleteCustom={deleteCustomPhrase}
        />
      )}
      {route.tab === 'more' && (
        <MoreView
          route={route}
          navigate={navigate}
          selectedPhrase={selectedPhrase}
          selections={selections}
          preferredLanguage={preferredLanguage}
          onLanguageChange={setPreferredLanguage}
          settings={settings}
          onSettingsChange={setSettings}
          speaking={speaking}
          copied={copied}
          noiseMode={noiseMode}
          onToggleNoise={() => setNoiseMode(value => !value)}
          favorite={favorites.includes(selectedPhrase.id)}
          onToggleFavorite={() => toggleFavorite()}
          onFullscreen={() => setFullscreen(true)}
          onSelectPhrase={selectPhrase}
          onSelectSlot={selectSlot}
          onReplay={replay}
          onCopy={copySelected}
          onAddCustom={(phrase) => setCustomPhrases(current => [phrase, ...current])}
          onImportCustom={(phrases) => setCustomPhrases(current => [...phrases, ...current])}
          onSpeakWord={(text) => speakJapanese(text, settings)}
          customCount={customPhrases.length}
        />
      )}
      {/* <SupportFreeApp />
      <AppFooter appName="Kumadai Tap & Speak" /> */}

      <QuickReplay selectedPhrase={selectedPhrase} onReplay={replay} onOpenSlots={() => setSlotSheetOpen(true)} />

      {slotSheetOpen && selectedPhrase.slots?.length ? (
        <SlotBottomSheet phrase={selectedPhrase} selections={selections} onSelect={selectSlot} onClose={() => setSlotSheetOpen(false)} />
      ) : null}

      {fullscreen && (
        <FullscreenShow
          phrase={selectedPhrase}
          selections={selections}
          preferredLanguage={preferredLanguage}
          onClose={() => setFullscreen(false)}
          onReplay={replay}
          onCopy={copySelected}
          copied={copied}
        />
      )}

      <BottomNav active={route.tab} onChange={changeTab} />
    </div>
  );
}

function selectedCategoryId(phrase: Phrase, customPhrases: CustomPhrase[]) {
  const deck = phraseDecks.find(item => item.phrases.some(p => p.id === phrase.id));
  if (deck) return deck.categoryId;
  return customPhrases.find(item => item.id === phrase.id)?.categoryId;
}

function StickyPhoneScreen({ children }: { children: ReactNode }) {
  return (
    <div className="sticky top-0 z-30 -mx-4 bg-slate-50/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-slate-50/80">
      {children}
    </div>
  );
}

function LanguageStrip({ preferredLanguage, onLanguageChange }: { preferredLanguage: UnderstandingLanguage; onLanguageChange: (language: UnderstandingLanguage) => void }) {
  return (
    <div className="rounded-3xl border border-indigo-100 bg-white p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-xl">🌐</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Staff voice</p>
          <p className="text-xs leading-relaxed text-slate-600">Your cards speak Japanese. Staff cards speak the student’s selected language when a verified text is available.</p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {LANGUAGE_OPTIONS.map(language => (
              <button key={language.id} type="button" onClick={() => onLanguageChange(language.id)} className={`flex-shrink-0 rounded-2xl px-3 py-2 text-xs font-black ${preferredLanguage === language.id ? 'bg-indigo-700 text-white shadow-md' : 'bg-indigo-50 text-indigo-700'}`}>
                {language.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeView({ onOpenCategory, onOpenStaff, onOpenMore }: { onOpenCategory: (categoryId: string) => void; onOpenStaff: (categoryId: string) => void; onOpenMore: (panel: AppRoute['morePanel']) => void }) {
  const topCards = [
    { icon: '🏥', title: 'Hospital or clinic', desc: 'Reception, symptoms, tests, payment and pharmacy.', categoryId: 'hospital' },
    { icon: '🏛️', title: 'Ward office', desc: 'Forms, address, insurance, pension and official procedures.', categoryId: 'public' },
    { icon: '🚨', title: 'Emergency or disaster', desc: 'Lost, stolen, evacuation, water, utilities and urgent help.', categoryId: 'disaster' },
  ];

  const quickWins = [
    ['1', 'Pick a situation'],
    ['2', 'Tap a card'],
    ['3', 'Show the phone'],
  ];

  return (
    <div className="animate-fade-slide-up">
      <Header
        title="Tap & Speak Kumadai"
        subtitle="Open a card, let your phone speak Japanese, and show large text when talking is hard."
        right={<div className="animate-floaty rounded-3xl bg-white/15 px-3 py-2 text-center"><p className="text-3xl">🐻</p><p className="text-[10px] font-black">Kuma</p></div>}
      />

      <main className="mx-auto max-w-md px-4 py-4 space-y-4">
        <section className="overflow-hidden rounded-[2rem] border border-teal-200 bg-white shadow-sm">
          <div className="hk-primary-bg p-5 text-white">
            <p className="text-xs font-black uppercase tracking-wide text-white/70">Start in one minute</p>
            <h2 className="mt-1 text-2xl font-black leading-tight">What do you need right now?</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">Use this when your Japanese is not enough, the place is noisy, or staff need a clear sentence.</p>
            <div className="mt-4 grid gap-2">
              <button type="button" onClick={() => onOpenCategory('hospital')} className="rounded-2xl bg-white px-4 py-3 text-left text-sm font-black text-teal-800 shadow-sm">
                🗣️ I want to say something
              </button>
              <button type="button" onClick={() => onOpenStaff('hospital')} className="rounded-2xl bg-white/15 px-4 py-3 text-left text-sm font-black text-white ring-1 ring-white/25">
                👂 Help me understand staff
              </button>
              <button type="button" onClick={() => onOpenMore('custom')} className="rounded-2xl bg-white/10 px-4 py-3 text-left text-xs font-black text-white/90 ring-1 ring-white/20">
                🧩 Make my own card
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-teal-100 bg-teal-50 text-center">
            {quickWins.map(([n, label]) => (
              <div key={n} className="px-2 py-3"><p className="text-sm font-black text-teal-800">{n}</p><p className="text-[10px] font-semibold text-teal-600">{label}</p></div>
            ))}
          </div>
        </section>

        <QuickEmergencyStrip onOpenCategory={onOpenCategory} />

        <section>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">Most used</p>
            <button type="button" onClick={() => onOpenMore('custom')} className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-blue-700">Add my card</button>
          </div>
          <div className="space-y-2">
            {topCards.map(card => (
              <div key={card.title} className="card-lift rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-2xl">{card.icon}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black text-slate-900">{card.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{card.desc}</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => onOpenCategory(card.categoryId)} className="rounded-2xl bg-teal-700 px-3 py-2 text-xs font-black text-white">I want to say</button>
                      <button type="button" onClick={() => onOpenStaff(card.categoryId)} className="rounded-2xl bg-indigo-50 px-3 py-2 text-xs font-black text-indigo-700">Staff may say</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">All situations</p>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(category => <CategoryCard key={category.id} category={category} onClick={() => onOpenCategory(category.id)} />)}
          </div>
        </section>
      </main>
    </div>
  );
}

function QuickEmergencyStrip({ onOpenCategory }: { onOpenCategory: (categoryId: string) => void }) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-wide text-red-700">Always useful</p>
        <button type="button" onClick={() => onOpenCategory('disaster')} className="text-[11px] font-black text-red-700">Open emergency →</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[['助けてください。', 'Help me'], ['緊急です。', 'Emergency'], ['道に迷いました。', 'I am lost'], ['わかりません。', 'I do not understand']].map(([ja, en]) => (
          <button key={ja} type="button" onClick={() => speakJapaneseQuick(ja)} className="rounded-2xl bg-white px-3 py-2 text-left text-xs font-black text-slate-800 shadow-sm">
            <span className="block text-sm">{ja}</span>
            <span className="text-[10px] text-slate-500">{en}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function speakJapaneseQuick(text: string) {
  speakJapanese(text, { rate: 0.88, pitch: 1 });
}

function buildDecks(categoryId: string, customPhrases: CustomPhrase[]): PhraseDeck[] {
  const custom = customPhrases.filter(phrase => phrase.categoryId === categoryId);
  const decks = getDecksByCategory(categoryId);
  if (!custom.length) return decks;
  return [
    ...decks,
    { id: `custom-${categoryId}`, categoryId, title: 'My saved cards', subtitle: 'Cards you added for this situation.', icon: '⭐', color: 'from-amber-500 to-orange-500', phrases: custom },
  ];
}

function ConversationView({ mode, route, navigate, customPhrases, selectedPhrase, selections, preferredLanguage, onLanguageChange, speaking, copied, noiseMode, onToggleNoise, favorite, onToggleFavorite, onFullscreen, onSelectPhrase, onSelectSlot, onReplay, onCopy }: {
  mode: 'student' | 'staff';
  route: AppRoute;
  navigate: (route: AppRoute) => void;
  customPhrases: CustomPhrase[];
  selectedPhrase: Phrase;
  selections: Partial<Record<SlotKey, SlotOption>>;
  preferredLanguage: UnderstandingLanguage;
  onLanguageChange: (language: UnderstandingLanguage) => void;
  speaking: boolean;
  copied: boolean;
  noiseMode: boolean;
  onToggleNoise: () => void;
  favorite: boolean;
  onToggleFavorite: () => void;
  onFullscreen: () => void;
  onSelectPhrase: (phrase: Phrase, autoSpeak?: boolean) => void;
  onSelectSlot: (key: SlotKey, option: SlotOption) => void;
  onReplay: () => void;
  onCopy: () => void;
}) {
  const categoryId = route.categoryId ?? 'hospital';
  const roleFilter = mode === 'student' ? 'student' : ((route.roleFilter ?? 'staff') as RoleFilter);
  const [search, setSearch] = useState(route.search ?? '');
  const category = categories.find(item => item.id === categoryId) ?? categories[0];
  const decks = buildDecks(categoryId, customPhrases);
  const deckId = route.deckId && decks.some(deck => deck.id === route.deckId) ? route.deckId : decks[0]?.id;
  const deck = decks.find(item => item.id === deckId) ?? decks[0];

  useEffect(() => {
    if (route.search !== search) setSearch(route.search ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.search]);

  const phrases = useMemo(() => {
    if (!deck) return [];
    const q = search.trim().toLowerCase();
    return deck.phrases.filter(phrase => {
      if (mode === 'student' && phrase.role !== 'student') return false;
      if (mode === 'staff' && roleFilter !== 'all' && phrase.role !== roleFilter) return false;
      if (mode === 'staff' && roleFilter === 'all' && phrase.role === 'student') return false;
      if (!q) return true;
      return `${phrase.en} ${phrase.ja} ${phrase.romaji ?? ''}`.toLowerCase().includes(q);
    });
  }, [deck, roleFilter, search, mode]);

  const title = mode === 'student' ? 'Speak to staff' : 'Understand staff';
  const subtitle = mode === 'student'
    ? 'Tap your card. It speaks Japanese and keeps the large screen visible.'
    : `Staff taps a card. You hear it in ${getLanguageLabel(preferredLanguage)} when available.`;

  return (
    <div className="animate-fade-slide-up">
      <Header title={title} subtitle={subtitle} />
      <main className="mx-auto max-w-md px-4 py-4 space-y-4">
        <StickyPhoneScreen>
          <PhonePreview
            phrase={selectedPhrase}
            selections={selections}
            preferredLanguage={preferredLanguage}
            onReplay={onReplay}
            onCopy={onCopy}
            copied={copied}
            speaking={speaking}
            noiseMode={noiseMode}
            favorite={favorite}
            onToggleFavorite={onToggleFavorite}
            onFullscreen={onFullscreen}
          />
        </StickyPhoneScreen>

        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => navigate({ tab: 'speak', categoryId, deckId })} className={`rounded-2xl px-3 py-3 text-xs font-black ${mode === 'student' ? 'bg-teal-700 text-white shadow-md' : 'bg-white text-teal-700 border border-teal-100'}`}>I want to say</button>
          <button type="button" onClick={() => navigate({ tab: 'staff', categoryId, deckId, roleFilter: 'staff' })} className={`rounded-2xl px-3 py-3 text-xs font-black ${mode === 'staff' ? 'bg-indigo-700 text-white shadow-md' : 'bg-white text-indigo-700 border border-indigo-100'}`}>Staff may say</button>
        </div>

        {mode === 'staff' && <StaffHandover preferredLanguage={preferredLanguage} />}
        {mode === 'staff' && <LanguageStrip preferredLanguage={preferredLanguage} onLanguageChange={onLanguageChange} />}

        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">Mode</p>
              <p className="text-xs text-slate-600">Sticky screen stays visible while you scroll.</p>
            </div>
            <button type="button" onClick={onToggleNoise} className={`rounded-2xl px-3 py-2 text-xs font-black ${noiseMode ? 'bg-black text-white' : 'bg-slate-100 text-slate-700'}`}>{noiseMode ? 'Noise mode on' : 'Noise mode'}</button>
          </div>
        </div>

        <SlotPicker phrase={selectedPhrase} selections={selections} onSelect={onSelectSlot} />

        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Situation</p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(item => (
              <button key={item.id} type="button" onClick={() => navigate({ tab: mode === 'student' ? 'speak' : 'staff', categoryId: item.id, roleFilter: mode === 'staff' ? 'staff' : undefined })} className={`flex-shrink-0 rounded-2xl px-3 py-2 text-xs font-black ${item.id === categoryId ? 'hk-primary-bg text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}>
                {item.icon} {item.short}
              </button>
            ))}
          </div>
          <div className={`mt-3 rounded-2xl bg-gradient-to-r ${category.color} p-3 text-white`}>
            <p className="text-sm font-black">{category.icon} {category.label}</p>
            <p className="mt-1 text-xs text-white/75">{category.desc}</p>
          </div>
        </div>

        {deck && (
          <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">Conversation steps</p>
              <p className="text-[10px] font-black text-slate-400">{decks.findIndex(item => item.id === deck.id) + 1}/{decks.length}</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {decks.map((item, index) => (
                <button key={item.id} type="button" onClick={() => navigate({ ...route, deckId: item.id })} className={`min-w-[150px] flex-shrink-0 rounded-2xl border p-3 text-left ${item.id === deck.id ? 'border-blue-500 bg-blue-50' : 'border-slate-100 bg-slate-50'}`}>
                  <span className="mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-black text-blue-700">{index + 1}</span>
                  <p className="text-xs font-black text-slate-800">{item.icon} {item.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500">{item.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search English, Japanese, romaji..." className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400" />
          {mode === 'staff' && (
            <div className="mt-2 grid grid-cols-3 gap-1">
              {(['staff', 'info', 'all'] as RoleFilter[]).map(role => (
                <button key={role} type="button" onClick={() => navigate({ ...route, roleFilter: role })} className={`rounded-xl px-2 py-2 text-[10px] font-black ${roleFilter === role ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'}`}>
                  {role === 'all' ? 'All staff/info' : role === 'staff' ? 'Staff cards' : 'Info cards'}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          {phrases.map(phrase => (
            <PhraseCard key={phrase.id} phrase={phrase} active={phrase.id === selectedPhrase.id} selections={phrase.id === selectedPhrase.id ? selections : defaultSelections(phrase)} preferredLanguage={preferredLanguage} onSelect={() => onSelectPhrase(phrase, true)} />
          ))}
          {!phrases.length && <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm font-semibold text-slate-500">No phrase found. Try another keyword or conversation step.</div>}
        </div>
      </main>
    </div>
  );
}

function StaffHandover({ preferredLanguage }: { preferredLanguage: UnderstandingLanguage }) {
  return (
    <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-4 shadow-sm">
      <p className="text-sm font-black text-indigo-900">👋 Show this to staff</p>
      <div className="mt-2 rounded-2xl bg-white p-3">
        <p className="text-base font-black text-slate-900">私に伝えたいことをタップしてください。</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">Please tap what you want to say to me. I will hear it in {getLanguageLabel(preferredLanguage)}.</p>
      </div>
    </div>
  );
}

function SlotBottomSheet({ phrase, selections, onSelect, onClose }: { phrase: Phrase; selections: Partial<Record<SlotKey, SlotOption>>; onSelect: (key: SlotKey, option: SlotOption) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-950/40" onClick={onClose}>
      <div className="max-h-[75vh] w-full overflow-y-auto rounded-t-[2rem] bg-white p-4 shadow-2xl" onClick={event => event.stopPropagation()}>
        <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-200" />
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-black text-slate-900">Choose words for the blank</p>
            <p className="text-xs text-slate-500">Tap a chip. The phrase updates and speaks immediately.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-black text-slate-700">Done</button>
        </div>
        <SlotPicker phrase={phrase} selections={selections} onSelect={onSelect} />
      </div>
    </div>
  );
}

function FullscreenShow({ phrase, selections, preferredLanguage, onClose, onReplay, onCopy, copied }: { phrase: Phrase; selections: Partial<Record<SlotKey, SlotOption>>; preferredLanguage: UnderstandingLanguage; onClose: () => void; onReplay: () => void; onCopy: () => void; copied: boolean }) {
  const text = getPhraseDisplayText(phrase, selections, preferredLanguage);
  const sub = getPhraseSubText(phrase, selections, preferredLanguage);
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-slate-950 text-white">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-white/45">Show mode</p>
          <p className="text-sm font-bold text-white/80">Large text for noisy places</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-full bg-white px-4 py-2 text-xs font-black text-slate-900">Close</button>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 text-center">
        <div>
          <p className="break-words text-4xl font-black leading-tight sm:text-6xl">{text}</p>
          <p className="mt-6 text-base font-semibold leading-relaxed text-white/65">{sub}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4 safe-bottom">
        <button type="button" onClick={onReplay} className="rounded-2xl bg-white px-4 py-4 text-sm font-black text-slate-900">🔊 Replay</button>
        <button type="button" onClick={onCopy} className="rounded-2xl bg-white/10 px-4 py-4 text-sm font-black text-white">{copied ? '✅ Copied' : '📋 Copy'}</button>
      </div>
    </div>
  );
}

function QuickReplay({ selectedPhrase, onReplay, onOpenSlots }: { selectedPhrase: Phrase; onReplay: () => void; onOpenSlots: () => void }) {
  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-2">
      {selectedPhrase.slots?.length ? (
        <button type="button" onClick={onOpenSlots} className="rounded-full bg-blue-600 px-4 py-3 text-xs font-black text-white shadow-xl transition hover:scale-105">
          🧩 Blanks
        </button>
      ) : null}
      <button type="button" onClick={onReplay} className="flex items-center gap-2 rounded-full bg-violet-700 px-4 py-3 text-sm font-black text-white shadow-xl transition hover:scale-105">
        <span className="animate-wave">🔊</span>
        <span>Replay</span>
      </button>
    </div>
  );
}

function SavedView({ selectedKind, navigate, allPhrases, customPhrases, favorites, recents, selections, preferredLanguage, onSelectPhrase, onDeleteCustom }: {
  selectedKind: SavedKind;
  navigate: (route: AppRoute) => void;
  allPhrases: Phrase[];
  customPhrases: CustomPhrase[];
  favorites: string[];
  recents: string[];
  selections: Partial<Record<SlotKey, SlotOption>>;
  preferredLanguage: UnderstandingLanguage;
  onSelectPhrase: (phrase: Phrase, autoSpeak?: boolean) => void;
  onDeleteCustom: (id: string) => void;
}) {
  const ids = selectedKind === 'favorites' ? favorites : selectedKind === 'recent' ? recents : customPhrases.map(item => item.id);
  const phrases = ids.map(id => allPhrases.find(phrase => phrase.id === id)).filter(Boolean) as Phrase[];
  return (
    <div className="animate-fade-slide-up">
      <Header title="Saved" subtitle="Favorites, recent phrases and cards you created." />
      <main className="mx-auto max-w-md px-4 py-4 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(['favorites', 'recent', 'custom'] as SavedKind[]).map(kind => (
            <button key={kind} type="button" onClick={() => navigate({ tab: 'saved', savedKind: kind })} className={`rounded-2xl px-3 py-3 text-xs font-black ${selectedKind === kind ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}`}>
              {kind === 'favorites' ? '⭐ Favorites' : kind === 'recent' ? '🕘 Recent' : '🧩 My Cards'}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {phrases.map(phrase => (
            <div key={phrase.id} className="relative">
              <PhraseCard phrase={phrase} active={false} selections={defaultSelections(phrase)} preferredLanguage={preferredLanguage} onSelect={() => onSelectPhrase(phrase, true)} />
              {selectedKind === 'custom' && (
                <button type="button" onClick={() => onDeleteCustom(phrase.id)} className="absolute right-3 top-3 rounded-full bg-red-50 px-2 py-1 text-[10px] font-black text-red-700">Delete</button>
              )}
            </div>
          ))}
          {!phrases.length && (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center">
              <p className="text-sm font-black text-slate-700">Nothing here yet</p>
              <p className="mt-1 text-xs text-slate-500">Star phrases, tap cards, or add custom cards from More.</p>
              <button type="button" onClick={() => navigate({ tab: 'more', morePanel: 'custom' })} className="mt-3 rounded-2xl bg-blue-600 px-4 py-3 text-xs font-black text-white">Add custom card</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function MoreView({ route, navigate, selectedPhrase, selections, preferredLanguage, onLanguageChange, settings, onSettingsChange, speaking, copied, noiseMode, onToggleNoise, favorite, onToggleFavorite, onFullscreen, onSelectPhrase, onSelectSlot, onReplay, onCopy, onAddCustom, onImportCustom, onSpeakWord, customCount }: {
  route: AppRoute;
  navigate: (route: AppRoute) => void;
  selectedPhrase: Phrase;
  selections: Partial<Record<SlotKey, SlotOption>>;
  preferredLanguage: UnderstandingLanguage;
  onLanguageChange: (language: UnderstandingLanguage) => void;
  settings: SpeechSettings;
  onSettingsChange: (settings: SpeechSettings) => void;
  speaking: boolean;
  copied: boolean;
  noiseMode: boolean;
  onToggleNoise: () => void;
  favorite: boolean;
  onToggleFavorite: () => void;
  onFullscreen: () => void;
  onSelectPhrase: (phrase: Phrase, autoSpeak?: boolean) => void;
  onSelectSlot: (key: SlotKey, option: SlotOption) => void;
  onReplay: () => void;
  onCopy: () => void;
  onAddCustom: (phrase: CustomPhrase) => void;
  onImportCustom: (phrases: CustomPhrase[]) => void;
  onSpeakWord: (text: string) => void;
  customCount: number;
}) {
  const panel = route.morePanel ?? 'custom';
  return (
    <div className="animate-fade-slide-up">
      <Header title="More" subtitle="Custom cards, quick builders, vocabulary, settings, help and about." />
      <main className="mx-auto max-w-md px-4 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            ['custom', '🧩', 'Custom'],
            ['builder', '⚡', 'Builder'],
            ['words', '🈳', 'Words'],
            ['settings', '⚙️', 'Settings'],
            ['help', '❓', 'Help'],
            ['about', 'ℹ️', 'About'],
          ].map(([id, icon, label]) => (
            <button key={id} type="button" onClick={() => navigate({ tab: 'more', morePanel: id as AppRoute['morePanel'] })} className={`rounded-2xl border px-3 py-3 text-xs font-black ${panel === id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600'}`}>
              {icon} {label}
            </button>
          ))}
        </div>

        {panel === 'custom' && <CustomCardStudio onAddCustom={onAddCustom} onImportCustom={onImportCustom} customCount={customCount} />}
        {panel === 'builder' && (
          <BuilderPanel
            selectedPhrase={selectedPhrase}
            selections={selections}
            preferredLanguage={preferredLanguage}
            speaking={speaking}
            copied={copied}
            noiseMode={noiseMode}
            favorite={favorite}
            onToggleFavorite={onToggleFavorite}
            onFullscreen={onFullscreen}
            onSelectPhrase={onSelectPhrase}
            onSelectSlot={onSelectSlot}
            onReplay={onReplay}
            onCopy={onCopy}
          />
        )}
        {panel === 'words' && <VocabularyPanel route={route} navigate={navigate} onSpeak={onSpeakWord} />}
        {panel === 'settings' && <SettingsPanel settings={settings} onSettingsChange={onSettingsChange} preferredLanguage={preferredLanguage} onLanguageChange={onLanguageChange} noiseMode={noiseMode} onToggleNoise={onToggleNoise} />}
        {panel === 'help' && <HelpPanel />}
        {panel === 'about' && <AboutPanel />}
      </main>
    </div>
  );
}

function CustomCardStudio({ onAddCustom, onImportCustom, customCount }: { onAddCustom: (phrase: CustomPhrase) => void; onImportCustom: (phrases: CustomPhrase[]) => void; customCount: number }) {
  const [role, setRole] = useState<Role>('student');
  const [categoryId, setCategoryId] = useState('daily');
  const [icon, setIcon] = useState('💬');
  const [en, setEn] = useState('');
  const [ja, setJa] = useState('');
  const [romaji, setRomaji] = useState('');
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!en.trim() || !ja.trim()) return;
    onAddCustom({
      id: `custom-${Date.now()}`,
      custom: true,
      categoryId,
      role,
      icon: icon.trim() || '💬',
      en: en.trim(),
      ja: ja.trim(),
      romaji: romaji.trim() || undefined,
      tags: ['custom'],
    });
    setSaved(true);
    setEn('');
    setJa('');
    setRomaji('');
    window.setTimeout(() => setSaved(false), 1300);
  };

  const importFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? '');
      const rows = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
      const phrases = rows.map((row, index) => {
        const [enValue, jaValue, roleValue, categoryValue, iconValue] = row.split(',').map(cell => cell?.trim());
        if (!enValue || !jaValue) return null;
        return {
          id: `custom-import-${Date.now()}-${index}`,
          custom: true,
          categoryId: categoryValue || categoryId,
          role: (roleValue === 'staff' || roleValue === 'info' || roleValue === 'student') ? roleValue : role,
          icon: iconValue || '💬',
          en: enValue,
          ja: jaValue,
          tags: ['custom', 'imported'],
        } as CustomPhrase;
      }).filter(Boolean) as CustomPhrase[];
      if (phrases.length) onImportCustom(phrases);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-black text-blue-900">🧩 Custom Phrase Studio</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-700">Manual mode works offline: add English and Japanese, then save it as a tap card. CSV upload format: English,Japanese,role,category,icon.</p>
        <p className="mt-2 text-xs font-black text-blue-800">Saved custom cards: {customCount}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <select value={role} onChange={event => setRole(event.target.value as Role)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm font-bold">
            <option value="student">I want to say</option>
            <option value="staff">Staff may say</option>
            <option value="info">Info card</option>
          </select>
          <select value={categoryId} onChange={event => setCategoryId(event.target.value)} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm font-bold">
            {categories.map(category => <option key={category.id} value={category.id}>{category.short}</option>)}
          </select>
        </div>
        <input value={icon} onChange={event => setIcon(event.target.value)} placeholder="Icon emoji" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
        <textarea value={en} onChange={event => setEn(event.target.value)} placeholder="English meaning" className="min-h-[82px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
        <textarea value={ja} onChange={event => setJa(event.target.value)} placeholder="Japanese phrase" className="min-h-[82px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
        <input value={romaji} onChange={event => setRomaji(event.target.value)} placeholder="Romaji, optional" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
        <button type="button" onClick={save} className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-black text-white">{saved ? '✅ Saved' : 'Save card'}</button>
      </div>
      <label className="block rounded-3xl border border-dashed border-slate-300 bg-white p-4 text-center shadow-sm">
        <p className="text-sm font-black text-slate-800">Upload CSV</p>
        <p className="mt-1 text-xs text-slate-500">English,Japanese,role,category,icon</p>
        <input type="file" accept=".csv,.txt" onChange={event => importFile(event.target.files?.[0] ?? null)} className="mt-3 text-xs" />
      </label>
    </div>
  );
}

function BuilderPanel({ selectedPhrase, selections, preferredLanguage, speaking, copied, noiseMode, favorite, onToggleFavorite, onFullscreen, onSelectPhrase, onSelectSlot, onReplay, onCopy }: {
  selectedPhrase: Phrase;
  selections: Partial<Record<SlotKey, SlotOption>>;
  preferredLanguage: UnderstandingLanguage;
  speaking: boolean;
  copied: boolean;
  noiseMode: boolean;
  favorite: boolean;
  onToggleFavorite: () => void;
  onFullscreen: () => void;
  onSelectPhrase: (phrase: Phrase, autoSpeak?: boolean) => void;
  onSelectSlot: (key: SlotKey, option: SlotOption) => void;
  onReplay: () => void;
  onCopy: () => void;
}) {
  return (
    <div className="space-y-4">
      <StickyPhoneScreen>
        <PhonePreview phrase={selectedPhrase} selections={selections} preferredLanguage={preferredLanguage} onReplay={onReplay} onCopy={onCopy} copied={copied} speaking={speaking} noiseMode={noiseMode} favorite={favorite} onToggleFavorite={onToggleFavorite} onFullscreen={onFullscreen} />
      </StickyPhoneScreen>
      <SlotPicker phrase={selectedPhrase} selections={selections} onSelect={onSelectSlot} />
      <div className="space-y-2">
        {quickBuilders.map(phrase => <PhraseCard key={phrase.id} phrase={phrase} active={phrase.id === selectedPhrase.id} selections={phrase.id === selectedPhrase.id ? selections : defaultSelections(phrase)} preferredLanguage={preferredLanguage} onSelect={() => onSelectPhrase(phrase, true)} />)}
      </div>
    </div>
  );
}

function VocabularyPanel({ route, navigate, onSpeak }: { route: AppRoute; navigate: (route: AppRoute) => void; onSpeak: (text: string) => void }) {
  const groupId = route.vocabGroupId ?? vocabularyGroups[0].id;
  const group = vocabularyGroups.find(item => item.id === groupId) ?? vocabularyGroups[0];
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return group.items;
    return group.items.filter(item => `${item.ja} ${item.en} ${item.romaji ?? ''}`.toLowerCase().includes(q));
  }, [group, search]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {vocabularyGroups.map(item => (
          <button key={item.id} type="button" onClick={() => navigate({ tab: 'more', morePanel: 'words', vocabGroupId: item.id })} className={`flex-shrink-0 rounded-2xl px-3 py-2 text-xs font-black ${item.id === group.id ? 'hk-primary-bg text-white shadow-md' : 'bg-white text-slate-600'}`}>
            {item.icon} {item.title.split(',')[0]}
          </button>
        ))}
      </div>
      <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search words..." className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400" />
      <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
        <p className="text-sm font-black text-slate-900">{group.icon} {group.title}</p>
        <div className="mt-3 grid grid-cols-1 gap-2">
          {filtered.map(item => (
            <button key={`${item.ja}-${item.en}`} type="button" onClick={() => onSpeak(item.ja)} className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-left transition hover:bg-blue-50">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-black text-slate-900">{item.ja}</p>
                  {item.romaji && <p className="text-[11px] text-slate-400">{item.romaji}</p>}
                  <p className="text-xs text-slate-600">{item.en}</p>
                </div>
                <span className="rounded-full bg-violet-50 px-2 py-1 text-[10px] font-black text-violet-700">🔊</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({ settings, onSettingsChange, preferredLanguage, onLanguageChange, noiseMode, onToggleNoise }: { settings: SpeechSettings; onSettingsChange: (settings: SpeechSettings) => void; preferredLanguage: UnderstandingLanguage; onLanguageChange: (language: UnderstandingLanguage) => void; noiseMode: boolean; onToggleNoise: () => void }) {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-indigo-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-slate-900">Staff-card language</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-600">Staff cards use this language when a card has a verified translation. Other cards fall back to English so the app never breaks.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {LANGUAGE_OPTIONS.map(language => (
            <button key={language.id} type="button" onClick={() => onLanguageChange(language.id)} className={`rounded-2xl px-3 py-3 text-xs font-black ${preferredLanguage === language.id ? 'bg-indigo-700 text-white shadow-md' : 'bg-indigo-50 text-indigo-700'}`}>
              {language.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-slate-900">Noise mode</p>
            <p className="mt-1 text-xs text-slate-600">Bigger text and stronger contrast for loud environments.</p>
          </div>
          <button type="button" onClick={onToggleNoise} className={`rounded-2xl px-4 py-3 text-xs font-black ${noiseMode ? 'bg-black text-white' : 'bg-slate-100 text-slate-700'}`}>{noiseMode ? 'On' : 'Off'}</button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-slate-900">Voice settings</p>
        <label className="mt-4 block text-xs font-black text-slate-500">Speed: {settings.rate.toFixed(2)}</label>
        <input type="range" min="0.55" max="1.15" step="0.05" value={settings.rate} onChange={event => onSettingsChange({ ...settings, rate: Number(event.target.value) })} className="w-full" />
        <label className="mt-4 block text-xs font-black text-slate-500">Pitch: {settings.pitch.toFixed(2)}</label>
        <input type="range" min="0.7" max="1.3" step="0.05" value={settings.pitch} onChange={event => onSettingsChange({ ...settings, pitch: Number(event.target.value) })} className="w-full" />
      </div>
    </div>
  );
}


function AboutPanel() {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="hk-primary-bg p-4 text-white">
          <p className="text-base font-black">About Kumadai Tap & Speak™</p>
          <p className="mt-1 text-xs leading-relaxed text-white/80">
            A two-way communication app for international students and Japanese staff.
          </p>
        </div>
        <div className="space-y-3 p-4 text-sm leading-relaxed text-slate-700">
          <p>
            Kumadai Tap & Speak was created and developed by Anonymous Kuma.
          </p>
          <p>
            The app helps students communicate in places where clear Japanese matters: hospitals, ward offices, real estate offices, university counters, schools, transport, daily life and disasters.
          </p>
          <p>
            It is inspired by Kumamoto University&apos;s Daily Communication Book. The paper idea is carry, show and point. This app turns that into tap, speak, show, replay, favorites and custom cards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          ['👆', 'Tap'],
          ['🔊', 'Speak'],
          ['📱', 'Show'],
        ].map(([icon, label]) => (
          <div key={label} className="rounded-2xl border border-teal-100 bg-teal-50 p-3 text-center">
            <p className="text-2xl">{icon}</p>
            <p className="mt-1 text-xs font-black text-teal-800">{label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-black text-amber-900">Translation and safety note</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-700">
          Some translations, custom cards, voice output and browser speech features may be incorrect or unavailable depending on the device. For medical, pregnancy, police, emergency, legal, immigration, money, university or city-office matters, confirm important details with official staff or official sources.
        </p>
      </div>

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-black text-blue-900">Corrections and improvements</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-700">
          Send missing phrases, translation issues, voice problems or ideas for new situations.
        </p>
        <a href="mailto:asera.wa@gmail.com" className="mt-3 block rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-blue-800 shadow-sm no-underline">
          ✉️ asera.wa@gmail.com
        </a>
      </div>

      <a href="/about" className="block rounded-3xl border border-slate-200 bg-white p-4 text-center text-sm font-black text-slate-800 no-underline shadow-sm">
        Open full About page →
      </a>
    </div>
  );
}

function HelpPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-teal-200 bg-white shadow-sm overflow-hidden">
        <div className="hk-primary-bg p-4 text-white">
          <p className="text-base font-black">Original book idea</p>
          <p className="mt-1 text-xs leading-relaxed text-white/80">Carry the book, show it to the person, and point at what you need to say. This app turns that into tap, speak, show and replay.</p>
        </div>
        <div className="grid grid-cols-3 divide-x divide-teal-100 bg-teal-50 text-center">
          {[
            ['👆', 'Tap card'], ['🔊', 'Speak'], ['📱', 'Show phone'],
          ].map(([icon, label]) => (
            <div key={label} className="px-2 py-3"><p className="text-2xl">{icon}</p><p className="text-[10px] font-black text-teal-700">{label}</p></div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-black text-amber-900">When this is not enough</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-700">The source book says students should contact the Kumamoto University International Student Office if the book cannot help enough.</p>
        <a href="tel:0963422133" className="mt-3 block rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-amber-800 shadow-sm">📞 096-342-2133</a>
        <p className="mt-2 text-[11px] text-amber-800">Weekdays except holidays, 9:00 to 16:00.</p>
      </div>

      <div className="rounded-3xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-black text-red-900">Emergency</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href="tel:119" className="rounded-2xl bg-red-600 px-4 py-3 text-center text-sm font-black text-white">119 Fire / Ambulance</a>
          <a href="tel:110" className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-black text-white">110 Police</a>
        </div>
      </div>
    </div>
  );
}
