# Modern8-bits foundations-first release

Confirmed brief: 2026-10-04
Planning horizon: seven working sessions within one week.
State: brief confirmed; assessment and plan prepared; implementation pending.

## Purpose and audience

Deliver an interview-ready demonstration of token architecture, design-to-code consistency, and practical governance. Grow the same system into a reusable foundation for personal products.

Prioritize people using coding agents who have no design skills: provide coherent defaults and explicit guidance. Designers and developers get deeper definitions and implementation references. The system is industry-neutral; fashion, education, and technology are examples, not presets or claims of universal validation.

## Confirmed design decisions

- Responsive web now; native platforms are deferred.
- English documentation and examples.
- Contemporary, neutral defaults with subtle nostalgia; pixel treatments are opt-in.
- Space Grotesk: headlines, key moments, expressive scale.
- IBM Plex Sans: product UI, body copy, longer reading.
- IBM Plex Mono: metadata, technical details, pixel accents.
- One fixed default theme with light and dark appearances. No product-level colour, font, or geometry customization in this release.
- Figma authors design decisions. CSS stores their implemented representation; synchronization is manual and documented, not automated.
- Before building, an agent asks whether the user wants the default theme or a low-fidelity structural prototype, unless the user already supplied that choice.
- Low-fidelity mode uses the same components and layout rules with grayscale, plain typography, minimal decoration, and placeholders where appropriate. Preserve hierarchy, interaction states, labels, and accessibility.
- Demonstrate both modes through the five existing Storybook components, without product screens.

## Deliverables

1. Figma variables/styles and matching code definitions for primitives, semantic roles, and component tokens only where justified.
2. Neutral and functional status colour roles with light/dark mappings and checked foreground/background pairs.
3. Typography roles including family, size, weight, line height, tracking where needed, and responsive behaviour.
4. Spacing, responsive layout, geometry, borders, and focus foundations.
5. Updated Button, Input, Checkbox, Badge, and Card examples in Storybook.
6. An agent-readable usage guide with the initial mode question, real token/component inventory, sensible usage rules, and missing-capability handling.
7. Practical governance covering additions, changes, renames, retirement, manual synchronization, and a worked change with a change log.
8. A short interview walkthrough tracing a decision from Figma through code to Storybook.

## Out of scope

Expense-app exploration, product screens, new component families, native components, industry presets, theme customization, generated brand tones, elaborate motion, automatic Figma synchronization, and claims of organization-wide adoption.

## Completion evidence

- Every released definition has an identifiable Figma representation and explicit CSS mapping; document any representation differences.
- Both appearances and both presentation modes are demonstrable using existing components.
- Examples use implemented names and follow the agreed typography roles.
- A representative foundation change is traceable through Figma, CSS, documentation, and the change log.
- Build, story checks, manual keyboard review, contrast review, and narrow/wide layout checks have recorded results and limitations.
- Agent instructions can be followed without guessing nonexistent tokens or components.
- Interview claims distinguish implemented, verified, and deferred work.

## Assessment and execution

See [gap assessment](gap-assessment.md), [one-week plan](plan.md), and the individual files in [issues](issues/).

## Comments

- 2026-10-04: User confirmed the consolidated brief after the design interview. This spec records that agreement; it does not claim implementation is complete.
