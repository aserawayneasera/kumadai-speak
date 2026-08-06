type ContactPageProps = {
  params: {
    locale: string;
  };
};

export default function ContactPage({ params }: ContactPageProps) {
  const homeHref = '/';
  const emailHref = 'mailto:asera.wa@gmail.com?subject=Kumadai%20Speak%20feedback';

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
          <p className="text-sm font-semibold hk-primary-text">Contact</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Help improve Kumadai Speak
          </h1>

          <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              Send corrections, broken links, missing official sources, translation problems, or ideas for new sections.
            </p>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="font-semibold text-blue-800">Email</p>
              <a
                href={emailHref}
                className="mt-2 inline-block text-sm font-bold text-blue-700 no-underline"
              >
                asera.wa@gmail.com
              </a>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <p className="font-semibold text-gray-800">Useful details to include</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-gray-600">
                <li>The page, tab, or section name</li>
                <li>The link or information that needs correction</li>
                <li>The language you were using</li>
                <li>A screenshot, if it helps explain the issue</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="font-semibold text-amber-800">Important</p>
              <p className="mt-1 text-xs text-gray-700">
                For emergencies, city-office decisions, immigration, legal, health, tax, or money matters, contact the official office directly. This app is a guide, not an official decision service.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
