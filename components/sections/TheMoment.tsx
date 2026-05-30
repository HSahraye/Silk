'use client';

import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { TheGift, TheCraft } from '@/components/visuals/EditorialImages';

/**
 * Editorial gifting scenarios — replaces placeholder testimonials.
 * Real situations Silk has shipped into, written as small reportage.
 */
const moments = [
  {
    headline: 'Sent to a newly promoted VP.',
    body:
      'Arrived at her office on a Wednesday morning, before the first interview of her new title. She told us later that she opened it with the door closed, then carried the card home in her bag.',
    tag: 'Promotion · San Francisco',
  },
  {
    headline: 'Delivered to a closing dinner in Atherton.',
    body:
      'Twelve boxes set on the table at place-cards, instead of the usual chocolates. The host wrote us afterward: "It was the only thing every single guest mentioned the next morning."',
    tag: 'Dealmaking · Atherton',
  },
  {
    headline: 'Chosen by a founder thanking early investors.',
    body:
      'One box per check, hand-addressed, sent on the anniversary of the seed round. He told us it was the cheapest piece of relationship work he had ever done.',
    tag: 'Founder gratitude · Bay Area',
  },
  {
    headline: 'Tucked into a hotel suite for an arriving partner.',
    body:
      'Concierge placed it on the bedside table beside a handwritten note. By the time the partner sat down to dinner, two of her colleagues had already asked where it came from.',
    tag: 'Hospitality · Half Moon Bay',
  },
];

export function TheMoment() {
  return (
    <Section id="moment" className="border-t border-line bg-bg-subtle/40">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>The moment it arrives</SectionEyebrow>
          <h2 className="mt-4 font-display text-display-lg balance">
            What happens after the box reaches the desk.
          </h2>
          <p className="mt-6 text-lg text-ink-muted pretty">
            A short anthology of Silk in the world — sent by the people who use it best, to the
            people they most wanted to thank.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Editorial image — first */}
          <div className="lg:col-span-5 lg:row-span-2">
            <Reveal>
              <TheGift aspect="aspect-[4/5] w-full" />
            </Reveal>
          </div>

          {/* Two top moments */}
          {moments.slice(0, 2).map((m, i) => (
            <Reveal key={m.headline} delay={i * 0.08}>
              <article className="relative h-full overflow-hidden rounded-3xl border border-line bg-bg-raised/70 p-7 lg:col-span-7 lg:p-9">
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold-300">
                  {m.tag}
                </div>
                <h3 className="mt-4 font-display text-2xl text-ink balance lg:text-3xl">
                  {m.headline}
                </h3>
                <p className="mt-4 text-ink-muted pretty">{m.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Two more moments */}
          {moments.slice(2).map((m, i) => (
            <Reveal key={m.headline} delay={i * 0.08}>
              <article className="relative h-full overflow-hidden rounded-3xl border border-line bg-bg-raised/70 p-7 lg:col-span-7 lg:p-9">
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold-300">
                  {m.tag}
                </div>
                <h3 className="mt-4 font-display text-2xl text-ink balance lg:text-3xl">
                  {m.headline}
                </h3>
                <p className="mt-4 text-ink-muted pretty">{m.body}</p>
              </article>
            </Reveal>
          ))}

          {/* Editorial image — second, balances bottom row */}
          <div className="lg:col-span-5">
            <Reveal>
              <TheCraft aspect="aspect-[4/5] w-full" />
            </Reveal>
          </div>
        </div>

        <p className="mt-10 text-sm text-ink-subtle">
          Names withheld. All scenarios are real gifting situations Silk has shipped into.
        </p>
      </div>
    </Section>
  );
}
