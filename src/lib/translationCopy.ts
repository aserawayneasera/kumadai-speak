import type { TranslationLanguage } from './translation';

const en = {
  title: 'Translate', subtitle: 'Speak or type. Translate both ways.',
  first: 'Your language', second: 'Other language', swap: 'Swap languages', talk: 'Talk', type: 'Type',
  finish: 'Finish', cancel: 'Cancel', starting: 'Starting microphone…', listening: 'Listening…', processing: 'Reading your voice…', translating: 'Translating…',
  input: 'What do you want to say?', placeholder: 'Type a sentence, or tap a microphone.', send: 'Translate', clear: 'Clear', newChat: 'New conversation',
  autoRead: 'Read translations aloud', review: 'Review voice text before translating',
  emptyTitle: 'One phone. Two languages.', emptyText: 'Tap your language and speak. The other person taps their language to reply.',
  read: 'Listen', copy: 'Copy', copied: 'Copied', show: 'Show', close: 'Close', edit: 'Edit',
  phrasebook: 'Saved phrase', online: 'Online translation', original: 'Original', result: 'Translation',
  suggestions: 'From KumaSpeak', suggestionHelp: 'Related cards. Choose one to use its wording.', openCard: 'Open card', usePhrase: 'Use phrase',
  offline: 'Online translation is unavailable. Exact saved phrases work here.',
  privacy: 'Browser voice uses your browser’s speech service. Online translation sends your sentence to OpenAI. Conversation text stays in this page until refresh or New conversation.',
  recordingPrivacy: 'Online voice sends a short recording to OpenAI, then translates the text. Tap Finish when you stop speaking.',
  privacyLink: 'Privacy', engine: 'Voice input', browser: 'Browser', recorder: 'Online recording',
  noVoice: 'Voice input is unavailable here. Type, or use your keyboard’s microphone.',
  noOutputVoice: 'Your device has no voice for this language. Read or copy the text.',
  denied: 'Allow microphone access in browser settings, or type your sentence.',
  failed: 'Translation failed. Your words are kept. Please try again.',
  speechFailed: 'Voice input failed. Try typing or choose Online recording.',
  noSpeech: 'No speech heard. Try again.', timeout: 'Taking too long. Please try again.',
  rateLimit: 'Please wait a minute before trying again.', tooLong: 'Use 1,000 characters or fewer.',
  sameLanguage: 'Choose two different languages.', copyFailed: 'Copy failed. Select and copy the text.',
  menuLanguage: 'Menu language', back: 'Back to cards', history: 'Conversation',
};

export type TranslationCopy = { [Key in keyof typeof en]: string };

const ja: TranslationCopy = {
  title: '翻訳', subtitle: '話す・入力する。双方向に翻訳。', first: '自分の言語', second: '相手の言語', swap: '言語を入れ替える', talk: '音声', type: '入力',
  finish: '完了', cancel: 'キャンセル', starting: 'マイクを準備中…', listening: '聞いています…', processing: '音声を文字に変換中…', translating: '翻訳中…',
  input: '何を伝えたいですか？', placeholder: '文章を入力するか、マイクを押してください。', send: '翻訳する', clear: '消去', newChat: '新しい会話',
  autoRead: '翻訳を読み上げる', review: '音声の文字を確認してから翻訳する', emptyTitle: 'スマホ1台で、2つの言語。', emptyText: '自分の言語を押して話してください。相手も自分の言語を押して返事をします。',
  read: '聞く', copy: 'コピー', copied: 'コピー済み', show: '大きく表示', close: '閉じる', edit: '編集', phrasebook: '保存されたフレーズ', online: 'オンライン翻訳', original: '原文', result: '翻訳',
  suggestions: 'KumaSpeakのフレーズ', suggestionHelp: '関連するカードです。使いたい表現を選んでください。', openCard: 'カードを開く', usePhrase: 'この表現を使う',
  offline: 'オンライン翻訳は利用できません。保存されたフレーズと一致する文章は翻訳できます。',
  privacy: 'ブラウザー音声入力はブラウザーの音声サービスを使います。オンライン翻訳では文章をOpenAIに送信します。会話は再読み込みか「新しい会話」までこの画面に残ります。',
  recordingPrivacy: 'オンライン音声入力では短い録音をOpenAIに送信して翻訳します。話し終わったら「完了」を押してください。',
  privacyLink: 'プライバシー', engine: '音声入力', browser: 'ブラウザー', recorder: 'オンライン録音', noVoice: 'この環境では音声入力を利用できません。入力するか、キーボードのマイクを使ってください。',
  noOutputVoice: 'この言語の読み上げ音声がありません。文字を読むかコピーしてください。', denied: 'ブラウザーの設定でマイクを許可するか、文章を入力してください。',
  failed: '翻訳できませんでした。入力は残っています。もう一度お試しください。', speechFailed: '音声入力に失敗しました。入力するか、オンライン録音を選んでください。',
  noSpeech: '音声を確認できませんでした。もう一度お試しください。', timeout: '時間がかかっています。もう一度お試しください。', rateLimit: '1分ほど待ってからお試しください。', tooLong: '1,000文字以内で入力してください。',
  sameLanguage: '異なる2つの言語を選んでください。', copyFailed: 'コピーできませんでした。文字を選択してコピーしてください。', menuLanguage: '画面の言語', back: 'カードに戻る', history: '会話',
};

const id: TranslationCopy = {
  title: 'Terjemahkan', subtitle: 'Bicara atau ketik. Terjemahkan dua arah.', first: 'Bahasa Anda', second: 'Bahasa lawan bicara', swap: 'Tukar bahasa', talk: 'Bicara', type: 'Ketik',
  finish: 'Selesai', cancel: 'Batal', starting: 'Menyiapkan mikrofon…', listening: 'Mendengarkan…', processing: 'Mengubah suara menjadi teks…', translating: 'Menerjemahkan…',
  input: 'Apa yang ingin Anda sampaikan?', placeholder: 'Ketik kalimat atau ketuk mikrofon.', send: 'Terjemahkan', clear: 'Hapus', newChat: 'Percakapan baru', autoRead: 'Bacakan terjemahan', review: 'Periksa teks suara sebelum menerjemahkan',
  emptyTitle: 'Satu ponsel. Dua bahasa.', emptyText: 'Ketuk bahasa Anda dan bicara. Lawan bicara mengetuk bahasanya untuk menjawab.', read: 'Dengarkan', copy: 'Salin', copied: 'Disalin', show: 'Tampilkan', close: 'Tutup', edit: 'Edit',
  phrasebook: 'Frasa tersimpan', online: 'Terjemahan online', original: 'Teks asli', result: 'Terjemahan', suggestions: 'Dari KumaSpeak', suggestionHelp: 'Kartu terkait. Pilih kartu untuk memakai kalimatnya.', openCard: 'Buka kartu', usePhrase: 'Gunakan frasa',
  offline: 'Terjemahan online tidak tersedia. Kalimat yang sama dengan frasa tersimpan tetap berfungsi.', privacy: 'Suara browser memakai layanan suara browser Anda. Terjemahan online mengirim kalimat ke OpenAI. Teks percakapan berada di halaman ini hingga dimuat ulang atau Percakapan baru.',
  recordingPrivacy: 'Suara online mengirim rekaman singkat ke OpenAI, lalu menerjemahkan teksnya. Ketuk Selesai setelah berbicara.', privacyLink: 'Privasi', engine: 'Input suara', browser: 'Browser', recorder: 'Rekaman online',
  noVoice: 'Input suara tidak tersedia. Ketik atau gunakan mikrofon keyboard Anda.', noOutputVoice: 'Perangkat Anda tidak memiliki suara untuk bahasa ini. Baca atau salin teks.', denied: 'Izinkan mikrofon di pengaturan browser, atau ketik kalimat Anda.',
  failed: 'Terjemahan gagal. Teks Anda tersimpan di sini. Silakan coba lagi.', speechFailed: 'Input suara gagal. Ketik atau pilih Rekaman online.', noSpeech: 'Tidak ada suara terdengar. Coba lagi.', timeout: 'Terlalu lama. Silakan coba lagi.', rateLimit: 'Tunggu satu menit sebelum mencoba lagi.', tooLong: 'Gunakan maksimal 1.000 karakter.',
  sameLanguage: 'Pilih dua bahasa yang berbeda.', copyFailed: 'Gagal menyalin. Pilih dan salin teks.', menuLanguage: 'Bahasa menu', back: 'Kembali ke kartu', history: 'Percakapan',
};

const zh: TranslationCopy = {
  title: '翻译', subtitle: '语音或打字，双向翻译。', first: '你的语言', second: '对方的语言', swap: '交换语言', talk: '语音', type: '打字', finish: '完成', cancel: '取消', starting: '正在启动麦克风…', listening: '正在聆听…', processing: '正在识别语音…', translating: '正在翻译…',
  input: '你想说什么？', placeholder: '输入句子或点击麦克风。', send: '翻译', clear: '清除', newChat: '新对话', autoRead: '朗读翻译', review: '翻译前检查语音文字', emptyTitle: '一部手机，两种语言。', emptyText: '点击你的语言并说话。对方点击自己的语言回复。',
  read: '听', copy: '复制', copied: '已复制', show: '大字显示', close: '关闭', edit: '编辑', phrasebook: '已保存的短语', online: '在线翻译', original: '原文', result: '译文', suggestions: 'KumaSpeak短语', suggestionHelp: '相关卡片。选择卡片以使用其内容。', openCard: '打开卡片', usePhrase: '使用短语',
  offline: '在线翻译不可用。与已保存短语完全一致的句子仍可翻译。', privacy: '浏览器语音使用浏览器的语音服务。在线翻译会将句子发送给OpenAI。对话文字留在此页面，刷新或开始新对话后清除。', recordingPrivacy: '在线语音会将短录音发送给OpenAI，再翻译文字。说完后点击完成。',
  privacyLink: '隐私', engine: '语音输入', browser: '浏览器', recorder: '在线录音', noVoice: '此处无法使用语音输入。请打字或使用键盘的麦克风。', noOutputVoice: '设备没有此语言的朗读声音。请阅读或复制文字。', denied: '请在浏览器设置中允许麦克风，或输入句子。',
  failed: '翻译失败。你的文字已保留，请重试。', speechFailed: '语音输入失败。请打字或选择在线录音。', noSpeech: '未听到语音，请重试。', timeout: '等待时间过长，请重试。', rateLimit: '请等待一分钟再试。', tooLong: '请使用1,000个字符以内。', sameLanguage: '请选择两种不同的语言。', copyFailed: '复制失败，请选择文字并复制。', menuLanguage: '界面语言', back: '返回卡片', history: '对话',
};

const ko: TranslationCopy = {
  title: '번역', subtitle: '말하거나 입력하세요. 양방향 번역.', first: '내 언어', second: '상대방 언어', swap: '언어 바꾸기', talk: '음성', type: '입력', finish: '완료', cancel: '취소', starting: '마이크 준비 중…', listening: '듣고 있어요…', processing: '음성을 문자로 변환 중…', translating: '번역 중…',
  input: '무엇을 말하고 싶으세요?', placeholder: '문장을 입력하거나 마이크를 누르세요.', send: '번역하기', clear: '지우기', newChat: '새 대화', autoRead: '번역 읽어주기', review: '음성 문자를 확인한 후 번역', emptyTitle: '휴대폰 하나. 두 가지 언어.', emptyText: '내 언어를 누르고 말하세요. 상대방도 자신의 언어를 눌러 답합니다.',
  read: '듣기', copy: '복사', copied: '복사됨', show: '크게 보기', close: '닫기', edit: '편집', phrasebook: '저장된 문구', online: '온라인 번역', original: '원문', result: '번역', suggestions: 'KumaSpeak 문구', suggestionHelp: '관련 카드입니다. 사용할 표현을 선택하세요.', openCard: '카드 열기', usePhrase: '문구 사용',
  offline: '온라인 번역을 사용할 수 없습니다. 저장된 문구와 일치하는 문장은 번역됩니다.', privacy: '브라우저 음성은 브라우저의 음성 서비스를 사용합니다. 온라인 번역은 문장을 OpenAI에 보냅니다. 대화는 새로고침 또는 새 대화 전까지 이 페이지에 남습니다.', recordingPrivacy: '온라인 음성은 짧은 녹음을 OpenAI에 보내 문자로 변환한 후 번역합니다. 말을 마치면 완료를 누르세요.',
  privacyLink: '개인정보', engine: '음성 입력', browser: '브라우저', recorder: '온라인 녹음', noVoice: '음성 입력을 사용할 수 없습니다. 입력하거나 키보드 마이크를 사용하세요.', noOutputVoice: '기기에 이 언어의 음성이 없습니다. 문자를 읽거나 복사하세요.', denied: '브라우저 설정에서 마이크를 허용하거나 문장을 입력하세요.',
  failed: '번역에 실패했습니다. 입력은 유지됩니다. 다시 시도하세요.', speechFailed: '음성 입력에 실패했습니다. 입력하거나 온라인 녹음을 선택하세요.', noSpeech: '음성이 들리지 않았습니다. 다시 시도하세요.', timeout: '시간이 너무 오래 걸립니다. 다시 시도하세요.', rateLimit: '1분 기다린 후 다시 시도하세요.', tooLong: '1,000자 이내로 입력하세요.', sameLanguage: '서로 다른 두 언어를 선택하세요.', copyFailed: '복사에 실패했습니다. 문자를 선택하여 복사하세요.', menuLanguage: '메뉴 언어', back: '카드로 돌아가기', history: '대화',
};

const vi: TranslationCopy = {
  title: 'Dịch', subtitle: 'Nói hoặc nhập. Dịch hai chiều.', first: 'Ngôn ngữ của bạn', second: 'Ngôn ngữ của người kia', swap: 'Đổi ngôn ngữ', talk: 'Nói', type: 'Nhập', finish: 'Xong', cancel: 'Hủy', starting: 'Đang mở micro…', listening: 'Đang nghe…', processing: 'Đang chuyển giọng nói thành chữ…', translating: 'Đang dịch…',
  input: 'Bạn muốn nói gì?', placeholder: 'Nhập câu hoặc chạm vào micro.', send: 'Dịch', clear: 'Xóa', newChat: 'Cuộc trò chuyện mới', autoRead: 'Đọc bản dịch', review: 'Kiểm tra chữ trước khi dịch giọng nói', emptyTitle: 'Một điện thoại. Hai ngôn ngữ.', emptyText: 'Chạm vào ngôn ngữ của bạn rồi nói. Người kia chạm vào ngôn ngữ của họ để trả lời.',
  read: 'Nghe', copy: 'Sao chép', copied: 'Đã sao chép', show: 'Hiện chữ lớn', close: 'Đóng', edit: 'Sửa', phrasebook: 'Câu đã lưu', online: 'Bản dịch trực tuyến', original: 'Câu gốc', result: 'Bản dịch', suggestions: 'Từ KumaSpeak', suggestionHelp: 'Thẻ liên quan. Chọn thẻ để dùng câu trên thẻ.', openCard: 'Mở thẻ', usePhrase: 'Dùng câu',
  offline: 'Dịch trực tuyến không khả dụng. Câu khớp hoàn toàn với câu đã lưu vẫn hoạt động.', privacy: 'Giọng nói trên trình duyệt dùng dịch vụ giọng nói của trình duyệt. Dịch trực tuyến gửi câu đến OpenAI. Nội dung hội thoại ở trang này đến khi tải lại hoặc chọn Cuộc trò chuyện mới.', recordingPrivacy: 'Giọng nói trực tuyến gửi bản ghi ngắn đến OpenAI, rồi dịch chữ. Chạm Xong khi nói xong.',
  privacyLink: 'Quyền riêng tư', engine: 'Nhập giọng nói', browser: 'Trình duyệt', recorder: 'Ghi âm trực tuyến', noVoice: 'Nhập giọng nói không khả dụng. Hãy nhập hoặc dùng micro trên bàn phím.', noOutputVoice: 'Thiết bị không có giọng đọc cho ngôn ngữ này. Hãy đọc hoặc sao chép chữ.', denied: 'Cho phép micro trong cài đặt trình duyệt, hoặc nhập câu.',
  failed: 'Dịch thất bại. Chữ của bạn được giữ lại. Hãy thử lại.', speechFailed: 'Nhập giọng nói thất bại. Hãy nhập hoặc chọn Ghi âm trực tuyến.', noSpeech: 'Không nghe thấy giọng nói. Hãy thử lại.', timeout: 'Chờ quá lâu. Hãy thử lại.', rateLimit: 'Đợi một phút rồi thử lại.', tooLong: 'Dùng tối đa 1.000 ký tự.', sameLanguage: 'Chọn hai ngôn ngữ khác nhau.', copyFailed: 'Sao chép thất bại. Chọn và sao chép chữ.', menuLanguage: 'Ngôn ngữ giao diện', back: 'Quay lại thẻ', history: 'Hội thoại',
};

const my: TranslationCopy = {
  title: 'ဘာသာပြန်', subtitle: 'ပြောပါ သို့မဟုတ် ရိုက်ထည့်ပါ။ နှစ်ဖက်ဘာသာပြန်။', first: 'သင့်ဘာသာစကား', second: 'တစ်ဖက်လူ၏ဘာသာစကား', swap: 'ဘာသာစကားလဲမည်', talk: 'အသံ', type: 'ရိုက်ထည့်', finish: 'ပြီးပြီ', cancel: 'ပယ်ဖျက်', starting: 'မိုက်ခရိုဖုန်း ပြင်ဆင်နေသည်…', listening: 'နားထောင်နေသည်…', processing: 'အသံကို စာသားပြောင်းနေသည်…', translating: 'ဘာသာပြန်နေသည်…',
  input: 'ဘာပြောချင်ပါသလဲ။', placeholder: 'စာကြောင်းရိုက်ထည့်ပါ သို့မဟုတ် မိုက်ခရိုဖုန်းကို နှိပ်ပါ။', send: 'ဘာသာပြန်', clear: 'ရှင်းမည်', newChat: 'စကားဝိုင်းအသစ်', autoRead: 'ဘာသာပြန်စာကို ဖတ်ပြမည်', review: 'ဘာသာမပြန်မီ အသံစာသားကို စစ်မည်', emptyTitle: 'ဖုန်းတစ်လုံး။ ဘာသာစကားနှစ်မျိုး။', emptyText: 'သင့်ဘာသာစကားကို နှိပ်ပြီး ပြောပါ။ တစ်ဖက်လူလည်း သူ့ဘာသာစကားကို နှိပ်ပြီး ပြန်ဖြေပါ။',
  read: 'နားထောင်', copy: 'ကူးယူ', copied: 'ကူးယူပြီး', show: 'စာလုံးကြီးပြ', close: 'ပိတ်', edit: 'ပြင်ဆင်', phrasebook: 'သိမ်းထားသော စကားစု', online: 'အွန်လိုင်းဘာသာပြန်', original: 'မူရင်း', result: 'ဘာသာပြန်', suggestions: 'KumaSpeak စကားစုများ', suggestionHelp: 'ဆက်စပ်ကတ်များ။ သုံးလိုသော စကားစုကို ရွေးပါ။', openCard: 'ကတ်ဖွင့်', usePhrase: 'စကားစုသုံး',
  offline: 'အွန်လိုင်းဘာသာပြန် မရပါ။ သိမ်းထားသော စကားစုနှင့် တူညီသောစာသားကို ဘာသာပြန်နိုင်ပါသည်။', privacy: 'ဘရောက်ဇာအသံသည် ဘရောက်ဇာ၏အသံဝန်ဆောင်မှုကို သုံးသည်။ အွန်လိုင်းဘာသာပြန်က စာကြောင်းကို OpenAI သို့ ပို့သည်။ စကားဝိုင်းကို စာမျက်နှာပြန်ဖွင့်ခြင်း သို့မဟုတ် စကားဝိုင်းအသစ် စတင်ခြင်းအထိ ဤစာမျက်နှာတွင် ထားသည်။', recordingPrivacy: 'အွန်လိုင်းအသံသည် အသံတိုကို OpenAI သို့ ပို့ပြီး စာသားကို ဘာသာပြန်သည်။ ပြောပြီးလျှင် ပြီးပြီကို နှိပ်ပါ။',
  privacyLink: 'ကိုယ်ရေးအချက်အလက်', engine: 'အသံထည့်သွင်း', browser: 'ဘရောက်ဇာ', recorder: 'အွန်လိုင်းအသံဖမ်း', noVoice: 'ဤနေရာတွင် အသံထည့်သွင်းမရပါ။ စာရိုက်ပါ သို့မဟုတ် ကီးဘုတ်မိုက်ခရိုဖုန်းကို သုံးပါ။', noOutputVoice: 'ဤဘာသာစကားအတွက် အသံဖတ်စနစ် မရှိပါ။ စာဖတ်ပါ သို့မဟုတ် ကူးယူပါ။', denied: 'ဘရောက်ဇာဆက်တင်တွင် မိုက်ခရိုဖုန်းကို ခွင့်ပြုပါ သို့မဟုတ် စာရိုက်ပါ။',
  failed: 'ဘာသာပြန်မရပါ။ သင့်စာသားကို ထားထားပါသည်။ ထပ်ကြိုးစားပါ။', speechFailed: 'အသံထည့်သွင်းမရပါ။ စာရိုက်ပါ သို့မဟုတ် အွန်လိုင်းအသံဖမ်းကို ရွေးပါ။', noSpeech: 'အသံမကြားရပါ။ ထပ်ကြိုးစားပါ။', timeout: 'အချိန်ကြာနေပါသည်။ ထပ်ကြိုးစားပါ။', rateLimit: 'တစ်မိနစ်စောင့်ပြီး ထပ်ကြိုးစားပါ။', tooLong: 'စာလုံးရေ ၁,၀၀၀ အောက် သုံးပါ။', sameLanguage: 'မတူညီသော ဘာသာစကားနှစ်မျိုးကို ရွေးပါ။', copyFailed: 'ကူးယူမရပါ။ စာသားရွေးပြီး ကူးယူပါ။', menuLanguage: 'မီနူးဘာသာစကား', back: 'ကတ်များသို့ ပြန်သွား', history: 'စကားဝိုင်း',
};

const COPIES: Record<TranslationLanguage, TranslationCopy> = { en, ja, id, my, zh, ko, vi };
export function getTranslationCopy(language: TranslationLanguage) { return COPIES[language]; }

export const NATIVE_LANGUAGE_NAMES: Record<TranslationLanguage, string> = {
  en: 'English', ja: '日本語', id: 'Bahasa Indonesia', my: 'မြန်မာ', zh: '中文', ko: '한국어', vi: 'Tiếng Việt',
};
export const NATIVE_TALK_LABELS: Record<TranslationLanguage, string> = {
  en: 'Speak English', ja: '日本語で話す', id: 'Bicara Indonesia', my: 'မြန်မာလိုပြော', zh: '说中文', ko: '한국어로 말하기', vi: 'Nói tiếng Việt',
};
