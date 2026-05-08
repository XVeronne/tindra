import type { Meta, StoryObj } from '@storybook/react';
import { MarginButton } from './MarginButton';

const meta: Meta<typeof MarginButton> = {
  title: 'Editorial/Buttons/Margin',
  component: MarginButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Begin',
    eyebrow: 'action',
    meta: '09:30',
    annotation: 'a 45 minute window'
  }
};

export default meta;

type Story = StoryObj<typeof MarginButton>;

export const Default: Story = {};

export const Bare: Story = {
  args: { meta: undefined, annotation: undefined }
};

export const Variations: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8 p-8">
      <MarginButton eyebrow="action" meta="09:30" annotation="deep flow window">
        Begin
      </MarginButton>
      <MarginButton eyebrow="reply" annotation="thirty seconds">
        Send
      </MarginButton>
      <MarginButton eyebrow="confirm" meta="all set">
        Continue
      </MarginButton>
    </div>
  )
};
