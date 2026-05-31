import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { PRODUCTS } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/story',
    '/collection',
    '/corporate',
    '/subscriptions',
    '/process',
    '/about',
    '/faq',
    '/contact',
  ];
  const lastModified = new Date();
  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE.url}${r}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: r === '' ? 1 : r === '/collection' ? 0.9 : 0.7,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${SITE.url}/collection/${p.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ];
}
