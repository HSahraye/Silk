import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export function CTA({
  eyebrow = 'Ready when you are',
  title = 'Make the next gift the one they remember.',
  body = 'Talk to a Silk specialist about a single send, an annual program, or a custom collection for your team.',
  primary = { label: 'Talk to Sales', href: '/contact?type=corporate' },
  secondary = { label: 'Send a Gift', href: '/contact?type=retail' },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-bg-raised/70 px-8 py-16 sm:px-12 lg:px-20 lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -left-20 -top-20 h-[360px] w-[360px] rounded-full bg-gold-500/15 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-[420px] w-[420px] rounded-full bg-pistachio-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_0%,rgba(255,255,255,0.04),transparent)]" />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="eyebrow text-gold-200">{eyebrow}</div>
              <h2 className="mt-4 font-display text-display-xl text-ink balance">
                {title}
              </h2>
              <p className="mt-6 max-w-xl text-lg text-ink-muted pretty">{body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={primary.href} variant="primary" size="lg" arrow>
                {primary.label}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
