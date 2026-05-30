'use client';

import { motion } from 'framer-motion';
import { Section, SectionEyebrow } from '@/components/ui/Section';

const steps = [
  { n: '01', title: 'Select', body: 'Choose a collection — Origin, Executive, or custom-branded for your team.' },
  { n: '02', title: 'Personalize', body: 'Add a dedication card, recipient list, and delivery window. CSV upload for bulk.' },
  { n: '03', title: 'Deliver', body: 'White-glove handoff in the Bay Area. Cold-chain national shipping in Q3.' },
  { n: '04', title: 'Impress', body: 'We track delivery confirmations and send you a recipient response summary.' },
];

export function HowItWorks() {
  return (
    <Section id="how" className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-4 font-display text-display-lg balance">
            From decision to delivered — four steps.
          </h2>
        </div>

        <div className="mt-16 relative">
          {/* Connecting line */}
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
                <div className="relative z-10 flex h-[84px] w-[84px] items-center justify-center rounded-full border border-line bg-bg-raised">
                  <span className="font-mono text-sm tracking-widest text-gold-200">{s.n}</span>
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
