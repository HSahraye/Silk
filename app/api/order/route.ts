import { NextResponse } from 'next/server';
import { getProduct } from '@/lib/products';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  productSlug?: string;
  productName?: string;
  unitPrice?: number;
  totalPrice?: number;
  quantity?: number;
  giftWrap?: boolean;
  senderName?: string;
  senderEmail?: string;
  recipientName?: string;
  recipientStreet?: string;
  recipientCity?: string;
  recipientState?: string;
  recipientZip?: string;
  deliveryDate?: string;
  message?: string;
};

function isEmail(v: unknown): v is string {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  /* Server-side validation — never trust the client */
  if (!body.productSlug || !getProduct(body.productSlug)) {
    return NextResponse.json({ error: 'Unknown product' }, { status: 400 });
  }
  if (!isEmail(body.senderEmail)) {
    return NextResponse.json({ error: 'A valid sender email is required' }, { status: 400 });
  }
  if (!body.senderName || !body.recipientName || !body.recipientStreet || !body.recipientCity || !body.recipientZip) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const qty = Math.max(1, Math.min(500, Math.floor(body.quantity ?? 1)));

  const order = {
    receivedAt: new Date().toISOString(),
    product: { slug: body.productSlug, name: body.productName, unitPrice: body.unitPrice, totalPrice: body.totalPrice, quantity: qty, giftWrap: !!body.giftWrap },
    sender: { name: body.senderName, email: body.senderEmail },
    recipient: {
      name: body.recipientName,
      address: {
        street: body.recipientStreet,
        city: body.recipientCity,
        state: body.recipientState ?? '',
        zip: body.recipientZip,
      },
      deliveryDate: body.deliveryDate || null,
    },
    message: body.message ?? '',
  };

  /* Fan out — every integration is optional and failure-tolerant */
  const tasks: Promise<unknown>[] = [];

  if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_GUID_CORPORATE) {
    const formGuid = process.env.HUBSPOT_FORM_GUID_CONTACT || process.env.HUBSPOT_FORM_GUID_CORPORATE;
    tasks.push(
      fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${formGuid}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [
              { name: 'email', value: order.sender.email },
              { name: 'firstname', value: order.sender.name },
              { name: 'lifecyclestage', value: 'opportunity' },
              { name: 'silk_intent', value: 'order' },
              { name: 'silk_product', value: order.product.name ?? '' },
              { name: 'silk_quantity', value: String(qty) },
              { name: 'silk_total_cents', value: String(order.product.totalPrice ?? 0) },
              { name: 'silk_recipient', value: order.recipient.name },
              { name: 'silk_recipient_city', value: order.recipient.address.city },
              { name: 'silk_recipient_state', value: order.recipient.address.state },
              { name: 'silk_message', value: order.message },
            ],
            context: {
              pageUri: request.headers.get('referer') ?? '',
              hutk: '',
            },
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
          from: 'Silk Orders <noreply@silk.gifts>',
          to: [process.env.LEAD_NOTIFY_EMAIL],
          subject: `New order · ${order.product.name} × ${qty} → ${order.recipient.name}`,
          text: JSON.stringify(order, null, 2),
        }),
      }).catch(() => null),
    );

    // Sender confirmation email
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Silk <hello@silk.gifts>',
          to: [order.sender.email],
          subject: `We received your Silk order for ${order.recipient.name}`,
          text: `Hi ${order.sender.name},\n\nThank you. Your order for ${qty} × ${order.product.name} bound for ${order.recipient.name} has been received.\n\nA Silk specialist will send a secure payment link and confirm the delivery window within one business day.\n\n— The Silk team`,
        }),
      }).catch(() => null),
    );
  }

  await Promise.allSettled(tasks);
  return NextResponse.json({ ok: true });
}
