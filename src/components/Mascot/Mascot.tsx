import * as React from 'react';
import { cn } from '@/lib/cn';

const ANIMATIONS_CSS = `
  @keyframes tindra-mascot-blink {
    0%, 92%, 100% { transform: scaleY(1); }
    94% { transform: scaleY(0.08); }
    96% { transform: scaleY(1); }
  }
  @keyframes tindra-mascot-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .tindra-mascot-root { animation: tindra-mascot-fade 900ms ease-out both; }
  .tindra-mascot-eye {
    transform-origin: center;
    animation: tindra-mascot-blink 5s infinite;
  }
  .tindra-mascot-eye--lag { animation-delay: 60ms; }
`;

const SIZE_PRESETS = {
  sm: { eye: { w: 8, h: 18 }, gap: 5, halo: 100, font: 7, captionGap: 6 },
  md: { eye: { w: 14, h: 32 }, gap: 8, halo: 160, font: 8, captionGap: 8 },
  lg: { eye: { w: 22, h: 50 }, gap: 12, halo: 240, font: 10, captionGap: 12 }
} as const;

export type MascotSize = keyof typeof SIZE_PRESETS;
export type MascotTone = 'clay' | 'moss' | 'burgundy' | 'ink';

const TONE_GLOW: Record<MascotTone, string> = {
  clay: 'rgba(201, 125, 91, 0.18)',
  moss: 'rgba(45, 153, 116, 0.16)',
  burgundy: 'rgba(169, 58, 79, 0.18)',
  ink: 'rgba(26, 20, 16, 0.22)'
};

const TONE_CAPTION: Record<MascotTone, string> = {
  clay: 'text-clay',
  moss: 'text-moss',
  burgundy: 'text-burgundy',
  ink: 'text-ink-muted'
};

export interface MascotProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: MascotSize;
  tone?: MascotTone;
  caption?: string | null;
  blink?: boolean;
}

export const Mascot = React.forwardRef<HTMLDivElement, MascotProps>(
  (
    {
      size = 'md',
      tone = 'clay',
      caption = 'System Observer',
      blink = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const preset = SIZE_PRESETS[size];
    const haloColor = TONE_GLOW[tone];

    return (
      <div
        ref={ref}
        className={cn('tindra-mascot-root relative inline-flex flex-col items-center', className)}
        style={style}
        aria-label={caption ?? 'mascot'}
        role="img"
        {...props}
      >
        <style>{ANIMATIONS_CSS}</style>
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: preset.halo,
            height: preset.halo,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -55%)',
            background: `radial-gradient(circle at 50% 50%, ${haloColor} 0%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        />
        <div
          className="relative inline-flex items-center"
          style={{ gap: preset.gap }}
        >
          <span
            className={cn('tindra-mascot-eye bg-ink rounded-full shrink-0', !blink && 'animate-none')}
            style={{
              width: preset.eye.w,
              height: preset.eye.h,
              boxShadow: `0 0 15px ${haloColor}`
            }}
          />
          <span
            className={cn(
              'tindra-mascot-eye tindra-mascot-eye--lag bg-ink rounded-full shrink-0',
              !blink && 'animate-none'
            )}
            style={{
              width: preset.eye.w,
              height: preset.eye.h,
              boxShadow: `0 0 15px ${haloColor}`
            }}
          />
        </div>
        {caption !== null && caption !== '' && (
          <span
            className={cn(
              'absolute top-full whitespace-nowrap font-sans font-bold uppercase',
              TONE_CAPTION[tone]
            )}
            style={{
              fontSize: preset.font,
              letterSpacing: '0.18em',
              lineHeight: 1.25,
              marginTop: preset.captionGap
            }}
          >
            {caption}
          </span>
        )}
      </div>
    );
  }
);
Mascot.displayName = 'Mascot';
