# tindra

A public, MIT-licensed React component library extracted from the Wiinky design system. Portfolio piece. The internal Wiinky app stays private; this repo holds only the visual layer.

## In scope

- Visual React + TypeScript components, styled with Tailwind v3
- Storybook stories per component (default plus 3 to 5 variants)
- Storybook deployed to GitHub Pages
- Warm editorial design language: paper cream ground, warm ink, clay and moss accent, expressive serif italic display, asymmetric corner radii, oversized scale contrast

## Out of scope (NEVER include)

- ML pipeline code: MediaPipe, EAR, PERCLOS, attention scores, focus state, calibration
- Eye-tracking and camera plumbing
- Auth, OAuth, login flows
- API integrations, IPC, Electron
- Wiinky-specific copy or business terminology
- npm publish (Storybook on GH Pages is the only deploy target)

## Stack

- Vite, React 18, TypeScript 5
- Tailwind v3 with CSS-variable tokens (`src/styles/tokens.css`)
- Storybook 8 with `@storybook/react-vite` and `@storybook/addon-themes`
- `clsx` + `tailwind-merge` (combined as `cn`) and `class-variance-authority` for variants
- `lucide-react` for icons

## Code style

- No emojis anywhere (code, comments, prose, commits)
- No em dashes; use commas, semicolons, parentheses
- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`
- No coauthor trailers in commits
- One folder per component, co-located stories: `src/components/Button/Button.tsx`, `Button.stories.tsx`, `index.ts`
- Component files stay small (~200 lines max); split when they grow
- Reference tokens via Tailwind utilities (`bg-paper`, `text-ink`, `bg-clay`); avoid raw hex inside components
- Default to no comments; comment only when the WHY is non-obvious

## Extraction rules (when pulling components from Wiinky)

- Strip all business logic, ML, auth, IPC, and Electron references
- Replace internal data shapes with generic prop interfaces
- Replace Wiinky copy with neutral placeholders
- If unsure whether something is generic or Wiinky-specific, ASK before guessing
- Retune any hard-coded colors to the tindra palette via Tailwind classes

## Common commands

```bash
npm install
npm run storybook         # local dev at :6006
npm run build-storybook   # static build to storybook-static/
npm run typecheck         # tsc --noEmit
```

## Palette quick reference

Light mode: paper `#F2EBDD`, ink `#1A1410`, clay `#C97D5B`, moss `#2D9974`. Dark mode swaps paper and ink. CSS variables defined in `src/styles/tokens.css`.

Type stack: Fraunces (display italic), Inter (UI), JetBrains Mono (numerics, code).
