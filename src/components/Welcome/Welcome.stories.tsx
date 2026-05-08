import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const ShowcaseTile = ({
  title,
  caption,
  href,
  preview,
  featured = false
}: {
  title: string;
  caption: string;
  href: string;
  preview: React.ReactNode;
  featured?: boolean;
}) => (
  <a
    href={href}
    className={`group relative flex flex-col overflow-hidden rounded-md border border-hairline bg-paper-raised transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(26,20,16,0.12)] ${
      featured ? 'md:col-span-2' : ''
    }`}
  >
    <div className={`relative overflow-hidden bg-paper-sunken ${featured ? 'h-72' : 'h-44'}`}>
      {preview}
    </div>
    <div className="flex flex-col gap-1.5 px-5 py-4 border-t border-hairline">
      <span className="text-[10px] uppercase tracking-eyebrow text-ink-faint font-bold">
        Showcase
      </span>
      <span
        className={`font-display italic leading-tight text-ink ${featured ? 'text-3xl' : 'text-2xl'}`}
      >
        {title}
      </span>
      <span className="font-sans text-sm text-ink-muted leading-snug">{caption}</span>
    </div>
    <span className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full border border-hairline bg-paper-raised text-ink-muted transition-all group-hover:bg-ink group-hover:text-paper">
      →
    </span>
  </a>
);

const StatBlock = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col gap-1">
    <span className="font-display italic text-4xl leading-none text-ink">{value}</span>
    <span className="text-[10px] uppercase tracking-eyebrow text-ink-faint font-bold">{label}</span>
  </div>
);

const StackChip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-hairline bg-paper-raised px-3 py-1 font-mono text-xs text-ink-muted">
    {children}
  </span>
);

const TacticleSilhouette = () => (
  <div className="relative h-full w-full grid place-items-center">
    <div
      className="rounded-sm bg-paper-raised"
      style={{
        width: 200,
        height: 120,
        boxShadow:
          'inset 0 2px 2px rgba(255,255,255,0.9), inset 0 -2px 3px rgba(26,20,16,0.10), 0 12px 24px rgba(26,20,16,0.10)'
      }}
    >
      <div className="flex h-full items-center justify-center gap-2">
        <div className="h-12 w-12 rounded-full bg-paper-sunken" />
        <div className="rounded-sm bg-ink px-4 py-2">
          <span className="font-mono text-[8px] uppercase tracking-eyebrow text-paper">begin</span>
        </div>
      </div>
    </div>
  </div>
);

const VolumeSilhouette = () => (
  <div className="relative h-full w-full overflow-hidden bg-paper-sunken">
    <div
      className="absolute -right-12 -top-12 h-56 w-56"
      style={{
        backgroundColor: '#FF4500',
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
      }}
    />
    <div className="absolute bottom-3 left-4 flex items-center gap-2">
      <div className="h-7 w-7 rounded-full bg-[#FF4500]" />
      <span className="font-mono text-[9px] uppercase tracking-eyebrow text-ink-muted">
        forty-five
      </span>
    </div>
  </div>
);

const WeeklyReportSilhouette = () => (
  <div className="relative h-full w-full overflow-hidden bg-paper-sunken">
    <span
      className="absolute font-sans font-extrabold text-ink/[0.06] select-none pointer-events-none leading-[0.8] tracking-tighter"
      style={{ fontSize: 110, top: -16, right: -14, textAlign: 'right' }}
    >
      W
      <br />
      K<br />
      L
      <br />Y
    </span>
    <div className="absolute left-5 top-5 flex flex-col gap-0.5">
      <span className="text-[8px] uppercase tracking-eyebrow text-clay-deep font-bold">
        Cognitive Output
      </span>
      <span
        className="font-display italic text-ink leading-none"
        style={{ fontSize: 36, letterSpacing: '-0.02em' }}
      >
        47h 22m
      </span>
    </div>
    <div className="absolute right-5 bottom-5 flex items-end gap-1">
      {[
        { tone: 'bg-burgundy', h: 60, w: 18 },
        { tone: 'bg-pine', h: 54, w: 12 },
        { tone: 'bg-ochre', h: 46, w: 10 },
        { tone: 'bg-clay', h: 64, w: 22 },
        { tone: 'bg-moss', h: 56, w: 14 }
      ].map((s, i) => (
        <span
          key={i}
          className={`block ${s.tone} rounded-[1px]`}
          style={{ width: s.w, height: s.h }}
        />
      ))}
    </div>
  </div>
);

const PreSessionSilhouette = () => (
  <div className="relative h-full w-full overflow-hidden">
    <div
      className="absolute -right-16 -top-20 h-72 w-72 rounded-full opacity-90"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(232,200,170,0.95) 0%, rgba(216,153,112,0.6) 35%, rgba(200,120,40,0.2) 70%)'
      }}
    />
    <span
      aria-hidden
      className="absolute font-display italic text-ink/[0.07] select-none pointer-events-none leading-none"
      style={{ fontSize: 220, top: -40, left: '50%', transform: 'translateX(-50%)' }}
    >
      T
    </span>
    <div className="absolute left-8 bottom-8 flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-eyebrow text-ink-faint font-bold">
        Session Intake · 10:14
      </span>
      <span className="font-display italic text-ink leading-none" style={{ fontSize: 56 }}>
        Tuesday.
      </span>
    </div>
    <div className="absolute right-8 top-8 flex flex-col items-end gap-0">
      <span className="text-[9px] uppercase tracking-eyebrow text-ink font-bold">
        Pre-Session Ritual
      </span>
      <span className="font-display italic text-ink" style={{ fontSize: 22 }}>
        tindra
      </span>
    </div>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3">
      <span
        className="rounded-full bg-paper-raised"
        style={{
          width: 22,
          height: 38,
          boxShadow: '0 0 18px rgba(232,188,145,0.6), 0 0 36px rgba(200,120,40,0.3)'
        }}
      />
      <span
        className="rounded-full bg-paper-raised"
        style={{
          width: 22,
          height: 38,
          boxShadow: '0 0 18px rgba(232,188,145,0.6), 0 0 36px rgba(200,120,40,0.3)'
        }}
      />
    </div>
  </div>
);

const ZenSilhouette = () => (
  <div className="relative h-full w-full grid place-items-center">
    <div
      className="absolute h-44 w-44 rounded-full"
      style={{
        background: 'conic-gradient(from 0deg, #FF6B00 0%, #FF6B00 50%, transparent 100%)',
        filter: 'blur(20px)',
        opacity: 0.4
      }}
    />
    <div
      className="relative h-20 w-20 rounded-full grid place-items-center"
      style={{ backgroundColor: '#2A2420' }}
    >
      <div className="flex gap-1.5">
        <span className="h-5 w-3 rounded-md bg-paper-raised" />
        <span className="h-5 w-3 rounded-md bg-paper-raised" />
      </div>
    </div>
    <span
      className="absolute h-2 w-2 rounded-full"
      style={{
        backgroundColor: '#FF6B00',
        boxShadow: '0 0 12px #FF6B00',
        top: '24%',
        right: '34%'
      }}
    />
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <span className="mt-2 h-1 w-3 rounded-full bg-clay shrink-0" aria-hidden />
    <span className="font-sans text-ink-muted leading-relaxed">{children}</span>
  </li>
);

const Welcome = () => (
  <div className="min-h-screen w-full bg-paper">
    <div className="mx-auto max-w-6xl px-12 py-20 flex flex-col gap-24">
      {/* hero */}
      <header className="flex flex-col gap-6">
        <div className="flex items-baseline justify-between border-b border-hairline pb-4">
          <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
            Component Library · Portfolio
          </span>
          <span className="font-mono text-xs text-ink-faint">v0 · MIT · 2026</span>
        </div>
        <h1 className="font-display italic font-medium text-[160px] leading-[0.85] tracking-tight text-ink">
          tindra.
        </h1>
        <p className="font-display italic text-3xl text-ink-muted max-w-3xl leading-tight">
          The public visual layer of <span className="text-ink not-italic font-sans font-semibold">Wiinky</span>
          {' '}— a private Electron app for smart study, eye-tracking and adaptive Pomodoro.
          Stripped to the design system so it can be reviewed openly.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <StackChip>React 18</StackChip>
          <StackChip>TypeScript 5</StackChip>
          <StackChip>Tailwind v3</StackChip>
          <StackChip>Storybook 8</StackChip>
          <StackChip>cva</StackChip>
          <StackChip>Vite</StackChip>
        </div>
      </header>

      {/* the pitch */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 border-y border-hairline py-12">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
            About
          </span>
          <h2 className="font-display italic text-5xl leading-[0.95] text-ink">
            What is tindra?
          </h2>
        </div>
        <div className="flex flex-col gap-6 font-sans text-base text-ink leading-relaxed">
          <p>
            <em className="font-display italic">tindra</em> (Swedish: <em>to twinkle, to glow</em>) is the
            public, MIT-licensed component library extracted from <strong>Wiinky</strong> —
            a closed-source Electron desktop application I'm building for smart study scheduling
            and focus tracking.
          </p>
          <p>
            Wiinky combines a MediaPipe FaceLandmarker eye-tracker running in the renderer
            (~15 fps, no IPC hop), a TensorFlow.js focus-prediction model, Google Calendar /
            CalDAV integration, and an adaptive Pomodoro engine. The product is private. The
            front-end is good enough that I wanted it reviewable — so I lifted just the visual
            layer out, retuned the warm palette, removed every reference to ML / eye-tracking /
            Electron / OAuth, and shipped it as <em className="font-display italic">tindra</em>.
          </p>
          <p>
            Same language, no plumbing. What you see in the Showcase folder are the
            real screens from Wiinky — drop-in React components, zero proprietary logic.
          </p>
        </div>
      </section>

      {/* stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-12">
        <StatBlock value="19" label="Components" />
        <StatBlock value="5" label="Full showcases" />
        <StatBlock value="50+" label="Stories" />
        <StatBlock value="16" label="Design tokens" />
      </section>

      {/* showcase grid */}
      <section className="flex flex-col gap-8">
        <div className="flex items-baseline justify-between border-b border-hairline pb-4">
          <h2 className="font-display italic text-4xl text-ink">Highlights.</h2>
          <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
            Open Showcase for the full set
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ShowcaseTile
            featured
            href="?path=/story/showcase-pre-session--default"
            title="Pre-Session Ritual"
            caption="1920×1080 composed dashboard. Ten interactive modules around a canvas-based slime mascot with 80-point spring physics, an animated music widget, and a draggable duration picker."
            preview={<PreSessionSilhouette />}
          />
          <ShowcaseTile
            href="?path=/story/showcase-weekly-report--default"
            title="Weekly Report"
            caption="Animated weekly summary: bookshelf with selectable spines, count-up stats, subject breakdown, and a quiet observer mascot in the corner."
            preview={<WeeklyReportSilhouette />}
          />
          <ShowcaseTile
            href="?path=/story/showcase-tactile-object--default"
            title="Tactile Object"
            caption="Pre-session focus device with a draggable rotary dial, tap-to-cycle presets, and warm inset shadows."
            preview={<TacticleSilhouette />}
          />
          <ShowcaseTile
            href="?path=/story/showcase-zen-amber-glow--default"
            title="Zen Amber Glow"
            caption="Floating mascot, dual counter-orbiting indicators with a comet trail, count-up recovery score, shimmering CTA."
            preview={<ZenSilhouette />}
          />
          <ShowcaseTile
            href="?path=/story/showcase-volume-expansion--default"
            title="Volume Expansion"
            caption="Drag the play disc outward to grow the orange organic blob and cycle 25 → 120 minute presets. Word swaps with a fade."
            preview={<VolumeSilhouette />}
          />
        </div>
      </section>

      {/* what this demonstrates */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 border-t border-hairline pt-12">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
            Why this is here
          </span>
          <h2 className="font-display italic text-5xl leading-[0.95] text-ink">
            What it shows.
          </h2>
        </div>
        <ul className="flex flex-col gap-3 list-none p-0">
          <Bullet>
            <strong>Token-driven theming.</strong> Every color is a CSS variable, every
            component reads through Tailwind utilities, light/dark is one class on the root.
            See <code className="font-mono text-xs">Foundations / Color</code>.
          </Bullet>
          <Bullet>
            <strong>Composition over configuration.</strong>{' '}
            <code className="font-mono text-xs">Card</code> exposes Header / Eyebrow / Title /
            Body / Footer subcomponents; <code className="font-mono text-xs">Button</code> uses
            cva variants; everything is forward-ref'd and accepts <code>className</code> for
            override.
          </Bullet>
          <Bullet>
            <strong>Motion as a first-class primitive.</strong> Canvas-based spring physics
            (Slime Orb), organic SVG morph (Volume Expansion), staggered count-ups, micro
            saccades, ripple rings, and pointer-driven drag rotation (Tactile Object dial,
            Volume Expansion play disc).
          </Bullet>
          <Bullet>
            <strong>Editorial taste applied to product surfaces.</strong> Postage marks, ledger
            fields, hang-tag annotations, signature lines, book spines — chrome that signals a
            human made each screen.
          </Bullet>
          <Bullet>
            <strong>Production tooling.</strong> Vite build, TypeScript strict, Storybook 8 with
            autodocs, type-checked stories, MIT-licensed and deployable to GitHub Pages.
          </Bullet>
          <Bullet>
            <strong>Real screens, not toy demos.</strong> The Showcase folder holds five
            full-resolution compositions lifted from a working product. They scale via
            FitToViewport so they read at any window size.
          </Bullet>
        </ul>
      </section>

      {/* foundations preview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-hairline pt-16">
        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
            Foundations / Color
          </span>
          <h3 className="font-display italic text-4xl text-ink">A scene, not a swatch grid.</h3>
          <p className="font-sans text-sm text-ink-muted leading-relaxed max-w-md">
            Every token is named for the role it plays — paper, ink, clay, moss — so colors
            stay coherent across components and themes. Light and dark mode are a single class
            flip on the root.
          </p>
          <a
            href="?path=/story/foundations-color--palette"
            className="inline-flex items-center gap-2 text-sm font-bold text-clay-deep hover:text-clay"
          >
            Open the palette →
          </a>
        </div>
        <div className="grid grid-cols-3 gap-3 self-end">
          <div className="aspect-square rounded-md bg-paper-raised border border-hairline" />
          <div className="aspect-square rounded-md bg-clay" />
          <div className="aspect-square rounded-md bg-moss" />
          <div className="aspect-square rounded-md bg-ink" />
          <div className="aspect-square rounded-md bg-burgundy" />
          <div className="aspect-square rounded-md bg-ochre" />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-3">
          <p className="font-display italic text-7xl leading-[0.9] text-ink">Editorial type.</p>
          <p className="font-sans text-base text-ink-muted">
            Fraunces for display italic, Inter for UI, JetBrains Mono for code and numerics.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-eyebrow text-ink-muted font-bold">
            Foundations / Typography
          </span>
          <a
            href="?path=/story/foundations-typography--scale"
            className="inline-flex items-center gap-2 text-sm font-bold text-clay-deep hover:text-clay"
          >
            See the type scale →
          </a>
        </div>
      </section>

      {/* signoff */}
      <footer className="border-t border-hairline pt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-eyebrow text-ink-faint font-bold">
            About the work
          </span>
          <p className="font-sans text-sm text-ink-muted leading-relaxed max-w-prose">
            tindra is what the Wiinky front-end looks like with the engine taken out. If
            you're hiring for a front-end role and want to see how I think about composition,
            tokens, motion and editorial detail at the same time, this is the surface area to
            evaluate.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <span className="text-xs uppercase tracking-eyebrow text-ink-faint font-bold">
            Built by
          </span>
          <p className="font-display italic text-2xl text-ink">Sacha Crun</p>
          <p className="font-mono text-xs text-ink-muted">sacha7.crun@gmail.com</p>
        </div>
      </footer>
    </div>
  </div>
);

const meta: Meta<typeof Welcome> = {
  title: 'Welcome',
  component: Welcome,
  parameters: { layout: 'fullscreen' }
};

export default meta;

export const Overview: StoryObj<typeof Welcome> = {};
