# Gap assessment

Reviewed: 2026-10-04
Method: initial local source and documentation inspection, followed by live read-only Figma inspection. No runtime or visual audit performed. See [verified Figma inventory](figma-inventory.md) for updated evidence; full parity remains unverified.

The table below preserves the initial source findings. Figma coverage and misleading scope/parity claims were subsequently investigated and corrected in ticket 01. Figma contains status/focus roles and full text styles that CSS still lacks; remaining work is largely alignment rather than starting over.

Paths below are repository-relative evidence references.

| Area | Existing evidence | Gap against the confirmed brief | Priority |
| --- | --- | --- | --- |
| Positioning | README.md and DESIGN.md describe an adaptable system with pixel accents | Add novice/agent audience and subtle nostalgia; remove current-release promises of user-supplied primary colours | High |
| Figma authoring | Storybook links to the Figma file | storybook/README.md says overview only, while Overview.mdx claims real variables/styles throughout. Neither establishes current coverage. Inventory the live file before planning edits | First |
| Token layers | tokens.css has neutral primitives, semantic colours, scales, and button heights; TOKEN-RULE.md explains three layers | Record Figma-authoring/manual-sync relationship; reconcile aliases, undocumented techno colour and radius values, and motion naming | High |
| Status and focus | Components have error states and use action colour for focus | No status colour definitions or dedicated focus role in tokens.css. Primary action remains black in dark appearance, including focus outlines; visibility needs validation and revised mappings | High |
| Typography | Three agreed families are imported; DESIGN.md lists type roles | CSS tokenizes families only. Component sizes/line heights are local; ordinary Button labels use Mono. Implement full roles and migrate usage | High |
| Layout and geometry | Spacing/radius/stroke values exist; DESIGN.md specifies grid breakpoints | Showcase uses 760/420px breakpoints rather than the documented 672/1056px grid; layout values and exceptions need one coherent contract | High |
| Foundation examples | Overview and spacing/radius documentation exist | Dedicated colour/theme, typography, and layout evidence is missing; spacing illustrations use $spacing labels unlike actual m8 names | High |
| Components | Five React components and stories exist | Raw typography/geometry values and primitive shadow references remain. Default contained Button hover also has a pixel-like offset shadow; review against opt-in pixel styling | High |
| Presentation modes | preview.tsx provides light/dark appearance control | No low-fidelity mode, mode-specific definitions, or demonstrated switch preserving behaviour | High |
| Agent use | Repository maintenance instructions exist | No product-building guide offering the mode choice and describing real available capabilities | High |
| Governance | TOKEN-RULE.md has naming, references, migration, and maintenance guidance | Add owner responsibilities, manual sync checklist, real worked change, and release change log; avoid fictional team processes | Medium |
| Validation | Accessibility addon and Chromium story test configuration exist | Configuration is not evidence of passing checks. Record build/test results plus keyboard, contrast, and responsive review after changes | High |

## Specific follow-up checks

- Checkbox.tsx only associates its supporting message when a caller supplies an id. Validate descriptive relationships in existing stories and correct as needed.
- Storybook's theme decorator sets data-theme on a wrapper, while page background is styled on body. Verify themed canvas and documentation surfaces visually.
- Keep low-fidelity presentation separate from appearance; test all four combinations.
- Do not infer live Figma state from either local README claim.
- Preserve existing user changes in README.md, DESIGN.md, TOKEN-RULE.md, logos, and repository guidance.

## Assessment limits

These are source-backed implementation gaps and review targets, not a completed accessibility audit or proof of runtime failure. Figma inventory is the first execution task. No application source was changed during this assessment.
