# KumaSpeak voice and typed translation

Open **Translate** in the bottom menu, or **Talk or type to translate** on Home. Existing Speak, Staff, Saved and More screens remain available.

## Use the new mode

1. Choose **OpenAI** or **Claude** under Translation service. Only services configured by the app owner are available. The app remembers your choice on this device.
2. Choose the two languages.
3. In Talk, press the button for the person speaking. Browser dictation translates after the speaking turn ends. For Online recording, press Finish after speaking. Each recording ends after 30 seconds at the latest.
4. The other person presses their language button to reply in the other direction.
5. In Type, choose the input direction, enter a sentence and press Translate.
6. Listen replays the translation. Show opens large text. Edit opens the original sentence for correction. Online results identify the service that translated that turn.

Voice input settings include Browser or Online recording, automatic read-aloud, and review before translation. Menu labels support English, Japanese, Indonesian, Burmese, Chinese, Korean and Vietnamese. The existing device speech rate and pitch also apply here.

The latest turn appears first. Conversation expands earlier turns. The page keeps up to 20 turns when switching app tabs. New conversation or a page refresh clears them. Translation history and recordings are not written to browser storage.

## How existing content is used

The index contains the original 191 phrase cards, 8 phrase builders, 190 vocabulary entries and 206 word choices, totaling 595 built-in entries. Custom cards join the index from the existing browser storage.

- Exact matches reuse an available saved translation without an API request. English and Japanese pairs are indexed, alongside the other-language staff translations already present in your code.
- Related wording appears under From KumaSpeak. Open card returns to the existing card and its word choices. Use phrase explicitly selects the saved wording.
- Approximate matches do not replace the user's sentence.
- Cards with blanks require the user to choose their values in the existing card screen. Default names, symptoms, amounts or medicine instructions are never substituted into a typed sentence.
- For new sentences, the server retrieves up to four relevant built-in phrase or vocabulary entries as terminology hints, then requests an online translation of the original text. Custom cards are matched locally and are not sent as reference examples.

The index reads the existing data files. Future phrase and vocabulary additions join the index automatically. Both OpenAI and Claude use the same local matches and built-in references.

## Enable online translation

No new npm dependency is required.

Choose the setup you want:

| Setup | Server environment variables | Input options |
| --- | --- | --- |
| OpenAI | `OPENAI_API_KEY` | Type, browser dictation and optional online recording |
| Claude | `ANTHROPIC_API_KEY` | Type and browser dictation |
| Let users choose either | Both API keys | Type, browser dictation and optional online recording for either translator |

Claude translates text through Anthropic's Messages API. Browser dictation turns speech into text before translation, so it works with a Claude-only setup on supported browsers. The online recording fallback uses OpenAI speech-to-text first, then sends the recognized text to the selected translator. This fallback requires an OpenAI key even when Claude is selected. Read-aloud uses the device's speech service for both translators.

On your hosting service, such as Vercel:

1. Add one or both API keys from the table. API keys and billing come from the providers' developer consoles; a ChatGPT or Claude chat subscription does not supply an app API key.
2. Optionally set `KUMASPEAK_TRANSLATION_PROVIDER=openai` or `claude` as the default for users without a saved choice. If only one service is configured, it is selected automatically. Existing OpenAI setups work without adding new environment variables.
3. Optionally customize the models below. They are the code defaults.
4. Set a hosting firewall rate limit for `/api/translate` and `/api/transcribe`, and configure usage limits or alerts in each provider account. The code's 20-request/minute client limit and 120-request/minute global limit apply to one server instance. Serverless instances do not share these counters.
5. Redeploy the app. Open Translate, choose each configured service, and try a new sentence in both directions.

| Service | Model setting | Default |
| --- | --- | --- |
| OpenAI translation | `KUMASPEAK_TRANSLATION_MODEL` | `gpt-4.1-mini` |
| Claude translation | `KUMASPEAK_CLAUDE_MODEL` | `claude-haiku-4-5` |
| OpenAI speech-to-text | `KUMASPEAK_TRANSCRIPTION_MODEL` | `gpt-4o-mini-transcribe` |

Choose a Claude model that supports structured JSON output if you change the default. Check the linked model documentation for availability when deploying.

Keep the keys in server environment variables. Never put keys in the page or use a `NEXT_PUBLIC_` prefix. Use `.env.local.example` as a reference. For local development, add its entries to `.env.local`, then run `npm install` and `npm run dev`.

`KUMASPEAK_TRANSLATION_ENABLED=false` disables both translators and online recording while leaving saved-phrase lookup available. `KUMASPEAK_RECORDING_ENABLED=false` disables the recording fallback while retaining browser dictation and online text translation.

Each online translation goes to the selected provider. A failed request retains the input and does not retry through the other company. The server sends only the current sentence and up to four built-in reference examples, not conversation history or custom-card reference examples.

Online translation and recording incur API usage charges for the app owner. Saved-text matches do not call either API. Browser dictation and device read-aloud do not use this app's API keys.

## Speech support

Microphone input needs HTTPS, or localhost during development. The microphone starts after a speaking-button press and stops after Finish, Cancel, leaving Translate or hiding the page. The app never starts another listening turn automatically during read-aloud.

Browser dictation depends on browser and language support and often needs an internet connection. Online recording provides another input option when an OpenAI key is configured. Language recognition quality varies, including for Burmese. Typing and the phone keyboard's microphone remain alternatives.

Read-aloud depends on device voices. Install the target-language voice through device settings when needed. The text remains available for reading, copying or large display.

Requests accept up to 1,000 input characters. Recordings are limited to 30 seconds and 3 MiB. Failed requests retain the original typed or recognized text. Cancel, tab changes and page hiding discard late responses.

## Files to apply

Copy the modified-files archive into your project root while preserving paths. Replace these four existing files:

- `src/components/AppShell.tsx`
- `src/components/BottomNav.tsx`
- `src/components/types.ts`
- `src/app/privacy/page.tsx`

The archive also adds:

- `src/components/TranslationMode.tsx`
- `src/lib/translation.ts`
- `src/lib/translationCopy.ts`
- `src/lib/translationServer.ts`
- `src/lib/useVoiceInput.ts`
- `src/app/api/translate/route.ts`
- `src/app/api/transcribe/route.ts`
- `.env.local.example`
- `VOICE_MODE_SETUP.md`

AppShell also restores preferences after its initial render, which resolves the server/client mismatch on a translated menu or `#tab=translate` reload. The stored preference keys and card format stay the same.

The modified-files archive includes the full voice-mode changes plus this OpenAI/Claude update. Apply it to either your original source or the previous voice-mode version. You do not need to install the previous archive first.

The phrase data, existing staff translations, slot options, icons, app metadata, sitemap, robots file and package dependencies are unchanged. The full-source archive excludes dependencies, build caches, virtual environments and Git history. Run `npm install` after extracting the full source.

## Validation

TypeScript and a production build passed, along with 29 server/lookup checks and 27 browser checks. Automated checks cover phrase and custom-card lookup, missing translations, template handling, request validation, both providers' response parsing, provider selection and defaults, Claude-only configuration, rate limits, both speaking directions, review before translation, microphone cleanup, large display, menu localization, reloads and 320/390/1280-pixel layouts.

Speech events, recordings and online API responses were simulated during browser checks. A physical microphone and paid API calls were not exercised. After adding your key, check recognition and playback on the phones and browsers your users use.

## Documentation

- [Browser speech recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- [Microphone access](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [OpenAI structured responses](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI transcription](https://developers.openai.com/api/docs/guides/speech-to-text)
- [GPT-4.1 mini](https://developers.openai.com/api/docs/models/gpt-4.1-mini)
- [Claude Messages API](https://platform.claude.com/docs/en/api/messages/create)
- [Claude structured output](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
- [Claude models](https://platform.claude.com/docs/en/models/overview)
