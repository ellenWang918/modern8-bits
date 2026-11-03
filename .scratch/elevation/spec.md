# Elevation foundation

Status: ready-for-human

Define Modern8-bits elevation using the supplied Atlassian and Material 3 reference pages, and publish the guidance in local Storybook using the Design Token/Grid documentation layout.

## Decisions

- Four semantic roles: Base, Sunken, Raised, Overlay. Per the follow-up request, Sunken is a shadow-free background well placed on Base, with child components inside it. It needs no extra stacking layer and is not used on Raised/Overlay.
- Paired neutral surfaces and soft shadows; dark raised/overlay surfaces become lighter. Base is shadow-free.
- Low-fidelity preserves boundaries and ordering while removing shadows and surface corner rounding.
- Document separate application stacking tokens, stacking-context limits, native top-layer behavior, and modal interaction requirements.
- Provide a seven-scenario simulator with simultaneous light/dark views, a presentation select, and a shadow visibility check. Preserve selections when presentation changes. Include a Sunken well containing two child components.
- Use the sticky full-height contents rail and round Back to top button. Hide test-only stories from normal navigation and avoid autoplay in live Storybook.
- Implement opt-in shared tokens/utility without changing existing component defaults. Mark new definitions as code-authored with Figma authoring pending; preserve the verified Figma snapshot.

## Reference evidence

- https://atlassian.design/foundations/elevation read 2026-11-03: surface/shadow pairs, restrained raised surfaces, lighter dark surfaces, and elevation separate from z-index.
- https://m3.material.io/styles/elevation/overview read in the live browser 2026-11-03: a small set of levels, tone or shadows as depth cues, and consistent resting/interacting states. The plain web reader receives a JavaScript-only shell; the browser rendered the full overview.
- Existing Figma-derived CSS definitions and the local verified inventory were read before adding the extension; no existing elevation definitions were recorded there. This work does not claim a fresh Figma synchronization.

## Validation

- Application TypeScript/Vite build and production Storybook build passed.
- Both elevation interaction/navigation stories passed at the normal viewport.
- All seven Elevation and Grid stories passed at 320 × 900, including scenario selection, scrim ownership, theme surface resolution, low-fidelity shadow removal, restored selections, overflow, section navigation, and Back to top focus.
- Live Storybook desktop review verified the role overview, light/dark dialog comparison, low-fidelity outlines, and return to the title. No test autoplay or duplicate navigation entries.
- React quality checklist: state derived without effects, stable component tree, native labeled controls, bounded visual layers, keyboard-operable navigation, and decorative preview context hidden from assistive technology.
- Rebuilt the downloadable starter archive so tokens.css includes a bundled elevation.css.
- Existing Card/Button defaults and the Figma token snapshot remain unchanged. Figma authoring of this extension remains pending and is explicitly described on the page.
- Screenshots: elevation-overview.png and elevation-simulator.png.

## Surface-and-shadow diagram

Added a code-native SVG illustration immediately below “Start flat. Add depth when it helps.”, using the supplied image as the visual reference. Two labeled leaders identify elevation/surface/raised and elevation/shadow/raised; the caption explains their pairing and the exaggerated separation. It uses semantic colors and accessible image text. Labels move below the illustration on narrow screens.

Validation: application build and both existing Elevation checks at 320 × 900 passed. Desktop and 320px-wide live preview visually verified. Screenshots: elevation-anatomy.png and elevation-anatomy-mobile.png.

## Sunken background role

Added Sunken as the fourth role per the follow-up request: a well drawn on Base, containing child components, with no shadow or extra stacking layer. It is documented for Base only. Added elevation/surface/sunken (gray/100 in light, gray/950 in dark) and elevation/shadow/sunken (none), a nested child example in the role overview, and a Sunken simulator scenario. Updated role labels, implementation recipes, token mappings, stacking guidance, DESIGN.md, and the Overview link. Dark behavior is explicitly adapted to the existing black Base rather than claiming to reproduce Atlassian's darker-than-default mapping.

Validation: application and Storybook builds passed. Both Elevation stories passed at desktop and 320 × 900, including light/dark Sunken colors, no shadow in both presentations, and distinct child-component surfaces. Live desktop simulator visually reviewed; starter ZIP rebuilt with the new tokens. Screenshot: elevation-sunken.png.

Preview refinement: preserve the same gray backdrop and preview height for all four role cards. The Sunken preview contains a Base surface, a smaller Sunken well, and a smaller component card nested inside; no special outer background treatment.

## Full Kanban layer illustration

Replaced the two-part Raised illustration with an exploded Kanban board showing the requested sequence: Base board → Sunken column → Raised shadow → Raised task card → Overlay shadow → Overlay actions menu. Six numbered labels identify the actual surface/shadow token names. Board columns and cards give context; shadows remain paired with the surfaces above them rather than being described as additional elevation roles. Caption and accessible image text explain the exaggerated gaps and that Sunken sits directly on Base in a real board.

Labels remain beside the diagram on wider screens and move into an ordered visual list below it on mobile. Application build and both existing Elevation checks at 320 × 900 passed. Desktop and mobile visuals verified; temporary viewport override reset. Screenshots: elevation-kanban-layers.png and elevation-kanban-layers-mobile.png.

## Simplified light reference illustration

The latest request supersedes the exploded Kanban diagram. Use the supplied dark reference's composition in light mode: broad cropped planes on the right, token labels and swatches on the left, and a + / 0 / − perceived-depth ruler. Show only Overlay, Raised, Base at zero, and Sunken; remove separate shadow geometry and labels. The caption distinguishes perceived depth from stacking order and retains Sunken's placement on Base in real layouts. The diagram explicitly uses light appearance. Existing individual role examples and simulator remain unchanged.

Validation: application build passed and live Storybook visually verified. Screenshot: elevation-light-reference.png.

Surface clarity follow-up: render Base as its own white plane against the neutral canvas, rather than using the canvas itself as Base. Apply soft blurred edge shadows directly to Raised and Overlay, with unique SVG filter IDs. There are still only four surfaces and no detached shadow layers or shadow labels. Application build passed; live visual verified. Screenshot: elevation-soft-surfaces.png.
