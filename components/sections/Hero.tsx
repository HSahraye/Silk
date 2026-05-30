'use client';

import { motion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { BaklavaTower } from '@/components/visuals/BaklavaTower';
import { Marquee } from '@/components/ui/Marquee';

const partners = [
  'Sequoia',
  'Andreessen Horowitz',
  'Stripe',
  'OpenAI',
  'Notion',
  'Figma',
  'Latham & Watkins',
  'Wilson Sonsini',
  'Benchmark',
  'Greylock',
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden grain">
      {/* Background field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(900px_500px_at_50%_-10%,rgba(217,191,115,0.12),transparent_60%)]" />
        <div className="absolute -left-40 top-32 h-[480px] w-[480px] rounded-full bg-gold-500/10 blur-[120px]" />
        <div className="absolute -right-40 top-60 h-[420px] w-[420px] rounded-full bg-pistachio-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-5 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-raised/60 px-3 py-1.5 text-xs text-ink-muted backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-300 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-300" />
              </span>
              Now shipping in the Bay Area · National Q3
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-display-2xl text-ink balance"
            >
              The executive
              <br />
              gifting <span className="gold-text">standard.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-lg text-ink-muted pretty sm:text-xl"
            >
              Stop sending cookies. Silk is architectural baklava — California pistachios,
              cultured butter, hand-layered phyllo — engineered for the moments that matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/contact?type=retail" size="lg" arrow>
                Send a Gift
              </ButtonLink>
              <ButtonLink href="/corporate" variant="secondary" size="lg">
                Corporate Orders
              </ButtonLink>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8"
            >
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-subtle">Layers</dt>
                <dd className="mt-1 font-display text-2xl text-ink">41</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-subtle">Sourcing</dt>
                <dd className="mt-1 font-display text-2xl text-ink">CA</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-subtle">Shelf life</dt>
                <dd className="mt-1 font-display text-2xl text-ink">21 days</dd>
              </div>
            </motion.dl>
          </div>

          <div className="relative lg:col-span-5">
            <BaklavaTower className="relative aspect-[4/5] w-full max-w-[480px] lg:ml-auto" />
          </div>
        </div>
      </div>

      {/* Trust marquee */}
      <div className="border-y border-line bg-bg-subtle/60 py-6">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="eyebrow shrink-0">Chosen by teams at</span>
            <div className="w-full sm:w-auto sm:flex-1 sm:pl-8">
              <Marquee items={partners} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
