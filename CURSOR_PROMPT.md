# Cursor handoff prompt — Silk (v2 redesign · ship it)

Paste the section between the `---` markers into Cursor (Composer / Agent mode, with full repo, shell, and git permissions).

---

You are the deploy engineer for **Silk** — a premium baklava gifting brand. The marketing site has been fully built **and** redesigned in this repo by a previous agent. Your job is to finish the work and ship. Do not redesign anything — only fix what breaks the build, generate one missing asset, then commit / push / deploy.

## Context

- **Repo**: https://github.com/HSahraye/Silk.git (configure as `origin` if missing).
- **Brand reference**: Aesop × Hermès × Linear. Warm dark surfaces (`#0C0907`), parchment ink (`#F6EFE0`), honey gold (`#D9B870`), bronze + pistachio accents. Instrument Serif display + Inter body. Do **not** make it look like a bakery.
- **Read first**:
  - `README.md` — stack, scripts, env vars, deploy guide.
  - `REDESIGN_NOTES.md` — what changed in v2 and why. The site sells the *gift first*, the *company second*, the *engineering last*. Preserve that.

## What's in the repo

- **Stack**: Next.js 15.1, React 19, Tailwind 3.4, Framer Motion 11, TypeScript strict.
- **Pages**: `/` · `/corporate` · `/subscriptions` · `/process` · `/about` · `/faq` · `/contact`.
- **Home flow (v2)**: Hero → WhyRemember → TasteProfile → TheMoment → SilkStandard → WhySilk → CorporateBand → HowItWorks → CTA.
- **Editorial images**: `components/visuals/ImagePlaceholder.tsx` + `EditorialImages.tsx` provide five reusable placeholder frames (`MacroTexture`, `TheBreak`, `TheGift`, `TheCraft`, `Harvest`) with art-direction notes baked into the captions. Swap each for a real `<Image />` when photography is ready — **don't remove them now**.
- **API**: `POST /api/lead` with HubSpot + Resend fan-out, both optional and env-gated.
- **Analytics**: GA4 + PostHog + Meta Pixel in `components/analytics/Analytics.tsx`, env-gated.
- **SEO**: `app/sitemap.ts`, `app/robots.ts`, JSON-LD in `components/seo/Schema.tsx`.

## What to do, in order

### 1. Local build must be green

```bash
npm install
npm run typecheck
npm run build
```

If `npm run build` errors, fix only the build. Do not touch design, copy, layout, palette, or component structure. Likely classes of issues you may see:

- **`useSearchParams()` Suspense**: `/contact` already wraps `ContactRouter` in `Suspense`. Check no other client component reads search params without one.
- **React 19 + framer-motion typing**: `lib/motion.ts` uses `BezierDefinition`. If your installed framer-motion version exports `Easing` instead, swap the type — keep the tuple value `[0.22, 1, 0.36, 1]` unchanged.
- **JSX apostrophe escapes**: data lives in JS strings (single-quoted) where `\'` is correct; rendered JSX text uses `&rsquo;` instead. Don't mass-replace either.
- **Tailwind class typos**: the warm palette adds `bronze.*` and `rose.*`. They're defined in `tailwind.config.ts` — if a class doesn't compile, check spelling, don't remove tokens.

Re-run until `next build` exits 0. Capture page count + total bundle size for the report.

### 2. Generate `public/og.png`

`app/layout.tsx` already references `/og.png` in `openGraph.images` and `twitter.images`. The repo ships `public/og.svg` as the source. Generate a 1200×630 PNG from the SVG and write it to `public/og.png` (sharp, resvg, ImageMagick — your call). Don't change the SVG; both should coexist.

### 3. Commit logically

If the repo is empty upstream, one feature commit is fine:

```
feat: Silk marketing site v2 — desire-first redesign, full design system, all 7 pages
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
chore: og.png generated from og.svg
```

### 4. Push to GitHub

```bash
git remote -v
# if missing:
git remote add origin https://github.com/HSahraye/Silk.git
git branch -M main
git push -u origin main
```

If `main` already has unrelated history upstream, push to `feat/marketing-site-v2` and open a PR — don't force-push without checking.

### 5. Deploy to Netlify

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

Everything below is optional and the site renders fully without any of them — add when those services come online:

`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_META_PIXEL_ID`, `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID_CORPORATE`, `HUBSPOT_FORM_GUID_CONTACT`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `NEXT_PUBLIC_CALENDLY_URL`.

### 6. Verify deployment

After the prod deploy resolves:

- Open the production URL. Walk all 7 pages.
- Confirm the homepage flow renders in this order: Hero → WhyRemember → TasteProfile → TheMoment → SilkStandard → WhySilk → CorporateBand → HowItWorks → CTA.
- Submit a lead via `/contact` (all four tabs). Server returns 200 even without HubSpot/Resend configured.
- Confirm `/sitemap.xml`, `/robots.txt`, `/og.png` all resolve 200.
- Run Lighthouse on the homepage (mobile). Target **95+** on Performance, Accessibility, Best Practices, SEO. If anything dips below 90, fix it before declaring done — image sizing, font preconnect, and `next/image` swaps are the usual culprits.

### 7. Report back

Reply with exactly:

```
Deployment URL: <netlify url>
Commits pushed: <hashes>
Branch: <name>
Build summary: <pages, total bundle>
Lighthouse (mobile): perf / a11y / bp / seo
Remaining issues: <bullets, or "none">
```

## Guardrails — do not violate

- **Do not change** `tailwind.config.ts`, `app/globals.css`, `lib/motion.ts` design tokens.
- **Do not change** copy on the homepage sections. The voice is *Aesop / Hermès quiet*. If you find a typo, fix only the typo.
- **Do not remove** the editorial image placeholders. They are part of the design until photography exists, and their art-direction notes are the brief for the photographer.
- **Do not re-add** the deleted `Testimonials.tsx` or `BaklavaTower.tsx`. They were intentionally removed.
- **Do not add** bakery iconography (rolling pins, wheat sheaves, "freshly baked" copy, oven illustrations).
- **Do not introduce** shadcn/ui or another component library. The primitives in `components/ui/` are intentionally hand-rolled and lightweight.
- **Do not unprotect** analytics. Every tracker must remain env-gated.

Ship it.

---

## Notes for H

- The v2 redesign is committed in the `Silk` folder. `REDESIGN_NOTES.md` documents every per-section decision, before/after copy diff, and the eight remaining opportunities for the next pass.
- I could not run `next build` in my sandbox — Google Fonts (`fonts.googleapis.com`) is blocked here. Cursor / Netlify will reach it without issue.
- I did not push to GitHub or deploy to Netlify because I don't have auth for either. Steps 4–6 above run with your credentials in Cursor.
- The only asset Cursor needs to generate is `public/og.png` (1200×630) from the existing `public/og.svg`.
