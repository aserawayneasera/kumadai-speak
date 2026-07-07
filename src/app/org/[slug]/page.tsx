import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AppFooter from '@/components/AppFooter'
import TapSpeakClient from './TapSpeakClient'
import { DEMO_ORGANIZATIONS, getDemoOrganization } from '@/lib/partnerOrgDemo'

export function generateStaticParams() {
  return DEMO_ORGANIZATIONS.map((organization) => ({ slug: organization.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const organization = getDemoOrganization(params.slug)
  return {
    title: organization ? `${organization.name} phrase cards` : 'Partner phrase cards',
    description: organization
      ? `Tap-to-speak phrase cards for residents of ${organization.name}.`
      : 'Tap-to-speak phrase cards.',
  }
}

function TrackedLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const joiner = href.includes('?') ? '&' : '?'
  const trackedHref = `${href}${joiner}utm_source=tap_speak&utm_medium=org_page&utm_campaign=sakura_heights_kurokami`
  return (
    <a href={trackedHref} className={className} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  )
}

export default function PartnerApartmentTapSpeakPage({ params }: { params: { slug: string } }) {
  const organization = getDemoOrganization(params.slug)
  if (!organization) notFound()

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="bg-gradient-to-br from-teal-900 via-cyan-800 to-slate-900 px-5 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-sm font-bold text-cyan-100 underline underline-offset-4">← Back to free Tap & Speak</Link>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.25em] text-cyan-200">Partner phrase set</p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{organization.name}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-cyan-50">
            Custom phrase cards for residents and the apartment manager. This is what the landlord pays for: the free tool becomes specific to their building.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-black">Tap a Japanese card to speak</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Use this at the apartment office, on the phone, or when asking the manager for help.</p>
          <div className="mt-6">
            <TapSpeakClient phrases={organization.phrases} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-12">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-black">Connected resident support</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <TrackedLink className="rounded-2xl bg-teal-50 p-5 ring-1 ring-teal-100 hover:bg-teal-100" href={organization.links.hello}>
              <p className="font-black text-teal-950">Kumamoto Hello</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Move-in checklist and city hall tasks.</p>
            </TrackedLink>
            <TrackedLink className="rounded-2xl bg-teal-50 p-5 ring-1 ring-teal-100 hover:bg-teal-100" href={organization.links.gomi}>
              <p className="font-black text-teal-950">Gomi Guide</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Correct apartment garbage area and rules.</p>
            </TrackedLink>
            <TrackedLink className="rounded-2xl bg-teal-50 p-5 ring-1 ring-teal-100 hover:bg-teal-100" href={organization.links.tapSpeak}>
              <p className="font-black text-teal-950">Tap & Speak</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">This apartment phrase set.</p>
            </TrackedLink>
          </div>
        </div>
      </section>

      <AppFooter appName="Kumadai Tap & Speak" />
    </main>
  )
}
