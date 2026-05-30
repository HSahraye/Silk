/**
 * Unified analytics layer. Fans out to GA4, PostHog, Meta Pixel.
 * Each integration is no-op unless env var is set.
 */

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, props?: Props) => void };
    fbq?: (...args: unknown[]) => void;
  }
}

export const EVENTS = {
  page_view: 'page_view',
  cta_click: 'cta_click',
  lead_submit: 'lead_submit',
  lead_qualified: 'lead_qualified',
  waitlist_join: 'waitlist_join',
  subscription_interest: 'subscription_interest',
  corporate_inquiry: 'corporate_inquiry',
  contact_submit: 'contact_submit',
} as const;

export type EventName = keyof typeof EVENTS;

export function track(event: EventName, props?: Props) {
  if (typeof window === 'undefined') return;

  // GA4
  if (window.gtag) {
    window.gtag('event', event, props ?? {});
  }
  // PostHog
  if (window.posthog) {
    window.posthog.capture(event, props);
  }
  // Meta Pixel — map our events to Meta standard events where it fits
  if (window.fbq) {
    if (event === 'lead_submit' || event === 'corporate_inquiry' || event === 'contact_submit') {
      window.fbq('track', 'Lead', props);
    } else if (event === 'waitlist_join' || event === 'subscription_interest') {
      window.fbq('track', 'CompleteRegistration', props);
    } else {
      window.fbq('trackCustom', event, props);
    }
  }
}

/**
 * Lead scoring scaffold — server uses this to prioritize routing.
 * Replace with HubSpot's API + your own model when CRM is wired.
 */
export function scoreLead(input: {
  intent?: string;
  workEmail?: string;
  email?: string;
  volume?: string | number;
  company?: string;
}) {
  let score = 0;
  const email = (input.workEmail || input.email || '').toLowerCase();
  const freeMail = /@(gmail|yahoo|hotmail|outlook|icloud|aol)\./.test(email);
  if (email && !freeMail) score += 25; // business email
  if (input.intent === 'corporate') score += 30;
  if (input.intent === 'franchise') score += 25;
  if (input.intent === 'press') score += 15;
  const vol = typeof input.volume === 'string' ? parseInt(input.volume, 10) : input.volume;
  if (vol && vol >= 100) score += 20;
  if (vol && vol >= 500) score += 15;
  if (input.company && input.company.length > 1) score += 10;
  return Math.min(score, 100);
}
