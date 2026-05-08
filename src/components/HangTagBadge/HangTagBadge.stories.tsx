import type { Meta, StoryObj } from '@storybook/react';
import { HangTagBadge } from './HangTagBadge';

const meta: Meta<typeof HangTagBadge> = {
  title: 'Editorial/Marks/Hang Tag',
  component: HangTagBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'select', options: ['clay', 'pine', 'ochre', 'burgundy', 'ink'] },
    rotate: { control: { type: 'range', min: -10, max: 10, step: 0.5 } },
    showString: { control: 'boolean' }
  }
};

export default meta;

type Story = StoryObj<typeof HangTagBadge>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex items-start gap-6 pt-6">
      <HangTagBadge tone="clay" eyebrow="window" value="45m" qualifier="deep flow" rotate={-3} />
      <HangTagBadge tone="pine" eyebrow="subject" value="CHEM" qualifier="04 of 12" rotate={2} />
      <HangTagBadge tone="ochre" eyebrow="streak" value="7d" qualifier="strong" rotate={-1.5} />
      <HangTagBadge tone="burgundy" eyebrow="status" value="VOID" qualifier="re-do" rotate={3} />
      <HangTagBadge tone="ink" eyebrow="archive" value="142" qualifier="oct 14" rotate={-2} />
    </div>
  )
};
