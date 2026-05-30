# Cursor handoff prompt — Silk (finish & deploy)

Paste the section between the `---` markers into Cursor's chat (Composer / Agent mode, with full repo permission and shell + git access).

---

You are the deploy engineer for **Silk** — a premium baklava gifting company. The marketing site has been fully built in this repo by a previous agent (Next.js 15, App Router, TypeScript, Tailwind, Framer Motion, full design system, all 7 pages, SEO, analytics scaffolding, lead-capture API, Netlify config, README). Your job is to finish the work and ship it. Do not redesign anything — only fix what is broken and execute the deploy.

## Context you need

- **Repo**: https://github.com/HSahraye/Silk.git (already configured as `origin`, or set it up).
- **Brand**: "The Edible Arrangements of Baklava." Looks like Linear/Apple/Vercel/Stripe/Notion/Arc, not a bakery website. Dark theme, gold accents (`#D9BF73`), Instrument Serif display + Inter body.
- **Stack**: Next.js 15.1.6, React 19, Tailwind 3.4, Framer Motion 11. See `package.json`.
- **Pages**: `/` (home), `/corporate`, `/subscriptions`, `/process`, `/about`, `/faq`, `/contact`.
- **API**: `POST /api/lead` (HubSpot + Resend fan-out, both optional, env-gated).
- **Analytics**: GA4 + PostHog + Meta Pixel — all env-gated in `components/analytics/Analytics.tsx`.
- **SEO**: `app/sitemap.ts`, `app/robots.ts`, JSON-LD in `components/seo/Schema.tsx` (Organization, LocalBusiness, FAQPage).

## What to do, in order

### 1. Verify the local build is green

```bash
npm install
npm run typecheck
npm run build
```

If `npm run build` fails, fix the errors — but do not change designs, copy, or page structure unless an error forces it. Likely class of issues you may hit:
- A `Suspense` boundary needs to wrap a `useSearchParams()` consumer (the contact page already does this for `ContactRouter`; double-check no other client component reads search params without one).
- React 19 + TypeScript strict typing on event handlers.
- Tailwind class name typos.

Re-run until `npm run build` exits 0. Capture the build log summary (page count, route sizes).

### 2. Generate a PNG OG image

The repo currently ships `public/og.svg`. Some social platforms (Slack, iMessage previews, X) prefer PNG. Generate `public/og.png` (1200×630) from the SVG using sharp or any tool you like, then update `app/layout.tsx` to reference `/og.png` for both `openGraph.images` and `twitter.images`. Keep the SVG as a fallback.

### 3. Commit in logical chunks

Use these commit messages (or close to them):

```
chore: scaffold Next.js 15 + TypeScript + Tailwind + Framer Motion
feat(design-system): tokens, typography ramp, motion primitives
feat(ui): button, card, badge, accordion, marquee, reveal, metric, logo
feat(layout): sticky nav with blur-on-scroll, animated mobile menu, sitemap footer
feat(home): hero + Why Silk + Silk Standard + Corporate + How It Works + Testimonials + CTA
feat(corporate): full page with reasons, ROI, workflow, lead form, Calendly placeholder
feat(subscriptions): Origin Series plans, pricing placeholders, flavor roadmap
feat(process): four-stage storytelling (sourcing, production, packaging, shipping)
feat(about): founder note, principles, vision milestones
feat(faq): grouped accordion with FAQPage JSON-LD
feat(contact): tabbed lead routing (retail/corporate/press/franchise)
feat(api): /api/lead with HubSpot + Resend fan-out, honeypot, lead scoring
feat(seo): metadata, sitemap, robots, Organization + LocalBusiness JSON-LD
feat(analytics): GA4 + PostHog + Meta Pixel scaffolds (env-gated)
chore: Netlify config (@netlify/plugin-nextjs) + .env.example + README
```

If the existing tree is already a single working tree, you can do one logical commit if that's faster — the user values shipped over pretty.

### 4. Push to GitHub

```bash
git remote -v
# if origin missing:
git remote add origin https://github.com/HSahraye/Silk.git
git branch -M main
git push -u origin main
```

If `main` already exists upstream with content, evaluate: force-push if it's empty/initial, otherwise create a feature branch like `feat/marketing-site-v1` and open a PR.

### 5. Deploy to Netlify

Preferred: connect the GitHub repo in the Netlify UI (it autodetects `netlify.toml` with `@netlify/plugin-nextjs`). Otherwise CLI:

```bash
npm install -g netlify-cli
netlify login
netlify init     # link to repo
netlify deploy --build --prod
```

Set these environment variables in Netlify (only `NEXT_PUBLIC_SITE_URL` is required; rest are optional and the site renders fine without them):

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Set to the final Netlify URL (or custom domain) |
| `NEXT_PUBLIC_GA_ID` | optional | GA4 measurement ID |
| `NEXT_PUBLIC_POSTHOG_KEY` | optional | PostHog project key |
| `NEXT_PUBLIC_POSTHOG_HOST` | optional | defaults to `https://us.i.posthog.com` |
| `NEXT_PUBLIC_META_PIXEL_ID` | optional | Meta Pixel ID |
| `HUBSPOT_PORTAL_ID` | optional | HubSpot |
| `HUBSPOT_FORM_GUID_CORPORATE` | optional | HubSpot corporate form GUID |
| `HUBSPOT_FORM_GUID_CONTACT` | optional | HubSpot general contact form GUID |
| `RESEND_API_KEY` | optional | for transactional email |
| `LEAD_NOTIFY_EMAIL` | optional | mailbox to alert on new leads |
| `NEXT_PUBLIC_CALENDLY_URL` | optional | Calendly link for "Book intro call" on `/corporate` |

### 6. Verify deployment

After deploy completes:
- Open the production URL. Test homepage, `/corporate`, `/subscriptions`, `/process`, `/about`, `/faq`, `/contact`.
- Submit a lead through `/contact` (should land in HubSpot if configured, or just return 200 if not).
- Check `https://<url>/sitemap.xml` and `https://<url>/robots.txt` resolve.
- Run Lighthouse on the homepage — target 95+ on Performance, Accessibility, Best Practices, SEO. If anything dips below 90, fix it before declaring done.

### 7. Report back

Reply with exactly:

```
Deployment URL: <netlify url>
Commits pushed: <list of commit hashes>
Branch: <branch name>
Build summary: <pages built, total bundle size>
Lighthouse (mobile): perf / a11y / bp / seo
Remaining issues: <bulleted list, or "none">
```

## Guardrails

- Do not change the design system (`tailwind.config.ts`, `app/globals.css`, `lib/motion.ts`).
- Do not change page copy. The voice is "Linear-confident, Apple-restrained."
- Do not add bakery iconography (no rolling pins, no wheat illustrations, no "freshly baked" copy).
- Do not introduce shadcn — the primitives in `components/ui/` are intentionally hand-rolled to stay light.
- Do not add tracking that isn't env-gated.

Ship it.

---

## Notes for H (you, the human)

- All seven pages, the full design system, the lead-capture API, analytics scaffolding, SEO, and Netlify config are committed in the `Silk` folder.
- The README has the dev/build/deploy instructions for you too if you'd rather drive this yourself.
- I could not run `next build` in my sandbox because Google Fonts (`fonts.googleapis.com`) is blocked here. The build will work the moment it runs in Netlify or your local machine — fonts download on first build.
- I did not push to GitHub or deploy to Netlify because I don't have auth for either. Cursor with your credentials handles that in step 4–5 above.
