type PrivacyPageProps = {
  params: {
    locale: string;
  };
};

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const homeHref = '/';
  const contactHref = `/${params.locale}/contact`;

  return (
    <main className="min-h-screen hk-page-bg px-5 py-8">
      <div className="mx-auto max-w-3xl">
        <a
          href={homeHref}
          className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 no-underline shadow-sm"
        >
          ← Back to app
        </a>

        <section className="mt-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
          <p className="text-sm font-semibold hk-primary-text">Privacy</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-gray-500">Last updated: October 2, 2026</p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700">
            <section>
              <h2 className="font-bold text-gray-900">Who runs this app</h2>
              <p className="mt-1">
                Kumamoto Tap & Speak was created by Wayne Asera as a practical guide for new foreign residents, students, and visitors in Kumamoto.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">Information stored on your device</h2>
              <p className="mt-1">
                The app may save your checklist progress, notes, language choice, profile details, and recently opened guide sections in your browser storage. This helps the app remember your progress on the same device.
              </p>
              <p className="mt-2 text-xs text-gray-600">
                You can clear this data by using your browser settings or clearing site data for this website.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">Analytics</h2>
              <p className="mt-1">
                The app may use Vercel Web Analytics to understand general usage, such as page views, device type, browser type, and country-level traffic patterns. This helps improve the app.
              </p>
              <p className="mt-2 text-xs text-gray-600">
                The app does not use analytics to collect your name, email address, phone number, exact address, visa details, notes, or checklist answers.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">Translation</h2>
              <p className="mt-1">
                The app may use Google Translate or browser translation features for some languages. Translation tools may process text through their own systems. Use official Japanese or English sources for procedures, deadlines, legal rules, health, safety, money, tax, or visa matters.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">Voice and typed translation mode</h2>
              <p className="mt-1">
                The Translate mode requests microphone access only after you press a speaking button. Browser dictation uses your browser&apos;s speech recognition service, which processes audio under its own terms. Online recording sends a short audio recording through this app to OpenAI for transcription. Online translation sends the current sentence and relevant built-in phrase examples to OpenAI. API responses use store: false. Provider processing and retention follow OpenAI&apos;s API data policies.
              </p>
              <p className="mt-2">
                Exact matches with available saved translations are handled in your browser. Conversation text is kept in page memory, including when you switch app tabs. New conversation or a page refresh clears this history. The app does not save recordings or conversation history to browser storage. Microphone capture stops when you finish, cancel, leave Translate, or hide the page. Read-aloud uses your device or browser speech service.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">External links</h2>
              <p className="mt-1">
                The app links to official city, university, transport, housing, utility, and other external websites. Those websites have their own privacy policies and terms.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">Support links</h2>
              <p className="mt-1">
                If a support link such as Buy Me a Coffee or Ko-fi is added, payment and support activity will be handled by that external service. This app does not process card payments directly.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">Advertising</h2>
              <p className="mt-1">
                This app may use Google AdSense to show limited advertising. Google and its partners may use cookies or similar technologies to serve, measure, and improve ads.
                Ads help keep this app free for students, new residents, and visitors. Advertising will not be placed near emergency information, city-office guidance, forms, or important safety content.
                Users can manage personalized ad settings through Google’s ad settings and browser privacy settings.
              </p>
            </section>

            <section>
              <h2 className="font-bold text-gray-900">Contact</h2>
              <p className="mt-1">
                For privacy questions or corrections, use the contact page.
              </p>
              <a
                href={contactHref}
                className="mt-2 inline-block text-sm font-bold text-blue-700 no-underline"
              >
                Contact Wayne Asera
              </a>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
