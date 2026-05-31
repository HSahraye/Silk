# Cursor handoff prompt — Silk (v2 + /experience cinematic · ship it)

Paste the section between the `---` markers into Cursor (Composer / Agent mode, with full repo, shell, and git permissions).

---

You are the deploy engineer for **Silk** — a premium baklava gifting brand. The marketing site (v2 redesign) and a scroll-driven cinematic at `/experience` have both been fully built in this repo by a previous agent. Your job is to install, verify, push, deploy, and verify in production. **Do not redesign.** Only fix what breaks the build, generate one missing asset, then ship.

## Context

- **Repo**: https://github.com/HSahraye/Silk.git (configure as `origin` if missing).
- **Brand reference**: Aesop × Hermès × Linear. Warm dark surfaces (`#0C0907`), parchment ink (`#F6EFE0`), honey gold (`#D9B870`), bronze + pistachio accents. The cinematic adds a foil-blue accent for box / sleeve mark.
- **Read first**:
  - `README.md` — stack, scripts, env vars.
  - `REDESIGN_NOTES.md` — what changed in v2 and why. *Gift first, company second, engineering last.*
  - `EXPERIENCE.md` — full architecture for the scroll-driven cinematic at `/experience` (six scenes, MotionValue-driven, Lenis + GSAP ScrollTrigger).

## What's in the repo

- **Stack**: Next.js 15.1, React 19, Tailwind 3.4, Framer Motion 11, TypeScript strict.
- **New deps for `/experience`**: `gsap@^3.12.5` + `lenis@^1.1.20` (already in `package.json`).
- **Pages**: `/` · `/experience` · `/corporate` · `/subscriptions` · `/process` · `/about` · `/faq` · `/contact`.
- **Home flow (v2)**: Hero → WhyRemember → TasteProfile → TheMoment → SilkStandard → WhySilk → CorporateBand → HowItWorks → CTA.
- **`/experience` cinematic**: Six pinned scrubbed scenes — Hero Reveal · Architectural Baklava · Signature Collection · Custom Branding · White-Glove Fulfillment · Final Brand Lockup. Files live under `components/experience/` and `components/experience/art/`. All art is SVG (no asset dependency).
- **Editorial image placeholders**: `components/visuals/{ImagePlaceholder,EditorialImages}.tsx` provide five reusable placeholder frames with art-direction notes baked into the captions. Swap for real `<Image />` when photography arrives — **don't remove them now**.
- **API**: `POST /api/lead` with HubSpot + Resend fan-out, both optional and env-gated.
- **Analytics**: GA4 + PostHog + Meta Pixel in `components/analytics/Analytics.tsx`, env-gated.
- **SEO**: `app/sitemap.ts`, `app/robots.ts`, JSON-LD in `components/seo/Schema.tsx`.
- **Nav**: `lib/site.ts` exports a `NAV` array — *Experience* is the first item.

## What to do, in order

### 1. Local build must be green

```bash
npm install
npm run typecheck
npm run build
```

If `next build` errors, fix only what's required to compile. Do not touch design tokens, copy, layout, palette, or component structure. Likely classes of issues:

- **`useSearchParams()` Suspense**: `/contact` already wraps `ContactRouter` in `Suspense`. Confirm no other client component reads search params without one.
- **Framer Motion typing**: `lib/motion.ts` imports `BezierDefinition`. If your installed framer-motion version exports `Easing` instead, swap the type — keep the tuple value `[0.22, 1, 0.36, 1]` unchanged.
- **GSAP + Lenis SSR**: both should only execute client-side. `SmoothScroll.tsx` already uses `'use client'` and gates on `typeof window`. If Next still complains about SSR access to `window` in a sub-import, wrap the `<SmoothScroll>` provider in `next/dynamic` with `{ ssr: false }`.
- **JSX apostrophe escapes**: data lives in JS strings (single-quoted) where `\'` is correct; rendered JSX text uses `&rsquo;`. Don't mass-replace either.
- **Tailwind class typos**: the warm palette adds `bronze.*` and `rose.*` — they're in `tailwind.config.ts`. If a class doesn't compile, check spelling, don't remove tokens.

Re-run until `next build` exits 0. Capture page count + total bundle size for the report.

### 2. Generate `public/og.png`

`app/layout.tsx` already references `/og.png` in both `openGraph.images` and `twitter.images`. The repo ships `public/og.svg`. Generate a 1200×630 PNG from it and write to `public/og.png` (sharp, resvg, ImageMagick — your call). Don't change the SVG; both should coexist.

### 3. Smoke-test `/experience` locally

```bash
npm run dev
# open http://localhost:3000/experience
```

Scroll the page top to bottom. Confirm:
- Six distinct scenes resolve in order.
- Pinned stage stays locked while content animates.
- Mobile (DevTools 380px): centerpiece fits, copy is readable, no horizontal scroll, ScrollHint visible on first scene.
- `prefers-reduced-motion: reduce` (DevTools → Rendering): Lenis disables, page degrades to native scroll, layers settle at resting positions.

If anything snaps, jitters, or layout-shifts visibly, note it under "Remaining issues" — don't rewrite motion timings yourself.

### 4. Commit logically

If the repo is empty upstream, one feature commit is fine:

```
feat: Silk marketing site v2 + scroll-driven /experience cinematic
```

If you prefer chunked history:

```
chore: scaffold Next.js 15 + TS + Tailwind + Framer Motion + Netlify
feat(design-system): warm tokens, paper texture, motion primitives
feat(ui): button, card, accordion, marquee, reveal, badge, metric, logo
feat(visuals): ImagePlaceholder + 5 editorial image components with art direction
feat(layout): sticky nav, animated mobile menu, sitemap footer
feat(home): hero, WhyRemember, TasteProfile, TheMoment, SilkStandard, WhySilk, Corporate, HowItWorks, CTA
feat(pages): corporate, subscriptions, process, about, faq, contact
feat(api): /api/lead with HubSpot + Resend fan-out, honeypot, lead scoring
feat(seo): metadata, sitemap, robots, Organization + LocalBusiness + FAQ JSON-LD
feat(analytics): GA4 + PostHog + Meta Pixel scaffolds, all env-gated
feat(experience): six-scene scroll-driven cinematic — Lenis + GSAP ScrollTrigger + Framer Motion
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

If `main` already has unrelated history upstream, push to `feat/marketing-site-v2-plus-experience` and open a PR — don't force-push without checking.

### 6. Deploy to Netlify

Either:

- **UI path (preferred)**: connect the GitHub repo at app.netlify.com → "Add new site → Import from GitHub". `netlify.toml` already wires `@netlify/plugin-nextjs`. Confirm Node 20 in build settings.
- **CLI path**:
  ```bash
  npm install -g netlify-cli
  netlify login
  netlify init
  netlify deploy --build --prod
  ```

Set this env var in Netlify before the first prod deploy:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Set to the final Netlify URL (or custom domain) |

Optional, the site renders fully without any of them:

`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_META_PIXEL_ID`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID_CORPORATE`, `HUBSPOT_FORM_GUID_CONTACT`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `NEXT_PUBLIC_CALENDLY_URL`.

### 7. Verify production

After the prod deploy resolves:

- Walk all 8 routes: `/`, `/experience`, `/corporate`, `/subscriptions`, `/process`, `/about`, `/faq`, `/contact`.
- Confirm `/experience` scrolls smoothly on a real phone (not just DevTools). Lenis + sticky pinning behavior on iOS Safari is the highest-risk thing — verify the pin holds and the lid-open scene resolves.
- Submit a lead via `/contact` (all four tabs). Server returns 200 even without HubSpot/Resend configured.
- Confirm `/sitemap.xml`, `/robots.txt`, `/og.png` all resolve 200.
- Run Lighthouse on `/` (mobile). Target **95+** Performance / Accessibility / Best Practices / SEO. The cinematic at `/experience` will score lower on Performance (it's intentionally heavy) — aim for 80+ there and don't optimize away the motion.

### 8. Report back

Reply with exactly:

```
Deployment URL: <netlify url>
Commits pushed: <hashes>
Branch: <name>
Build summary: <pages, total bundle>
Lighthouse mobile / : perf / a11y / bp / seo
Lighthouse mobile /experience : perf / a11y / bp / seo
Remaining issues: <bullets, or "none">
```

## Guardrails — do not violate

- **Do not change** `tailwind.config.ts`, `app/globals.css`, `lib/motion.ts` design tokens.
- **Do not change** copy on the homepage sections or the `/experience` scene captions. The voice is *Aesop / Hermès quiet*. If you find a typo, fix only the typo.
- **Do not retune** scroll timings in `SilkExperience.tsx`. Scrub ranges were balanced so each scene gets roughly one viewport flick on mobile. If a scene feels off in production, file it as an issue — don't adjust.
- **Do not remove** the editorial image placeholders. They are part of the design until photography exists, and their art-direction notes are the brief for the photographer.
- **Do not re-add** the deleted `Testimonials.tsx` or `BaklavaTower.tsx`. They were intentionally removed.
- **Do not add** bakery iconography (rolling pins, wheat sheaves, "freshly baked" copy, oven illustrations).
- **Do not introduce** shadcn/ui or another component library.
- **Do not unprotect** analytics. Every tracker must remain env-gated.
- **Do not bundle** GSAP / Lenis into routes that don't use them. They're only mounted inside `<SmoothScroll>` on `/experience`.

Ship it.

---

## Notes for H

- Everything is committed in the `Silk` folder. `REDESIGN_NOTES.md` documents the v2 marketing site; `EXPERIENCE.md` documents the cinematic at `/experience` (six scenes, full architecture, mobile + performance notes, production phases).
- I could not run `next build` in my sandbox — Google Fonts (`fonts.googleapis.com`) is blocked here. Cursor / Netlify will reach it without issue.
- I did not push to GitHub or deploy to Netlify because I don't have auth for either. Steps 5–7 above run with your credentials in Cursor.
- The only asset Cursor needs to generate is `public/og.png` (1200×630) from `public/og.svg`.
- After deploy, send me the Netlify URL and I'll do a quick QA pass on the cinematic with you on a real device.
