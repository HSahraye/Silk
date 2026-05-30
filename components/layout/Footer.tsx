import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { SITE } from '@/lib/site';

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Gift',
    links: [
      { label: 'Corporate', href: '/corporate' },
      { label: 'Subscriptions', href: '/subscriptions' },
      { label: 'Send a Gift', href: '/contact?type=retail' },
      { label: 'Gift Cards', href: '/contact?type=retail' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Our Process', href: '/process' },
      { label: 'Press', href: '/contact?type=press' },
      { label: 'Franchise', href: '/contact?type=franchise' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Shipping', href: '/faq#shipping' },
      { label: 'Allergens', href: '/faq#allergens' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg-subtle">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-ink-muted pretty">
              {SITE.tagline} Architectural baklava for executives, gifting programs, and people
              who refuse to send another cookie tin.
            </p>
            <div className="mt-6 flex gap-3 text-sm">
              <a
                href={SITE.social.linkedin}
                className="text-ink-muted hover:text-ink transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <span className="text-line-strong">·</span>
              <a
                href={SITE.social.instagram}
                className="text-ink-muted hover:text-ink transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <span className="text-line-strong">·</span>
              <a
                href={SITE.social.twitter}
                className="text-ink-muted hover:text-ink transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div className="eyebrow mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <div className="text-xs text-ink-subtle">
            © {new Date().getFullYear()} Silk Gifting, Inc. Crafted in {SITE.city}, {SITE.region}.
          </div>
          <div className="flex gap-5 text-xs text-ink-subtle">
            <Link href="/legal/privacy" className="hover:text-ink-muted">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-ink-muted">
              Terms
            </Link>
            <Link href="/legal/accessibility" className="hover:text-ink-muted">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
