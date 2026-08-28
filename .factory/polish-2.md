# Polish 2 — cumulative adversarial repair

Repair commit: `944c63955666ca6c90ccaa05d75e11c93dcb81fe`.

Local screenshots and URL-verifier report: `.factory/evidence/polish-2/query-demo/`. The direct sample URL used for verification is `http://127.0.0.1:4173/?demo=1`; deployed evidence is added to the handoff after release verification.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Retained the opaque sticky demo banner with Reset demo and Start for real at every scroll position. | `mobile demo warning and controls remain visible after mobile export scrolling`; `/demo` browser test. |
| F-1-2 | Real-mode saving is isolated from the demo, asserted against outgoing request data and IndexedDB. | `@claim:local-schedules`. |
| F-1-3 | Demo edits/reset are asserted not to alter real IndexedDB or localStorage snapshots. | `@claim:demo-isolation`. |
| F-1-4 | Both reminder paths are exercised; only explicit confirmation activates the expected editable mailto draft. | `@claim:confirm-reminder`. |
| F-1-5 | Kept the finite, honest “multiple schedules” wording and prove one free versus three paid records. | `@claim:one-free-schedule`. |
| F-1-6 | The first-screen action now opens `?demo=1`; it renders the complete HT-084 sample in one click. | `@claim:demo-ready`. |
| F-1-7 | Kept the precise invoice wording: plain instructions to attach to an invoice. | `@claim:two-payment-export`; landing copy audit. |
| F-1-8 | Kept payment/refund details behind the local Terms link rather than making an untestable landing assertion. | `tests/not-found.spec.ts`; `/terms` route test. |
| F-1-9 | Preserved the complete, metadata-bearing static 404 shell. | `tests/not-found.spec.ts`; `@axe-core/playwright` route scan. |
| F-1-10 | Preserved the compact mobile hero and visible first-screen facts. | `mobile landing shows all three plain facts before scrolling`. |
| F-1-11 | Kept the README opening as short plain sentences. | `.factory/copy-audit.md`. |
| F-1-12 | Regenerated the copy audit with landing and README wording, counts, claims, and terminology. | `.factory/copy-audit.md`. |
| F-1-13 | Retained “Export both payment deadlines.” | landing copy audit. |
| F-1-14 | Retained “Keep every payment schedule.” | landing copy audit; `@claim:one-free-schedule`. |
| F-1-15 | Replaced every public `final-balance` compound with the single term “final balance,” including headline, README, metadata, manifest, catalog description, and audit. | `rg -i final-balance` returns no source match; `@claim:demo-ready`; local URL verifier. |
| F-1-16 | Kept browser-language storage wording in README. | `.factory/copy-audit.md`; `@claim:local-schedules`. |
| F-1-17 | Replaced billing implementation wording with the testable Sociobot checkout/license result. | `@claim:one-free-schedule`; README audit. |
| F-1-18 | Kept plain deployment wording in README. | `.factory/copy-audit.md`. |
| F-2-1 | Added catering businesses to the first-screen audience sentence. | `@claim:demo-ready`; landing copy audit; mobile browser suite. |
| F-2-2 | Registered the Sociobot checkout and pasted-license statement in `one-free-schedule`; its test asserts the checkout URL and mocked verification result. | `@claim:one-free-schedule`. |
| F-2-3 | Split the README settings copy into two short sentences, registered `schedule-settings`, and prove all five settings in both exports. | `@claim:schedule-settings`. |
| F-2-4 | Made the exact no-retyping calendar result the `calendar-two-events` claim; the test starts from the landing action and verifies the populated two-date ICS. | `@claim:calendar-two-events`. |
| F-2-5 | Replaced “Narrow on purpose” with the standalone “What the app does not do.” | landing copy audit; `@axe-core/playwright` route scan. |

## Verification

- Fresh clone at `/tmp/deadline-clean-VojCZs`: `npm ci`, then all 15 exact commands from `.factory/claims.json` passed separately.
- Fresh clone: `npm run test:unit` (3 passed), `npm test` (30 passed), `npm run build`, and `npm audit --audit-level=moderate` (0 vulnerabilities).
- Local direct demo: `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/?demo=1 .factory/evidence/polish-2/query-demo` passed with title `Demo — Deposit Deadline Bridge`, `lang=en`, one h1/main, zero missing image alts, zero unlabeled buttons, and no console errors.
- Accessibility is run in the browser suite with `@axe-core/playwright` on `/`, `/demo`, `/privacy`, `/terms`, and a missing route; serious/critical violations are required to be empty. The standalone axe CLI could not launch against the supplied Playwright Chromium because its bundled ChromeDriver supports Chrome 152 while the supplied browser is 145; the project’s pinned Playwright axe integration is the successful equivalent.
