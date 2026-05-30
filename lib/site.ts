export const SITE = {
  name: 'Silk',
  domain: 'silk.gifts',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://silk.gifts',
  tagline: 'The executive gifting standard.',
  description:
    'Silk crafts architectural baklava for executives, corporate gifting programs, and people who refuse to send another cookie tin.',
  email: 'team@silk.gifts',
  phone: '+1 (415) 555-0142',
  city: 'San Francisco',
  region: 'CA',
  country: 'US',
  social: {
    instagram: 'https://instagram.com/silk',
    linkedin: 'https://linkedin.com/company/silk-gifts',
    twitter: 'https://twitter.com/silkgifts',
  },
} as const;

export const NAV = [
  { label: 'Corporate', href: '/corporate' },
  { label: 'Subscriptions', href: '/subscriptions' },
  { label: 'Our Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
] as const;
