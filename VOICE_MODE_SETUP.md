# KumaSpeak voice and typed translation

Open **Translate** in the bottom menu, or **Talk or type to translate** on Home. Existing Speak, Staff, Saved and More screens remain available.

## Use the new mode

1. Choose the two languages.
2. In Talk, press the button for the person speaking. Browser dictation translates after the speaking turn ends. For Online recording, press Finish after speaking. Each recording ends after 30 seconds at the latest.
3. The other person presses their language button to reply in the other direction.
4. In Type, choose the input direction, enter a sentence and press Translate.
5. Listen replays the translation. Show opens large text. Edit opens the original sentence for correction.

Voice input settings include Browser or Online recording, automatic read-aloud, and review before translation. Menu labels support English, Japanese, Indonesian, Burmese, Chinese, Korean and Vietnamese. The existing device speech rate and pitch also apply here.

The latest turn appears first. Conversation expands earlier turns. The page keeps up to 20 turns when switching app tabs. New conversation or a page refresh clears them. Translation history and recordings are not written to browser storage.

## How existing content is used

The index contains the original 191 phrase cards, 8 phrase builders, 190 vocabulary entries and 206 word choices, totaling 595 built-in entries. Custom cards join the index from the existing browser storage.

- Exact matches reuse an available saved translation without an API request. English and Japanese pairs are indexed, alongside the other-language staff translations already present in your code.
- Related wording appears under From KumaSpeak. Open card returns to the existing card and its word choices. Use phrase explicitly selects the saved wording.
- Approximate matches do not replace the user's sentence.
- Cards with blanks require the user to choose their values in the existing card screen. Default names, symptoms, amounts or medicine instructions are never substituted into a typed sentence.
- For new sentences, the server retrieves up to four relevant built-in phrase or vocabulary entries as terminology hints, then requests an online translation of the original text. Custom cards are matched locally and are not sent as reference examples.

The index reads the existing data files. Future phrase and vocabulary additions join the index automatically.

## Enable online translation

No new npm dependency is required.

On your hosting service:

1. Add the server environment variable `OPENAI_API_KEY` with your OpenAI API key.
2. Optionally add `KUMASPEAK_TRANSLATION_MODEL=gpt-4.1-mini` and `KUMASPEAK_TRANSCRIPTION_MODEL=gpt-4o-mini-transcribe`. These are the code defaults.
3. Set a hosting firewall rate limit for `/api/translate` and `/api/transcribe`, and configure an OpenAI project usage budget or alerts. The code's 20-request/minute client limit and 120-request/minute global limit apply to one server instance. Serverless instances do not share these counters.
4. Redeploy the app. Open Translate and try a new sentence in each direction.

Keep the key in server environment variables. Use `.env.local.example` as a reference. For local development, add its entries to `.env.local`, then run `npm install` and `npm run dev`.

`KUMASPEAK_TRANSLATION_ENABLED=false` disables both online services while leaving saved-phrase lookup available. `KUMASPEAK_RECORDING_ENABLED=false` disables the recording fallback while retaining browser dictation and online text translation.

Online translation and recording incur API usage charges for the app owner. Saved-text matches do not call the API. Browser dictation and device read-aloud do not use this app's OpenAI key.

## Speech support

Microphone input needs HTTPS, or localhost during development. The microphone starts after a speaking-button press and stops after Finish, Cancel, leaving Translate or hiding the page. The app never starts another listening turn automatically during read-aloud.

Browser dictation depends on browser and language support and often needs an internet connection. Online recording provides another input option when the server API key is configured. Language recognition quality varies, including for Burmese. Typing and the phone keyboard's microphone remain alternatives.

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

The phrase data, existing staff translations, slot options, icons, app metadata, sitemap, robots file and package dependencies are unchanged. The full-source archive excludes dependencies, build caches, virtual environments and Git history. Run `npm install` after extracting the full source.

## Validation

TypeScript and a production build were checked. Automated checks cover phrase and custom-card lookup, missing translations, template handling, request validation, provider response parsing, rate limits, both speaking directions, review before translation, microphone cleanup, large display, menu localization, reloads and 320/390/1280-pixel layouts.

Speech events, recordings and online API responses were simulated during browser checks. A physical microphone and paid API calls were not exercised. After adding your key, check recognition and playback on the phones and browsers your users use.

## Documentation

- [Browser speech recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- [Microphone access](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [OpenAI structured responses](https://developers.openai.com/api/docs/guides/structured-outputs)
- [OpenAI transcription](https://developers.openai.com/api/docs/guides/speech-to-text)
- [GPT-4.1 mini](https://developers.openai.com/api/docs/models/gpt-4.1-mini)
