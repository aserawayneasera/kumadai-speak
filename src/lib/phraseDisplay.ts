import type { Phrase, SlotKey, SlotOption } from '@/data/communicationBook';
import { renderTemplate } from '@/data/communicationBook';
import type { SpeechLanguage } from './speech';

export type UnderstandingLanguage = 'en' | 'ja' | 'id' | 'my' | 'zh' | 'ko' | 'vi';

export const LANGUAGE_OPTIONS: { id: UnderstandingLanguage; label: string; voiceLabel: string; speechLang: SpeechLanguage }[] = [
  { id: 'en', label: 'English', voiceLabel: 'English', speechLang: 'en-US' },
  { id: 'ja', label: 'Japanese', voiceLabel: 'Japanese', speechLang: 'ja-JP' },
  { id: 'id', label: 'Indonesian', voiceLabel: 'Bahasa Indonesia', speechLang: 'id-ID' },
  { id: 'my', label: 'Burmese', voiceLabel: 'မြန်မာ', speechLang: 'my-MM' },
  { id: 'zh', label: 'Chinese', voiceLabel: '中文', speechLang: 'zh-CN' },
  { id: 'ko', label: 'Korean', voiceLabel: '한국어', speechLang: 'ko-KR' },
  { id: 'vi', label: 'Vietnamese', voiceLabel: 'Tiếng Việt', speechLang: 'vi-VN' },
];

export function getLanguageLabel(language: UnderstandingLanguage) {
  return LANGUAGE_OPTIONS.find(item => item.id === language)?.label ?? 'English';
}

function selected(selections: Partial<Record<SlotKey, SlotOption>>, key: SlotKey, fallback = 'selected') {
  return selections[key]?.en ?? fallback;
}

const STAFF_TRANSLATIONS: Record<string, Partial<Record<UnderstandingLanguage, string>>> = {
  'h1-1': { id: 'Apakah ini kunjungan pertama Anda ke rumah sakit atau klinik ini?', my: 'ဒီဆေးရုံ သို့မဟုတ် ဆေးခန်းကို ပထမဆုံးလာတာလား။', zh: '这是您第一次来这家医院或诊所吗？', ko: '이 병원이나 클리닉에 처음 오셨나요?', vi: 'Đây có phải là lần đầu bạn đến bệnh viện hoặc phòng khám này không?' },
  'h1-2': { id: 'Tolong tunjukkan kartu asuransi kesehatan Anda.', my: 'ကျန်းမာရေးအာမခံကတ်ကို ပြပါ။', zh: '请出示您的健康保险卡。', ko: '건강보험증을 보여 주세요.', vi: 'Vui lòng cho xem thẻ bảo hiểm y tế.' },
  'h1-3': { id: 'Tolong isi formulir ini.', my: 'ဒီဖောင်ကို ဖြည့်ပါ။', zh: '请填写这张表格。', ko: '이 양식을 작성해 주세요.', vi: 'Vui lòng điền vào mẫu này.' },
  'h1-5': { id: 'Kami akan memanggil Anda saat giliran Anda tiba.', my: 'သင့်အလှည့်ရောက်ရင် ခေါ်ပါမယ်။', zh: '轮到您时我们会叫您。', ko: '순서가 되면 불러 드리겠습니다.', vi: 'Chúng tôi sẽ gọi bạn khi đến lượt.' },
  'h2-1': { id: 'Apa gejala Anda saat ini?', my: 'လက်ရှိ လက္ခဏာတွေက ဘာတွေလဲ။', zh: '您现在有什么症状？', ko: '현재 어떤 증상이 있습니까?', vi: 'Hiện tại bạn có triệu chứng gì?' },
  'h2-2': { id: 'Sejak kapan?', my: 'ဘယ်အချိန်ကတည်းကလဲ။', zh: '从什么时候开始？', ko: '언제부터입니까?', vi: 'Từ khi nào?' },
  'h2-4': { id: 'Apakah Anda alergi terhadap obat?', my: 'ဆေးဝါးနဲ့ ဓာတ်မတည့်တာ ရှိပါသလား။', zh: '您对药物过敏吗？', ko: '약 알레르기가 있습니까?', vi: 'Bạn có dị ứng với thuốc không?' },
  'h2-9': { id: 'Apakah ada rasa sakit?', my: 'နာကျင်မှု ရှိပါသလား။', zh: '您有疼痛吗？', ko: '통증이 있습니까?', vi: 'Bạn có bị đau không?' },
  'h2-10': { id: 'Mari kita ukur suhu tubuh Anda.', my: 'ကိုယ်အပူချိန် တိုင်းပါမယ်။', zh: '我们来量体温。', ko: '체온을 재겠습니다.', vi: 'Chúng ta hãy đo nhiệt độ cơ thể.' },
  'h3-1': { id: 'Kami akan melakukan tes darah.', my: 'သွေးစစ်ပါမယ်။', zh: '我们会做血液检查。', ko: '혈액검사를 하겠습니다.', vi: 'Chúng tôi sẽ xét nghiệm máu.' },
  'h3-4': { id: 'Anda perlu dirawat di rumah sakit.', my: 'ဆေးရုံတက်ရန် လိုအပ်ပါတယ်။', zh: '需要住院。', ko: '입원이 필요합니다.', vi: 'Bạn cần nhập viện.' },
  'h4-2': { id: 'Kami tidak menerima kartu kredit.', my: 'ခရက်ဒစ်ကတ် မรับပါ။', zh: '这里不能使用信用卡。', ko: '신용카드는 받지 않습니다.', vi: 'Chúng tôi không nhận thẻ tín dụng.' },
  'h4-3': { id: 'Hanya tunai.', my: 'ငွေသားပဲ ရပါတယ်။', zh: '只收现金。', ko: '현금만 가능합니다.', vi: 'Chỉ nhận tiền mặt.' },
  'w1-4': { id: 'Simpan ini dengan baik.', my: 'ဒါကို သေချာသိမ်းထားပါ။', zh: '请妥善保管。', ko: '잘 보관해 주세요.', vi: 'Vui lòng giữ cẩn thận.' },
  'e1-1': { id: 'Tolong beri tahu kami nama Anda.', my: 'သင့်အမည်ကို ပြောပြပါ။', zh: '请告诉我们您的姓名。', ko: '이름을 알려 주세요.', vi: 'Vui lòng cho biết tên của bạn.' },
  'e1-2': { id: 'Di mana kejadian itu terjadi?', my: 'ဖြစ်ရပ်က ဘယ်နေရာမှာ ဖြစ်ခဲ့တာလဲ။', zh: '事件发生在哪里？', ko: '사건이 어디에서 일어났습니까?', vi: 'Sự việc xảy ra ở đâu?' },
  'e1-3': { id: 'Kapan kejadian itu terjadi?', my: 'ဖြစ်ရပ်က ဘယ်နေ့ ဘယ်အချိန် ဖြစ်ခဲ့တာလဲ။', zh: '事件是什么时候发生的？', ko: '사건은 언제 일어났습니까?', vi: 'Sự việc xảy ra khi nào?' },
  'n1-9': { id: 'Tolong tutup katup utama gas.', my: 'ဓာတ်ငွေ့မိန်းခလုတ်ကို ပိတ်ပါ။', zh: '请关闭煤气总阀。', ko: '가스 밸브를 잠가 주세요.', vi: 'Vui lòng khóa van gas chính.' },
  'n1-10': { id: 'Tolong matikan listrik utama.', my: 'လျှပ်စစ်မိန်းခလုတ်ကို ပိတ်ပါ။', zh: '请关闭电源总开关。', ko: '차단기를 내려 주세요.', vi: 'Vui lòng tắt cầu dao điện.' },
  'n1-13': { id: 'Silakan evakuasi.', my: 'ဘေးကင်းရာသို့ ရွှေ့ပါ။', zh: '请避难。', ko: '대피해 주세요.', vi: 'Vui lòng sơ tán.' },
};

export function getTranslatedStaffText(phrase: Phrase, selections: Partial<Record<SlotKey, SlotOption>>, language: UnderstandingLanguage) {
  if (language === 'ja') return renderTemplate(phrase.ja, selections);
  if (language === 'en') return renderEnglishPhrase(phrase, selections);
  return STAFF_TRANSLATIONS[phrase.id]?.[language] ?? renderEnglishPhrase(phrase, selections);
}

export function hasTranslatedStaffText(phrase: Phrase, language: UnderstandingLanguage) {
  if (language === 'ja' || language === 'en') return true;
  return Boolean(STAFF_TRANSLATIONS[phrase.id]?.[language]);
}

export function renderEnglishPhrase(phrase: Phrase, selections: Partial<Record<SlotKey, SlotOption>>) {
  switch (phrase.id) {
    case 'h3-3': return `The result will be ready in ${selected(selections, 'number')} week(s).`;
    case 'h4-1': return `Today’s payment is ${selected(selections, 'amount')} yen.`;
    case 'h4-5': return `Please take this medicine ${selected(selections, 'number')} time(s) per day.`;
    case 'c1-8': return `We are going to do ${selected(selections, 'deliveryMethod')}.`;
    case 'c2-1': return `We will check your baby’s ${selected(selections, 'babyCheck')}.`;
    case 'c2-3': return `Please feed your baby every ${selected(selections, 'number')} hour(s).`;
    case 'c2-4': return `Your discharge date is planned for ${selected(selections, 'date')}.`;
    case 's1-2': return `The ${selected(selections, 'childAge')} class is available for application.`;
    case 's1-3': return `The application submission period is from ${selected(selections, 'date')} to ${selected(selections, 'date')}.`;
    case 's2-1': return `There will be ${selected(selections, 'classEvent')}.`;
    case 's2-2': return `Please bring ${selected(selections, 'thing')}.`;
    case 's2-4': return `There is a change about ${selected(selections, 'classEvent')}.`;
    case 'w1-1': return `The service window for ${selected(selections, 'procedure')} is over there.`;
    case 'w1-2': return `Please put ${selected(selections, 'document')} here.`;
    case 'w1-3': return `Please do not forget to bring ${selected(selections, 'document')}.`;
    case 'u1-2': return `They will be back on ${selected(selections, 'date')}.`;
    case 'u1-4': return `Please process that at ${selected(selections, 'office')}.`;
    case 'e1-12': return `Please show ${selected(selections, 'document')}.`;
    case 'u1-9': return `Please submit it by ${selected(selections, 'date')}.`;
    case 'u1-10': return `Please sign it by ${selected(selections, 'date')}.`;
    case 'n1-12': return `${selected(selections, 'utility')} cannot be used right now.`;
    case 'qb-symptom': return `I have ${selected(selections, 'symptom')} in or on my ${selected(selections, 'bodyPart')}.`;
    case 'qb-procedure': return `I would like to do ${selected(selections, 'procedure')}.`;
    case 'qb-go': return `I want to go to ${selected(selections, 'place')}.`;
    case 'qb-buy': return `Where can I buy ${selected(selections, 'thing')}?`;
    case 'qb-child-food': return `This child cannot eat ${selected(selections, 'food')}. The reason is ${selected(selections, 'reason')}.`;
    case 'qb-housing': return `I want rent around ${selected(selections, 'amount')} and a ${selected(selections, 'roomType')} room.`;
    case 'qb-language': return `Is there anyone who speaks ${selected(selections, 'language')}?`;
    case 'qb-disaster': return `Where is the evacuation place? Can we use ${selected(selections, 'utility')} now?`;
    default: return phrase.en;
  }
}

export function getPhraseDisplayText(phrase: Phrase | undefined, selections: Partial<Record<SlotKey, SlotOption>>, language: UnderstandingLanguage) {
  if (!phrase) return 'タップして話します';
  if (phrase.role === 'staff' || phrase.role === 'info') return getTranslatedStaffText(phrase, selections, language);
  return renderTemplate(phrase.ja, selections);
}

export function getPhraseSubText(phrase: Phrase | undefined, selections: Partial<Record<SlotKey, SlotOption>>, language: UnderstandingLanguage) {
  if (!phrase) return 'Choose a phrase card. It will speak immediately.';
  const ja = renderTemplate(phrase.ja, selections);
  const en = renderEnglishPhrase(phrase, selections);
  if (phrase.role === 'staff' || phrase.role === 'info') {
    if (language === 'ja') return en;
    if (!hasTranslatedStaffText(phrase, language)) return `Japanese staff phrase: ${ja} · English fallback until this card is translated.`;
    return `Japanese staff phrase: ${ja}`;
  }
  return en;
}

export function getPreviewLabels(phrase: Phrase | undefined, language: UnderstandingLanguage) {
  if (!phrase) return { eyebrow: 'Tap & Speak', title: 'Phrase preview', screenLabel: 'Tap a phrase card' };
  if (phrase.role === 'staff') return { eyebrow: 'Staff card', title: `Hear staff in ${getLanguageLabel(language)}`, screenLabel: 'Staff may say this' };
  if (phrase.role === 'info') return { eyebrow: 'Info card', title: `Read in ${getLanguageLabel(language)}`, screenLabel: 'Useful information' };
  return { eyebrow: 'Your card', title: 'Show Japanese to staff', screenLabel: 'Show this to staff' };
}

export function getSpeechTarget(phrase: Phrase, selections: Partial<Record<SlotKey, SlotOption>>, language: UnderstandingLanguage) {
  if (phrase.role === 'staff' || phrase.role === 'info') {
    const option = LANGUAGE_OPTIONS.find(item => item.id === language) ?? LANGUAGE_OPTIONS[0];
    const text = getTranslatedStaffText(phrase, selections, language);
    const lang = hasTranslatedStaffText(phrase, language) ? option.speechLang : 'en-US';
    return { text, lang };
  }
  return { text: renderTemplate(phrase.ja, selections), lang: 'ja-JP' as const };
}

export function getTapActionLabel(phrase: Phrase, language: UnderstandingLanguage) {
  if (phrase.role === 'staff' || phrase.role === 'info') {
    return hasTranslatedStaffText(phrase, language) ? `🔊 Tap to hear ${getLanguageLabel(language)}` : '🔊 Tap to hear English fallback';
  }
  return '🔊 Tap to speak Japanese';
}
