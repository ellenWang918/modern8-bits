# Implement colour architecture and theme mappings

Status: ready-for-agent
Type: task
Depends on: 01
Implementation: colour reconciliation implemented; remaining scope review pending

## Context

Follow the [confirmed spec](../spec.md), [assessment](../gap-assessment.md), and [plan](../plan.md). Complete dependencies before implementation.

## Work

- Author neutral, functional status, action-state, and focus roles in Figma before matching them in CSS.
- Check foreground/background pairs across light and dark appearances; pair status colour with text or other cues.
- Resolve documented aliases and unused/unclear values through consumer inspection; keep migration mappings where names change.
- Document roles, references, theme values, and any required component-specific decisions.

## Acceptance criteria

- Figma and CSS colour mappings agree and references resolve without cycles.
- Focus is visible on supported surfaces; contrast results and limitations are recorded.
- No user-customizable theme feature is introduced.

## Comments

- 2026-10-04: Created from the confirmed design-system brief. No implementation or validation is claimed yet.
- 2026-10-04: Gaps 4–6 implemented and validated. See [result and remaining scope](../gap-4-6-result.md). Colour definitions and state consumers are synchronized; complete ticket review should resolve the planned warning-role requirement and broader colour-consumer coverage.
