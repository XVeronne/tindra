import * as React from 'react';
import { cn } from '@/lib/cn';

export type HangTagTone = 'clay' | 'pine' | 'ochre' | 'burgundy' | 'ink';

export interface HangTagBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: HangTagTone;
  eyebrow?: string;
  value?: string;
  qualifier?: string;
  rotate?: number;
  showString?: boolean;
}

const TONE_CONFIG: Record<HangTagTone, { bg: string; ink: string; muted: string; rule: string }> = {
  clay: {
    bg: 'rgb(218, 167, 111)',
    ink: 'rgb(26, 20, 16)',
    muted: 'rgba(26, 20, 16, 0.55)',
    rule: 'rgba(26, 20, 16, 0.3)'
  },
  pine: {
    bg: 'rgb(38, 79, 74)',
    ink: 'rgb(250, 246, 236)',
    muted: 'rgba(250, 246, 236, 0.6)',
    rule: 'rgba(250, 246, 236, 0.3)'
  },
  ochre: {
    bg: 'rgb(196, 154, 58)',
    ink: 'rgb(26, 20, 16)',
    muted: 'rgba(26, 20, 16, 0.55)',
    rule: 'rgba(26, 20, 16, 0.3)'
  },
  burgundy: {
    bg: 'rgb(169, 58, 79)',
    ink: 'rgb(250, 246, 236)',
    muted: 'rgba(250, 246, 236, 0.6)',
    rule: 'rgba(250, 246, 236, 0.3)'
  },
  ink: {
    bg: 'rgb(26, 20, 16)',
    ink: 'rgb(250, 246, 236)',
    muted: 'rgba(250, 246, 236, 0.55)',
    rule: 'rgba(250, 246, 236, 0.3)'
  }
};

export const HangTagBadge = React.forwardRef<HTMLSpanElement, HangTagBadgeProps>(
  (
    {
      className,
      tone = 'clay',
      eyebrow = 'window',
      value = '45m',
      qualifier = 'deep flow',
      rotate = -3,
      showString = true,
      style,
      ...props
    },
    ref
  ) => {
    const t = TONE_CONFIG[tone];
    return (
      <span
        ref={ref}
        className={cn('relative inline-flex flex-col items-center justify-end', className)}
        style={{
          width: 92,
          minHeight: 110,
          padding: '14px 14px 12px',
          backgroundColor: t.bg,
          borderRadius: 4,
          boxShadow: '1px 2px 0 rgba(26,20,16,0.08)',
          transform: `rotate(${rotate}deg)`,
          ...style
        }}
        {...props}
      >
        <span
          aria-hidden
          className="absolute"
          style={{
            top: 4,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 14,
            height: 14,
            backgroundColor: 'rgb(242, 235, 221)',
            borderRadius: '50%',
            boxShadow: 'inset 0 1px 1px rgba(26,20,16,0.2)'
          }}
        />
        {showString && (
          <svg
            aria-hidden
            className="absolute pointer-events-none"
            style={{ top: -16, left: '50%', transform: 'translateX(-50%)' }}
            width="20"
            height="22"
            viewBox="0 0 20 22"
          >
            <path d="M10 0 Q4 8 10 12" stroke="rgb(110, 95, 79)" strokeWidth="1" fill="none" />
            <path d="M10 0 Q16 8 10 12" stroke="rgb(110, 95, 79)" strokeWidth="1" fill="none" />
          </svg>
        )}
        <span className="flex flex-col items-center gap-1 pt-3.5">
          <span
            className="font-sans uppercase"
            style={{ fontSize: 8, fontWeight: 700, color: t.muted, letterSpacing: '0.2em' }}
          >
            {eyebrow}
          </span>
          <span
            className="font-mono"
            style={{ fontSize: 18, fontWeight: 700, color: t.ink, lineHeight: 1 }}
          >
            {value}
          </span>
          <span style={{ height: 1, width: 28, backgroundColor: t.rule }} />
          <span
            className="font-display italic"
            style={{ fontSize: 11, fontWeight: 500, color: t.ink, lineHeight: 1.1 }}
          >
            {qualifier}
          </span>
        </span>
      </span>
    );
  }
);
HangTagBadge.displayName = 'HangTagBadge';
