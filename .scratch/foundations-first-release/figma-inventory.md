# Verified Figma inventory and release mapping

Historical baseline. Subsequent gaps 4–7 align 106 variables and 16 text styles; see [current gap 7 result](gap-7-result.md). Tables below preserve the pre-change findings.

Inspected: 2026-10-04. Read-only Plugin API inspection of [Modern8-bits](https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/Modern8-bits).
No Figma nodes or definitions were changed. This is a structural inventory, not visual validation.

## Existing definitions

- 25 pages.
- 57 local variables in two collections: Spacing & Radius (17, Default mode; ID VariableCollectionId:24:2) and Color (40, Light/Dark modes; ID VariableCollectionId:29:387).
- 12 local text styles using the three agreed families.
- Verified component sets: Button (44:2), Button / Icon only (44:3), Card (65:38), Checkbox (81:107), Text Field (81:66).
- Other page names include Chip and Radio button. These were not inventoried internally and do not expand release scope.
- No Badge mapping was verified. Do not assume Chip is equivalent to Badge.

## Foundation references

| Area | Page | Main documentation frame |
| --- | --- | --- |
| Colour/tokens | 3:4 | 74:2 |
| Typography | 3:5 | 20:21 |
| Spacing/radius | 3:6 | 27:314 |

Typography also contains a frame named Spacing & Radius (118:12); inspect purpose before moving or removing it.

## Spacing: explicit migration mapping

Figma uses ordinal steps after space/4; code uses multiples of 4px. Preserve values during naming migration. Never match by name alone.

| Existing Figma name | Value | Current CSS token |
| --- | --- | --- |
| space/1 | 4px | --m8-space-1 |
| space/2 | 8px | --m8-space-2 |
| space/3 | 12px | --m8-space-3 |
| space/4 | 16px | --m8-space-4 |
| space/5 | 24px | --m8-space-6 |
| space/6 | 32px | --m8-space-8 |
| space/7 | 48px | --m8-space-12 |
| space/8 | 80px | --m8-space-20 |

Release convention: use the repository's documented multiplier names in both tools, retaining Figma variable identities and bindings during any later rename. Plan renames as a batch to avoid transient name collisions. This is a migration plan, not a completed Figma edit.

## Geometry and control discrepancies

- Figma radius/sm, md, lg alias 4, 8, 12px spacing variables; full is 9999 and none is 0. Code has small/medium plus sm/md compatibility aliases. Map Figma sm/md to the established small/medium names during migration.
- Figma button/height/sm, md, lg = 32/40/48px; CSS = 36/44/52px. A value decision is required during component alignment; do not silently change either while merely renaming.
- Figma has stroke/hairline = 1; code also defines stroke/pixel = 2.
- No local motion or responsive-layout variables were returned. Text styles cover desktop-size roles but not an explicit responsive scale.

## Colour differences

Most neutral palette and surface/text mappings already agree.

| Role | Figma | Code |
| --- | --- | --- |
| action/primary, dark | white (gray/0) | black (brand/primary) |
| action/on-primary, dark | black (gray/1000) | white |
| border/focus | black in light, white in dark | absent; components use action/primary |
| Disabled action pair | background + foreground roles defined | absent; component-local treatments |
| Status pairs | error, success, info and their on-colours | absent |
| Warning pair | absent from inspected local variables | absent |
| Primary container pair | defined | absent |
| Card roles | background/card and border/card exist | shared raised/default roles used |

Treat status/on-* as foreground on its corresponding status background, not as interchangeable body text. Verify intended use and contrast before consuming. Preserve existing Chip/Card variables until their consumers have been inspected; do not delete them to force scope alignment.

## Existing text styles

| Figma style | Family/weight | Size / line height | Tracking |
| --- | --- | --- | --- |
| display/hero | Space Grotesk 700 | 72 / 78px | -2px |
| display/large | Space Grotesk 700 | 48 / 54px | -1px |
| heading/section | Space Grotesk 500 | 32 / 38px | -0.4px |
| heading/card | Space Grotesk 500 | 24 / 30px | 0 |
| body/large | IBM Plex Sans 400 | 18 / 28px | 0 |
| body/base | IBM Plex Sans 400 | 16 / 24px | 0 |
| body/small | IBM Plex Sans 400 | 14 / 20px | 0 |
| utility/label | IBM Plex Mono 500 | 12 / 16px | 1.2px |
| utility/micro | IBM Plex Mono 400 | 10 / 14px | 1px |
| button/label/sm | IBM Plex Mono 500 | 12 / 16px | 0 |
| button/label/md | IBM Plex Mono 500 | 14 / 16px | 0 |
| button/label/lg | IBM Plex Mono 500 | 16 / 24px | 0 |

CSS currently tokenizes font families, not complete roles. DESIGN.md's display/heading weights, families, and some sizes differ from Figma. Preserve the confirmed family responsibilities; assess existing Figma styles as the authored starting point rather than silently adopting the older Markdown scale. Ordinary button typography needs alignment with the confirmed Sans UI role.

Proposed mapping contract: Figma text styles map to named CSS role bundles (family, size, weight, line height, tracking), with an explicit table if names differ. Typography ticket finalizes names and responsive values.

## Component scope and parity

- Button has contained/outline/ghost/disabled treatments and icon-only variants. The inspected list includes two same-named large ghost variants; inspect before consolidating.
- Card uses size variants in Figma, while code exposes default/pixel treatments.
- Checkbox has two sizes and an indeterminate state in Figma; these do not establish corresponding code support.
- Text Field has three sizes and default/focus/error/disabled states. Code Input has no equivalent size API.
- Full one-to-one component parity is not established. Release examples must identify their supported subset.

## Minimum release inventory

1. Reuse neutral primitives and colour semantics; complete warning, state, and focus decisions, then sync code.
2. Reconcile spacing names without changing bound values; document radius and control-size decisions.
3. Reuse the three-family text-style foundation; implement full CSS roles and responsive rules.
4. Add missing layout/stroke definitions where justified, avoiding unused tokens.
5. Author low-fidelity presentation as a separate concern from appearance, then demonstrate the existing component subset.
6. Maintain name/value mappings and verification evidence; no automatic synchronization claim.

## Evidence limits

Collection and style inventory is file-wide. Canvas inspection covered seven relevant pages, not every node in all 25 pages. No visual appearance, variable-binding completeness, accessibility, or library publication status was verified.

