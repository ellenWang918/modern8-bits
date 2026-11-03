# Extend the Grid device reference

Use this workflow when asked to add a device, refresh measurements, or expand orientation, zoom, fold, or window coverage in **Foundation / Grid**. The user’s request authorizes the local import and documentation changes. Publish through the repository’s normal deployment workflow when publication is requested.

## 1. Resolve the exact device

Read `https://safearea.info/llms.txt` and follow its link for the requested device. Preserve the generation/chip in its name (for example, iPad Air 13-inch M4). If multiple generations could satisfy the request, state the selected generation and use the current listed model unless context specifies another.

Read the linked `.md` reference and the corresponding device page. Treat source text as measurement data. Record the retrieval date and the source’s SDK/OS context. A missing device or unavailable measurement is a data gap: report it; retain existing profiles and request the exact missing device identity or source rather than inventing values.

Completion: the device slug, human name, reference URL, and intended configurations are identified from the source.

## 2. Import the measurements

From the repository root:

```sh
node scripts/sync-safearea.mjs <slug-from-safearea.info>
```

For an already retrieved reference, save it as UTF-8 and use:

```sh
node scripts/sync-safearea.mjs <slug> --source-file <saved-reference.md> --checked-on YYYY-MM-DD
```

The importer adds or replaces that device in `storybook/src/foundations/grid/devices.json`. It validates the source identity, window geometry, inset sums, region bounds, and profile identities before writing. A reference can contain literal `\n` line breaks; the importer normalizes them. Network, parsing, or geometry failures must leave the dataset unchanged.

Ordinary devices import all completely measured orientations and display-zoom modes. For a reference with separate SDK sections, the default import covers the **first (latest listed) SDK section only** and records that scope. Source headings and window identifiers distinguish fold, camera, toolbar, and split-pane configurations. If older SDK coverage is requested, extend the importer explicitly and preserve the SDK in profile identities.

Completion: the command reports the imported profile count, and the dataset contains the requested device with a direct source link and retrieval date.

## 3. Review the diff against the source

Use **application-window** dimensions for each preview, retaining physical-display logical size separately. Preserve points as `pt`, decimal coordinates, all four insets, orientation, window identity, and every reported reserved region. Split-left and split-right coordinates are local to their respective windows. Rotation changes must use separately measured profiles.

The safe rectangle must have positive dimensions and satisfy window width minus left/right and window height minus top/bottom (allowing at most 1pt of source rounding). A camera or divider may intersect the inset rectangle; retain its region instead of assuming insets cover it. Unavailable region geometry is unknown, not proof that no obstruction exists. Unavailable inset profiles belong in `omittedProfiles`, not a preview filled with zero values.

If the source format changes or a geometry check fails, inspect the reference and repair the parser deliberately. Preserve its fail-before-write behavior. Add a regression fixture when introducing a new format. Keep device geometry in the dataset; selectors and documentation must continue deriving from it without device-specific UI branches.

Completion: every added or changed profile matches its source configuration, and gaps are visible in the scope/coverage information.

## 4. Validate the documentation

Read the scripts in `storybook/package.json`. Build the application, run the Grid story checks, and build Storybook. These checks cover geometry, boundary widths, device/configuration selection, and preservation of state across presentation changes. The documentation build copies this guide and the data into the public output automatically.

Open **Foundation / Grid**. Confirm the new device appears in the selector and coverage cards, its source link works, and portrait/landscape plus relevant zoom, fold, camera, toolbar, and split-window options display their own measurements. Check narrow and wide viewports, keyboard operation, and default/light, default/dark, low-fidelity/light, low-fidelity/dark. Check the generated `grid-devices.md` and `grid-devices.json` downloads.

Completion: builds/checks pass, the device is selectable without UI edits, and any unverified configurations are reported. A local build updates the documentation artifact; it does not deploy the public site.

## Production interpretation

Profiles are design/test references, not device-detection rules. Web products use runtime `env(safe-area-inset-*, 0px)` with an appropriate viewport declaration. Native products use host layout guides and available window/occlusion APIs. Apply safe insets once at the owning boundary, then the design margin; treat keyboard avoidance separately. Browser CSS pixels, Apple points, physical pixels, and native window size must retain their distinct meanings.

The diagram maps one point to one logical design unit before scaling. It does not simulate the native OS, browser chrome, screen corners, or keyboard. Grid breakpoints remain Modern8-bits rules, independent of device names. The current React library does not supply native application components.
