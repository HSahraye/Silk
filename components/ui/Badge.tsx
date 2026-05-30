import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function Badge({
  className,
  variant = 'default',
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'gold' | 'outline';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-tight',
        variant === 'default' && 'bg-bg-raised text-ink-muted border border-line',
        variant === 'gold' && 'bg-gold-500/10 text-gold-200 border border-gold-500/20',
        variant === 'outline' && 'border border-line text-ink-muted',
        className,
      )}
      {...props}
    />
  );
}
