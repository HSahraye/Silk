import { cn } from '@/lib/cn';

export function Metric({
  value,
  label,
  sub,
  className,
}: {
  value: string;
  label: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="font-display text-display-md gold-text">{value}</div>
      <div className="text-sm font-medium text-ink">{label}</div>
      {sub && <div className="text-sm text-ink-muted">{sub}</div>}
    </div>
  );
}
