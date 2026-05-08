import * as React from 'react';
import { cn } from '@/lib/cn';

export interface GazetteProps extends React.HTMLAttributes<HTMLDivElement> {
  masthead?: string;
  dateline?: string;
  headline?: string;
  subhead?: string;
  leftColumn?: React.ReactNode;
  rightColumn?: React.ReactNode;
  rotate?: number;
}

const TornEdge = ({ flip }: { flip?: boolean }) => (
  <svg
    aria-hidden
    className="absolute left-0 right-0 w-full pointer-events-none"
    style={{
      [flip ? 'bottom' : 'top']: -1,
      height: 6,
      transform: flip ? 'scaleY(-1)' : undefined
    }}
    height="6"
    viewBox="0 0 360 6"
    preserveAspectRatio="none"
  >
    <path
      d="M0 0 L8 5 L16 1 L24 4 L32 0 L40 5 L48 2 L56 4 L64 0 L72 5 L80 1 L88 4 L96 0 L104 5 L112 2 L120 4 L128 0 L136 5 L144 1 L152 4 L160 0 L168 5 L176 2 L184 4 L192 0 L200 5 L208 1 L216 4 L224 0 L232 5 L240 2 L248 4 L256 0 L264 5 L272 1 L280 4 L288 0 L296 5 L304 2 L312 4 L320 0 L328 5 L336 1 L344 4 L352 0 L360 5 L360 0 L0 0 Z"
      fill="rgb(242, 235, 221)"
    />
  </svg>
);

export const Gazette = React.forwardRef<HTMLDivElement, GazetteProps>(
  (
    {
      className,
      masthead = 'The Wiinky Gazette',
      dateline = 'VOL. IV · 14 OCT 2026 · NO. 142',
      headline = 'A clean window opens at half past nine.',
      subhead = '— a forty-five minute deep flow forecast for our staff scientist',
      leftColumn = 'Conditions are favourable. Steady gaze, low room noise, and enough morning energy for one focused hour.',
      rightColumn = 'Biometric fatigue point not yet reached. Begin while the window holds.',
      rotate = -1,
      style,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn('relative inline-flex flex-col', className)}
      style={{
        width: 360,
        padding: '16px 22px 18px',
        backgroundColor: 'rgb(247, 232, 208)',
        border: '1px solid rgba(26,20,16,0.18)',
        boxShadow: '1px 1px 0 rgba(26,20,16,0.04)',
        transform: `rotate(${rotate}deg)`,
        ...style
      }}
      {...props}
    >
      <TornEdge />
      <TornEdge flip />

      <div className="flex items-center justify-between pb-2 border-b border-ink/40">
        <span className="font-display italic text-sm font-bold text-ink leading-none">{masthead}</span>
        <span className="font-mono text-[9px] font-semibold text-ink-muted tracking-wider">{dateline}</span>
      </div>

      <p className="font-display text-[28px] font-bold text-ink leading-[1.05] tracking-tight pt-3.5 pb-1.5">
        {headline}
      </p>
      <p className="font-display italic text-xs font-medium text-ink-muted pb-2.5">{subhead}</p>

      <div className="flex gap-3.5">
        <div className="flex-1 font-sans text-[11px] leading-[1.5] text-ink">{leftColumn}</div>
        <div className="w-px bg-ink/20" />
        <div className="flex-1 font-sans text-[11px] leading-[1.5] text-ink">{rightColumn}</div>
      </div>
    </div>
  )
);
Gazette.displayName = 'Gazette';
