'use client';

import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Card, CardBody } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';

const quotes = [
  {
    quote:
      'Our top clients used to receive seven cookie tins a quarter. Now they remember the box that was Silk.',
    name: 'Marlena Park',
    role: 'Chief of Staff',
    org: 'Series C SaaS, San Francisco',
  },
  {
    quote:
      'We replaced our entire holiday gifting program with Silk. Our renewal team booked 38% more thank-you meetings.',
    name: 'Devon Olabisi',
    role: 'VP Customer Success',
    org: 'Fintech, Palo Alto',
  },
  {
    quote:
      'It looks like a tech product, tastes like an heirloom recipe. Founders message me about it weeks later.',
    name: 'Priya Chandran',
    role: 'Partner',
    org: 'Early-stage VC',
  },
  {
    quote:
      'Logistics that don\'t embarrass us. Recipient updates, brand-matched packaging, zero melted-chocolate disasters.',
    name: 'Aaron Mitsui',
    role: 'Head of People',
    org: 'AI Lab, San Francisco',
  },
];

export function Testimonials() {
  return (
    <Section id="testimonials" className="border-t border-line bg-bg-subtle/40">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <SectionEyebrow>Field reports</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              The teams sending Silk send it again.
            </h2>
          </div>
          <p className="max-w-sm text-ink-muted pretty">
            Real placeholder quotes pending case-study approvals. The actual programs behind them
            are referenceable on request.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.06}>
              <Card>
                <CardBody className="flex h-full flex-col justify-between gap-8">
                  <p className="font-display text-xl text-ink balance lg:text-2xl">
                    "{q.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-200 to-gold-500 font-display text-base text-bg">
                      {q.name.split(' ').map((s) => s[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ink">{q.name}</div>
                      <div className="text-xs text-ink-muted">
                        {q.role} · {q.org}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
