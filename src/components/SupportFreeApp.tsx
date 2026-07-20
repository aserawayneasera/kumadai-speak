'use client';

const SUPPORT_URL = 'https://buymeacoffee.com/wayneasera'

export default function SupportFreeApp() {
  return (
    // <section className="mx-auto max-w-3xl px-5 pb-6 pt-1" aria-label="Support this free app">
     <section className="mx-auto max-w-xl px-3 py-3 pb-6 pt-0" aria-label="Support this free app">
      <div className="rounded-2xl border border-gray-200/80 bg-white/70 px-4 py-3 text-sm shadow-sm backdrop-blur">
        {/* <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:center-between"> */}
        <div className="flex-col gap-3 sm:flex-row sm:items-center sm:center-between">
          <p className="text-xs leading-relaxed text-center text-black-500">
            <span className="mr-1" aria-hidden="true">☕</span>
            <strong>Did you find this helpful?</strong> <br /> You're welcome to support the guide, but it's completely <strong>OPTIONAL</strong>. <br />Your support helps keep it free for students, residents, and visitors. <br />Thank you.
          </p>
          <br />
        </div>
        <div className="shrink-0 items-center gap-2 pt-0 text-center sm:flex sm:justify-center">
          <a
            href={SUPPORT_URL}
            data-auto-translate="false"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 no-underline transition hover:bg-amber-100"
          >
            Support
          </a>
          <a
            href="mailto:anonymous.kuma@icloud.com?subject=Kumamoto%20Hello%20feedback"
            className="rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-xs font-bold text-gray-700 no-underline transition hover:bg-gray-100"
          >
            Feedback
          </a>
        </div>
        {/* </div> */}
      </div>
    </section>
  );
}