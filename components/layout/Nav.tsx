'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { NAV } from '@/lib/site';
import { cn } from '@/lib/cn';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-silk',
        scrolled
          ? 'bg-bg/70 backdrop-blur-xl border-b border-line'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
        <Logo />

        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium tracking-tight transition-colors duration-300',
                  active
                    ? 'text-ink'
                    : 'text-ink-muted hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/contact"
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Contact
          </ButtonLink>
          <ButtonLink href="/collection" variant="primary" size="sm" arrow>
            Send a Gift
          </ButtonLink>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-line bg-bg/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-[1200px] px-5 py-4">
              <ul className="flex flex-col">
                {NAV.map((item) => (
                  <li key={item.href} className="border-b border-line last:border-0">
                    <Link
                      href={item.href}
                      className="block py-3.5 text-base font-medium tracking-tight text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-3.5">
                  <ButtonLink href="/contact" variant="secondary" size="md" className="w-full">
                    Contact sales
                  </ButtonLink>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
