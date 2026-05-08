import * as React from 'react';
import { cn } from '@/lib/cn';

export interface MarginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  eyebrow?: string;
  meta?: string;
  annotation?: string;
}

const Bracket = ({ side }: { side: 'left' | 'right' }) => (
  <svg
    width="20"
    height="80"
    viewBox="0 0 20 80"
    className={cn(
      'block shrink-0 text-ink transition-transform duration-300 ease-out',
      side === 'left' ? 'group-hover:translate-x-[5px]' : 'group-hover:-translate-x-[5px]'
    )}
    aria-hidden
  >
    <path
      d={side === 'left' ? 'M16 1 L4 1 L4 79 L16 79' : 'M4 1 L16 1 L16 79 L4 79'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const MarginButton = React.forwardRef<HTMLButtonElement, MarginButtonProps>(
  ({ className, children, eyebrow = 'action', meta, annotation, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'group inline-flex items-center gap-3 bg-transparent border-0 p-2 cursor-pointer rounded-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
        className
      )}
      {...props}
    >
      <Bracket side="left" />
      <div className="flex flex-col gap-1 px-3 py-1 text-left">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-clay-deep transition-colors duration-200 group-hover:text-clay">
          {eyebrow}
        </span>
        <div className="flex items-baseline gap-3">
          <span className="font-display italic font-semibold text-3xl text-ink leading-none tracking-tight">
            {children}
          </span>
          {meta && <span className="font-mono text-base text-ink-muted">{meta}</span>}
        </div>
        {annotation && (
          <span className="font-sans italic text-[11px] text-ink-faint transition-colors duration-200 group-hover:text-ink-muted">
            — {annotation}
          </span>
        )}
      </div>
      <Bracket side="right" />
    </button>
  )
);
MarginButton.displayName = 'MarginButton';
