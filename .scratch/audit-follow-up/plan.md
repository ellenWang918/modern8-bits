# Audit follow-up: proposed ticket breakdown

State: the user selected and implemented items 01–04, then 05–08. Results are recorded in results-01-04.md and results-05-08.md. Items 09–10 remain proposed; no implementation tickets were published by this plan.

Source: the Storybook and Figma audit of 6 October 2026.

## Foundation and adoption repairs

### 01 — Repair Figma Button variants

Blocked by: None.

Deliver: the existing main Button set has unique variant combinations, readable property definitions and working dependent instances. Verify representative variants against the current coded Button without expanding its API.

### 02 — Make Figma presentation switching consistent

Blocked by: None.

Deliver: existing library components and expense-page text follow Presentation and Appearance choices. Verify typography, geometry and decoration in Default/Low-fidelity × Light/Dark, preserving hierarchy and state cues and matching the implemented rules.

### 03 — Improve resting input visibility

Blocked by: None.

Deliver: resting inputs are clearly identifiable through a justified semantic border choice shared by Figma, code and Storybook. Record measured contrast and review resting, focus, error and disabled states in all four combinations. Avoid changing decorative borders unnecessarily.

### 04 — Preserve accessible field descriptions

Blocked by: None.

Deliver: Input and Checkbox retain consumer-supplied descriptions alongside generated hint/error descriptions. Checkbox supporting text remains a description rather than being folded into its name. Verify composed examples, keyboard behavior and available screen-reader checks; state any verification limitations.

### 05 — Make Storybook navigation and input guidance practical

Blocked by: None.

Deliver: links between foundation pages preserve the Storybook navigation shell, and native date/number examples show supported APIs, useful validation and amount-formatting limits. Clarify local example controls versus global toolbar controls. Do not imply a custom date picker or currency-field API exists.

### 06 — Provide a beginner adoption route

Blocked by: None.

Deliver: a user follows a public Getting Started link to a minimal runnable React starter or a verified source-copy recipe, loads the components/styles/fonts and chooses presentation and appearance. Include a copyable agent prompt with real API limits. Prove setup works from a clean consumer context; publishing a package is unnecessary.

## Next product phase

### 07 — Implement single-category selection

Blocked by: None.

Deliver: one category can be selected with appropriate native radio semantics, visible selection, labels and keyboard behavior. Represent the same supported behavior in Figma and an interactive Storybook example in all four combinations. Do not turn informational Badge/Chip into a button by appearance alone.

### 08 — Implement multiple-category selection

Blocked by: None.

Deliver: users can choose and remove several onboarding categories using Checkbox semantics, with explicit selection and any required group validation. Match Figma and an interactive Storybook example. Build on the existing Checkbox rather than waiting for single-selection work.

### 09 — Validate one reusable expense flow

Blocked by: 02, 03, 04, 07.

Deliver: a small coded reference and corresponding Figma journey show an empty expense list, add form, invalid submission, correction and saved result. Include date, amount, category and reimbursement choice, with in-memory state and explicit persistence limits. Verify mobile and one wider layout in all four combinations; preserve entered values across mode changes.

Scope: no full finance application, receipt upload, backend, authentication or onboarding expansion. Ticket 08 is not a blocker because onboarding is not part of this slice. Tickets 05 and 06 improve adoption but do not gate implementing the reference inside the current project.

## Existing governance task to reuse

### 10 — Record a worked foundation change and release evidence

Blocked by: 03 for the proposed worked example.

Deliver: complete the existing foundations-first governance task rather than publish a duplicate. Trace the input-border repair from Figma decision through code, component, Storybook and change log. Record exact relevant checks and limitations, distinguish implemented from verified work, and describe the practical manual change/rename/retirement process.

This example can be finished before the expense reference. If a later release includes that reference, update its validation evidence at that time rather than making governance depend on every task.

## Publication after approval

Publish 01–09 as separate Markdown issue files under the audit-follow-up issues directory, with ready-for-agent status and explicit blocking edges. Reuse the existing governance issue for item 10; retain existing issue history and avoid duplicating or closing parent work.

First available work: 01–08. Recommended execution starts with 01 and 02, then 03/04 and the adoption route. Dependency freedom does not imply equal priority.
