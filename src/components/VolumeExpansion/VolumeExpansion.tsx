import * as React from 'react';
import { cn } from '@/lib/cn';

const ANIMATIONS_CSS = `
  @keyframes vol-rise {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes vol-blob-in {
    from { opacity: 0; transform: translate(60px, -60px) scale(0.92); }
    to { opacity: 1; transform: translate(0, 0) scale(1); }
  }
  @keyframes vol-blob-morph {
    0%, 100% {
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      transform: translate(0px, 0px);
    }
    25% {
      border-radius: 50% 55% 60% 40% / 35% 60% 50% 55%;
      transform: translate(-12px, 8px);
    }
    50% {
      border-radius: 45% 65% 75% 25% / 50% 45% 65% 45%;
      transform: translate(6px, -10px);
    }
    75% {
      border-radius: 55% 50% 65% 35% / 40% 55% 55% 50%;
      transform: translate(-6px, -4px);
    }
  }
  @keyframes vol-text-breathe {
    0%, 100% { transform: translateX(0); letter-spacing: -0.05em; }
    50% { transform: translateX(-4px); letter-spacing: -0.052em; }
  }
  @keyframes vol-word-in {
    from { opacity: 0; transform: translateY(12px) scaleY(0.96); }
    to { opacity: 1; transform: translateY(0) scaleY(1); }
  }
  @keyframes vol-eq {
    0%, 100% { transform: scaleX(1); }
    50% { transform: scaleX(0.55); }
  }
  @keyframes vol-eq-orange {
    0%, 100% { transform: scaleX(1); }
    50% { transform: scaleX(1.5); }
  }
  @keyframes vol-pulse {
    0%, 100% { transform: scale(1); box-shadow: 0 10px 30px rgba(255,69,0,0.4); }
    50% { transform: scale(1.06); box-shadow: 0 14px 44px rgba(255,69,0,0.6); }
  }
  @keyframes vol-ripple {
    0% { transform: scale(1); opacity: 0.55; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes vol-streaming-blink {
    0%, 70%, 100% { opacity: 1; }
    80% { opacity: 0.4; }
  }
  @keyframes vol-hint-marquee {
    0%, 100% { opacity: 0.55; transform: translateX(0); }
    50% { opacity: 1; transform: translateX(2px); }
  }
  @keyframes vol-line-grow {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes vol-shadow-shift {
    0%, 100% { box-shadow: 0 40px 100px rgba(255,69,0,0.30); }
    50% { box-shadow: 0 60px 130px rgba(255,69,0,0.40); }
  }
  @keyframes vol-readout-rise {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .vol-rise { animation: vol-rise 800ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .vol-blob-in { animation: vol-blob-in 1200ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .vol-blob-wrap {
    transition:
      width 700ms cubic-bezier(0.22, 1, 0.36, 1),
      height 700ms cubic-bezier(0.22, 1, 0.36, 1),
      top 700ms cubic-bezier(0.22, 1, 0.36, 1),
      right 700ms cubic-bezier(0.22, 1, 0.36, 1);
    will-change: width, height;
  }
  .vol-blob-morph {
    animation:
      vol-blob-morph 22s ease-in-out infinite,
      vol-shadow-shift 11s ease-in-out infinite;
    transform-origin: center;
    will-change: border-radius, transform, box-shadow;
  }
  .vol-text-breathe {
    animation: vol-text-breathe 9s ease-in-out infinite;
    transform-origin: left center;
    will-change: transform, letter-spacing;
    display: inline-block;
  }
  .vol-word-in {
    animation: vol-word-in 600ms cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: left center;
  }
  .vol-eq { animation: vol-eq 1.4s ease-in-out infinite; transform-origin: left; }
  .vol-eq-orange { animation: vol-eq-orange 1.1s ease-in-out infinite; transform-origin: left; }
  .vol-pulse { animation: vol-pulse 2.4s ease-in-out infinite; }
  .vol-streaming-blink { animation: vol-streaming-blink 1.8s ease-in-out infinite; }
  .vol-hint { animation: vol-hint-marquee 3.6s ease-in-out infinite; }
  .vol-line-grow {
    animation: vol-line-grow 1.4s cubic-bezier(0.22, 1, 0.36, 1) both 700ms;
    transform-origin: left center;
  }
  .vol-ripple {
    animation: vol-ripple 2.4s ease-out infinite;
    will-change: transform, opacity;
  }
  .vol-ripple-2 { animation-delay: 800ms; }
  .vol-readout {
    animation: vol-readout-rise 280ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .vol-cta {
    transition: transform 220ms ease;
  }
  .vol-cta:hover { transform: translateY(-2px) scale(1.06); }
  .vol-cta--dragging { cursor: grabbing; transform: scale(1.08); }
`;

export interface VolumePreset {
  mins: number;
  word: string;
  sizeRatio: number;
}

const DEFAULT_PRESETS: VolumePreset[] = [
  { mins: 25, word: 'twenty-five', sizeRatio: 0.82 },
  { mins: 45, word: 'forty-five', sizeRatio: 0.92 },
  { mins: 60, word: 'sixty', sizeRatio: 1.0 },
  { mins: 90, word: 'ninety', sizeRatio: 1.1 },
  { mins: 120, word: 'two hours', sizeRatio: 1.2 }
];

export interface VolumeExpansionProps extends React.HTMLAttributes<HTMLDivElement> {
  presets?: VolumePreset[];
  defaultPresetIndex?: number;
  presetIndex?: number;
  onPresetChange?: (preset: VolumePreset, index: number) => void;
  headline?: string;
  hint?: string;
  trackName?: string;
  streamingLabel?: string;
  interactive?: boolean;
  durationWord?: string;
}

const BASE_BLOB_SIZE = 1140;
const BASE_FONT_SIZE = 240;
const DRAG_STEP = 60;

export const VolumeExpansion = React.forwardRef<HTMLDivElement, VolumeExpansionProps>(
  (
    {
      presets = DEFAULT_PRESETS,
      defaultPresetIndex = 1,
      presetIndex: controlledIndex,
      onPresetChange,
      headline = 'Fill the space to claim the time.',
      hint = 'Drag outward to expand focus volume',
      trackName = 'Rain on a Tin Roof',
      streamingLabel = 'Now Streaming',
      interactive = true,
      durationWord,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [internalIndex, setInternalIndex] = React.useState(
      Math.max(0, Math.min(presets.length - 1, defaultPresetIndex))
    );
    const isControlled = controlledIndex !== undefined;
    const activeIndex = isControlled ? controlledIndex! : internalIndex;
    const preset = presets[activeIndex] ?? presets[0];
    const displayWord = durationWord ?? preset.word;

    const dragStateRef = React.useRef<{
      startX: number;
      startY: number;
      startIndex: number;
      moved: boolean;
    } | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const setIndex = React.useCallback(
      (next: number) => {
        const clamped = Math.max(0, Math.min(presets.length - 1, next));
        if (clamped === activeIndex) return;
        if (!isControlled) setInternalIndex(clamped);
        onPresetChange?.(presets[clamped], clamped);
      },
      [activeIndex, isControlled, onPresetChange, presets]
    );

    const blobSize = BASE_BLOB_SIZE * preset.sizeRatio;
    const blobOffset = (blobSize - BASE_BLOB_SIZE) / 2;
    const fontSize = BASE_FONT_SIZE * Math.sqrt(preset.sizeRatio);

    const onPlayPointerDown: React.PointerEventHandler<HTMLButtonElement> = (e) => {
      if (!interactive) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragStateRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startIndex: activeIndex,
        moved: false
      };
      setIsDragging(true);
    };

    const onPlayPointerMove: React.PointerEventHandler<HTMLButtonElement> = (e) => {
      const drag = dragStateRef.current;
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      const dist = Math.hypot(dx, dy);
      if (dist > 6) drag.moved = true;
      const radial = dx - dy;
      const offset = Math.round(radial / DRAG_STEP);
      const next = Math.max(0, Math.min(presets.length - 1, drag.startIndex + offset));
      setIndex(next);
    };

    const onPlayPointerUp: React.PointerEventHandler<HTMLButtonElement> = (e) => {
      const drag = dragStateRef.current;
      if (!drag) {
        setIsDragging(false);
        return;
      }
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      if (!drag.moved) {
        const next = (drag.startIndex + 1) % presets.length;
        setIndex(next);
      }
      dragStateRef.current = null;
      setIsDragging(false);
    };

    const onPlayKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
      if (!interactive) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIndex((activeIndex + 1) % presets.length);
        return;
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex(activeIndex + 1);
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex(activeIndex - 1);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        style={{ width: 1440, height: 900, backgroundColor: '#F0EBE2', ...style }}
        {...props}
      >
        <style>{ANIMATIONS_CSS}</style>

        <div
          aria-hidden
          className="vol-blob-in vol-blob-wrap absolute"
          style={{
            top: -120 - blobOffset,
            right: -180 - blobOffset,
            width: blobSize,
            height: blobSize
          }}
        >
          <div
            className="vol-blob-morph relative w-full h-full flex flex-col justify-center overflow-hidden"
            style={{
              paddingLeft: 80,
              paddingRight: 60,
              backgroundColor: '#FF4500',
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
            }}
          >
            <div key={displayWord} className="vol-word-in">
              <span
                className="vol-text-breathe font-display italic select-none"
                style={{
                  fontSize,
                  lineHeight: 0.85,
                  letterSpacing: '-0.05em',
                  color: '#F0EBE2',
                  marginTop: -16,
                  whiteSpace: 'nowrap'
                }}
              >
                {displayWord}
              </span>
            </div>
          </div>
        </div>

        <div className="vol-rise absolute flex flex-col" style={{ left: 80, bottom: 80, width: 420, gap: 80 }}>
          <div className="flex flex-col gap-4">
            <h1
              className="font-sans font-light text-ink m-0"
              style={{ fontSize: 64, lineHeight: 0.9, letterSpacing: '-0.04em' }}
            >
              {headline}
            </h1>
            <div className="flex items-center mt-4 gap-4">
              <div className="relative shrink-0" style={{ width: 60, height: 60 }}>
                <span
                  aria-hidden
                  className="vol-ripple absolute inset-0 rounded-full"
                  style={{ border: '2px solid #FF4500', pointerEvents: 'none' }}
                />
                <span
                  aria-hidden
                  className="vol-ripple vol-ripple-2 absolute inset-0 rounded-full"
                  style={{ border: '2px solid #FF4500', pointerEvents: 'none' }}
                />
                <button
                  type="button"
                  aria-label="Drag outward to set duration; tap to cycle"
                  aria-valuemin={0}
                  aria-valuemax={presets.length - 1}
                  aria-valuenow={activeIndex}
                  aria-valuetext={`${preset.mins} minutes`}
                  role="slider"
                  onPointerDown={onPlayPointerDown}
                  onPointerMove={onPlayPointerMove}
                  onPointerUp={onPlayPointerUp}
                  onPointerCancel={onPlayPointerUp}
                  onKeyDown={onPlayKeyDown}
                  className={cn(
                    'vol-pulse vol-cta relative grid place-items-center rounded-full touch-none select-none',
                    isDragging && 'vol-cta--dragging',
                    interactive ? 'cursor-grab' : 'cursor-pointer'
                  )}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#FF4500'
                  }}
                >
                  <span
                    className="rounded-full"
                    style={{ width: 20, height: 20, backgroundColor: '#F0EBE2' }}
                  />
                </button>
                {isDragging && (
                  <div
                    className="vol-readout absolute pointer-events-none"
                    style={{ left: '50%', bottom: '100%', transform: 'translate(-50%, -10px)' }}
                  >
                    <span
                      className="font-mono font-bold uppercase whitespace-nowrap"
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.18em',
                        color: '#FF4500',
                        backgroundColor: '#F0EBE2',
                        padding: '6px 10px',
                        borderRadius: 999,
                        boxShadow: '0 6px 20px rgba(255,69,0,0.18)',
                        border: '1px solid rgba(255,69,0,0.35)'
                      }}
                    >
                      {preset.mins} min
                    </span>
                  </div>
                )}
              </div>
              <div
                className="vol-line-grow grow"
                style={{ height: 2, opacity: 0.3, backgroundColor: 'rgb(var(--ink) / 0.3)' }}
              />
            </div>
            <span
              className="vol-hint font-mono font-bold uppercase text-ink/40"
              style={{ fontSize: 10, letterSpacing: '0.2em', lineHeight: 1.2 }}
            >
              {hint}
            </span>
          </div>

          <div
            className="vol-rise flex flex-col gap-2 p-6"
            style={{
              backgroundColor: '#F0EBE2',
              borderLeft: '4px solid #FF4500',
              boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
              animationDelay: '180ms'
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="vol-streaming-blink rounded-full"
                style={{ width: 6, height: 6, backgroundColor: '#FF4500' }}
              />
              <span
                className="font-mono font-bold uppercase"
                style={{ fontSize: 12, letterSpacing: '0.2em', color: '#FF4500' }}
              >
                {streamingLabel}
              </span>
            </div>
            <span className="font-display italic text-ink" style={{ fontSize: 28, lineHeight: 1 }}>
              {trackName}
            </span>
            <div className="flex mt-2 gap-0.5 items-center">
              <span className="vol-eq" style={{ width: 16, height: 4, backgroundColor: 'rgb(var(--ink))', animationDelay: '0ms' }} />
              <span className="vol-eq" style={{ width: 8, height: 4, backgroundColor: 'rgb(var(--ink))', animationDelay: '120ms' }} />
              <span className="vol-eq-orange" style={{ width: 24, height: 4, backgroundColor: '#FF4500', animationDelay: '60ms' }} />
              <span className="vol-eq" style={{ width: 12, height: 4, backgroundColor: 'rgb(var(--ink))', animationDelay: '200ms' }} />
              <span className="vol-eq" style={{ width: 6, height: 4, backgroundColor: 'rgb(var(--ink))', animationDelay: '320ms' }} />
              <span className="vol-eq-orange" style={{ width: 14, height: 4, backgroundColor: '#FF4500', animationDelay: '420ms' }} />
              <span className="vol-eq" style={{ width: 10, height: 4, backgroundColor: 'rgb(var(--ink))', animationDelay: '500ms' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
VolumeExpansion.displayName = 'VolumeExpansion';
