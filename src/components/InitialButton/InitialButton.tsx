import * as React from 'react';
import { cn } from '@/lib/cn';

export interface InitialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  atLabel?: string;
  atValue?: string;
  annotation?: string;
}

export const InitialButton = React.forwardRef<HTMLButtonElement, InitialButtonProps>(
  ({ className, children, atLabel = 'at', atValue, annotation, ...props }, ref) => {
    const text = typeof children === 'string' ? children : String(children ?? '');
    const initial = text.charAt(0);
    const rest = text.slice(1);

    return (
      <button
        ref={ref}
        className={cn(
          'group inline-flex items-stretch gap-4 bg-transparent border-0 p-0 cursor-pointer rounded',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'flex items-center justify-center w-[88px] h-[88px] bg-clay-deep rounded',
            'shadow-[0_6px_14px_rgba(176,97,62,0.28),inset_0_1px_0_rgba(255,255,255,0.22)]',
            'transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
            'group-hover:translate-y-[3px] group-hover:shadow-[0_2px_4px_rgba(176,97,62,0.3),inset_0_1px_0_rgba(255,255,255,0.22)]',
            'group-active:translate-y-[5px] group-active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.08)]'
          )}
        >
          <span className="font-display italic font-bold text-[80px] text-paper leading-none pb-1 transition-transform duration-[220ms] ease-out group-active:scale-[0.98]">
            {initial}
          </span>
        </div>
        <div className="flex flex-col justify-center gap-1 py-1.5 text-left">
          <span className="font-display italic font-medium text-[44px] text-ink leading-none tracking-tight">
            {rest}
          </span>
          {(atValue || annotation) && (
            <div className="flex items-baseline gap-2 flex-wrap">
              {atValue && (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                    {atLabel}
                  </span>
                  <span className="font-mono text-sm text-ink-muted">{atValue}</span>
                </>
              )}
              {annotation && (
                <span className="font-sans italic text-[11px] text-ink-faint">— {annotation}</span>
              )}
            </div>
          )}
        </div>
      </button>
    );
  }
);
InitialButton.displayName = 'InitialButton';
