# modern8-bits

## Purpose

modern8-bits is a cross-industry design system that pairs clean, contemporary interfaces with small, warm 8-bit cues. It should feel current and expressive without turning every screen into a retro game UI.

The system aims to support products across industries through neutral, reusable foundations. Prioritize people building responsive web products with coding agents, including those without design skills. The first release uses one fixed theme; industry presets and product-level theme customization are deferred.

Figma is the authoring source; CSS is synchronized manually. The values below include design intent and existing code conventions that are being reconciled with Figma. See the [verified inventory](.scratch/foundations-first-release/figma-inventory.md) before treating names or values as aligned across tools.

## Design principles

- Keep layouts clear, editorial, and easy to scan.
- Use generous space and strong type hierarchy to make content feel considered.
- Use pixel geometry as punctuation: icons, stepped edges, dividers, badges, and occasional motion.
- Keep color roles semantic so a theme can change values without changing component structure.
- Use high contrast and preserve readable text at every size.
- Let content and imagery provide warmth; the base palette remains black, white, and gray.

## Color foundations

The default foundation is monochrome. These are neutral values, not a fixed brand palette.

| Primitive token | Default value | Intended use |
| --- | --- | --- |
| `gray/0` | `#FFFFFF` | White surface |
| `gray/50` | `#F7F7F7` | Subtle surface |
| `gray/100` | `#EEEEEE` | Quiet section or disabled surface |
| `gray/200` | `#D6D6D6` | Hairline border |
| `gray/400` | `#A3A3A3` | Muted content |
| `gray/600` | `#666666` | Secondary content |
| `gray/800` | `#292929` | Raised dark surface |
| `gray/950` | `#111111` | Dark surface |
| `gray/1000` | `#000000` | Primary ink |
| `brand/primary` | `#000000` | Fixed neutral brand primitive for this release |

Use semantic tokens in components and layouts instead of referencing raw palette values. Semantic roles retain their names across themes; only their values change.

| Semantic role | Light theme | Dark theme |
| --- | --- | --- |
| `background/canvas` | `gray/0` | `gray/1000` |
| `background/surface` | `gray/50` | `gray/950` |
| `background/raised` | `gray/0` | `gray/800` |
| `text/primary` | `gray/1000` | `gray/0` |
| `text/secondary` | `gray/600` | `gray/200` |
| `text/muted` | `gray/600` | `gray/400` |
| `border/default` | `gray/200` | `gray/800` |
| `border/strong` | `gray/1000` | `gray/0` |
| `icon/primary` | `gray/1000` | `gray/0` |
| `action/primary` | `brand/primary` | `gray/0` |
| `action/on-primary` | `gray/0` | `gray/1000` |
| `action/secondary` | `gray/1000` | `gray/0` |
| `action/on-secondary` | `gray/0` | `gray/1000` |

### Fixed first-release theme

Colour mappings now match the authored Figma definitions, including dark primary actions, status foregrounds, and interaction roles.

User-supplied primary colours, generated tones, automatic foreground selection, font customization, and geometry customization are outside the first release. Keep component colours semantic and pixel treatments optional.

Implemented error, success, and information roles communicate functional feedback with explicit wording or another cue. Warning remains deferred.

## Themes

Theme modes are independent axes:

- **Appearance:** `light` or `dark` changes neutral surface, text, border, and icon values.
- **Presentation:** `default` or `low-fidelity`, selected independently with `data-presentation`. Low-fidelity uses IBM Plex Sans throughout, grayscale feedback and minimal decoration while preserving hierarchy, spacing, labels, behaviour, and accessibility. See [USAGE.md](USAGE.md) and Storybook's Getting Started example.

Components use the same semantic token names in both appearances. A component must not contain a separate palette for every theme. Keep everyday surfaces neutral and reserve functional colours for feedback. Product-level theme settings are deferred.

## Layout foundations

Use an 8-pixel mini-unit as the main rhythm, with a 4-pixel half-step for compact spacing and controls. Align text, pixel motifs, columns, and image edges to the same grid wherever practical. Asset-specific optical corrections follow the Alignment rule below; they are not restricted to a 4px step.

| Viewport | Columns | Outer gutter | Typical use |
| --- | ---: | ---: | --- |
| Small, below `672px` | 4 | `16px` | Single-column content and compact navigation |
| Medium, `672px` to `1055px` | 8 | `24px` | Tablet layouts and two-column content |
| Large, `1056px` and above | 12 | `32px` | Editorial layouts, dashboards, and multi-column content |

Use a fluid grid for editorial pages, dashboards, and media. Use fixed-size units for controls, icons, and pixel artwork. A default content width of `1440px` keeps wide screens readable while allowing layouts to breathe. Choose columns based on the content; do not force every section into the same arrangement.

The `1440px` constrained container includes its outer margins (implemented as inline padding). Use the existing `layout/gutter` value for both the outer margin and the gap between columns: 16/24/32px in small/medium/large ranges. Columns use fractional widths between breakpoints; the 8px rhythm governs spacing, not rounded column widths. Constrain long-form text separately (start around 65ch), and use uncapped fluid width when a board or canvas benefits from it.

Column customization starts with **Auto**, preserving the default 4/8/12 responsive counts. The Grid web simulator offers bounded 4/8/12 overrides up to the active range's default count, with incompatible options disabled. Preserve fixed spans, proportions and explicit positions: two 6-column halves, three 4-column sections, or a 4 + 8 split require 12 columns. Full-width sections may use a lower supported count. Validate all sections sharing a container; evaluate independent nested grids and minimum usable pane/card widths separately. If a viewport or content-layout change invalidates a manual count, reset to Auto and explain why. Margins, gutters and breakpoints keep their existing values. The Website Mockup applies these restrictions across its entire page.

For mobile application layouts, read safe-area insets from the host, then apply design margins inside the safe rectangle. Account for reserved camera and fold/pane regions separately, and handle keyboard avoidance independently. Reference measurements use logical points and are examples rather than production device-detection rules. Native component implementations remain outside the React library's scope.

Storybook's **Foundation / Grid** page provides interactive web and mobile diagrams, source-linked profiles, and implementation recipes. It initially covers iPhone 18 Pro Max, iPhone 17 Pro, iPhone Duo, and iPad Air 13-inch (M4), using safearea.info measurements retrieved on 2026-10-23. Follow [the device-extension workflow](docs/agents/grid-devices.md) to add or refresh devices. This guidance does not imply that Figma grid assets have been synchronized.

## Alignment

This rule applies to every component and layout: **start with geometric alignment, inspect the visible content at its intended size, and make the smallest useful optical correction when a mismatch remains.** Geometric alignment matches boxes, centres, edges, and baselines; optical alignment balances the visible shape or text inside that structure.

- Keep grid boundaries, container padding, gaps, control dimensions, focus rings, and hit areas consistent. Fix incorrect structure, empty asset bounds, or font metrics before adding an offset.
- Align text sharing a line by its baseline. Align icons with the visible centre of a single line; use the first line as the anchor for multiline labels. Check the actual font, line height, and asset geometry.
- A triangle may need a local shift and a round shape may need slightly different visible dimensions. Determine corrections for the specific asset and size; never apply a blanket transform to all icons, text, or cards.
- Choose a shared visible edge for related layout content. Implement that edge with grid, padding, or a common wrapper. Keep optical corrections inside the component rather than moving the whole component off its layout anchor.
- Document each correction beside its shared asset/component rule: what moves, its size, direction, value, and reason. A small local value such as 1px or 2px is an explained exception, not a new spacing token. Review supported sizes individually.
- Preserve reading order and reserve room for corrected content. Review guides on/off, actual and fallback fonts, long/translated labels, component states, narrow layouts, 200% zoom, and RTL where supported. Use logical layout edges and review mirrored directional icons individually; media playback symbols do not automatically reverse with text direction.
- Retain meaningful optical alignment in both presentations and appearances. Recheck when fonts, assets, strokes, or component sizes change.

Storybook's [Foundation / Alignment](http://localhost:6006/?path=/docs/foundation-alignment--docs) gives original before/after examples for play icons, circles and squares, mixed text baselines, quotation marks, and layout content edges. Example dimensions are illustrative, not universal component values. This guidance does not imply that every existing component or Figma asset has already been audited or changed.

## Spacing and shape

### Spacing scale

| Token | Value |
| --- | ---: |
| `space/1` | `4px` |
| `space/2` | `8px` |
| `space/3` | `12px` |
| `space/4` | `16px` |
| `space/6` | `24px` |
| `space/8` | `32px` |
| `space/12` | `48px` |
| `space/20` | `80px` |

Use `4px` for compact spacing, `8px` as the base unit, and larger steps for component padding and section separation. Apply local optical corrections as described in Alignment. Prefer space between groups over decorative dividers.

### Geometry

| Token | Value | Use |
| --- | ---: | --- |
| `radius/none` | `0px` | Pixel forms, dividers, and deliberately crisp surfaces |
| `radius/small` | `4px` | Compact controls and subtle softening |
| `radius/medium` | `8px` | Cards and larger containers |
| `stroke/hairline` | `1px` | Quiet borders |
| `stroke/pixel` | `2px` | Pixel emphasis and active outlines |

Use stepped geometry as a recognizable accent. Keep component silhouettes restrained so the pixel language remains legible and special.

## Typography

Use three complementary type roles:

- **Display:** Space Grotesk, for expressive headlines and editorial moments.
- **Interface:** IBM Plex Sans, for body copy, navigation, forms, and component labels.
- **Pixel detail:** IBM Plex Mono, for compact metadata, numbers, code-like details, and pixel annotations.

IBM Plex Sans is a proportional sans-serif. IBM Plex Mono is the monospaced companion for fixed-width text. Use mono sparingly so it reads as a deliberate 8-bit cue rather than the default voice of the whole interface.

| Figma text style | Family | Size / line height | Weight | Tracking |
| --- | --- | --- | ---: | ---: |
| `display/hero` | Space Grotesk | 72/78px | 700 | -2px |
| `display/large` | Space Grotesk | 48/54px | 700 | -1px |
| `heading/section` | Space Grotesk | 32/38px | 500 | -0.4px |
| `heading/card` | Space Grotesk | 24/30px | 500 | 0px |
| `body/large` | IBM Plex Sans | 18/28px | 400 | 0px |
| `body/base` | IBM Plex Sans | 16/24px | 400 | 0px |
| `body/small` | IBM Plex Sans | 14/20px | 400 | 0px |
| `utility/label` | IBM Plex Mono | 12/16px | 500 | 1.2px |
| `utility/micro` | IBM Plex Mono | 10/14px | 400 | 1px |
| `button/label/sm` | IBM Plex Sans | 12/16px | 500 | 0px |
| `button/label/md` | IBM Plex Sans | 14/16px | 500 | 0px |
| `button/label/lg` | IBM Plex Sans | 16/24px | 500 | 0px |
| `display/hero/mobile` | Space Grotesk | 48/54px | 700 | -1px |
| `display/large/mobile` | Space Grotesk | 32/38px | 700 | -0.4px |
| `heading/section/mobile` | Space Grotesk | 28/34px | 500 | -0.2px |
| `ui/label` | IBM Plex Sans | 14/20px | 500 | 0px |

Figma text-style paths are authoritative. CSS bundles use `--m8-type-` plus the style path: `body/base` maps to `--m8-type-body-base-font` with companion family, size, weight, line-height, and tracking properties. Below 672px, the three `/mobile` styles override their base display/heading roles. Body and controls retain their size. Fonts fall back to Arial or Courier New, so line wrapping can differ.

Button visible heights are 32/40/48px. Code Input uses the medium 44px field and Checkbox the medium 20px box. Default Card uses authored 24px padding, 32px content gap, and 8px radius; pixel Card keeps crisp corners. Ordinary UI labels use Sans; Mono remains for metadata and pixel accents. See the Design Token page for supported subsets and Figma/API differences.

## Motion

Motion should communicate state, guide attention, or make a transition easier to follow. Keep everyday interactions crisp and short. Use expressive movement only for branded moments where it adds meaning.

| Token | Value | Use |
| --- | ---: | --- |
| `motion/duration/fast-01` | `70ms` | Button and toggle feedback |
| `motion/duration/fast-02` | `110ms` | Short fades and icon feedback |
| `motion/duration/moderate-01` | `150ms` | Small expansion or short movement |
| `motion/duration/moderate-02` | `240ms` | Menus, toasts, and panel changes |
| `motion/duration/slow-01` | `400ms` | Large transitions and expressive emphasis |
| `motion/duration/slow-02` | `700ms` | Background or scene transitions |

Use standard easing for state changes, entrance easing for elements entering the view, and exit easing for elements leaving it. Pixel motion may move in small, deliberate steps, but avoid bounce, elastic stretch, or motion that delays a task. Respect reduced-motion preferences by removing nonessential movement or replacing it with a brief opacity change.

## Elevation

Use four named roles: Base for ordinary page content, Sunken for a background well on Base, Raised for movable cards or one emphasized panel, and Overlay for temporary surfaces above content. Sunken sits on top of Base in composition and serves as a recessed background for its child components, such as board cards. Use Sunken on Base only, never inside Raised or Overlay; use spacing or borders for grouping within those surfaces. Sunken has no shadow or extra stacking layer.

Pair `elevation/surface/{base|sunken|raised|overlay}` with its matching `elevation/shadow/*`. Base and Sunken have no shadow. Sunken uses `gray/100` (#EEEEEE) in light and `gray/950` (#111111) in dark. The dark mapping distinguishes the well from the black Base and its lighter child cards; Sunken is a semantic backdrop rather than a claim that its fill is darker than black. Raised reuses `background/raised`; Overlay uses `gray/0` in light and `neutral/800` in dark. Keep a border in both appearances; dark surfaces use `elevation/border` mapped to `gray/600`. Shadows are restrained and do not replace clear boundaries or keyboard focus. Low-fidelity removes shadows and rounded corners while preserving surface tones, outlines, content, and order.

Elevation is independent of stacking order. The `layer/*` scale orders content (0), sticky elements (100), floating elements (200), modal scrims (300), modals (400), feedback (500), and tooltips (600) within one application stacking context. Native dialog/popover top-layer behavior and modal-owned content require separate attention; these values do not escape stacking contexts. A visual scrim is not a complete modal implementation.

The opt-in `m8-elevation-surface` class consumes these pairs via `data-elevation`. Existing component defaults and explicit pixel accents retain their behavior. See Storybook's Elevation page for usage, examples, exact values, and accessibility guidance. The implementation is in `storybook/src/styles/elevation.css`, included by `tokens.css`.

This extension was defined in code on 2026-11-03 using [Atlassian Elevation](https://atlassian.design/foundations/elevation) and [Material 3 Elevation](https://m3.material.io/styles/elevation/overview) as references. Its Figma variables/effects have not been authored; keep this extension distinct from the verified Design Token snapshot until that work is complete.

## Token naming

Follow the repository's [token rules](TOKEN-RULE.md) when adding, renaming, or changing tokens. This section summarizes the naming convention; the rule defines token layers, theme behavior, state naming, and change management.

Names describe a token's role, not its current color or visual value. Keep names stable across themes.

- **Primitives:** `gray/100`, `brand/primary`, `space/4`, `radius/small`.
- **Semantic colors:** `background/canvas`, `text/primary`, `border/default`, `action/primary`.
- **Typography:** `display/hero`, `body/base`, `utility/label`.
- **Motion:** `motion/duration/fast-01`, `motion/easing/standard`.
- **Component-specific tokens:** add a component prefix only when a role is unique to that component, such as `button/primary/background`.

In Figma, use slash-separated paths. In CSS, map them to kebab-case custom properties with the `--m8-` prefix. For example, `background/canvas` becomes `--m8-background-canvas`, and `space/4` becomes `--m8-space-4`. In a `DESIGN.md` token front matter, use the equivalent nested path, such as `{colors.canvas}` or `{spacing.4}`.

Use state suffixes consistently when a token is state-specific: `hover`, `pressed`, `focus`, `selected`, `disabled`, and `error`. Avoid embedding appearance names such as `light` or `dark` in semantic token names; appearance is selected by the theme mode.

## Reference approach

The system borrows Carbon's role-based tokens, theme mapping, neutral surface layering, responsive grid principles, and purposeful motion guidance. It adapts those ideas for a flexible, editorial 8-bit visual language rather than reproducing Carbon's brand palette or component styling.

`ibm.design.md` is a structural reference for documenting tokens and components. The `DESIGN.md` format combines machine-readable token front matter with human-readable guidance; this README is the plain-text foundation guide for modern8-bits.

## Implementation

The React, TypeScript, Vite, and Storybook app is in the [`storybook`](storybook/README.md) folder. Its components, stories, configuration, and Vercel deployment settings are kept together there.

## References

- Carbon color and themes: https://carbondesignsystem.com/elements/color/overview/ and https://carbondesignsystem.com/elements/themes/overview/
- Carbon 2x Grid: https://carbondesignsystem.com/elements/2x-grid/overview/
- Carbon typography: https://carbondesignsystem.com/elements/typography/overview/
- Carbon motion: https://carbondesignsystem.com/elements/motion/overview/
- DESIGN.md format: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
