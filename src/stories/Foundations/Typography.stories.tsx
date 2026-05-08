import type { Meta, StoryObj } from '@storybook/react';

const Row = ({
  label,
  spec,
  children
}: {
  label: string;
  spec: string;
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 border-b border-hairline py-6">
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">{label}</span>
      <span className="font-mono text-[11px] text-ink-faint leading-relaxed">{spec}</span>
    </div>
    <div className="flex flex-col gap-1">{children}</div>
  </div>
);

const TypeScale = () => (
  <div className="min-h-screen w-full bg-paper">
    <div className="mx-auto max-w-6xl px-12 py-16 flex flex-col gap-16">
      <header className="flex flex-col gap-3 border-b border-hairline pb-6">
        <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
          Foundations
        </span>
        <h1 className="font-display italic text-7xl leading-none text-ink">Typography.</h1>
        <p className="font-sans text-base text-ink-muted max-w-2xl">
          Three typefaces, one role each. Display for emotion, sans for clarity, mono for
          numerics and metadata. Display does most of the heavy lifting at large sizes;
          sans does most of the work everywhere else.
        </p>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="font-display italic text-4xl text-ink mb-4">The stack.</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-md border border-hairline bg-paper-raised p-6 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
              Display
            </span>
            <span className="font-display italic text-5xl leading-none text-ink">Aa</span>
            <span className="font-mono text-[11px] text-ink-faint">
              Fraunces · DM Serif Display
            </span>
            <p className="font-sans text-sm text-ink-muted leading-relaxed">
              Used italic for emotional, editorial moments. Roman is rare.
            </p>
          </div>
          <div className="rounded-md border border-hairline bg-paper-raised p-6 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
              Sans
            </span>
            <span className="font-sans text-5xl leading-none text-ink">Aa</span>
            <span className="font-mono text-[11px] text-ink-faint">Inter · 400—900</span>
            <p className="font-sans text-sm text-ink-muted leading-relaxed">
              Body, UI, eyebrows. The everywhere font. Default for paragraphs.
            </p>
          </div>
          <div className="rounded-md border border-hairline bg-paper-raised p-6 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
              Mono
            </span>
            <span className="font-mono text-5xl leading-none text-ink">Aa</span>
            <span className="font-mono text-[11px] text-ink-faint">JetBrains Mono</span>
            <p className="font-sans text-sm text-ink-muted leading-relaxed">
              Numerics, code, captions, ledger entries.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display italic text-4xl text-ink mb-4">Display scale.</h2>

        <Row label="Hero" spec="font-display italic · 144px / 0.85 / -0.02em">
          <span
            className="font-display italic text-ink"
            style={{ fontSize: 144, lineHeight: 0.85, letterSpacing: '-0.02em' }}
          >
            tindra.
          </span>
        </Row>
        <Row label="Display 1" spec="font-display italic · 96px / 0.9 / -0.02em">
          <span
            className="font-display italic text-ink"
            style={{ fontSize: 96, lineHeight: 0.9, letterSpacing: '-0.02em' }}
          >
            Tuesday.
          </span>
        </Row>
        <Row label="Display 2" spec="font-display italic · 64px / 1 / -0.01em">
          <span
            className="font-display italic text-ink"
            style={{ fontSize: 64, lineHeight: 1, letterSpacing: '-0.01em' }}
          >
            Draft strategy.
          </span>
        </Row>
        <Row label="Headline" spec="font-display italic · 36px / 1.1">
          <span className="font-display italic text-ink" style={{ fontSize: 36, lineHeight: 1.1 }}>
            What is the focus objective?
          </span>
        </Row>
        <Row label="Title" spec="font-display italic · 24px / 1.2">
          <span className="font-display italic text-ink" style={{ fontSize: 24, lineHeight: 1.2 }}>
            A small fire. Tend it.
          </span>
        </Row>
      </section>

      <section>
        <h2 className="font-display italic text-4xl text-ink mb-4">Body & UI.</h2>

        <Row label="Body lg" spec="font-sans · 18px / 1.5">
          <p className="font-sans text-ink" style={{ fontSize: 18, lineHeight: 1.5 }}>
            Long-form reading. Calm, legible, neutral. Paragraphs flow at this size with
            generous line-height for editorial cadence.
          </p>
        </Row>
        <Row label="Body" spec="font-sans · 16px / 1.5">
          <p className="font-sans text-ink-muted" style={{ fontSize: 16, lineHeight: 1.5 }}>
            The default body. UI surfaces, prose, descriptions. Ink-muted at 16 reads cleanly
            against paper.
          </p>
        </Row>
        <Row label="Caption" spec="font-sans · 13px / 1.4">
          <p className="font-sans text-ink-muted" style={{ fontSize: 13, lineHeight: 1.4 }}>
            Caption, helper text, secondary labels.
          </p>
        </Row>
        <Row label="Eyebrow" spec="font-sans bold uppercase · 10px / 0.18em tracking">
          <span className="text-[10px] uppercase tracking-eyebrow font-bold text-ink-muted">
            Section / Eyebrow
          </span>
        </Row>
      </section>

      <section>
        <h2 className="font-display italic text-4xl text-ink mb-4">Mono & numerics.</h2>

        <Row label="Mono lg" spec="font-mono medium · 24px / 1.2 · tabular">
          <span
            className="font-mono font-medium text-ink"
            style={{ fontSize: 24, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}
          >
            10:14 / 142.847
          </span>
        </Row>
        <Row label="Mono md" spec="font-mono · 14px / 1.4">
          <span className="font-mono text-ink" style={{ fontSize: 14, lineHeight: 1.4 }}>
            COGNITIVE OUTPUT // VOL. XI · NO. 142
          </span>
        </Row>
        <Row label="Mono sm" spec="font-mono · 11px / 1.4 · 0.04em tracking">
          <span
            className="font-mono text-ink-muted"
            style={{ fontSize: 11, letterSpacing: '0.04em', lineHeight: 1.4 }}
          >
            const focus = await session.begin({'{ '}duration: 45{' }'});
          </span>
        </Row>
      </section>
    </div>
  </div>
);

const meta: Meta<typeof TypeScale> = {
  title: 'Foundations/Typography',
  component: TypeScale,
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const Scale: StoryObj<typeof TypeScale> = {};
