import type { Meta, StoryObj } from '@storybook/react';
import { DispatchButton } from './DispatchButton';

const meta: Meta<typeof DispatchButton> = {
  title: 'Editorial/Buttons/Dispatch',
  component: DispatchButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'DISPATCH',
    timestamp: '28 APR · 09:14',
    words: ['BEGIN', '0930', '45M'],
    footerLeft: 'XV-2026 / V4.7',
    footerRight: 'CONFIRMED'
  }
};

export default meta;

type Story = StoryObj<typeof DispatchButton>;

export const Default: Story = {};

export const ShortMessage: Story = {
  args: {
    words: ['BEGIN'],
    footerRight: 'STAGED'
  }
};

export const LongMessage: Story = {
  args: {
    words: ['BEGIN', '0930', '45M', 'CEDAR'],
    footerRight: 'QUEUED'
  }
};

export const Stack: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3 p-8">
      <DispatchButton timestamp="28 APR · 08:00" words={['BEGIN', '0800', '30M']} footerRight="CONFIRMED" />
      <DispatchButton timestamp="28 APR · 09:30" words={['BEGIN', '0930', '45M']} footerRight="CONFIRMED" />
      <DispatchButton timestamp="28 APR · 14:00" words={['BEGIN', '1400', '60M']} footerRight="QUEUED" />
    </div>
  )
};
