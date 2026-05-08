import type { Meta, StoryObj } from '@storybook/react';
import { Polaroid } from './Polaroid';

const meta: Meta<typeof Polaroid> = {
  title: 'Editorial/Cards/Polaroid',
  component: Polaroid,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'select', options: ['clay', 'forest', 'pine', 'ochre', 'burgundy', 'navy'] },
    rotate: { control: { type: 'range', min: -8, max: 8, step: 0.5 } },
    clarity: { control: { type: 'range', min: 0, max: 100, step: 1 } }
  }
};

export default meta;

type Story = StoryObj<typeof Polaroid>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-start justify-center gap-12 p-12">
      <Polaroid tone="clay" subject="Chemistry" sessionNumber="142" />
      <Polaroid tone="forest" subject="Botany" clarity={87} sessionNumber="143" rotate={1.5} />
      <Polaroid tone="ochre" subject="Literature" clarity={91} sessionNumber="144" rotate={-3} />
      <Polaroid tone="burgundy" subject="History" clarity={78} sessionNumber="145" rotate={2} />
    </div>
  )
};

export const Stack: Story = {
  render: () => (
    <div className="relative" style={{ width: 320, height: 360 }}>
      <div className="absolute inset-0">
        <Polaroid tone="ochre" subject="Literature" sessionNumber="144" rotate={-6} />
      </div>
      <div className="absolute inset-0" style={{ left: 12, top: 8 }}>
        <Polaroid tone="forest" subject="Botany" sessionNumber="143" rotate={3} />
      </div>
      <div className="absolute inset-0" style={{ left: 20, top: 18 }}>
        <Polaroid tone="clay" subject="Chemistry" sessionNumber="142" rotate={-1.5} />
      </div>
    </div>
  )
};
