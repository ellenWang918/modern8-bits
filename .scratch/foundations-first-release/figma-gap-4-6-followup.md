# Figma gaps 4–6: visual completion

Date: 2026-10-04. User clarified further work on gaps 4–6 in Figma.

- Rebound every colour swatch in the original semantic table to its actual role, with explicit light/dark modes. Zero unbound table swatches remain.
- Replaced raw status hex labels with actual palette aliases, including the previously inconsistent dark information foreground label.
- Added 14 variable-bound palette specimens and side-by-side light/dark status containers and inline feedback.
- Added 22 instances of existing Button and Checkbox components demonstrating default, hover, pressed, focus, selected, and disabled treatments. These are static documentation specimens; no new component variants or APIs were created.
- Fixed auto-layout height and the dark primary specimen's stale paint fallback. Final screenshot inspection shows both complete appearance panels and correct dark primary fill.

Examples frame: `146:2`, 1280 × 1590. Ends at y=5137 within the guide height of 5185. Panels `146:65` and `146:132` explicitly use Light and Dark modes. Returned node IDs are in `figma-gap-4-6-followup-state.json`.

No design token values or application source changed in this follow-up. Gap 7 remains separate.

[Open the Figma examples](https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/modern8-bits?node-id=146-2)
