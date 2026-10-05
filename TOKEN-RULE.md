# Modern8-bits design tokens

Design tokens and their definitions are the single source of truth for naming and storing design decisions. A token gives a reusable decision a name, a type, a value or reference, and a clear meaning that people and AI can read consistently.

## Definitions and source

[`storybook/src/styles/tokens.css`](storybook/src/styles/tokens.css) stores the current implemented values, references, and theme mappings. This document explains their naming and use; [`DESIGN.md`](DESIGN.md) describes the broader design intent.

Read implemented definitions before using a token. A documented proposal is available once its definition exists. If documentation and code disagree, identify the difference and align them when changing the system.

For the confirmed first release, Figma is the authoring source for design decisions; CSS is their manually synchronized implementation. Read Figma definitions when authoring or changing decisions, and read CSS when consuming implemented tokens. There is no automatic synchronization. Record mappings and discrepancies before changing consumers; matching names alone do not prove matching values.

If structured token data is introduced later, it can become the authoritative definition source that generates CSS. Keep one authoritative set of definitions and derive other representations from it.

## Token structure

| Layer | What it stores | Example |
| --- | --- | --- |
| Primitive | Raw palette values and shared scales | `gray/200`, `space/4`, `radius/small` |
| Semantic | The role of a decision in the interface | `background/canvas`, `text/primary`, `action/primary` |
| Component | A decision specific to a component, when needed | `button/height/sm` |

Semantic colours reference palette values or theme inputs. Component colours reference semantic roles. Compatible references within a layer are useful when they share meaning; keep references resolvable, type-compatible, and free of cycles. Primitives do not depend on semantic or component tokens.

Add component tokens when they express a decision that shared roles or scales cannot adequately describe. Use shared spacing, typography, radius, stroke, and motion scales directly where they fit.

## Naming

Names describe a decision's role or scale. Semantic names stay consistent across themes.

- Use lowercase, slash-separated paths in documentation and Figma: `background/canvas`, `space/4`, `radius/small`.
- Use semantic colour categories such as `background`, `text`, `border`, `icon`, `action`, and `status`. The current convention has no `color/` prefix.
- Use `sm`, `md`, `lg`, and `xl` for size steps; retain established radius names such as `small` and `medium`.
- Put state names last when needed: `hover`, `pressed`, `focus`, `selected`, `disabled`, or `error`. `action/primary/hover` and `action/primary/pressed` are implemented roles. Paired foregrounds use `on-*`; inline status foregrounds use `status/*/text`.
- Map `/` to `-` and add `--m8-` for CSS: `background/canvas` becomes `--m8-background-canvas`.
- Keep exported names unique: paths such as `a/b-c` and `a-b/c` would collide in CSS.

Record explicit mappings where existing names differ from this convention. Component prop names can differ from token names without requiring duplicate token definitions.

## What a definition includes

| Field | Purpose |
| --- | --- |
| Name | Identifies the decision consistently across tools |
| Type | Describes the value, such as colour, dimension, duration, or font family |
| Value or reference | Stores the decision directly or points to another token |
| Description | Explains its intended use and any important limitation |
| Theme values, when applicable | Defines how the same role resolves in each supported appearance |

CSS stores values and references as custom properties; descriptions can accompany them in comments or linked documentation. Keep units appropriate to the value, such as `px` for dimensions and `ms` for duration.

## Using tokens

Use semantic or component colours in components. Choose a token by meaning: `text/secondary` does not become a border token just because its value matches one.

Reuse shared scales for spacing, typography, shape, strokes, and motion. Keep raw design values in token definitions; explain occasional local values, such as optical adjustments, beside their use. Structural CSS such as `0`, `auto`, `100%`, and `currentColor` can be used directly when appropriate.

If a required decision is missing, identify it before adding a token. Define its purpose and value/reference alongside its consumers. Avoid referencing names that have no definition.

## Themes

Light and dark appearances change values while preserving semantic names. Components consume the same roles in either appearance. This release has one fixed default theme; user customization of colours, font families, and geometry is deferred. The existing `brand/primary` definition is not a supported user customization interface.

Define foreground and background roles as pairs, such as `action/primary` and `action/on-primary`, and check their contrast in supported themes and states. Check focus indicators against adjacent surfaces. Status feedback also needs text, icons, or another cue beyond colour.

Custom primary-colour tone generation and automatic foreground selection are not implemented today. A custom theme needs explicitly defined and checked mappings; changing `brand/primary` alone does not establish an accessible theme.

## Existing token example

`background/canvas` names the base background of a page or canvas. Its type is colour. In the current definitions it references `gray/0` in light appearance and `gray/1000` in dark appearance. These values are read from the definition source; the excerpt below illustrates that mapping.

```css
/* Excerpt from tokens.css: base page/canvas background. */
:root,
[data-theme='light'] {
  --m8-background-canvas: var(--m8-gray-0);
}

[data-theme='dark'] {
  --m8-background-canvas: var(--m8-gray-1000);
}

/* Consumption: use the role without choosing a palette value. */
.page {
  background: var(--m8-background-canvas);
  color: var(--m8-text-primary);
}
```

## Maintaining definitions

Update token definitions, affected references, and relevant documentation together. Check that references resolve and affected components work in supported themes and states. Align verified Figma definitions with the same names and values when updating the design library.

For a breaking rename, document the replacement and keep a temporary alias while consumers migrate. When retiring an unnecessary decision, explain how to remove its dependency. Avoid changing a token's meaning silently.

## Colour roles and states

Raw colour values belong in palette primitives. Semantic colours reference primitives or other semantic roles; component colours reference semantic roles. For example, `chip/strong/background → background/contrast → neutral/800` in light appearance and `neutral/50` in dark appearance.

| Use | Implemented roles |
| --- | --- |
| Filled action | `action/primary`, `action/primary/hover`, `action/primary/pressed`, paired with `action/on-primary` |
| Outlined or ghost action | `action/subtle/hover`, `action/subtle/pressed`, paired with `text/primary` |
| Persistent selection | `action/selected`, `action/on-selected`, `border/selected`; also show a check mark or another explicit selection cue |
| Keyboard focus | `border/focus`, with an offset separating it from the control |
| Unavailable control | `action/disabled/background`, `action/disabled/on-background`; also use disabled semantics |
| Status container | `status/error`, `status/success`, `status/info`, each paired with its `status/on-*` foreground |
| Inline feedback or error indicator | `status/error/text`, `status/success/text`, `status/info/text` on canvas, surface, or raised neutral backgrounds |

Do not use a status container fill as inline text in dark appearance. Hover and pressed describe temporary input feedback; selected describes persistent state. Focus must remain visible independently of selection.

### Colour naming migration

Existing Figma variable identities and Chip colours are preserved. CSS keeps temporary compatibility aliases for these old names:

| Previous name | Replacement |
| --- | --- |
| `chip/outline/grey` | `chip/neutral/background` |
| `chip/contained/dark` | `chip/strong/background` |
| `chip/dark` | `chip/strong/foreground` |
| `chip/outline/outline` | `chip/outline/background` |
| `action/disabled/text` (legacy CSS) | `action/disabled/on-background` |

Legacy CSS `tag/*` aliases also map to the corresponding Chip roles. New consumers should use the current names. Chip and the code Badge still have different component APIs; these aliases do not establish component parity.

## Current alignment notes

Presentation was added on 2026-10-05 as an independent Figma collection with Default and Low-fidelity modes: three font families, one Card radius, and nine feedback colour aliases. The total is 119 variables. Presentation colours resolve through the separate Color collection's Light/Dark modes; the Design Token page shows all four combinations. CSS lives in `storybook/src/styles/presentation.css`; apply `data-theme` and `data-presentation` on the same wrapper. Read [USAGE.md](USAGE.md) for usage and [presentation results](.scratch/foundations-first-release/presentation-result.md) for verification.

Updated on 2026-10-05. All 69 colour and 37 dimensional definitions have matching CSS mappings. The 16 Figma text styles map to compound CSS role bundles with the prefix `--m8-type-`: `body/base` maps to `--m8-type-body-base-font`, plus family, size, weight, line-height, and tracking properties. Mobile styles override their base roles below 672px. The authored medium Input has a 14px horizontal inset and 6px label/supporting gap, recorded as component-specific optical decisions. See [gap 7 results](.scratch/foundations-first-release/gap-7-result.md) for supported component mappings and evidence.

- Radius aliases `--m8-radius-sm` and `--m8-radius-md` map to the established `small` and `medium` names. Consolidate references when migrating them.
- Radius large/full retain authored 12/9999px values, scopes, and syntax. The unused raw `--m8-techno` value was removed after checking consumers.
- Motion uses `motion/duration/*`; old CSS names without `duration` remain compatibility aliases. Figma stores numerical milliseconds; CSS adds `ms`.
- Shared geometry and text roles now drive the five code components. Fixed icon/check-mark shapes and pixel-shadow offsets remain local optical geometry; the explicit pixel variants retain Mono and crisp corners.
- Primary action pairs switch to white/black in dark appearance. Button, Input, and Checkbox use the dedicated focus role. Tested status/action text pairs have a minimum contrast ratio of 5.74:1; this is targeted validation, not a complete accessibility audit.
