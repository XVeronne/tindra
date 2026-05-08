# tindra

> Warm, editorial React component library extracted from Wiinky.

[Live demo](https://xveronne.github.io/tindra/) , [Showcase](#showcase) , [Foundations](#foundations) , [Stack](#stack)

## What is this?

tindra (Swedish: *to twinkle, to glow*) is the public, MIT-licensed component library extracted from **Wiinky**, a closed-source Electron desktop application I am building for smart study scheduling and focus tracking.

Wiinky combines a MediaPipe FaceLandmarker eye-tracker running in the renderer (~15 fps, no IPC hop), a TensorFlow.js focus-prediction model, Google Calendar / CalDAV integration, and an adaptive Pomodoro engine. The product is private. The front-end is good enough that I wanted it reviewable, so I lifted just the visual layer out, retuned the warm palette, removed every reference to ML / eye-tracking / Electron / OAuth, and shipped it as tindra.

Same language, no plumbing. What you see in the Showcase folder are real screens from the product, exposed as drop-in React components with zero proprietary logic.

## Showcase

Five composed full-resolution screens lifted from a working product:

- **Pre-Session Ritual**, 1920x1080 dashboard with a canvas slime mascot (80-point spring physics), animated music widget, and draggable duration picker
- **Weekly Report**, animated weekly summary; selectable bookshelf, count-up stats, subject breakdown, quiet observer mascot
- **Tactile Object**, pre-session focus device with a draggable rotary dial, tap-to-cycle presets, and warm inset shadows
- **Zen Amber Glow**, single-screen meditation; floating mascot, dual counter-orbiting indicators with a comet trail, count-up recovery score
- **Volume Expansion**, drag the play disc outward to grow an organic blob and cycle 25 to 120 minute presets

Open the deployed Storybook for the live versions.

## Foundations

- **Color**, token-driven palette named for role (paper, ink, clay, moss); light and dark theme via a single `.dark` class
- **Typography**, Fraunces (display italic), Inter (UI), JetBrains Mono (numerics and code), with a documented type scale

## Stack

- React 18, TypeScript 5
- Tailwind CSS v3 with CSS-variable tokens
- Storybook 8 with autodocs and theme switching
- `clsx` + `tailwind-merge` (combined as `cn`), `class-variance-authority` for variants
- `lucide-react` for icons
- Vite for build, GitHub Actions for deploy

## What this demonstrates

- Token-driven theming, every color is a CSS variable, components read through Tailwind utilities, light/dark is one class flip
- Composition over configuration, `Card` exposes Header / Eyebrow / Title / Body / Footer subcomponents, `Button` uses cva variants, everything is forward-ref'd
- Motion as a first-class primitive, canvas-based spring physics, organic SVG morph, staggered count-ups, micro saccades, ripple rings, pointer-driven drag rotation
- Editorial taste applied to product surfaces, postage marks, ledger fields, hang-tag annotations, signature lines, book spines
- Production tooling, Vite, TypeScript strict, Storybook 8, autodoc'd, deployable to GitHub Pages

## Getting started

```bash
git clone https://github.com/XVeronne/tindra.git
cd tindra
npm install
npm run storybook         # local dev at :6006
npm run build-storybook   # static build to storybook-static/
npm run typecheck         # tsc --noEmit
```

## Project structure

```
src/
  components/
    Button/, Card/, Input/, Mascot/, SlimeOrb/        primitives (used internally)
    BookSpine/, Polaroid/, Gazette/                   editorial cards
    PostageBadge/, DateStampBadge/, HangTagBadge/     editorial marks
    ExLibrisField/, LedgerField/, SignatureField/     editorial fields
    HeadlineButton/, TicketButton/, MarginButton/     editorial buttons
    InitialButton/, DispatchButton/
    Dashboard/, PreSession/, TactileObject/           full showcases
    ZenAmberGlow/, VolumeExpansion/
    Welcome/                                          Storybook landing
  stories/
    Foundations/                                      Color, Typography
  styles/
    tokens.css                                        CSS variable palette
    globals.css                                       Tailwind base + fonts
.storybook/
  main.ts, preview.tsx                                Storybook config
.github/workflows/
  deploy-storybook.yml                                Auto-deploy on push to main
```

## Conventions

- One folder per component, co-located stories: `Button/Button.tsx`, `Button/Button.stories.tsx`, `Button/index.ts`
- Reference tokens via Tailwind utilities (`bg-paper`, `text-ink`, `bg-clay`); avoid raw hex inside components
- No emojis, no em dashes; conventional commit messages
- Component files stay focused (~200 lines max), split when they grow

## Deploy

Every push to `main` triggers `.github/workflows/deploy-storybook.yml`, which type-checks, builds Storybook with the correct base path for the repo, and publishes to GitHub Pages via `actions/deploy-pages`.

## License

MIT (c) Sacha Crun

## Credits

Built as a portfolio piece. The visual language is mine; the underlying product (Wiinky) is private. If you are a recruiter and want to see how I think about composition, tokens, motion, and editorial detail at the same time, this is the surface area to evaluate.
