import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ArrowUpRight } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'ink';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-300 ease-silk select-none disabled:opacity-50 disabled:cursor-not-allowed';

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm rounded-full',
  md: 'h-11 px-6 text-[15px] rounded-full',
  lg: 'h-14 px-7 text-base rounded-full',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-ink-inverse hover:bg-gold-100 hover:shadow-glow active:translate-y-[1px]',
  secondary:
    'bg-bg-raised text-ink border border-line hover:border-line-strong hover:bg-bg-subtle',
  ghost:
    'text-ink hover:text-gold-200',
  ink:
    'bg-ink-inverse text-ink-inverse-foreground bg-ink text-ink-inverse hover:bg-gold-100',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  arrow,
  children,
  className,
  prefetch,
  ...rest
}: CommonProps & {
  href: string;
  prefetch?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const isExternal = href.startsWith('http');
  const classes = cn(base, sizes[size], variants[variant], className);
  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        <span>{children}</span>
        {arrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={prefetch} className={classes} {...rest}>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
}
