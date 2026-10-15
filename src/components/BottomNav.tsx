'use client';

import type { MainTab } from './types';
import { useEffect, useRef } from 'react';

const items: { id: MainTab; icon: string; label: string }[] = [
  { id: 'home', icon: '🧭', label: 'Home' },
  { id: 'speak', icon: '🗣️', label: 'Speak' },
  { id: 'translate', icon: '🎙️', label: 'Translate' },
  { id: 'staff', icon: '👂', label: 'Staff' },
  { id: 'saved', icon: '⭐', label: 'Saved' },
  { id: 'more', icon: '🧩', label: 'More' },
];

const labels: Record<string, string[]> = {
  en: ['Home', 'Speak', 'Translate', 'Staff', 'Saved', 'More'],
  ja: ['ホーム', '話す', '翻訳', '聞く', '保存', 'メニュー'],
  id: ['Beranda', 'Bicara', 'Terjemah', 'Staf', 'Disimpan', 'Lainnya'],
  my: ['ပင်မ', 'ပြောရန်', 'ဘာသာပြန်', 'ဝန်ထမ်း', 'သိမ်းထား', 'နောက်ထပ်'],
  zh: ['首页', '说话', '翻译', '听懂', '已保存', '更多'],
  ko: ['홈', '말하기', '번역', '듣기', '저장', '더보기'],
  vi: ['Trang chủ', 'Nói', 'Dịch', 'Nhân viên', 'Đã lưu', 'Thêm'],
};

export default function BottomNav({ active, onChange, language = 'en' }: { active: MainTab; onChange: (tab: MainTab) => void; language?: string }) {
  const nav = useRef<HTMLElement>(null);
  const copy = labels[language] ?? labels.en;
  useEffect(() => {
    const element = nav.current;
    if (!element) return;
    const resize = () => document.documentElement.style.setProperty('--kuma-nav-height', `${element.getBoundingClientRect().height}px`);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--kuma-nav-height'); };
  }, []);
  return (
    <nav ref={nav} aria-label="KumaSpeak" className="hk-app-nav kuma-bottom-nav fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-1 pt-2 backdrop-blur">
      <div className="mx-auto grid max-w-xl grid-cols-6 gap-0.5">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className="kuma-nav-item rounded-xl text-center transition"
            aria-label={copy[index]}
            aria-current={active === item.id ? 'page' : undefined}
          >
            <span aria-hidden="true" className="block text-lg leading-none">{item.icon}</span>
            <span className="kuma-nav-label">{copy[index]}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
