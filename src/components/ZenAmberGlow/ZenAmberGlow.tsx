import * as React from 'react';
import { cn } from '@/lib/cn';

const ANIMATIONS_CSS = `
  @keyframes zen-rise {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes zen-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes zen-orbit-cw {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  @keyframes zen-orbit-ccw {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(-360deg); }
  }
  @keyframes zen-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes zen-spin-rev {
    to { transform: rotate(-360deg); }
  }
  @keyframes zen-blink {
    0%, 92%, 100% { transform: scaleY(1); }
    94% { transform: scaleY(0.08); }
    96% { transform: scaleY(1); }
  }
  @keyframes zen-saccade {
    0%, 25%, 100% { transform: translate(0, 0); }
    32%, 48% { transform: translate(-3px, -1px); }
    55%, 65% { transform: translate(0, 0); }
    72%, 88% { transform: translate(3px, 0); }
  }
  @keyframes zen-float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(0, -8px); }
  }
  @keyframes zen-breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.025); }
  }
  @keyframes zen-pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  @keyframes zen-number-pulse {
    0%, 100% { transform: translateY(0) scale(1); text-shadow: 0 0 0 rgba(255,107,0,0); }
    50% { transform: translateY(-2px) scale(1.012); text-shadow: 0 0 32px rgba(255,107,0,0.30); }
  }
  @keyframes zen-trail-fade {
    0% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
  }
  @keyframes zen-stat-rise {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes zen-toggle-glow {
    0%, 100% { box-shadow: 0 0 8px rgba(255,107,0,0.4); }
    50% { box-shadow: 0 0 18px rgba(255,107,0,0.7); }
  }
  @keyframes zen-cta-shimmer {
    0%, 100% { background-position: -200% 0; }
    50% { background-position: 200% 0; }
  }
  .zen-rise { animation: zen-rise 800ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .zen-fade { animation: zen-fade 1100ms ease-out both; }
  .zen-orbit-cw { animation: zen-orbit-cw 14s linear infinite; transform-origin: center; }
  .zen-orbit-ccw { animation: zen-orbit-ccw 22s linear infinite; transform-origin: center; }
  .zen-spin { animation: zen-spin 22s linear infinite; }
  .zen-spin-rev { animation: zen-spin-rev 30s linear infinite; }
  .zen-blink-1 { animation: zen-blink 5s infinite; transform-origin: center; }
  .zen-blink-2 { animation: zen-blink 5s infinite 0.06s; transform-origin: center; }
  .zen-saccade { animation: zen-saccade 7.5s ease-in-out infinite; }
  .zen-float { animation: zen-float 6s ease-in-out infinite; }
  .zen-breathe { animation: zen-breathe 4.5s ease-in-out infinite; transform-origin: center; }
  .zen-pulse { animation: zen-pulse 2s ease-in-out infinite; }
  .zen-number-pulse {
    animation: zen-number-pulse 4.5s ease-in-out infinite;
    transform-origin: bottom left;
    will-change: transform, text-shadow;
  }
  .zen-stat { animation: zen-stat-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .zen-toggle-glow { animation: zen-toggle-glow 2s ease-in-out infinite; }
  .zen-cta-shimmer {
    background-image:
      linear-gradient(110deg, rgba(255,107,0,0.05) 0%, rgba(255,107,0,0.18) 50%, rgba(255,107,0,0.05) 100%);
    background-size: 200% 100%;
    animation: zen-cta-shimmer 6s ease-in-out infinite;
  }
  .zen-cta {
    transition: border-color 220ms ease, transform 220ms ease;
  }
  .zen-cta:hover {
    border-color: rgba(255,107,0,0.85);
    transform: translateY(-1px);
  }
  .zen-toggle-knob {
    transition: all 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

export interface ZenAmberGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  intent?: string;
  trackName?: string;
  recoveryPct?: number;
  dailyLoad?: string;
  ctaLabel?: string;
  flowActive?: boolean;
}

const Eyebrow: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, children, ...rest }) => (
  <span
    className={cn('font-mono uppercase text-ink/40', className)}
    style={{ fontSize: 10, letterSpacing: '0.04em', lineHeight: 1.2 }}
    {...rest}
  >
    {children}
  </span>
);

const CenterMascot: React.FC = () => (
  <div
    className="absolute left-1/2 top-1/2 grid place-items-center"
    style={{ width: 800, height: 800, transform: 'translate(-50%, -50%)' }}
  >
    <span
      aria-hidden
      className="absolute rounded-full border border-ink/8"
      style={{ inset: 20 }}
    />
    <span
      aria-hidden
      className="zen-spin absolute rounded-full"
      style={{
        inset: 20,
        opacity: 0.3,
        filter: 'blur(40px)',
        background:
          'conic-gradient(from 0deg at 50% 50%, #FF6B00 0%, #FF6B00 50%, transparent 100%)'
      }}
    />
    <span
      aria-hidden
      className="zen-spin-rev absolute rounded-full"
      style={{
        inset: 20,
        opacity: 0.18,
        filter: 'blur(10px)',
        background:
          'conic-gradient(from 0deg at 50% 50%, #FF6B00 0%, #FF6B00 50%, transparent 100%)'
      }}
    />

    <div
      aria-hidden
      className="zen-orbit-cw absolute"
      style={{
        left: '50%',
        top: '50%',
        width: 760,
        height: 760
      }}
    >
      <span
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: 0,
          width: 16,
          height: 16,
          backgroundColor: '#FF6B00',
          boxShadow: '0 0 20px #FF6B00, 0 0 40px rgba(255,107,0,0.5)',
          transform: 'translate(-50%, -50%)'
        }}
      />
      <span
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: 0,
          width: 10,
          height: 10,
          backgroundColor: '#FF6B00',
          opacity: 0.55,
          filter: 'blur(2px)',
          transform: 'translate(-150%, -50%)',
          animation: 'zen-trail-fade 1.4s ease-out infinite'
        }}
      />
      <span
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: 0,
          width: 7,
          height: 7,
          backgroundColor: '#FF6B00',
          opacity: 0.35,
          filter: 'blur(3px)',
          transform: 'translate(-260%, -50%)',
          animation: 'zen-trail-fade 1.4s ease-out infinite 0.2s'
        }}
      />
    </div>

    <div
      aria-hidden
      className="zen-orbit-ccw absolute"
      style={{
        left: '50%',
        top: '50%',
        width: 600,
        height: 600
      }}
    >
      <span
        className="absolute rounded-full bg-moss"
        style={{
          left: '50%',
          top: 0,
          width: 8,
          height: 8,
          opacity: 0.55,
          boxShadow: '0 0 12px rgba(45,153,116,0.5)',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>

    <div className="zen-float relative" style={{ width: 240, height: 240 }}>
      <div
        className="zen-breathe relative w-full h-full grid place-items-center rounded-full"
        style={{
          backgroundColor: '#2A2420',
          boxShadow: '0 40px 80px rgba(0,0,0,0.18)'
        }}
      >
        <span
          aria-hidden
          className="absolute rounded-full"
          style={{
            inset: -10,
            filter: 'blur(10px)',
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,107,0,0.10) 0%, rgba(255,107,0,0) 70%)'
          }}
        />
        <div className="zen-saccade relative flex" style={{ gap: 20 }}>
          <span
            className="zen-blink-1 rounded-[20px] bg-paper-raised"
            style={{ width: 40, height: 64 }}
          />
          <span
            className="zen-blink-2 rounded-[20px] bg-paper-raised"
            style={{ width: 40, height: 64 }}
          />
        </div>
      </div>
    </div>
  </div>
);

const HeroDuration: React.FC<{ duration: number; intent: string }> = ({ duration, intent }) => (
  <div className="zen-rise relative shrink-0 flex flex-col" style={{ width: 400, gap: 40 }}>
    <div className="flex items-baseline gap-3">
      <span
        className="zen-number-pulse font-display"
        style={{
          fontSize: 160,
          lineHeight: 0.8,
          letterSpacing: '-0.04em',
          color: '#FF6B00',
          fontVariantNumeric: 'tabular-nums',
          display: 'inline-block'
        }}
      >
        {duration}
      </span>
      <span
        className="font-mono font-bold uppercase text-ink"
        style={{ fontSize: 14, letterSpacing: '0.2em' }}
      >
        Mins
      </span>
    </div>
    <div className="flex flex-col gap-3">
      <Eyebrow>Current Intent</Eyebrow>
      <p
        className="font-display italic text-ink m-0"
        style={{ fontSize: 48, lineHeight: 1.1 }}
      >
        “{intent}”
      </p>
    </div>
  </div>
);

const Footer: React.FC<{ flowActive: boolean; trackName: string }> = ({
  flowActive,
  trackName
}) => (
  <div
    className="zen-rise absolute flex flex-col gap-6"
    style={{ left: 60, bottom: 60, animationDelay: '180ms' }}
  >
    <div className="flex items-center gap-4">
      <span
        className="relative rounded-xl border border-ink/10 shrink-0"
        style={{
          width: 48,
          height: 24,
          backgroundColor: flowActive ? 'rgba(255,107,0,0.06)' : 'rgba(42,36,32,0.05)'
        }}
      >
        <span
          className={cn('zen-toggle-knob absolute rounded-full', flowActive && 'zen-toggle-glow')}
          style={{
            top: 4,
            [flowActive ? 'right' : 'left']: 4,
            width: 14,
            height: 14,
            backgroundColor: flowActive ? '#FF6B00' : 'rgba(42,36,32,0.45)'
          }}
        />
      </span>
      <span
        className="zen-pulse font-mono font-bold uppercase"
        style={{ fontSize: 10, letterSpacing: '0.18em', color: '#FF6B00' }}
      >
        Flowmodoro Active
      </span>
    </div>
    <div className="flex items-center gap-4">
      <span
        className="grid place-items-center rounded-2xl border border-ink/20 shrink-0"
        style={{ width: 32, height: 32 }}
      >
        <span className="rounded-[3px] bg-ink" style={{ width: 6, height: 6 }} />
      </span>
      <span className="font-sans font-semibold text-ink" style={{ fontSize: 16, lineHeight: 1.25 }}>
        {trackName}
      </span>
    </div>
  </div>
);

const useCountUp = (target: number, durationMs: number, delayMs = 0) => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }
    let raf = 0;
    const startAt = performance.now() + delayMs;
    const tick = () => {
      const now = performance.now();
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startAt;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, delayMs]);
  return value;
};

const RightRail: React.FC<{
  recoveryPct: number;
  dailyLoad: string;
  ctaLabel: string;
}> = ({ recoveryPct, dailyLoad, ctaLabel }) => {
  const animatedPct = useCountUp(recoveryPct, 1600, 280);
  return (
    <div
      className="absolute flex flex-col justify-between items-end"
      style={{ right: 60, top: 60, bottom: 60 }}
    >
      <div className="flex flex-col gap-6 items-end">
        <div className="zen-stat text-right" style={{ animationDelay: '120ms' }}>
          <Eyebrow>Recovery State</Eyebrow>
          <div
            className="font-display"
            style={{
              fontSize: 40,
              lineHeight: 1.2,
              color: '#56B37B',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {animatedPct}% Clear
          </div>
        </div>
        <div className="zen-stat text-right" style={{ animationDelay: '240ms' }}>
          <Eyebrow>Daily Load</Eyebrow>
          <div className="font-display text-ink" style={{ fontSize: 40, lineHeight: 1.2 }}>
            {dailyLoad}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="zen-cta zen-cta-shimmer flex items-center rounded-[40px] gap-3 border"
        style={{
          padding: '20px 48px',
          backgroundColor: 'rgba(255,107,0,0.05)',
          borderColor: 'rgba(255,107,0,0.30)'
        }}
      >
        <span
          className="font-sans font-bold uppercase"
          style={{ fontSize: 16, letterSpacing: '0.2em', color: '#FF6B00' }}
        >
          {ctaLabel}
        </span>
        <span className="font-sans" style={{ fontSize: 16, color: '#FF6B00' }}>
          →
        </span>
      </button>
    </div>
  );
};

export const ZenAmberGlow = React.forwardRef<HTMLDivElement, ZenAmberGlowProps>(
  (
    {
      duration = 45,
      intent = 'Draft final strategy & review notes.',
      trackName = 'Midnight Drift',
      recoveryPct = 82,
      dailyLoad = '2.4h',
      ctaLabel = 'Commence Focus',
      flowActive = true,
      className,
      style,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={{ width: 1440, height: 900, backgroundColor: '#F4F2EE', ...style }}
      {...props}
    >
      <style>{ANIMATIONS_CSS}</style>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          background:
            'radial-gradient(circle at 50% 50%, rgba(42,36,32,1) 0%, rgba(42,36,32,0) 100%)'
        }}
      />
      <CenterMascot />
      <div className="absolute flex" style={{ left: 60, top: 60 }}>
        <HeroDuration duration={duration} intent={intent} />
      </div>
      <Footer flowActive={flowActive} trackName={trackName} />
      <RightRail recoveryPct={recoveryPct} dailyLoad={dailyLoad} ctaLabel={ctaLabel} />
    </div>
  )
);
ZenAmberGlow.displayName = 'ZenAmberGlow';
