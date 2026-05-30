'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { LeadForm } from './LeadForm';
import { cn } from '@/lib/cn';

const tabs: { id: 'retail' | 'corporate' | 'press' | 'franchise'; label: string; hint: string }[] = [
  { id: 'retail', label: 'Send a Gift', hint: 'Single sends, subscriptions, gift cards.' },
  { id: 'corporate', label: 'Corporate', hint: 'Bulk, custom branding, programs.' },
  { id: 'press', label: 'Press', hint: 'Interviews, samples, media inquiries.' },
  { id: 'franchise', label: 'Franchise', hint: 'Regional operating opportunities.' },
];

export function ContactRouter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const current = (params.get('type') ?? 'retail') as (typeof tabs)[number]['id'];

  const setTab = (id: string) => {
    const next = new URLSearchParams(params.toString());
    next.set('type', id);
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const active = tabs.find((t) => t.id === current) ?? tabs[0];

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" className="flex flex-wrap gap-1.5 rounded-full border border-line bg-bg p-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={current === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors duration-300',
              current === t.id
                ? 'bg-ink text-ink-inverse'
                : 'text-ink-muted hover:text-ink',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>
        <div className="text-sm text-ink-muted">{active.hint}</div>
        <div className="mt-6">
          <LeadForm intent={active.id} />
        </div>
      </div>
    </div>
  );
}
