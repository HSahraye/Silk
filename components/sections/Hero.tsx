'use client';

import { motion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';
import { MacroTexture } from '@/components/visuals/EditorialImages';
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
    <section className="relative isolate overflow-hidden grain paper">
      {/* Background field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(900px_500px_at_50%_-10%,rgba(217,184,112,0.16),transparent_60%)]" />
        <div className="absolute -left-40 top-32 h-[480px] w-[480px] rounded-full bg-gold-500/12 blur-[120px] animate-drift" />
        <div className="absolute -right-40 top-60 h-[420px] w-[420px] rounded-full bg-bronze-500/12 blur-[120px] animate-drift" />
      </div>

      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-raised/70 px-3.5 py-1.5 text-xs text-ink-muted backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-300 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-300" />
              </span>
              Hand-folded in San Francisco · Gifts from $84
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display text-display-2xl text-ink balance"
            >
              Designed to be
              <br />
              <span className="gold-text">remembered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-lg text-ink-muted pretty sm:text-xl"
            >
              Honey-glazed phyllo, California pistachio, slow cultured butter — folded by hand
              into a keepsake box that arrives like a small occasion of its own.
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

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm text-ink-muted"
            >
              <span>
                <span className="text-ink">The Petite</span> · 12 pieces · $84
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-line-strong sm:inline-block" />
              <span>
                <span className="text-ink">The Reserve</span> · 24 pieces · $158
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-line-strong sm:inline-block" />
              <span>
                <span className="text-ink">Origin</span> · monthly · from $94
              </span>
            </motion.div>
          </div>

          <div className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <MacroTexture aspect="aspect-[4/5] w-full max-w-[480px] lg:ml-auto" />
            </motion.div>

            {/* Floating editorial caption */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-2 top-10 hidden -rotate-[3deg] rounded-xl border border-line bg-bg-raised/80 px-3 py-2 text-xs backdrop-blur lg:block"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
                Layer
              </div>
              <div className="mt-0.5 font-display text-base text-ink">No. 23 of 41</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust marquee — softened framing */}
      <div className="border-y border-line bg-bg-subtle/60 py-6">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="eyebrow shrink-0">Quietly chosen by teams at</span>
            <div className="w-full sm:w-auto sm:flex-1 sm:pl-8">
              <Marquee items={partners} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
