import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PreSession } from './PreSession';

const computeScale = (baseWidth: number, baseHeight: number) => {
  if (typeof window === 'undefined') return 0.6;
  return Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight, 1);
};

const FitToViewport = ({
  children,
  baseWidth = 1920,
  baseHeight = 1080
}: {
  children: React.ReactNode;
  baseWidth?: number;
  baseHeight?: number;
}) => {
  const [scale, setScale] = React.useState(() => computeScale(baseWidth, baseHeight));

  React.useLayoutEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      html, body, #storybook-root, #root {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(styleEl);

    const update = () => setScale(computeScale(baseWidth, baseHeight));
    update();
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
      styleEl.remove();
    };
  }, [baseWidth, baseHeight]);

  const scaledW = baseWidth * scale;
  const scaledH = baseHeight * scale;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'rgb(242 235 221)',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <div style={{ width: scaledW, height: scaledH, position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            width: baseWidth,
            height: baseHeight,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof PreSession> = {
  title: 'Showcase/Pre-Session',
  component: PreSession,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, iframeHeight: 1100 } }
  },
  argTypes: {
    weekday: { control: 'text' },
    intakeTime: { control: 'text' },
    date: { control: 'text' },
    sessionLabel: { control: 'text' },
    tagline: { control: 'text' },
    duration: { control: { type: 'number', min: 5, max: 180, step: 5 } },
    trackTitle: { control: 'text' },
    trackArtist: { control: 'text' },
    trackAlbum: { control: 'text' },
    trackQuote: { control: 'text' },
    brandMark: { control: 'text' },
    brandWord: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof PreSession>;

export const Default: Story = {
  render: (args) => (
    <FitToViewport>
      <PreSession {...args} />
    </FitToViewport>
  )
};

export const TuesdayMorning: Story = {
  render: () => (
    <FitToViewport>
      <PreSession
        weekday="Tuesday."
        intakeTime="10:14"
        date="Tuesday · Apr 15"
        sessionLabel="Sess. 142"
        duration={45}
      />
    </FitToViewport>
  )
};

export const FridayFlow: Story = {
  render: () => (
    <FitToViewport>
      <PreSession
        weekday="Friday."
        intakeTime="14:02"
        date="Friday · Apr 18"
        sessionLabel="Sess. 145"
        tagline="The week is winding down. Pick one thing worth finishing."
        duration={120}
        trackTitle="Spiegel im Spiegel"
        trackArtist="Arvo Pärt"
        trackAlbum="Alina"
        trackQuote="quietude before the long weekend"
        metrics={[
          { label: 'Streak', value: '11 days', caption: 'Personal best' },
          { label: 'Hours this week', value: '21h 05m', caption: '+4h vs last' },
          { label: 'Distraction budget', value: '2 left', caption: '7/day limit' },
          { label: 'Peak window', value: '13:30 — 15:30', caption: 'Based on 30d' }
        ]}
      />
    </FitToViewport>
  )
};

export const SundayWriting: Story = {
  render: () => (
    <FitToViewport>
      <PreSession
        weekday="Sunday."
        intakeTime="09:02"
        date="Sunday · Apr 20"
        sessionLabel="Sess. 148"
        tagline="A clean morning. Hand me one essay and I’ll keep the room still."
        duration={60}
        trackTitle="Avril 14th"
        trackArtist="Aphex Twin"
        trackAlbum="Drukqs"
        trackQuote="a small piano for a small room"
      />
    </FitToViewport>
  )
};

export const MidweekDeep: Story = {
  render: () => (
    <FitToViewport>
      <PreSession
        weekday="Wednesday."
        intakeTime="08:40"
        date="Wednesday · Apr 16"
        sessionLabel="Sess. 143"
        tagline="Three quiet hours before any meeting. What is the one piece of work?"
        duration={90}
        metrics={[
          { label: 'Streak', value: '8 days', caption: 'Unbroken' },
          { label: 'Hours this week', value: '14h 22m', caption: '+1h vs last' },
          { label: 'Distraction budget', value: '6 left', caption: '7/day limit' },
          { label: 'Peak window', value: '08:30 — 10:30', caption: 'Based on 30d' }
        ]}
      />
    </FitToViewport>
  )
};
