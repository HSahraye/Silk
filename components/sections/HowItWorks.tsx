'use client';

import { motion } from 'framer-motion';
import { Section, SectionEyebrow } from '@/components/ui/Section';

const steps = [
  {
    n: '01',
    title: 'Choose',
    body: 'A single box, a quiet subscription, or a custom-branded collection for your team.',
  },
  {
    n: '02',
    title: 'Inscribe',
    body: 'A handwritten card, a recipient list, the date you\'d like it to arrive — quietly.',
  },
  {
    n: '03',
    title: 'Arrive',
    body: 'Delivered with the same care used to create it. White-glove in the Bay Area, climate-controlled nationally.',
  },
  {
    n: '04',
    title: 'Remembered',
    body: 'A small confirmation reaches you. The bigger one usually reaches you later, from them.',
  },
];

export function HowItWorks() {
  return (
    <Section id="how" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-4 font-display text-display-lg balance">
            From decision to arrival, with very little in between.
          </h2>
        </div>

        <div className="mt-16 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-[42px] hidden h-px origin-left bg-gradient-to-r from-transparent via-gold-500/40 to-transparent lg:block"
            aria-hidden
          />
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative z-10 flex h-[84px] w-[84px] items-center justify-center rounded-full border border-line bg-bg-raised ember-edge">
                  <span className="font-mono text-sm tracking-widest text-gold-300">{s.n}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink balance">{s.title}</h3>
                <p className="mt-3 max-w-xs text-ink-muted pretty">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
