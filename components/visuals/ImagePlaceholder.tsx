import { cn } from '@/lib/cn';
import { Camera } from 'lucide-react';

/**
 * Editorial image placeholder — used until photography is shot.
 * Renders a tactile frame with embedded art-direction notes, so the
 * site looks intentional even before assets exist.
 *
 * Replace with a real <Image /> when photography arrives.
 */
export type ImagePlaceholderProps = {
  /** Project ID — included in the visible plate so production can match shots. */
  id: string;
  /** Short title — the shot we want. */
  title: string;
  /** Art direction — lens, light, framing, mood. */
  direction: string;
  /** Aspect ratio class, e.g. "aspect-[4/5]". */
  aspect?: string;
  /** Optional palette gradient — defaults to honey + bronze. */
  palette?: 'honey' | 'pistachio' | 'rose' | 'ember' | 'paper';
  className?: string;
};

const palettes: Record<NonNullable<ImagePlaceholderProps['palette']>, string> = {
  honey:
    'radial-gradient(120% 100% at 30% 20%, rgba(232,210,154,0.30), transparent 55%), radial-gradient(120% 100% at 80% 90%, rgba(108,75,37,0.55), transparent 60%), linear-gradient(160deg, #2C1F12 0%, #120B07 100%)',
  pistachio:
    'radial-gradient(120% 100% at 30% 20%, rgba(148,178,95,0.22), transparent 55%), radial-gradient(120% 100% at 80% 90%, rgba(47,66,19,0.65), transparent 60%), linear-gradient(160deg, #1F2410 0%, #0E1207 100%)',
  rose:
    'radial-gradient(120% 100% at 30% 20%, rgba(233,197,184,0.22), transparent 55%), radial-gradient(120% 100% at 80% 90%, rgba(101,53,38,0.55), transparent 60%), linear-gradient(160deg, #2A1813 0%, #120907 100%)',
  ember:
    'radial-gradient(120% 100% at 30% 20%, rgba(217,184,112,0.18), transparent 55%), radial-gradient(120% 100% at 80% 90%, rgba(82,54,24,0.65), transparent 60%), linear-gradient(160deg, #221610 0%, #0F0905 100%)',
  paper:
    'radial-gradient(120% 100% at 30% 20%, rgba(251,246,234,0.10), transparent 55%), radial-gradient(120% 100% at 80% 90%, rgba(208,174,133,0.10), transparent 60%), linear-gradient(160deg, #1B1410 0%, #100A06 100%)',
};

export function ImagePlaceholder({
  id,
  title,
  direction,
  aspect = 'aspect-[4/5]',
  palette = 'honey',
  className,
}: ImagePlaceholderProps) {
  return (
    <figure
      className={cn(
        'group relative isolate overflow-hidden rounded-3xl border border-line paper ember-edge',
        aspect,
        className,
      )}
      style={{ backgroundImage: palettes[palette] }}
      aria-label={`Image to come — ${title}`}
    >
      {/* Suggestive composition — abstracted layers / glow / depth */}
      <div aria-hidden className="absolute inset-0 grain opacity-90" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-70"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 100%, rgba(217,184,112,0.22), transparent 70%)',
        }}
      />

      {/* Subtle horizontal layer lines — phyllo abstraction */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-soft-light"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2="100"
            y1={i * 5.5 + 6}
            y2={i * 5.5 + 6 + (i % 2 ? 0.3 : -0.3)}
            stroke="#F4E9C9"
            strokeWidth="0.15"
          />
        ))}
      </svg>

      {/* Editorial caption plate */}
      <figcaption className="absolute inset-x-4 bottom-4 flex items-start gap-3 rounded-2xl border border-line bg-bg/55 px-4 py-3.5 backdrop-blur-md">
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line text-ink-muted">
          <Camera className="h-3 w-3" />
        </span>
        <span className="text-left">
          <span className="block font-display text-sm text-ink leading-tight">{title}</span>
          <span className="mt-1 block text-[11px] leading-snug text-ink-muted pretty">
            {direction}
          </span>
          <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-widest text-ink-subtle">
            Shot · {id}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
