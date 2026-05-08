import * as React from 'react';
import { cn } from '@/lib/cn';

export interface SignatureFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  date?: string;
  place?: string;
  hint?: string;
}

export const SignatureField = React.forwardRef<HTMLInputElement, SignatureFieldProps>(
  (
    {
      className,
      label = 'signed · by hand',
      date = '14·OCT·2026',
      place = 'PARIS',
      hint = '— consents to the upcoming session',
      placeholder = 'Your signature',
      defaultValue,
      value,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const meta = `${date}${place ? ` · ${place}` : ''}`;

    return (
      <div className={cn('flex flex-col gap-2 w-full max-w-[420px]', className)}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-eyebrow font-bold text-clay-deep">{label}</span>
          <span className="font-mono text-[9px] font-semibold text-ink-faint tracking-[0.05em]">
            {meta}
          </span>
        </div>
        <div className="flex items-end gap-3 pb-1">
          <span className="flex items-center justify-center" style={{ width: 24, height: 32, flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M3 3 L17 17 M17 3 L3 17" stroke="rgb(26, 20, 16)" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          <div className="flex-1 relative pb-2 border-b border-ink">
            <input
              ref={ref}
              id={inputId}
              value={value}
              defaultValue={defaultValue}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full bg-transparent border-0 px-0 font-display italic font-medium text-[28px] text-ink leading-none focus:outline-none placeholder:text-ink-faint placeholder:italic"
              style={{ letterSpacing: '-0.005em' }}
              {...props}
            />
          </div>
        </div>
        {hint && (
          <span className="font-sans italic text-[11px] text-ink-faint" style={{ paddingLeft: 36 }}>
            {hint}
          </span>
        )}
      </div>
    );
  }
);
SignatureField.displayName = 'SignatureField';
