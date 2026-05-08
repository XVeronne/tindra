import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TactileObject } from './TactileObject';

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
        backgroundColor: 'rgb(234 224 205)',
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

const meta: Meta<typeof TactileObject> = {
  title: 'Showcase/Tactile Object',
  component: TactileObject,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, iframeHeight: 920 } }
  },
  argTypes: {
    objective: { control: 'text' },
    modelLabel: { control: 'text' },
    ctaLabel: { control: 'text' },
    defaultDurationIndex: { control: { type: 'number', min: 0, max: 3 } },
    defaultStatusIndex: { control: { type: 'number', min: 0, max: 2 } }
  }
};

export default meta;

type Story = StoryObj<typeof TactileObject>;

export const Default: Story = {
  render: (args) => (
    <FitToViewport>
      <TactileObject {...args} />
    </FitToViewport>
  )
};

export const DraftStrategy: Story = {
  render: () => (
    <FitToViewport>
      <TactileObject
        objective="Draft strategy."
        modelLabel="Tindra Mk I"
        defaultDurationIndex={0}
        defaultStatusIndex={0}
      />
    </FitToViewport>
  )
};

export const DeepReadingHour: Story = {
  render: () => (
    <FitToViewport>
      <TactileObject
        objective="Read closely."
        modelLabel="Tindra Mk I"
        defaultDurationIndex={2}
        defaultStatusIndex={1}
        ctaLabel="Begin Reading"
      />
    </FitToViewport>
  )
};

export const InfiniteSession: Story = {
  render: () => (
    <FitToViewport>
      <TactileObject
        objective="Until it's done."
        modelLabel="Tindra Mk I"
        defaultDurationIndex={3}
        defaultStatusIndex={2}
        ctaLabel="Hold Focus"
      />
    </FitToViewport>
  )
};

export const QuickWriting: Story = {
  render: () => (
    <FitToViewport>
      <TactileObject
        objective="Write the first draft."
        modelLabel="Tindra Mk I"
        defaultDurationIndex={1}
        defaultStatusIndex={0}
        ctaLabel="Start Writing"
      />
    </FitToViewport>
  )
};
