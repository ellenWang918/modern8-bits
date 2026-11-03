# Grid foundation and device safe areas

Status: ready-for-agent

Create a Storybook Grid foundation covering web and mobile layouts, informed by the user's Atlassian Grid, Carbon 2x Grid, Material 3 Layout, and safearea.info references. Preserve the existing Modern8-bits 4/8/12-column breakpoints and 8px rhythm. Explain margins, gutters, padding, constrained/fluid behavior, column spans, reflow, and safe-area ownership.

Initial device scope: iPhone 18 Pro Max, iPhone 17 Pro, iPhone Duo, and iPad Air 13-inch. Use the source's current listed M4 generation for iPad. Import measured orientation/zoom/window variants, with the latest source SDK for Duo; preserve reserved occlusion and division regions. Show source provenance and unavailable configurations. Use runtime insets in production recipes, keeping reference measurements distinct from runtime behavior.

Provide interactive diagrams, mode previews, an AI-readable extension workflow, a data-driven device inventory, and a validated import command. The import-to-build flow must add future devices to documentation without device-specific UI changes. Local implementation and build are in scope; production publishing and Figma authoring are separate actions.

## Source evidence

The `sources/` directory contains the public measurement references retrieved on 2026-10-23. The source responses contained literal backslash-n line breaks; they were normalized when saved. These are factual measurement snapshots used for offline import and source comparison. Canonical links are recorded with each imported device in `storybook/src/foundations/grid/devices.json`.
