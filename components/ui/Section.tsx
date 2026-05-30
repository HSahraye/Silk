import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function Section({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn('relative py-24 sm:py-28 lg:py-36', className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="h-px w-8 bg-line-strong" aria-hidden />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
