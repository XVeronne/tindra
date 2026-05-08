import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface HeadlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const HeadlineButton = React.forwardRef<HTMLButtonElement, HeadlineButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'group inline-flex items-baseline gap-4 bg-transparent border-0 p-0 cursor-pointer rounded-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-4 focus-visible:ring-offset-paper',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'relative font-display italic font-semibold text-5xl leading-none tracking-tight text-ink',
          "after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[3px] after:bg-clay",
          'after:origin-left after:scale-x-0 after:transition-transform after:duration-[450ms] after:ease-[cubic-bezier(0.65,0,0.35,1)]',
          'group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100'
        )}
      >
        {children}
      </span>
      <ArrowRight
        className="h-9 w-9 self-center text-clay-deep transition-transform duration-300 ease-out group-hover:translate-x-2"
        strokeWidth={2.5}
        aria-hidden
      />
    </button>
  )
);
HeadlineButton.displayName = 'HeadlineButton';
