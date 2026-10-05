# Align existing components and foundation examples

Status: ready-for-agent
Type: task
Depends on: 03
Implementation: supported shared-role mappings completed; representation differences documented

## Context

Follow the [confirmed spec](../spec.md), [assessment](../gap-assessment.md), and [plan](../plan.md). Complete dependencies before implementation.

## Work

- Migrate Button, Input, Checkbox, Badge, and Card to the agreed definitions without unrelated API expansion.
- Use Sans for ordinary product UI; keep Mono and pixel effects for their intended roles.
- Create or update colour/theme, typography, and layout foundation examples; correct misleading token labels and Figma claims.
- Inspect descriptive labels, focus, errors, disabled states, and theme surfaces; repair issues within these components.

## Acceptance criteria

- The five components demonstrate real shared definitions and supported states.
- Ordinary styling is neutral; pixel treatments are deliberate options.
- Foundation examples use actual token names and verified Figma references.

## Comments

- 2026-10-04: Created from the confirmed design-system brief. No implementation or validation is claimed yet.
- 2026-10-05: Existing code components now use the aligned definitions; Figma nodes and foundation examples updated. [Gap 7 result](../gap-7-result.md) records supported subsets and remaining representation/API differences without adding public APIs.
