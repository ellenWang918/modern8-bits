# Grid documentation layout

Status: ready-for-human

Use the Design Token documentation page as the layout reference for Grid Docs.

- Match its compact surface header, 1200px maximum width, page padding, and 180px sticky right contents rail.
- Move the contents navigation above the reading column at 960px and below; use 16px horizontal padding at 672px and below.
- Retain Grid's section content, web simulator, device explorer, and separate mockup stories. Per the follow-up request, remove the local preview label and appearance/presentation buttons; inherit the surrounding styling.
- Keep section links within the current documentation page and move keyboard focus to the target heading. Include References in the contents.

Validation: TypeScript/application build and production Storybook build passed. All five existing Grid story checks passed at both the standard viewport and 320 × 900. Desktop Storybook view and sticky contents navigation visually verified. Section links retain keyboard focus handling; simulators retain all four appearance/presentation combinations.

Follow-up validation: after removing the local preview controls, the application build and all five Grid story checks passed. Removed obsolete button interaction checks and unused local mode state/styles. Live header visually verified without the preview row.

Side-menu follow-up: use a viewport-height sticky rail through the footer, with independently scrollable links and a round 48px Back to top arrow at the bottom. At narrow widths, retain the contents above the page and keep the arrow in the bottom-right corner; reserve footer space for it. Clicking the arrow scrolls to the header and focuses its title. Application build and all five Grid checks passed; the navigation check also passed at 320 × 900. Live Storybook verified at the footer and after returning to the title. Screenshot: grid-menu-bottom.png.

Design Token follow-up: apply the same full-height sticky rail and round arrow to Variables.tsx/variables.css. The long contents list scrolls independently of the arrow. At narrow widths the arrow stays fixed at the bottom-right, with content padding to keep the last card reachable. Application build passed. Live Storybook verified at the page bottom and on return to the title; a 400px-wide documentation viewport verified the fixed 48px arrow fits inside the screen and returns focus to Design Token. Screenshot: design-token-menu-bottom.png.
