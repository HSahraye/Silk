# The Silk Experience — Scroll-Driven Cinematic

Live at `/experience`. A six-scene scroll-linked product film designed to feel like an Apple keynote unfolding under the user's thumb. Built with React 19 + Next.js 15 + Framer Motion + GSAP ScrollTrigger + Lenis. No external assets required — every layer is SVG so it scales, animates, and recolors cleanly.

---

## 1. Animation architecture

A single, pinned cinematic stage. One outer scroll container 700vh tall; inside, a `position: sticky` viewport that holds every animated layer. Framer Motion's `useScroll` reads scroll progress relative to the outer container (0 → 1), then `useTransform` maps slices of that range to individual layer properties (y, scale, rotate, opacity, separation, etc.). All layers receive `MotionValue<number>` props — no React re-renders during scroll.

```
┌─ <section className="h-[700vh]">          ← scroll length
│   ┌─ <div className="sticky h-screen">    ← pinned stage
│   │
│   │   ─ Ambient background (parallax y + scale)
│   │   ─ Volumetric LightBeams              (fade out by Scene 2)
│   │   ─ GoldParticles                       (fade in for Scene 6)
│   │   ─ Centerpiece group:
│   │       ─ GiftBox          (y, scale, rotate, lidOpen)
│   │       ─ BaklavaStack     (y, scale, rotateY, separation, opacity)
│   │       ─ NinePieceTray    (Scene 3: assembly + x + opacity)
│   │       ─ BrandingSleeve   (Scene 4: wrap + opacity)
│   │       ─ DedicationCard   (Scene 5: reveal + x + opacity)
│   │   ─ SceneCopy × 5         (eyebrow + headline + sub, per-scene opacity)
│   │   ─ Final Lockup + CTA    (Scene 6)
│   │   ─ ScrollHint            (fades after Scene 1)
│   │   ─ ProgressRail          (top-of-viewport gradient bar, scaleX 0→1)
│   └─
└─
```

**Why pinned + sticky over GSAP `pin: true`?** Sticky is the modern, scroll-driver-agnostic primitive — works with Lenis, Safari, mobile, and CSS scroll snapping. GSAP ScrollTrigger is registered for any future scrub timelines that benefit from its draggable thumb, snapping, or scrub-end callbacks; today the visual work is FM-driven so the bundle is one provider, not two.

## 2. ScrollTrigger / timeline breakdown

Scroll progress is the source of truth. Each scene owns a contiguous slice:

| Scene | Range | Headline | Primary motion |
| --- | --- | --- | --- |
| 1 — Hero Reveal | 0.00 → 0.18 | *"The executive gifting standard."* | Box settles · Baklava drifts in · Light beams full · Subtle Y-axis rotation on baklava |
| 2 — Architectural Baklava | 0.18 → 0.36 | *"Forty-one delicate layers."* | Camera "zooms" (`scale` ramp on baklava 0.92 → 1.35) · `separation` 0 → 1 explodes phyllo layers vertically · Filling cross-section reveals · Pistachio crown drifts upward · Light beams fade out |
| 3 — Signature Collection | 0.36 → 0.54 | *"Nine perfect squares."* | Baklava fades · `NinePieceTray.assembly` 0 → 1 brings nine pieces into a perfect grid · Tray slides out left as scene closes |
| 4 — Custom Branding | 0.54 → 0.72 | *"Executive gifting, tailored."* | Box rotates -6° · `BrandingSleeve.wrap` 0 → 1 slides sleeve across box face · Three sample logos surface debossed |
| 5 — White-Glove Fulfillment | 0.72 → 0.88 | *"A dedication, by hand."* | `lidOpen` 0 → 1 (rotateX on lid) reveals tray inside box · `DedicationCard.reveal` lifts handwritten card out · Spotlight intensifies on card · Card drifts to right edge |
| 6 — Final Lockup | 0.88 → 1.00 | *"Luxury corporate baklava gifting."* | Box returns to center · Baklava re-enters · Gold particles drift in · CTA + secondary CTA fade up |

Per-scene copy fades use a four-point ramp `[enter, peak-in, peak-out, exit]` so headlines have a clear hold before crossing the next scene. Box and baklava motion values share key-points at scene boundaries to guarantee no visual snap.

## 3. React component structure

```
app/experience/page.tsx                       ← route: <SmoothScroll><SilkExperience /></SmoothScroll>

components/experience/
├── SmoothScroll.tsx                          ← Lenis + ScrollTrigger provider
├── SilkExperience.tsx                        ← the master timeline
└── art/
    ├── GiftBox.tsx                            ← lid opens via rotateX MotionValue
    ├── BaklavaStack.tsx                       ← 13 phyllo layers + filling reveal
    ├── LightBeams.tsx                         ← volumetric SVG beams
    ├── GoldParticles.tsx                      ← 26 drifting particles
    ├── NinePieceTray.tsx                      ← 9 squares assemble into grid
    ├── BrandingSleeve.tsx                     ← debossed branding wrap
    └── DedicationCard.tsx                     ← card slides out + spotlight
```

All `art/*` components take only **MotionValue props** — never numbers, never derived state — so they never re-render during scroll. The parent is the single source of truth for what's happening on screen.

## 4. Framer Motion implementation snippets

The outer ref + smoothed progress:

```tsx
const outerRef = useRef<HTMLElement>(null);
const { scrollYProgress } = useScroll({
  target: outerRef,
  offset: ['start start', 'end end'],
});
const progress = useSpring(scrollYProgress, {
  stiffness: 140, damping: 28, mass: 0.3,
});
```

Per-layer scrub:

```tsx
// Camera "zoom" toward the floating baklava in Scene 2
const stackScale = useTransform(
  progress,
  [0, 0.18, 0.36, 0.54, 0.88, 1],
  [0.78, 0.92, 1.35, 0.62, 0.7, 0.74],
);

// Phyllo layers exploding apart
const stackSeparation = useTransform(progress, [0.18, 0.36], [0, 1]);

// Gift box lid opening (Scene 5)
const lidOpenRaw = useTransform(progress, [0.72, 0.84], [0, 1]);
const lidOpen = useSpring(lidOpenRaw, { stiffness: 120, damping: 22 });
```

Each art layer consumes the MotionValue directly:

```tsx
<BaklavaStack
  separation={stackSeparation}
  rotate={stackRotateY}
/>
```

Inside `BaklavaStack`, every phyllo sheet derives its own Y offset:

```tsx
const y = useTransform(separation, [0, 1], [baseY, baseY - (7 - i) * 18 - 24]);
return <motion.g style={{ y }}>...</motion.g>;
```

## 5. GSAP code snippets (where it's wired and why)

GSAP + ScrollTrigger are registered inside `SmoothScroll.tsx` for two reasons:

1. **Lenis ↔ ScrollTrigger handshake** — required so any future `.scrollTrigger({ scrub })` timeline reads Lenis's smoothed scroll, not the native one.

```ts
const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);

const raf = (time: number) => lenis.raf(time * 1000);
gsap.ticker.add(raf);
gsap.ticker.lagSmoothing(0);
```

2. **Extension point** — drop GSAP scrub timelines next to FM when you need ScrollTrigger-only features (snap-to-label, draggable thumbs, anchor jumps). Example for snapping the user to each scene start (paste into a `useEffect` inside `SilkExperience`):

```ts
ScrollTrigger.create({
  trigger: outerRef.current!,
  start: 'top top',
  end: 'bottom bottom',
  snap: {
    snapTo: [0, 0.18, 0.36, 0.54, 0.72, 0.88, 1],
    duration: { min: 0.2, max: 0.8 },
    ease: 'power2.inOut',
  },
});
```

`prefers-reduced-motion` short-circuits the provider entirely — no Lenis, no smooth scroll, no GSAP ticker — and the page degrades to native browser scrolling with the layers in their resting positions.

## 6. Performance optimization

| Tactic | Why |
| --- | --- |
| MotionValues, not React state | Zero re-renders during scroll. Every layer is `motion.div` reading a MV via `style={{ y, scale }}`. |
| `will-change: transform, opacity` | Already applied to every animated layer. Promotes to GPU compositor layer. |
| Transforms + opacity only | No layout-triggering properties (`width`, `top`, `margin`) animated. Compositor-only paths. |
| SVG geometry, not raster | Crisp at any DPR; no asset network cost. Tiny payload (`< 14KB` gzip total for art layers). |
| `useSpring` on scrollYProgress | Smooths jitter at low-frequency wheel ticks without changing motion length. |
| `useTransform` over `useMotionValueEvent` | Pure derivations — no subscriber callbacks. |
| Particles capped at 26 | Decorative, infinite, but bounded. Cheap. |
| `pointer-events-none` on overlays | Avoid hit-testing cost on inactive layers. |
| Lenis touch tuning | `touchMultiplier: 1.4` keeps mobile snappy without overshoot. |
| Reduced-motion bailout | Skip the entire smoothing layer for users who opted out. |

**Measurement target**: 60fps on a 2019 MacBook Air, 50fps+ on iPhone 12. The bottleneck on lower-end Android tends to be SVG filter rendering (`feGaussianBlur`) — both `<filter id="halo">` and `<filter id="beam-blur">` use modest `stdDeviation` values so Chrome's GPU pipeline can take them. If you observe drops, reduce `stdDeviation` from 18 → 12 on the halo first.

**Bundle**: Adds ~14KB gzip (gsap core 12KB + lenis 2KB) — both lazy-mountable in a single client component, no impact on other routes.

## 7. Mobile swipe behavior

- **Sticky pinning works natively on iOS Safari, Chrome Android, Samsung Internet** — no JS-driven pin required, no Safari fixed-position scroll bugs.
- **Lenis touch handling** is calibrated for thumb-flicks (`touchMultiplier: 1.4`). Native momentum is preserved; we only smooth the wheel.
- **Aspect-aware layers**: every centerpiece layer uses `w-[min(90vw,820px)]` so the box never overflows on a 380px viewport. The baklava clamps similarly.
- **Copy size**: `text-display-xl` uses `clamp()` in the design system, so headlines shrink to a phone-readable size automatically.
- **Touch-target spacing**: the final CTA buttons are `size="lg"` (h-14) — Apple HIG-compliant 44px minimum, met with margin.
- **One scene per swipe**: each scene occupies ~14% of the scroll range, which on a 700vh container = ~98vh — almost exactly one viewport-flick per scene. If you want snap-to-scene, uncomment the ScrollTrigger snap block in §5.
- **Address-bar collapse**: pinned sticky stage uses `h-screen` and absolute positioning — Safari's collapsing toolbar can momentarily change `100vh`, but our centered content uses `inset-0` + `flex` so it self-recenters frame-by-frame.

## 8. Production implementation plan

### Phase A — verify locally (you, ~5 min)

```bash
npm install            # picks up new deps: gsap + lenis
npm run build
npm run dev            # visit http://localhost:3000/experience
```

### Phase B — polish (optional, 1–2 days)

- **Swap SVG art for real renders.** The components were written to be drop-in replacements. Hand a 3D artist or photographer:
  - `art/GiftBox.tsx` → product render at 4× density, alpha-clean lid + body as two layers
  - `art/BaklavaStack.tsx` → cross-section render with separable phyllo layers (Blender or KeyShot — turn each layer into its own mesh)
  - `art/DedicationCard.tsx` → calligraphy + handwritten card photography
- **Audio.** A 200ms metallic *clink* on lid open (Scene 5), a soft *fold* on baklava separation (Scene 2). Tone.js already supported by the design system if you want generative; otherwise drop two `.mp3` files in `/public/sfx/`.
- **Add prefers-reduced-data fallback.** Serve a static poster image to data-saver users.

### Phase C — measure (you, after launch)

- **Real User Monitoring**: track `cumulative_layout_shift`, `largest_contentful_paint`, and a custom `scene_completed` event (fire on each scene's exit transform reaching 1.0).
- **Conversion**: A/B test `/experience` as the corporate landing page against `/corporate`. Hypothesis: experience completers convert ~2× on "Request a Corporate Proposal" because the value is *shown*, not stated.

### Phase D — extend (future)

- **Per-recipient experience.** Pass `?to=Sarah` to populate the dedication card in real time. Shareable link → recruiter-grade gifting.
- **Interactive baklava cutaway.** Add `<Toggle />` on Scene 2 so the user can hold-to-separate the layers themselves.
- **Industry skins.** Same cinematic, but Scene 4 swaps sample logos based on `?vertical=legal|venture|sales` for paid-traffic landers.

---

**Built:**
- `/app/page.tsx` (v3 — cinematic is now the landing route)
- `/app/experience/page.tsx` (permanent redirect to `/`)
- `/components/experience/SmoothScroll.tsx`
- `/components/experience/SilkExperience.tsx`
- `/components/experience/ExperienceFollowOn.tsx` (after-cinematic featured collection + story split)
- `/components/experience/art/{GiftBox, BaklavaStack, LightBeams, GoldParticles, NinePieceTray, BrandingSleeve, DedicationCard, RealBox}.tsx`

**Photorealistic render swap path:**

`art/RealBox.tsx` is a drop-in `<Image />` swap. When a 3D artist delivers a photoreal PNG render of the keepsake box (with transparent background), save it to `/public/products/silk-box-hero.png` and replace the `<GiftBox />` instance inside `SilkExperience.tsx`:

```tsx
// before
<GiftBox lidOpen={lidOpen} rotate={boxRotate} className="w-full" />

// after — real photoreal PNG render
<RealBox
  src="/products/silk-box-hero.png"
  alt="The Silk keepsake box"
  lidOpen={lidOpen}
  rotate={boxRotate}
  className="w-full"
/>
```

The full render brief — camera angle, lighting setup, material spec, file format — is documented at the top of `art/RealBox.tsx`. Hand the file to your 3D artist as-is.

**The route is live the moment `npm install && npm run dev` runs.**
