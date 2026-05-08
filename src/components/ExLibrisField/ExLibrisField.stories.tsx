import type { Meta, StoryObj } from '@storybook/react';
import { ExLibrisField } from './ExLibrisField';

const meta: Meta<typeof ExLibrisField> = {
  title: 'Editorial/Fields/Ex Libris',
  component: ExLibrisField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' }
};

export default meta;

type Story = StoryObj<typeof ExLibrisField>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: 'Veronne.' }
};

export const Custom: Story = {
  args: {
    header: 'Property Of',
    volume: 'IX',
    subject: 'LIT',
    stamped: '15·OCT·26',
    defaultValue: 'V. Crun.'
  }
};
