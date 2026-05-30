import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function Card({
  className,
  hover = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-line bg-bg-raised/60 backdrop-blur-sm transition-colors duration-500 ease-silk',
        hover && 'hover:border-line-strong hover:bg-bg-raised',
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-7 sm:p-8', className)} {...props} />;
}
