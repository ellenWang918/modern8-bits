# Modern8-bits interview walkthrough

Prepared on 5 October 2026. Approximately five minutes of speech, plus time for navigation and questions. Bracketed directions are demo cues; do not read them aloud.

## Speech

### 1. Purpose — Overview

[Open Foundation / Overview.]

“Modern8-bits is a personal design-system project for building responsive web products with clear foundations and a subtle sense of nostalgia.

I started it for two reasons: to demonstrate how I approach design systems, and to create something I can reuse in my own products. That gave me a practical constraint: it needed to be small enough to ship, but useful beyond a visual showcase.

The audience includes designers and developers, but also people building with coding agents who have little design experience. For that group, a component library alone is not enough. They also need guidance on what to choose and how to use it.”

### 2. Architecture — Design Token

[Open Foundation / Design Token. Show a semantic colour and its Light/Dark mappings.]

“I focused on foundations before expanding the component library.

The token architecture separates primitives, semantic roles, and component-specific decisions. A primitive stores a value; a semantic token explains its purpose; a component token captures a decision that the shared scales cannot express well.

For example, a component uses background/canvas instead of choosing white directly. That role changes between light and dark appearance while the component keeps the same structure.

Figma is the authoring source, and CSS is synchronized manually. I made the mappings explicit in the documentation so a designer, developer, or coding agent can inspect the same decision. I chose manual synchronization for this release because the scope is small and I wanted to establish reliable definitions before adding automation.”

### 3. Visual language — Typography and layout

[On Design Token, navigate to Typography and layout.]

“The visual direction balances a neutral product interface with a little character.

Space Grotesk is for headlines and expressive moments. IBM Plex Sans handles product UI and longer reading. IBM Plex Mono is reserved for metadata, technical details, and pixel accents.

The important part is assigning each family a role. Those roles include size, weight, line height, and tracking, with responsive changes for larger headings.

The same approach applies to spacing and geometry: shared rules first, then documented optical exceptions where a component needs them. Pixel treatments are optional accents, so the system can support different kinds of products without making every interface look like a game.”

### 4. A decision traced through the system — Error feedback

[Search Design Token for status/error/text. Then open Component / Input / Error and switch Appearance.]

“One concrete example is error feedback.

A filled error container and an inline error message need different colour roles, especially in dark appearance. I separated the container fill, its paired foreground, and the inline text colour rather than reusing one red everywhere.

That decision is represented in Figma variables, mapped to CSS, consumed by the Input component, and demonstrated in Storybook. The message also communicates the error in words and is linked to the field for assistive technology.

This is the level of connection I wanted: a design decision that remains meaningful from the definition to the working interface.”

### 5. Two ways to start — Getting Started

[Open Foundation / Getting Started. Enter “My project”, check Keep planning notes, and save. Switch Low-fidelity, then Dark.]

“For people building with AI, I added an initial choice: do they want the default theme, or a low-fidelity prototype to review the structure?

Presentation is separate from light and dark appearance. Low-fidelity uses plain typography, grayscale feedback, and less decoration, while preserving the same layout, labels, and interactions.

Here, I can enter information, select an option, and save. When I switch either mode, the values and result stay in place. That makes it possible to discuss structure without starting again.

I also wrote a usage guide covering the real component APIs and what to do when a capability is missing.”

### 6. Evidence and next steps

[Keep Getting Started visible.]

“I used coding agents to help implement the system. My responsibility was to set the direction, review the decisions, and verify the result.

The current implementation has five component families. Builds and 23 Storybook checks pass, supported by token comparisons, keyboard review, and narrow and wide layout checks.

This is an initial foundation, with documented differences between Figma and code. I have not yet validated adoption across industries or claimed complete accessibility coverage.

My next priorities are a worked governance example and testing the system in real products. The project demonstrates how I turn visual intent into shared rules, working components, and guidance that helps people make consistent decisions.”

## Demo route and preparation

1. [Overview](https://modern8-bits-up.vercel.app/?path=/docs/foundation-overview--docs).
2. [Design Token](https://modern8-bits-up.vercel.app/?path=/docs/foundation-design-token--docs).
3. [Input Error](https://modern8-bits-up.vercel.app/?path=/story/component-input--error). Use the Appearance toolbar.
4. [Getting Started **Docs**](https://modern8-bits-up.vercel.app/?path=/docs/foundation-getting-started--docs). Use its local Presentation and Appearance controls.

Use the Getting Started Docs page for the live demo. The Interactive Example story runs its automated interaction test and can start with a completed example, which is less suitable for a clean live demonstration.

The user confirmed `https://modern8-bits-up.vercel.app` as the published URL. A fresh check of its public Storybook index confirms all four demo routes are now included. The earlier index check reflected an older deployment. Route availability is verified; rehearse the interactions on the published site before the interview. Local fallback: `http://localhost:6006`.

Open routes in advance, let the fonts load, and rehearse the switches. Keep the Input Error example ready so it does not take time to find during the interview.

## Evidence behind the speech

- [Presentation results](../.scratch/foundations-first-release/presentation-result.md): 23 Storybook tests, 264 token-value checks, four combinations at 390/1440px, state preservation and keyboard review. These are checks of the local implementation, not proof of the deployed version or a complete accessibility audit.
- [Foundation alignment](../.scratch/foundations-first-release/gap-7-result.md): Figma/CSS mappings, typography roles, supported component subsets and representation differences.
- [Token rules](../TOKEN-RULE.md): current naming, aliasing, manual synchronization and maintenance guidance.
- [Usage guide](../USAGE.md): initial mode question, setup, implemented APIs and missing-capability handling.

## Likely follow-up questions

**Why only five components?** I constrained the first release so I could establish reliable foundations and demonstrate them end to end. Further components should follow real product needs.

**How do you know it works for different industries?** The foundations are intentionally neutral, but broad industry suitability is a hypothesis. It needs testing with real products and users.

**What did AI contribute?** Coding agents supported implementation and verification. I set the design direction, made the scope and role decisions, and reviewed the outputs. I would explain a specific decision rather than claim I manually wrote every line.

**How will you maintain it?** Current rules cover explicit mappings, changing definitions with their consumers and documentation, and temporary aliases for renames. A worked governance example, release change log, and a more formal process remain next steps; there is no claim of an established organization-wide workflow.
