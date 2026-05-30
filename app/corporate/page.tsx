import type { Metadata } from 'next';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Metric } from '@/components/ui/Metric';
import { LeadForm } from '@/components/forms/LeadForm';
import { CTA } from '@/components/sections/CTA';
import { Boxes, Brush, Truck, BarChart3, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Corporate Gifting',
  description:
    'Bulk ordering, custom branding, recipient routing, white-glove fulfillment. Silk is the alternative to boring corporate gifts.',
};

const reasons = [
  { icon: Boxes, t: 'Bulk ordering', b: 'CSV recipient upload, batched dedications, calendar holds, repeat-send templates.' },
  { icon: Brush, t: 'Custom branding', b: 'Co-branded sleeves, debossed lids, custom dedication cards. Design review in 48 hours.' },
  { icon: Truck, t: 'White-glove fulfillment', b: 'Cold-chain logistics, delivery confirmations, recipient response tracking.' },
  { icon: ShieldCheck, t: 'Procurement-ready', b: 'NET-30 invoicing, W-9, COI, vendor onboarding packets on request.' },
  { icon: BarChart3, t: 'Program reporting', b: 'Quarterly recap: spend, redemption, recipient sentiment, repeat-send velocity.' },
  { icon: Sparkles, t: 'Concierge', b: 'Named program manager. Slack, email, or quarterly review — your cadence.' },
];

const cases = [
  {
    tag: 'Series C SaaS',
    headline: 'Replaced 4-vendor holiday program with one Silk send.',
    metric: '38%',
    metricLabel: 'Lift in renewal thank-you meetings booked',
  },
  {
    tag: 'Early-stage VC',
    headline: 'Founder welcome box for every term sheet signed.',
    metric: '2.4×',
    metricLabel: 'Founder NPS vs. prior gift partner',
  },
  {
    tag: 'AmLaw 100',
    headline: 'Deal-close gifting standardized across 6 practice groups.',
    metric: '92%',
    metricLabel: 'Of partners adopted within one quarter',
  },
];

export default function CorporatePage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>Corporate Gifting</SectionEyebrow>
            <h1 className="mt-5 max-w-4xl font-display text-display-xl balance">
              The alternative to boring corporate gifts.
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-muted pretty">
              Silk powers gifting programs at top venture firms, law firms, and high-growth
              companies in the Bay Area. Built for procurement. Designed for recipients.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#talk" size="lg" arrow>
                Talk to Sales
              </ButtonLink>
              <ButtonLink href="#programs" variant="secondary" size="lg">
                See programs
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:grid-cols-4">
              <Metric value="200+" label="Boxes / order" sub="Standard bulk capacity" />
              <Metric value="48h" label="Branded mockup" sub="Custom packaging proof" />
              <Metric value="98%" label="On-time delivery" sub="Bay Area, last 12 months" />
              <Metric value="NET-30" label="Invoicing" sub="Procurement friendly" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Why */}
      <Section id="programs" className="border-t border-line bg-bg-subtle/40">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionEyebrow>Why teams choose Silk</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              Built for the team that actually sends the gift.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.04}>
                <Card>
                  <CardBody className="flex flex-col gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-bg text-gold-200">
                      <r.icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-medium tracking-tight text-ink">{r.t}</h3>
                    <p className="text-sm text-ink-muted pretty">{r.b}</p>
                  </CardBody>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ROI */}
      <Section className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionEyebrow>The ROI of memorable</SectionEyebrow>
              <h2 className="mt-4 font-display text-display-lg balance">
                Gifts have a hit rate. We optimize for it.
              </h2>
              <p className="mt-6 text-ink-muted pretty">
                A forgettable gift costs you twice — the spend, plus the moment you didn't move.
                Silk's recipient-tracked sends turn every gift into a measured touchpoint.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-3">
                {cases.map((c, i) => (
                  <Reveal key={c.headline} delay={i * 0.08}>
                    <Card>
                      <CardBody className="flex h-full flex-col justify-between gap-8">
                        <div>
                          <div className="eyebrow text-gold-200">{c.tag}</div>
                          <p className="mt-4 font-display text-lg text-ink balance">
                            {c.headline}
                          </p>
                        </div>
                        <div>
                          <div className="font-display text-4xl gold-text">{c.metric}</div>
                          <div className="mt-1 text-sm text-ink-muted">{c.metricLabel}</div>
                        </div>
                      </CardBody>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Workflow */}
      <Section className="border-t border-line bg-bg-subtle/40">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionEyebrow>Bulk ordering workflow</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              From kickoff to delivery in seven days.
            </h2>
          </div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: 'Day 1', t: 'Kickoff', b: 'Program scope, recipient list, branding intake.' },
              { n: 'Day 2', t: 'Mockup', b: 'Custom sleeve + card proof, dedication options.' },
              { n: 'Day 3–5', t: 'Production', b: 'Hand-layered, packed, QA-photographed.' },
              { n: 'Day 6–7', t: 'Delivery', b: 'White-glove handoff, recipient confirmations.' },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.06}>
                <Card>
                  <CardBody>
                    <div className="font-mono text-xs uppercase tracking-widest text-gold-200">
                      {s.n}
                    </div>
                    <h3 className="mt-3 font-display text-2xl text-ink">{s.t}</h3>
                    <p className="mt-3 text-sm text-ink-muted pretty">{s.b}</p>
                  </CardBody>
                </Card>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Lead capture */}
      <Section id="talk" className="border-t border-line">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <SectionEyebrow>Talk to sales</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              Tell us about your program.
            </h2>
            <p className="mt-6 text-ink-muted pretty">
              A program manager will respond within one business day. Prefer to skip the form?
              Book time directly.
            </p>
            <div className="mt-8">
              <ButtonLink
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || '/contact?type=corporate'}
                variant="secondary"
                arrow
              >
                Book intro call
              </ButtonLink>
            </div>
            <div className="mt-12 space-y-4 text-sm text-ink-muted">
              <div>
                <div className="text-ink">Minimum order</div>
                25 boxes for standard programs · 100 for custom branding
              </div>
              <div>
                <div className="text-ink">Lead time</div>
                7 days standard · 4 days expedited
              </div>
              <div>
                <div className="text-ink">Service area</div>
                Bay Area same-week · National cold-chain Q3
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card>
              <CardBody>
                <LeadForm intent="corporate" />
              </CardBody>
            </Card>
          </div>
        </div>
      </Section>

      <CTA
        eyebrow="Custom branding · 100+ boxes"
        title="Become the gift your clients remember."
        body="Whether it's 25 boxes or 2,500, we'll build the program around your calendar, not ours."
        primary={{ label: 'Talk to sales', href: '#talk' }}
        secondary={{ label: 'See subscriptions', href: '/subscriptions' }}
      />
    </>
  );
}
