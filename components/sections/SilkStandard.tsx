'use client';

import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const pillars = [
  {
    eyebrow: '01 · Sourcing',
    title: 'California pistachios.',
    body: 'Single-origin Kerman pistachios from a fourth-generation Madera County grower. Tree-to-tray traceability on every box.',
  },
  {
    eyebrow: '02 · Fat',
    title: 'Cultured European butter.',
    body: 'Higher butterfat, slower fermentation. The reason a Silk layer audibly snaps when you bite it.',
  },
  {
    eyebrow: '03 · Craft',
    title: 'Hand-layered phyllo, 41 sheets deep.',
    body: 'No extruders. No shortcuts. Each tray is built by a pastry team trained for six weeks before they ever ship.',
  },
  {
    eyebrow: '04 · Form',
    title: 'Modern packaging, engineered to arrive perfect.',
    body: 'Magnetic-close keepsake box, custom thermoform tray, cold-chain insert. Designed by industrial designers, not a printer.',
  },
];

export function SilkStandard() {
  return (
    <Section id="standard" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -z-10 h-[60%] -translate-y-1/2 bg-[radial-gradient(700px_300px_at_50%_50%,rgba(217,191,115,0.08),transparent_60%)]"
      />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <SectionEyebrow>The Silk Standard</SectionEyebrow>
          <h2 className="mt-4 font-display text-display-lg balance">
            Four decisions, made the slow way.
          </h2>
          <p className="mt-5 text-lg text-ink-muted pretty">
            Most baklava is a commodity. We rebuilt the supply chain so ours isn't.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <article className="group relative h-full bg-bg-raised/70 p-8 transition-colors duration-500 ease-silk hover:bg-bg-raised lg:p-10">
                <div className="eyebrow text-gold-200">{p.eyebrow}</div>
                <h3 className="mt-5 font-display text-2xl text-ink lg:text-3xl balance">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-ink-muted pretty">{p.body}</p>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-silk group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(400px 200px at 80% 0%, rgba(217,191,115,0.10), transparent 60%)',
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
