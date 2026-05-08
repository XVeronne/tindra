import * as React from 'react';
import { cn } from '@/lib/cn';

export type BookSpineTone =
  | 'oxblood'
  | 'forest'
  | 'tan'
  | 'navy'
  | 'ochre'
  | 'charcoal'
  | 'pine';

export interface BookSpineProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: BookSpineTone;
  volume?: string;
  title?: string;
  tagline?: string;
  imprint?: string;
  sessionNumber?: string;
  width?: number;
  height?: number;
}

type ToneTokens = {
  body: string;
  plate: string;
  giltSoft: string;
  giltMedium: string;
  giltStrong: string;
  giltBright: string;
  innerShadow: string;
};

const TONES: Record<BookSpineTone, ToneTokens> = {
  oxblood: {
    body: 'linear-gradient(110deg, rgb(38, 14, 18) 0%, rgb(72, 24, 32) 14%, rgb(102, 36, 46) 32%, rgb(72, 24, 32) 68%, rgb(46, 16, 22) 88%, rgb(28, 10, 14) 100%)',
    plate: 'linear-gradient(180deg, rgb(18, 6, 8) 0%, rgb(36, 12, 16) 50%, rgb(18, 6, 8) 100%)',
    giltSoft: 'rgba(220, 180, 100, 0.18)',
    giltMedium: 'rgba(220, 180, 100, 0.4)',
    giltStrong: 'rgba(220, 180, 100, 0.7)',
    giltBright: 'rgb(238, 204, 138)',
    innerShadow: 'rgba(0, 0, 0, 0.45)'
  },
  forest: {
    body: 'linear-gradient(110deg, rgb(8, 22, 14) 0%, rgb(20, 44, 30) 14%, rgb(34, 64, 44) 32%, rgb(20, 44, 30) 68%, rgb(10, 28, 18) 88%, rgb(6, 18, 12) 100%)',
    plate: 'linear-gradient(180deg, rgb(4, 14, 10) 0%, rgb(14, 30, 22) 50%, rgb(4, 14, 10) 100%)',
    giltSoft: 'rgba(220, 200, 160, 0.18)',
    giltMedium: 'rgba(220, 200, 160, 0.4)',
    giltStrong: 'rgba(220, 200, 160, 0.7)',
    giltBright: 'rgb(232, 218, 180)',
    innerShadow: 'rgba(0, 0, 0, 0.45)'
  },
  tan: {
    body: 'linear-gradient(110deg, rgb(58, 32, 14) 0%, rgb(98, 56, 28) 14%, rgb(126, 78, 42) 32%, rgb(98, 56, 28) 68%, rgb(70, 38, 18) 88%, rgb(46, 24, 10) 100%)',
    plate: 'linear-gradient(180deg, rgb(28, 14, 6) 0%, rgb(54, 28, 12) 50%, rgb(28, 14, 6) 100%)',
    giltSoft: 'rgba(232, 198, 130, 0.2)',
    giltMedium: 'rgba(232, 198, 130, 0.45)',
    giltStrong: 'rgba(232, 198, 130, 0.75)',
    giltBright: 'rgb(244, 218, 158)',
    innerShadow: 'rgba(0, 0, 0, 0.4)'
  },
  navy: {
    body: 'linear-gradient(110deg, rgb(8, 18, 38) 0%, rgb(20, 34, 60) 14%, rgb(36, 54, 86) 32%, rgb(20, 34, 60) 68%, rgb(12, 22, 42) 88%, rgb(6, 14, 28) 100%)',
    plate: 'linear-gradient(180deg, rgb(4, 10, 22) 0%, rgb(14, 24, 40) 50%, rgb(4, 10, 22) 100%)',
    giltSoft: 'rgba(220, 200, 160, 0.18)',
    giltMedium: 'rgba(220, 200, 160, 0.4)',
    giltStrong: 'rgba(220, 200, 160, 0.7)',
    giltBright: 'rgb(232, 218, 180)',
    innerShadow: 'rgba(0, 0, 0, 0.45)'
  },
  ochre: {
    body: 'linear-gradient(110deg, rgb(120, 80, 16) 0%, rgb(170, 122, 36) 14%, rgb(196, 154, 58) 32%, rgb(170, 122, 36) 68%, rgb(140, 92, 22) 88%, rgb(96, 60, 12) 100%)',
    plate: 'linear-gradient(180deg, rgb(50, 28, 8) 0%, rgb(82, 50, 18) 50%, rgb(50, 28, 8) 100%)',
    giltSoft: 'rgba(255, 232, 180, 0.2)',
    giltMedium: 'rgba(255, 232, 180, 0.45)',
    giltStrong: 'rgba(255, 232, 180, 0.75)',
    giltBright: 'rgb(255, 240, 200)',
    innerShadow: 'rgba(0, 0, 0, 0.4)'
  },
  charcoal: {
    body: 'linear-gradient(110deg, rgb(6, 6, 8) 0%, rgb(22, 22, 26) 14%, rgb(38, 38, 42) 32%, rgb(22, 22, 26) 68%, rgb(8, 8, 10) 88%, rgb(4, 4, 6) 100%)',
    plate: 'linear-gradient(180deg, rgb(2, 2, 4) 0%, rgb(14, 14, 18) 50%, rgb(2, 2, 4) 100%)',
    giltSoft: 'rgba(220, 180, 100, 0.18)',
    giltMedium: 'rgba(220, 180, 100, 0.4)',
    giltStrong: 'rgba(220, 180, 100, 0.7)',
    giltBright: 'rgb(232, 198, 130)',
    innerShadow: 'rgba(0, 0, 0, 0.55)'
  },
  pine: {
    body: 'linear-gradient(110deg, rgb(10, 30, 28) 0%, rgb(22, 50, 46) 14%, rgb(38, 79, 74) 32%, rgb(22, 50, 46) 68%, rgb(14, 36, 32) 88%, rgb(8, 22, 20) 100%)',
    plate: 'linear-gradient(180deg, rgb(4, 14, 12) 0%, rgb(14, 30, 28) 50%, rgb(4, 14, 12) 100%)',
    giltSoft: 'rgba(200, 232, 216, 0.18)',
    giltMedium: 'rgba(200, 232, 216, 0.4)',
    giltStrong: 'rgba(200, 232, 216, 0.7)',
    giltBright: 'rgb(220, 240, 224)',
    innerShadow: 'rgba(0, 0, 0, 0.45)'
  }
};

const TextureLayer = ({ uid }: { uid: string }) => (
  <svg
    aria-hidden
    className="absolute inset-0 w-full h-full pointer-events-none"
    preserveAspectRatio="none"
  >
    <defs>
      <filter id={`${uid}-large`} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves={2} seed={4} />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0" />
      </filter>
      <filter id={`${uid}-medium`} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves={3} seed={9} />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.45 0" />
      </filter>
      <filter id={`${uid}-fine`} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="2.6" numOctaves={2} seed={17} />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" />
      </filter>
      <radialGradient id={`${uid}-sheen`} cx="32%" cy="20%" r="85%">
        <stop offset="0%" stopColor="rgba(255, 210, 170, 0.22)" />
        <stop offset="55%" stopColor="rgba(255, 210, 170, 0)" />
      </radialGradient>
      <radialGradient id={`${uid}-vignette`} cx="50%" cy="50%" r="65%">
        <stop offset="60%" stopColor="rgba(0, 0, 0, 0)" />
        <stop offset="100%" stopColor="rgba(0, 0, 0, 0.35)" />
      </radialGradient>
      <linearGradient id={`${uid}-curve`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(0, 0, 0, 0.45)" />
        <stop offset="22%" stopColor="rgba(0, 0, 0, 0)" />
        <stop offset="78%" stopColor="rgba(0, 0, 0, 0)" />
        <stop offset="100%" stopColor="rgba(0, 0, 0, 0.5)" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" filter={`url(#${uid}-large)`} />
    <rect width="100%" height="100%" filter={`url(#${uid}-medium)`} />
    <rect width="100%" height="100%" filter={`url(#${uid}-fine)`} />
    <rect width="100%" height="100%" fill={`url(#${uid}-curve)`} />
    <rect width="100%" height="100%" fill={`url(#${uid}-sheen)`} />
    <rect width="100%" height="100%" fill={`url(#${uid}-vignette)`} />
  </svg>
);


const RaisedBand = ({ tone, thin = false }: { tone: ToneTokens; thin?: boolean }) => (
  <div aria-hidden className="relative z-[1]">
    <div style={{ height: 1, backgroundColor: tone.giltStrong, boxShadow: '0 1px 0 rgba(0,0,0,0.5)' }} />
    {!thin && (
      <div
        style={{
          height: 3,
          background: 'linear-gradient(180deg, rgba(255,220,160,0.12) 0%, rgba(0,0,0,0.18) 100%)'
        }}
      />
    )}
    <div style={{ height: 1, backgroundColor: tone.giltMedium, boxShadow: '0 1px 0 rgba(0,0,0,0.5)' }} />
  </div>
);

const Fleuron = ({ tone, size = 32 }: { tone: ToneTokens; size?: number }) => (
  <svg width={size} height={(size * 22) / 32} viewBox="0 0 32 22" fill="none" aria-hidden>
    <path
      d="M16 2 Q12 6 14 11 Q12 16 16 20 Q20 16 18 11 Q20 6 16 2 Z"
      fill={tone.giltMedium}
    />
    <line x1="0" y1="11" x2="11" y2="11" stroke={tone.giltMedium} strokeWidth="0.6" />
    <line x1="21" y1="11" x2="32" y2="11" stroke={tone.giltMedium} strokeWidth="0.6" />
  </svg>
);

const PlateRule = ({ tone }: { tone: ToneTokens }) => (
  <svg width="22" height="6" viewBox="0 0 22 6" fill="none" aria-hidden>
    <path d="M0 3 L8 3 M14 3 L22 3" stroke={tone.giltStrong} strokeWidth="0.6" />
    <circle cx="11" cy="3" r="1.4" fill={tone.giltStrong} />
  </svg>
);

export const BookSpine = React.forwardRef<HTMLDivElement, BookSpineProps>(
  (
    {
      className,
      tone = 'oxblood',
      volume = 'IV',
      title = 'Chem.',
      tagline = '— Tuesday window',
      imprint = 'TINDRA · MMXXVI',
      sessionNumber = '142',
      width = 144,
      height = 720,
      style,
      ...props
    },
    ref
  ) => {
    const uid = React.useId().replace(/:/g, '');
    const t = TONES[tone];

    const showTagline = width >= 100;
    const showImprint = width >= 88;
    const showFleuron = width >= 70;
    const showVolumeLabel = width >= 70;
    const useFullPlate = width >= 78;

    const titleSize = width >= 110 ? 22 : width >= 90 ? 18 : width >= 72 ? 14 : 12;
    const plateMarginX = width >= 110 ? 14 : width >= 90 ? 10 : width >= 72 ? 6 : 4;
    const plateInset = width >= 110 ? 8 : 4;
    const plateInnerInset = width >= 110 ? 4 : 2;
    const platePadding = width >= 110 ? '20px 8px 18px' : width >= 90 ? '16px 6px 14px' : '12px 4px 10px';
    const ruleWidth = width >= 110 ? 36 : width >= 90 ? 28 : 20;
    const fleuronSize = width >= 110 ? 32 : width >= 90 ? 24 : 18;
    const imprintMargin = width >= 110 ? 24 : width >= 90 ? 14 : 8;
    const innerCapHeight = width >= 90 ? 12 : 8;

    return (
      <div
        ref={ref}
        className={cn('relative flex flex-col overflow-hidden', className)}
        style={{
          width,
          height,
          background: t.body,
          boxShadow:
            '6px 12px 28px rgba(26,20,16,0.4), inset -1px 0 0 rgba(0,0,0,0.5), inset 1px 0 0 rgba(255,200,160,0.06)',
          ...style
        }}
        {...props}
      >
        <TextureLayer uid={uid} />

        <div className="relative z-[1]" style={{ padding: '14px 0 14px' }}>
          <div style={{ height: 1, backgroundColor: t.giltStrong, boxShadow: '0 1px 0 rgba(0,0,0,0.5)' }} />
          <div style={{ height: innerCapHeight }} />
          <div style={{ height: 1, backgroundColor: t.giltStrong, boxShadow: '0 1px 0 rgba(0,0,0,0.5)' }} />
          {width >= 80 && (
            <div className="mt-px" style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} />
          )}
        </div>

        <div
          className="relative z-[1]"
          style={{
            margin: `${width >= 90 ? 14 : 6}px ${plateMarginX}px 0`,
            padding: platePadding,
            background: t.plate,
            border: useFullPlate
              ? `1.5px solid ${t.giltStrong}`
              : `1px solid ${t.giltStrong}`,
            boxShadow: `inset 0 2px 4px ${t.innerShadow}, inset 0 -1px 0 ${t.giltSoft}, 0 1px 0 ${t.giltSoft}`
          }}
        >
          {useFullPlate && (
            <span
              className="absolute pointer-events-none"
              style={{ inset: plateInset, border: `0.5px solid ${t.giltMedium}` }}
            />
          )}
          {width >= 110 && (
            <span
              className="absolute pointer-events-none"
              style={{ inset: plateInnerInset, border: `0.5px solid ${t.giltSoft}` }}
            />
          )}
          <div className="relative flex flex-col items-center" style={{ gap: width >= 90 ? 5 : 3 }}>
            {width >= 110 && <PlateRule tone={t} />}
            {showVolumeLabel && (
              <span
                className="font-sans uppercase pt-px"
                style={{
                  fontSize: width >= 110 ? 8 : 7,
                  fontWeight: 800,
                  color: t.giltStrong,
                  letterSpacing: '0.32em'
                }}
              >
                vol. {volume}
              </span>
            )}
            {showVolumeLabel && (
              <span style={{ height: 0.5, width: ruleWidth, backgroundColor: t.giltMedium }} />
            )}
            <span
              className="font-display italic"
              style={{
                fontSize: titleSize,
                fontWeight: 700,
                color: t.giltBright,
                lineHeight: 1,
                letterSpacing: '-0.01em',
                textShadow: '0 1px 0 rgba(0,0,0,0.6)',
                whiteSpace: 'nowrap'
              }}
            >
              {title}
            </span>
            {showTagline && (
              <>
                <span style={{ height: 0.5, width: ruleWidth, backgroundColor: t.giltMedium }} />
                <span
                  className="font-sans italic"
                  style={{ fontSize: 7, color: t.giltStrong, whiteSpace: 'nowrap' }}
                >
                  {tagline}
                </span>
              </>
            )}
            {width >= 110 && <PlateRule tone={t} />}
          </div>
        </div>

        {showFleuron && (
          <>
            <div style={{ height: width >= 90 ? 28 : 16 }}>
              <RaisedBand tone={t} thin={width < 90} />
            </div>
            <div className="relative flex items-center justify-center z-[1]" style={{ padding: '18px 0' }}>
              <Fleuron tone={t} size={fleuronSize} />
            </div>
            <RaisedBand tone={t} thin={width < 90} />
          </>
        )}

        {showImprint && (
          <div
            className="relative z-[1]"
            style={{
              margin: `${showFleuron ? 18 : 24}px ${imprintMargin}px 0`,
              padding: '8px 4px',
              background: t.plate,
              border: `1px solid ${t.giltStrong}`,
              boxShadow: `inset 0 1px 2px ${t.innerShadow}`
            }}
          >
            <div className="flex flex-col items-center" style={{ gap: 1 }}>
              <span
                className="font-sans uppercase"
                style={{ fontSize: 7, fontWeight: 800, color: t.giltStrong, letterSpacing: '0.3em' }}
              >
                {imprint.split(' ')[0]}
              </span>
              {imprint.split(' ').length > 1 && (
                <span
                  className="font-sans uppercase"
                  style={{ fontSize: 6, fontWeight: 600, color: t.giltMedium, letterSpacing: '0.22em' }}
                >
                  {imprint.split(' ').slice(1).join(' ')}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex-1" />

        <RaisedBand tone={t} thin={width < 90} />

        <div className="relative z-[1]" style={{ padding: '8px 0' }}>
          <span
            className="block text-center font-mono"
            style={{
              fontSize: width >= 90 ? 11 : 9,
              fontWeight: 700,
              color: t.giltBright,
              letterSpacing: '0.16em',
              textShadow: '0 1px 0 rgba(0,0,0,0.5)'
            }}
          >
            {sessionNumber}
          </span>
        </div>

        <div className="relative z-[1]" style={{ paddingBottom: 14 }}>
          {width >= 80 && (
            <div className="mb-px" style={{ height: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} />
          )}
          <div style={{ height: 1, backgroundColor: t.giltStrong, boxShadow: '0 1px 0 rgba(0,0,0,0.5)' }} />
          <div style={{ height: innerCapHeight }} />
          <div style={{ height: 1, backgroundColor: t.giltStrong, boxShadow: '0 1px 0 rgba(0,0,0,0.5)' }} />
        </div>
      </div>
    );
  }
);
BookSpine.displayName = 'BookSpine';
