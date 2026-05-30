'use client';

import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { TheGift } from '@/components/visuals/EditorialImages';

const reasons = [
  {
    n: '01',
    title: 'It opens like an occasion.',
    body: 'A magnetic lid, a vellum interleaf, a card you wrote yourself. The unwrapping is half the gift.',
  },
  {
    n: '02',
    title: 'It tastes the way you remember things.',
    body: 'Cultured butter slow-baked into forty-one layers, finished with raw honey and a soft snow of pistachio. The kind of taste that returns to you, hours later.',
  },
  {
    n: '03',
    title: 'It says something the card can\'t.',
    body: 'Considered. Generous. Specific. The gesture is the message — and the message lingers longer than the box does.',
  },
];

export function WhyRemember() {
  return (
    <Section id="why-remember" className="paper">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:order-2">
            <Reveal>
              <TheGift aspect="aspect-[4/5] w-full max-w-[440px] lg:ml-auto" />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <SectionEyebrow>Why people remember Silk</SectionEyebrow>
            <Reveal>
              <h2 className="mt-4 font-display text-display-lg balance">
                A gift you don't forget receiving —
                <br />
                or sending.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg text-ink-muted pretty">
                Most gifts disappear within a week. Silk is built for the opposite — the kind
                of box that gets photographed, mentioned, kept.
              </p>
            </Reveal>

            <ul className="mt-12 space-y-10">
              {reasons.map((r, i) => (
                <Reveal key={r.n} delay={i * 0.08}>
                  <li className="grid grid-cols-[auto_1fr] items-start gap-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-gold-300">
                      {r.n}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-ink balance">{r.title}</h3>
                      <p className="mt-3 max-w-lg text-ink-muted pretty">{r.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
