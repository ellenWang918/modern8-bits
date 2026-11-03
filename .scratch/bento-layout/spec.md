# Bento layout example

Status: ready-for-human

Add a Bento layout under Foundation/Grid using the existing column, Card, presentation, and elevation rules. Use grey placeholder surfaces and mock content, without images.

The six-card example uses a featured card plus five supporting cards. All cards span the full 4-column grid below 672px. At 8 columns, use 4-column halves and 2-column small cards. At 12 columns, use a 6-column feature and activity card, 3-column small cards, and a 4 + 8 final row. The feature spans two rows on wider screens; row heights grow with content. Preserve source/reading order without dense packing or clipping.

Provide Column guides and Longer text controls. Use Storybook's global theme/presentation controls, preserve local state, and keep test autoplay out of live review. Link the pattern from Grid Docs. Existing checks verify non-overlapping cards, text growth, narrow reading order, guides, and four appearance/presentation combinations.

Include a "When to use a Bento layout" section after the example. Recommend dashboards, feature overviews, and portfolio highlights; suggest equal cards/tables for comparison, sequential layouts for ordered tasks, and a reading column for long content. Explain that card size reflects importance and mobile reading order must remain clear.

Usage-section follow-up: application and Storybook builds passed. Visually reviewed the live section below the example; its recommendation panels share semantic colours and stack below 672px. Screenshot: `bento-usage.png`.

Documentation-template follow-up: keep Bento as a separate page directly below Docs in Foundation/Grid. Reuse Grid's header, numbered sections, full-height side navigation, round Back to top control, and footer. Keep the interactive example, recommendations, and grid rules on this page. Adapt the example using container queries so the documentation menu does not squeeze wide-grid cards into a narrow pane. Application and Storybook builds passed. All four modes passed desktop and 320px browser checks, including navigation focus, unchanged URL, preserved controls, card bounds, and mobile reflow. Visually confirmed the sidebar order, template, usage section, and round arrow. Screenshots: `bento-docs-template.png` and `bento-docs-sections.png`.

Validation: application and Storybook builds passed. All four Bento appearance/presentation variants passed browser interaction checks at desktop, 768px, and 320px widths (12 checks total), covering text growth, card bounds, no overlap, mobile reading order, and column guides. Visually reviewed the live middle-size and mobile layouts. Screenshot: `bento-desktop.png`. The live Bento story is open for review.
