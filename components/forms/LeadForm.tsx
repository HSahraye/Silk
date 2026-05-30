'use client';

import { useState, useTransition } from 'react';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { track } from '@/lib/analytics';

type Intent = 'corporate' | 'retail' | 'press' | 'franchise' | 'general';

const fields: Record<
  Intent,
  { name: string; label: string; type?: string; required?: boolean; placeholder?: string; full?: boolean }[]
> = {
  corporate: [
    { name: 'name', label: 'Your name', required: true },
    { name: 'workEmail', label: 'Work email', type: 'email', required: true },
    { name: 'company', label: 'Company', required: true },
    { name: 'role', label: 'Role' },
    { name: 'volume', label: 'Approx. boxes / order', placeholder: 'e.g., 50' },
    { name: 'timeline', label: 'Target send date' },
    { name: 'notes', label: 'What\'s the moment?', full: true, placeholder: 'Holiday program, client thank-yous, IPO day…' },
  ],
  retail: [
    { name: 'name', label: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'notes', label: 'Tell us what you\'re sending and to whom', full: true },
  ],
  press: [
    { name: 'name', label: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'outlet', label: 'Outlet' },
    { name: 'notes', label: 'What are you working on?', full: true },
  ],
  franchise: [
    { name: 'name', label: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'region', label: 'Region of interest' },
    { name: 'background', label: 'Operating background', full: true },
  ],
  general: [
    { name: 'name', label: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'notes', label: 'How can we help?', full: true },
  ],
};

export function LeadForm({ intent = 'corporate' as Intent }: { intent?: Intent }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    startTransition(async () => {
      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ intent, ...data }),
        });
        if (!res.ok) throw new Error(await res.text());
        track('lead_submit', { intent });
        setStatus('success');
        form.reset();
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
        setStatus('error');
      }
    });
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 py-6">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-200 to-gold-500 text-bg">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <h3 className="font-display text-2xl text-ink">Got it — we'll be in touch.</h3>
          <p className="mt-2 text-ink-muted">
            A program manager will respond within one business day. In a hurry?{' '}
            <a className="text-gold-200 underline-offset-4 hover:underline" href="mailto:team@silk.gifts">
              team@silk.gifts
            </a>
          </p>
        </div>
      </div>
    );
  }

  const list = fields[intent] ?? fields.general;

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate>
      <input type="hidden" name="intent" value={intent} />
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {list.map((f) => (
        <label
          key={f.name}
          className={cn('flex flex-col gap-2', f.full && 'sm:col-span-2')}
        >
          <span className="text-xs uppercase tracking-widest text-ink-subtle">
            {f.label}
            {f.required && <span className="ml-1 text-gold-300">*</span>}
          </span>
          {f.full ? (
            <textarea
              name={f.name}
              required={f.required}
              placeholder={f.placeholder}
              rows={4}
              className="rounded-2xl border border-line bg-bg-subtle px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-ink-subtle focus:border-gold-400 focus:bg-bg-raised"
            />
          ) : (
            <input
              name={f.name}
              type={f.type || 'text'}
              required={f.required}
              placeholder={f.placeholder}
              className="h-11 rounded-full border border-line bg-bg-subtle px-4 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-ink-subtle focus:border-gold-400 focus:bg-bg-raised"
            />
          )}
        </label>
      ))}

      <div className="sm:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-subtle">
          We only use this to respond to you. Read our{' '}
          <a href="/legal/privacy" className="underline-offset-4 hover:underline">
            privacy policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 items-center justify-center gap-2 self-end rounded-full bg-ink px-6 text-[15px] font-medium text-ink-inverse transition-colors duration-300 hover:bg-gold-100 disabled:opacity-60"
        >
          {pending ? 'Sending…' : 'Send'}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      {status === 'error' && (
        <div className="sm:col-span-2 flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg ?? 'Something went wrong — please try again or email us directly.'}</span>
        </div>
      )}
    </form>
  );
}
