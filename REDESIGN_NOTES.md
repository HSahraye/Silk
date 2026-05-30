# Silk — Redesign Notes (v2)

A pass over the homepage to move it from *Linear for Baklava* toward *Aesop × Hermès × Linear*. Engineering and operational language demoted; sensory, hospitality, and gifting language led with.

---

## 1. Per-section decisions

| Section | Decision | Rationale |
| --- | --- | --- |
| **Hero** | Modify | New headline (*"Designed to be remembered."*), sensory subhead, both CTAs at equal visibility (Send a Gift · Corporate Orders), starter prices visible on the hero plate (*The Petite · 12 pieces · $84*). Replaced the geometric "Baklava Tower" SVG with a `MacroTexture` editorial frame — closer to a Aesop/Hermès product still. |
| **Why People Remember Silk** | New | Emotional reasoning, placed *immediately after* hero. Three numbered reasons, paired with `TheGift` editorial frame. Answers *why is this gift special?* before *how is it made?* |
| **Taste Profile** | New | Sensory essay structured as three notes (*First → Middle → Finish*), written in luxury-wine voice. Ingredient sheet sits below, indented like a tasting card. Adds the missing flavor dimension. |
| **The Moment It Arrives** | New | **Replaces placeholder testimonials.** Four short editorial gifting scenarios written as reportage — promotion, closing dinner, founder gratitude, hotel suite. Paired with two editorial frames (`TheGift`, `TheCraft`). |
| **The Silk Standard** | Modify | Same four pillars but copy softened: *"The orchard,"* *"The butter,"* *"The hand,"* *"The keepsake"* — not *Sourcing/Production/Packaging/Form.* Two craft images added. |
| **Why Silk (comparison)** | Modify, demoted | Kept the comparison table — useful as rational justification — but moved *below* sensory sections. Copy reframed (*"Most gifts get put away. Silk gets photographed."*). |
| **Corporate band** | Modify | Audience names softened (*"People & Culture"* not *"HR / People Ops"*; *"Venture firms"* not *"VC Firms"*). Headline: *"The gift your clients will still mention next quarter."* |
| **How It Works** | Modify | Verbs replaced: *Select → Choose · Personalize → Inscribe · Deliver → Arrive · Impress → Remembered.* Copy uses hospitality language (*"Delivered with the same care used to create it."*). |
| **Testimonials** | **Remove** | Placeholder quotes deleted. Replaced by *The Moment It Arrives*. |
| **CTA** | Modify | Primary now *"Send a Gift"* (consumer), secondary *"Corporate Orders"*. Headline: *"Send something they'll still mention next week."* Warmer ambient glow, paper texture, ember edge. |

## 2. Visual system shifts

| Token / surface | Before | After |
| --- | --- | --- |
| `bg.DEFAULT` | `#0A0A0B` (cool near-black) | `#0C0907` (warmer, brown-toned dark) |
| `ink.DEFAULT` | `#FAFAF7` (white) | `#F6EFE0` (warm parchment) |
| Gold ramp | Cool gold | Warmer honey gold (`#D9B870` mid) |
| Pistachio ramp | Generic green | California pistachio (`#94B25F` mid) |
| Rose & bronze | Not present | Added — *rose* used sparingly for warmth, *bronze* for hover surfaces |
| Hero background | Two glows + grain | Three drifting glows (gold, bronze, pistachio) + grain + paper texture |
| Cards | Flat dark surface | `ember-edge` (inner light + warm outer ember shadow) |
| Editorial frames | None | `ImagePlaceholder` + 4 reusable shots (`MacroTexture`, `TheBreak`, `TheGift`, `TheCraft`, `Harvest`) with embedded art-direction captions |
| Section transitions | Same divider every time | Mixed: hairlines, subtle gradients, warmer subtle backgrounds (`bg-subtle/40`) |

**Discipline preserved**: container widths, type ramp, spacing rhythm, font stack (Instrument Serif display + Inter body), motion easing (`cubic-bezier(0.22, 1, 0.36, 1)`).

## 3. Copy shifts (before → after)

| Before | After |
| --- | --- |
| "The Executive Gifting Standard." | "Designed to be remembered." |
| "Stop sending cookies. Send something unforgettable." | "Honey-glazed phyllo, California pistachio, slow cultured butter — folded by hand into a keepsake box that arrives like a small occasion of its own." |
| "41 Layers" | "Forty-one delicate layers, finished by hand." |
| "Cold-chain logistics" | "Delivered with the same care used to create it." |
| "Architectural baklava" | "Designed to be remembered." (hero) / "Hand-folded in San Francisco" (chips) |
| "Sourcing → Production → Packaging → Shipping" | "The orchard → The butter → The hand → The keepsake" |
| "Select / Personalize / Deliver / Impress" | "Choose / Inscribe / Arrive / Remembered" |
| "[Placeholder quote]" — Name, Role | "Sent to a newly promoted VP." — short editorial scenario |
| "Most gifts are forgettable. Silk isn't." | "Most gifts get put away. Silk gets photographed." |
| "Now shipping in the Bay Area · National Q3" | "Hand-folded in San Francisco · Gifts from $84" |

## 4. Friction reduction

- **Consumer pricing exposed in the hero.** Three SKUs with prices on the hero plate. Previously the only path to price was *Corporate → Talk to sales*.
- **Equal-weight CTAs.** *Send a Gift* (consumer) and *Corporate Orders* (B2B) now share visual hierarchy in the hero and the final CTA. The original site funneled both audiences toward enterprise lead capture.
- **CTA copy now reads as invitation, not workflow.** *Send a Gift* / *Talk to us* replaces *Send a Gift* / *Corporate Orders* + *Talk to sales* mixed framings.

## 5. Conversion improvements (what we expect to move)

| Metric | Expected direction | Why |
| --- | --- | --- |
| Hero → CTA click (consumer) | ↑ | First-time visitors no longer hit a B2B framing on arrival; price + product format are visible without scroll. |
| Time on page (homepage) | ↑ | Sensory + editorial sections create dwell. Three new emotional sections replace the previous arc that ended in a comparison table. |
| Scroll depth past fold 2 | ↑ | *Why People Remember Silk* immediately rewards scroll with desire content rather than a comparison grid. |
| Corporate lead quality (not just volume) | ↑ | Lower-intent corporate browsers will self-deflect to consumer; the ones who reach `/corporate` are warmer. |
| Brand-search lift | ↑ | Editorial scenarios in *The Moment* are quotable. Designed to be screenshotted on Twitter / shared in LinkedIn DMs. |
| Form abandonment (`/contact?type=retail`) | ↓ | Retail form is now lighter than corporate — only name, email, notes. |

## 6. Luxury perception improvements

- **Warmer surfaces.** The shift from `#0A0A0B` cool black to `#0C0907` warm dark is small numerically but reads correctly to the eye — closer to gallery paper than to a SaaS dashboard.
- **Paper texture.** Subtle fibre overlay on hero, CTA, and editorial cards gives the page a tactile quality. Aesop-adjacent.
- **Editorial captioned images.** Even as placeholders, the `Camera + Shot · SLK-0X` plates communicate that this is a brand that thinks in *shots*, not stock.
- **Sensory paragraph form.** *Crisp. / Buttered, honeyed, warm. / Green, lingering pistachio.* — Hermès-style staccato copy.
- **Pricing presented as a tasting menu.** *The Petite · The Reserve · Origin* rather than *Starter · Mid · Pro*. Names matter.

## 7. Remaining opportunities (next pass)

1. **Real photography.** The five image components (`MacroTexture`, `TheBreak`, `TheGift`, `TheCraft`, `Harvest`) ship with full art-direction notes embedded in the placeholder captions. Hand to a photographer; swap each placeholder for `<Image />`. Estimated half-day shoot.
2. **Founder voice video.** A 60-second silent loop on the *About* page — hands brushing butter, a piece breaking, the box closing. No talking, no music. Apple/Aesop-level.
3. **Sub-pages get the same copy treatment.** `/corporate`, `/subscriptions`, `/process`, `/about` still use earlier voice in places. A second pass to soften.
4. **Product page (`/p/the-petite`, `/p/the-reserve`).** Now that prices and SKUs exist, dedicated product detail pages with the same editorial tone are the next conversion lever.
5. **Notes from recipients section.** Once real send data exists, replace `TheMoment`'s scenarios with actual (anonymised) recipient quotes pulled from delivery confirmations.
6. **Subscription waitlist → live subscription.** Stripe-backed billing on `/subscriptions` so the *Origin Series* can start collecting paid subscribers immediately.
7. **Lighter `Origin` boxes for the under-$50 gift.** A small box (4–6 pieces) opens up the impulse-gift market — birthdays, condolences, last-minute. Architecture supports it without changing fulfillment.
8. **A `Recipient Notes` field on the lead form.** "Tell us about the person — a hobby, a moment, anything." Used to personalise the dedication card. Free product, real love.

## 8. What we did NOT change

- The design system's typographic ramp, container widths, motion easing.
- The information architecture below the homepage (nav, footer, sub-pages).
- The Netlify config, analytics scaffolding, lead-capture API.
- The corporate funnel — the *Corporate* page is still a credible B2B doorway.
- The `/faq` content — those facts are operational, not emotional, and removing them would hurt buyers.

---

*The site that ships now sells the gift first, the company second, the engineering last.*
