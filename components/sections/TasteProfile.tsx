'use client';

import { motion } from 'framer-motion';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { TheBreak, Harvest } from '@/components/visuals/EditorialImages';

const notes = [
  {
    label: 'First',
    title: 'Crisp.',
    body: 'A clean, audible snap as the spoon meets phyllo — forty-one delicate sheets, each brushed by hand and baked to a brittle, amber edge.',
  },
  {
    label: 'Middle',
    title: 'Buttered, honeyed, warm.',
    body: 'Cultured European butter melts into the layers; raw Sonoma honey pulls everything inward. Floral, almost orchard-like, never cloying.',
  },
  {
    label: 'Finish',
    title: 'Green, lingering pistachio.',
    body: 'A long pistachio finish — bright, grassy, faintly toasted. The kind of taste that returns to you on the walk back to your car.',
  },
];

const ingredients = [
  { name: 'California Kerman pistachio', origin: 'Madera County · single grower' },
  { name: 'Cultured European butter', origin: '84% butterfat · slow-fermented' },
  { name: 'Raw Sonoma honey', origin: 'Wildflower · seasonal varietals' },
  { name: 'Hand-rolled phyllo', origin: 'Forty-one sheets, each one brushed' },
];

export function TasteProfile() {
  return (
    <Section id="taste" className="relative overflow-hidden border-t border-line bg-bg-subtle/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3"
        style={{
          background:
            'radial-gradient(700px 320px at 70% 0%, rgba(116,151,58,0.08), transparent 60%), radial-gradient(700px 320px at 20% 100%, rgba(217,184,112,0.08), transparent 60%)',
        }}
      />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionEyebrow>Taste profile</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              A short essay on the bite.
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink-muted pretty">
              We tasted Silk against thirty-two other baklavas before it left our kitchen.
              These are the three notes everyone agreed on.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:max-w-md">
              <Reveal>
                <TheBreak aspect="aspect-[3/4]" />
              </Reveal>
              <Reveal delay={0.1}>
                <Harvest aspect="aspect-[3/4]" />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="space-y-px overflow-hidden rounded-3xl border border-line bg-line">
              {notes.map((n, i) => (
                <motion.li
                  key={n.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-bg-raised/70 p-7 sm:p-9"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gold-300">
                      {n.label}
                    </span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <h3 className="mt-4 font-display text-3xl text-ink balance lg:text-4xl">
                    {n.title}
                  </h3>
                  <p className="mt-4 max-w-2xl text-ink-muted pretty">{n.body}</p>
                </motion.li>
              ))}
            </ol>

            <Reveal>
              <div className="mt-8 grid gap-x-8 gap-y-3 rounded-3xl border border-line bg-bg-raised/40 p-6 sm:grid-cols-2">
                {ingredients.map((ing) => (
                  <div key={ing.name} className="flex items-start gap-3 py-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                    <div>
                      <div className="text-sm text-ink">{ing.name}</div>
                      <div className="text-xs text-ink-muted">{ing.origin}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
