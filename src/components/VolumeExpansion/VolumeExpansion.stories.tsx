import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { VolumeExpansion } from './VolumeExpansion';

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
        overflow: 'hidden', backgroundColor: '#F0EBE2',
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

const meta: Meta<typeof VolumeExpansion> = {
  title: 'Showcase/Volume Expansion',
  component: VolumeExpansion,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, iframeHeight: 920 } }
  },
  argTypes: {
    defaultPresetIndex: { control: { type: 'number', min: 0, max: 4 } },
    headline: { control: 'text' },
    hint: { control: 'text' },
    trackName: { control: 'text' },
    streamingLabel: { control: 'text' },
    interactive: { control: 'boolean' },
    durationWord: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof VolumeExpansion>;

const wrap = (props: React.ComponentProps<typeof VolumeExpansion>) => (
  <FitToViewport>
    <VolumeExpansion {...props} />
  </FitToViewport>
);

export const Default: Story = {
  render: (args) => wrap(args),
  args: { defaultPresetIndex: 1 }
};

export const FortyFive: Story = {
  render: () => wrap({ defaultPresetIndex: 1, trackName: 'Rain on a Tin Roof' })
};

export const Sixty: Story = {
  render: () =>
    wrap({
      defaultPresetIndex: 2,
      headline: 'Make the hour wider than the hour.',
      trackName: 'Late Pacific'
    })
};

export const Ninety: Story = {
  render: () =>
    wrap({
      defaultPresetIndex: 3,
      headline: 'Long enough to lose the world.',
      trackName: 'Slow Tape Loop'
    })
};

export const Twentyfive: Story = {
  render: () =>
    wrap({
      defaultPresetIndex: 0,
      headline: 'A small fire. Tend it.',
      hint: 'Hold to start, release to settle',
      trackName: 'Cedar & Smoke'
    })
};

export const TwoHours: Story = {
  render: () =>
    wrap({
      defaultPresetIndex: 4,
      headline: 'Lock the door. Pull the curtain.',
      trackName: 'Long Wave'
    })
};

export const Static: Story = {
  render: () =>
    wrap({
      defaultPresetIndex: 1,
      interactive: false,
      durationWord: 'forty-five',
      hint: 'Static — no drag interaction'
    })
};
