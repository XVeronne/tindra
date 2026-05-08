import * as React from 'react';
import { SlimeOrb } from '../SlimeOrb/SlimeOrb';
import { cn } from '@/lib/cn';

const ANIMATIONS_CSS = `
  @keyframes presession-rise {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes presession-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes presession-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.06); opacity: 0.85; }
  }
  @keyframes presession-orb-breathe {
    0%, 100% { transform: scale(1); opacity: 0.95; }
    50% { transform: scale(1.04); opacity: 1; }
  }
  @keyframes presession-eq {
    0%, 100% { transform: scaleY(0.45); }
    50% { transform: scaleY(1); }
  }
  @keyframes presession-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes presession-live-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(45,153,116,0.55), 0 0 8px rgba(45,153,116,0.5); }
    50% { box-shadow: 0 0 0 6px rgba(45,153,116,0), 0 0 16px rgba(45,153,116,0.35); }
  }
  @keyframes presession-progress {
    from { transform: scaleX(0.18); }
    to { transform: scaleX(0.62); }
  }
  @keyframes presession-stylus-bob {
    0%, 100% { transform: rotate(-32deg) translateY(0); }
    50% { transform: rotate(-31deg) translateY(0.5px); }
  }
  .presession-rise { animation: presession-rise 800ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .presession-fade { animation: presession-fade 1100ms ease-out both; }
  .presession-pulse { animation: presession-pulse 2.4s ease-in-out infinite; }
  .presession-orb { animation: presession-orb-breathe 6s ease-in-out infinite; transform-origin: center; }
  .presession-eq { animation: presession-eq 0.9s ease-in-out infinite; transform-origin: bottom; }
  .presession-spin { animation: presession-spin 7.5s linear infinite; transform-origin: center; }
  .presession-live { animation: presession-live-pulse 1.6s ease-in-out infinite; }
  .presession-progress {
    animation: presession-progress 14s linear infinite alternate;
    transform-origin: left center;
  }
  .presession-stylus { animation: presession-stylus-bob 3.4s ease-in-out infinite; transform-origin: top left; }
  .presession-cta {
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
  .presession-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 36px rgba(26,20,16,0.35);
  }
  .presession-chip {
    transition: background-color 160ms ease, border-color 160ms ease, transform 160ms ease;
  }
  .presession-chip:hover {
    background-color: rgb(var(--clay) / 0.08);
    border-color: rgb(var(--clay) / 0.45);
  }
`;

export interface PreSessionMetric {
  label: string;
  value: string;
  caption: string;
}

export interface PreSessionProps extends React.HTMLAttributes<HTMLDivElement> {
  weekday?: string;
  intakeTime?: string;
  date?: string;
  sessionLabel?: string;
  tagline?: string;
  metrics?: PreSessionMetric[];
  duration?: number;
  trackTitle?: string;
  trackArtist?: string;
  trackAlbum?: string;
  trackQuote?: string;
  brandMark?: string;
  brandWord?: string;
}

const DEFAULT_METRICS: PreSessionMetric[] = [
  { label: 'Streak', value: '7 days', caption: 'Unbroken' },
  { label: 'Hours this week', value: '12h 40m', caption: '+2h vs last' },
  { label: 'Distraction budget', value: '4 left', caption: '7/day limit' },
  { label: 'Peak window', value: '10:00 — 12:00', caption: 'Based on 30d' }
];

const Eyebrow: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...props
}) => (
  <span
    className={cn(
      'font-sans font-medium uppercase text-ink',
      className
    )}
    style={{ fontSize: 10, letterSpacing: '0.18em', lineHeight: 1.2 }}
    {...props}
  >
    {children}
  </span>
);

const BackgroundLayer: React.FC<{ brandMark: string }> = ({ brandMark }) => (
  <>
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: [
          'radial-gradient(circle at 15% 15%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 42%)',
          'radial-gradient(circle at 85% 85%, rgba(169,58,79,0.07) 0%, rgba(169,58,79,0) 50%)'
        ].join(', ')
      }}
    />
    <span
      aria-hidden
      className="absolute font-display select-none pointer-events-none"
      style={{
        top: -140,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 720,
        lineHeight: 0.82,
        letterSpacing: '-0.04em',
        color: 'rgba(58,22,24,0.04)',
        fontWeight: 700
      }}
    >
      {brandMark}
    </span>
  </>
);

const BrandHeader: React.FC<{ brandWord: string }> = ({ brandWord }) => (
  <div className="presession-rise absolute top-10 right-14 flex flex-col items-end gap-0.5">
    <Eyebrow>Pre-Session Ritual</Eyebrow>
    <span
      className="font-display italic text-ink"
      style={{ fontSize: 28, lineHeight: 1.2, letterSpacing: '0.02em' }}
    >
      {brandWord}
    </span>
  </div>
);

const MetricRail: React.FC<{ metrics: PreSessionMetric[] }> = ({ metrics }) => (
  <div className="absolute top-14 left-14 w-[150px] flex flex-col gap-[26px]">
    {metrics.map((metric, i) => (
      <div
        key={metric.label}
        className="presession-rise flex flex-col gap-1"
        style={{ animationDelay: `${100 + i * 80}ms` }}
      >
        <Eyebrow>{metric.label}</Eyebrow>
        <span
          className="font-display italic text-ink"
          style={{ fontSize: 22, lineHeight: 1.05 }}
        >
          {metric.value}
        </span>
        <span
          className="font-sans text-ink-muted"
          style={{ fontSize: 10.5, lineHeight: 1.4, marginTop: 1 }}
        >
          {metric.caption}
        </span>
      </div>
    ))}
  </div>
);

const SessionIntake: React.FC<{
  intakeTime: string;
  weekday: string;
  tagline: string;
  date: string;
  sessionLabel: string;
}> = ({ intakeTime, weekday, tagline, date, sessionLabel }) => (
  <div
    className="presession-rise absolute top-16 w-[900px] flex flex-col items-center"
    style={{ left: '50%', transform: 'translateX(-50%)', animationDelay: '120ms' }}
  >
    <Eyebrow className="mb-3.5 text-center">Session Intake · {intakeTime}</Eyebrow>
    <span
      className="font-display text-ink text-center"
      style={{
        fontSize: 168,
        lineHeight: 0.88,
        letterSpacing: '-0.02em',
        whiteSpace: 'pre',
        fontWeight: 700
      }}
    >
      {weekday}
    </span>
    <span
      className="font-display italic text-burgundy text-center"
      style={{ fontSize: 20, lineHeight: 1.35, marginTop: 22, maxWidth: 520 }}
    >
      {tagline}
    </span>
    <div className="flex mt-4 gap-[26px] items-baseline">
      <span className="font-display italic text-ink-muted" style={{ fontSize: 15, lineHeight: 1.2 }}>
        {date}
      </span>
      <span className="font-display italic text-ink-faint" style={{ fontSize: 15, lineHeight: 1.2 }}>
        ·
      </span>
      <span className="font-display italic text-ink-muted" style={{ fontSize: 15, lineHeight: 1.2 }}>
        {sessionLabel}
      </span>
    </div>
  </div>
);

const FocusOrb: React.FC = () => (
  <div
    className="presession-fade absolute"
    style={{
      left: '50%',
      top: '58%',
      width: 620,
      height: 620,
      transform: 'translate(-50%, -50%)',
      animationDelay: '300ms'
    }}
  >
    <SlimeOrb size={620} baseRatio={0.27} amp={0.055} orbit={0.7} eyeScale={2.1} eyeGap={28} />
    <div
      aria-hidden
      className="absolute rounded-full pointer-events-none"
      style={{
        left: '50%',
        bottom: 56,
        width: 430,
        height: 67,
        transform: 'translateX(-50%)',
        filter: 'blur(10px)',
        background:
          'radial-gradient(circle at 50% 50%, rgba(58,22,24,0.22) 0%, rgba(58,22,24,0) 70%)'
      }}
    />
  </div>
);

const FocusObjective: React.FC = () => (
  <div className="presession-rise absolute left-20 top-[460px] w-[520px] flex items-start gap-5" style={{ animationDelay: '380ms' }}>
    <div className="flex flex-col items-center pt-1.5 gap-2">
      <span
        className="rounded-full bg-clay shrink-0"
        style={{
          width: 9,
          height: 9,
          boxShadow: '0 0 0 4px rgba(216,153,112,0.18)'
        }}
      />
      <span
        className="w-px shrink-0"
        style={{
          height: 110,
          background:
            'linear-gradient(180deg, rgba(58,32,20,0.22) 0%, rgba(58,32,20,0) 100%)'
        }}
      />
    </div>
    <div className="flex flex-col grow gap-3.5">
      <div className="flex items-baseline gap-3">
        <span className="font-display italic text-ink" style={{ fontSize: 18, lineHeight: 1.2 }}>
          Now
        </span>
        <span className="w-px h-2.5 bg-ink/30 shrink-0" />
        <Eyebrow className="text-ink/55">What is our focus objective?</Eyebrow>
      </div>
      <span
        className="font-display text-ink/35"
        style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.01em', whiteSpace: 'pre', fontWeight: 700 }}
      >
        Define task…
      </span>
      <span className="h-px w-full bg-ink/18 shrink-0" />
      <div className="flex items-center pt-1 gap-2.5">
        <button
          type="button"
          className="presession-chip flex items-center rounded-full py-2 px-3.5 gap-2 border border-ink/18"
        >
          <span className="rounded-full bg-clay shrink-0" style={{ width: 4, height: 4 }} />
          <span
            className="font-sans font-medium uppercase text-ink/70"
            style={{ fontSize: 11, letterSpacing: '0.08em' }}
          >
            Open calendar
          </span>
        </button>
        <button
          type="button"
          className="presession-chip flex items-center rounded-full py-2 px-3.5 gap-2 border border-ink/18"
        >
          <span className="font-display italic text-ink/70" style={{ fontSize: 12 }}>ƒ</span>
          <span
            className="font-sans font-medium uppercase text-ink/70"
            style={{ fontSize: 11, letterSpacing: '0.08em' }}
          >
            Suggest
          </span>
        </button>
      </div>
      <div className="flex items-center pt-1.5 gap-2.5">
        <span
          className="font-sans font-semibold uppercase text-clay-deep"
          style={{ fontSize: 10, letterSpacing: '0.18em' }}
        >
          92% ML match
        </span>
        <span className="w-px h-2.5 bg-ink/25 shrink-0" />
        <span className="font-display italic text-ink/65" style={{ fontSize: 14, lineHeight: 1.2 }}>
          Historically your best hour for deep work.
        </span>
      </div>
    </div>
  </div>
);

const DurationPicker: React.FC<{ duration: number; onChange: (v: number) => void }> = ({
  duration,
  onChange
}) => {
  const stops = [25, 45, 60];
  const step = (delta: number) => onChange(Math.max(5, Math.min(180, duration + delta)));
  return (
    <div
      className="presession-rise absolute right-[120px] top-[460px] flex flex-col items-center gap-4"
      style={{ animationDelay: '440ms' }}
    >
      <Eyebrow className="text-ink/55">Duration</Eyebrow>
      <div className="flex items-center gap-7">
        <button
          type="button"
          aria-label="Decrease duration"
          onClick={() => step(-5)}
          className="font-display text-ink/35 hover:text-ink/70 transition-colors"
          style={{ fontSize: 36, lineHeight: 1, fontWeight: 400 }}
        >
          −
        </button>
        <div className="flex items-start gap-1.5 relative">
          <span
            className="font-display text-ink"
            style={{
              fontSize: 96,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {duration}
          </span>
          <span
            className="rounded-full bg-clay presession-pulse shrink-0"
            style={{ width: 8, height: 8, marginTop: 12 }}
          />
        </div>
        <button
          type="button"
          aria-label="Increase duration"
          onClick={() => step(5)}
          className="font-display text-ink/35 hover:text-ink/70 transition-colors"
          style={{ fontSize: 36, lineHeight: 1, fontWeight: 400 }}
        >
          +
        </button>
      </div>
      <span className="font-display italic text-ink/55" style={{ fontSize: 16 }}>
        minutes
      </span>
      <span className="h-px w-[220px] mt-1 bg-ink/12 shrink-0" />
      <div className="flex items-center pt-1 gap-3.5">
        {stops.map((stop, idx) => (
          <React.Fragment key={stop}>
            <button
              type="button"
              onClick={() => onChange(stop)}
              className={cn(
                'font-sans transition-colors',
                duration === stop ? 'font-semibold text-ink' : 'text-ink/40 hover:text-ink/70'
              )}
              style={{ fontSize: 11, letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}
            >
              {stop}
            </button>
            {idx < stops.length && (
              <span className="w-px h-2 bg-ink/18 shrink-0" aria-hidden />
            )}
          </React.Fragment>
        ))}
        <button
          type="button"
          onClick={() => onChange(120)}
          className={cn(
            'font-display italic transition-colors',
            duration >= 120 ? 'text-ink' : 'text-ink/55 hover:text-ink/85'
          )}
          style={{ fontSize: 12 }}
        >
          flow
        </button>
      </div>
    </div>
  );
};

const VinylArt: React.FC = () => (
  <div
    className="relative shrink-0 rounded-full"
    style={{
      width: 88,
      height: 88,
      boxShadow: 'inset 0 0 0 1px rgba(244,237,223,0.06), 0 8px 22px -10px rgba(58,22,24,0.5)'
    }}
  >
    <div
      aria-hidden
      className="presession-spin absolute inset-0 rounded-full"
      style={{
        background: [
          'repeating-radial-gradient(circle at 50% 50%,',
          'rgba(34,22,16,1) 0px,',
          'rgba(46,32,22,1) 2px,',
          'rgba(34,22,16,1) 4px)'
        ].join(' ')
      }}
    >
      <span
        className="absolute rounded-full flex items-center justify-center"
        style={{
          left: '50%',
          top: '50%',
          width: 34,
          height: 34,
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, rgb(var(--clay)) 0%, rgb(var(--clay-deep)) 100%)'
        }}
      >
        <span className="rounded-full bg-ink shrink-0" style={{ width: 6, height: 6 }} />
      </span>
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{
          left: 12,
          top: 8,
          width: 38,
          height: 4,
          backgroundColor: 'rgba(244,237,223,0.10)',
          transform: 'rotate(-32deg)',
          transformOrigin: 'top left'
        }}
      />
    </div>
    <span
      aria-hidden
      className="presession-stylus absolute"
      style={{
        right: -6,
        top: -4,
        width: 28,
        height: 2,
        background: 'linear-gradient(90deg, rgb(var(--ink)) 0%, rgb(var(--ink-muted)) 100%)',
        borderRadius: 2
      }}
    />
    <span
      aria-hidden
      className="absolute rounded-full bg-clay"
      style={{ right: -8, top: -7, width: 8, height: 8 }}
    />
  </div>
);

const Waveform: React.FC = () => {
  const heights = [
    8, 14, 22, 16, 26, 12, 20, 24, 10, 18, 14, 22, 8, 16, 26, 12, 20, 14, 24, 10,
    18, 22, 8, 14, 16, 24, 12, 20, 14, 18, 26, 10, 22, 14
  ];
  const totalBars = heights.length;
  return (
    <div className="relative" style={{ height: 26 }}>
      <div className="flex items-end gap-[3px] h-full">
        {heights.map((h, i) => {
          const delay = (i % 6) * 90 + (i % 3) * 50;
          return (
            <span
              key={i}
              className={cn('presession-eq rounded-[1px] bg-ink/55')}
              style={{
                width: 2,
                height: h,
                animationDelay: `${delay}ms`,
                animationDuration: `${900 + (i % 4) * 120}ms`
              }}
            />
          );
        })}
      </div>
      <span
        aria-hidden
        className="presession-progress absolute left-0 top-0 h-full rounded-[1px] origin-left"
        style={{
          width: `${(totalBars / totalBars) * 100}%`,
          background:
            'linear-gradient(90deg, rgba(201,125,91,0.0) 0%, rgba(201,125,91,0.18) 50%, rgba(201,125,91,0.0) 100%)',
          mixBlendMode: 'multiply',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

const MusicWidget: React.FC<{
  title: string;
  artist: string;
  album: string;
  quote: string;
}> = ({ title, artist, album, quote }) => (
  <div
    className="presession-rise absolute left-20 flex flex-col w-[360px] gap-3.5"
    style={{ top: 770, animationDelay: '520ms' }}
  >
    <div className="flex items-center pb-2.5 gap-3 border-b border-ink/15">
      <span
        className="presession-live relative shrink-0 rounded-full bg-moss-deep"
        style={{ width: 16, height: 16 }}
      >
        <span
          className="absolute rounded-[1px] bg-paper"
          style={{ top: 4, left: 2.5, width: 11, height: 1.5 }}
        />
        <span
          className="absolute rounded-[1px] bg-paper"
          style={{ top: 7.5, left: 3.5, width: 9, height: 1.5 }}
        />
        <span
          className="absolute rounded-[1px] bg-paper"
          style={{ top: 11, left: 4.5, width: 7, height: 1.5 }}
        />
      </span>
      <span
        className="font-sans font-semibold uppercase text-ink"
        style={{ fontSize: 9, letterSpacing: '0.22em' }}
      >
        Music · live
      </span>
      <span className="grow" />
      <span className="font-display italic text-ink/55" style={{ fontSize: 12 }}>
        side B · track 04
      </span>
    </div>
    <div className="flex items-start gap-4">
      <VinylArt />
      <div className="flex flex-col grow pt-1 gap-1.5">
        <span
          className="font-display text-ink"
          style={{ fontSize: 21, lineHeight: 1.2, letterSpacing: '-0.01em', fontWeight: 700, whiteSpace: 'pre' }}
        >
          {title}
        </span>
        <div className="flex items-center gap-2">
          <span className="bg-ink shrink-0" style={{ width: 14, height: 1 }} />
          <span
            className="font-sans font-semibold uppercase text-ink"
            style={{ fontSize: 11, letterSpacing: '0.12em' }}
          >
            {artist}
          </span>
          <span className="font-display italic text-ink/55" style={{ fontSize: 12 }}>
            — {album}
          </span>
        </div>
        <span
          className="font-display italic text-ink/55 pt-0.5"
          style={{ fontSize: 13, lineHeight: 1.4 }}
        >
          “{quote}”
        </span>
      </div>
    </div>
    <div className="flex items-center pt-1 gap-3.5">
      <div className="grow">
        <Waveform />
      </div>
      <div className="flex items-baseline shrink-0 gap-1">
        <span
          className="font-mono font-medium text-ink"
          style={{ fontSize: 11, letterSpacing: '0.04em' }}
        >
          2:14
        </span>
        <span
          className="font-mono text-ink/40"
          style={{ fontSize: 10, letterSpacing: '0.04em' }}
        >
          / 5:48
        </span>
      </div>
    </div>
  </div>
);

const BeginCTA: React.FC<{ duration: number }> = ({ duration }) => (
  <div
    className="presession-rise absolute right-[120px] flex items-center gap-4"
    style={{ top: 1000, animationDelay: '600ms' }}
  >
    <div className="flex flex-col items-end gap-0.5">
      <span
        className="font-sans font-semibold uppercase text-ink/55"
        style={{ fontSize: 9, letterSpacing: '0.22em' }}
      >
        {duration} min · Deep Work
      </span>
      <span className="font-display italic text-ink/55" style={{ fontSize: 12 }}>
        press ↵ when ready
      </span>
    </div>
    <span
      className="font-display italic text-ink"
      style={{ fontSize: 36, lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 700 }}
    >
      Begin.
    </span>
    <button
      type="button"
      aria-label="Begin focus session"
      className="presession-cta relative flex items-center justify-center rounded-full bg-ink shrink-0"
      style={{
        width: 52,
        height: 52,
        boxShadow: '0 6px 16px -8px rgba(58,22,24,0.55)'
      }}
    >
      <span
        aria-hidden
        className="ml-1 shrink-0"
        style={{
          width: 0,
          height: 0,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          borderLeft: '12px solid rgb(var(--paper))'
        }}
      />
      <span
        aria-hidden
        className="absolute rounded-full border border-clay/40"
        style={{ inset: -5 }}
      />
      <span
        aria-hidden
        className="absolute rounded-full bg-clay border-2 border-paper"
        style={{ width: 10, height: 10, top: -2, right: -2 }}
      />
    </button>
  </div>
);

const AddCardSlot: React.FC = () => (
  <div
    className="presession-fade absolute flex flex-col justify-center items-center rounded-md gap-1.5 border border-dashed border-ink/28 p-3"
    style={{ left: 1658, top: 840, width: 142, height: 92, animationDelay: '700ms' }}
  >
    <div className="flex items-center gap-2">
      <span className="font-display text-ink/45" style={{ fontSize: 22, lineHeight: 1 }}>+</span>
      <span
        className="font-sans font-medium uppercase text-ink/55"
        style={{ fontSize: 10, letterSpacing: '0.16em' }}
      >
        Add card
      </span>
    </div>
    <span className="font-display italic text-ink/45" style={{ fontSize: 11 }}>
      mood · sleep · custom
    </span>
  </div>
);

export const PreSession = React.forwardRef<HTMLDivElement, PreSessionProps>(
  (
    {
      weekday = 'Tuesday.',
      intakeTime = '10:14',
      date = 'Tuesday · Apr 15',
      sessionLabel = 'Sess. 142',
      tagline = "What shall we work on? Hand me four things and I’ll hold the space for you.",
      metrics = DEFAULT_METRICS,
      duration: durationProp,
      trackTitle = 'On the Nature of Daylight',
      trackArtist = 'Max Richter',
      trackAlbum = 'The Blue Notebooks',
      trackQuote = 'a slow exhale before the work begins',
      brandMark = 'T',
      brandWord = 'tindra',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [duration, setDuration] = React.useState(durationProp ?? 45);
    React.useEffect(() => {
      if (durationProp !== undefined) setDuration(durationProp);
    }, [durationProp]);

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden bg-paper', className)}
        style={{ width: 1920, height: 1080, ...style }}
        {...props}
      >
        <style>{ANIMATIONS_CSS}</style>
        <BackgroundLayer brandMark={brandMark} />
        <BrandHeader brandWord={brandWord} />
        <MetricRail metrics={metrics} />
        <SessionIntake
          intakeTime={intakeTime}
          weekday={weekday}
          tagline={tagline}
          date={date}
          sessionLabel={sessionLabel}
        />
        <FocusOrb />
        <FocusObjective />
        <DurationPicker duration={duration} onChange={setDuration} />
        <MusicWidget
          title={trackTitle}
          artist={trackArtist}
          album={trackAlbum}
          quote={trackQuote}
        />
        <BeginCTA duration={duration} />
        <AddCardSlot />
      </div>
    );
  }
);
PreSession.displayName = 'PreSession';
