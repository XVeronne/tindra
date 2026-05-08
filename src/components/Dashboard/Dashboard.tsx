import * as React from 'react';
import { BookSpine, type BookSpineTone } from '../BookSpine/BookSpine';
import { cn } from '@/lib/cn';

export interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {}

const COLORS = {
  paper: '#FDFBF7',
  ink: '#2A1418',
  ink10: 'rgba(42, 20, 24, 0.06)',
  ink20: 'rgba(42, 20, 24, 0.1)',
  ink25: 'rgba(42, 20, 24, 0.15)',
  inkLine: 'rgba(42, 20, 24, 0.2)',
  inkSoftLine: 'rgba(42, 20, 24, 0.05)',
  rose: '#A64B5C',
  muted: '#8C7C6D',
  woodOuter: '#2A1B0E',
  woodInside: '#180F06',
  woodShelf: '#3D2A18',
  woodHighlight: 'rgba(180, 130, 80, 0.3)',
  burgundy: '#5C2C35',
  navy: '#1E2A40',
  ochre: '#B8811A',
  teal: '#245B5F',
  gold: '#D4AF37'
} as const;

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Helvetica Now Display', Inter, system-ui, sans-serif";

const ANIMATIONS_CSS = `
  @keyframes tindra-rise {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes tindra-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes tindra-card-rise {
    from { opacity: 0; transform: rotate(-1deg) translateY(20px); }
    to { opacity: 1; transform: rotate(-1deg) translateY(0); }
  }
  @keyframes tindra-spine-pop {
    0% { opacity: 0; transform: translateY(40px); }
    60% { opacity: 1; transform: translateY(-4px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes tindra-blink {
    0%, 92%, 100% { transform: scaleY(1); }
    94% { transform: scaleY(0.08); }
    96% { transform: scaleY(1); }
  }
  @keyframes tindra-drift {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  .tindra-rise { animation: tindra-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .tindra-fade { animation: tindra-fade 900ms ease-out both; }
  .tindra-card-rise { animation: tindra-card-rise 800ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .tindra-spine-pop { animation: tindra-spine-pop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .tindra-spine-wrap {
    transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), filter 320ms ease;
    transform-origin: bottom center;
    cursor: pointer;
  }
  .tindra-spine-wrap:hover {
    transform: translateY(-14px) rotateZ(-2deg);
    filter: drop-shadow(0 8px 18px rgba(0,0,0,0.5));
  }
  .tindra-spine-wrap.is-selected {
    transform: translateY(-22px) rotateZ(-3deg);
    filter: drop-shadow(0 12px 22px rgba(214, 175, 55, 0.35));
  }
  .tindra-mascot-eye { transform-origin: center; animation: tindra-blink 5s infinite; }
  .tindra-mascot-eye-2 { animation-delay: 60ms; }
  .tindra-wkly-drift { animation: tindra-drift 16s ease-in-out infinite; }
  .tindra-nav-btn {
    cursor: pointer;
    transition: background-color 200ms ease, border-color 200ms ease;
  }
  .tindra-nav-btn:hover { background-color: ${COLORS.ink10}; }
  .tindra-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .tindra-subject-row {
    transition: color 200ms ease, transform 200ms ease;
  }
  .tindra-subject-row:hover { transform: translateX(4px); }
  .tindra-subject-row:hover > .tindra-subject-name { color: ${COLORS.rose}; }
`;

const VOLUMES = [
  { name: 'Volume X', range: 'Mar 9 — 15, 2026', score: 8540, distractions: 31, hours: 42, minutes: 8, clarity: 88 },
  { name: 'Volume XI', range: 'Mar 16 — 22, 2026', score: 8980, distractions: 27, hours: 47, minutes: 22, clarity: 91 },
  { name: 'Volume XII', range: 'Mar 23 — 29, 2026', score: 9420, distractions: 23, hours: 50, minutes: 15, clarity: 94 },
  { name: 'Volume XIII', range: 'Mar 30 — Apr 5, 2026', score: 9180, distractions: 25, hours: 48, minutes: 40, clarity: 92 }
];

const useCountUp = (target: number, durationMs = 1500, delayMs = 0) => {
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

const ArrowRight = ({ color = COLORS.ink, opacity = 1 }: { color?: string; opacity?: number }) => (
  <span
    style={{
      fontFamily: SANS,
      fontSize: 12,
      lineHeight: 1,
      color,
      opacity,
      marginTop: -2
    }}
  >
    →
  </span>
);

const Eyebrow = ({
  children,
  color = COLORS.rose,
  size = 9,
  weight = 700,
  spacing = 0.15
}: {
  children: React.ReactNode;
  color?: string;
  size?: number;
  weight?: number;
  spacing?: number;
}) => (
  <span
    style={{
      fontFamily: SANS,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing: `${spacing}em`,
      textTransform: 'uppercase',
      lineHeight: 1
    }}
  >
    {children}
  </span>
);

const WklyBackground = () => (
  <div
    aria-hidden
    className="tindra-wkly-drift"
    style={{
      position: 'absolute',
      top: -40,
      right: -40,
      width: 'max-content',
      textAlign: 'right',
      fontFamily: SANS,
      fontWeight: 800,
      fontSize: 380,
      lineHeight: 0.8,
      letterSpacing: '-0.06em',
      color: 'rgba(42, 20, 24, 0.03)',
      whiteSpace: 'pre',
      pointerEvents: 'none'
    }}
  >
    W
    <br />K<br />L<br />Y
  </div>
);

const LeftRail = ({
  volumeIndex,
  onPrev,
  onNext,
  current
}: {
  volumeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  current: typeof VOLUMES[number];
}) => {
  const score = useCountUp(current.score, 1800, 400);
  const distractions = useCountUp(current.distractions, 1200, 600);
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 160,
        padding: '40px 24px',
        borderRight: `1px solid ${COLORS.ink10}`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        className="tindra-rise"
        style={{ marginBottom: 48, animationDelay: '120ms' }}
      >
        <Eyebrow color={COLORS.rose} size={9} spacing={0.15}>
          Archive Index
        </Eyebrow>
        <div
          style={{
            marginTop: 4,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 16,
            color: COLORS.ink,
            lineHeight: 1.25
          }}
        >
          {current.name}
        </div>
        <div style={{ paddingBottom: 8, borderBottom: `1px solid ${COLORS.ink25}` }}>
          <div
            style={{
              fontFamily: SANS,
              fontWeight: 500,
              fontSize: 9,
              color: COLORS.muted,
              letterSpacing: '0.05em',
              lineHeight: 1.2
            }}
          >
            {current.range}
          </div>
        </div>
        <div className="flex justify-between items-center" style={{ marginTop: 8 }}>
          <button
            type="button"
            aria-label="Previous volume"
            onClick={onPrev}
            disabled={volumeIndex === 0}
            className="tindra-nav-btn flex items-center justify-center rounded-full"
            style={{
              width: 20,
              height: 20,
              border: `1px solid ${COLORS.ink20}`,
              flexShrink: 0,
              backgroundColor: 'transparent'
            }}
          >
            <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>
              <ArrowRight />
            </span>
          </button>
          <Eyebrow color={COLORS.muted} size={8} spacing={0.15}>
            Nav
          </Eyebrow>
          <button
            type="button"
            aria-label="Next volume"
            onClick={onNext}
            disabled={volumeIndex === VOLUMES.length - 1}
            className="tindra-nav-btn flex items-center justify-center rounded-full"
            style={{
              width: 20,
              height: 20,
              border: `1px solid ${COLORS.ink20}`,
              flexShrink: 0,
              backgroundColor: 'transparent'
            }}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="tindra-rise" style={{ marginBottom: 48, animationDelay: '240ms' }}>
        <Eyebrow>Focus Score</Eyebrow>
        <div
          style={{
            marginTop: 8,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 24,
            color: COLORS.ink,
            lineHeight: 1
          }}
        >
          {score.toLocaleString()}
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: 10,
            color: COLORS.muted,
            lineHeight: 1.2
          }}
        >
          Top 12% of users
        </div>
      </div>
      <div className="tindra-rise" style={{ animationDelay: '360ms' }}>
        <Eyebrow>Distractions</Eyebrow>
        <div
          style={{
            marginTop: 8,
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 24,
            color: COLORS.ink,
            lineHeight: 1
          }}
        >
          {distractions}
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: 10,
            color: COLORS.muted,
            lineHeight: 1.2
          }}
        >
          Avg recovery: 3.2s
        </div>
      </div>
      <div style={{ marginTop: 'auto', marginBottom: 120 }}>
        <span
          style={{
            display: 'inline-block',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            fontFamily: SANS,
            fontWeight: 400,
            fontSize: 8,
            letterSpacing: '0.2em',
            color: COLORS.ink,
            whiteSpace: 'nowrap',
            lineHeight: 1.2
          }}
        >
          WIINKY BIOMETRICS // COGNITIVE OUTPUT
        </span>
      </div>
    </div>
  );
};

const HeroBlock = ({ current }: { current: typeof VOLUMES[number] }) => {
  const hours = useCountUp(current.hours, 1400, 200);
  const minutes = useCountUp(current.minutes, 1400, 350);
  const clarity = useCountUp(current.clarity, 1400, 700);
  return (
    <div
      className="tindra-rise"
      style={{ position: 'absolute', top: 80, left: 240, animationDelay: '160ms' }}
    >
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 800,
          fontSize: 140,
          lineHeight: 0.8,
          letterSpacing: '-0.04em',
          color: COLORS.ink,
          marginBottom: 32,
          whiteSpace: 'pre',
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {hours}h
        {'\n'}
        {minutes.toString().padStart(2, '0')}m
      </div>
      <div className="flex items-start" style={{ gap: 64 }}>
        <div style={{ width: 260, flexShrink: 0 }}>
          <Eyebrow size={10}>Total Accumulated Time</Eyebrow>
          <div
            style={{
              marginTop: 4,
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 16,
              color: COLORS.ink,
              lineHeight: 1.5
            }}
          >
            Your strongest subject this week was Chemistry ({current.clarity - 3}% clarity).
          </div>
        </div>
        <span style={{ width: 1, height: 60, backgroundColor: COLORS.ink20, flexShrink: 0 }} />
        <div style={{ flexShrink: 0 }}>
          <Eyebrow size={10}>Average Clarity</Eyebrow>
          <div
            style={{
              marginTop: 4,
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 36,
              color: COLORS.ink,
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {clarity}%
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderBlock = () => (
  <div
    className="tindra-rise"
    style={{ position: 'absolute', top: 40, right: 40, animationDelay: '60ms' }}
  >
    <div style={{ textAlign: 'right', marginBottom: -16 }}>
      <Eyebrow size={10} spacing={0.2}>
        Wiinky Biometrics
      </Eyebrow>
    </div>
    <div
      style={{
        textAlign: 'right',
        fontFamily: SERIF,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 100,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: COLORS.ink,
        whiteSpace: 'pre'
      }}
    >
      Weekly Report.
    </div>
  </div>
);

type SpineMeta = { tone: BookSpineTone; width: number; height: number; title: string; sessionNumber: string; volume: string };

const SHELF_SPINES: SpineMeta[] = [
  { tone: 'oxblood', width: 68, height: 184, title: 'Chem.', sessionNumber: '142', volume: 'IV' },
  { tone: 'navy', width: 42, height: 166, title: 'Hist.', sessionNumber: '143', volume: 'III' },
  { tone: 'ochre', width: 32, height: 140, title: 'Lit.', sessionNumber: '144', volume: 'IX' },
  { tone: 'pine', width: 78, height: 196, title: 'Bio.', sessionNumber: '145', volume: 'V' },
  { tone: 'tan', width: 48, height: 172, title: 'CS.', sessionNumber: '146', volume: 'VII' }
];

const Bookshelf = ({
  selectedSpine,
  onSpineSelect
}: {
  selectedSpine: number | null;
  onSpineSelect: (i: number | null) => void;
}) => (
  <div
    className="tindra-rise"
    style={{
      position: 'absolute',
      top: 190,
      right: 40,
      width: 620,
      padding: 36,
      backgroundColor: COLORS.woodOuter,
      border: `1px solid ${COLORS.ink20}`,
      borderRadius: 4,
      boxShadow:
        'inset 0 0 0 1px rgba(255,255,255,0.05), -10px 20px 60px rgba(42,20,24,0.15)',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      animationDelay: '500ms'
    }}
  >
    <div
      style={{
        position: 'relative',
        height: 220,
        padding: '0 28px 14px',
        backgroundColor: COLORS.woodInside,
        borderRadius: 2,
        boxShadow: 'inset 0 20px 30px rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 6
      }}
    >
      {SHELF_SPINES.map((spine, i) => (
        <div
          key={spine.title}
          className={cn('tindra-spine-wrap tindra-spine-pop', selectedSpine === i && 'is-selected')}
          style={{ animationDelay: `${600 + i * 80}ms` }}
          onClick={(e) => {
            e.stopPropagation();
            onSpineSelect(selectedSpine === i ? null : i);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSpineSelect(selectedSpine === i ? null : i);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Open ${spine.title} volume ${spine.volume}`}
          aria-pressed={selectedSpine === i}
        >
          <BookSpine
            tone={spine.tone}
            width={spine.width}
            height={spine.height}
            title={spine.title}
            volume={spine.volume}
            sessionNumber={spine.sessionNumber}
          />
        </div>
      ))}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          backgroundColor: COLORS.woodShelf,
          borderTop: `1px solid ${COLORS.woodHighlight}`
        }}
      />
    </div>
    <div
      style={{
        position: 'relative',
        height: 130,
        backgroundColor: COLORS.woodInside,
        borderRadius: 2,
        boxShadow: 'inset 0 20px 30px rgba(0,0,0,0.8)'
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          backgroundColor: COLORS.woodShelf,
          borderTop: `1px solid ${COLORS.woodHighlight}`
        }}
      />
    </div>
    <div
      style={{
        position: 'relative',
        height: 130,
        backgroundColor: COLORS.woodInside,
        borderRadius: 2,
        boxShadow: 'inset 0 20px 30px rgba(0,0,0,0.8)'
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          backgroundColor: COLORS.woodShelf,
          borderTop: `1px solid ${COLORS.woodHighlight}`
        }}
      />
    </div>
  </div>
);

const SUBJECTS = [
  { name: 'Chemistry', value: '15H (91%)' },
  { name: 'Computer Science', value: '11H (62%)' },
  { name: 'Literature', value: '4H (98%)' }
];

const SubjectBreakdownCard = () => (
  <div
    className="tindra-card-rise"
    style={{
      position: 'absolute',
      bottom: 60,
      left: 200,
      width: 440,
      padding: 40,
      backgroundColor: 'white',
      border: `1px solid ${COLORS.ink10}`,
      boxShadow: '0px 40px 80px rgba(42,20,24,0.1), 0px 10px 20px rgba(42,20,24,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      transformOrigin: 'top left',
      animationDelay: '700ms'
    }}
  >
    <div
      className="flex justify-between items-end"
      style={{ paddingBottom: 12, borderBottom: `2px solid ${COLORS.ink}` }}
    >
      <span
        style={{
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 14,
          color: COLORS.ink,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          lineHeight: 1.25
        }}
      >
        Subject Breakdown
      </span>
      <span
        style={{
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontSize: 14,
          color: COLORS.rose,
          lineHeight: 1.25
        }}
      >
        FIG. 2.0
      </span>
    </div>
    <div className="flex flex-col" style={{ gap: 16 }}>
      {SUBJECTS.map((subject) => (
        <div
          key={subject.name}
          className="tindra-subject-row flex justify-between items-baseline"
        >
          <span
            className="tindra-subject-name"
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 20,
              color: COLORS.ink,
              lineHeight: 1.5
            }}
          >
            {subject.name}
          </span>
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: 12,
              color: COLORS.ink,
              letterSpacing: '0.18em',
              lineHeight: 1.33
            }}
          >
            {subject.value}
          </span>
        </div>
      ))}
    </div>
    <div
      className="flex items-start"
      style={{ paddingTop: 16, gap: 16, borderTop: `1px dashed ${COLORS.ink20}` }}
    >
      <span
        className="flex items-center justify-center rounded-full"
        style={{ width: 16, height: 16, marginTop: 4, backgroundColor: COLORS.ink, flexShrink: 0 }}
      >
        <span
          aria-hidden
          className="rounded-full"
          style={{ width: 4, height: 4, backgroundColor: 'white' }}
        />
      </span>
      <p
        style={{
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontSize: 13,
          color: COLORS.muted,
          lineHeight: 1.6
        }}
      >
        Notice the exceptional clarity scores on days involving deep literature reviews and focused
        chemistry blocks.
      </p>
    </div>
  </div>
);

const SystemObserver = () => (
  <div
    className="tindra-fade flex items-center justify-center"
    style={{ position: 'absolute', bottom: 40, left: 40, width: 80, height: 80, animationDelay: '900ms' }}
  >
    <span
      aria-hidden
      style={{
        position: 'absolute',
        width: 160,
        height: 160,
        background:
          'radial-gradient(circle at 50% 50%, rgba(166, 75, 92, 0.15) 0%, transparent 70%)',
        filter: 'blur(20px)',
        pointerEvents: 'none'
      }}
    />
    <div className="flex items-center" style={{ gap: 8, position: 'relative' }}>
      <span
        className="tindra-mascot-eye"
        style={{
          width: 14,
          height: 32,
          borderRadius: 999,
          backgroundColor: COLORS.ink,
          boxShadow: '0 0 15px rgba(166, 75, 92, 0.3)',
          flexShrink: 0
        }}
      />
      <span
        className="tindra-mascot-eye tindra-mascot-eye-2"
        style={{
          width: 14,
          height: 32,
          borderRadius: 999,
          backgroundColor: COLORS.ink,
          boxShadow: '0 0 15px rgba(166, 75, 92, 0.3)',
          flexShrink: 0
        }}
      />
    </div>
    <span
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: 8,
        whiteSpace: 'nowrap',
        fontFamily: SANS,
        fontWeight: 700,
        fontSize: 8,
        color: COLORS.rose,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        lineHeight: 1.25
      }}
    >
      System Observer // Wiinky
    </span>
  </div>
);

const FootCaption = ({ selectedSpine }: { selectedSpine: number | null }) => {
  const spine = selectedSpine !== null ? SHELF_SPINES[selectedSpine] : null;
  return (
    <div
      className="tindra-fade"
      style={{
        position: 'absolute',
        bottom: 40,
        right: 40,
        width: 620,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        animationDelay: '800ms'
      }}
    >
      <span style={{ width: '100%', height: 1, backgroundColor: COLORS.ink20 }} />
      <div className="flex justify-between items-baseline">
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: 9,
            color: COLORS.muted,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            lineHeight: 1.33
          }}
        >
          {spine ? `OPENED — VOL. ${spine.volume} · NO. ${spine.sessionNumber}` : 'FIG. 1.0 — COGNITIVE OUTPUT'}
        </span>
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 11,
            color: COLORS.muted,
            lineHeight: 1.27
          }}
        >
          {spine ? `${spine.title} · session ${spine.sessionNumber}` : 'Procedural Bookshelf Object.'}
        </span>
      </div>
    </div>
  );
};

export const Dashboard = React.forwardRef<HTMLDivElement, DashboardProps>(
  ({ className, style, ...props }, ref) => {
    const [volumeIndex, setVolumeIndex] = React.useState(2);
    const [selectedSpine, setSelectedSpine] = React.useState<number | null>(null);
    const current = VOLUMES[volumeIndex];

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        style={{
          width: 1440,
          height: 900,
          backgroundColor: COLORS.paper,
          ...style
        }}
        {...props}
      >
        <style>{ANIMATIONS_CSS}</style>
        <WklyBackground />
        <LeftRail
          volumeIndex={volumeIndex}
          onPrev={() => setVolumeIndex((i) => Math.max(0, i - 1))}
          onNext={() => setVolumeIndex((i) => Math.min(VOLUMES.length - 1, i + 1))}
          current={current}
          key={`rail-${volumeIndex}`}
        />
        <HeaderBlock />
        <HeroBlock current={current} key={`hero-${volumeIndex}`} />
        <Bookshelf selectedSpine={selectedSpine} onSpineSelect={setSelectedSpine} />
        <SubjectBreakdownCard />
        <SystemObserver />
        <FootCaption selectedSpine={selectedSpine} />
      </div>
    );
  }
);
Dashboard.displayName = 'Dashboard';
