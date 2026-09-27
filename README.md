<p align="center">
  <img src="./logo-blk.svg" alt="Modern8-bits logo" width="88" />
</p>

<h1 align="center">Modern8-bits</h1>

<p align="center">
  A flexible design system with clear, contemporary foundations and a touch of 8-bit character.
</p>

<p align="center">
  <a href="https://modern8-bits-up.vercel.app/">Storybook</a> ·
  <a href="https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/Modern8-bits">Figma library</a>
</p>

Modern8-bits is a growing design system for building consistent digital experiences across products. It pairs reusable design tokens and React components with interactive Storybook documentation.

## What's included

- **Foundations:** color, themes, typography, spacing, geometry, and motion.
- **Components:** Button, Input, Checkbox, Badge, and Card.
- **Storybook:** component examples, controls, accessibility checks, and usage documentation.
- **Design direction:** a neutral, adaptable base with pixel details used as a restrained accent.

## Get started

The Storybook app lives in the `storybook` folder.

```sh
cd storybook
npm ci
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to browse the components and foundations.

## Project structure

```text
storybook/
├── .storybook/       # Storybook configuration and Modern8-bits branding
├── src/
│   ├── components/   # React components and their stories
│   ├── foundations/  # Foundation documentation
│   └── styles/       # Design tokens and global styles
└── vitest.config.ts  # Storybook story tests
```

The detailed foundation guide is in [DESIGN.md](./DESIGN.md). Component documentation and examples are available in [Storybook](https://modern8-bits-up.vercel.app/).

## Development commands

Run these from `storybook/`:

| Command | Description |
| --- | --- |
| `npm run storybook` | Start Storybook locally on port 6006 |
| `npm run build-storybook` | Build the static Storybook site |
| `npx vitest run` | Run the Storybook stories in Chromium |
| `npm run dev` | Start the Vite application |
| `npm run build` | Type-check and build the Vite application |

## Design and implementation

The system uses CSS custom properties with the `--m8-` prefix. Components should use semantic tokens so light and dark themes can share the same structure. The type system pairs Space Grotesk for display, IBM Plex Sans for interface text, and IBM Plex Mono for compact labels and details.

The Storybook Design panel links to the [Modern8-bits Figma file](https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/Modern8-bits). The current library is under active development; component stories document the implemented states and variants.
