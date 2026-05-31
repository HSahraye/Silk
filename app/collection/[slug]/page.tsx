import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { ImagePlaceholder } from '@/components/visuals/ImagePlaceholder';
import { Reveal } from '@/components/ui/Reveal';
import { GiftCheckout } from '@/components/commerce/GiftCheckout';
import { CTA } from '@/components/sections/CTA';
import { PRODUCTS, getProduct, productImageDirection } from '@/lib/products';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Not found' };
  return {
    title: `${product.name} — ${product.tier}`,
    description: product.description,
    alternates: { canonical: `/collection/${slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const dir = productImageDirection(slug);
  const others = PRODUCTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Section className="pt-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            The Collection
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Hero image + facts */}
            <div className="lg:col-span-6">
              <Reveal>
                <ImagePlaceholder
                  id={`PRD · ${product.slug.toUpperCase()}`}
                  title={product.name}
                  direction={`Product hero · ${product.tier}`}
                  aspect="aspect-[4/5]"
                  palette={dir.palette}
                />
              </Reveal>

              <Card className="mt-6">
                <CardBody>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-ink-subtle">
                        Pieces
                      </div>
                      <div className="mt-1 font-display text-xl text-ink">
                        {product.pieces > 0 ? product.pieces : '—'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-ink-subtle">
                        Servings
                      </div>
                      <div className="mt-1 font-display text-xl text-ink">{product.servings}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-ink-subtle">
                        Ships in
                      </div>
                      <div className="mt-1 font-display text-xl text-ink">{product.shipsIn}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-ink-subtle">
                        Shelf life
                      </div>
                      <div className="mt-1 font-display text-xl text-ink">{product.shelfLife}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs uppercase tracking-widest text-ink-subtle">
                        Flavors
                      </div>
                      <div className="mt-1 text-sm text-ink">{product.flavors.join(' · ')}</div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Details + Checkout */}
            <div className="lg:col-span-6">
              <Reveal>
                <SectionEyebrow>{product.tier}</SectionEyebrow>
                <div className="mt-4 flex items-baseline gap-4">
                  <h1 className="font-display text-display-xl text-ink balance">{product.name}</h1>
                  {product.ribbon && <Badge variant="gold">{product.ribbon}</Badge>}
                </div>
                <div className="mt-3 font-display text-3xl gold-text">{product.priceDisplay}</div>
                <p className="mt-6 text-lg text-ink-muted pretty">{product.description}</p>

                <ul className="mt-8 space-y-3">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <div id="send" className="mt-12">
                <Card>
                  <CardBody>
                    <GiftCheckout product={product} />
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* You might also send */}
      <Section className="border-t border-line bg-bg-subtle/40">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-display-md balance">You might also send</h2>
            <Link href="/collection" className="text-sm text-ink-muted hover:text-ink">
              See all
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => {
              const d = productImageDirection(o.slug);
              return (
                <Link
                  key={o.slug}
                  href={`/collection/${o.slug}`}
                  className="group block"
                >
                  <Card className="h-full transition-transform duration-500 ease-silk group-hover:-translate-y-1">
                    <ImagePlaceholder
                      id={`PRD · ${o.slug.toUpperCase()}`}
                      title={o.name}
                      direction={`Product hero · ${o.tier}`}
                      aspect="aspect-[4/3]"
                      palette={d.palette}
                      className="rounded-b-none rounded-t-3xl"
                    />
                    <div className="flex items-baseline justify-between gap-3 p-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-ink-subtle">
                          {o.tier}
                        </div>
                        <div className="mt-1 font-display text-xl text-ink">{o.name}</div>
                      </div>
                      <div className="font-display text-xl text-ink">{o.priceDisplay}</div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      <CTA
        eyebrow="Larger quantities?"
        title="Twenty-five boxes or two thousand &mdash; same care."
        body="Our corporate team handles bulk sends, custom branding, and procurement docs."
        primary={{ label: 'Explore corporate', href: '/corporate' }}
        secondary={{ label: 'See the story', href: '/story' }}
      />
    </>
  );
}
