# Implement typography and responsive foundations

Status: ready-for-agent
Type: task
Depends on: 02
Implementation: shared definitions and responsive mappings completed

## Context

Follow the [confirmed spec](../spec.md), [assessment](../gap-assessment.md), and [plan](../plan.md). Complete dependencies before implementation.

## Work

- Author the agreed three-family role system in Figma, including sizes, weights, line heights, tracking where needed, and responsive scaling.
- Implement matching CSS typography definitions and document mappings for compound Figma text styles.
- Reconcile spacing, layout breakpoints/gutters, radius, borders, and existing motion-name differences without expanding motion scope.
- Specify readable fallback behaviour and narrow-screen handling.

## Acceptance criteria

- Typography roles are implemented rather than merely listed in DESIGN.md.
- Shared responsive rules agree across documentation and implementation; exceptions are explicit.
- No bilingual or native-platform scope is added.

## Comments

- 2026-10-04: Created from the confirmed design-system brief. No implementation or validation is claimed yet.
- 2026-10-05: Implemented as gap 7. See [result](../gap-7-result.md) for typography, geometry, layout, motion, and recorded validation.
