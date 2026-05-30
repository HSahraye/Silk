import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Card, CardBody } from '@/components/ui/Card';
import { ContactRouter } from '@/components/forms/ContactRouter';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to Silk about gifting, corporate programs, press, or franchise opportunities. We respond within one business day.',
};

export default function ContactPage() {
  return (
    <Section className="pt-20 sm:pt-24 lg:pt-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionEyebrow>Contact</SectionEyebrow>
            <h1 className="mt-5 font-display text-display-xl balance">
              Tell us what you're sending — or building with us.
            </h1>
            <p className="mt-7 max-w-md text-lg text-ink-muted pretty">
              Pick the channel that fits. Our team replies within one business day.
            </p>

            <dl className="mt-12 space-y-6 text-sm">
              <div>
                <dt className="text-ink-subtle uppercase tracking-widest text-xs">Email</dt>
                <dd className="mt-1">
                  <a className="text-ink hover:text-gold-200" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ink-subtle uppercase tracking-widest text-xs">Phone</dt>
                <dd className="mt-1 text-ink">{SITE.phone}</dd>
              </div>
              <div>
                <dt className="text-ink-subtle uppercase tracking-widest text-xs">Location</dt>
                <dd className="mt-1 text-ink">
                  {SITE.city}, {SITE.region}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <Card>
              <CardBody>
                <Suspense fallback={<div className="h-[420px]" />}>
                  <ContactRouter />
                </Suspense>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
