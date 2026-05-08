import type { Meta, StoryObj } from '@storybook/react';
import { LedgerField } from './LedgerField';

const meta: Meta<typeof LedgerField> = {
  title: 'Editorial/Fields/Ledger',
  component: LedgerField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' }
};

export default meta;

type Story = StoryObj<typeof LedgerField>;

export const Default: Story = {};

export const Currency: Story = {
  args: {
    label: 'amount',
    formatHint: 'CCY · XX · YY',
    cells: [
      { label: 'usd', value: '12' },
      { label: 'cents', value: '45', active: true },
      { label: 'tip', value: '00' }
    ],
    hint: '≈ 12.45 USD',
    keyboardHint: '↑↓ to adjust'
  }
};

export const TwoCells: Story = {
  args: {
    label: 'date · range',
    formatHint: 'DD · MMM',
    cells: [
      { label: 'day', value: '14', active: true },
      { label: 'mo', value: 'OCT' }
    ],
    hint: '14 OCT 2026',
    keyboardHint: '←→ nav'
  }
};
