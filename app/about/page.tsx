import type { Metadata } from 'next';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Card, CardBody } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Metric } from '@/components/ui/Metric';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Silk is building the world\'s most iconic baklava company — premium DTC gifting, corporate programs, and a category we believe deserves a category leader.',
};

const principles = [
  {
    t: 'Craft over scale, until scale earns it.',
    b: 'We refuse to launch a product we wouldn\'t put our name on. Then we figure out how to ship it to everyone.',
  },
  {
    t: 'The packaging is part of the product.',
    b: 'A gift you remember opens twice — first as an object, then as a taste. We engineer both.',
  },
  {
    t: 'Sourcing is the recipe.',
    b: 'You can\'t out-bake bad ingredients. Single-origin or it doesn\'t ship.',
  },
  {
    t: 'Treat recipients as the customer.',
    b: 'Most gifting brands optimize for the sender. We optimize for the moment of receipt.',
  },
];

const milestones = [
  { y: '2025', t: 'Founded in San Francisco' },
  { y: '2025', t: 'First 100 corporate clients onboarded' },
  { y: '2026', t: 'Bay Area cold-chain fulfillment hub' },
  { y: '2026', t: 'National cold-chain shipping' },
  { y: '2027', t: 'Regional production hubs' },
  { y: '2028+', t: 'Franchise network · category leader' },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>About Silk</SectionEyebrow>
            <h1 className="mt-5 max-w-4xl font-display text-display-xl balance">
              Building the world's most iconic baklava company.
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-muted pretty">
              Silk exists because the world has a chocolate company everyone knows, a cookie
              company everyone knows, a fruit basket company everyone knows. Baklava deserves
              one too — but redesigned for the way modern professionals actually gift.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Founder story */}
      <Section className="border-t border-line">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <SectionEyebrow>Founder note</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              A family recipe, a software-grade supply chain.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg text-ink-muted pretty">
              <p>
                Silk started in a home kitchen in the Bay Area, hand-folding phyllo from a
                recipe four generations old. The first box went to a VC partner as a
                thank-you. The second went to her portfolio. The third went to twelve more
                firms. We never advertised.
              </p>
              <p>
                What we noticed in those first months: the people who received Silk
                <em> texted about it</em>. They forwarded photos. They asked where to send one
                themselves. We weren't competing with other baklava brands — we were
                competing with cookie tins, gift baskets, and the seven other things in the
                CEO&rsquo;s mailroom that morning.
              </p>
              <p>
                So we rebuilt. New sourcing. Industrial-designed packaging. A pastry training
                program. Software for recipient tracking. The goal isn't to be the best
                baklava — that part we already know. The goal is to be the brand that defines
                what a modern, considered gift looks like.
              </p>
              <p className="font-display text-ink">— The Silk team</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section className="border-t border-line bg-bg-subtle/40">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionEyebrow>What we believe</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              Four principles we won't compromise.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.05}>
                <Card>
                  <CardBody>
                    <h3 className="font-display text-xl text-ink balance">{p.t}</h3>
                    <p className="mt-3 text-ink-muted pretty">{p.b}</p>
                  </CardBody>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Vision metrics */}
      <Section className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <SectionEyebrow>The plan</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              From Bay Area to category leader.
            </h2>
          </div>
          <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {milestones.map((m, i) => (
              <Reveal key={`${m.y}-${i}`} delay={i * 0.05}>
                <li className="border-t border-line pt-5">
                  <div className="font-mono text-xs uppercase tracking-widest text-gold-200">
                    {m.y}
                  </div>
                  <div className="mt-3 font-display text-xl text-ink balance">{m.t}</div>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-20 grid gap-8 border-t border-line pt-10 sm:grid-cols-4">
            <Metric value="$100M+" label="Long-term gifting brand" />
            <Metric value="6 phases" label="DTC → corporate → national → franchise" />
            <Metric value="100%" label="Recipient-first design" />
            <Metric value="0" label="Sacrifices on ingredients" />
          </div>
        </div>
      </Section>

      <CTA
        eyebrow="Join the build"
        title="We're hiring builders, bakers, and operators."
        body="If you've shipped a brand from zero to category leader before — or want to — talk to us."
        primary={{ label: 'Get in touch', href: '/contact?type=press' }}
        secondary={{ label: 'See the process', href: '/process' }}
      />
    </>
  );
}
