import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ImagePlaceholder } from '@/components/visuals/ImagePlaceholder';
import { productImageDirection, type Product } from '@/lib/products';

export function ProductCard({ product }: { product: Product }) {
  const dir = productImageDirection(product.slug);
  return (
    <Link
      href={`/collection/${product.slug}`}
      prefetch
      className="group block focus-visible:outline-none"
    >
      <Card className="h-full transition-transform duration-500 ease-silk group-hover:-translate-y-1">
        <div className="relative">
          <ImagePlaceholder
            id={`PRD · ${product.slug.toUpperCase()}`}
            title={product.name}
            direction={`Product hero · ${product.tier} — palette ${dir.palette}`}
            aspect="aspect-[4/3]"
            palette={dir.palette}
            className="rounded-b-none rounded-t-3xl"
          />
          {product.ribbon && (
            <div className="absolute left-4 top-4">
              <Badge variant="gold">{product.ribbon}</Badge>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 p-7">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-ink-subtle">
                {product.tier}
              </div>
              <h3 className="mt-1 font-display text-2xl text-ink balance">{product.name}</h3>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl text-ink">{product.priceDisplay}</div>
              {product.pieces > 0 && (
                <div className="text-xs text-ink-subtle">{product.pieces} pieces</div>
              )}
            </div>
          </div>
          <p className="text-sm text-ink-muted pretty">{product.tagline}</p>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span className="text-ink-muted">Ships in {product.shipsIn}</span>
            <span className="inline-flex items-center gap-1 text-gold-200 transition-transform duration-300 group-hover:translate-x-0.5">
              View
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
