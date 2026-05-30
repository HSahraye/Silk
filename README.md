# Silk

The executive gifting standard. Marketing site for Silk — a premium baklava gifting company launching in the San Francisco Bay Area.

Built with **Next.js 15 · TypeScript · Tailwind · Framer Motion**.

## Stack

- **Framework**: Next.js 15 (App Router, RSC), React 19
- **Styling**: Tailwind CSS 3 with a custom design system (`tailwind.config.ts`, `app/globals.css`)
- **Motion**: Framer Motion 11
- **Icons**: lucide-react
- **Fonts**: Inter (sans) · Instrument Serif (display) · JetBrains Mono — all via `next/font/google`
- **Analytics architecture**: GA4 · PostHog · Meta Pixel — all env-gated, all no-op when keys are missing
- **CRM**: HubSpot Forms API + Resend email — both optional, gracefully skipped
- **Deployment**: Netlify (`netlify.toml` + `@netlify/plugin-nextjs`)

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage — hero, Why Silk, Silk Standard, Corporate, How It Works, Testimonials, CTA |
| `/corporate` | Corporate gifting — reasons, ROI, workflow, lead form, Calendly placeholder |
| `/subscriptions` | The Origin Series — plans, pricing placeholders, six-month flavor roadmap |
| `/process` | Sourcing → Production → Packaging → Shipping — four-stage storytelling |
| `/about` | Founder note, principles, vision milestones |
| `/faq` | Shipping, shelf life, corporate, ingredients, allergens (+ FAQ schema) |
| `/contact` | Tabbed lead routing: Retail · Corporate · Press · Franchise |

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
```

## Environment variables

Copy `.env.example` to `.env.local`. Everything is optional — the site renders fully without any of these.

```
NEXT_PUBLIC_SITE_URL              # canonical site URL for metadata, sitemap, schema
NEXT_PUBLIC_GA_ID                 # GA4 measurement ID
NEXT_PUBLIC_POSTHOG_KEY           # PostHog project key
NEXT_PUBLIC_POSTHOG_HOST          # PostHog host (defaults to US cloud)
NEXT_PUBLIC_META_PIXEL_ID         # Meta Pixel ID

HUBSPOT_PORTAL_ID                 # HubSpot portal
HUBSPOT_FORM_GUID_CORPORATE       # Form GUID for corporate inbound
HUBSPOT_FORM_GUID_CONTACT         # Form GUID for general contact
HUBSPOT_PRIVATE_TOKEN             # Reserved for future contact-properties API

RESEND_API_KEY                    # Transactional email
LEAD_NOTIFY_EMAIL                 # Internal alert mailbox

NEXT_PUBLIC_CALENDLY_URL          # Used by the corporate page "Book intro call" button
```

## Architecture notes

### Design system

All tokens live in `tailwind.config.ts`. Surfaces (`bg.*`), ink (`ink.*`), and lines (`line.*`) are semantic — designed so we can introduce a light mode later without touching components. The gold and pistachio palettes are full 50–900 scales for future product photography overlays.

Typography ramps via `text-display-{2xl,xl,lg,md}` use `clamp()` to scale fluidly without breakpoints. `font-display` is the serif (Instrument Serif); body is Inter.

Motion is centralized in `lib/motion.ts`. The signature `easeSilk` curve (`cubic-bezier(0.22, 1, 0.36, 1)`) is used everywhere for consistency.

### Component library

- `components/ui/` — primitives (Button, Card, Badge, Accordion, Marquee, Metric, Logo, Reveal, Section, Container)
- `components/sections/` — homepage sections, composed of primitives
- `components/layout/` — Nav (sticky, blur-on-scroll, animated mobile menu) + Footer
- `components/forms/` — LeadForm + ContactRouter
- `components/seo/Schema.tsx` — Organization, LocalBusiness, FAQ, Service JSON-LD
- `components/visuals/BaklavaTower.tsx` — pure-SVG hero visual (no image asset required)

### Lead handling

`POST /api/lead` accepts the form payload, validates email, runs `scoreLead()` from `lib/analytics.ts`, then fires off to HubSpot Forms + Resend in parallel. Both integrations are wrapped in `.catch(() => null)` and `Promise.allSettled` — a missing key or a downstream failure won't 500 the form.

Lead scoring is a transparent rule-based scaffold (`lib/analytics.ts`). Swap for HubSpot's predictive scoring or your own model later.

### Analytics

`lib/analytics.ts` exposes a single `track(event, props)` function that fans out to GA4, PostHog, and Meta Pixel. All three load lazily via `next/script` from `components/analytics/Analytics.tsx` — none of them ship to the client if the env var is unset.

Standard events: `cta_click`, `lead_submit`, `lead_qualified`, `waitlist_join`, `subscription_interest`, `corporate_inquiry`, `contact_submit`.

### SEO

- Per-page `metadata` exports (Next 15 Metadata API)
- Open Graph + Twitter card defaults in `app/layout.tsx`
- Dynamic `sitemap.xml` and `robots.txt` via `app/sitemap.ts` and `app/robots.ts`
- Organization + LocalBusiness JSON-LD on every page
- FAQPage JSON-LD on `/faq`
- Service JSON-LD available for `/corporate` when wired

## Deployment — Netlify

```bash
# one-time
npm install --global netlify-cli
netlify login
netlify init                 # connect to GitHub repo

# deploy
netlify deploy --build       # preview
netlify deploy --build --prod
```

Or push to GitHub and connect the repo in the Netlify UI — `netlify.toml` is pre-configured with `@netlify/plugin-nextjs`.

### Required Netlify env vars

At minimum, set:
- `NEXT_PUBLIC_SITE_URL` = `https://your-deployed-url`

Everything else from `.env.example` is optional and can be added when those services are ready.

## Deployment — GitHub

```bash
git init
git add .
git commit -m "feat: Silk marketing site v1 — Next.js 15, full design system, all pages"
git branch -M main
git remote add origin https://github.com/HSahraye/Silk.git
git push -u origin main
```

If the repo already has commits, rebase or force-push depending on your preference.

## Roadmap (next phases)

- **Phase 4 — Commerce**: Shopify Headless or Commerce Layer integration. Stripe checkout. Subscription + gift card primitives are scaffolded in `/subscriptions` and `/contact`.
- **Phase 5 — Product catalog**: dynamic product pages, MDX-driven flavor archive.
- **Phase 6 — Customer accounts**: order history, recipient address book, repeat-send templates.
- **Phase 7 — Programmatic personalization**: dynamic landing pages per industry (VC / Law / SaaS), gated case studies.

## License

Proprietary — © Silk Gifting, Inc.
