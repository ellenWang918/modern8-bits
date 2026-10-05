# Gap 7: Figma/code foundation alignment

Completed: 2026-10-05. Scope: shared definitions and supported component mappings; no public component API expansion.

## Definitions

- Figma now contains 106 variables: 69 colours and 37 dimensional/motion definitions. All have scopes, descriptions, and matching WEB syntax. Existing spacing/radius identities, values, and bindings are preserved.
- Renamed ordinal spacing steps 5/6/7/8 to 6/8/12/20; radius sm/md to small/medium. Updated the authored guide and dormant code specimens without restoring the removed Storybook page.
- Adopted authored Button heights 32/40/48px in CSS. Recorded Input 36/44/52px and Checkbox 18/20px dimensions; code uses their medium variants.
- Added the authored medium Input's 14px horizontal inset and 6px supporting gap as explicit optical component tokens. Its neutral surface now matches Figma.
- Added 2px pixel stroke, 672/1056px layout breakpoints, 16/24/32px gutters, 1440px content maximum, and six existing motion durations. CSS retains old motion/radius aliases for compatibility. Media queries use the documented literal breakpoints.
- Removed the unused techno colour after replacing its only remaining consumer in dormant documentation with a semantic text role.

## Typography and components

Figma's 12 existing text styles are preserved; ordinary Button labels now use IBM Plex Sans. Added a 14/20 UI-label style and three mobile display/heading styles, for 16 styles total. Every style maps to complete CSS family, size, weight, line-height, tracking, and font bundle properties.

Below 672px, hero uses 48/54 rather than 72/78; large display 32/38 rather than 48/54; section heading 28/34 rather than 32/38. Body and control text retain their size. Arial/Courier New fallbacks can change wrapping.

Applied shared styles to existing Figma Button, Text Field, Checkbox, and default Card nodes. All five code components use shared typography and geometry. Code Card now matches the default authored surface/border, 24px padding, 32px gap, 8px radius, and heading/body roles. Pixel treatments remain explicit Mono/crisp-corner options. Removed the primitive underline from Figma's ghost hover specimen to match the implemented subtle-fill treatment.

## Review surfaces

- Storybook Design Token retains its existing layout, search, colour table, and contents rail. It adds Typography and layout examples, a responsive grid, and supported component mappings.
- Figma typography frame `153:2` shows all 16 roles and their CSS mappings, responsive rules, and control sizes. Corrected mismatched role labels and copied spacing text in the existing typography guides.
- Updated DESIGN.md, TOKEN-RULE.md, component guidance, and Storybook documentation.

## Validation

- All 106 Figma variables have valid syntax, explicit scopes, and resolving, type-compatible aliases without cycles. Existing verification was rerun after foundation changes; the final two optical tokens are direct FLOAT values with explicit bindings and syntax.
- Browser comparison: 212 variable/theme checks, zero mismatches. See `gap-7-token-parity.json`.
- Browser widths 390/672/1056/1440px: correct type scaling, column counts and gutters, 40px medium Button, 8px Card radius and 32px gap; no horizontal overflow or runtime errors. Sizes story confirms 32/40/48px in both appearances. See `gap-7-browser.json` and screenshots.
- Application build, Storybook build, and all 22 existing component checks pass. Figma typography, Button, and Text Field layouts were screenshot-reviewed without clipping.

## Explicit limits

This closes released-definition drift, not full one-to-one component API parity. Figma has additional Input/Checkbox sizes, indeterminate Checkbox, and a small Card layout with extra slots. Badge remains a code component; the richer Figma Chip has a different API. Code pixel treatments and SVG arrow do not establish identical Figma variants/icon infrastructure. Duplicate same-named large ghost Figma variants were preserved rather than destructively consolidated. These representation differences are documented on the Design Token page.

Low-fidelity mode, warning status, agent onboarding, broader governance, and the interview walkthrough remain separate planned work. No complete accessibility-compliance claim is made.

[Storybook review](http://localhost:6006/?path=/docs/foundation-design-token--docs) · [Figma typography mapping](https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/modern8-bits?node-id=153-2)
