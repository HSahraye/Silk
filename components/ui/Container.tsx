import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function Container({
  className,
  size = 'default',
  ...props
}: HTMLAttributes<HTMLDivElement> & { size?: 'tight' | 'default' | 'wide' }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        size === 'tight' && 'max-w-[1080px]',
        size === 'default' && 'max-w-[1200px]',
        size === 'wide' && 'max-w-[1320px]',
        className,
      )}
      {...props}
    />
  );
}
