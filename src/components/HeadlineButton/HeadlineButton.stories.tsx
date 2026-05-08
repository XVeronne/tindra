import type { Meta, StoryObj } from '@storybook/react';
import { HeadlineButton } from './HeadlineButton';

const meta: Meta<typeof HeadlineButton> = {
  title: 'Editorial/Buttons/Headline',
  component: HeadlineButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'Begin.' }
};

export default meta;

type Story = StoryObj<typeof HeadlineButton>;

export const Default: Story = {};

export const InContext: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="min-h-screen w-full p-16 flex flex-col gap-12">
      <p className="text-xs uppercase tracking-eyebrow text-clay-deep font-bold">pre-session reading</p>
      <p className="font-display italic font-medium text-5xl leading-tight max-w-md text-ink">
        Begin while the window is clean.
      </p>
      <div className="flex items-baseline gap-16">
        <HeadlineButton>Begin.</HeadlineButton>
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-xs text-ink-faint tracking-wider">09:30</span>
          <span className="text-[10px] uppercase tracking-eyebrow text-ink-faint font-semibold">staged</span>
        </div>
      </div>
    </div>
  )
};

export const Variations: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-10 p-8">
      <HeadlineButton>Begin.</HeadlineButton>
      <HeadlineButton>Resume reading.</HeadlineButton>
      <HeadlineButton>Open chapter four.</HeadlineButton>
    </div>
  )
};
