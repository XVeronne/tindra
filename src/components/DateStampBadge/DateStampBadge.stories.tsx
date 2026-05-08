import type { Meta, StoryObj } from '@storybook/react';
import { DateStampBadge } from './DateStampBadge';

const meta: Meta<typeof DateStampBadge> = {
  title: 'Editorial/Marks/Date Stamp',
  component: DateStampBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'select', options: ['ink', 'clay', 'pine', 'burgundy'] },
    size: { control: { type: 'range', min: 60, max: 160 } }
  }
};

export default meta;

type Story = StoryObj<typeof DateStampBadge>;

export const Default: Story = {};

export const Session: Story = {
  args: {
    tone: 'clay',
    label: 'SESSION',
    value: '142',
    subValue: undefined
  }
};

export const Pair: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <DateStampBadge label="RECEIVED" value="14 OCT" subValue="2026" />
      <DateStampBadge tone="clay" label="SESSION" value="142" subValue={undefined} />
    </div>
  )
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-4 flex-wrap">
      <DateStampBadge tone="ink" />
      <DateStampBadge tone="clay" label="SESSION" value="142" subValue={undefined} />
      <DateStampBadge tone="pine" label="ARCHIVED" value="14 OCT" subValue="2026" />
      <DateStampBadge tone="burgundy" label="VOID" value="0 / 0" subValue={undefined} />
    </div>
  )
};
