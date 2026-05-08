import * as React from 'react';
import { cn } from '@/lib/cn';

export interface ExLibrisFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  header?: string;
  volume?: string;
  subject?: string;
  stamped?: string;
}

const Fleuron = ({ flip }: { flip?: boolean }) => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    aria-hidden
    style={{ flexShrink: 0, transform: flip ? 'scaleX(-1)' : undefined }}
  >
    <path d="M2 7 Q4 2 8 7 Q12 12 14 7" stroke="rgb(26, 20, 16)" strokeWidth="1" fill="none" />
    <circle cx="8" cy="7" r="1" fill="rgb(176, 97, 62)" />
  </svg>
);

export const ExLibrisField = React.forwardRef<HTMLInputElement, ExLibrisFieldProps>(
  (
    {
      className,
      header = 'Ex Libris',
      volume = 'IV',
      subject = 'CHEM',
      stamped = '14·OCT·26',
      placeholder = 'Your name',
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

    return (
      <div
        className={cn('relative flex flex-col items-center', className)}
        style={{
          width: 360,
          padding: 16,
          backgroundColor: 'rgb(250, 246, 236)',
          border: '1px solid rgb(26, 20, 16)'
        }}
      >
        <span
          aria-hidden
          className="absolute pointer-events-none"
          style={{ inset: 5, border: '1px solid rgb(26, 20, 16)' }}
        />
        <div className="flex items-center justify-center gap-3 w-full pb-2 px-2">
          <span className="h-px flex-1 bg-ink" />
          <Fleuron />
          <span
            className="font-sans uppercase"
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.32em', color: 'rgb(26, 20, 16)' }}
          >
            {header}
          </span>
          <Fleuron flip />
          <span className="h-px flex-1 bg-ink" />
        </div>
        <input
          ref={ref}
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-0 px-0 py-1 text-center font-display italic font-medium text-[28px] text-ink leading-[1.1] focus:outline-none placeholder:text-ink-faint placeholder:italic"
          style={{ letterSpacing: '-0.005em' }}
          {...props}
        />
        <div
          className="flex items-center justify-between w-full pt-1.5 px-2 mt-1.5"
          style={{ borderTop: '1px solid rgba(26, 20, 16, 0.15)' }}
        >
          <span className="flex flex-col items-start gap-px">
            <span
              className="font-sans uppercase"
              style={{ fontSize: 8, fontWeight: 700, color: 'rgb(168, 152, 132)', letterSpacing: '0.2em' }}
            >
              vol.
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 11, fontWeight: 700, color: 'rgb(26, 20, 16)', letterSpacing: '0.04em' }}
            >
              {volume}
            </span>
          </span>
          <span className="flex flex-col items-center gap-px">
            <span
              className="font-sans uppercase"
              style={{ fontSize: 8, fontWeight: 700, color: 'rgb(168, 152, 132)', letterSpacing: '0.2em' }}
            >
              subject
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 11, fontWeight: 700, color: 'rgb(26, 20, 16)', letterSpacing: '0.04em' }}
            >
              {subject}
            </span>
          </span>
          <span className="flex flex-col items-end gap-px">
            <span
              className="font-sans uppercase"
              style={{ fontSize: 8, fontWeight: 700, color: 'rgb(168, 152, 132)', letterSpacing: '0.2em' }}
            >
              stamped
            </span>
            <span
              className="font-mono"
              style={{ fontSize: 11, fontWeight: 700, color: 'rgb(26, 20, 16)', letterSpacing: '0.04em' }}
            >
              {stamped}
            </span>
          </span>
        </div>
      </div>
    );
  }
);
ExLibrisField.displayName = 'ExLibrisField';
