# Gaps 4–6: colour reconciliation

Completed: 2026-10-04. Figma authoring followed by manual CSS synchronization.

## Gap 4 — reference layers

Added 14 palette primitives and five semantic/component roles that preserve existing Chip colours. Renamed four Chip variables in place to describe their purpose, retaining their identities and bindings. Semantic and component colours now use aliases instead of raw colours. CSS compatibility aliases preserve old Chip, tag, and disabled-text names during migration.

Figma now has 86 variables: 69 colours and 17 dimensions, up from 57. The 29 additions include the architecture, status, and state roles below. All colour mappings and descriptions are reflected in the Design Token page.

## Gap 5 — status foregrounds

Added `status/error/text`, `status/success/text`, and `status/info/text`. Filled status backgrounds pair with `status/on-*`; inline feedback uses `status/*/text` on neutral surfaces. Status fills and foregrounds now reference palette primitives in both modes. Updated Figma Text Field error strokes/messages and code Input/Checkbox error indicators.

The Design Token page demonstrates filled and inline feedback, plus a real Input error. Explicit messages accompany each status. Appearance controls let readers inspect the examples in light and dark.

## Gap 6 — interaction roles

Added primary and subtle hover/pressed roles, selected background/foreground, and selected border. Wired Button pointer states, Checkbox selection, existing dedicated focus, and disabled pairs into CSS. Rebound the existing Figma Button hover/disabled treatments and Checkbox selected/disabled treatments. Removed the default contained hover shadow; the pixel variant remains opt-in.

Existing Figma variants were reconciled; no new pressed component variants or public component APIs were added. Pressed roles are documented in Figma and demonstrated interactively in Storybook. Fixed Checkbox supporting-message association when no caller-provided ID exists.

## Validation

- All 86 Figma variables resolve without missing aliases, cycles, or type mismatches; no raw semantic/component colour values remain.
- Targeted numerical checks cover status fill/foreground pairs, inline status text on canvas/surface/raised, primary default/hover/pressed, and subtle hover/pressed in both appearances. Minimum: 5.74:1. Status pairs alone have a minimum of 5.96:1. See `gap-4-6-contrast.json`.
- Browser verification confirms actual light/dark controls, primary hover/pressed colours, Input error colour, disabled Checkbox fill, valid supporting-message association, and visible keyboard focus in the inspected dark example.
- No horizontal overflow at 390px viewport; no browser runtime errors. See `gap-4-6-browser.json` and the light/dark/mobile screenshots.
- Figma colour guide section `141:74` visually inspected; text wrapping repaired and outer frame expands to contain it.
- Application build, Storybook build, and 22 existing component checks pass. The first test run had dependency-optimization reload errors; the warmed rerun completed cleanly.

## Remaining scope

Gap 7 still includes spacing/radius naming, control heights, typography, and broader component parity. Warning status is not added by this task. Low-fidelity mode and novice agent guidance remain separate planned work. Targeted checks do not establish complete WCAG compliance or full Figma/code component parity.

[Review Storybook](http://localhost:6006/?path=/docs/foundation-design-token--docs) · [Review Figma guide](https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/modern8-bits?node-id=141-74)
