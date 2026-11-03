# Grid stories changing themselves on opening

Status: ready-for-human

Reproduced in the local Storybook: open Column Restrictions, do not use its controls, and read the selected values after its play function finishes. Expected viewport/layout/scenario/columns: `1280 / constrained / halves / auto`. Actual before the fix: `1920 / fluid / full / 4`. During this transition the play function also clicks appearance/presentation controls and scrolls to different sections.

Cause: story play functions are executed by ordinary Storybook browsing as well as the automated test runner. The restriction check, section-navigation check and interactive-guidance check were changing visible UI on opening.

Fix: apply the same test-mode guard already used by Mobile Mockup to the other three Grid play functions. Manual development and static production previews keep their initial state; the explicit `--mode test` run continues to execute the full checks. No test assertions were removed.

Regression verification uses the actual Storybook opening flow and selected DOM values, plus the existing five Grid checks in test mode. No new test that merely mirrors the guard was added.

Verified after the fix: reloading Column Restrictions preserves `1280 / constrained / halves / auto`; the same opening assertion that failed before now passes. Manual selection of `1280 / constrained / full / 8` also remains in place. All five Grid checks still execute and pass with `--mode test`; application and static Storybook builds pass.

The user subsequently requested one place for the guidance. Column Restrictions, Interactive Guidance and Section Navigation now remove the sidebar `dev` tag while retaining their implicit `test` tag. Grid Docs remains the single guidance page, with Website Mockup and Mobile Mockup as distinct experiments. No simulator or navigation capability was removed from Docs.
