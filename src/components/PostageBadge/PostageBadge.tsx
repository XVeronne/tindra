import * as React from 'react';
import { cn } from '@/lib/cn';

export type PostageBadgeTone = 'clay' | 'burgundy' | 'pine' | 'navy' | 'ochre' | 'ink';

export interface PostageBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: PostageBadgeTone;
  brand?: string;
  year?: string;
  value?: string;
  valueLabel?: string;
  serial?: string;
  denomination?: string;
  cancelled?: boolean;
  cancelLabel?: string;
  cancelDate?: string;
  size?: number;
}

const TONE_BG: Record<PostageBadgeTone, string> = {
  clay: 'rgb(201, 125, 91)',
  burgundy: 'rgb(169, 58, 79)',
  pine: 'rgb(38, 79, 74)',
  navy: 'rgb(28, 48, 84)',
  ochre: 'rgb(196, 154, 58)',
  ink: 'rgb(26, 20, 16)'
};

export const PostageBadge = React.forwardRef<HTMLSpanElement, PostageBadgeProps>(
  (
    {
      className,
      tone = 'clay',
      brand = 'tindra',
      year = '2026',
      value = '94',
      valueLabel = 'score',
      serial = '142',
      denomination = '0·45',
      cancelled = false,
      cancelLabel = 'DONE',
      cancelDate = '14·OCT',
      size = 88,
      style,
      ...props
    },
    ref
  ) => (
    <span
      ref={ref}
      className={cn('relative inline-flex flex-col items-center justify-between', className)}
      style={{
        width: size,
        height: size + 8,
        padding: 7,
        backgroundColor: TONE_BG[tone],
        boxShadow: '0 1px 0 rgba(26,20,16,0.1), inset 0 1px 0 rgba(255,255,255,0.18)',
        ...style
      }}
      {...props}
    >
      <span
        aria-hidden
        className="absolute pointer-events-none"
        style={{ inset: 5, border: '1px dashed rgba(250, 246, 236, 0.55)' }}
      />
      <span className="flex items-center justify-between w-full px-1">
        <span
          className="font-mono uppercase"
          style={{
            fontSize: 7,
            fontWeight: 700,
            color: 'rgba(250,246,236,0.78)',
            letterSpacing: '0.18em'
          }}
        >
          {brand}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 7,
            fontWeight: 700,
            color: 'rgba(250,246,236,0.78)',
            letterSpacing: '0.05em'
          }}
        >
          {year}
        </span>
      </span>
      <span className="flex flex-col items-center" style={{ lineHeight: 1 }}>
        <span
          className="font-display italic"
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: 'rgb(250, 246, 236)',
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}
        >
          {value}
        </span>
        <span
          className="font-sans uppercase pt-0.5"
          style={{
            fontSize: 7,
            fontWeight: 700,
            color: 'rgba(250,246,236,0.78)',
            letterSpacing: '0.16em'
          }}
        >
          {valueLabel}
        </span>
      </span>
      <span className="flex items-center justify-between w-full px-1">
        <span
          className="font-mono"
          style={{
            fontSize: 7,
            fontWeight: 700,
            color: 'rgba(250,246,236,0.78)',
            letterSpacing: '0.05em'
          }}
        >
          {serial}
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 7,
            fontWeight: 700,
            color: 'rgb(250, 246, 236)',
            letterSpacing: '0.05em'
          }}
        >
          {denomination}
        </span>
      </span>
      {cancelled && (
        <svg
          aria-hidden
          className="absolute pointer-events-none"
          style={{ inset: 0, opacity: 0.55 }}
          viewBox={`0 0 ${size} ${size + 8}`}
          preserveAspectRatio="none"
        >
          <line x1={-4} y1={size - 10} x2={size + 4} y2={10} stroke="rgb(26,20,16)" strokeWidth="1.5" />
          <line x1={-4} y1={size - 4} x2={size + 4} y2={16} stroke="rgb(26,20,16)" strokeWidth="1.5" />
          <ellipse cx={size * 0.25} cy={size * 0.25} rx={size * 0.2} ry={size * 0.16} fill="none" stroke="rgb(26,20,16)" strokeWidth="1.2" opacity="0.7" />
          <text
            x={size * 0.25}
            y={size * 0.235}
            fontFamily="JetBrains Mono"
            fontSize="5"
            fontWeight="700"
            fill="rgb(26,20,16)"
            textAnchor="middle"
            opacity="0.75"
          >
            {cancelLabel}
          </text>
          <text
            x={size * 0.25}
            y={size * 0.31}
            fontFamily="JetBrains Mono"
            fontSize="4"
            fontWeight="600"
            fill="rgb(26,20,16)"
            textAnchor="middle"
            opacity="0.7"
          >
            {cancelDate}
          </text>
        </svg>
      )}
    </span>
  )
);
PostageBadge.displayName = 'PostageBadge';
