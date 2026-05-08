import * as React from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface TicketButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ticketNumber?: string;
  numberLabel?: string;
  admitLabel?: string;
  atLabel?: string;
  atValue?: string;
}

export const TicketButton = React.forwardRef<HTMLButtonElement, TicketButtonProps>(
  (
    {
      className,
      children,
      ticketNumber = '142',
      numberLabel = 'no.',
      admitLabel = 'admit',
      atLabel = 'at',
      atValue = '09:30',
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(
        'group inline-flex items-stretch overflow-hidden bg-paper-raised border border-ink rounded-sm cursor-pointer',
        'transition-all duration-200 hover:shadow-[0_3px_0_rgba(26,20,16,0.18)] hover:-translate-y-px active:translate-y-0 active:shadow-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between bg-ink text-paper px-4 py-3 min-w-[80px] text-left transition-colors duration-200 group-hover:bg-clay-deep">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint group-hover:text-paper/70 transition-colors duration-200">
          {numberLabel}
        </span>
        <span className="font-mono font-bold text-lg tracking-wider transition-transform duration-300 group-hover:scale-105 origin-left">
          {ticketNumber}
        </span>
      </div>

      <div
        aria-hidden
        className="self-stretch w-px bg-repeat-y bg-[length:1px_6px] bg-[image:linear-gradient(to_bottom,rgb(var(--ink-faint))_50%,transparent_50%)] group-hover:animate-march-y"
      />

      <div className="flex items-center gap-4 px-5 py-3">
        <Play className="h-3 w-3 fill-clay-deep text-clay-deep shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
            {admitLabel}
          </span>
          <span className="font-sans font-extrabold text-xl text-ink leading-none">{children}</span>
        </div>
        <div className="w-px self-stretch bg-hairline" aria-hidden />
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
            {atLabel}
          </span>
          <span className="font-mono font-semibold text-base text-ink leading-none">{atValue}</span>
        </div>
      </div>
    </button>
  )
);
TicketButton.displayName = 'TicketButton';
