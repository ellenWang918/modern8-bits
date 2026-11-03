# Restricted column selection

Status: ready-for-human

Add Auto / 4 / 8 / 12 selection to the Grid section 02 web simulator and the Website Mockup. Preserve the existing automatic breakpoint rules, fixed spans and positioning, gutters and margins. Disable counts exceeding the viewport's default column count or conflicting with the active layout. Explain restrictions and announce resets to Auto when viewport/layout changes invalidate a manual selection. Offer a full-width simulator scenario where lower counts can be explored without changing fixed proportions. Keep mobile device profiles unchanged.

## Result

Implemented shared column policy and disabled-option explanations in both views. Section 02 provides responsive halves, full-width content, responsive thirds and responsive 4 + 8 split scenarios. Stacked/full-width sections permit lower supported counts; fixed desktop spans lock their required count. Changing viewport or scenario resets incompatible manual choices and announces the reset. The mockup validates every variant as a complete page and also checks the selected count inside its embedded canvas.

Application build passes. All four Grid story checks pass, including new restriction, full-width override, resize/layout-reset, fixed-span, and four-presentation state-preservation assertions. Browser-verified the documentation controls and mockup resets: Homepage at 672px → 8 columns; Workspace at 320px → 4; Article at 1280px → 12. Computed track counts match; none of these pages overflow horizontally. The shared rule limits overrides to lower density, so no new minimum card width is introduced.
