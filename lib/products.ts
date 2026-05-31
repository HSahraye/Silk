/**
 * Single source of truth for the Silk Collection.
 * Used by /collection, /collection/[slug], the homepage follow-on,
 * /api/order validation, and sitemap.ts.
 */

export type Product = {
  slug: string;
  name: string;
  tier: string;
  tagline: string;
  description: string;
  pieces: number;
  servings: string;
  price: number; // USD cents
  priceDisplay: string;
  flavors: string[];
  highlights: string[];
  shipsIn: string;
  shelfLife: string;
  popular?: boolean;
  comingSoon?: boolean;
  ribbon?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: 'the-petite',
    name: 'The Petite',
    tier: 'Starter gift',
    tagline: 'The small box that lands big.',
    description:
      'Twelve hand-folded pieces in our signature keepsake box. The everyday answer to a thank-you, a birthday, or a small win that deserves a moment.',
    pieces: 12,
    servings: '2–3 people',
    price: 8400,
    priceDisplay: '$84',
    flavors: ['Honey-pistachio · classic'],
    highlights: [
      'Forty-one delicate layers, hand-folded',
      'California Kerman pistachio crown',
      'Handwritten dedication card included',
      'Bay Area next-day · national cold-chain',
    ],
    shipsIn: '1–2 business days',
    shelfLife: '21 days unopened',
  },
  {
    slug: 'the-reserve',
    name: 'The Reserve',
    tier: 'Signature gift',
    tagline: 'Our most-sent gift.',
    description:
      'Twenty-four pieces, twice the layers, three times the table impact. The default for closing dinners, promotions, and the gestures that warrant restraint and abundance at once.',
    pieces: 24,
    servings: '6–8 people',
    price: 15800,
    priceDisplay: '$158',
    flavors: ['Honey-pistachio', 'Walnut-cardamom'],
    highlights: [
      'Two flavor halves in one keepsake box',
      'Foil-stamped batch serial',
      'Magnetic-close lid, debossed Silk mark',
      'Free national cold-chain shipping',
    ],
    shipsIn: '1–2 business days',
    shelfLife: '21 days unopened',
    popular: true,
    ribbon: 'Most sent',
  },
  {
    slug: 'the-origin-series',
    name: 'The Origin Series',
    tier: 'Subscription',
    tagline: 'A monthly tour of how baklava can taste.',
    description:
      'One curated box per month, single-origin or regional technique. Pause anytime. Each shipment includes a tasting card and producer notes.',
    pieces: 12,
    servings: 'monthly',
    price: 9400,
    priceDisplay: '$94 / mo',
    flavors: ['Rotating · 6 month roadmap'],
    highlights: [
      'A new flavor every month',
      'Tasting card with provenance notes',
      'First access to limited collaborations',
      'Skip or pause from the dashboard',
    ],
    shipsIn: 'First of every month',
    shelfLife: '21 days per shipment',
    ribbon: 'Subscription',
  },
  {
    slug: 'the-table',
    name: 'The Table',
    tier: 'Event gift',
    tagline: 'For the dinner table that’s about to remember tonight.',
    description:
      'Forty-eight pieces presented in a low, footed serving box. Built for closing dinners, board meetings, and the moment everyone reaches in at once.',
    pieces: 48,
    servings: '12–15 people',
    price: 28800,
    priceDisplay: '$288',
    flavors: ['Honey-pistachio', 'Walnut-cardamom', 'Saffron-citrus'],
    highlights: [
      'Three flavor sections, low presentation box',
      'Linen interleaf and serving tongs included',
      'Custom dedication card up to 200 characters',
      'White-glove Bay Area delivery available',
    ],
    shipsIn: '2–3 business days',
    shelfLife: '21 days unopened',
  },
  {
    slug: 'the-program',
    name: 'The Program',
    tier: 'Custom corporate',
    tagline: 'Twenty-five or twenty-five hundred. Same care.',
    description:
      'A custom-branded gifting program with co-branded sleeves, recipient routing, NET-30 invoicing, and a named program manager.',
    pieces: 0,
    servings: 'Custom',
    price: 0,
    priceDisplay: 'From $1,950',
    flavors: ['Custom selection'],
    highlights: [
      'Custom debossed lids + co-branded sleeves',
      'CSV recipient routing + delivery tracking',
      'NET-30 invoicing, W-9, COI on request',
      'Named program manager + quarterly recap',
    ],
    shipsIn: '7 days standard · 4 expedited',
    shelfLife: '21 days unopened',
    ribbon: 'Custom',
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productImageDirection(slug: string) {
  // Used by ImagePlaceholder when no production render exists.
  const m: Record<string, { palette: 'honey' | 'pistachio' | 'rose' | 'ember' | 'paper'; aspect?: string }> = {
    'the-petite': { palette: 'honey' },
    'the-reserve': { palette: 'ember' },
    'the-origin-series': { palette: 'pistachio' },
    'the-table': { palette: 'rose' },
    'the-program': { palette: 'paper' },
  };
  return m[slug] ?? { palette: 'honey' };
}
