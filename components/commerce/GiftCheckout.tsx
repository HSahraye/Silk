'use client';

import { useState, useTransition } from 'react';
import { ArrowRight, Check, AlertCircle, Gift, MapPin, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/cn';
import { track } from '@/lib/analytics';
import type { Product } from '@/lib/products';

type Step = 0 | 1 | 2;

const steps: { id: Step; label: string; icon: typeof Gift }[] = [
  { id: 0, label: 'Quantity', icon: Gift },
  { id: 1, label: 'Recipient', icon: MapPin },
  { id: 2, label: 'Dedication', icon: MessageSquare },
];

type FormState = {
  quantity: number;
  giftWrap: boolean;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientStreet: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  deliveryDate: string;
  message: string;
};

export function GiftCheckout({ product }: { product: Product }) {
  const [step, setStep] = useState<Step>(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<FormState>({
    quantity: 1,
    giftWrap: true,
    senderName: '',
    senderEmail: '',
    recipientName: '',
    recipientStreet: '',
    recipientCity: '',
    recipientState: '',
    recipientZip: '',
    deliveryDate: '',
    message: '',
  });

  const total = product.price * form.quantity;
  const totalDisplay = product.price > 0
    ? `$${(total / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : 'Custom quote';

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validateStep = (s: Step): string | null => {
    if (s === 0 && form.quantity < 1) return 'Choose at least one box.';
    if (s === 1) {
      if (!form.senderName.trim()) return 'Your name is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.senderEmail)) return 'A valid email is required.';
      if (!form.recipientName.trim()) return 'Recipient name is required.';
      if (!form.recipientStreet.trim() || !form.recipientCity.trim() || !form.recipientZip.trim())
        return 'A complete recipient address is required.';
    }
    return null;
  };

  const next = () => {
    const err = validateStep(step);
    if (err) { setError(err); return; }
    setError(null);
    setStep((s) => Math.min(2, s + 1) as Step);
  };

  const back = () => { setError(null); setStep((s) => Math.max(0, s - 1) as Step); };

  const submit = () => {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productSlug: product.slug,
            productName: product.name,
            unitPrice: product.price,
            totalPrice: total,
            ...form,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        track('lead_submit', { intent: 'order', product: product.slug, quantity: form.quantity });
        setStatus('success');
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong');
        setStatus('error');
      }
    });
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-5 py-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-200 to-gold-500 text-bg">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="font-display text-3xl text-ink balance">Your gift is on its way to us.</h3>
        <p className="text-ink-muted pretty">
          We&rsquo;ve received your order for <span className="text-ink">{form.quantity} × {product.name}</span> to
          {' '}<span className="text-ink">{form.recipientName}</span>. A confirmation is in your inbox at
          {' '}<span className="text-ink">{form.senderEmail}</span>.
        </p>
        <p className="text-sm text-ink-muted pretty">
          Final payment confirmation lands within one business day, along with a delivery
          window. If anything urgent, email{' '}
          <a className="text-gold-200 underline-offset-4 hover:underline" href="mailto:team@silk.gifts">team@silk.gifts</a>.
        </p>
        <button
          onClick={() => { setStatus('idle'); setStep(0); setForm({ ...form, quantity: 1, message: '' }); }}
          className="mt-2 self-start text-sm text-gold-200 hover:underline"
        >
          Send another gift →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-ink-subtle">Send a gift</div>
          <div className="mt-1 font-display text-2xl text-ink">{product.name}</div>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl text-ink">{totalDisplay}</div>
          <div className="text-xs text-ink-subtle">
            {product.price > 0
              ? `${form.quantity} × ${product.priceDisplay}`
              : 'A program manager will follow up'}
          </div>
        </div>
      </header>

      {/* Stepper */}
      <ol className="flex items-center gap-2">
        {steps.map((s, i) => {
          const active = step === s.id;
          const done = step > s.id;
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => done && setStep(s.id)}
                className={cn(
                  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium tracking-tight transition-colors',
                  active && 'border-gold-300 bg-gold-300/10 text-gold-200',
                  done && 'border-gold-400 bg-gradient-to-br from-gold-200 to-gold-500 text-bg',
                  !active && !done && 'border-line text-ink-muted',
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </button>
              <div className={cn('text-xs', active ? 'text-ink' : 'text-ink-muted')}>
                {s.label}
              </div>
              {i < steps.length - 1 && <div className="ml-1 hidden h-px flex-1 bg-line sm:block" />}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* STEP 0 — Quantity */}
          {step === 0 && (
            <div className="grid gap-5">
              <Field label="How many boxes?">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => set('quantity', Math.max(1, form.quantity - 1))}
                    className="h-11 w-11 rounded-full border border-line bg-bg-subtle text-ink transition-colors hover:border-line-strong"
                    aria-label="Decrease quantity"
                  >−</button>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={form.quantity}
                    onChange={(e) => set('quantity', Math.max(1, Math.min(500, parseInt(e.target.value || '1', 10))))}
                    className="h-11 w-24 rounded-full border border-line bg-bg-subtle px-4 text-center text-base text-ink outline-none focus:border-gold-400"
                  />
                  <button
                    type="button"
                    onClick={() => set('quantity', Math.min(500, form.quantity + 1))}
                    className="h-11 w-11 rounded-full border border-line bg-bg-subtle text-ink transition-colors hover:border-line-strong"
                    aria-label="Increase quantity"
                  >+</button>
                  {form.quantity >= 25 && (
                    <span className="text-xs text-gold-200">
                      Looking for {form.quantity}+? <a href="/corporate" className="underline-offset-4 hover:underline">See corporate</a>
                    </span>
                  )}
                </div>
              </Field>
              <Field label="Include keepsake gift wrap" inline>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.giftWrap}
                    onChange={(e) => set('giftWrap', e.target.checked)}
                    className="h-4 w-4 rounded border-line bg-bg-subtle accent-gold-400"
                  />
                  <span className="text-ink-muted">Linen-wrap with foil seal · included</span>
                </label>
              </Field>
            </div>
          )}

          {/* STEP 1 — Recipient + sender */}
          {step === 1 && (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name *">
                  <Input value={form.senderName} onChange={(v) => set('senderName', v)} />
                </Field>
                <Field label="Your email *">
                  <Input type="email" value={form.senderEmail} onChange={(v) => set('senderEmail', v)} />
                </Field>
              </div>
              <div className="hr-grad" />
              <Field label="Recipient name *">
                <Input value={form.recipientName} onChange={(v) => set('recipientName', v)} />
              </Field>
              <Field label="Street address *">
                <Input value={form.recipientStreet} onChange={(v) => set('recipientStreet', v)} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-[1fr_120px_140px]">
                <Field label="City *">
                  <Input value={form.recipientCity} onChange={(v) => set('recipientCity', v)} />
                </Field>
                <Field label="State">
                  <Input value={form.recipientState} onChange={(v) => set('recipientState', v)} placeholder="CA" />
                </Field>
                <Field label="ZIP *">
                  <Input value={form.recipientZip} onChange={(v) => set('recipientZip', v)} />
                </Field>
              </div>
              <Field label="Deliver on (optional)">
                <Input
                  type="date"
                  value={form.deliveryDate}
                  onChange={(v) => set('deliveryDate', v)}
                />
              </Field>
            </div>
          )}

          {/* STEP 2 — Dedication */}
          {step === 2 && (
            <div className="grid gap-5">
              <Field label="Dedication message (handwritten card)">
                <textarea
                  rows={5}
                  value={form.message}
                  maxLength={280}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="A few quiet lines. We'll transcribe them onto the card by hand."
                  className="rounded-2xl border border-line bg-bg-subtle px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-subtle focus:border-gold-400 focus:bg-bg-raised"
                />
                <div className="mt-1 text-right text-xs text-ink-subtle">
                  {form.message.length} / 280
                </div>
              </Field>
              <div className="rounded-2xl border border-line bg-bg-subtle p-5">
                <div className="text-xs uppercase tracking-widest text-ink-subtle">Summary</div>
                <dl className="mt-3 space-y-1.5 text-sm">
                  <Row k="Item" v={`${form.quantity} × ${product.name}`} />
                  <Row k="Recipient" v={form.recipientName || '—'} />
                  <Row k="Ships to" v={[form.recipientCity, form.recipientState, form.recipientZip].filter(Boolean).join(', ') || '—'} />
                  {form.deliveryDate && <Row k="Deliver on" v={form.deliveryDate} />}
                  <Row k="Total" v={totalDisplay} strong />
                </dl>
                <p className="mt-4 text-xs text-ink-subtle">
                  We&rsquo;ll confirm payment via secure link within one business day. No charge until you approve.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {error && (
        <div className="flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-2 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="text-sm text-ink-muted hover:text-ink"
          >
            ← Back
          </button>
        ) : <span />}

        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-ink-inverse transition-colors duration-300 hover:bg-gold-100"
          >
            Continue
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={pending}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-200 to-gold-500 px-7 text-[15px] font-medium text-bg shadow-glow transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
          >
            {pending ? 'Sending…' : `Send for ${totalDisplay}`}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────────── */

function Field({ label, children, inline }: { label: string; children: React.ReactNode; inline?: boolean }) {
  return (
    <label className={cn('flex flex-col gap-2', inline && 'sm:flex-row sm:items-center sm:justify-between')}>
      <span className="text-xs uppercase tracking-widest text-ink-subtle">{label}</span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 rounded-full border border-line bg-bg-subtle px-4 text-sm text-ink outline-none placeholder:text-ink-subtle focus:border-gold-400 focus:bg-bg-raised"
    />
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-ink-muted">{k}</dt>
      <dd className={cn('text-right', strong ? 'font-display text-base text-ink' : 'text-ink')}>{v}</dd>
    </div>
  );
}
