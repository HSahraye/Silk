'use client';

import { Building2, Users, Scale, BriefcaseBusiness, HeartHandshake } from 'lucide-react';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Card, CardBody } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

const audiences = [
  { icon: Users, label: 'Executive Assistants', sub: 'Repeat sends, calendar holds, recipient management — quietly handled.' },
  { icon: HeartHandshake, label: 'People & Culture', sub: 'New hires, anniversaries, milestones. The moments worth marking.' },
  { icon: BriefcaseBusiness, label: 'Venture firms', sub: 'Founder welcomes, LP outreach, portfolio gestures sent at the right hour.' },
  { icon: Scale, label: 'Law firms', sub: 'Client thank-yous, deal closes, the moves that deserve more than chocolates.' },
  { icon: Building2, label: 'Enterprise teams', sub: 'Account-based gifting tied to the moments that move pipeline.' },
];

export function CorporateBand() {
  return (
    <Section id="corporate" className="border-t border-line bg-bg-subtle/40">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <SectionEyebrow>Corporate gifting</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              The gift your clients will still mention next quarter.
            </h2>
            <p className="mt-5 text-lg text-ink-muted pretty">
              Bulk orders, custom branding, recipient routing, white-glove arrival. Built for
              teams who measure their gifting in opened doors — not opened boxes.
            </p>
          </div>
          <div className="flex gap-3">
            <ButtonLink href="/corporate" variant="primary" arrow>
              Explore corporate
            </ButtonLink>
            <ButtonLink href="/contact?type=corporate" variant="secondary">
              Talk to us
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.05}>
              <Card>
                <CardBody className="flex flex-col gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-bg text-gold-300">
                    <a.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-medium tracking-tight text-ink">{a.label}</div>
                    <p className="mt-1.5 text-sm text-ink-muted pretty">{a.sub}</p>
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
