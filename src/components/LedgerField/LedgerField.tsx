import * as React from 'react';
import { cn } from '@/lib/cn';

export interface LedgerCell {
  label: string;
  value: string;
  active?: boolean;
}

export interface LedgerFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  formatHint?: string;
  cells?: LedgerCell[];
  hint?: string;
  keyboardHint?: string;
}

const DEFAULT_CELLS: LedgerCell[] = [
  { label: 'hr', value: '00' },
  { label: 'min', value: '45', active: true },
  { label: 'sec', value: '00' }
];

export const LedgerField = React.forwardRef<HTMLDivElement, LedgerFieldProps>(
  (
    {
      className,
      label = 'duration',
      formatHint = 'HH : MM : SS',
      cells = DEFAULT_CELLS,
      hint = '≈ 45 minutes',
      keyboardHint = '↑↓ to adjust · ⇥ next cell',
      ...props
    },
    ref
  ) => (
    <div ref={ref} className={cn('flex flex-col gap-2 w-full max-w-[420px]', className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-eyebrow font-bold text-clay-deep">{label}</span>
        <span className="font-mono text-[9px] font-semibold text-ink-faint tracking-[0.1em]">
          {formatHint}
        </span>
      </div>
      <div className="flex items-stretch border border-ink bg-paper-raised">
        {cells.map((cell, i) => (
          <div
            key={`${cell.label}-${i}`}
            className={cn(
              'relative flex flex-col items-center flex-1',
              i < cells.length - 1 && 'border-r border-ink-faint',
              cell.active && 'bg-paper-sunken'
            )}
            style={{ padding: '10px 18px 8px' }}
          >
            <span
              className={cn(
                'font-sans uppercase pb-1',
                cell.active ? 'text-clay-deep' : 'text-ink-faint'
              )}
              style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.24em' }}
            >
              {cell.label}
            </span>
            <span
              className={cn('font-mono leading-none', cell.active ? 'text-ink' : 'text-ink-faint')}
              style={{ fontSize: 28, fontWeight: 700 }}
            >
              {cell.value}
            </span>
            {cell.active && (
              <span aria-hidden className="absolute -bottom-px left-0 right-0 h-0.5 bg-clay" />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-ink-muted">{hint}</span>
        <span className="font-mono text-[10px] text-ink-faint tracking-[0.05em]">{keyboardHint}</span>
      </div>
    </div>
  )
);
LedgerField.displayName = 'LedgerField';
