# Build with Modern8-bits

Use this guide when building a product with Modern8-bits, including work performed by a coding agent. Review the interactive [Getting Started page](http://localhost:6006/?path=/docs/foundation-getting-started--docs) for examples.

## Start with one choice

Ask: **“Would you like the default Modern8-bits theme, or a low-fidelity prototype to review the structure?”** Use an existing choice when the user already gave one. Before implementing dependent work, obtain the choice or explain a reasonable default if the user explicitly delegates it.

- **Default:** Space Grotesk headings, IBM Plex Sans UI, IBM Plex Mono metadata, neutral surfaces, and optional pixel accents.
- **Low-fidelity:** IBM Plex Sans throughout, grayscale status feedback, crisp surfaces, and minimal decoration. Keep hierarchy, layout, wording, keyboard focus, validation, and interaction behaviour.
- **Appearance:** light or dark, selected independently of presentation. Use light unless another appearance is requested.

Completion: the selected presentation and appearance are explicit on the product's root wrapper.

## Use the implemented setup

This repository contains a React/TypeScript library in `storybook/src`. It is a local source library; there is no published package name to install. Adapt relative imports to the consuming file.

```tsx
import { Button, Input, Checkbox, Badge, Card } from './components'
import './styles/tokens.css'
import './styles/global.css'
import './styles/presentation.css'

export function Product() {
  return (
    <div data-theme="light" data-presentation="default">
      <Card title="Project details">
        <Input label="Project name" hint="Choose a clear name." />
        <Checkbox label="Keep planning notes" />
        <Button size="large">Continue</Button>
      </Card>
    </div>
  )
}
```

Set `data-presentation="low-fidelity"` for structural prototypes. Put both attributes on the same wrapper; nested appearance changes should repeat the presentation attribute. Change these attributes without replacing the component tree, so existing input and selection state survives. Storybook's Appearance and Presentation toolbars apply to component stories; Getting Started provides local controls for its documentation example.

Completion: imports resolve, all five component families are available, and both attributes reach the intended components.

## Choose by purpose

| Component | Use | Implemented choices |
| --- | --- | --- |
| Button | Trigger an action | contained, outline, ghost, pixel; small/medium/large; disabled; icon-only with an accessible name |
| Input | Enter text | label, hint, error, disabled, normal HTML input attributes; authored medium 44px size |
| Checkbox | Select a binary option | label, description, error, disabled, controlled or uncontrolled checked state; medium 20px box |
| Badge | Show a short label | neutral, strong, pixel |
| Card | Group related content | title, eyebrow, footer, default or pixel |

Use visible labels for fields and clear action verbs for buttons. A placeholder supports a label; it does not replace one. Error props link explicit messages to their input. A disabled control needs explanatory nearby copy when the reason is not obvious.

Choose large 48px buttons for touch-heavy layouts. Compact 32/40px buttons need adequate target spacing. Figma contains additional sizes, indeterminate selection, and richer Card/Chip structures; consult the Design Token page's supported mappings before treating them as code APIs.

Completion: every used prop exists in the component's TypeScript definition and every interactive control has an accessible name.

## Apply shared rules

Use semantic colours such as `background/canvas`, `text/primary`, `border/focus`, and `action/primary`; CSS maps `/` to `-` with `--m8-`. Status containers use paired `status/*` and `status/on-*`; inline messages use `status/*/text`. Keep status wording explicit in both presentations, because low-fidelity intentionally removes hue differences.

Read [TOKEN-RULE.md](TOKEN-RULE.md) when choosing, adding, or migrating tokens. Read [DESIGN.md](DESIGN.md) when choosing typography, spacing, layout, geometry, or motion. The [Design Token page](http://localhost:6006/?path=/docs/foundation-design-token--docs) shows implemented values and supported mappings. Figma authors decisions; code is synchronized manually.

Use pixel treatments as deliberate accents in default presentation. Low-fidelity suppresses shadows, pixel typography, rounded Card corners, and hover movement. Preserve state cues such as check marks, outlines, focus separation, and validation messages. For missing media, use a labelled placeholder with the intended dimensions rather than adding decorative artwork.

Completion: the implementation consumes defined tokens, fits a narrow viewport, and preserves meaningful states when presentation changes.

## Handle missing capabilities

Check existing component source and the token reference first. For a missing capability, identify the specific behaviour or API that is required, propose a suitable native HTML element or a scoped extension, and state what needs designing and validating. Keep the inventory honest: do not describe an unimplemented component or Figma-only variant as available code.

## Review before sharing

Try default/light, default/dark, low-fidelity/light, and low-fidelity/dark. In each combination, verify readable text, visible keyboard focus, error wording, disabled states, and narrow layout. Enter data and make a selection, switch modes, and confirm state persists. Review with actual content, then run the relevant existing build and story checks from `storybook/package.json`.

Completion: the four combinations work and any unresolved limitations are stated alongside the result.
