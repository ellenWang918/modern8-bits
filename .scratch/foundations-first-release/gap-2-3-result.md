# Figma gaps 2 and 3: completed

Date: 2026-10-04

## Gap 2: documentation corrections

- Node 109:255: dark background/raised mapping changed from gray/1000 to gray/800, matching the existing variable alias.
- Node 109:383: displayed action/disabled/text renamed to action/disabled/on-background, matching the existing definition.

## Gap 3: variable descriptions

All 57 existing local variables now have descriptions in Figma. Semantic colours include intended role, paired foreground/background where relevant, and usage limitations. Primitive and dimensional descriptions identify their role and current mapping discrepancies. Chip descriptions were checked against actual component bindings before writing.

## Validation

The mutation returned all affected node and variable IDs, verified zero empty descriptions, and verified that variable names, values, aliases, and scopes were unchanged. The resulting colour page was screenshot-reviewed for layout and text fit. No application source or token definitions were changed.

Remaining gaps: token layering, state coverage, status implementation, and Figma/code synchronization. Descriptions document limitations; they do not resolve these implementation gaps.

## Description reference

### brand/primary

Primitive. Fixed black brand value for the first release. Consume action/primary for controls: its dark appearance uses white. This is not a user-customization input.

### background/canvas

Semantic background. Base page background. Use text/primary or text/secondary for content; light resolves to gray/0, dark to gray/1000.

### background/surface

Semantic background. Subtle sections and inset areas on the canvas. Light: gray/50; dark: gray/950. Pair with semantic text roles, not action/on-primary.

### background/raised

Semantic background. Raised containers above the base surface. Light: gray/0; dark: gray/800. Pair with text/primary or text/secondary. Elevation is not an interaction state.

### background/card

Existing Card background role. Light: gray/0; dark: gray/800. Use with text/primary or text/secondary and border/card. Retain for current Card bindings; consolidation with background/raised is pending.

### text/primary

Semantic foreground. Main readable content, headings, and control labels on neutral canvas, surface, or raised backgrounds. Do not use as the foreground of filled actions or status containers; use their paired on-* role.

### text/secondary

Semantic foreground. Supporting content on neutral canvas, surface, or raised backgrounds. Remains readable and does not mean disabled. Do not reuse for borders merely because values match.

### text/muted

Semantic foreground. Lower-emphasis metadata and supplementary content on neutral surfaces. Not a disabled state. Check contrast on the actual surface, especially gray/800 in dark appearance; use text/secondary if stronger contrast is needed.

### icon/primary

Semantic foreground. Meaningful icons on neutral canvas, surface, or raised backgrounds. Icons inside filled actions or status containers use the corresponding on-* foreground. Provide labels or accessible names for actionable icons.

### border/default

Semantic border. Quiet separators and decorative container outlines. Not sufficient by itself to identify every interactive control or focus state; use border/strong or border/focus as appropriate.

### border/strong

Semantic border. Emphasized outlines and boundaries that need clear separation from neutral surfaces. Does not indicate keyboard focus or error by itself.

### border/card

Existing Card outline role. Light: gray/200; dark: gray/600. Retain for current Card bindings; do not assume it equals border/default in dark appearance.

### border/focus

Semantic focus indicator. Visible keyboard-focus outline against neutral surfaces. Light: brand/primary; dark: gray/0. Keep separation from filled controls and check adjacent surfaces; do not substitute for ordinary borders.

### action/primary

Semantic background. Highest-priority filled action. Pair text and icons with action/on-primary. Light: brand/primary; dark: gray/0. This is the base action fill, not a definition of hover or pressed behaviour.

### action/on-primary

Semantic foreground. Text and icons on action/primary only. Light: gray/0; dark: gray/1000. Do not place directly on the page canvas.

### action/secondary

Semantic background. Secondary filled action where that treatment is deliberately used. Pair with action/on-secondary. Current values match primary actions; distinguish priority through treatment and layout, not assumed colour differences.

### action/on-secondary

Semantic foreground. Text and icons on action/secondary. Do not infer usage on transparent or outlined controls from this role.

### action/primary-container

Semantic background. Lower-emphasis action container. Pair with action/on-primary-container. Light: gray/50; dark: gray/800. Not a generic text, icon, or hover colour.

### action/on-primary-container

Semantic foreground. Text and icons on action/primary-container. Light: gray/1000; dark: gray/0. Use only with the paired container or after checking the actual surface.

### action/disabled/background

Semantic disabled-control background. Pair with action/disabled/on-background and an actual disabled interaction state. Do not apply additional opacity without checking the resulting appearance.

### action/disabled/on-background

Semantic disabled-control foreground. Text and icons on action/disabled/background. Not for active supporting text. Current Figma picker scopes need review if unavailable for text binding.

### chip/outline/grey

Legacy component background. Currently bound to Neutral Chip fills, despite the outline/grey name. Not an outline colour or shared gray primitive. Retain existing bindings until semantic migration.

### chip/contained/dark

Legacy component background. Fill for the Chip Dark tone in both appearances. Pair with chip/dark. The name describes a legacy treatment, not a fixed dark appearance; semantic migration is pending.

### chip/dark

Legacy component foreground. Label and dismiss-icon colour on chip/contained/dark. Do not use as a generic dark colour. Semantic migration is pending.

### chip/outline/outline

Legacy component background. Fill for outlined Chips; the outline itself uses border/strong. Do not bind this variable to the stroke based on its name. Semantic migration is pending.

### radius/none

Primitive geometry. 0px corners for crisp surfaces and pixel treatments. Select by intended shape rather than applying to every product surface automatically.

### radius/sm

Existing radius alias. Resolves to space/1 (4px); subtle rounding for compact controls. Documentation uses radius/small; naming alignment is pending. Do not change the referenced spacing value to change radius alone.

### radius/md

Existing radius alias. Resolves to space/2 (8px); moderate rounding for containers. Documentation uses radius/medium; naming alignment is pending. Do not change the referenced spacing value to change radius alone.

### radius/lg

Existing radius alias. Resolves to space/3 (12px). Larger rounding for existing consumers; retain during migration. Not a default shape recommendation; picker scopes need review.

### radius/full

Primitive geometry. 9999px radius for pill and circular silhouettes where intended. Not a default for all controls. Actual shape depends on element dimensions; picker scopes need review.

### stroke/hairline

Primitive stroke width. 1px for quiet borders and separators. Colour comes from a border role. Focus and pixel emphasis may need different widths.

### status/error

Semantic status background. Failure or validation-error container fill, paired with status/on-error. Include explicit text or an icon cue. Dark-mode values are subdued fills and must not be used directly as readable status text on a dark canvas. Colour alone does not communicate the status.

### status/on-error

Semantic status foreground. Text and icons on status/error. Use with its paired fill; this does not define a universal inline error text colour. Retain readable labels and verify contrast on actual backgrounds.

### status/success

Semantic status background. Successful outcome container fill, paired with status/on-success. Include explicit text or an icon cue. Dark-mode values are subdued fills and must not be used directly as readable status text on a dark canvas. Colour alone does not communicate the status.

### status/on-success

Semantic status foreground. Text and icons on status/success. Use with its paired fill; this does not define a universal inline success text colour. Retain readable labels and verify contrast on actual backgrounds.

### status/info

Semantic status background. Informational container fill, paired with status/on-info. Include explicit text or an icon cue. Dark-mode values are subdued fills and must not be used directly as readable status text on a dark canvas. Colour alone does not communicate the status.

### status/on-info

Semantic status foreground. Text and icons on status/info. Use with its paired fill; this does not define a universal inline info text colour. Retain readable labels and verify contrast on actual backgrounds.

### space/1

Primitive spacing. 4px for gaps, padding, and alignment on the shared rhythm. Current Figma names use ordinal steps; CSS uses multiples of 4px. Current CSS mapping: --m8-space-1. Avoid changing the value without reviewing all bound consumers.

### space/2

Primitive spacing. 8px for gaps, padding, and alignment on the shared rhythm. Current Figma names use ordinal steps; CSS uses multiples of 4px. Current CSS mapping: --m8-space-2. Avoid changing the value without reviewing all bound consumers.

### space/3

Primitive spacing. 12px for gaps, padding, and alignment on the shared rhythm. Current Figma names use ordinal steps; CSS uses multiples of 4px. Current CSS mapping: --m8-space-3. Avoid changing the value without reviewing all bound consumers.

### space/4

Primitive spacing. 16px for gaps, padding, and alignment on the shared rhythm. Current Figma names use ordinal steps; CSS uses multiples of 4px. Current CSS mapping: --m8-space-4. Avoid changing the value without reviewing all bound consumers.

### space/5

Primitive spacing. 24px for gaps, padding, and alignment on the shared rhythm. Current Figma names use ordinal steps; CSS uses multiples of 4px. Map by value: current CSS --m8-space-6, not by the same numeric name. Avoid changing the value without reviewing all bound consumers.

### space/6

Primitive spacing. 32px for gaps, padding, and alignment on the shared rhythm. Current Figma names use ordinal steps; CSS uses multiples of 4px. Map by value: current CSS --m8-space-8, not by the same numeric name. Avoid changing the value without reviewing all bound consumers.

### space/7

Primitive spacing. 48px for gaps, padding, and alignment on the shared rhythm. Current Figma names use ordinal steps; CSS uses multiples of 4px. Map by value: current CSS --m8-space-12, not by the same numeric name. Avoid changing the value without reviewing all bound consumers.

### space/8

Primitive spacing. 80px for gaps, padding, and alignment on the shared rhythm. Current Figma names use ordinal steps; CSS uses multiples of 4px. Map by value: current CSS --m8-space-20, not by the same numeric name. Avoid changing the value without reviewing all bound consumers.

### gray/0

Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.

### gray/50

Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.

### gray/100

Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.

### gray/200

Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.

### gray/400

Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.

### gray/600

Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.

### gray/800

Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.

### gray/950

Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.

### gray/1000

Primitive neutral palette value. Stable across light and dark appearances. Use semantic background, text, icon, border, or action roles in components instead of selecting this value directly. The numeric step is a palette identifier, not a contrast guarantee.

### button/height/sm

Component dimension. Existing Figma sm button height: 32px. Code currently uses 36px; synchronization is pending. This describes visible control height, not a guarantee of sufficient touch-target area; check target size and spacing for mobile use.

### button/height/md

Component dimension. Existing Figma md button height: 40px. Code currently uses 44px; synchronization is pending. This describes visible control height, not a guarantee of sufficient touch-target area; check target size and spacing for mobile use.

### button/height/lg

Component dimension. Existing Figma lg button height: 48px. Code currently uses 52px; synchronization is pending. This describes visible control height, not a guarantee of sufficient touch-target area; check target size and spacing for mobile use.
