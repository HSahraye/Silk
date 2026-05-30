'use client';

import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { TheCraft, Harvest } from '@/components/visuals/EditorialImages';

const pillars = [
  {
    eyebrow: '01 · The orchard',
    title: 'A single grower in Madera County.',
    body:
      'Every pistachio is Kerman varietal, from a fourth-generation family farm. We choose the grower long before we choose the recipe.',
  },
  {
    eyebrow: '02 · The butter',
    title: 'Cultured the slow way.',
    body:
      'European butter, fermented past its convenience. It is the reason a Silk layer audibly snaps when you bite it — and why the finish lasts.',
  },
  {
    eyebrow: '03 · The hand',
    title: 'Forty-one delicate layers, finished by hand.',
    body:
      'Phyllo is brushed one sheet at a time by a pastry team trained for six weeks before they ship a single piece. No machines. No shortcuts.',
  },
  {
    eyebrow: '04 · The keepsake',
    title: 'A box you don\'t want to throw away.',
    body:
      'Heavy linen wrap, magnetic close, debossed wordmark, foil-stamped batch number. The packaging is part of the gift, not the freight.',
  },
];

export function SilkStandard() {
  return (
    <Section id="standard" className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[70%] -translate-y-1/2"
        style={{
          background:
            'radial-gradient(800px 360px at 50% 50%, rgba(217,184,112,0.10), transparent 60%)',
        }}
      />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionEyebrow>The Silk standard</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              Four decisions, made the slow way.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink-muted pretty">
              We rebuilt baklava one ingredient at a time. Each decision was chosen because it
              changes the way the box tastes — and the way the moment lands.
            </p>
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <div className="grid grid-cols-2 gap-3">
                <TheCraft aspect="aspect-[3/4]" />
                <Harvest aspect="aspect-[3/4]" />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="group relative h-full bg-bg-raised/70 p-8 transition-colors duration-500 ease-silk hover:bg-bg-raised lg:p-10">
                <div className="eyebrow text-gold-300">{p.eyebrow}</div>
                <h3 className="mt-5 font-display text-2xl text-ink lg:text-3xl balance">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-ink-muted pretty">{p.body}</p>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-silk group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(420px 200px at 80% 0%, rgba(217,184,112,0.12), transparent 60%)',
                  }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
