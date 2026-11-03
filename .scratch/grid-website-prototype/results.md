# Grid website experiment — 3 November 2026

Local review: http://127.0.0.1:5173/grid-prototype.html

Run from `storybook/`: `npm run dev -- --host 127.0.0.1 --port 5173`.
Build the standalone entry explicitly: `npm run build -- --mode grid-prototype`. The normal Vite app build does not include it. At the user's request, the same experiment is now included in Storybook under **Foundation / Grid / Website Mockup**, with all three layouts and controls available in static Storybook builds.

## Finding

The current Grid rules support the basic geometry of a responsive website. They are not a complete product layout specification. Three structurally different pages were built with the same 4/8/12-column tokens: homepage (halves, thirds, 4+8 split), workspace (navigation outside the main grid and local card reflow), and article (contents rail and a separately constrained reading measure).

No foundation rules were changed. Choices below are provisional prototype decisions, not new Modern8-bits standards.

| Decision | Existing guidance | Choice made for the experiment |
| --- | --- | --- |
| Card minimum width | Reflow according to usable space; use container queries | Pair cards at a 560px local content threshold, otherwise stack; not a global breakpoint |
| Three cards on eight columns | Choose useful spans; no required arrangement | Stack the three cards at medium widths; alternatives include 4+4 then full span |
| Navigation | Keep navigation outside the main content grid | Header menu below 672px; workspace filters above content below 1056px; 240px rail above |
| Vertical rhythm | 8px rhythm, 4px half step | 80px hero spacing, 48px sections, 32px row gaps, 24px card padding |
| Reading | Start near 65ch | 65ch article measure within an 8-column span on large screens; content still wraps |
| Safe areas | Insets once at owning boundary, then design margin | Outer website owns CSS env() insets; optional labelled synthetic 24/16/34/16px insets |

The next useful additions to the guidance would be worked examples of local minimum widths, medium-width card arrangements, navigation collapse, and vertical spacing. These are judgment calls requiring content and usability review, not failures of the column calculation.

## Browser evidence

- All three layouts checked at 320, 671, 672, 1055, 1056, 1440 and 1920px. Actual iframe window widths and computed column counts were inspected.
- A second synchronized 21-case pass combined long headings/unbroken article text, RTL and synthetic safe insets. Confirmed the selected page had rendered before inspection. All cases had 4/4/8/8/12/12/12 columns, with no page-level horizontal overflow.
- At a 1920px viewport: constrained container measured 1440px; fluid container measured approximately 1905px (available content width after the browser scrollbar).
- At 320px: mobile menu expands with its trigger aligned in the first row; the placeholder form accepts input and produces in-memory confirmation.
- Default/light, default/dark, low-fidelity/light and low-fidelity/dark checked at 320px. The email value and checkbox selection persisted and the page stayed within its width.
- Browser review confirms the website uses grey boxes and mock text, with no image assets. Preview scaling changes display size, not the iframe's CSS viewport.

## Limits and next review

Native camera/fold regions, changing browser chrome, keyboard avoidance, physical touch targets and real-device zoom have not been validated by this website experiment. Synthetic insets demonstrate ownership only. RTL is a geometry exercise using Latin placeholder text, not a localized content review. No claims of complete accessibility or universal grid coverage.

The user accepted keeping all three layouts as a Grid documentation experiment. The Storybook story renders its preview through Storybook's own iframe route, uses relative documentation links and keeps the switcher visible in built documentation. No separate Vite server is needed by the Storybook page. Checked the static build at 320px with Workspace selected: 4 columns, no horizontal overflow, and working layout/width controls. Public deployment remains separate from this local integration.
