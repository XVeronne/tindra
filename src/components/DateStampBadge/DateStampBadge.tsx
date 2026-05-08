import * as React from 'react';
import { cn } from '@/lib/cn';

export type DateStampTone = 'ink' | 'clay' | 'pine' | 'burgundy';

export interface DateStampBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: DateStampTone;
  label?: string;
  value?: string;
  subValue?: string;
  size?: number;
}

const TONE_COLOR: Record<DateStampTone, string> = {
  ink: 'rgb(26, 20, 16)',
  clay: 'rgb(176, 97, 62)',
  pine: 'rgb(38, 79, 74)',
  burgundy: 'rgb(169, 58, 79)'
};

export const DateStampBadge = React.forwardRef<HTMLSpanElement, DateStampBadgeProps>(
  (
    {
      className,
      tone = 'ink',
      label = 'RECEIVED',
      value = '14 OCT',
      subValue = '2026',
      size = 96,
      style,
      ...props
    },
    ref
  ) => {
    const color = TONE_COLOR[tone];
    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center justify-center', className)}
        style={{ width: size, height: size, ...style }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden
          style={{ display: 'block' }}
        >
          <ellipse
            cx={size / 2}
            cy={size / 2}
            rx={size / 2 - 4}
            ry={size / 2 - 6}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
          <text
            x={size / 2}
            y={size * 0.22}
            fontFamily="Inter"
            fontSize="8"
            fontWeight="800"
            letterSpacing="2"
            fill={color}
            textAnchor="middle"
          >
            {label}
          </text>
          <line
            x1={size * 0.18}
            y1={size * 0.32}
            x2={size * 0.82}
            y2={size * 0.32}
            stroke={color}
            strokeWidth="0.8"
            opacity="0.4"
          />
          <text
            x={size / 2}
            y={size * (subValue ? 0.6 : 0.56)}
            fontFamily="JetBrains Mono"
            fontSize={subValue ? '14' : '20'}
            fontWeight="700"
            fill={color}
            textAnchor="middle"
          >
            {value}
          </text>
          {subValue && (
            <text
              x={size / 2}
              y={size * 0.74}
              fontFamily="JetBrains Mono"
              fontSize="10"
              fontWeight="500"
              fill={color}
              textAnchor="middle"
              opacity="0.7"
            >
              {subValue}
            </text>
          )}
        </svg>
      </span>
    );
  }
);
DateStampBadge.displayName = 'DateStampBadge';
