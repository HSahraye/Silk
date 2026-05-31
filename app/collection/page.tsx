import type { Metadata } from 'next';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { ProductCard } from '@/components/commerce/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import { CTA } from '@/components/sections/CTA';
import { PRODUCTS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'The Collection',
  description:
    'Browse the full Silk gift collection — The Petite, The Reserve, The Origin Series, The Table, and custom corporate programs.',
  alternates: { canonical: '/collection' },
};

export default function CollectionPage() {
  return (
    <>
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionEyebrow>The Collection</SectionEyebrow>
            <h1 className="mt-5 max-w-3xl font-display text-display-xl balance">
              Five ways to send a Silk.
            </h1>
            <p className="mt-7 max-w-2xl text-xl text-ink-muted pretty">
              From the everyday thank-you to the custom-branded program — every box is the same
              hand-folded baklava, presented at the scale that suits the moment.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CTA
        eyebrow="Not sure where to start?"
        title="Tell us about the moment — we&rsquo;ll suggest the right box."
        body="A two-sentence note about who it&rsquo;s for and when. We&rsquo;ll come back within one business day with a recommendation."
        primary={{ label: 'Talk to us', href: '/contact?type=retail' }}
        secondary={{ label: 'See the story', href: '/story' }}
      />
    </>
  );
}
