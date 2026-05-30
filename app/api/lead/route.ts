import { NextResponse } from 'next/server';
import { scoreLead } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = Record<string, unknown> & {
  intent?: string;
  workEmail?: string;
  email?: string;
  company?: string;
  name?: string;
  notes?: string;
  company_website?: string; // honeypot
};

function ok(email: unknown) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot — silently accept and discard
  if (body.company_website && String(body.company_website).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = body.workEmail || body.email;
  if (!ok(email)) {
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }
  if (!body.name || String(body.name).trim().length < 2) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const score = scoreLead({
    intent: typeof body.intent === 'string' ? body.intent : undefined,
    workEmail: typeof body.workEmail === 'string' ? body.workEmail : undefined,
    email: typeof body.email === 'string' ? body.email : undefined,
    volume: typeof body.volume === 'string' || typeof body.volume === 'number' ? (body.volume as string | number) : undefined,
    company: typeof body.company === 'string' ? body.company : undefined,
  });

  // CRM integrations are intentionally optional; site works without them.
  const tasks: Promise<unknown>[] = [];

  if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_GUID_CORPORATE) {
    const formGuid =
      body.intent === 'corporate'
        ? process.env.HUBSPOT_FORM_GUID_CORPORATE
        : process.env.HUBSPOT_FORM_GUID_CONTACT || process.env.HUBSPOT_FORM_GUID_CORPORATE;
    tasks.push(
      fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${formGuid}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: Object.entries(body)
              .filter(([k]) => k !== 'company_website')
              .map(([name, value]) => ({ name, value: String(value ?? '') })),
            context: { pageUri: request.headers.get('referer') ?? '' },
          }),
        },
      ).catch(() => null),
    );
  }

  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL) {
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Silk Site <noreply@silk.gifts>',
          to: [process.env.LEAD_NOTIFY_EMAIL],
          subject: `New ${body.intent ?? 'general'} lead — score ${score}`,
          text: JSON.stringify({ ...body, score }, null, 2),
        }),
      }).catch(() => null),
    );
  }

  await Promise.allSettled(tasks);

  return NextResponse.json({ ok: true, score });
}
