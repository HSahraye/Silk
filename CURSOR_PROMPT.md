# Cursor handoff prompt — Silk v3 (cinematic landing + shop · ship it)

Paste the section between the `---` markers into Cursor (Composer / Agent mode, with full repo, shell, and git permissions).

---

You are the deploy engineer for **Silk** — a premium baklava gifting brand. The marketing site has been redesigned to v3: scroll-driven cinematic at `/`, full editorial story at `/story`, and a real purchase flow at `/collection`. Install, verify, push, deploy, verify production. **Do not redesign.** Only fix what breaks the build, generate one missing asset, then ship.

## Context

- **Repo**: https://github.com/HSahraye/Silk.git (configure as `origin` if missing).
- **Brand reference**: Aesop × Hermès × Linear. Warm dark surfaces (`#0C0907`), parchment ink (`#F6EFE0`), honey gold (`#D9B870`), bronze + pistachio accents. The cinematic adds a foil-blue accent on the box mark.
- **Read first**:
  - `README.md` — stack, scripts, env vars.
  - `CHANGELOG.md` — what's new in v3 (cinematic landing + shop). **Most important diff doc.**
  - `REDESIGN_NOTES.md` — v2 design philosophy. *Gift first, company second, engineering last.*
  - `EXPERIENCE.md` — architecture for the scroll-driven cinematic (six scenes, MotionValue-driven, Lenis + GSAP ScrollTrigger).

## What's in the repo

- **Stack**: Next.js 15.1, React 19, Tailwind 3.4, Framer Motion 11, GSAP 3.12, Lenis 1.1, TypeScript strict.
- **Pages**:
  - `/` — **NEW**: scroll-driven cinematic + after-cinematic featured collection + story/corporate split.
  - `/story` — **NEW**: editorial marketing home (was the v2 `/`).
  - `/experience` — permanent redirect to `/`.
  - `/collection` — **NEW**: full product grid with five tiers.
  - `/collection/[slug]` — **NEW**: product detail with three-step `GiftCheckout`.
  - `/corporate`, `/subscriptions`, `/process`, `/about`, `/faq`, `/contact` — unchanged.
- **APIs**: `POST /api/lead` (contact/corporate/press/franchise) and **`POST /api/order`** (purchase intent) — both env-gated HubSpot + Resend fan-out, no Stripe required.
- **Cinematic art**: SVG components at `components/experience/art/{GiftBox, BaklavaStack, LightBeams, GoldParticles, NinePieceTray, BrandingSleeve, DedicationCard}.tsx`.
- **Photoreal render slot**: `components/experience/art/RealBox.tsx` — drop a `/public/products/silk-box-hero.png` and swap the SVG for it in `SilkExperience.tsx`. **Render brief is documented inline at the top of `RealBox.tsx`.**
- **Editorial image placeholders**: `components/visuals/{ImagePlaceholder,EditorialImages}.tsx` — used on `/story`, `/collection`, and `/collection/[slug]` until photography lands. Keep them.
- **Nav** (`lib/site.ts → NAV`): Collection · Corporate · Subscriptions · The Story · Process · FAQ. Primary nav CTA → `/collection`.

## What to do, in order

### 1. Local build must be green

```bash
npm install
npm run typecheck
npm run build
```

If `next build` errors, fix only what's required to compile. Do not touch design tokens, copy, layout, palette, or component structure. Common compilation gotchas:

- **`useSearchParams()` Suspense**: `/contact` and `/collection/[slug]?` already handle this. If you add anything that reads search params, wrap in `<Suspense>`.
- **Next 15 dynamic params**: `app/collection/[slug]/page.tsx` already awaits `params` (Next 15's `params: Promise<...>` API). Don't downgrade this — keep the async signature.
- **Framer Motion `BezierDefinition`**: `lib/motion.ts` already uses the correct import. If your installed framer-motion exports `Easing` instead, swap the type — keep the tuple value `[0.22, 1, 0.36, 1]` unchanged.
- **GSAP + Lenis SSR**: `SmoothScroll.tsx` guards with `typeof window`. If Next still chokes on a sub-import, wrap `<SmoothScroll>` in `next/dynamic({ ssr: false })`.
- **JSX apostrophe escapes**: data lives in JS strings (single-quoted) where `\'` is correct; rendered JSX text uses `&rsquo;`. Don't mass-replace either.
- **Custom Tailwind tokens**: the warm palette adds `bronze.*` and `rose.*` — they're in `tailwind.config.ts`. If a class doesn't compile, check spelling, don't remove tokens.

Re-run until `next build` exits 0. Capture page count + total bundle size for the report.

### 2. Generate `public/og.png`

`app/layout.tsx` references `/og.png` in both `openGraph.images` and `twitter.images`. The repo ships `public/og.svg`. Generate a 1200×630 PNG from it and write to `public/og.png` (sharp / resvg / ImageMagick — your call). Don't change the SVG; both should coexist.

### 3. Smoke-test the new routes locally

```bash
npm run dev
```

Open each in order and confirm:
- **`/`** — Six cinematic scenes resolve, pinned stage holds, Skip-intro link visible top-right in scene 1, after-cinematic shows three featured product cards + story/corporate split.
- **`/collection`** — Five product cards render with placeholder imagery and ribbons (Most sent / Subscription / Custom).
- **`/collection/the-reserve`** — Hero image + specs table + highlights checklist + three-step `GiftCheckout`. Walk all three steps. Submit; confirm success state ("Your gift is on its way to us"). Server returns 200 even without HubSpot/Resend.
- **`/story`** — Full editorial flow (Hero → WhyRemember → TasteProfile → TheMoment → SilkStandard → WhySilk → CorporateBand → HowItWorks → CTA).
- Mobile (DevTools 380px): cinematic centerpiece fits, no horizontal scroll, checkout stepper readable, ScrollHint visible on first scene.
- `prefers-reduced-motion: reduce` (DevTools → Rendering): Lenis disables, page degrades to native scroll, layers settle at resting positions.

If anything snaps, jitters, or layout-shifts visibly, note under "Remaining issues" — don't retune motion timings yourself.

### 4. Commit logically

If the repo is empty upstream, one feature commit is fine:

```
feat: Silk v3 — cinematic landing, /story, /collection with checkout
```

If you prefer chunked history:

```
feat(experience): /experience moved to / with after-cinematic follow-on
feat(story): editorial marketing flow at /story
feat(commerce): /collection grid, /collection/[slug] detail, three-step GiftCheckout
feat(api): /api/order with HubSpot + Resend fan-out
feat(hero): upgrade GiftBox + BaklavaStack toward photoreal SVG fidelity
chore(nav): reorder to Collection · Corporate · Subscriptions · Story · Process · FAQ
chore: og.png generated from og.svg
```

### 5. Push to GitHub

```bash
git remote -v
# if missing:
git remote add origin https://github.com/HSahraye/Silk.git
git branch -M main
git push -u origin main
```

If `main` already has unrelated history upstream, push to `feat/v3-cinematic-and-shop` and open a PR — don't force-push without checking.

### 6. Deploy to Netlify

Either:

- **UI path (preferred)**: app.netlify.com → "Add new site → Import from GitHub". `netlify.toml` already wires `@netlify/plugin-nextjs`. Confirm Node 20 in build settings.
- **CLI path**:
  ```bash
  npm install -g netlify-cli
  netlify login
  netlify init
  netlify deploy --build --prod
  ```

Required env var:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Set to the final Netlify URL (or custom domain) |

Optional — the site renders fully without any of them:

`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_META_PIXEL_ID`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID_CORPORATE`, `HUBSPOT_FORM_GUID_CONTACT`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `NEXT_PUBLIC_CALENDLY_URL`.

When HubSpot is wired, `/api/order` writes these custom fields: `silk_intent`, `silk_product`, `silk_quantity`, `silk_total_cents`, `silk_recipient`, `silk_recipient_city`, `silk_recipient_state`, `silk_message`. Create those properties in HubSpot before pointing real traffic at it (otherwise the writes are quietly dropped).

### 7. Verify production

- Walk all routes including `/`, `/story`, `/collection`, all five `/collection/[slug]` pages, then `/corporate`, `/subscriptions`, `/process`, `/about`, `/faq`, `/contact`.
- On a real phone, confirm `/` cinematic scrolls smoothly (iOS Safari is the highest-risk surface — sticky pin + Lenis behavior).
- Submit an order via `/collection/the-petite`. Verify the success state. If HubSpot + Resend are configured, verify the lead lands in HubSpot and the notification email arrives.
- Confirm `/sitemap.xml` includes `/collection/*` entries; `/robots.txt`, `/og.png` resolve 200.
- Lighthouse on `/collection/the-petite` (mobile) — target 95+ Performance / Accessibility / Best Practices / SEO. The cinematic at `/` will score lower on Performance (it's intentionally heavy) — aim for 80+ and don't optimize away the motion.

### 8. Report back

Reply with exactly:

```
Deployment URL: <netlify url>
Commits pushed: <hashes>
Branch: <name>
Build summary: <pages, total bundle>
Lighthouse mobile / : perf / a11y / bp / seo
Lighthouse mobile /collection/the-petite : perf / a11y / bp / seo
Order submitted OK (test): yes / no
Remaining issues: <bullets, or "none">
```

## Guardrails — do not violate

- **Do not change** `tailwind.config.ts`, `app/globals.css`, `lib/motion.ts` design tokens.
- **Do not change** copy on `/story` sections, the `/experience` scene captions, the `/collection` product descriptions, or the `GiftCheckout` step copy. The voice is *Aesop / Hermès quiet*. Fix only typos.
- **Do not retune** scroll timings in `SilkExperience.tsx`. Scrub ranges were balanced so each scene gets roughly one viewport flick on mobile. If a scene feels off in production, file as an issue.
- **Do not remove** the editorial image placeholders. They're part of the design until photography exists, and their captions are the brief for the photographer.
- **Do not re-add** the deleted `Testimonials.tsx` or `BaklavaTower.tsx`.
- **Do not replace** the SVG GiftBox / BaklavaStack with `<RealBox />` until a real photoreal PNG render exists at `/public/products/silk-box-hero.png` (and `silk-baklava-piece.png`). The render brief is in `art/RealBox.tsx`.
- **Do not add** bakery iconography (rolling pins, wheat sheaves, "freshly baked", oven illustrations).
- **Do not introduce** shadcn/ui or another component library.
- **Do not** add Stripe checkout. The `GiftCheckout` flow intentionally captures order intent; payment confirmation happens out-of-band via the secure-link follow-up email.
- **Do not unprotect** analytics. Every tracker remains env-gated.
- **Do not bundle** GSAP / Lenis into routes that don't use them. They're only mounted inside `<SmoothScroll>` on `/`.

Ship it.

---

## Notes for H

- All v3 changes are committed in the `Silk` folder. `CHANGELOG.md` documents the full v3 diff. `EXPERIENCE.md` covers the cinematic. `REDESIGN_NOTES.md` is still accurate for v2 voice/design.
- I cannot generate an actual photorealistic 3D render in my environment. What's shipped is a substantially upgraded SVG hero (`GiftBox.tsx` / `BaklavaStack.tsx`) and the `<RealBox />` swap slot — drop a PNG render in `/public/products/silk-box-hero.png`, swap one line in `SilkExperience.tsx`, and the cinematic uses your real renderer. Brief is in `art/RealBox.tsx`.
- I cannot run `next build` in my sandbox — Google Fonts is firewalled here. Cursor / Netlify will reach it without issue.
- I cannot push to GitHub or deploy to Netlify (no auth). Steps 5–7 above run with your credentials in Cursor.
- The only asset Cursor needs to generate is `public/og.png` (1200×630) from `public/og.svg`. The product photography and the photoreal 3D render are external work.
