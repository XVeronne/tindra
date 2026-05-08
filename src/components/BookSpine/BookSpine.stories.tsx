import type { Meta, StoryObj } from '@storybook/react';
import { BookSpine } from './BookSpine';

const meta: Meta<typeof BookSpine> = {
  title: 'Editorial/Cards/Book Spine',
  component: BookSpine,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    tone: {
      control: 'select',
      options: ['oxblood', 'forest', 'tan', 'navy', 'ochre', 'charcoal', 'pine']
    },
    width: { control: { type: 'number', min: 60, max: 200 } },
    height: { control: { type: 'number', min: 200, max: 900 } }
  },
  args: {
    tone: 'oxblood',
    volume: 'IV',
    title: 'Chem.',
    tagline: '— Tuesday window',
    imprint: 'TINDRA · MMXXVI',
    sessionNumber: '142',
    width: 144,
    height: 720
  }
};

export default meta;

type Story = StoryObj<typeof BookSpine>;

export const Default: Story = {};

export const Tones: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="min-h-screen p-12 flex items-end justify-center gap-3 flex-wrap">
      <BookSpine tone="oxblood" title="Chem." volume="IV" sessionNumber="142" />
      <BookSpine tone="forest" title="Bot." volume="V" sessionNumber="143" tagline="— field notes" />
      <BookSpine tone="tan" title="CS." volume="VII" sessionNumber="144" tagline="— compile" />
      <BookSpine tone="navy" title="Hist." volume="III" sessionNumber="145" tagline="— archive" />
      <BookSpine tone="ochre" title="Lit." volume="IX" sessionNumber="146" tagline="— canon" />
      <BookSpine tone="charcoal" title="Phil." volume="XI" sessionNumber="147" tagline="— treatise" />
      <BookSpine tone="pine" title="Math." volume="VI" sessionNumber="148" tagline="— theorem" />
    </div>
  )
};

export const Shelf: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="min-h-screen p-12 flex flex-col gap-12">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-eyebrow font-bold text-clay-deep">shelf · october</span>
        <h2 className="font-display italic text-3xl text-ink">Eight sessions, eight subjects.</h2>
      </div>
      <div className="flex items-end gap-1 border-b border-ink-faint pb-1">
        <BookSpine tone="oxblood" width={140} height={680} title="Chem." volume="IV" sessionNumber="142" />
        <BookSpine tone="navy" width={64} height={460} title="Hist." volume="III" sessionNumber="143" />
        <BookSpine tone="ochre" width={72} height={540} title="Lit." volume="IX" sessionNumber="144" />
        <BookSpine tone="forest" width={56} height={420} title="Bot." volume="V" sessionNumber="145" />
        <BookSpine tone="tan" width={68} height={500} title="CS." volume="VII" sessionNumber="146" />
        <BookSpine tone="charcoal" width={78} height={620} title="Phil." volume="XI" sessionNumber="147" />
        <BookSpine tone="pine" width={48} height={380} title="Math." volume="VI" sessionNumber="148" />
        <BookSpine tone="oxblood" width={42} height={340} title="Lat." volume="II" sessionNumber="149" />
      </div>
    </div>
  )
};

export const HeroLarge: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="min-h-screen p-16 flex items-center gap-16">
      <BookSpine tone="oxblood" width={180} height={820} />
      <div className="flex flex-col gap-3 max-w-md">
        <span className="text-xs uppercase tracking-eyebrow text-clay-deep font-bold">vol. iv · chem.</span>
        <h2 className="font-display italic text-5xl text-ink leading-tight">A pristine Tuesday window.</h2>
        <p className="font-sans text-base text-ink-muted leading-relaxed">
          Forty-five minutes of clean focus, low room noise, and a steady gaze. The session has been bound and shelved.
        </p>
      </div>
    </div>
  )
};
