import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/corporate', '/subscriptions', '/process', '/about', '/faq', '/contact'];
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${SITE.url}${r}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: r === '' ? 1 : 0.7,
  }));
}
