import { cn } from '@/lib/cn';

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className={cn('scroll-fade-mask overflow-hidden', className)}>
      <div className="flex w-max gap-12 animate-marquee whitespace-nowrap py-2">
        {loop.map((s, i) => (
          <span
            key={i}
            className="text-sm font-medium tracking-tight text-ink-muted"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
