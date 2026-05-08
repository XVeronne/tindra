import type { Meta, StoryObj } from '@storybook/react';

const Swatch = ({
  name,
  token,
  className,
  inverted = false
}: {
  name: string;
  token: string;
  className: string;
  inverted?: boolean;
}) => (
  <div
    className={`flex flex-col justify-between rounded-md p-4 h-32 ${className} border border-hairline`}
  >
    <span
      className={`text-[10px] uppercase tracking-eyebrow font-bold ${
        inverted ? 'text-paper' : 'text-ink'
      }`}
    >
      {name}
    </span>
    <span
      className={`font-mono text-[10px] ${
        inverted ? 'text-paper/70' : 'text-ink-muted'
      }`}
    >
      {token}
    </span>
  </div>
);

const Section = ({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <h3 className="font-display italic text-2xl text-ink">{title}</h3>
      {description && (
        <p className="font-sans text-sm text-ink-muted max-w-prose">{description}</p>
      )}
    </div>
    {children}
  </section>
);

const Palette = () => (
  <div className="min-h-screen w-full bg-paper">
    <div className="mx-auto max-w-6xl px-12 py-16 flex flex-col gap-16">
      <header className="flex flex-col gap-3 border-b border-hairline pb-6">
        <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
          Foundations
        </span>
        <h1 className="font-display italic text-7xl leading-none text-ink">Color.</h1>
        <p className="font-sans text-base text-ink-muted max-w-2xl">
          Tokens are named for their role in a scene: paper for the ground, ink for the writing,
          clay and moss for warmth and life. Every value is a CSS variable so light and dark mode
          swap with a single class on the root.
        </p>
      </header>

      <Section
        title="Paper"
        description="Three shades of the cream ground, plus the hairline used for dividers and faint borders."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Swatch name="Paper" token="bg-paper" className="bg-paper" />
          <Swatch name="Paper raised" token="bg-paper-raised" className="bg-paper-raised" />
          <Swatch name="Paper sunken" token="bg-paper-sunken" className="bg-paper-sunken" />
          <Swatch name="Hairline" token="bg-hairline" className="bg-hairline" />
        </div>
      </Section>

      <Section
        title="Ink"
        description="Three contrast levels. Use ink for body, ink-muted for supporting copy, ink-faint for the quietest captions and metadata."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Swatch name="Ink" token="bg-ink" className="bg-ink" inverted />
          <Swatch name="Ink muted" token="bg-ink-muted" className="bg-ink-muted" inverted />
          <Swatch name="Ink faint" token="bg-ink-faint" className="bg-ink-faint" inverted />
        </div>
      </Section>

      <Section
        title="Clay"
        description="The warm primary. Used for primary buttons, accents, focus pins, and any moment that should feel like sun-warmed terracotta."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Swatch name="Clay" token="bg-clay" className="bg-clay" inverted />
          <Swatch name="Clay deep" token="bg-clay-deep" className="bg-clay-deep" inverted />
          <Swatch name="Clay soft" token="bg-clay-soft" className="bg-clay-soft" />
        </div>
      </Section>

      <Section
        title="Moss"
        description="The calm secondary. Reserved for live indicators, success states, and quiet positive feedback."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Swatch name="Moss" token="bg-moss" className="bg-moss" inverted />
          <Swatch name="Moss deep" token="bg-moss-deep" className="bg-moss-deep" inverted />
          <Swatch name="Moss soft" token="bg-moss-soft" className="bg-moss-soft" />
        </div>
      </Section>

      <Section
        title="Editorial accents"
        description="Three deeper hues for editorial moments — book covers, ledger marks, archival captions. Use sparingly."
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Swatch name="Burgundy" token="bg-burgundy" className="bg-burgundy" inverted />
          <Swatch name="Pine" token="bg-pine" className="bg-pine" inverted />
          <Swatch name="Ochre" token="bg-ochre" className="bg-ochre" inverted />
        </div>
      </Section>

      <Section
        title="Theme"
        description="Toggle Light / Dark in the Storybook toolbar. Every token swaps via the .dark class on the root."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-hairline bg-paper p-6 flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-eyebrow font-bold text-ink-muted">
              Light
            </span>
            <p className="font-display italic text-4xl text-ink leading-tight">
              A clear morning desk.
            </p>
            <p className="font-sans text-sm text-ink-muted">
              Cream ground, warm ink, terracotta moments.
            </p>
          </div>
          <div className="dark rounded-md border border-hairline bg-paper p-6 flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-eyebrow font-bold text-ink-muted">
              Dark
            </span>
            <p className="font-display italic text-4xl text-ink leading-tight">
              The lamp at midnight.
            </p>
            <p className="font-sans text-sm text-ink-muted">
              Same scene, lit differently.
            </p>
          </div>
        </div>
      </Section>
    </div>
  </div>
);

const meta: Meta<typeof Palette> = {
  title: 'Foundations/Color',
  component: Palette,
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const Palette_: StoryObj<typeof Palette> = { name: 'Palette' };
