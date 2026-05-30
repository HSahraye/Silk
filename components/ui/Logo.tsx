import Link from 'next/link';
import { cn } from '@/lib/cn';

export function Logo({ className, mark = false }: { className?: string; mark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Silk — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span
        aria-hidden="true"
        className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600 shadow-glow transition-transform duration-500 ease-silk group-hover:scale-[1.04]"
      >
        <span className="font-display text-[15px] font-semibold text-bg leading-none">S</span>
      </span>
      {!mark && (
        <span className="font-display text-[19px] font-semibold tracking-tight text-ink">
          Silk
        </span>
      )}
    </Link>
  );
}
