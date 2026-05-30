import { SITE } from '@/lib/site';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
        sameAs: Object.values(SITE.social),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            email: SITE.email,
            telephone: SITE.phone,
            contactType: 'customer service',
            areaServed: 'US',
            availableLanguage: ['en'],
          },
        ],
      }}
    />
  );
}

export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE.url}/#org`,
        name: SITE.name,
        image: `${SITE.url}/og.png`,
        url: SITE.url,
        telephone: SITE.phone,
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.city,
          addressRegion: SITE.region,
          addressCountry: SITE.country,
        },
        areaServed: ['San Francisco Bay Area', 'United States'],
        servesCuisine: 'Mediterranean',
        sameAs: Object.values(SITE.social),
      }}
    />
  );
}

export function FAQSchema({ items }: { items: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((i) => ({
          '@type': 'Question',
          name: i.q,
          acceptedAnswer: { '@type': 'Answer', text: i.a },
        })),
      }}
    />
  );
}

export function CorporateServiceSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Silk Corporate Gifting',
        provider: { '@id': `${SITE.url}/#org` },
        areaServed: 'United States',
        serviceType: 'Corporate gifting',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 25, unitText: 'boxes' },
        },
      }}
    />
  );
}
