# Verify Figma and define the release inventory

Status: ready-for-agent
Type: task
Depends on: None
Implementation: completed

## Context

Follow the [confirmed spec](../spec.md), [assessment](../gap-assessment.md), and [plan](../plan.md). Complete dependencies before implementation.

## Work

- Inspect the linked Modern8-bits Figma file with read-only tools; inventory pages, variables, modes, text styles, and existing component material.
- Compare actual definitions with tokens.css, DESIGN.md, TOKEN-RULE.md, and Storybook. Record verified Figma node/collection references and gaps.
- Define the minimum release inventory and mapping conventions using the confirmed spec; preserve existing material.
- Align positioning and source-of-truth documentation with Figma authoring, manual synchronization, fixed theme, and the novice audience.

## Acceptance criteria

- An evidence-backed Figma/code inventory exists, with unknowns labelled.
- Current-release docs no longer promise custom colour generation or unverified Figma parity.
- Scope remains the five existing components and agreed foundations.

## Comments

- 2026-10-04: Completed live read-only Figma inventory and source comparison. See [verified inventory](../figma-inventory.md). Updated README, DESIGN.md, TOKEN-RULE.md, and Storybook overview/README to reflect the confirmed scope and actual Figma coverage. Remaining value and variant decisions are documented for downstream implementation; no Figma values or application styles changed.

- 2026-10-04: Created from the confirmed design-system brief. No implementation or validation is claimed yet.
