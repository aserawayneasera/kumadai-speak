export type Role = 'student' | 'staff' | 'info';
export type SlotKey =
  | 'bodyPart'
  | 'symptom'
  | 'condition'
  | 'drink'
  | 'food'
  | 'thing'
  | 'place'
  | 'document'
  | 'procedure'
  | 'person'
  | 'language'
  | 'transport'
  | 'number'
  | 'amount'
  | 'time'
  | 'date'
  | 'reason'
  | 'office'
  | 'roomType'
  | 'country'
  | 'familyType'
  | 'issue'
  | 'weather'
  | 'childAge'
  | 'classEvent'
  | 'babyCheck'
  | 'deliveryMethod'
  | 'utility';

export interface SlotOption {
  ja: string;
  en: string;
  romaji?: string;
}

export interface PhraseSlot {
  key: SlotKey;
  label: string;
}

export interface Phrase {
  id: string;
  role: Role;
  icon: string;
  en: string;
  ja: string;
  romaji?: string;
  slots?: PhraseSlot[];
  urgent?: boolean;
  tags?: string[];
}

export interface PhraseDeck {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  phrases: Phrase[];
}

export interface Category {
  id: string;
  label: string;
  short: string;
  icon: string;
  desc: string;
  color: string;
}

export interface VocabItem {
  ja: string;
  en: string;
  romaji?: string;
}

export interface VocabGroup {
  id: string;
  title: string;
  icon: string;
  items: VocabItem[];
}

export const categories: Category[] = [
  { id: 'hospital', label: 'Hospital', short: 'Hospital', icon: '🏥', desc: 'Reception, symptoms, examination, hospitalization and payment.', color: 'from-rose-600 to-pink-600' },
  { id: 'pregnancy', label: 'Pregnancy', short: 'Pregnancy', icon: '🤰', desc: 'Medical checks, worries, appointments and ward-office pregnancy procedures.', color: 'from-fuchsia-600 to-pink-600' },
  { id: 'childbirth', label: 'Childbirth', short: 'Birth', icon: '👶', desc: 'Labor, birth, after-birth care and baby checks.', color: 'from-orange-600 to-amber-600' },
  { id: 'school', label: 'School', short: 'School', icon: '🏫', desc: 'Applications, attendance, school supplies, lunch and parent communication.', color: 'from-blue-600 to-cyan-600' },
  { id: 'public', label: 'Public Service', short: 'Ward Office', icon: '🏛️', desc: 'Ward office, police, fire, emergency and official documents.', color: 'from-indigo-600 to-violet-600' },
  { id: 'housing', label: 'Real Estate', short: 'Housing', icon: '🏠', desc: 'Apartment search, rent, guarantor, room type and move-in questions.', color: 'from-emerald-600 to-teal-600' },
  { id: 'campus', label: 'University Office', short: 'Campus', icon: '🎓', desc: 'KU offices, supervisor, documents, job search and student procedures.', color: 'from-sky-600 to-indigo-600' },
  { id: 'daily', label: 'Daily Life', short: 'Daily', icon: '🌸', desc: 'Greetings, housework, neighbors, shopping, trash and simple conversations.', color: 'from-teal-600 to-emerald-600' },
  { id: 'transport', label: 'Transportation', short: 'Transport', icon: '🚌', desc: 'Bus, tram, train, shinkansen, maps, tickets and timing.', color: 'from-yellow-600 to-orange-600' },
  { id: 'disaster', label: 'Natural Disaster', short: 'Disaster', icon: '🆘', desc: 'Evacuation, water, supplies, Wi-Fi, utilities and emergency instructions.', color: 'from-red-700 to-orange-600' },
];

export const slotOptions: Record<SlotKey, SlotOption[]> = {
  bodyPart: [
    { ja: '頭', en: 'head', romaji: 'atama' },
    { ja: '顔', en: 'face', romaji: 'kao' },
    { ja: '首', en: 'neck', romaji: 'kubi' },
    { ja: '肩', en: 'shoulder', romaji: 'kata' },
    { ja: 'お腹', en: 'stomach', romaji: 'onaka' },
    { ja: '腰', en: 'back / waist', romaji: 'koshi' },
    { ja: '膝', en: 'knee', romaji: 'hiza' },
    { ja: '手', en: 'hand', romaji: 'te' },
    { ja: '指', en: 'finger', romaji: 'yubi' },
    { ja: '足', en: 'leg / foot', romaji: 'ashi' },
    { ja: '目', en: 'eye', romaji: 'me' },
    { ja: '歯', en: 'tooth', romaji: 'ha' },
  ],
  symptom: [
    { ja: '痛い', en: 'painful', romaji: 'itai' },
    { ja: '熱があります', en: 'fever', romaji: 'netsu ga arimasu' },
    { ja: '下痢です', en: 'diarrhea', romaji: 'geri desu' },
    { ja: '便秘です', en: 'constipation', romaji: 'benpi desu' },
    { ja: '吐き気があります', en: 'nausea', romaji: 'hakike ga arimasu' },
    { ja: '頭痛があります', en: 'headache', romaji: 'zutsuu ga arimasu' },
    { ja: '腹痛があります', en: 'stomachache', romaji: 'fukutsuu ga arimasu' },
    { ja: 'あざがあります', en: 'bruise', romaji: 'aza ga arimasu' },
    { ja: 'アレルギーがあります', en: 'allergy', romaji: 'arerugii ga arimasu' },
    { ja: '体調不良です', en: 'not feeling well', romaji: 'taichou furyou desu' },
  ],
  condition: [
    { ja: '頭痛', en: 'headache', romaji: 'zutsuu' },
    { ja: '腹痛', en: 'stomachache', romaji: 'fukutsuu' },
    { ja: '熱', en: 'fever', romaji: 'netsu' },
    { ja: '吐き気', en: 'nausea', romaji: 'hakike' },
    { ja: '下痢', en: 'diarrhea', romaji: 'geri' },
    { ja: '便秘', en: 'constipation', romaji: 'benpi' },
    { ja: 'アレルギー', en: 'allergy', romaji: 'arerugii' },
    { ja: 'つわり', en: 'morning sickness', romaji: 'tsuwari' },
  ],
  drink: [
    { ja: '水', en: 'water', romaji: 'mizu' },
    { ja: 'お茶', en: 'tea', romaji: 'ocha' },
    { ja: '麦茶', en: 'barley tea', romaji: 'mugicha' },
    { ja: 'ジュース', en: 'juice', romaji: 'juusu' },
    { ja: '牛乳', en: 'milk', romaji: 'gyuunyuu' },
    { ja: '薬', en: 'medicine', romaji: 'kusuri' },
  ],
  food: [
    { ja: 'ご飯', en: 'rice / meal', romaji: 'gohan' },
    { ja: '野菜', en: 'vegetables', romaji: 'yasai' },
    { ja: '魚', en: 'fish', romaji: 'sakana' },
    { ja: '肉', en: 'meat', romaji: 'niku' },
    { ja: '豚肉', en: 'pork', romaji: 'butaniku' },
    { ja: '鶏肉', en: 'chicken', romaji: 'toriniku' },
    { ja: '牛肉', en: 'beef', romaji: 'gyuuniku' },
    { ja: '馬肉', en: 'horse meat', romaji: 'baniku' },
    { ja: '卵', en: 'egg', romaji: 'tamago' },
    { ja: '小麦', en: 'wheat', romaji: 'komugi' },
    { ja: '乳製品', en: 'dairy products', romaji: 'nyuuseihin' },
    { ja: '砂糖', en: 'sugar', romaji: 'satou' },
  ],
  thing: [
    { ja: '薬', en: 'medicine', romaji: 'kusuri' },
    { ja: '書類', en: 'document', romaji: 'shorui' },
    { ja: '財布', en: 'wallet', romaji: 'saifu' },
    { ja: '携帯電話', en: 'mobile phone', romaji: 'keitai denwa' },
    { ja: '鍵', en: 'key', romaji: 'kagi' },
    { ja: 'パスポート', en: 'passport', romaji: 'pasupooto' },
    { ja: '在留カード', en: 'residence card', romaji: 'zairyuu kaado' },
    { ja: '自転車', en: 'bicycle', romaji: 'jitensha' },
    { ja: '洗濯物', en: 'laundry', romaji: 'sentakumono' },
    { ja: '指定ゴミ袋', en: 'official trash bag', romaji: 'shitei gomi bukuro' },
  ],
  place: [
    { ja: '区役所', en: 'ward office', romaji: 'kuyakusho' },
    { ja: '病院', en: 'hospital', romaji: 'byouin' },
    { ja: '薬局', en: 'pharmacy', romaji: 'yakkyoku' },
    { ja: '銀行', en: 'bank', romaji: 'ginkou' },
    { ja: '郵便局', en: 'post office', romaji: 'yuubinkyoku' },
    { ja: 'スーパー', en: 'supermarket', romaji: 'suupaa' },
    { ja: 'コンビニ', en: 'convenience store', romaji: 'konbini' },
    { ja: '大学', en: 'university', romaji: 'daigaku' },
    { ja: '避難所', en: 'evacuation shelter', romaji: 'hinanjo' },
    { ja: 'バス停', en: 'bus stop', romaji: 'basutei' },
    { ja: '駅', en: 'station', romaji: 'eki' },
  ],
  document: [
    { ja: '在留カード', en: 'residence card', romaji: 'zairyuu kaado' },
    { ja: 'パスポート', en: 'passport', romaji: 'pasupooto' },
    { ja: '健康保険証', en: 'health insurance card', romaji: 'kenkou hokenshou' },
    { ja: '学生証', en: 'student ID', romaji: 'gakuseishou' },
    { ja: 'マイナンバーカード', en: 'My Number card', romaji: 'mai nanbaa kaado' },
    { ja: '住民票', en: 'proof of residence', romaji: 'juuminhyou' },
    { ja: '母子手帳', en: "mother's book", romaji: 'boshi techou' },
    { ja: '銀行口座', en: 'bank account', romaji: 'ginkou kouza' },
    { ja: 'コピー', en: 'copy', romaji: 'kopii' },
    { ja: '領収書', en: 'receipt', romaji: 'ryoushuusho' },
  ],
  procedure: [
    { ja: '住居異動届', en: 'moving-in / residence registration', romaji: 'juukyo idou todoke' },
    { ja: '国民健康保険', en: 'National Health Insurance', romaji: 'kokumin kenkou hoken' },
    { ja: '国民年金', en: 'National Pension', romaji: 'kokumin nenkin' },
    { ja: 'マイナンバー', en: 'My Number', romaji: 'mai nanbaa' },
    { ja: '印鑑登録', en: 'inkan registration', romaji: 'inkan touroku' },
    { ja: '証明書交付', en: 'certificate issuance', romaji: 'shoumeisho koufu' },
    { ja: '海外転出手続', en: 'moving-out from Japan procedure', romaji: 'kokugai tenshutsu tetsuzuki' },
  ],
  person: [
    { ja: '私', en: 'me', romaji: 'watashi' },
    { ja: '友人', en: 'friend', romaji: 'yuujin' },
    { ja: '家族', en: 'family', romaji: 'kazoku' },
    { ja: '妻', en: 'wife', romaji: 'tsuma' },
    { ja: '夫', en: 'husband', romaji: 'otto' },
    { ja: '子供', en: 'child', romaji: 'kodomo' },
    { ja: 'チューター', en: 'tutor', romaji: 'chuutaa' },
    { ja: '指導教員', en: 'supervisor', romaji: 'shidou kyouin' },
    { ja: '先生', en: 'teacher', romaji: 'sensei' },
  ],
  language: [
    { ja: '英語', en: 'English', romaji: 'eigo' },
    { ja: '日本語', en: 'Japanese', romaji: 'nihongo' },
    { ja: 'インドネシア語', en: 'Indonesian', romaji: 'indoneshiago' },
    { ja: 'ミャンマー語', en: 'Burmese', romaji: 'myanmaago' },
    { ja: '中国語', en: 'Chinese', romaji: 'chuugokugo' },
    { ja: '韓国語', en: 'Korean', romaji: 'kankokugo' },
    { ja: 'ベトナム語', en: 'Vietnamese', romaji: 'betonamugo' },
  ],
  transport: [
    { ja: 'バス', en: 'bus', romaji: 'basu' },
    { ja: '市電', en: 'tram', romaji: 'shiden' },
    { ja: '電車', en: 'train', romaji: 'densha' },
    { ja: '新幹線', en: 'bullet train', romaji: 'shinkansen' },
    { ja: 'タクシー', en: 'taxi', romaji: 'takushii' },
  ],
  number: ['1','2','3','4','5','6','7','8','9','10'].map(n => ({ ja: n, en: n })),
  amount: ['30000','40000','50000','60000','70000','80000','100000'].map(n => ({ ja: n, en: `¥${Number(n).toLocaleString()}` })),
  time: [
    { ja: '今', en: 'now', romaji: 'ima' },
    { ja: '今日', en: 'today', romaji: 'kyou' },
    { ja: '明日', en: 'tomorrow', romaji: 'ashita' },
    { ja: '午前', en: 'morning / A.M.', romaji: 'gozen' },
    { ja: '午後', en: 'afternoon / P.M.', romaji: 'gogo' },
    { ja: '10時', en: '10:00', romaji: 'juu ji' },
    { ja: '13時', en: '13:00', romaji: 'juu san ji' },
    { ja: '17時', en: '17:00', romaji: 'juu nana ji' },
  ],
  date: [
    { ja: '今日', en: 'today', romaji: 'kyou' },
    { ja: '明日', en: 'tomorrow', romaji: 'ashita' },
    { ja: '今週', en: 'this week', romaji: 'konshuu' },
    { ja: '来週', en: 'next week', romaji: 'raishuu' },
    { ja: '月曜日', en: 'Monday', romaji: 'getsuyoubi' },
    { ja: '金曜日', en: 'Friday', romaji: 'kinyoubi' },
  ],
  reason: [
    { ja: '医学的理由', en: 'medical reason', romaji: 'igakuteki riyuu' },
    { ja: '宗教上の理由', en: 'religious reason', romaji: 'shuukyoujou no riyuu' },
    { ja: 'アレルギー', en: 'allergy', romaji: 'arerugii' },
    { ja: '予定があります', en: 'I have plans', romaji: 'yotei ga arimasu' },
    { ja: '子供の都合', en: 'child-related reason', romaji: 'kodomo no tsugou' },
    { ja: '体調不良', en: 'poor health', romaji: 'taichou furyou' },
  ],
  office: [
    { ja: '国際教育課', en: 'International Student Office', romaji: 'kokusai kyouiku ka' },
    { ja: '区役所', en: 'ward office', romaji: 'kuyakusho' },
    { ja: '学部の事務室', en: 'faculty office', romaji: 'gakubu no jimusho' },
    { ja: '銀行', en: 'bank', romaji: 'ginkou' },
    { ja: '不動産会社', en: 'real estate company', romaji: 'fudousan gaisha' },
    { ja: '入国管理局', en: 'immigration office', romaji: 'nyuukoku kanri kyoku' },
  ],
  roomType: [
    { ja: '1R', en: 'one-room studio' },
    { ja: '1K', en: 'one room + kitchen' },
    { ja: '1DK', en: 'one room + dining kitchen' },
    { ja: '1LDK', en: 'one bedroom + living/dining/kitchen' },
    { ja: '2LDK', en: 'two bedrooms + living/dining/kitchen' },
    { ja: '家具付き', en: 'furnished', romaji: 'kagu tsuki' },
  ],
  country: [
    { ja: 'サモア', en: 'Samoa', romaji: 'samoa' },
    { ja: 'インドネシア', en: 'Indonesia', romaji: 'indoneshia' },
    { ja: 'ミャンマー', en: 'Myanmar', romaji: 'myanmaa' },
    { ja: 'ブラジル', en: 'Brazil', romaji: 'burajiru' },
    { ja: '中国', en: 'China', romaji: 'chuugoku' },
    { ja: '韓国', en: 'Korea', romaji: 'kankoku' },
    { ja: 'ベトナム', en: 'Vietnam', romaji: 'betonamu' },
  ],
  familyType: [
    { ja: '1人', en: 'by myself', romaji: 'hitori' },
    { ja: '家族', en: 'with family', romaji: 'kazoku' },
    { ja: '友人', en: 'with a friend', romaji: 'yuujin' },
  ],
  issue: [
    { ja: '水漏れ', en: 'water leak', romaji: 'mizumore' },
    { ja: 'ガス漏れ', en: 'gas leak', romaji: 'gasumore' },
    { ja: '停電', en: 'blackout', romaji: 'teiden' },
    { ja: 'エアコン', en: 'air conditioner', romaji: 'eakon' },
    { ja: '水道管', en: 'water pipe', romaji: 'suidoukan' },
    { ja: 'トイレ', en: 'toilet', romaji: 'toire' },
    { ja: '洗濯機', en: 'washing machine', romaji: 'sentakuki' },
    { ja: 'インターネット', en: 'internet', romaji: 'intaanetto' },
  ],
  weather: [
    { ja: '晴れ', en: 'sunny', romaji: 'hare' },
    { ja: '雨', en: 'rainy', romaji: 'ame' },
    { ja: '曇り', en: 'cloudy', romaji: 'kumori' },
    { ja: '台風', en: 'typhoon', romaji: 'taifuu' },
    { ja: '暑い', en: 'hot', romaji: 'atsui' },
    { ja: '寒い', en: 'cold', romaji: 'samui' },
  ],
  childAge: ['0','1','2','3','4','5','6'].map(n => ({ ja: n, en: `${n} years old` })),
  classEvent: [
    { ja: '面談', en: 'parent-teacher meeting', romaji: 'mendan' },
    { ja: '運動会', en: 'sports day', romaji: 'undoukai' },
    { ja: '保護者会', en: 'PTA meeting', romaji: 'hogoshakai' },
    { ja: '授業参観日', en: "parent's visit day", romaji: 'jugyou sankanbi' },
    { ja: '遠足', en: 'field trip', romaji: 'ensoku' },
    { ja: '給食費', en: 'lunch fee', romaji: 'kyuushoku hi' },
  ],
  babyCheck: [
    { ja: '体重', en: 'weight', romaji: 'taijuu' },
    { ja: '聴覚', en: 'hearing', romaji: 'choukaku' },
    { ja: '黄疸', en: 'jaundice', romaji: 'oudan' },
    { ja: '体温', en: 'temperature', romaji: 'taion' },
    { ja: '授乳', en: 'feeding', romaji: 'junyuu' },
  ],
  deliveryMethod: [
    { ja: '自然分娩', en: 'natural birth', romaji: 'shizen bunben' },
    { ja: '無痛分娩', en: 'epidural delivery', romaji: 'mutsuu bunben' },
    { ja: '帝王切開', en: 'C-section', romaji: 'teiou sekkai' },
    { ja: '会陰切開', en: 'episiotomy', romaji: 'ein sekkai' },
  ],
  utility: [
    { ja: '水', en: 'water', romaji: 'mizu' },
    { ja: 'ガス', en: 'gas', romaji: 'gasu' },
    { ja: '電気', en: 'electricity', romaji: 'denki' },
    { ja: '無料Wi-Fi', en: 'free Wi-Fi', romaji: 'muryou wai fai' },
  ],
};

const student = 'student' as const;
const staff = 'staff' as const;
const info = 'info' as const;

export const phraseDecks: PhraseDeck[] = [
  {
    id: 'hospital-reception', categoryId: 'hospital', title: 'Hospital 1, Reception', subtitle: 'First visit, insurance card, forms and basic symptoms.', icon: '🏥', color: 'from-rose-600 to-pink-600', phrases: [
      { id: 'h1-1', role: staff, icon: '👩‍⚕️', ja: '当院は初めてですか？', en: 'Is this your first visit at this hospital or clinic?', romaji: 'Touin wa hajimete desu ka?' },
      { id: 'h1-2', role: staff, icon: '👩‍⚕️', ja: '初診料がかかります。', en: 'There will be a first-visit fee.', romaji: 'Shoshin ryou ga kakarimasu.' },
      { id: 'h1-3', role: staff, icon: '💳', ja: '保険証を見せてください。', en: 'Please show your health insurance card.', romaji: 'Hokenshou o misete kudasai.' },
      { id: 'h1-4', role: staff, icon: '📝', ja: 'これに記入をお願いします。', en: 'Please fill out this form.', romaji: 'Kore ni kinyuu o onegai shimasu.' },
      { id: 'h1-5', role: staff, icon: '✅', ja: '英語で大丈夫です。', en: 'English is fine.', romaji: 'Eigo de daijoubu desu.' },
      { id: 'h1-6', role: staff, icon: '⏳', ja: '順番になったらお呼びします。', en: 'We will call you when it is your turn.', romaji: 'Junban ni nattara oyobi shimasu.' },
      { id: 'h1-7', role: student, icon: '🤒', ja: '私は{{bodyPart}}が{{symptom}}。', en: 'I have a symptom in or on my selected body part.', romaji: 'Watashi wa BODY PARTS ga SYMPTOM.', slots: [{ key: 'bodyPart', label: 'Body part' }, { key: 'symptom', label: 'Symptom' }], tags: ['blank', 'symptom'] },
      { id: 'h1-8', role: student, icon: '🤕', ja: '私は{{condition}}があります。', en: 'I have the selected condition.', romaji: 'Watashi wa CONDITION ga arimasu.', slots: [{ key: 'condition', label: 'Condition' }] },
      { id: 'h1-9', role: student, icon: '🪪', ja: '{{document}}を今日は持ってくるのを忘れました。', en: 'I forgot to bring this document today.', romaji: 'DOCUMENT o kyou wa motte kuru no o wasuremashita.', slots: [{ key: 'document', label: 'Document' }] },
    ]
  },
  {
    id: 'hospital-interview', categoryId: 'hospital', title: 'Hospital 2, Examination Interview', subtitle: 'Questions from staff and quick answers about pain, allergies and condition.', icon: '🩺', color: 'from-rose-600 to-red-600', phrases: [
      { id: 'h2-1', role: staff, icon: '❓', ja: '現在どういった症状ですか？', en: 'What are your current symptoms?', romaji: 'Genzai dou itta shoujou desu ka?' },
      { id: 'h2-2', role: staff, icon: '🕒', ja: 'いつからですか？', en: 'Since when?', romaji: 'Itsu kara desu ka?' },
      { id: 'h2-3', role: staff, icon: '📍', ja: 'どこでそれは起きましたか？', en: 'Where did it happen?', romaji: 'Doko de sore wa okimashita ka?' },
      { id: 'h2-4', role: staff, icon: '💊', ja: 'お薬へのアレルギーはありますか？', en: 'Do you have any allergies to medicines?', romaji: 'Okusuri e no arerugii wa arimasu ka?' },
      { id: 'h2-5', role: staff, icon: '🤰', ja: '現在妊娠の可能性はありますか？', en: 'Are you currently pregnant?', romaji: 'Genzai ninshin no kanousei wa arimasu ka?' },
      { id: 'h2-9', role: staff, icon: '🤕', ja: '痛みはありますか？', en: 'Do you have any pain?', romaji: 'Itami wa arimasu ka?' },
      { id: 'h2-10', role: staff, icon: '🌡️', ja: '熱をはかりましょう。', en: 'Let’s check your body temperature.', romaji: 'Netsu o hakarimashou.' },
      { id: 'h2-11', role: staff, icon: '💧', ja: '点滴の必要があります。', en: 'You need to have an intravenous drip.', romaji: 'Tenteki no hitsuyou ga arimasu.' },
      { id: 'h2-12', role: staff, icon: '💉', ja: '注射の必要があります。', en: 'You need to have an injection.', romaji: 'Chuusha no hitsuyou ga arimasu.' },
      { id: 'h2-13', role: staff, icon: '💊', ja: '薬をお出ししておきます。', en: 'I will provide you with some medicine.', romaji: 'Kusuri o odashi shite okimasu.' },
      { id: 'h2-14', role: staff, icon: '🍽️', ja: '食事の制限が必要です。', en: 'You need some dietary restrictions.', romaji: 'Shokuji no seigen ga hitsuyou desu.' },
      { id: 'h2-6', role: student, icon: '🚕', ja: '{{transport}}で来ました。', en: 'I came here by the selected transportation.', romaji: 'TRANSPORT de kimashita.', slots: [{ key: 'transport', label: 'Transport' }] },
      { id: 'h2-7', role: student, icon: '🍽️', ja: '食事はあまり食べられていません。', en: 'I have not been eating well.', romaji: 'Shokuji wa amari taberarete imasen.' },
      { id: 'h2-8', role: student, icon: '😴', ja: '睡眠はあまりとれていません。', en: 'I have not been sleeping well.', romaji: 'Suimin wa amari torete imasen.' },
    ]
  },
  {
    id: 'hospital-stay', categoryId: 'hospital', title: 'Hospital 3, Hospitalization and Check-up', subtitle: 'Tests, waiting, wants, calls, shower, food and comfort needs.', icon: '🛏️', color: 'from-red-600 to-orange-600', phrases: [
      { id: 'h3-1', role: staff, icon: '🧪', ja: '血液検査をします。', en: 'We will do a blood test.', romaji: 'Ketsueki kensa o shimasu.' },
      { id: 'h3-2', role: staff, icon: '🚽', ja: '検尿カップを提出してください。', en: 'Please submit your urine cup.', romaji: 'Kennyou kappu o teishutsu shite kudasai.' },
      { id: 'h3-3', role: staff, icon: '📅', ja: '結果は{{number}}週間後です。', en: 'The result will be ready in the selected number of weeks.', romaji: 'Kekka wa NUMBER shuukan go desu.', slots: [{ key: 'number', label: 'Weeks' }] },
      { id: 'h3-4', role: staff, icon: '🏥', ja: '入院の必要があります。', en: 'Hospitalization is necessary.', romaji: 'Nyuin no hitsuyou ga arimasu.' },
      { id: 'h3-5', role: staff, icon: '🔪', ja: '手術の必要があります？', en: 'Surgery is necessary?', romaji: 'Shusetsu no hitsuyou ga arimasu' },
      { id: 'h3-6', role: student, icon: '🥤', ja: '{{drink}}が飲みたいです。', en: 'I want to drink the selected item.', romaji: 'DRINK ga nomitai desu.', slots: [{ key: 'drink', label: 'Drink' }] },
      { id: 'h3-7', role: student, icon: '🍱', ja: '{{food}}が食べたいです。', en: 'I want to eat the selected item.', romaji: 'FOOD ga tabetai desu.', slots: [{ key: 'food', label: 'Food' }] },
      { id: 'h3-8', role: student, icon: '📞', ja: '{{person}}へ電話したいです。', en: 'I want to call the selected person.', romaji: 'PERSON e denwa shitai desu.', slots: [{ key: 'person', label: 'Person' }] },
      { id: 'h3-9', role: student, icon: '🚶', ja: '{{place}}へ行きたいです。', en: 'I want to go to the selected place.', romaji: 'PLACE e ikitai desu.', slots: [{ key: 'place', label: 'Place' }] },
      { id: 'h3-10', role: student, icon: '🧥', ja: '{{thing}}を外したいです。', en: 'I want to take off the selected item.', romaji: 'THING o hazushitai desu.', slots: [{ key: 'thing', label: 'Thing' }] },
    ]
  },
  {
    id: 'hospital-payment', categoryId: 'hospital', title: 'Hospital 4, Payment and Medicine', subtitle: 'Cash, card, medicine, pharmacy, dosage and taxi.', icon: '💴', color: 'from-orange-600 to-amber-600', phrases: [
      { id: 'h4-1', role: staff, icon: '💴', ja: '本日のお会計は{{amount}}円です。', en: 'Today’s payment is the selected amount in yen.', romaji: 'Honjitsu no okaikei wa AMOUNT en desu.', slots: [{ key: 'amount', label: 'Yen' }] },
      { id: 'h4-2', role: staff, icon: '💳', ja: 'クレジットカードは受け付けておりません。', en: 'We cannot accept credit cards here.', romaji: 'Kurejitto kaado wa uketsukete orimasen.' },
      { id: 'h4-3', role: staff, icon: '💵', ja: '現金のみです。', en: 'Cash only.', romaji: 'Genkin nomi desu.' },
      { id: 'h4-4', role: staff, icon: '💊', ja: '薬局でこの紙を見せ、薬を受け取ってください。', en: 'Please show this paper at the pharmacy and receive your medicine.', romaji: 'Yakkyoku de kono kami o mise, kusuri o uketotte kudasai.' },
      { id: 'h4-5', role: staff, icon: '🔁', ja: '1日{{number}}回飲んでください。', en: 'Please take this medicine the selected number of times per day.', romaji: 'Ichinichi NUMBER kai nonde kudasai.', slots: [{ key: 'number', label: 'Times per day' }] },
      { id: 'h4-6', role: staff, icon: '🚕', ja: 'タクシーは必要ですか？', en: 'Do you need a taxi?', romaji: 'Takushii wa hitsuyou desu ka?' },
      { id: 'h4-7', role: staff, icon: '👥', ja: '日本語が話せる友人または家族はいますか？', en: 'Do you have a friend or family member who can speak Japanese?', romaji: 'Nihongo ga hanaseru yuujin matawa kazoku wa imasu ka?' },
      { id: 'h4-8', role: staff, icon: '📞', ja: '何か気になることがあったら、この番号に連絡してください。', en: 'Please contact this number if you have a question or concern.', romaji: 'Nani ka kininaru koto ga attara, kono bangou ni renraku shite kudasai.' },
      { id: 'h4-7', role: student, icon: '🗣️', ja: '{{language}}が話せる友人または家族がいます。', en: 'I have a friend or family member who speaks the selected language.', romaji: 'LANGUAGE ga hanaseru yuujin mata wa kazoku ga imasu.', slots: [{ key: 'language', label: 'Language' }] },
    ]
  },
  {
    id: 'pregnancy-exam', categoryId: 'pregnancy', title: 'Pregnancy 1, Medical Examination', subtitle: 'Pain, worries, food, medicine, religious concerns and gender preference.', icon: '🤰', color: 'from-fuchsia-600 to-pink-600', phrases: [
      { id: 'p1-1', role: staff, icon: '🤰', ja: 'これまでに妊娠したことはありますか？', en: 'Have you been pregnant in the past?', romaji: 'Koremade ni ninshin shita koto wa arimasu ka?' },
      { id: 'p1-2', role: staff, icon: '📆', ja: '月経は定期的ですか、または不定期ですか？', en: 'Does your period come regularly or irregularly?', romaji: 'Gekkei wa teikiteki desu ka, matawa futeiki desu ka?' },
      { id: 'p1-3', role: student, icon: '💊', ja: 'この薬は飲めますか？', en: 'Can I take this medicine?', romaji: 'Kono kusuri wa nomemasu ka?' },
      { id: 'p1-4', role: student, icon: '😟', ja: '{{thing}}について不安です。', en: 'I am worried about the selected thing.', romaji: 'THING ni tsuite fuan desu.', slots: [{ key: 'thing', label: 'Concern' }] },
      { id: 'p1-5', role: student, icon: '🩺', ja: '{{bodyPart}}に痛みを感じます。', en: 'I have pain in the selected body part.', romaji: 'BODY PART ni itami o kanjimasu.', slots: [{ key: 'bodyPart', label: 'Body part' }] },
      { id: 'p1-6', role: student, icon: '🍽️', ja: '{{food}}を食べても問題はないですか？', en: 'Is there any problem eating the selected food?', romaji: 'FOOD o tabetemo mondai wa nai desu ka?', slots: [{ key: 'food', label: 'Food' }] },
      { id: 'p1-7', role: student, icon: '🙏', ja: '{{thing}}は宗教上難しいです。', en: 'The selected thing is difficult for religious reasons.', romaji: 'THING wa shuukyoujou muzukashii desu.', slots: [{ key: 'thing', label: 'Thing' }] },
      { id: 'p1-8', role: student, icon: '👶', ja: '性別を知りたいです。', en: 'I would like to know the gender.', romaji: 'Seibetsu o shiritai desu.' },
      { id: 'p1-9', role: student, icon: '🙈', ja: '出産まで性別は知らなくていいです。', en: 'I do not want to know the gender until birth.', romaji: 'Shussan made seibetsu wa shiranakute ii desu.' },
    ]
  },
  {
    id: 'pregnancy-procedures', categoryId: 'pregnancy', title: 'Pregnancy 2, Documentation', subtitle: 'Mother’s book, forms, appointments, questions and mother classes.', icon: '📘', color: 'from-fuchsia-600 to-violet-600', phrases: [
      { id: 'p2-1', role: staff, icon: '📘', ja: '母子手帳はお持ちですか？', en: "Do you have the mother's book with you?", romaji: 'Boshi techou wa omochi desu ka?' },
      { id: 'p2-2', role: staff, icon: '🏛️', ja: '妊娠届出書を区役所へ持って行ってください。', en: 'Please take the pregnancy registration form to the ward office.', romaji: 'Ninshin todokedesho o kuyakusho e motte itte kudasai.' },
      { id: 'p2-3', role: staff, icon: '📞', ja: '質問があったら、ここに電話してください。', en: 'Please call here if you have any questions.', romaji: 'Shitsumon ga attara, koko ni denwa shite kudasai.' },
      { id: 'p2-4', role: student, icon: '🧑‍🏫', ja: '{{thing}}の母親学級を受けたいです。', en: 'I would like to take a mother’s class about the selected topic.', romaji: 'THING no hahaoya gakkyuu o uketai desu.', slots: [{ key: 'thing', label: 'Topic' }] },
      { id: 'p2-5', role: student, icon: '🛒', ja: '{{thing}}はどこで購入できますか？', en: 'Where can I buy the selected item?', romaji: 'THING wa doko de kounyuu dekimasu ka?', slots: [{ key: 'thing', label: 'Item' }] },
      { id: 'p2-6', role: student, icon: '📅', ja: '{{date}}に次回の予約をしたいです。', en: 'I want to make the next appointment on the selected date.', romaji: 'DATE ni jikai no yoyaku o shitai desu.', slots: [{ key: 'date', label: 'Date' }] },
      { id: 'p2-7', role: student, icon: '❌', ja: '次回の予約をキャンセルできますか？', en: 'Can I cancel the next appointment?', romaji: 'Jikai no yoyaku o kyanseru dekimasu ka?' },
      { id: 'p2-8', role: student, icon: '🤒', ja: '{{condition}}があります。大丈夫でしょうか？', en: 'I have the selected condition. Is it normal?', romaji: 'CONDITION ga arimasu. Daijoubu deshou ka?', slots: [{ key: 'condition', label: 'Condition' }] },
    ]
  },
  {
    id: 'childbirth-labor', categoryId: 'childbirth', title: 'Childbirth 1, Labor and Birth', subtitle: 'Water broke, contractions, pain, taxi, hospital and current location.', icon: '👶', color: 'from-orange-600 to-red-600', phrases: [
      { id: 'c1-1', role: student, icon: '💧', ja: '破水しました。', en: 'My water broke.', romaji: 'Hasui shimashita.', urgent: true },
      { id: 'c1-2', role: student, icon: '⏱️', ja: '{{number}}分おきに陣痛が来ています。', en: 'I have contractions every selected number of minutes.', romaji: 'NUMBER pun oki ni jintsuu ga kiteimasu.', slots: [{ key: 'number', label: 'Minutes' }], urgent: true },
      { id: 'c1-3', role: student, icon: '🚨', ja: '痛みが強いです。', en: 'I have strong pain.', romaji: 'Itami ga tsuyoi desu.', urgent: true },
      { id: 'c1-4', role: student, icon: '🚕', ja: 'タクシーを呼んでください。', en: 'Please call a taxi.', romaji: 'Takushii o yonde kudasai.', urgent: true },
      { id: 'c1-5', role: student, icon: '🏥', ja: '{{place}}まで行きたいです。', en: 'I want to go to the selected place.', romaji: 'PLACE made ikitai desu.', slots: [{ key: 'place', label: 'Place' }] },
      { id: 'c1-6', role: student, icon: '📍', ja: '今私は{{place}}にいます。', en: 'I am at the selected place now.', romaji: 'Ima watashi wa PLACE ni imasu.', slots: [{ key: 'place', label: 'Place' }] },
      { id: 'c1-7', role: student, icon: '👪', ja: '{{person}}がもうすぐ来ます。', en: 'The selected person is coming soon.', romaji: 'PERSON ga mousugu kimasu.', slots: [{ key: 'person', label: 'Person' }] },
      { id: 'c1-8', role: staff, icon: '🛏️', ja: '{{deliveryMethod}}を行います。', en: 'We are going to do the selected delivery method.', romaji: 'DELIVERY METHOD o okonaimasu.', slots: [{ key: 'deliveryMethod', label: 'Delivery method' }] },
    ]
  },
  {
    id: 'childbirth-after', categoryId: 'childbirth', title: 'Childbirth 2, After the Birth', subtitle: 'Baby checks, feeding, bathing, leaving hospital and baby concerns.', icon: '🍼', color: 'from-amber-600 to-yellow-600', phrases: [
      { id: 'c2-1', role: staff, icon: '👶', ja: '赤ちゃんの{{babyCheck}}チェックをします。', en: 'We will check the baby’s selected item.', romaji: 'Akachan no BABY CHECK chekku o shimasu.', slots: [{ key: 'babyCheck', label: 'Baby check' }] },
      { id: 'c2-2', role: staff, icon: '🛁', ja: '赤ちゃんのお風呂の時間です。', en: 'It is time for your baby to take a bath.', romaji: 'Akachan no ofuro no jikan desu.' },
      { id: 'c2-3', role: staff, icon: '🍼', ja: '{{number}}時間おきに授乳をお願いします。', en: 'Please feed your baby every selected number of hours.', romaji: 'NUMBER jikan oki ni junyuu o onegai shimasu.', slots: [{ key: 'number', label: 'Hours' }] },
      { id: 'c2-4', role: staff, icon: '📅', ja: '退院は{{date}}を予定しています。', en: 'Your discharge date is planned for the selected date.', romaji: 'Taiin wa DATE o yotei shiteimasu.', slots: [{ key: 'date', label: 'Date' }] },
      { id: 'c2-5', role: student, icon: '⚠️', ja: '{{babyCheck}}に問題があります。', en: 'There is a problem with the selected baby check item.', romaji: 'BABY CHECK ni mondai ga arimasu.', slots: [{ key: 'babyCheck', label: 'Baby check' }] },
      { id: 'c2-6', role: student, icon: '❓', ja: 'どうしたらいいですか？', en: 'What should I do?', romaji: 'Dou shitara ii desu ka?' },
      { id: 'c2-7', role: student, icon: '👃', ja: '鼻が詰まっています。', en: 'The nose is clogged.', romaji: 'Hana ga tsumatteimasu.' },
      { id: 'c2-8', role: student, icon: '🧴', ja: '何を使ったらいいですか？', en: 'What should I use for it?', romaji: 'Nani o tsukattara ii desu ka?' },
    ]
  },
  {
    id: 'school-application', categoryId: 'school', title: 'School 1, Application', subtitle: 'Apply, deadline, age, documents, food restrictions and cancellation.', icon: '🏫', color: 'from-blue-600 to-cyan-600', phrases: [
      { id: 's1-1', role: staff, icon: '🚫', ja: 'この学校は現在満員です。', en: 'This school is currently full.', romaji: 'Kono gakkou wa genzai manin desu.' },
      { id: 's1-2', role: staff, icon: '👧', ja: '{{childAge}}才は申込みの空きがあります。', en: 'The selected age class is available for application.', romaji: 'AGE sai wa moushikomi no aki ga arimasu.', slots: [{ key: 'childAge', label: 'Child age' }] },
      { id: 's1-3', role: staff, icon: '📅', ja: '入園希望書の提出期間は{{date}}から{{date}}までです。', en: 'The application submission period is from the selected date to the selected date.', romaji: 'Nyuuen kibousho no teishutsu kikan wa DATE kara DATE made desu.', slots: [{ key: 'date', label: 'From / to date' }] },
      { id: 's1-4', role: student, icon: '📝', ja: 'この{{place}}に申し込みたいです。', en: 'We would like to apply for this selected place.', romaji: 'Kono PLACE ni moushikomitai desu.', slots: [{ key: 'place', label: 'School / place' }] },
      { id: 's1-5', role: student, icon: '📄', ja: '申込提出書類はなんですか？', en: 'What do we have to submit for the application?', romaji: 'Moushikomi teishutsu shorui wa nan desu ka?' },
      { id: 's1-6', role: student, icon: '⏳', ja: '締め切りはいつですか？', en: 'When is the deadline?', romaji: 'Shimekiri wa itsu desu ka?' },
      { id: 's1-7', role: student, icon: '🍱', ja: 'この子は{{food}}が食べられません。', en: 'This child cannot eat the selected food.', romaji: 'Kono ko wa FOOD ga taberaremasen.', slots: [{ key: 'food', label: 'Food' }] },
      { id: 's1-8', role: student, icon: '💬', ja: '理由は{{reason}}です。', en: 'The reason is the selected reason.', romaji: 'Riyuu wa REASON desu.', slots: [{ key: 'reason', label: 'Reason' }] },
      { id: 's1-9', role: student, icon: '❌', ja: '申込を取り消したいです。', en: 'I would like to cancel the application.', romaji: 'Moushikomi o torikeshitai desu.' },
    ]
  },
  {
    id: 'school-attendance', categoryId: 'school', title: 'School 2, Attendance and Classes', subtitle: 'Bring items, pickup, absence, meetings and school lunch.', icon: '🎒', color: 'from-cyan-600 to-sky-600', phrases: [
      { id: 's2-1', role: staff, icon: '📅', ja: '{{classEvent}}があります。', en: 'There will be the selected school event.', romaji: 'CLASS EVENT ga arimasu.', slots: [{ key: 'classEvent', label: 'Event' }] },
      { id: 's2-2', role: staff, icon: '🎒', ja: '{{thing}}を持ってきてください。', en: 'Please bring the selected item.', romaji: 'THING o motte kite kudasai.', slots: [{ key: 'thing', label: 'Thing' }] },
      { id: 's2-3', role: staff, icon: '🚨', ja: '至急お迎えをお願いします。', en: 'Please come and pick up your child immediately.', romaji: 'Shikyuu omukae o onegai shimasu.', urgent: true },
      { id: 's2-4', role: staff, icon: '🔄', ja: '{{classEvent}}について変更があります。', en: 'There is a change about the selected school event.', romaji: 'CLASS EVENT ni tsuite henkou ga arimasu.', slots: [{ key: 'classEvent', label: 'Event' }] },
      { id: 's2-5', role: student, icon: '👪', ja: '今日のお迎えは{{person}}です。', en: 'The selected person will pick up the child today.', romaji: 'Kyou no omukae wa PERSON desu.', slots: [{ key: 'person', label: 'Person' }] },
      { id: 's2-6', role: student, icon: '🕒', ja: '{{time}}に迎えにいきます。', en: 'I will come and pick up the child at the selected time.', romaji: 'TIME ni mukae ni ikimasu.', slots: [{ key: 'time', label: 'Time' }] },
      { id: 's2-7', role: student, icon: '🏠', ja: '子供は{{date}}はお休みします。', en: 'My child will be absent on the selected date.', romaji: 'Kodomo wa DATE wa oyasumi shimasu.', slots: [{ key: 'date', label: 'Date' }] },
      { id: 's2-8', role: student, icon: '✅', ja: '参加します。', en: 'I will attend.', romaji: 'Sanka shimasu.' },
      { id: 's2-9', role: student, icon: '❌', ja: '参加しません。', en: 'I cannot attend.', romaji: 'Sanka shimasen.' },
      { id: 's2-10', role: student, icon: '🍱', ja: 'うちの子は{{reason}}が理由でこの給食は食べられません。', en: 'My child cannot eat this school lunch because of the selected reason.', romaji: 'Uchi no ko wa REASON ga riyuu de kono kyuushoku wa taberaremasen.', slots: [{ key: 'reason', label: 'Reason' }] },
    ]
  },
  {
    id: 'ward-office', categoryId: 'public', title: 'Public Service 1, Ward Office', subtitle: 'Procedures, documents, windows, forms and writing help.', icon: '🏛️', color: 'from-indigo-600 to-violet-600', phrases: [
      { id: 'w1-1', role: staff, icon: '➡️', ja: '{{procedure}}の窓口はあちらです。', en: 'The service window for the selected procedure is over there.', romaji: 'PROCEDURE no madoguchi wa achira desu.', slots: [{ key: 'procedure', label: 'Procedure' }] },
      { id: 'w1-2', role: staff, icon: '✍️', ja: 'ここに{{document}}をお願いします。', en: 'Please put the selected document here.', romaji: 'Koko ni DOCUMENT o onegai shimasu.', slots: [{ key: 'document', label: 'Document' }] },
      { id: 'w1-3', role: staff, icon: '📄', ja: '{{document}}を持ってくるのを忘れないでください。', en: 'Please do not forget to bring the selected document.', romaji: 'DOCUMENT o motte kuru no o wasurenaide kudasai.', slots: [{ key: 'document', label: 'Document' }] },
      { id: 'w1-4', role: student, icon: '📝', ja: '{{procedure}}の手続をしたいです。', en: 'I would like to do the selected procedure.', romaji: 'PROCEDURE no tetsuzuki o shitai desu.', slots: [{ key: 'procedure', label: 'Procedure' }] },
      { id: 'w1-5', role: student, icon: '❓', ja: 'どこの窓口へ行ったらいいですか？', en: 'Which office should I visit?', romaji: 'Doko no madoguchi e ittara ii desu ka?' },
      { id: 'w1-6', role: student, icon: '📋', ja: '何が必要ですか？', en: 'What do I need?', romaji: 'Nani ga hitsuyou desu ka?' },
      { id: 'w1-7', role: student, icon: '🔤', ja: 'アルファベットで書いてもいいですか？', en: 'Is it okay to write in alphabet?', romaji: 'Arufabetto de kaitemo ii desu ka?' },
      { id: 'w1-8', role: student, icon: '🈳', ja: '{{thing}}で書けません。', en: 'I cannot write using the selected writing system or item.', romaji: 'THING de kakemasen.', slots: [{ key: 'thing', label: 'Writing / thing' }] },
      { id: 'w1-9', role: student, icon: '😕', ja: 'この箇所がわかりません。', en: 'I do not understand this part.', romaji: 'Kono kasho ga wakarimasen.' },
      { id: 'w1-10', role: student, icon: '📮', ja: '郵送で送ることもできますか？', en: 'Can I send it by post?', romaji: 'Yuusou de okuru koto mo dekimasu ka?' },
    ]
  },
  {
    id: 'police-emergency', categoryId: 'public', title: 'Public Service 2, Police and Emergency', subtitle: 'Lost items, theft, missing person, being lost, language help and emergency.', icon: '🚨', color: 'from-red-700 to-orange-600', phrases: [
      { id: 'e1-1', role: student, icon: '🎒', ja: '落とし物をしました。', en: 'I have lost something.', romaji: 'Otoshimono o shimashita.' },
      { id: 'e1-2', role: student, icon: '📦', ja: '落とし物を拾いました。', en: 'I found someone’s lost item.', romaji: 'Otoshimono o hiroimashita.' },
      { id: 'e1-3', role: student, icon: '🚨', ja: '{{thing}}が盗まれました。', en: 'The selected thing was stolen.', romaji: 'THING ga nusumaremashita.', slots: [{ key: 'thing', label: 'Thing' }], urgent: true },
      { id: 'e1-4', role: student, icon: '👤', ja: '{{person}}がいません。', en: 'The selected person is missing.', romaji: 'PERSON ga imasen.', slots: [{ key: 'person', label: 'Person' }], urgent: true },
      { id: 'e1-5', role: student, icon: '🧭', ja: '道に迷いました。', en: 'I am lost.', romaji: 'Michi ni mayoimashita.' },
      { id: 'e1-6', role: student, icon: '🆘', ja: '緊急です。', en: 'It is an emergency.', romaji: 'Kinkyuu desu.', urgent: true },
      { id: 'e1-7', role: student, icon: '🙏', ja: '助けてください。', en: 'Please help me.', romaji: 'Tasukete kudasai.', urgent: true },
      { id: 'e1-8', role: student, icon: '🌐', ja: '{{language}}が話せる人はいますか？', en: 'Is there anyone who speaks the selected language?', romaji: 'LANGUAGE ga hanaseru hito wa imasu ka?', slots: [{ key: 'language', label: 'Language' }] },
      { id: 'e1-9', role: staff, icon: '📍', ja: '出来事があった場所は？', en: 'Where is the place of the incident?', romaji: 'Dekigoto ga atta basho wa?' },
      { id: 'e1-10', role: staff, icon: '🕒', ja: '出来事があった日時は？', en: 'When was the date and time of the incident?', romaji: 'Dekigoto ga atta nichiji wa?' },
      { id: 'e1-11', role: staff, icon: '📝', ja: 'これに記入をお願いします。', en: 'Please fill out this form.', romaji: 'Kore ni kinyuu o onegai shimasu.' },
      { id: 'e1-12', role: staff, icon: '🪪', ja: '{{document}}を見せてください。', en: 'Please show the selected document.', romaji: 'DOCUMENT o misete kudasai.', slots: [{ key: 'document', label: 'Document' }] },
    ]
  },
  {
    id: 'real-estate', categoryId: 'housing', title: 'Other Service 1, Real Estate', subtitle: 'Apartment search, rent, room type, family, initial cost and included fees.', icon: '🏠', color: 'from-emerald-600 to-teal-600', phrases: [
      { id: 'r1-1', role: staff, icon: '🏘️', ja: 'どんなお部屋をお探しですか？', en: 'What type of room would you like?', romaji: 'Donna oheya o osagashi desu ka?' },
      { id: 'r1-2', role: staff, icon: '🤝', ja: '連帯保証人または緊急連絡人が必要です。', en: 'We need a guarantor or emergency contact.', romaji: 'Rentai hoshounin matawa kinkyuu renrakunin ga hitsuyou desu.' },
      { id: 'r1-3', role: staff, icon: '💴', ja: '初期費用はこれです。', en: 'This is the initial cost.', romaji: 'Shoki hiyou wa kore desu.' },
      { id: 'r1-4', role: staff, icon: '🈳', ja: '今は空室です。', en: 'It is vacant right now.', romaji: 'Ima wa kuushitsu desu.' },
      { id: 'r1-5', role: staff, icon: '🚫', ja: '今は満室です。', en: 'It is full right now.', romaji: 'Ima wa manshitsu desu.' },
      { id: 'r1-9', role: staff, icon: '💰', ja: '月々はこれです。', en: 'This is the monthly cost.', romaji: 'Tsukizuki wa kore desu.' },
      { id: 'r1-10', role: staff, icon: '✅', ja: '契約できます。', en: 'We can make a contract.', romaji: 'Keiyaku dekimasu.' },
      { id: 'r1-11', role: staff, icon: '❌', ja: '契約できません。', en: 'We cannot make a contract.', romaji: 'Keiyaku dekimasen.' },
      { id: 'r1-6', role: student, icon: '🏠', ja: 'アパートを探しています。', en: 'I am looking for an apartment.', romaji: 'Apaato o sagashiteimasu.' },
      { id: 'r1-7', role: student, icon: '💴', ja: '家賃は{{amount}}円くらいがいいです。', en: 'I want rent around the selected amount.', romaji: 'Yachin wa AMOUNT en kurai ga ii desu.', slots: [{ key: 'amount', label: 'Rent' }] },
      { id: 'r1-8', role: student, icon: '🧾', ja: '家賃以外の月々の費用はいくらですか？', en: 'How much are the monthly expenses besides rent?', romaji: 'Yachin igai no tsukiduki no hiyou wa ikura desu ka?' },
      { id: 'r1-9', role: student, icon: '🚗', ja: '駐車場はありますか？', en: 'Is there any parking?', romaji: 'Chuushajou wa arimasu ka?' },
      { id: 'r1-10', role: student, icon: '📐', ja: '{{roomType}}の部屋が良いです。', en: 'I want the selected room type.', romaji: 'ROOM TYPE no heya ga ii desu.', slots: [{ key: 'roomType', label: 'Room type' }] },
      { id: 'r1-11', role: student, icon: '👪', ja: '家族と住みます。', en: 'I will live with my family.', romaji: 'Kazoku to sumimasu.' },
      { id: 'r1-12', role: student, icon: '✅', ja: '{{thing}}は含まれますか？', en: 'Does it include the selected item?', romaji: 'THING wa fukumaremasu ka?', slots: [{ key: 'thing', label: 'Included item' }] },
    ]
  },
  {
    id: 'university-office', categoryId: 'campus', title: 'Other Service 2, University Office', subtitle: 'Office support, documents, supervisor, contact information and job plans.', icon: '🎓', color: 'from-sky-600 to-indigo-600', phrases: [
      { id: 'u1-1', role: staff, icon: '⏳', ja: '担当の者が今おりません。', en: 'The person in charge is not here right now.', romaji: 'Tantou no mono ga ima orimasen.' },
      { id: 'u1-2', role: staff, icon: '📅', ja: '{{date}}には戻ります。', en: 'They will be back on the selected date.', romaji: 'DATE ni wa modorimasu.', slots: [{ key: 'date', label: 'Date / time' }] },
      { id: 'u1-3', role: staff, icon: '☎️', ja: 'あなたの連絡先を残してください。', en: 'Please leave your contact information.', romaji: 'Anata no renrakusaki o nokoshite kudasai.' },
      { id: 'u1-4', role: staff, icon: '🏢', ja: 'それは{{office}}で手続をしてください。', en: 'Please process that at the selected office.', romaji: 'Sore wa OFFICE de tetsuzuki o shite kudasai.', slots: [{ key: 'office', label: 'Office' }] },
      { id: 'u1-5', role: staff, icon: '👨‍🏫', ja: '指導教員の先生に確認してください。', en: 'Please check with your supervisor.', romaji: 'Shidou kyouin no sensei ni kakunin shite kudasai.' },
      { id: 'u1-8', role: staff, icon: '⏳', ja: 'このままお待ちください。', en: 'Please wait for a moment.', romaji: 'Kono mama omachi kudasai.' },
      { id: 'u1-9', role: staff, icon: '📅', ja: '{{date}}までに提出をお願いします。', en: 'Please submit it by the selected date.', romaji: 'DATE made ni teishutsu o onegai shimasu.', slots: [{ key: 'date', label: 'Deadline' }] },
      { id: 'u1-10', role: staff, icon: '✍️', ja: '{{date}}までに署名をお願いします。', en: 'Please sign it by the selected date.', romaji: 'DATE made ni shomei o onegai shimasu.', slots: [{ key: 'date', label: 'Deadline' }] },
      { id: 'u1-11', role: staff, icon: '🇯🇵', ja: 'あなたの日本語のレベルを教えてください。', en: 'Please tell us your Japanese level.', romaji: 'Anata no Nihongo no reberu o oshiete kudasai.' },
      { id: 'u1-6', role: student, icon: '📄', ja: '{{document}}の受取に来ました。', en: 'I came to receive the selected document.', romaji: 'DOCUMENT no uketori ni kimashita.', slots: [{ key: 'document', label: 'Document' }] },
      { id: 'u1-7', role: student, icon: '❓', ja: '{{procedure}}はどこで手続したらいいですか？', en: 'Where should I process the selected matter?', romaji: 'PROCEDURE wa doko de tetsuzuki shitara ii desu ka?', slots: [{ key: 'procedure', label: 'Matter' }] },
      { id: 'u1-8', role: student, icon: '💬', ja: '{{thing}}について話したい事があります。', en: 'I would like to talk about the selected thing.', romaji: 'THING ni tsuite hanashitai koto ga arimasu.', slots: [{ key: 'thing', label: 'Topic' }] },
      { id: 'u1-9', role: student, icon: '💼', ja: '日本での就職を考えています。', en: 'I am thinking about working in Japan.', romaji: 'Nihon de no shuushoku o kangaeteimasu.' },
      { id: 'u1-10', role: student, icon: '✅', ja: '決まっています。', en: 'I have decided.', romaji: 'Kimatteimasu.' },
      { id: 'u1-11', role: student, icon: '🤔', ja: '決まっていません。', en: 'I have not decided.', romaji: 'Kimatteimasen.' },
      { id: 'u1-12', role: student, icon: '🔎', ja: '{{thing}}の情報はありますか？', en: 'Do you have information about the selected thing?', romaji: 'THING no jouhou wa arimasu ka?', slots: [{ key: 'thing', label: 'Topic' }] },
    ]
  },
  {
    id: 'daily-greetings', categoryId: 'daily', title: 'Daily 1, Greetings and Conversation', subtitle: 'Basic greetings, thanks, sorry, help, weather and Kumamoto-friendly small talk.', icon: '👋', color: 'from-teal-600 to-emerald-600', phrases: [
      { id: 'd1-1', role: student, icon: '☀️', ja: 'おはようございます。', en: 'Good morning.', romaji: 'Ohayou gozaimasu.' },
      { id: 'd1-2', role: student, icon: '👋', ja: 'こんにちは。', en: 'Hello.', romaji: 'Konnichiwa.' },
      { id: 'd1-3', role: student, icon: '🌙', ja: 'こんばんは。', en: 'Good evening.', romaji: 'Konbanwa.' },
      { id: 'd1-4', role: student, icon: '🙏', ja: 'ありがとうございます。', en: 'Thank you very much.', romaji: 'Arigatou gozaimasu.' },
      { id: 'd1-5', role: student, icon: '🙇', ja: 'すみません。', en: 'Sorry / Excuse me.', romaji: 'Sumimasen.' },
      { id: 'd1-6', role: student, icon: '⏳', ja: 'ちょっと待ってください。', en: 'Please wait a minute.', romaji: 'Chotto matte kudasai.' },
      { id: 'd1-7', role: student, icon: '😟', ja: '困っています。', en: 'I have a serious concern.', romaji: 'Komatteimasu.' },
      { id: 'd1-8', role: student, icon: '❓', ja: 'お尋ねしたいです。', en: 'I would like to ask you.', romaji: 'Otazune shitai desu.' },
      { id: 'd1-9', role: student, icon: '🌤️', ja: '今日は{{weather}}ですね。', en: 'The weather is selected weather today.', romaji: 'Kyou wa WEATHER desu ne.', slots: [{ key: 'weather', label: 'Weather' }] },
      { id: 'd1-10', role: student, icon: '📚', ja: '辞書で調べます。', en: 'I will check in the dictionary.', romaji: 'Jisho de shirabemasu.' },
    ]
  },
  {
    id: 'daily-house-neighbors', categoryId: 'daily', title: 'Daily 2, Housework and Neighbors', subtitle: 'Neighbors, move-in, move-out, trash, cooking, payment and home problems.', icon: '🏡', color: 'from-emerald-600 to-lime-600', phrases: [
      { id: 'd2-1', role: student, icon: '🍳', ja: '{{food}}はどうやって料理しますか？', en: 'How do I cook the selected food?', romaji: 'FOOD wa douyatte ryouri shimasu ka?', slots: [{ key: 'food', label: 'Food' }] },
      { id: 'd2-2', role: student, icon: '🛒', ja: '{{thing}}はどこで買えますか？', en: 'Where can I buy the selected thing?', romaji: 'THING wa doko de kaemasu ka?', slots: [{ key: 'thing', label: 'Thing' }] },
      { id: 'd2-3', role: student, icon: '💴', ja: 'これはどこで払いますか？', en: 'Where do I pay this?', romaji: 'Kore wa doko de haraimasu ka?' },
      { id: 'd2-4', role: student, icon: '❓', ja: '{{thing}}はどうしたらいいですか？', en: 'How do I handle the selected thing?', romaji: 'THING wa dou shitara ii desu ka?', slots: [{ key: 'thing', label: 'Thing' }] },
      { id: 'd2-5', role: student, icon: '🚶', ja: '{{place}}へどうやって行ったらいいですか？', en: 'How do I get to the selected place?', romaji: 'PLACE e douyatte ittara ii desu ka?', slots: [{ key: 'place', label: 'Place' }] },
      { id: 'd2-6', role: student, icon: '♻️', ja: 'ゴミはどこに捨てたらいいですか？', en: 'Where should I throw away the trash?', romaji: 'Gomi wa doko ni sutetara ii desu ka?' },
      { id: 'd2-7', role: student, icon: '🗓️', ja: '今日は何のゴミの日ですか？', en: 'Which garbage day is today?', romaji: 'Kyou wa nan no gomi no hi desu ka?' },
      { id: 'd2-8', role: student, icon: '🔧', ja: '{{issue}}の調子が悪いです。', en: 'The selected thing is not working well.', romaji: 'ISSUE no choushi ga warui desu.', slots: [{ key: 'issue', label: 'Problem item' }] },
      { id: 'd2-9', role: student, icon: '🚚', ja: '隣に引っ越してきました。よろしくお願いします。', en: 'I moved in next door. Nice to meet you.', romaji: 'Tonari ni hikkoshite kimashita. Yoroshiku onegai shimasu.' },
      { id: 'd2-10', role: student, icon: '🌏', ja: '{{country}}からきました。', en: 'I am from the selected country.', romaji: 'COUNTRY kara kimashita.', slots: [{ key: 'country', label: 'Country' }] },
      { id: 'd2-11', role: student, icon: '🎓', ja: '熊本大学の留学生です。', en: 'I am a Kumamoto University international student.', romaji: 'Kumamoto Daigaku no ryuugakusei desu.' },
      { id: 'd2-12', role: student, icon: '🏠', ja: '{{familyType}}で住んでいます。', en: 'I live in the selected way.', romaji: 'FAMILY TYPE de sundeimasu.', slots: [{ key: 'familyType', label: 'Living style' }] },
      { id: 'd2-13', role: student, icon: '🎁', ja: 'これはお土産です。もらってください。', en: 'This is a souvenir. Please take it.', romaji: 'Kore wa omiyage desu. Moratte kudasai.' },
    ]
  },
  {
    id: 'transport-daily', categoryId: 'transport', title: 'Daily 3, Transportation', subtitle: 'Destination, bus, tram, train, shinkansen, route number and map help.', icon: '🚌', color: 'from-yellow-600 to-orange-600', phrases: [
      { id: 't1-1', role: student, icon: '🚌', ja: '{{place}}行きの{{transport}}に乗りたいです。', en: 'I want to take the selected transportation to the selected place.', romaji: 'PLACE iki no TRANSPORT ni noritai desu.', slots: [{ key: 'place', label: 'Destination' }, { key: 'transport', label: 'Transport' }] },
      { id: 't1-2', role: student, icon: '🔢', ja: '何番に乗ればいいですか？', en: 'Which number should I take?', romaji: 'Nanban ni noreba ii desu ka?' },
      { id: 't1-3', role: student, icon: '🔢', ja: '何番に行けばいいですか？', en: 'Which number should I go to?', romaji: 'Nanban ni ikeba ii desu ka?' },
      { id: 't1-4', role: student, icon: '🕒', ja: '何時に出発しますか？', en: 'What time does it leave?', romaji: 'Nanji ni shuppatsu shimasu ka?' },
      { id: 't1-5', role: student, icon: '🏁', ja: '何時に到着しますか？', en: 'What time does it arrive?', romaji: 'Nanji ni touchaku shimasu ka?' },
      { id: 't1-6', role: student, icon: '🗺️', ja: '地図で見せていただけますか？', en: 'Could you show me on a map?', romaji: 'Chizu de misete itadakemasu ka?' },
      { id: 't1-7', role: info, icon: '🎫', ja: 'バスは真ん中から乗り、番号のチケットを取ります。', en: 'Usually, get on a Kumamoto bus from the middle door and take a numbered ticket.', romaji: 'Basu wa mannaka kara nori, bangou no chiketto o torimasu.' },
      { id: 't1-8', role: info, icon: '💴', ja: '降りる時に前で運賃を払います。', en: 'Pay the fare at the front when you get off.', romaji: 'Oriru toki ni mae de unchin o haraimasu.' },
    ]
  },
  {
    id: 'natural-disaster', categoryId: 'disaster', title: 'Natural Disaster', subtitle: 'Evacuation, water, supplies, Wi-Fi, family count and utility warnings.', icon: '🆘', color: 'from-red-700 to-orange-600', phrases: [
      { id: 'n1-1', role: student, icon: '📍', ja: '避難所はどこですか？', en: 'Where is the evacuation place?', romaji: 'Hinanjo wa doko desu ka?', urgent: true },
      { id: 'n1-2', role: student, icon: '📢', ja: '今アナウンスされたことがわかりませんでした。', en: 'I did not understand the announcement just now.', romaji: 'Ima anaunsu sareta koto ga wakarimasen deshita.', urgent: true },
      { id: 'n1-3', role: student, icon: '💧', ja: '今、水は使えますか？', en: 'Can we use water now?', romaji: 'Ima, mizu wa tsukaemasu ka?' },
      { id: 'n1-4', role: student, icon: '📦', ja: '物資の配給はどこですか？', en: 'Where do they distribute supplies?', romaji: 'Busshi no haikyuu wa doko desu ka?' },
      { id: 'n1-5', role: student, icon: '💧', ja: '水の配給はどこですか？', en: 'Where do they distribute water?', romaji: 'Mizu no haikyuu wa doko desu ka?' },
      { id: 'n1-6', role: student, icon: '📶', ja: '無料Wi-Fiはありますか？', en: 'Is there any free Wi-Fi?', romaji: 'Muryou wai fai wa arimasu ka?' },
      { id: 'n1-7', role: student, icon: '👪', ja: '私たちは{{number}}人家族です。', en: 'We are a family of the selected number.', romaji: 'Watashitachi wa NUMBER nin kazoku desu.', slots: [{ key: 'number', label: 'Family size' }] },
      { id: 'n1-8', role: student, icon: '👶', ja: '子供は{{number}}人います。', en: 'We have the selected number of children.', romaji: 'Kodomo wa NUMBER nin imasu.', slots: [{ key: 'number', label: 'Children' }] },
      { id: 'n1-9', role: staff, icon: '🔥', ja: 'ガスの元栓を閉めてください。', en: 'Please close the gas main valve.', romaji: 'Gasu no motosen o shimete kudasai.', urgent: true },
      { id: 'n1-10', role: staff, icon: '⚡', ja: 'ブレーカーを落としてください。', en: 'Please shut down the electricity breaker.', romaji: 'Bureekaa o otoshite kudasai.', urgent: true },
      { id: 'n1-11', role: staff, icon: '🚨', ja: 'けが人はいませんか？', en: 'Is anyone injured?', romaji: 'Keganin wa imasen ka?', urgent: true },
      { id: 'n1-12', role: staff, icon: '🚫', ja: '今現在{{utility}}は使えません。', en: 'The selected utility cannot be used right now.', romaji: 'Ima genzai UTILITY wa tsukaemasen.', slots: [{ key: 'utility', label: 'Utility' }] },
      { id: 'n1-13', role: staff, icon: '🏃', ja: '避難してください。', en: 'Please evacuate.', romaji: 'Hinan shite kudasai.', urgent: true },
    ]
  }
];

export const vocabularyGroups: VocabGroup[] = [
  { id: 'person-body', title: 'People, Jobs, Body Parts', icon: '🧍', items: [
    ...slotOptions.person,
    { ja: '学生', en: 'student', romaji: 'gakusei' },
    { ja: '会社員', en: 'company worker', romaji: 'kaishain' },
    { ja: '医者', en: 'doctor', romaji: 'isha' },
    { ja: '看護師', en: 'nurse', romaji: 'kangoshi' },
    ...slotOptions.bodyPart,
  ]},
  { id: 'time-weather', title: 'Time, Weather, Seasons', icon: '🌦️', items: [
    ...slotOptions.time,
    ...slotOptions.weather,
    { ja: '春', en: 'spring', romaji: 'haru' },
    { ja: '夏', en: 'summer', romaji: 'natsu' },
    { ja: '秋', en: 'autumn', romaji: 'aki' },
    { ja: '冬', en: 'winter', romaji: 'fuyu' },
    { ja: '梅雨', en: 'rainy season', romaji: 'tsuyu' },
  ]},
  { id: 'documents', title: 'Documents and ID', icon: '🪪', items: [
    ...slotOptions.document,
    ...slotOptions.procedure,
    { ja: '提出日', en: 'submission date', romaji: 'teishutsubi' },
    { ja: '提出期限', en: 'submission deadline', romaji: 'teishutsu kigen' },
    { ja: '住所', en: 'address', romaji: 'juusho' },
    { ja: '電話番号', en: 'telephone number', romaji: 'denwa bangou' },
  ]},
  { id: 'school', title: 'School Supplies and Events', icon: '🎒', items: [
    { ja: '教科書', en: 'textbook', romaji: 'kyoukasho' },
    { ja: 'ノート', en: 'notebook', romaji: 'nooto' },
    { ja: '宿題', en: 'homework', romaji: 'shukudai' },
    { ja: '上靴', en: 'indoor shoes', romaji: 'uwagutsu' },
    { ja: '水筒', en: 'water bottle', romaji: 'suitou' },
    { ja: '制服', en: 'uniform', romaji: 'seifuku' },
    ...slotOptions.classEvent,
  ]},
  { id: 'work-campus-housing', title: 'Job, Campus, Real Estate', icon: '🏢', items: [
    { ja: '履修登録', en: 'class registration', romaji: 'rishuu touroku' },
    { ja: '授業料', en: 'tuition', romaji: 'jugyouryou' },
    { ja: '研究室', en: 'laboratory', romaji: 'kenkyuushitsu' },
    { ja: 'チューター', en: 'tutor', romaji: 'chuutaa' },
    { ja: '成績証明書', en: 'transcript', romaji: 'seiseki shoumeisho' },
    ...slotOptions.roomType,
    { ja: '家賃', en: 'rent', romaji: 'yachin' },
    { ja: '敷金', en: 'deposit', romaji: 'shikikin' },
    { ja: '礼金', en: 'key money / service fee', romaji: 'reikin' },
    ...slotOptions.issue,
  ]},
  { id: 'pregnancy-childcare', title: 'Pregnancy, Birth, Child Care', icon: '👶', items: [
    { ja: '母子手帳', en: "mother's book", romaji: 'boshi techou' },
    { ja: '妊娠届出書', en: 'pregnancy registration form', romaji: 'ninshin todokedesho' },
    { ja: '陣痛', en: 'contraction', romaji: 'jintsuu' },
    { ja: '破水', en: 'water breaking', romaji: 'hasui' },
    ...slotOptions.deliveryMethod,
    ...slotOptions.babyCheck,
    { ja: 'オムツ', en: 'diaper', romaji: 'omutsu' },
    { ja: '授乳', en: 'feeding milk', romaji: 'junyuu' },
  ]},
  { id: 'hospital-symptoms', title: 'Hospital, Symptoms, Emotion', icon: '🏥', items: [
    { ja: '薬', en: 'medicine', romaji: 'kusuri' },
    { ja: '薬局', en: 'pharmacy', romaji: 'yakkyoku' },
    { ja: '点滴', en: 'IV drip', romaji: 'tenteki' },
    { ja: '検査', en: 'check-up', romaji: 'kensa' },
    ...slotOptions.condition,
    ...slotOptions.symptom,
    { ja: '心配しています', en: 'worried', romaji: 'shinpaishiteimasu' },
    { ja: '安心しています', en: 'relaxed', romaji: 'anshin shiteimasu' },
    { ja: '嬉しい', en: 'happy', romaji: 'ureshii' },
    { ja: '悲しい', en: 'sad', romaji: 'kanashii' },
  ]},
  { id: 'daily-life-food', title: 'Daily Supplies, Food, Community', icon: '🛒', items: [
    ...slotOptions.food,
    ...slotOptions.drink,
    ...slotOptions.place,
    { ja: 'トイレ', en: 'toilet', romaji: 'toire' },
    { ja: 'シャワー', en: 'shower', romaji: 'shawaa' },
    { ja: '指定ゴミ袋', en: 'official trash bag', romaji: 'shitei gomi bukuro' },
    { ja: '燃えるゴミ', en: 'burnable trash', romaji: 'moeru gomi' },
    { ja: '燃えないゴミ', en: 'non-burnable trash', romaji: 'moenai gomi' },
  ]},
  { id: 'transport-atm-dialect', title: 'Transport, ATM, Kumamoto Dialect', icon: '🚃', items: [
    ...slotOptions.transport,
    { ja: 'バス停', en: 'bus stop', romaji: 'basutei' },
    { ja: '電停', en: 'tram stop', romaji: 'dentei' },
    { ja: '時刻表', en: 'timetable', romaji: 'jikokuhyou' },
    { ja: '運賃', en: 'fare', romaji: 'unchin' },
    { ja: 'お引きだし', en: 'withdraw cash', romaji: 'ohikidashi' },
    { ja: 'お振り込み', en: 'payment / transfer', romaji: 'ofurikomi' },
    { ja: 'お預け入れ', en: 'deposit', romaji: 'oazukeire' },
    { ja: '残高', en: 'balance', romaji: 'zandaka' },
    { ja: 'よか', en: 'good / alright / enough', romaji: 'yoka' },
    { ja: 'でけん', en: "cannot / not good", romaji: 'deken' },
    { ja: 'ばってん', en: 'but / however', romaji: 'batten' },
  ]},
];

export const quickBuilders: Phrase[] = [
  { id: 'qb-symptom', role: student, icon: '🤒', ja: '私は{{bodyPart}}が{{symptom}}。', en: 'I have a symptom in or on this body part.', slots: [{ key: 'bodyPart', label: 'Body part' }, { key: 'symptom', label: 'Symptom' }] },
  { id: 'qb-procedure', role: student, icon: '🏛️', ja: '{{procedure}}の手続をしたいです。', en: 'I would like to do this procedure.', slots: [{ key: 'procedure', label: 'Procedure' }] },
  { id: 'qb-go', role: student, icon: '🚶', ja: '{{place}}へ行きたいです。', en: 'I want to go to this place.', slots: [{ key: 'place', label: 'Place' }] },
  { id: 'qb-buy', role: student, icon: '🛒', ja: '{{thing}}はどこで買えますか？', en: 'Where can I buy this?', slots: [{ key: 'thing', label: 'Thing' }] },
  { id: 'qb-child-food', role: student, icon: '🍱', ja: 'この子は{{food}}が食べられません。理由は{{reason}}です。', en: 'This child cannot eat this food. The reason is selected.', slots: [{ key: 'food', label: 'Food' }, { key: 'reason', label: 'Reason' }] },
  { id: 'qb-housing', role: student, icon: '🏠', ja: '家賃は{{amount}}円くらいで、{{roomType}}の部屋が良いです。', en: 'I want rent around this amount and this room type.', slots: [{ key: 'amount', label: 'Rent' }, { key: 'roomType', label: 'Room type' }] },
  { id: 'qb-language', role: student, icon: '🌐', ja: '{{language}}が話せる人はいますか？', en: 'Is there anyone who speaks this language?', slots: [{ key: 'language', label: 'Language' }] },
  { id: 'qb-disaster', role: student, icon: '🆘', ja: '避難所はどこですか？今{{utility}}は使えますか？', en: 'Where is the evacuation place? Can we use this utility now?', slots: [{ key: 'utility', label: 'Utility' }] },
];

export function getDecksByCategory(categoryId: string) {
  return phraseDecks.filter(deck => deck.categoryId === categoryId);
}

export function getAllPhrases() {
  return phraseDecks.flatMap(deck => deck.phrases.map(phrase => ({ ...phrase, deckId: deck.id, categoryId: deck.categoryId, deckTitle: deck.title })));
}

export function defaultSelections(phrase: Phrase): Partial<Record<SlotKey, SlotOption>> {
  const selections: Partial<Record<SlotKey, SlotOption>> = {};
  phrase.slots?.forEach(slot => {
    selections[slot.key] = slotOptions[slot.key]?.[0];
  });
  return selections;
}

export function renderTemplate(template: string, selections: Partial<Record<SlotKey, SlotOption>>) {
  return template.replace(/{{(.*?)}}/g, (_, rawKey: string) => {
    const key = rawKey.trim() as SlotKey;
    return selections[key]?.ja ?? '＿＿';
  });
}

export function renderEnglish(template: string, selections: Partial<Record<SlotKey, SlotOption>>) {
  if (!template.includes('selected') && !template.includes('this') && !template.includes('Selected')) return template;
  return template;
}
