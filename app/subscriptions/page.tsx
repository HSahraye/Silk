import type { Metadata } from 'next';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { CTA } from '@/components/sections/CTA';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Origin Series — Subscriptions',
  description:
    'Monthly rotating baklava experiences from Silk. A curated tour of California pistachios, regional pastry techniques, and limited collaborations.',
};

const plans = [
  {
    name: 'Origin · Monthly',
    price: '$94',
    cadence: '/ month',
    description: 'One signature box, monthly. Free shipping in the Bay Area.',
    features: [
      'One 12-piece box / month',
      'Monthly tasting card + provenance notes',
      'Free Bay Area delivery',
      'Skip or pause anytime',
    ],
    cta: { label: 'Join the waitlist', href: '/contact?type=retail&plan=monthly' },
    highlight: false,
  },
  {
    name: 'Origin · Reserve',
    price: '$184',
    cadence: '/ month',
    description: 'Larger format + early access to seasonal collaborations.',
    features: [
      'One 24-piece box / month',
      'First access to limited drops',
      'Founder letter + producer Q&A',
      'Free national cold-chain shipping',
      'Reserve-only flavor archive',
    ],
    cta: { label: 'Join the waitlist', href: '/contact?type=retail&plan=reserve' },
    highlight: true,
  },
  {
    name: 'Origin · Quarterly',
    price: '$248',
    cadence: '/ quarter',
    description: 'Three boxes, three seasons. The gifting-friendly plan.',
    features: [
      'Three 12-piece boxes / year (one per season)',
      'Gift mode: route boxes to different recipients',
      'Concierge swap and reschedule',
      'National cold-chain shipping',
    ],
    cta: { label: 'Join the waitlist', href: '/contact?type=retail&plan=quarterly' },
    highlight: false,
  },
];

const roadmap = [
  { month: 'Aug', name: 'Madera Kerman', note: 'Single-origin California pistachio, brown butter.' },
  { month: 'Sep', name: 'Sonoma Walnut', note: 'Late-harvest walnut, honey, cardamom.' },
  { month: 'Oct', name: 'Aleppo Reserve', note: 'Heritage technique, ghee-rich, rose dust.' },
  { month: 'Nov', name: 'Cacao Noir', note: 'Single-origin Madagascar cacao, smoked salt.' },
  { month: 'Dec', name: 'Saffron Gold', note: 'Persian saffron, candied citrus, pistachio crown.' },
  { month: 'Jan', name: 'Yuzu Frost', note: 'Yuzu, white sesame, restrained sugar.' },
];

export default function SubscriptionsPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <Reveal>
            <Badge variant="gold">The Origin Series · Now accepting waitlist</Badge>
            <h1 className="mt-6 max-w-4xl font-display text-display-xl balance">
              A monthly tour of how baklava can taste.
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-muted pretty">
              Each month, a single-origin ingredient or regional technique. Built around what's
              ripe, what's traditional, and what's worth obsessing over.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section id="plans" className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionEyebrow>Plans</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              Pick a cadence. Pause whenever.
            </h2>
            <p className="mt-5 text-ink-muted">
              Pricing is launch-window placeholder. Final pricing locks at GA.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <Card
                  className={
                    p.highlight
                      ? 'border-gold-500/40 bg-gradient-to-b from-gold-500/[0.06] to-transparent'
                      : ''
                  }
                >
                  <CardBody className="flex h-full flex-col gap-7">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-2xl text-ink">{p.name}</h3>
                        {p.highlight && <Badge variant="gold">Most popular</Badge>}
                      </div>
                      <p className="mt-3 text-sm text-ink-muted pretty">{p.description}</p>
                    </div>
                    <div>
                      <span className="font-display text-5xl text-ink">{p.price}</span>
                      <span className="ml-1 text-sm text-ink-muted">{p.cadence}</span>
                    </div>
                    <ul className="space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <ButtonLink
                        href={p.cta.href}
                        variant={p.highlight ? 'primary' : 'secondary'}
                        className="w-full"
                        arrow
                      >
                        {p.cta.label}
                      </ButtonLink>
                    </div>
                  </CardBody>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Roadmap */}
      <Section className="border-t border-line bg-bg-subtle/40">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionEyebrow>Flavor roadmap</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              The next six months, in advance.
            </h2>
          </div>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((r, i) => (
              <Reveal key={r.month} delay={i * 0.04}>
                <li className="bg-bg-raised/70 p-7">
                  <div className="font-mono text-xs uppercase tracking-widest text-gold-200">
                    {r.month}
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-ink balance">{r.name}</h3>
                  <p className="mt-2 text-sm text-ink-muted pretty">{r.note}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CTA
        eyebrow="The Origin Series"
        title="Reserve your spot."
        body="We're seating subscribers in cohorts. Join the waitlist to be invited in the next opening."
        primary={{ label: 'Join the waitlist', href: '/contact?type=retail' }}
        secondary={{ label: 'See process', href: '/process' }}
      />
    </>
  );
}
