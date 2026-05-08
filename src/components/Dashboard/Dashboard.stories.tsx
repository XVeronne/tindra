import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './Dashboard';

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
        backgroundColor: '#FDFBF7',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <div
        style={{
          width: scaledW,
          height: scaledH,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
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

const meta: Meta<typeof Dashboard> = {
  title: 'Showcase/Weekly Report',
  component: Dashboard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        iframeHeight: 920
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  render: () => (
    <FitToViewport>
      <Dashboard />
    </FitToViewport>
  )
};
