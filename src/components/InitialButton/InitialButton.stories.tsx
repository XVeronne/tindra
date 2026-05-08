import type { Meta, StoryObj } from '@storybook/react';
import { InitialButton } from './InitialButton';

const meta: Meta<typeof InitialButton> = {
  title: 'Editorial/Buttons/Initial',
  component: InitialButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Begin.',
    atValue: '09:30',
    annotation: 'deep flow window'
  }
};

export default meta;

type Story = StoryObj<typeof InitialButton>;

export const Default: Story = {};

export const Bare: Story = {
  args: { atValue: undefined, annotation: undefined }
};

export const Variations: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6 p-8">
      <InitialButton atValue="09:30" annotation="deep flow">
        Begin.
      </InitialButton>
      <InitialButton atValue="14:00" annotation="review window">
        Resume.
      </InitialButton>
      <InitialButton atValue="tomorrow" annotation="when you are ready">
        Continue.
      </InitialButton>
    </div>
  )
};
