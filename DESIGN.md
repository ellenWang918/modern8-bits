# modern8-bits

## Purpose

modern8-bits is a cross-industry design system that pairs clean, contemporary interfaces with small, warm 8-bit cues. It should feel current and expressive without turning every screen into a retro game UI.

The system is intended for fashion, sport, learning, and technology experiences. Its shared foundations stay neutral and reusable; each product can supply its own primary color and content.

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
| `brand/primary` | `#000000` | Neutral starter value; replace when a theme supplies a color |

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
| `action/primary` | `brand/primary` | `brand/primary` |
| `action/on-primary` | Contrast-selected foreground | Contrast-selected foreground |
| `action/secondary` | `gray/1000` | `gray/0` |
| `action/on-secondary` | `gray/0` | `gray/1000` |

### User-supplied primary color

The theme input is `brand/primary`. It starts at black so the system works without a chosen accent. When a user supplies a primary color, the theme layer should:

1. Accept a valid color value and expose it as the `brand/primary` primitive.
2. Generate lighter and darker tonal values for hover, pressed, and subtle-surface roles.
3. Select black or white for `action/on-primary` based on contrast, then report any contrast failure.
4. Keep all other roles neutral unless the theme explicitly defines more colors.

The authored theme color is an input. Generated tones are derived outputs, not additional brand choices. Do not hard-code a specific hue in a component.

Semantic status roles such as success, warning, error, and information are reserved for functional feedback. Their theme values must remain distinguishable without relying on color alone.

## Themes

Theme modes are independent axes:

- **Appearance:** `light` or `dark` changes neutral surface, text, border, and icon values.
- **Primary:** user-provided color, with neutral black as the starter value.

Components use the same semantic token names in both appearances. A component must not contain a separate palette for every theme. Keep the base library monochrome; optional theme packs can add product-specific colors later.

## Layout foundations

Use an 8-pixel mini-unit as the main rhythm, with a 4-pixel half-step for optical adjustments and compact controls. Align text, pixel motifs, columns, and image edges to the same grid wherever practical.

| Viewport | Columns | Outer gutter | Typical use |
| --- | ---: | ---: | --- |
| Small, below `672px` | 4 | `16px` | Single-column content and compact navigation |
| Medium, `672px` to `1055px` | 8 | `24px` | Tablet layouts and two-column content |
| Large, `1056px` and above | 12 | `32px` | Editorial layouts, dashboards, and multi-column content |

Use a fluid grid for editorial pages, dashboards, and media. Use fixed-size units for controls, icons, and pixel artwork. A default content width of `1440px` keeps wide screens readable while allowing layouts to breathe. Choose columns based on the content; do not force every section into the same arrangement.

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

Use `4px` for fine alignment, `8px` as the base unit, and larger steps for component padding and section separation. Prefer space between groups over decorative dividers.

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

| Token | Family | Size | Weight | Line height | Use |
| --- | --- | ---: | ---: | ---: | --- |
| `type/display/xl` | Space Grotesk | `64px` | `500` | `1.05` | Hero headline |
| `type/display/lg` | Space Grotesk | `48px` | `500` | `1.08` | Editorial section heading |
| `type/heading/lg` | IBM Plex Sans | `32px` | `600` | `1.2` | Page or panel heading |
| `type/heading/md` | IBM Plex Sans | `24px` | `600` | `1.25` | Card heading |
| `type/body/lg` | IBM Plex Sans | `18px` | `400` | `1.5` | Lead copy |
| `type/body/md` | IBM Plex Sans | `16px` | `400` | `1.5` | Default body |
| `type/body/sm` | IBM Plex Sans | `14px` | `400` | `1.4` | Supporting copy |
| `type/label/mono` | IBM Plex Mono | `12px` | `500` | `1.35` | Metadata and pixel details |

Display sizes should scale down on small screens. Preserve readable body sizes, use weight and spacing to create hierarchy, and avoid long passages in monospace.

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

## Token naming

Names describe a token's role, not its current color or visual value. Keep names stable across themes.

- **Primitives:** `gray/100`, `brand/primary`, `space/4`, `radius/small`.
- **Semantic colors:** `background/canvas`, `text/primary`, `border/default`, `action/primary`.
- **Typography:** `type/display/xl`, `type/body/md`, `type/label/mono`.
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
