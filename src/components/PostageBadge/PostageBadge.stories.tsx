import type { Meta, StoryObj } from '@storybook/react';
import { PostageBadge } from './PostageBadge';

const meta: Meta<typeof PostageBadge> = {
  title: 'Editorial/Marks/Postage',
  component: PostageBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'select', options: ['clay', 'burgundy', 'pine', 'navy', 'ochre', 'ink'] },
    cancelled: { control: 'boolean' },
    size: { control: { type: 'range', min: 60, max: 160 } }
  }
};

export default meta;

type Story = StoryObj<typeof PostageBadge>;

export const Default: Story = {};

export const Cancelled: Story = {
  args: { cancelled: true }
};

export const Pair: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <PostageBadge />
      <PostageBadge cancelled />
    </div>
  )
};

export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap max-w-md">
      <PostageBadge tone="clay" />
      <PostageBadge tone="burgundy" />
      <PostageBadge tone="pine" />
      <PostageBadge tone="navy" />
      <PostageBadge tone="ochre" />
      <PostageBadge tone="ink" />
    </div>
  )
};
