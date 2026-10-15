'use client';

import { createContext, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { MODE_KEY, STYLE_KEY } from '@/lib/appearance';

type Mode = 'system' | 'light' | 'night';
type Style = 'normal' | 'soft' | 'kuma';
const isMode = (value: unknown): value is Mode => ['system', 'light', 'night'].includes(String(value));
const isStyle = (value: unknown): value is Style => ['normal', 'soft', 'kuma'].includes(String(value));

const AppearanceContext = createContext({
  mode: 'system' as Mode, style: 'soft' as Style,
  setMode: (_mode: Mode) => {}, setStyle: (_style: Style) => {},
});

function apply(mode: Mode, style: Style) {
  const root = document.documentElement;
  const dark = mode === 'night' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.appearance = mode;
  root.dataset.visualTheme = style;
  root.dataset.theme = dark ? 'soft-dark' : 'light';
  root.dataset.cardRadius = '14';
  root.style.colorScheme = dark ? 'dark' : 'light';
  const page = getComputedStyle(root).getPropertyValue('--hk-page').trim();
  if (page) document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach(meta => { meta.content = page; });
}

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('system');
  const [style, setStyle] = useState<Style>('soft');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    function read() {
      try {
        const mode = localStorage.getItem(MODE_KEY);
        const style = localStorage.getItem(STYLE_KEY);
        setMode(isMode(mode) ? mode : 'system');
        setStyle(isStyle(style) ? style : 'soft');
      } catch { /* Appearance controls also work without browser storage. */ }
    }
    read();
    setReady(true);
    const sync = (event: StorageEvent) => { if (event.key === MODE_KEY || event.key === STYLE_KEY || event.key === null) read(); };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  useEffect(() => {
    if (!ready) return;
    apply(mode, style);
    try { localStorage.setItem(MODE_KEY, mode); localStorage.setItem(STYLE_KEY, style); } catch {}
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => apply(mode, style);
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, [mode, style, ready]);
  return <AppearanceContext.Provider value={{ mode, style, setMode, setStyle }}>{children}</AppearanceContext.Provider>;
}

// The new presentation controls follow each app's existing language selection.
const labels: Record<string, string[]> = {
  en: ['Appearance', 'Theme', 'Normal', 'Soft', 'Kuma', 'Color mode', 'Auto', 'Light', 'Night', 'Close'],
  ja: ['表示設定', 'テーマ', '標準', 'やわらか', 'くま', '明るさ', '自動', 'ライト', 'ダーク', '閉じる'],
  id: ['Tampilan', 'Tema', 'Standar', 'Lembut', 'Kuma', 'Mode warna', 'Otomatis', 'Terang', 'Gelap', 'Tutup'],
  my: ['အသွင်အပြင်', 'အပြင်အဆင်', 'ပုံမှန်', 'နူးညံ့', 'Kuma', 'အရောင်မုဒ်', 'အလိုအလျောက်', 'အလင်း', 'အမှောင်', 'ပိတ်ရန်'],
  zh: ['外觀', '主題', '標準', '柔和', 'Kuma', '色彩模式', '自動', '淺色', '深色', '關閉'],
  'zh-CN': ['外观', '主题', '标准', '柔和', 'Kuma', '颜色模式', '自动', '浅色', '深色', '关闭'],
  ko: ['화면 설정', '테마', '기본', '부드럽게', 'Kuma', '색상 모드', '자동', '밝게', '어둡게', '닫기'],
  vi: ['Giao diện', 'Chủ đề', 'Tiêu chuẩn', 'Dịu', 'Kuma', 'Chế độ màu', 'Tự động', 'Sáng', 'Tối', 'Đóng'],
  tl: ['Hitsura', 'Tema', 'Karaniwan', 'Banayad', 'Kuma', 'Kulay', 'Awtomatiko', 'Maliwanag', 'Madilim', 'Isara'],
  pt: ['Aparência', 'Tema', 'Padrão', 'Suave', 'Kuma', 'Modo de cor', 'Automático', 'Claro', 'Escuro', 'Fechar'],
  ne: ['देखावट', 'थिम', 'सामान्य', 'मधुर', 'Kuma', 'रङ मोड', 'स्वचालित', 'उज्यालो', 'अँध्यारो', 'बन्द गर्नुहोस्'],
};

function Options({ language }: { language: string }) {
  const copy = labels[language] ?? labels.en;
  const { mode, style, setMode, setStyle } = useContext(AppearanceContext);
  return <div className="kuma-appearance-options">
    <fieldset>
      <legend>{copy[1]}</legend>
      <div className="kuma-appearance-grid">
        {(['normal', 'soft', 'kuma'] as Style[]).map((value, index) => <button key={value} type="button" className="hk-appearance-option" aria-pressed={style === value} onClick={() => setStyle(value)}>
          <span className={`hk-theme-preview hk-theme-preview-${value}`} aria-hidden="true"><span className="hk-theme-preview-bar" /><span className="hk-theme-preview-cards"><span /><span /></span></span>
          <span>{copy[index + 2]}</span>
        </button>)}
      </div>
    </fieldset>
    <fieldset>
      <legend>{copy[5]}</legend>
      <div className="kuma-appearance-grid">
        {(['system', 'light', 'night'] as Mode[]).map((value, index) => <button key={value} type="button" className="hk-appearance-option" aria-pressed={mode === value} onClick={() => setMode(value)}>
          <span aria-hidden="true">{['◐', '☀', '☾'][index]}</span><span>{copy[index + 6]}</span>
        </button>)}
      </div>
    </fieldset>
  </div>;
}

export function AppearanceControl({ language = 'en', inline = false }: { language?: string; inline?: boolean }) {
  const copy = labels[language] ?? labels.en;
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = overflow; trigger.current?.focus(); };
  }, [open]);
  if (inline) return <section className="kuma-appearance-panel" aria-label={copy[0]}><h2>{copy[0]}</h2><Options language={language} /></section>;
  return <>
    <button ref={trigger} type="button" className="kuma-appearance-trigger" aria-haspopup="dialog" onClick={() => setOpen(true)}><span aria-hidden="true">◐</span><span>{copy[0]}</span></button>
    {open && <dialog ref={dialog} className="kuma-appearance-dialog" aria-labelledby={id} onCancel={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="kuma-appearance-dialog-content" onClick={event => event.stopPropagation()}>
        <div className="kuma-appearance-heading"><h2 id={id}>{copy[0]}</h2><button type="button" className="kuma-appearance-close" onClick={() => setOpen(false)}>{copy[9]}</button></div>
        <Options language={language} />
      </div>
    </dialog>}
  </>;
}
