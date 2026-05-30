'use client';

import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

type Row = {
  attribute: string;
  cookies: boolean | string;
  chocolate: boolean | string;
  fruit: boolean | string;
  silk: boolean | string;
};

const rows: Row[] = [
  { attribute: 'Visually unforgettable', cookies: false, chocolate: false, fruit: false, silk: true },
  { attribute: 'Shelf life > 14 days', cookies: false, chocolate: true, fruit: false, silk: true },
  { attribute: 'Ships in branded packaging', cookies: false, chocolate: 'Sometimes', fruit: false, silk: true },
  { attribute: 'Custom dedication card', cookies: 'Limited', chocolate: 'Limited', fruit: false, silk: true },
  { attribute: 'Hand-crafted, not extruded', cookies: false, chocolate: false, fruit: false, silk: true },
  { attribute: 'Bay-Area same-week', cookies: true, chocolate: true, fruit: true, silk: true },
  { attribute: 'White-glove fulfillment', cookies: false, chocolate: false, fruit: false, silk: true },
];

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (typeof value === 'string') {
    return <span className="text-sm text-ink-muted">{value}</span>;
  }
  if (value) {
    return (
      <span
        className={
          highlight
            ? 'inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-200 to-gold-500 text-bg'
            : 'inline-flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink'
        }
      >
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink-subtle">
      <Minus className="h-3.5 w-3.5" />
    </span>
  );
}

export function WhySilk() {
  return (
    <Section id="why-silk">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionEyebrow>Why Silk</SectionEyebrow>
            <h2 className="mt-4 font-display text-display-lg balance">
              Most gifts are forgettable.
              <br />
              <span className="gold-text">Silk isn't.</span>
            </h2>
            <p className="mt-6 max-w-md text-ink-muted pretty">
              We benchmarked Silk against the categories executives default to. The gap isn't
              taste — it's intent. Everything below is a deliberate design choice.
            </p>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-line bg-bg-raised/40 backdrop-blur">
                <div className="grid grid-cols-5 items-center gap-2 border-b border-line bg-bg-subtle/70 px-5 py-4 text-xs uppercase tracking-widest text-ink-subtle sm:px-6">
                  <div className="col-span-1">Attribute</div>
                  <div className="text-center">Cookies</div>
                  <div className="text-center">Chocolate</div>
                  <div className="text-center">Fruit basket</div>
                  <div className="text-center text-gold-200">Silk</div>
                </div>
                <ul>
                  {rows.map((row, i) => (
                    <motion.li
                      key={row.attribute}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="grid grid-cols-5 items-center gap-2 border-b border-line px-5 py-4 last:border-0 sm:px-6"
                    >
                      <div className="text-sm text-ink">{row.attribute}</div>
                      <div className="flex justify-center">
                        <Cell value={row.cookies} />
                      </div>
                      <div className="flex justify-center">
                        <Cell value={row.chocolate} />
                      </div>
                      <div className="flex justify-center">
                        <Cell value={row.fruit} />
                      </div>
                      <div className="flex justify-center">
                        <Cell value={row.silk} highlight />
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
