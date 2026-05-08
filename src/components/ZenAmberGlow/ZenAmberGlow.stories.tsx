import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ZenAmberGlow } from './ZenAmberGlow';

const computeScale = (baseWidth: number, baseHeight: number) => {
  if (typeof window === 'undefined') return 0.6;
  return Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight, 1);
};

const FitToViewport = ({
  children,
  baseWidth = 1440,
  baseHeight = 900
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
        margin: 0 !important; padding: 0 !important;
        width: 100% !important; height: 100% !important;
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
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        overflow: 'hidden', backgroundColor: '#F4F2EE',
        display: 'grid', placeItems: 'center'
      }}
    >
      <div style={{ width: scaledW, height: scaledH, position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            width: baseWidth, height: baseHeight,
            transform: `scale(${scale})`, transformOrigin: 'top left',
            position: 'absolute', top: 0, left: 0
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof ZenAmberGlow> = {
  title: 'Showcase/Zen Amber Glow',
  component: ZenAmberGlow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, iframeHeight: 920 } }
  },
  argTypes: {
    duration: { control: { type: 'number', min: 5, max: 180, step: 5 } },
    intent: { control: 'text' },
    trackName: { control: 'text' },
    recoveryPct: { control: { type: 'number', min: 0, max: 100 } },
    dailyLoad: { control: 'text' },
    ctaLabel: { control: 'text' },
    flowActive: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<typeof ZenAmberGlow>;

const wrap = (props: React.ComponentProps<typeof ZenAmberGlow>) => (
  <FitToViewport>
    <ZenAmberGlow {...props} />
  </FitToViewport>
);

export const Default: Story = {
  render: (args) => wrap(args)
};

export const StrategyReview: Story = {
  render: () => wrap({
    duration: 45,
    intent: 'Draft final strategy & review notes.',
    trackName: 'Midnight Drift',
    recoveryPct: 82,
    dailyLoad: '2.4h'
  })
};

export const DeepReading: Story = {
  render: () => wrap({
    duration: 90,
    intent: 'Slow read. Mark every margin.',
    trackName: 'Atrium Carceri',
    recoveryPct: 74,
    dailyLoad: '4.1h',
    ctaLabel: 'Begin Reading'
  })
};

export const QuickSprint: Story = {
  render: () => wrap({
    duration: 25,
    intent: 'Inbox to zero. No drifting.',
    trackName: 'Brian Eno · Ambient 1',
    recoveryPct: 91,
    dailyLoad: '0.9h',
    ctaLabel: 'Sprint',
    flowActive: false
  })
};

export const LateNight: Story = {
  render: () => wrap({
    duration: 60,
    intent: 'Finish the second draft and stop.',
    trackName: 'Midnight Drift',
    recoveryPct: 58,
    dailyLoad: '6.7h',
    ctaLabel: 'One More Pass'
  })
};
