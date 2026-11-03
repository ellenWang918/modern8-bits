export const webGridExample = `/* Import tokens.css first. Apply the grid within main content.
   Modern8-bits content-max includes the inline padding. */
.page-grid {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(var(--m8-layout-columns), minmax(0, 1fr));
  gap: var(--m8-layout-gutter);
  width: 100%;
  max-width: var(--m8-layout-content-max);
  margin-inline: auto;
  padding-inline: var(--m8-layout-gutter);
}
.page-grid > * { min-width: 0; grid-column: 1 / -1; }
@media (min-width: 672px) {
  .page-grid__half { grid-column: span 4; }
}
@media (min-width: 1056px) {
  .page-grid__half { grid-column: span 6; }
}
/* For long-form text, constrain a child to about 65ch.
   For a board, remove the max-width and contain its own overflow. */`

export const safeAreaExample = `<!-- Required for an edge-to-edge web / installed web app. -->
<meta name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover" />

/* The outer shell owns the inset ONCE. Backgrounds may bleed. */
.app-safe-shell {
  box-sizing: border-box;
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: env(safe-area-inset-top, 0px);
  padding-right: env(safe-area-inset-right, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);
}
/* Put .page-grid inside this shell: it adds the design margin.
   Insets + design margin keep content inside the safe rectangle. */

/* A fixed footer is outside normal flow and owns its own bottom inset. */
.app-footer {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  padding: var(--m8-space-4);
  padding-left: calc(env(safe-area-inset-left, 0px) + var(--m8-space-4));
  padding-right: calc(env(safe-area-inset-right, 0px) + var(--m8-space-4));
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + var(--m8-space-4));
}
/* Reserve the footer's actual rendered height in scrolling content.
   Read it with ResizeObserver when content/text size can change. */`
