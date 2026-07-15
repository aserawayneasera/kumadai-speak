import SponsorCard from '@/components/SponsorCard';

const contactEmail = 'anonymous.kuma@icloud.com';

const packages = [
  ['Office license', 'From ¥2,000 / month', 'Custom phrase set for one office, clinic, school, or counter.'],
  ['Setup support', 'From ¥4,000 setup', 'QR page, staff-use guide, and first phrase customization.'],
  ['Custom web app', 'Estimate after meeting', 'A small tool for organizations serving foreign residents or students.'],
];

export default function PartnersPage() {
  const contactHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
    'Kumadai Tap & Speak partner inquiry',
  )}`;

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 no-underline shadow-sm"
        >
          ← Back to app
        </a>

        <section className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="hk-primary-bg relative overflow-hidden p-6 text-white">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-cyan-200/20 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/60">
                Partners
              </p>
              <h1 className="mt-2 text-3xl font-black leading-tight">
                Partner with Kumadai Tap & Speak
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
                Help international students and Japanese staff communicate better at
                counters, clinics, offices, schools, and daily-life support points.
              </p>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  English
                </p>
                <h2 className="mt-2 text-xl font-black text-slate-950">
                  Why this helps
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Tap & Speak is not a normal content website. It is a communication
                  tool. The strongest partner model is a paid or customized version for
                  offices, clinics, dorms, schools, and companies that often support
                  foreign residents or international students.
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                  日本語
                </p>
                <h2 className="mt-2 text-xl font-black text-emerald-950">
                  どうして役に立つか
                </h2>
                <p className="mt-3 text-sm leading-6 text-emerald-950">
                  Tap & Speakは、読むだけのサイトではなく、会話を助けるツールです。
                  大学窓口、病院、寮、学校、会社などで、外国人と日本人スタッフの会話を少し楽にします。
                  その場所に合うフレーズを追加することもできます。
                </p>
              </div>
            </section>

            <section>
              <p className="text-sm font-black text-slate-950">Best partner use</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {[
                  ['University offices', 'Custom cards for student support, forms, and appointments.'],
                  ['Clinics', 'Basic intake, symptoms, insurance, and payment phrases.'],
                  ['Dorms and companies', 'Move-in, rules, emergency, and daily support phrases.'],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-3xl border border-slate-200 p-4">
                    <h3 className="text-sm font-black text-slate-950">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <SponsorCard
              title="Custom phrase set for your office"
              description="This sample partner card leads to a custom page or consultation. It belongs on partner and resource pages, not inside the main speaking screen."
              cta="Contact Anonymous Kuma"
              href={contactHref}
              note="Sponsor placements should stay away from buttons, speech controls, and urgent communication flows."
            />

            <section>
              <p className="text-sm font-black text-slate-950">Simple pricing idea</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {packages.map(([name, price, detail]) => (
                  <div key={name} className="rounded-3xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-black text-slate-950">{name}</p>
                    <p className="mt-1 text-lg font-black text-emerald-700">{price}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
              <h2 className="text-lg font-black text-blue-950">
                Interested in a custom version?
              </h2>
              <p className="mt-2 text-sm leading-6 text-blue-950">
                Please send the place where the app will be used and the situations
                where staff and foreign users often get stuck.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="/partners-pitch-en-ja.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-800 no-underline shadow-sm hover:bg-blue-50"
                >
                  Download pitch PDF
                </a>

                <a
                  href={contactHref}
                  className="inline-flex rounded-2xl bg-blue-700 px-5 py-3 text-sm font-black text-white no-underline shadow-sm hover:bg-blue-800"
                >
                  Email Anonymous Kuma
                </a>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
