# Add low-fidelity mode and agent usage guidance

Status: ready-for-human
Type: task
Depends on: 04
Implementation: complete; ready for review

## Context

Follow the [confirmed spec](../spec.md), [assessment](../gap-assessment.md), and [plan](../plan.md). Complete dependencies before implementation.

## Work

- Add a low-fidelity presentation option independent of light/dark appearance, reusing components and structure.
- Use grayscale, plain typography, and minimal decoration while preserving hierarchy, labels, state cues, focus, and behaviour.
- Write a product-building guide that asks default theme or low-fidelity prototype unless the user has already specified it.
- Document actual imports, tokens, defaults, pixel restraint, and missing-capability handling; do not invent unavailable components.

## Acceptance criteria

- Existing component examples work in both modes and both appearances.
- Switching presentation preserves component state and semantics.
- The agent guide has one clear entry question and only references implemented capabilities.

## Comments

- 2026-10-04: Created from the confirmed design-system brief. No implementation or validation is claimed yet.
- 2026-10-05: Implemented independent presentation/appearance controls, Getting Started, Figma comparison and USAGE.md. All 23 story checks and 264 token checks passed; mobile/desktop and keyboard evidence are in [presentation results](../presentation-result.md).
