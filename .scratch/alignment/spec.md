# Alignment foundation

Status: ready-for-human

Author original Modern8-bits guidance for geometric and optical alignment, applying to every component and layout. Add Foundation/Alignment using the existing documentation template, numbered sections, sticky side navigation, and round Back to top control.

Explain structural alignment first, visible edges and weight, text baselines, first-line alignment for multiline content, and local optical corrections that preserve component bounds, focus, hit areas, spacing, and reading order. Values in examples illustrate particular geometry rather than a universal offset scale. Include implementation ownership, typography/font and size checks, light/dark and low-fidelity review, zoom, long content, RTL, and a short review workflow.

Provide original before/after SVG diagrams for a play icon, circle/square visual size, mixed-size text baselines, hanging quotation marks, and layout content edges. Explain each example in ordinary text. Allow guides and appearance/presentation changes without resetting selections or navigation. Diagrams are authored documentation, not claims of already revised production components or Figma assets.

Record the rule in DESIGN.md, reconcile existing 4px optical-adjustment wording, and link Grid, Bento, Button, Card, and Input guidance. No global transform or bulk component geometry change. Add focused browser checks for controls/state, navigation/focus, preserved layout bounds, and narrow overflow. Run application and Storybook builds and review the live documentation.

## Validation

- Application and final Storybook builds passed.
- Four Alignment stories passed at desktop and 320px (8 browser checks), covering all appearance/presentation combinations, guide state, unchanged diagram frames across display changes, bounds, navigation focus, unchanged URL, and Back to top.
- Visually reviewed the live MDX documentation and all five comparisons. Confirmed dark low-fidelity with guides hidden and restored light/default with guides visible. Live page: `?path=/docs/foundation-alignment--docs`.
- Screenshots: `alignment-examples.png` and `alignment-dark.png`.
- React review: stable module-level components, controlled native labelled controls, no effects or remounts for display changes, scoped styles, descriptive SVG labels, and keyboard focus transfer for section navigation.
- The page is original system guidance. Component links and DESIGN.md now apply the rule; existing production component geometry and Figma assets have not been bulk changed or claimed as audited.
