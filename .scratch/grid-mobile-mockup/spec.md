# Mobile Grid mockup

Status: ready-for-human

Add a grey-box mobile app preview under Foundation / Grid / Mobile Mockup. Reuse the existing measured device dataset without refreshing or changing profiles. Provide Home, Browse and Details screens, a scrolling content area, reachable bottom actions, safe-area/grid guides, long text, appearance/presentation controls and restricted columns. Preserve form state in memory.

Use each measured application-window size and safe insets. For recorded obstructions, show their geometry and conservatively select the largest remaining clear content rectangle. Explain this single-pane policy and the preview's limits. It is a browser layout demonstration, not a native application or device emulator. Device measurement coverage and production publishing remain separate.

## Result

Available at `http://127.0.0.1:6006/?path=/story/foundation-grid--mobile-mockup`.

Implemented Home, Browse and Details; device/orientation/configuration selectors derived from the existing dataset; restricted columns; low-fidelity/default, light/dark, long-text and overlay controls; scrolling content with bottom navigation/actions; and controlled, in-memory form state. Inspected the interior-camera Duo profile in Storybook: neither recorded region intersects the content rectangle and content has no horizontal overflow.

Validation: application and Storybook builds pass. The five Grid story checks passed; the mobile check also passed at a 320 × 900 review viewport. Geometry assertions cover all 94 recorded profiles. UI checks sample both ends of each device/orientation's configurations, verify bottom-action placement, and exercise all four presentation/appearance combinations with retained form state. Manual Storybook browsing does not run the automated device sweep or prefill the form.

The largest-rectangle choice is an intentionally conservative single-pane example, not an optimized foldable layout. Unreported obstruction geometry, native OS/browser behavior and on-screen keyboards remain outside this preview's evidence. Source measurement files and device coverage were not changed. Publication is separate.
