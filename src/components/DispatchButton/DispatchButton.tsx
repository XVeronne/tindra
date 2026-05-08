import * as React from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface DispatchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  timestamp?: string;
  words?: string[];
  separator?: string;
  footerLeft?: string;
  footerRight?: string;
}

const dashedHorizontal =
  'bg-repeat-x bg-[length:6px_1px] bg-[image:linear-gradient(to_right,rgb(var(--ink-faint))_50%,transparent_50%)]';

export const DispatchButton = React.forwardRef<HTMLButtonElement, DispatchButtonProps>(
  (
    {
      className,
      label = 'DISPATCH',
      timestamp = '28 APR · 09:14',
      words = ['BEGIN', '0930', '45M'],
      separator = 'STOP',
      footerLeft = 'XV-2026 / V4.7',
      footerRight = 'CONFIRMED',
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(
        'group relative inline-flex flex-col px-6 py-4 bg-paper-raised border border-ink min-w-[380px] cursor-pointer text-left',
        'transition-all duration-200 hover:shadow-[0_3px_0_rgba(26,20,16,0.2)] hover:-translate-y-px active:translate-y-0 active:shadow-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
        className
      )}
      {...props}
    >
      <div className="relative flex items-center justify-between pb-2.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted">
          {label}
        </span>
        <span className="font-mono text-[10px] font-medium text-ink-muted tracking-wider">
          {timestamp}
        </span>
        <span
          aria-hidden
          className={cn(
            'absolute bottom-0 left-0 right-0 h-px',
            dashedHorizontal,
            'group-hover:animate-march-x'
          )}
        />
      </div>

      <div className="flex items-center gap-3 py-3.5 flex-wrap">
        <Play className="h-3.5 w-3.5 fill-ink text-ink shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span
              className={cn(
                'font-mono text-[22px] font-bold tracking-wide',
                i === words.length - 1 ? 'text-clay-deep' : 'text-ink'
              )}
            >
              {word}
            </span>
            {i < words.length - 1 && (
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
                {separator}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative flex items-center justify-between pt-2.5">
        <span className="font-mono text-[10px] font-medium text-ink-faint tracking-wider">
          {footerLeft}
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-clay-deep flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-clay-deep animate-pulse" aria-hidden />
          {footerRight}
        </span>
        <span
          aria-hidden
          className={cn(
            'absolute top-0 left-0 right-0 h-px',
            dashedHorizontal,
            'group-hover:animate-march-x'
          )}
        />
      </div>

      <span className="absolute -top-px -left-px w-[7px] h-[7px] border-t-2 border-l-2 border-ink" aria-hidden />
      <span className="absolute -top-px -right-px w-[7px] h-[7px] border-t-2 border-r-2 border-ink" aria-hidden />
      <span className="absolute -bottom-px -left-px w-[7px] h-[7px] border-b-2 border-l-2 border-ink" aria-hidden />
      <span className="absolute -bottom-px -right-px w-[7px] h-[7px] border-b-2 border-r-2 border-ink" aria-hidden />
    </button>
  )
);
DispatchButton.displayName = 'DispatchButton';
