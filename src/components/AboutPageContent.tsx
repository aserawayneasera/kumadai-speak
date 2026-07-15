'use client';

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: string;
  enabled?: boolean;
};

type AboutPageContentProps = {
  homeHref?: string;
  appName?: string;
  appTagline?: string;
  creatorName?: string;
  creatorEmail?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  phoneNumber?: string;
};

export default function AboutPageContent({
  homeHref = '/',
  appName = 'Kumadai Tap & Speak™',
  appTagline = 'Two-way communication cards for international students and Japanese staff.',
  creatorName = 'Anonymous Kuma',
  creatorEmail = 'anonymous.kuma@icloud.com',
  linkedinUrl = '',
  githubUrl = '',
  phoneNumber = '',
}: AboutPageContentProps) {
  const contactLinks: ContactLink[] = [
    {
      label: 'Email',
      value: creatorEmail,
      href: `mailto:${creatorEmail}`,
      icon: '✉️',
      enabled: Boolean(creatorEmail),
    },
    {
      label: 'LinkedIn',
      value: 'LinkedIn profile',
      href: linkedinUrl,
      icon: '💼',
      enabled: Boolean(linkedinUrl),
    },
    {
      label: 'GitHub',
      value: 'GitHub profile',
      href: githubUrl,
      icon: '💻',
      enabled: Boolean(githubUrl),
    },
    {
      label: 'Phone',
      value: phoneNumber,
      href: `tel:${phoneNumber.replace(/[^+\d]/g, '')}`,
      icon: '📞',
      enabled: Boolean(phoneNumber),
    },
  ].filter(item => item.enabled);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="mx-auto max-w-3xl">
        <a
          href={homeHref}
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 no-underline shadow-sm"
        >
          ← Back to app
        </a>

        <section className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="hk-primary-bg relative overflow-hidden p-6 text-white">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-cyan-200/20 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/60">About</p>
              <h1 className="mt-2 text-3xl font-black leading-tight">{appName}</h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80">{appTagline}</p>
            </div>
          </div>

          <div className="space-y-4 p-6 text-sm leading-relaxed text-slate-700">
            <p>
              {appName.replace('™', '')} was created and developed by {creatorName}.
            </p>

            <p>
              I made this app to help international students communicate in real situations where simple Japanese can make a big difference. Hospitals, ward offices, real estate offices, university counters, schools, public services, transport, and disaster situations can be stressful when people cannot explain what they need.
            </p>

            <p>
              The app is inspired by Kumamoto University&apos;s Daily Communication Book. The original idea is simple: carry the book, show it to the person, and point at what you need to say. This version turns that into tap, speak, show, replay, favorites, custom cards, and staff-to-student communication.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ['👆', 'Tap', 'Choose the phrase or blank option you need.'],
                ['🔊', 'Speak', 'Play Japanese or the selected understanding language.'],
                ['📱', 'Show', 'Use the large screen when the room is noisy.'],
              ].map(([icon, title, desc]) => (
                <div key={title} className="rounded-2xl border border-teal-100 bg-teal-50 p-4">
                  <p className="text-2xl">{icon}</p>
                  <p className="mt-2 font-black text-teal-900">{title}</p>
                  <p className="mt-1 text-xs text-slate-600">{desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="font-semibold text-amber-900">Translation and safety note</p>
              <p className="mt-1 text-xs text-slate-700">
                Some translations, custom cards, voice output, and browser speech features may be incorrect or unavailable depending on the device. For medical, pregnancy, police, emergency, legal, immigration, money, university, or city-office matters, confirm important details with official staff or official sources.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="font-semibold text-blue-900">For corrections and improvements</p>
              <p className="mt-1 text-xs text-slate-700">
                This is a living project. Send missing phrases, corrections, translation issues, voice problems, or ideas for new situations.
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {contactLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-blue-800 no-underline shadow-sm"
                  >
                    <span className="mr-2">{link.icon}</span>
                    <span>{link.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
