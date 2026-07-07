export type PhraseCard = {
  category: string
  en: string
  ja: string
  reading?: string
}

export type PartnerOrganization = {
  slug: string
  name: string
  shortName: string
  managerName: string
  phone: string
  links: {
    hello: string
    gomi: string
    tapSpeak: string
  }
  phrases: PhraseCard[]
}

export const DEMO_ORGANIZATIONS: PartnerOrganization[] = [
  {
    slug: 'sakura-heights-kurokami',
    name: 'Sakura Heights Kurokami',
    shortName: 'Sakura Heights',
    managerName: 'Tanaka Housing Office',
    phone: '096-000-0000',
    links: {
      hello: 'https://kumamoto-hello.vercel.app/en/org/sakura-heights-kurokami',
      gomi: 'https://kumamoto-gomi.vercel.app/org/sakura-heights-kurokami',
      tapSpeak: 'https://kumadai-speak.vercel.app/org/sakura-heights-kurokami',
    },
    phrases: [
      {
        category: 'Garbage',
        en: 'Which garbage station should I use for this apartment?',
        ja: 'このアパートでは、どこのごみ置き場を使えばいいですか。',
        reading: 'Kono apaato de wa, doko no gomi okiba o tsukaeba ii desu ka.',
      },
      {
        category: 'Garbage',
        en: 'I am not sure which day I should put this out.',
        ja: 'これは何曜日に出せばいいか、よく分かりません。',
        reading: 'Kore wa nan-youbi ni daseba ii ka, yoku wakarimasen.',
      },
      {
        category: 'Repair',
        en: 'There is a problem in my room. Could you please check it?',
        ja: '部屋に問題があります。確認していただけますか。',
        reading: 'Heya ni mondai ga arimasu. Kakunin shite itadakemasu ka.',
      },
      {
        category: 'Keys',
        en: 'I lost my key. What should I do?',
        ja: '鍵をなくしました。どうすればいいですか。',
        reading: 'Kagi o nakushimashita. Dou sureba ii desu ka.',
      },
      {
        category: 'Move-out',
        en: 'I will move out soon. What should I do before leaving?',
        ja: 'もうすぐ退去します。出る前に何をすればいいですか。',
        reading: 'Mou sugu taikyo shimasu. Deru mae ni nani o sureba ii desu ka.',
      },
    ],
  },
]

export function getDemoOrganization(slug: string): PartnerOrganization | undefined {
  return DEMO_ORGANIZATIONS.find((organization) => organization.slug === slug)
}
