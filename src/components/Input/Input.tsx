import * as React from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, hint, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const describedById = hint || error ? `${inputId}-hint` : undefined;

    return (
      <div className="group flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-[10px] uppercase tracking-eyebrow font-bold transition-colors duration-200',
              error
                ? 'text-burgundy'
                : 'text-ink-muted group-focus-within:text-clay-deep'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={type}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedById}
            className={cn(
              'peer w-full bg-transparent border-0 px-0 py-2',
              'font-sans text-base text-ink placeholder:text-ink-faint placeholder:italic',
              'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-hairline"
          />
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] origin-left',
              'transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]',
              error
                ? 'bg-burgundy scale-x-100'
                : 'bg-clay scale-x-0 peer-focus:scale-x-100'
            )}
          />
        </div>
        {error ? (
          <span
            id={describedById}
            className="text-xs text-burgundy font-medium flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse" aria-hidden />
            {error}
          </span>
        ) : hint ? (
          <span id={describedById} className="text-xs text-ink-faint italic">
            {hint}
          </span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
