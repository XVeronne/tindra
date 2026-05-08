import type { Meta, StoryObj } from '@storybook/react';
import { SignatureField } from './SignatureField';

const meta: Meta<typeof SignatureField> = {
  title: 'Editorial/Fields/Signature',
  component: SignatureField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' }
};

export default meta;

type Story = StoryObj<typeof SignatureField>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: 'Veronne' }
};

export const Custom: Story = {
  args: {
    label: 'witnessed by',
    date: '15·OCT·2026',
    place: 'OXFORD',
    defaultValue: 'A. Witness',
    hint: '— attested at the bench'
  }
};
