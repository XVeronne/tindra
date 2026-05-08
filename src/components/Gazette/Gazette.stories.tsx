import type { Meta, StoryObj } from '@storybook/react';
import { Gazette } from './Gazette';

const meta: Meta<typeof Gazette> = {
  title: 'Editorial/Cards/Gazette',
  component: Gazette,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    rotate: { control: { type: 'range', min: -6, max: 6, step: 0.5 } }
  }
};

export default meta;

type Story = StoryObj<typeof Gazette>;

export const Default: Story = {};

export const Straight: Story = {
  args: { rotate: 0 }
};

export const Custom: Story = {
  args: {
    masthead: 'The Tindra Review',
    dateline: 'VOL. II · 15 OCT 2026 · NO. 145',
    headline: 'Rain delays the afternoon block.',
    subhead: '— low-light readiness, a strong recovery forecast',
    leftColumn: 'Eye gaze stable. Noise floor elevated by ambient rain. Room temperature 19C.',
    rightColumn: 'Operator advised to read for 30 minutes, then attempt the next session at 16:00.'
  }
};
