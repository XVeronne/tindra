import * as React from 'react';
import { cn } from '@/lib/cn';

export type PolaroidTone = 'clay' | 'forest' | 'pine' | 'ochre' | 'burgundy' | 'navy';

export interface PolaroidProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: PolaroidTone;
  subject?: string;
  clarity?: number;
  startTime?: string;
  endTime?: string;
  caption?: string;
  date?: string;
  sessionNumber?: string;
  rotate?: number;
}

const TONE_GRADIENTS: Record<PolaroidTone, string> = {
  clay: 'linear-gradient(160deg, rgb(218, 144, 110) 0%, rgb(176, 97, 62) 60%, rgb(140, 78, 50) 100%)',
  forest: 'linear-gradient(160deg, rgb(60, 100, 80) 0%, rgb(38, 79, 74) 60%, rgb(28, 58, 54) 100%)',
  pine: 'linear-gradient(160deg, rgb(48, 90, 84) 0%, rgb(38, 79, 74) 60%, rgb(20, 50, 46) 100%)',
  ochre: 'linear-gradient(160deg, rgb(220, 178, 80) 0%, rgb(196, 154, 58) 60%, rgb(150, 110, 30) 100%)',
  burgundy: 'linear-gradient(160deg, rgb(190, 82, 100) 0%, rgb(169, 58, 79) 60%, rgb(120, 32, 50) 100%)',
  navy: 'linear-gradient(160deg, rgb(50, 70, 110) 0%, rgb(28, 48, 84) 60%, rgb(18, 32, 60) 100%)'
};

const FocusCurve = () => (
  <svg
    width="240"
    height="100"
    viewBox="0 0 240 100"
    fill="none"
    aria-hidden
    className="absolute bottom-0 left-0"
  >
    <path
      d="M0 78 Q20 72 30 70 T60 60 Q75 52 90 52 T120 42 Q140 38 160 35 T200 28 L240 24 L240 100 L0 100 Z"
      fill="rgba(250,246,236,0.12)"
    />
    <path
      d="M0 78 Q20 72 30 70 T60 60 Q75 52 90 52 T120 42 Q140 38 160 35 T200 28 L240 24"
      stroke="rgba(250,246,236,0.85)"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="240" cy="24" r="3" fill="rgb(250,246,236)" />
  </svg>
);

export const Polaroid = React.forwardRef<HTMLDivElement, PolaroidProps>(
  (
    {
      className,
      tone = 'clay',
      subject = 'Chemistry',
      clarity = 94,
      startTime = '09:30',
      endTime = '10:15',
      caption = 'Tuesday, the clean window.',
      date = '14 OCT 2026',
      sessionNumber = '142',
      rotate = -2,
      style,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn('relative inline-flex flex-col bg-paper-raised', className)}
      style={{
        padding: '12px 12px 0',
        width: 264,
        boxShadow: '0 8px 20px rgba(26,20,16,0.12), 0 1px 0 rgba(26,20,16,0.06)',
        transform: `rotate(${rotate}deg)`,
        ...style
      }}
      {...props}
    >
      <div
        className="relative overflow-hidden"
        style={{ width: 240, height: 240, background: TONE_GRADIENTS[tone] }}
      >
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-0.5">
          <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-paper/85">subject</span>
          <span className="font-display italic font-semibold text-[22px] text-paper leading-none tracking-tight">
            {subject}
          </span>
        </div>
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-0.5 items-end">
          <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-paper/85">clarity</span>
          <span className="flex items-baseline gap-px">
            <span className="font-mono text-[22px] font-bold text-paper leading-none tracking-tight">{clarity}</span>
            <span className="font-mono text-[11px] font-semibold text-paper/70">%</span>
          </span>
        </div>
        <FocusCurve />
        <div className="absolute bottom-3 left-3.5 flex items-center gap-2">
          <span className="font-mono text-[9px] font-semibold text-paper/70 tracking-wider">{startTime}</span>
          <span className="w-3.5 h-px bg-paper/40" />
          <span className="font-mono text-[9px] font-semibold text-paper/70 tracking-wider">{endTime}</span>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 px-1 pt-3.5 pb-4">
        <span
          className="text-ink leading-none"
          style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 500 }}
        >
          {caption}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[9px] text-ink-muted tracking-wider">{date}</span>
          <span className="text-[9px] font-bold uppercase tracking-eyebrow text-ink-faint">
            · session {sessionNumber}
          </span>
        </div>
      </div>
    </div>
  )
);
Polaroid.displayName = 'Polaroid';
