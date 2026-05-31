# Silk site — Changelog

## v3 — Cinematic landing + shop

### Navigation
- `/` is now the scroll-driven cinematic (previously the editorial home).
- The editorial marketing flow moved to **`/story`** (Hero → WhyRemember → TasteProfile → TheMoment → SilkStandard → WhySilk → CorporateBand → HowItWorks → CTA).
- `/experience` permanently redirects to `/` (link equity preserved).
- Nav reorders: **Collection · Corporate · Subscriptions · The Story · Process · FAQ**. Primary CTA in nav now sends to `/collection`.

### Hero animation upgrade
- `components/experience/art/GiftBox.tsx` — re-rendered as a soft-touch keepsake box with:
  - Three-plane perspective (front / right / top) with separate gradient materials
  - Beveled top edge with key + warm-bounce highlights
  - Magnetic-closure seam line on the front
  - Foil-stamped batch serial
  - Lid hinges via `rotateX` on its back edge, with crossfade reveal of the 9-piece tray
  - Multi-pass cast shadow (contact + ambient occlusion blur) + faint reflection plate
  - Debossed `silk` wordmark with foil-gradient mark and SAN FRANCISCO microcopy
- `components/experience/art/BaklavaStack.tsx` — re-rendered as:
  - Per-layer phyllo with rotated gradients (3 alternating materials)
  - Cross-section reveal: pistachio-paste base, honey saturation overlay, 22 pistachio chunks + 9 walnuts, all individually rotated and highlighted
  - Honey thread suspended between layers as separation grows
  - Per-pistachio crown rendering with individual highlights and cast shadow
- **Production render slot**: `components/experience/art/RealBox.tsx` — drop-in `<Image />` swap with the full render brief documented inline. The moment you have a photoreal PNG from a 3D artist, replace `<GiftBox />` with `<RealBox src="/products/silk-box-hero.png" .../>` and ship.
- Scene 6 CTAs now route to `/collection` (primary) and `/corporate` (secondary).
- Added **Skip the intro** link top-right, fades out after scene 1.

### Collection / Shop
- **`/collection`** — landing page with five products: The Petite ($84), The Reserve ($158, "Most sent"), The Origin Series ($94/mo), The Table ($288), The Program (custom).
- **`/collection/[slug]`** — product detail page with hero image, specs, highlights, full purchase flow, and "You might also send" recommendations.
- **`components/commerce/GiftCheckout.tsx`** — three-step purchase intent flow:
  1. Quantity (with bulk hint above 25 → corporate)
  2. Recipient + sender (full address, optional delivery date)
  3. Dedication message (handwritten card, 280 char) + summary + send
- Stepper UI, AnimatePresence transitions, server-validated, success state with "send another" loop.
- **`/api/order`** — captures order intent, fans out to HubSpot Forms API (with `silk_*` custom fields) and Resend (internal notification + sender confirmation). All integrations optional and `Promise.allSettled` for fault tolerance.
- `lib/products.ts` — single source of truth, also feeds `sitemap.ts`.

### After-cinematic landing
- `components/experience/ExperienceFollowOn.tsx` — three featured product cards + Story / Corporate split cards, mounted after the pinned cinematic so the landing has a soft exit rather than dumping users at the footer.

### Other
- Sitemap regenerated to include `/story`, `/collection`, and each product detail page.
- `CURSOR_PROMPT.md` updated for v3 deploy. New required reading: `CHANGELOG.md`.

---

## v2 — Desire-first redesign

See `REDESIGN_NOTES.md`. Replaced placeholder testimonials with editorial gifting scenarios (`TheMoment`), added `WhyRemember` and `TasteProfile`, warmed the design tokens, demoted engineering language, exposed starter pricing in the hero.

## v1 — Marketing site

See `README.md`. Initial Next.js 15 + TypeScript + Tailwind + Framer Motion build with seven pages (Home, Corporate, Subscriptions, Process, About, FAQ, Contact), full design system, lead-capture API, SEO + analytics architecture, Netlify config.
