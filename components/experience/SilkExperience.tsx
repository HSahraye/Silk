'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import { GiftBox } from './art/GiftBox';
import { BaklavaStack } from './art/BaklavaStack';
import { LightBeams } from './art/LightBeams';
import { GoldParticles } from './art/GoldParticles';
import { NinePieceTray } from './art/NinePieceTray';
import { BrandingSleeve } from './art/BrandingSleeve';
import { DedicationCard } from './art/DedicationCard';
import { ButtonLink } from '@/components/ui/Button';

/**
 * Six-scene scroll-linked cinematic.
 *
 * Layout:
 *   <section style={height: 700vh}>            ← outer scroll length (one viewport per scene + margin)
 *     <div className="sticky h-screen">         ← pinned stage
 *       <Stage motionValues>                    ← all layers
 *     </div>
 *   </section>
 *
 * Progress (0..1) is segmented:
 *   Scene 1 — Hero Reveal              0.00 → 0.18
 *   Scene 2 — Architectural Baklava    0.18 → 0.36
 *   Scene 3 — Signature Collection     0.36 → 0.54
 *   Scene 4 — Custom Branding          0.54 → 0.72
 *   Scene 5 — White-Glove Fulfillment  0.72 → 0.88
 *   Scene 6 — Final Brand Lockup       0.88 → 1.00
 *
 * Framer Motion drives layers via MotionValues (no React re-renders during scroll).
 * Lenis (mounted by <SmoothScroll>) provides buttery scroll. GSAP ScrollTrigger
 * is registered in SmoothScroll for any future scrub timelines beyond what FM offers.
 */
export function SilkExperience() {
  const outerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth the progress slightly — eliminates jitter at the edges of each scrub.
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  /* ─── Global / ambient ─────────────────────────────────────────────── */
  const beamIntensity = useTransform(progress, [0, 0.18, 0.36], [1, 0.9, 0]);
  const particleDensity = useTransform(progress, [0.85, 1], [0, 1]);
  const stageBgY = useTransform(progress, [0, 1], ['0%', '-8%']);
  const stageBgScale = useTransform(progress, [0, 1], [1, 1.06]);

  /* ─── Box ──────────────────────────────────────────────────────────── */
  const boxY = useTransform(
    progress,
    [0, 0.18, 0.36, 0.54, 0.72, 0.88, 1],
    ['0%', '-2%', '4%', '8%', '4%', '0%', '0%'],
  );
  const boxScale = useTransform(
    progress,
    [0, 0.18, 0.36, 0.54, 0.72, 0.88, 1],
    [1, 1.04, 0.92, 0.9, 0.94, 1.02, 1],
  );
  const boxRotate = useTransform(
    progress,
    [0, 0.54, 0.72, 1],
    [0, 0, -6, 0],
  );
  const lidOpenRaw = useTransform(progress, [0.72, 0.84], [0, 1]);
  const lidOpen = useSpring(lidOpenRaw, { stiffness: 120, damping: 22 });

  /* ─── Baklava (floating hero piece) ────────────────────────────────── */
  const stackY = useTransform(
    progress,
    [0, 0.18, 0.36, 0.54, 0.88, 1],
    ['-8%', '-12%', '-4%', '12%', '-10%', '-12%'],
  );
  const stackScale = useTransform(
    progress,
    [0, 0.18, 0.36, 0.54, 0.88, 1],
    [0.78, 0.92, 1.35, 0.62, 0.7, 0.74],
  );
  const stackRotateY = useTransform(progress, [0, 0.18], [-12, 8]);
  const stackSeparation = useTransform(progress, [0.18, 0.36], [0, 1]);
  const stackOpacity = useTransform(
    progress,
    [0, 0.36, 0.54, 0.88, 1],
    [1, 1, 0, 0, 1],
  );

  /* ─── Three feature panels ─────────────────────────────────────────── */
  const tray1Assembly = useTransform(progress, [0.36, 0.5], [0, 1]);
  const tray1Opacity = useTransform(progress, [0.36, 0.42, 0.54, 0.6], [0, 1, 1, 0]);
  const tray1X = useTransform(progress, [0.36, 0.6], ['-6%', '-30%']);

  const sleeveWrap = useTransform(progress, [0.54, 0.68], [0, 1]);
  const sleeveOpacity = useTransform(progress, [0.54, 0.6, 0.72, 0.78], [0, 1, 1, 0]);

  const cardReveal = useTransform(progress, [0.72, 0.86], [0, 1]);
  const cardOpacity = useTransform(progress, [0.72, 0.78, 0.88, 0.94], [0, 1, 1, 0]);
  const cardX = useTransform(progress, [0.72, 0.95], ['0%', '20%']);

  /* ─── Per-scene copy fade ──────────────────────────────────────────── */
  const c1Opacity = useTransform(progress, [0, 0.05, 0.16, 0.2], [0, 1, 1, 0]);
  const c2Opacity = useTransform(progress, [0.2, 0.26, 0.34, 0.38], [0, 1, 1, 0]);
  const c3Opacity = useTransform(progress, [0.38, 0.44, 0.52, 0.56], [0, 1, 1, 0]);
  const c4Opacity = useTransform(progress, [0.56, 0.62, 0.7, 0.74], [0, 1, 1, 0]);
  const c5Opacity = useTransform(progress, [0.74, 0.8, 0.86, 0.9], [0, 1, 1, 0]);
  const c6Opacity = useTransform(progress, [0.9, 0.95, 1], [0, 1, 1]);

  return (
    <section
      ref={outerRef}
      className="relative bg-bg"
      style={{ height: '700vh' }}
      aria-label="Silk — scroll-driven product experience"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Ambient background */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ y: stageBgY, scale: stageBgScale, willChange: 'transform' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(31,132,199,0.10),transparent_70%),radial-gradient(80%_60%_at_50%_100%,rgba(217,165,91,0.12),transparent_70%),linear-gradient(180deg,#05070C_0%,#0A0A0F_100%)]" />
          <div className="absolute inset-0 grain" />
        </motion.div>

        {/* Volumetric light */}
        <LightBeams
          intensity={beamIntensity}
          className="absolute inset-0 -z-[5]"
        />

        {/* Gold particles (finale) */}
        <GoldParticles
          density={particleDensity}
          className="pointer-events-none absolute inset-0 z-[20]"
        />

        {/* ─── Centerpiece ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-[10] flex items-center justify-center">
          {/* The gift box */}
          <motion.div
            style={{
              y: boxY,
              scale: boxScale,
              willChange: 'transform',
            }}
            className="absolute bottom-[24%] left-1/2 w-[min(90vw,820px)] -translate-x-1/2"
          >
            <GiftBox lidOpen={lidOpen} rotate={boxRotate} className="w-full" />
          </motion.div>

          {/* The hero baklava — floats above the box */}
          <motion.div
            style={{
              y: stackY,
              scale: stackScale,
              opacity: stackOpacity,
              willChange: 'transform, opacity',
            }}
            className="absolute top-[18%] left-1/2 w-[min(60vw,520px)] -translate-x-1/2"
          >
            <BaklavaStack
              separation={stackSeparation}
              rotate={stackRotateY}
              className="w-full"
            />
          </motion.div>

          {/* Scene 3 — Signature tray */}
          <motion.div
            style={{ opacity: tray1Opacity, x: tray1X, willChange: 'transform, opacity' }}
            className="absolute top-1/2 left-1/2 w-[min(74vw,460px)] -translate-x-1/2 -translate-y-1/2"
          >
            <NinePieceTray assembly={tray1Assembly} />
          </motion.div>

          {/* Scene 4 — Branding sleeve */}
          <motion.div
            style={{ opacity: sleeveOpacity, willChange: 'transform, opacity' }}
            className="pointer-events-none absolute bottom-[34%] left-1/2 w-[min(92vw,820px)] -translate-x-1/2"
          >
            <BrandingSleeve wrap={sleeveWrap} className="w-full" />
          </motion.div>

          {/* Scene 5 — Dedication card */}
          <motion.div
            style={{ opacity: cardOpacity, x: cardX, willChange: 'transform, opacity' }}
            className="absolute top-1/2 left-1/2 w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2"
          >
            <DedicationCard reveal={cardReveal} />
          </motion.div>
        </div>

        {/* ─── Copy overlays ──────────────────────────────────────────── */}
        <SceneCopy
          opacity={c1Opacity}
          eyebrow="Silk"
          title={
            <>
              The executive
              <br />
              <span className="ember-text">gifting standard.</span>
            </>
          }
          sub="A premium black keepsake. A floating, hand-folded baklava. A box engineered to arrive like a small occasion."
          align="bottom"
        />
        <SceneCopy
          opacity={c2Opacity}
          eyebrow="Scene · 02"
          title={
            <>
              Architectural baklava.
              <br />
              <span className="ember-text">Forty-one delicate layers.</span>
            </>
          }
          sub="Cultured butter, California pistachio, walnut, raw honey — built sheet by sheet."
        />
        <SceneCopy
          opacity={c3Opacity}
          eyebrow="Scene · 03"
          title={
            <>
              The Signature Collection.
              <br />
              <span className="ember-text">Nine perfect squares.</span>
            </>
          }
          sub="Hand-cut to identical dimensions, pistachio-crowned, ready for any desk."
        />
        <SceneCopy
          opacity={c4Opacity}
          eyebrow="Scene · 04"
          title={
            <>
              Custom branding.
              <br />
              <span className="ember-text">Executive gifting, tailored.</span>
            </>
          }
          sub="Debossed lids, co-branded sleeves, foil-stamped serials — designed in 48 hours."
        />
        <SceneCopy
          opacity={c5Opacity}
          eyebrow="Scene · 05"
          title={
            <>
              White-glove fulfillment.
              <br />
              <span className="ember-text">A dedication, by hand.</span>
            </>
          }
          sub="Recipient dedications, concierge-level delivery, and a quiet message inside the box."
        />

        {/* Scene 6 — Final lockup with CTA */}
        <motion.div
          style={{ opacity: c6Opacity, willChange: 'opacity' }}
          className="absolute inset-x-0 bottom-12 z-[30] flex flex-col items-center px-5 text-center"
        >
          <div className="eyebrow text-gold-300">Silk</div>
          <h2 className="mt-3 font-display text-display-xl text-ink balance">
            Luxury corporate baklava gifting.
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted pretty">
            A single box, a portfolio program, an annual cadence — sent with the same hand that
            folded the layers.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact?type=corporate" size="lg" arrow>
              Request a Corporate Proposal
            </ButtonLink>
            <ButtonLink href="/contact?type=retail" variant="secondary" size="lg">
              Send a Single Gift
            </ButtonLink>
          </div>
        </motion.div>

        {/* Scroll affordance — fades after first scene */}
        <ScrollHint progress={progress} />

        {/* Live progress rail */}
        <ProgressRail progress={progress} />
      </div>
    </section>
  );
}

/* ─── Sub-components ────────────────────────────────────────────────── */

function SceneCopy({
  opacity,
  eyebrow,
  title,
  sub,
  align = 'center',
}: {
  opacity: MotionValue<number>;
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
  align?: 'center' | 'bottom';
}) {
  return (
    <motion.div
      style={{ opacity, willChange: 'opacity, transform' }}
      className={
        align === 'bottom'
          ? 'pointer-events-none absolute inset-x-0 bottom-24 z-[25] mx-auto max-w-[920px] px-6 text-center sm:bottom-32'
          : 'pointer-events-none absolute inset-x-0 top-16 z-[25] mx-auto max-w-[920px] px-6 text-center sm:top-24'
      }
    >
      <div className="eyebrow text-gold-300">{eyebrow}</div>
      <h2 className="mt-4 font-display text-display-xl text-ink balance">{title}</h2>
      <p className="mx-auto mt-5 max-w-xl text-ink-muted pretty">{sub}</p>
    </motion.div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute bottom-6 left-1/2 z-[40] -translate-x-1/2 text-center"
    >
      <div className="mx-auto h-9 w-[22px] rounded-full border border-line-strong">
        <motion.div
          className="mx-auto mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-300"
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-ink-subtle">
        Scroll
      </div>
    </motion.div>
  );
}

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 top-0 z-[50] h-px bg-line"
    >
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="h-px bg-gradient-to-r from-gold-300 via-gold-500 to-bronze-400"
      />
    </div>
  );
}
