import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';

export function CTA({
  eyebrow = 'For the next moment that matters',
  title = 'Send something they\'ll still mention next week.',
  body = 'A single box for a friend, a closing dinner for the table, a quarterly program for your clients. We\'ll help you choose.',
  primary = { label: 'Send a Gift', href: '/contact?type=retail' },
  secondary = { label: 'Corporate Orders', href: '/corporate' },
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
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-bg-raised/70 px-8 py-16 paper ember-edge sm:px-12 lg:px-20 lg:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -left-20 -top-20 h-[380px] w-[380px] rounded-full bg-gold-500/18 blur-3xl animate-drift" />
            <div className="absolute -right-20 -bottom-20 h-[440px] w-[440px] rounded-full bg-bronze-400/12 blur-3xl animate-drift" />
            <div className="absolute inset-0 bg-[radial-gradient(640px_220px_at_50%_0%,rgba(246,239,224,0.06),transparent)]" />
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="eyebrow text-gold-300">{eyebrow}</div>
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
