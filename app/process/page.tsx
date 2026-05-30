import type { Metadata } from 'next';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Card, CardBody } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'From single-origin California pistachios to white-glove delivery — the four stages behind every Silk box.',
};

const stages = [
  {
    n: '01',
    chapter: 'Sourcing',
    title: 'A single grower, a single varietal.',
    body:
      'We work directly with a fourth-generation Madera County family for our Kerman pistachios — the same nut, every batch. Cultured European butter, single-source. Honey from a small Sonoma apiary. We refuse blending.',
    detail: [
      'Madera County pistachios · single grower',
      'European cultured butter · 84% fat',
      'Sonoma raw honey · seasonal varietals',
      'Ceylon cinnamon, Persian saffron, Sicilian pistachio paste',
    ],
  },
  {
    n: '02',
    chapter: 'Production',
    title: 'Forty-one sheets, no extruders.',
    body:
      'Every tray is hand-built. Phyllo is brushed sheet by sheet — 41 layers — by a pastry team trained for six weeks before they ship a single piece. We score, bake, and pour syrup at controlled temperatures down to the degree.',
    detail: [
      'Six-week pastry training program',
      '41 hand-brushed phyllo layers per tray',
      'Temperature-mapped oven cycle',
      'Syrup applied at 92°F for crystal-clean snap',
    ],
  },
  {
    n: '03',
    chapter: 'Packaging',
    title: 'Designed by industrial designers.',
    body:
      'Our box was prototyped fourteen times. Magnetic-close lid, thermoform tray, food-safe vellum, debossed wordmark, foil-stamped serial. The unboxing is part of the product.',
    detail: [
      'Magnetic-close keepsake lid',
      'Custom thermoform tray, recyclable',
      'Foil-stamped batch serial',
      'Vellum interleaf, dedication card slot',
    ],
  },
  {
    n: '04',
    chapter: 'Shipping',
    title: 'Cold-chain, white-glove, tracked.',
    body:
      'Bay Area orders move by climate-controlled van with named couriers. National orders travel in a phase-change cold pack engineered for 36-hour transit. Recipients receive a delivery confirmation and a way to thank you back.',
    detail: [
      'Climate-controlled Bay Area courier',
      '36-hour phase-change national pack',
      'Recipient delivery confirmation',
      'Response routing to sender mailbox',
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>Our Process</SectionEyebrow>
            <h1 className="mt-5 max-w-4xl font-display text-display-xl balance">
              We rebuilt baklava from the supply chain up.
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-muted pretty">
              Four stages. Each one deliberately slower than industry standard, because the
              moment you receive a Silk box should feel like nothing else.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Stages */}
      <Section className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {stages.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-5 lg:sticky lg:top-28">
                    <div className="font-mono text-xs uppercase tracking-widest text-gold-200">
                      Stage {s.n} · {s.chapter}
                    </div>
                    <h2 className="mt-4 font-display text-display-lg balance">{s.title}</h2>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-lg text-ink-muted pretty">{s.body}</p>
                    <Card className="mt-8">
                      <CardBody>
                        <ul className="divide-y divide-line">
                          {s.detail.map((d) => (
                            <li
                              key={d}
                              className="flex items-start gap-3 py-3.5 text-sm text-ink first:pt-0 last:pb-0"
                            >
                              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CTA
        eyebrow="Send something engineered"
        title="See the process arrive in person."
        body="Order a sample for your team or talk to us about a custom program."
        primary={{ label: 'Send a Gift', href: '/contact?type=retail' }}
        secondary={{ label: 'Corporate orders', href: '/corporate' }}
      />
    </>
  );
}
