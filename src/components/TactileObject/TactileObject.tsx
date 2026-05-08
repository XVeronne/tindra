import * as React from 'react';
import { Mascot } from '../Mascot/Mascot';
import { cn } from '@/lib/cn';

const ANIMATIONS_CSS = `
  @keyframes tactile-rise {
    from { opacity: 0; transform: translateY(16px) scale(0.985); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes tactile-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes tactile-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(45, 153, 116, 0.6), 0 0 8px rgba(45, 153, 116, 0.6); }
    50% { box-shadow: 0 0 0 4px rgba(45, 153, 116, 0), 0 0 8px rgba(45, 153, 116, 0.3); }
  }
  .tactile-rise { animation: tactile-rise 900ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .tactile-fade { animation: tactile-fade 1100ms ease-out both; }
  .tactile-pulse { animation: tactile-pulse 2.4s ease-in-out infinite; }
  .tactile-dial {
    transition: transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  .tactile-dial--dragging { transition: none; }
  .tactile-dial:focus-visible {
    outline: 2px solid rgb(var(--clay));
    outline-offset: 4px;
  }
  .tactile-cta {
    transition: transform 180ms ease, box-shadow 180ms ease;
  }
  .tactile-cta:hover {
    transform: translateY(-1px);
    box-shadow:
      inset 0 1px 1px rgba(255,255,255,0.22),
      0 8px 18px rgba(26,20,16,0.32),
      0 24px 48px rgba(26,20,16,0.22);
  }
  .tactile-cta:active { transform: translateY(0); }
`;

const BLUEPRINT_SVG =
  "url(\"data:image/svg+xml,%3Csvg width='14' height='16' viewBox='0 0 14 16' fill='%231A1410' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='16' /%3E%3Crect width='10' height='1' /%3E%3Crect y='15' width='14' height='1' /%3E%3Crect x='13' y='4' width='1' height='12' /%3E%3Crect x='8' width='1' height='6' /%3E%3Crect x='4' y='4' width='1' height='2' /%3E%3Crect x='4' y='11' width='1' height='1' /%3E%3Crect x='9' y='11' width='1' height='1' /%3E%3Crect x='8' y='5' width='6' height='1' /%3E%3Crect x='10' y='1' width='1' height='1' /%3E%3Crect x='11' y='2' width='1' height='1' /%3E%3Crect x='12' y='3' width='1' height='1' /%3E%3Crect x='5' y='10' width='4' height='1' /%3E%3C/svg%3E\")";

const DURATIONS = [25, 45, 60, 'INF'] as const;
const DURATION_ANGLES = [-45, 0, 45, 90];

export interface TactileObjectProps extends React.HTMLAttributes<HTMLDivElement> {
  objective?: string;
  modelLabel?: string;
  defaultDurationIndex?: number;
  defaultStatusIndex?: number;
  ctaLabel?: string;
}

export const TactileObject = React.forwardRef<HTMLDivElement, TactileObjectProps>(
  (
    {
      objective = 'Draft strategy.',
      modelLabel = 'Tindra Mk I',
      defaultDurationIndex = 0,
      defaultStatusIndex = 0,
      ctaLabel = 'Engage Focus',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [durationIndex, setDurationIndex] = React.useState(defaultDurationIndex);
    const [statusIndex, setStatusIndex] = React.useState(defaultStatusIndex);
    const [dialAngle, setDialAngle] = React.useState(DURATION_ANGLES[defaultDurationIndex]);
    const [isDragging, setIsDragging] = React.useState(false);
    const dialRef = React.useRef<HTMLButtonElement>(null);
    const dragStateRef = React.useRef<{
      startAngle: number;
      startPointer: number;
      moved: boolean;
    } | null>(null);

    const pointerAngleDeg = (clientX: number, clientY: number) => {
      const rect = dialRef.current?.getBoundingClientRect();
      if (!rect) return 0;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
    };

    const snapToPreset = (angle: number) => {
      let bestIndex = 0;
      let bestDist = Infinity;
      DURATION_ANGLES.forEach((target, i) => {
        const offset = Math.round((angle - target) / 360) * 360;
        const dist = Math.abs(angle - (target + offset));
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      const target = DURATION_ANGLES[bestIndex];
      const offset = Math.round((angle - target) / 360) * 360;
      return { index: bestIndex, normalized: target + offset };
    };

    const cycleDuration = () => {
      const next = (durationIndex + 1) % DURATIONS.length;
      const target = DURATION_ANGLES[next];
      const offset = Math.round((dialAngle - target) / 360) * 360;
      setDialAngle(target + offset);
      setDurationIndex(next);
    };

    const handleDialPointerDown: React.PointerEventHandler<HTMLButtonElement> = (e) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      dragStateRef.current = {
        startAngle: dialAngle,
        startPointer: pointerAngleDeg(e.clientX, e.clientY),
        moved: false
      };
      setIsDragging(true);
    };

    const handleDialPointerMove: React.PointerEventHandler<HTMLButtonElement> = (e) => {
      const drag = dragStateRef.current;
      if (!drag) return;
      const delta = pointerAngleDeg(e.clientX, e.clientY) - drag.startPointer;
      if (Math.abs(delta) > 2) drag.moved = true;
      setDialAngle(drag.startAngle + delta);
    };

    const handleDialPointerUp: React.PointerEventHandler<HTMLButtonElement> = (e) => {
      const drag = dragStateRef.current;
      if (!drag) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      if (drag.moved) {
        const { index, normalized } = snapToPreset(dialAngle);
        setDialAngle(normalized);
        setDurationIndex(index);
      } else {
        cycleDuration();
      }
      dragStateRef.current = null;
      setIsDragging(false);
    };

    const handleDialKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cycleDuration();
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        cycleDuration();
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = (durationIndex - 1 + DURATIONS.length) % DURATIONS.length;
        const target = DURATION_ANGLES[next];
        const offset = Math.round((dialAngle - target) / 360) * 360;
        setDialAngle(target + offset);
        setDurationIndex(next);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden bg-paper-sunken', className)}
        style={{ width: 1440, height: 900, ...style }}
        {...props}
      >
        <style>{ANIMATIONS_CSS}</style>

        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: BLUEPRINT_SVG,
            backgroundSize: '28px 32px',
            backgroundPosition: '50% 50%'
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 120%, rgba(26,20,16,0.08) 0%, rgba(26,20,16,0) 60%)'
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              'tactile-rise relative flex flex-col rounded-sm bg-paper-raised',
              'p-12 w-[800px] h-[500px]'
            )}
            style={{
              boxShadow: [
                'inset 0 2px 2px rgba(255,255,255,0.9)',
                'inset 0 -2px 3px rgba(26,20,16,0.10)',
                '0 30px 60px rgba(26,20,16,0.14)',
                '0 10px 20px rgba(26,20,16,0.06)'
              ].join(', ')
            }}
          >
            <div
              className="absolute top-12 right-12 inline-flex items-center gap-1.5 rounded-[3px] py-1.5 px-3"
              style={{
                background:
                  'linear-gradient(135deg, rgba(26,20,16,0.55) 0%, rgba(26,20,16,0.42) 100%)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.20)'
              }}
            >
              <span
                aria-hidden
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.32)' }}
              />
              <span
                className="font-sans uppercase text-paper"
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: '0.22em',
                  lineHeight: 1.2
                }}
              >
                {modelLabel}
              </span>
            </div>

            <div className="flex flex-col gap-10 size-full">
              <div className="flex flex-col gap-3 grow">
                <span
                  className="font-sans uppercase text-ink-muted"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    lineHeight: 1.2
                  }}
                >
                  Current Focus Objective
                </span>
                <span
                  className="font-display italic text-ink"
                  style={{
                    fontSize: 64,
                    lineHeight: 1,
                    letterSpacing: '-0.01em'
                  }}
                >
                  {objective}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-4">
                  <span
                    className="font-sans uppercase text-ink-muted"
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.22em',
                      lineHeight: 1.2
                    }}
                  >
                    Set Duration (m)
                  </span>
                  <button
                    ref={dialRef}
                    type="button"
                    role="slider"
                    aria-label="Set duration"
                    aria-valuemin={0}
                    aria-valuemax={DURATIONS.length - 1}
                    aria-valuenow={durationIndex}
                    aria-valuetext={`${DURATIONS[durationIndex]} minutes`}
                    onPointerDown={handleDialPointerDown}
                    onPointerMove={handleDialPointerMove}
                    onPointerUp={handleDialPointerUp}
                    onPointerCancel={handleDialPointerUp}
                    onKeyDown={handleDialKeyDown}
                    className={cn(
                      'tactile-dial relative flex items-center justify-center rounded-full bg-paper-sunken touch-none',
                      isDragging ? 'tactile-dial--dragging cursor-grabbing' : 'cursor-grab'
                    )}
                    style={{
                      width: 140,
                      height: 140,
                      transform: `rotate(${dialAngle}deg)`,
                      boxShadow: [
                        'inset 0 2px 2px rgba(255,255,255,0.9)',
                        '0 4px 8px rgba(26,20,16,0.10)',
                        '0 20px 40px rgba(26,20,16,0.14)'
                      ].join(', ')
                    }}
                  >
                    <span
                      className="rounded-full border border-hairline"
                      style={{
                        width: 120,
                        height: 120,
                        background:
                          'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 60%)'
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute rounded-[1px] bg-clay"
                      style={{ top: 12, width: 2, height: 12 }}
                    />
                  </button>
                  <div className="flex justify-between" style={{ width: 140 }}>
                    {DURATIONS.map((d, i) => (
                      <span
                        key={d}
                        className={cn(
                          'font-sans font-bold',
                          i === durationIndex ? 'text-ink' : 'text-ink-faint'
                        )}
                        style={{
                          fontSize: 11,
                          letterSpacing: '0.04em',
                          lineHeight: 1.2,
                          fontVariantNumeric: 'tabular-nums'
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-6">
                  <div className="flex gap-2" role="group" aria-label="Status">
                    {[0, 1, 2].map((i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Status ${i + 1}`}
                        aria-pressed={i === statusIndex}
                        onClick={() => setStatusIndex(i)}
                        className={cn(
                          'w-2 h-2 rounded-full shrink-0',
                          i === statusIndex ? 'bg-moss tactile-pulse' : 'bg-ink/10'
                        )}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="tactile-cta rounded-sm bg-ink"
                    style={{
                      padding: '24px 64px',
                      boxShadow: [
                        'inset 0 1px 1px rgba(255,255,255,0.18)',
                        '0 4px 12px rgba(26,20,16,0.30)',
                        '0 20px 40px rgba(26,20,16,0.20)'
                      ].join(', ')
                    }}
                  >
                    <span
                      className="font-sans uppercase text-paper"
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        letterSpacing: '0.2em',
                        lineHeight: 1.2
                      }}
                    >
                      {ctaLabel}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tactile-fade absolute bottom-12 left-12" style={{ animationDelay: '600ms' }}>
          <Mascot size="md" tone="clay" caption="System Observer" />
        </div>

        <div
          className="tactile-fade absolute bottom-12 right-12 flex items-baseline gap-3"
          style={{ animationDelay: '700ms' }}
        >
          <span
            className="font-sans uppercase text-ink-faint"
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.22em',
              lineHeight: 1.2
            }}
          >
            Direction 03 — The Tactile Object
          </span>
          <span
            className="font-display italic text-ink-muted"
            style={{ fontSize: 12, lineHeight: 1.2 }}
          >
            Pre-session ritual.
          </span>
        </div>
      </div>
    );
  }
);
TactileObject.displayName = 'TactileObject';
