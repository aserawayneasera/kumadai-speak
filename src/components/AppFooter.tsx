import Link from 'next/link';

type AppFooterProps = {
  appName: string;
  creatorName?: string;
  year?: number;
  aboutHref?: string;
  contactHref?: string;
  privacyHref?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  phoneNumber?: string;
};

export default function AppFooter({
  appName,
  creatorName = 'Wayne Asera',
  year = new Date().getFullYear(),
  aboutHref = '/about',
  contactHref = '/contact',
  privacyHref = '/privacy',
  linkedinUrl,
  githubUrl,
  phoneNumber,
}: AppFooterProps) {
  const contactLinks = [
    linkedinUrl ? { label: 'LinkedIn', href: linkedinUrl } : null,
    githubUrl ? { label: 'GitHub', href: githubUrl } : null,
    phoneNumber ? { label: phoneNumber, href: `tel:${phoneNumber.replace(/[^+\d]/g, '')}` } : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    // <footer className="border-t border-slate-200 bg-white px-5 py-10 text-center text-slate-500">
    <footer className="mt-12 border-t bg-white/80 px-4 pt-6 pb-44 text-center text-sm text-gray-500 sm:pb-20">
      <p className="text-sm font-semibold">{appName}™</p>
      <p className="mt-1 text-sm">Created by {creatorName}</p>
      <p className="mt-1 text-sm">© {year} {creatorName}. All rights reserved.</p>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs">
        <Link href={aboutHref} className="text-slate-600 underline underline-offset-4">
          About
        </Link>
                <Link href={contactHref} className="text-slate-600 underline underline-offset-4">
          Contact
        </Link>
                <Link href={privacyHref} className="text-slate-600 underline underline-offset-4">
          Privacy
        </Link>
        {contactLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-slate-600 underline underline-offset-4"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
