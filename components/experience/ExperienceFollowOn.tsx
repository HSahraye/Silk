'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { ProductCard } from '@/components/commerce/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { PRODUCTS } from '@/lib/products';

/**
 * What appears after the pinned cinematic ends.
 * Gives users a soft landing: featured collection + story entry + CTA row.
 */
export function ExperienceFollowOn() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <>
      {/* Featured collection */}
      <Section className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <SectionEyebrow>The Collection</SectionEyebrow>
              <h2 className="mt-4 font-display text-display-lg balance">
                Pick the box that suits the moment.
              </h2>
              <p className="mt-5 text-lg text-ink-muted pretty">
                Send a single box, an event-sized presentation, or start a quiet monthly cadence.
                Every order arrives the same way the film shows it.
              </p>
            </div>
            <Link
              href="/collection"
              className="group inline-flex items-center gap-1.5 text-sm text-gold-200"
            >
              See the full collection
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Story + Corporate split */}
      <Section className="border-t border-line bg-bg-subtle/40">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                eyebrow: 'The Silk Story',
                title: 'Read how we rebuilt baklava.',
                body: 'The orchard, the butter, the hand, the keepsake — four decisions made the slow way.',
                cta: { label: 'The Story', href: '/story' },
              },
              {
                eyebrow: 'Corporate gifting',
                title: 'For programs of 25 to 2,500.',
                body: 'Custom-branded sleeves, recipient routing, NET-30. Same hand-folded boxes, at scale.',
                cta: { label: 'Talk to corporate', href: '/corporate' },
              },
            ].map((b, i) => (
              <Reveal key={b.eyebrow} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-line bg-bg-raised/70 p-9 lg:p-12"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(420px 200px at 50% 0%, rgba(217,184,112,0.12), transparent 60%)',
                    }}
                  />
                  <div className="eyebrow text-gold-300">{b.eyebrow}</div>
                  <h3 className="mt-4 font-display text-display-md text-ink balance">{b.title}</h3>
                  <p className="mt-5 max-w-md text-ink-muted pretty">{b.body}</p>
                  <div className="mt-8">
                    <ButtonLink href={b.cta.href} variant="secondary" arrow>
                      {b.cta.label}
                    </ButtonLink>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
