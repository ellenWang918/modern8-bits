# Presentation and onboarding results

Implemented on 2026-10-05. Changes are local; the deployed Storybook has not been updated.

## Deliverables

- Storybook Foundation / Getting Started follows Overview. It offers independent Default/Low-fidelity and Light/Dark controls, with an interactive Button, Input, Checkbox, Badge and Card example. Validation, saved results, entered text and checked selection survive mode changes.
- Component stories have a Presentation toolbar alongside Appearance.
- [USAGE.md](../../USAGE.md) documents the initial presentation question, real local imports and APIs, semantic token usage, pixel restraint, missing capabilities and verification. AGENTS.md points builders to it.
- [Figma comparison](https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/modern8-bits?node-id=160-16) on Themes shows the four combinations, rules, a saved-state specimen and explicit error wording. Existing Button, Input and Checkbox instances are reused. Card and Badge are bound code-role specimens; they do not establish additional Figma component APIs or equate Badge with Chip.
- The separate Figma Presentation collection adds 13 variables: three STRING families, one aliased FLOAT Card radius, nine aliased COLOR feedback roles. The inventory is 119 variables. The Design Token page includes the font families and resolves presentation colours for both appearances.

## Rules

Default retains Space Grotesk, IBM Plex Sans and IBM Plex Mono. Low-fidelity uses IBM Plex Sans throughout, grayscale status roles, square geometry and no pixel shadows or hover movement. Component structure, typography scale, spacing, labels, validation, disabled semantics and keyboard focus remain meaningful. Set both attributes on the same wrapper and preserve the React tree.

## Verified

- Application TypeScript/Vite build and static Storybook build passed.
- All 23 Storybook browser tests passed, including the new interaction test with validation and persistent state across four combinations. Configured accessibility checks also passed; this is not a complete audit.
- Eight browser samples passed: four combinations at 1440px and 390px. No horizontal overflow; Input is 44px and primary action 48px; low-fidelity removes Card rounding, pixel shadows and expressive fonts.
- 264 computed CSS value checks passed: 106 existing definitions in Light/Dark Default, plus 13 Presentation definitions in all four combinations.
- Keyboard review passed: Input → Checkbox → Save; disabled action is skipped, checkbox focus outline is visible.
- No page errors occurred. Final Figma comparison and browser screenshots were visually reviewed; Storybook's typography/eyebrow overrides were corrected.

Evidence: [browser results](presentation-browser.json), [Figma ledger](presentation-figma-state.json), screenshots named `presentation-<presentation>-<appearance>-<width>.png`, and [repeatable browser check](verify-presentation.mjs).

## Limits

Figma examples are static; Storybook demonstrates the interactions. Component subsets still differ between Figma and code, as recorded in gap 7. Local state lasts only while the Getting Started page stays open. No expense-app screens, native library, new code component families, industry presets, theme customization, publishing or full-library accessibility certification were added.
