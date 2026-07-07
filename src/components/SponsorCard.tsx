type SponsorCardProps = {
  label?: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
  note?: string;
  className?: string;
};

export default function SponsorCard({
  label = 'Sponsored local partner',
  title,
  description,
  href,
  cta = 'Learn more',
  note,
  className = '',
}: SponsorCardProps) {
  const cardClassName = [
    'rounded-3xl border border-emerald-200 bg-white p-5 shadow-sm',
    'transition hover:-translate-y-0.5 hover:shadow-md',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={cardClassName} aria-label={label}>
      <p className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-emerald-700">
        {label}
      </p>

      <h3 className="mt-3 text-lg font-black leading-tight text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>

      {note ? <p className="mt-3 text-xs leading-5 text-slate-500">{note}</p> : null}

      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer sponsored' : undefined}
          className="mt-4 inline-flex rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-black text-white no-underline shadow-sm hover:bg-emerald-700"
        >
          {cta}
        </a>
      ) : null}
    </aside>
  );
}
