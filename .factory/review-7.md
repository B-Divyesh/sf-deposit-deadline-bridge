# Adversarial first-read review 7

Date: 2026-08-29 UTC

Live site: <https://deposit-deadline-bridge.sociobot.in>

Repository revision reviewed: `ea53cab713f217098abad10b7ab074c14be3ec60`

## Verdict: **FAIL**

The first screen, one-click demo, isolation, offline behavior, declared claim tests, routing, and visual identity pass. Four findings remain: two major unlisted claims and two minor copy/accessibility defects. PASS requires zero findings and no untested claim.

## Findings

### Major

#### F-7-1 — The Privacy page makes an unlisted backup-generation guarantee

- Exact quote/location: live `/privacy`, Schedule data: “Backup files are created only when you request them.”
- Evidence: `.factory/claims.json` has `json-backup`, but its claim is “Downloads a backup file and restores a schedule from one,” its `where` omits Privacy, and its test starts by clicking **Download backup**. It does not prove the added word **only** by checking that load, editing, saving, or other exports never initiate a backup download.
- Why this matters: a visitor can rely on this as a privacy and browser-behavior guarantee. The current manifest neither lists nor tests that guarantee.
- Concrete fix: add this exact Privacy statement and location to `json-backup`. Extend `@claim:json-backup` to record download events during page load, edits, saves, and other exports; assert that no backup is created until **Download backup** is selected and exactly one is created afterward. Alternatively, remove the sentence.

#### F-7-2 — The 404 page makes an unlisted storage-safety guarantee

- Exact quote/location: live unknown-route 404, “Your saved schedules have not changed.”
- Evidence: no entry in `.factory/claims.json` covers navigation to a missing route. `tests/not-found.spec.ts` checks the shell, metadata, CSP, and styling, but does not seed or compare IndexedDB/localStorage.
- Why this matters: the sentence reassures a visitor about saved data after an error. That is an observable product guarantee, but no declared sandbox test proves it.
- Concrete fix: add a `404-storage-safety` claim and tagged test. Seed a real schedule and license-state snapshot, open a missing route, return to `/workspace`, and assert IndexedDB and localStorage are byte-for-byte unchanged. A copy-only alternative is “Return home to open your saved schedules,” which does not claim that the error left storage unchanged.

### Minor

#### F-7-3 — The Terms introduction is a subjective slogan

- Exact quote/location: live `/terms`, introduction: “These terms keep a small local utility clear and fair.”
- Why this matters: “clear and fair” is subjective, cannot be verified, and tells the reader nothing about what the page contains. It conflicts with the plain-words requirement that every sentence carry usable information.
- Concrete rewrite: “These terms cover use, the one-time license, refunds, and availability.”

#### F-7-4 — The focused 404 skip link misses the 44 px target baseline

- Exact location: live unknown-route 404, **Skip to main content**.
- Evidence: in a fresh 390 × 844 context, the focused link measured 176.97 × 42 px. `public/404.css` gives it `padding: 12px 16px` but no minimum height. All visible actions on the five primary routes and the remaining 404 actions met 44 px.
- Why this matters: the 404 is a real route and the accessibility baseline applies to every interactive target. The link is visibly focused but two pixels short of the required height.
- Concrete fix: add `min-height: 44px; display: inline-flex; align-items: center` with `box-sizing: border-box` to `.skip-link` in `public/404.css`. Include the 404 in the mobile target regression.

## First screen, before scrolling

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900. There was no prior site storage, scrolling, or interaction.

| Question | 390 px | Desktop |
| --- | --- | --- |
| What does this do? | It keeps deposit and final balance dates from disappearing when a quote becomes an invoice. | Same. |
| For whom? | Event, catering, and project businesses with separately agreed payment dates. | Same. |
| What should I click first? | **Try it with sample data**. | Same. |

The exact copy supplying those answers was “Keep deposit and final balance dates,” “For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice,” and “Try it with sample data.” The adjacent note says “Opens a complete two-payment schedule.” All three facts were visible on the 390 px first screen; the last ended at y=832 in an 844 px viewport. The first-screen gate passes at both widths.

## Copy audit

Counts split trimmed visible copy on whitespace. URLs and inline-code spans count as one word. Repeated shared labels appear once. Sample identifiers, field values, dates, and amounts are product data rather than sentences. Headings and actions are included because they must make sense independently.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Pass; keyboard action |
| Deadline Bridge | 2 | Pass; wordmark |
| Demo | 1 | Pass; navigation |
| Workspace | 1 | Pass; navigation |
| Privacy | 1 | Pass; navigation |
| Deposit Deadline Bridge | 3 | Pass; product label |
| Keep deposit and final balance dates | 6 | Pass; h1 |
| For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice. | 17 | Pass; audience |
| Try it with sample data | 5 | Pass; result-naming action |
| Opens a complete two-payment schedule. | 5 | Pass; `demo-ready` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Your schedules stay in this browser. | 6 | Pass; `local-schedules` |
| One schedule is free. | 4 | Pass; `one-free-schedule` |
| The full library costs $24 once. | 6 | Pass; `one-free-schedule` |
| Create a blank schedule | 4 | Pass; result-naming action |
| Payment schedule preview | 3 | Pass; h2 |
| Download two plain payment instructions to attach to an invoice. | 10 | Pass; `two-payment-export` |
| Add both deadlines to your calendar without typing them again. | 10 | Pass; `calendar-two-events` |
| How it works | 3 | Pass; section label |
| How to record and export payment dates | 7 | Pass; h2 |
| Record the agreement | 3 | Pass; h3 |
| Add the deposit, final balance, local times, and exact time zone. | 11 | Pass |
| Export both payment deadlines | 4 | Pass; h3 |
| Download one calendar file and two plain payment instructions. | 9 | Pass; export claims |
| Review each reminder | 3 | Pass; h3 |
| Check the email draft before your own email app opens it. | 11 | Pass; `confirm-reminder` |
| What this app records and does not handle | 8 | Pass; h2 |
| No automatic email sending. | 4 | Pass; `confirm-reminder` |
| No late fees or local rules added for you. | 9 | Pass; `no-added-rules` |
| License checks never include schedule details. | 6 | Pass; `license-private` |
| One-time license | 2 | Pass; pricing label |
| Keep multiple payment schedules | 4 | Pass; h2 |
| The free version keeps one current schedule. | 7 | Pass; `one-free-schedule` |
| Pay $24 once to save and reopen multiple schedules in this browser. | 12 | Pass; `one-free-schedule` |
| Buy the full library | 4 | Pass; result-naming action |
| opens Sociobot checkout | 3 | Pass; accessible action qualifier |
| Read refund policy and terms | 5 | Pass; result-naming action |
| Keep two payment dates attached to one quote. | 8 | Pass; footer description |
| Terms | 1 | Pass; footer navigation |
| Built by Param Factory | 4 | Pass; footer attribution |
| Original generated ceramic artwork. | 4 | Pass; provenance |

No landing item exceeds 22 words. No banned marketing word, metaphor/mood heading, inconsistent term, or non-result action was found.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Deposit Deadline Bridge | 3 | Pass; title |
| Keep deposit and final balance dates intact when a quote becomes an invoice. | 13 | Pass; opening |
| Deposit Deadline Bridge is for event, catering, and project businesses. | 10 | Pass; audience |
| Record the deposit and final balance in a named time zone. | 11 | Pass |
| The app catches missing clock times and lets you choose when a clock time repeats. | 15 | Pass; `dst-precision` |
| Then export one calendar file and two payment instructions. | 9 | Pass; export claims |
| Every reminder opens as an editable draft before your email app opens. | 12 | Pass; `confirm-reminder` |
| Live site: https://deposit-deadline-bridge.sociobot.in | 3 | Pass |
| Try the isolated demo | 4 | Pass; h2 |
| Open https://deposit-deadline-bridge.sociobot.in/?demo=1 or run the site locally and visit `/?demo=1`. | 10 | Pass |
| The sample is quote HT-084 for the Highland Glasshouse Supper. | 10 | Pass; `demo-ready` |
| Demo changes are held in memory and are not saved to real schedules. | 13 | Pass; `demo-isolation` |
| Select Reset demo to restore the sample. | 7 | Pass |
| What v1 does | 3 | Pass; h2 |
| Stores real schedules in this browser. | 6 | Pass; `local-schedules` |
| Keeps the deposit and final balance as separate dated payments. | 10 | Pass; export claims |
| Downloads one calendar file with both deadlines and reminders. | 9 | Pass; `calendar-two-events` |
| Downloads or copies two payment instructions for an invoice or accounting system. | 12 | Pass; export claims |
| Opens editable reminder email drafts only after confirmation. | 8 | Pass; `confirm-reminder` |
| Downloads a backup file and restores a schedule from one. | 10 | Pass; `json-backup` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Keeps one current schedule for free. | 6 | Pass; `one-free-schedule` |
| The $24 one-time license lets you save and reopen multiple schedules in this browser. | 14 | Pass; `one-free-schedule` |
| Sociobot opens checkout and verifies returned or pasted license tokens. | 10 | Pass; `one-free-schedule` |
| If a license becomes inactive, its schedule library closes. | 9 | Pass; `license-revocation` |
| One free schedule and exports remain available. | 7 | Pass; `license-revocation` |
| Privacy and scope | 3 | Pass; h2 |
| Schedule data stays in the browser. | 6 | Pass; `local-schedules` |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass; privacy and reminder claims |
| A license check sends only the saved license token to `api.sociobot.in`. | 11 | Pass; `license-private` |
| The browser stores a restored license token and its latest verification result. | 12 | Pass; `license-local-storage` |
| Remove license clears those values without removing a schedule. | 9 | Pass; `data-deletion` |
| Clearing this site’s browser data clears both. | 7 | Pass; `data-deletion` |
| Choose the locale, currency, and time zone. | 7 | Pass; `schedule-settings` |
| Set your payment wording and reminder timing. | 7 | Pass; `schedule-settings` |
| The app does not invent late fees or local invoice rules. | 11 | Pass; `no-added-rules` |
| See `/privacy` and `/terms`. | 4 | Pass |
| The Terms page includes a 14-day refund request email link. | 10 | Pass; `refund-request` |
| Develop | 1 | Pass; h2 |
| Requirements: Node.js 20 or newer and npm. | 7 | Pass; developer context |
| Open `http://localhost:5173`. | 2 | Pass; developer context |
| The demo entry point is `http://localhost:5173/?demo=1`. | 6 | Pass; developer context |
| Calendar downloads use `.ics`; backup files use JSON. | 8 | Pass; developer context |
| Test and build | 3 | Pass; h2 |
| `npm test` builds and serves the production app, then runs the claim and accessibility checks in Chromium. | 17 | Pass; developer context |
| The exact production build command is `npm run build`. | 9 | Pass; developer context |
| Static output lands in `dist/`, with `dist/index.html` at its root. | 10 | Pass; developer context |
| After deployment, run `npm run test:live` to check routing, the product’s payment listing, and checkout. | 15 | Pass; developer context |
| Claim definitions and their sandbox steps are in `.factory/claims.json`. | 9 | Pass; developer context |
| The demo contract is in `.factory/demo.md`. | 6 | Pass; developer context |
| Deploy | 1 | Pass; h2 |
| Deploy the contents of `dist/` to Azure Static Web Apps. | 10 | Pass; developer context |
| The included configuration routes app pages correctly and applies browser security and caching settings. | 14 | Pass; developer context |
| The factory owns DNS and billing registration. | 7 | Pass; developer context |
| License | 1 | Pass; h2 |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass |

No README item exceeds 22 words. No banned marketing word, inconsistent product term, metaphor/mood heading, or non-result action was found. `npm run test:copy-audit` passed and independently regenerated and compared the repository audit.

Terminology is consistent: **deposit**, **final balance**, **payment schedule**, **quote number**, **demo**, and **schedule library**.

## Demo and sandbox behavior

- One click from the landing action opened `/?demo=1`, titled “Demo — Deposit Deadline Bridge.”
- The first 390 px demo screen already showed “Sample quote HT-084,” the product h1, realistic explanatory copy, and the populated HT-084 quote-number field at the fold. The loaded form contained Highland Glasshouse Supper, Maya Chen, $2,400, $5,600, `America/New_York`, bank-transfer wording, both dates, and export actions.
- The banner read “Demo — sample data, nothing is saved” and contained **Reset demo** and **Start for real**. After scrolling 3,549 px to the export area, its box remained at y=0.
- Reset restored “Highland Glasshouse Supper.”
- A real `LIVE-R7` record was saved first. IndexedDB and localStorage were byte-for-byte unchanged after editing the demo, checking it, resetting it, and leaving it. **Start for real** restored the real record after the asynchronous load settled.
- The flow made 16 same-origin requests and zero cross-origin requests. No sample record or demo localStorage value was created.
- After service-worker control, offline reload retained HT-084 and showed “You are offline. Editing and exports still work.”

The demo gate passes.

## Declared claims

A fresh clone was created at `/tmp/ddb-review7-clean-vxM2Nq/repo`, followed by `npm ci`. Every exact `test` command in `.factory/claims.json` was run separately. Each tag occurs exactly once in `tests/claims.spec.ts`.

| Claim | Result | Observable evidence |
| --- | --- | --- |
| `offline-reload` | PASS | Controlled service worker, offline reload, usable HT-084 sample |
| `local-schedules` | PASS | Real IndexedDB save and no schedule field in an external request |
| `demo-ready` | PASS | One landing click opened all sample fields and export actions |
| `calendar-two-events` | PASS | Exactly two events, two alarms, and both populated dates |
| `two-payment-export` | PASS | Separate deposit/final sections, amounts, and time zone |
| `copy-payment-instructions` | PASS | Clipboard received both payment sections |
| `dst-precision` | PASS | Missing spring time rejected; selected repeated time preserved |
| `confirm-reminder` | PASS | Both reminders gated; only confirmation opened the expected `mailto:` |
| `private-runtime` | PASS | No third-party demo request or remote font |
| `license-private` | PASS | Only the saved token reached the mocked license endpoint |
| `no-added-rules` | PASS | User wording retained and no late fee inserted |
| `demo-isolation` | PASS | Real IndexedDB/localStorage unchanged through demo edit/reset |
| `json-backup` | PASS | Backup downloaded, changed, and restored; F-7-1 remains outside its scope |
| `schedule-settings` | PASS | Locale, currency, zone, wording, and reminder timings reached exports |
| `one-free-schedule` | PASS | Price/checkout, invalid/offline/returned/pasted token states, and one versus three records |
| `free-core-features` | PASS | Unlicensed exports, copy, reminder review, and backup worked |
| `license-local-storage` | PASS | Only two documented namespaced license values were stored |
| `data-deletion` | PASS | License-only removal and complete origin-data clearing |
| `license-revocation` | PASS | Inactive license closed the library while free exports remained |
| `refund-request` | PASS | 14-day policy and expected editable refund email |

No declared command failed. The claims gate still fails because F-7-1 and F-7-2 are public guarantees outside the manifest. A separate live offline return-token check stored `{"valid":false,"checkedAt":0}` and did not show “Full library active,” confirming the previous F-2-2 repair.

## Earlier finding verification

Every earlier `.factory/review-*.md`, `.factory/polish-*.md`, and handoff was read. The live JavaScript and CSS SHA-256 values matched the fresh build, so the following live checks apply to the reviewed source.

| Earlier ID | Live and code status |
| --- | --- |
| F-1-1 | Fixed: the live demo banner remains sticky at y=0 with Reset and Start controls; `.demo-banner` is sticky and the mobile regression passes. |
| F-1-2 | Fixed: a real live record stayed local; `@claim:local-schedules` saves to IndexedDB and inspects requests. |
| F-1-3 | Fixed: live real-store snapshots were unchanged; `@claim:demo-isolation` compares both stores byte for byte. |
| F-1-4 | Fixed: both reminder paths remain review-gated; the test covers cancel, requests, and explicit `mailto:` activation. |
| F-1-5 | Fixed: live paid copy says “multiple,” and the claim proves three licensed records versus one free record. |
| F-1-6 | Fixed: the one-click HT-084 sample is live and covered by `demo-ready`. |
| F-1-7 | Fixed: live copy promises two plain instructions for an invoice, not universal compatibility; export test passes. |
| F-1-8 | Fixed: provider assertions remain absent; refund request and revocation have separate passing claims. |
| F-1-9 | Fixed: the live HTTP 404 has the shared shell, legal links, metadata, favicon, and ceramic broken-bridge design; static tests pass. |
| F-1-10 | Fixed: all three facts end within the 390 × 844 first viewport; the regression passes. |
| F-1-11 | Fixed: README opening remains split into short sentences; generated copy check passes. |
| F-1-12 | Fixed: the current audit is generated, complete for its stated landing/README scope, and count-checked. |
| F-1-13 | Fixed: “Export both payment deadlines” remains live and source-tested. |
| F-1-14 | Fixed: paid copy consistently names payment schedules. |
| F-1-15 | Fixed: public copy consistently uses “final balance”; no obsolete `final-balance` source copy remains. |
| F-1-16 | Fixed: README uses “this browser,” with storage-engine detail removed from visitor copy. |
| F-1-17 | Fixed: checkout/license wording states the user result and is claim-tested. |
| F-1-18 | Fixed: README deployment wording remains plain and operational. |
| F-2-1 | Fixed: event, catering, and project businesses are named in the live first screen and source regression. |
| F-2-2 | Fixed: returned and pasted tokens start invalid until verification; live offline fake token stayed locked and the expanded claim passes. |
| F-2-3 | Fixed: all five settings remain split into plain sentences and are asserted in exports. |
| F-2-4 | Fixed: calendar coverage begins at the landing action and proves both existing dates without re-entry. |
| F-2-5 | Fixed: “Narrow on purpose” remains absent; the scope heading is literal. |
| F-3-1 | Fixed: all four free core features are declared and tested in an unlicensed real workspace. |
| F-3-2 | Fixed: the two documented license-storage values are declared and tested. |
| F-3-3 | Fixed: license removal and complete browser-data clearing are declared and tested. |
| F-3-4 | Fixed: the live preview h2 is “Payment schedule preview.” |
| F-3-5 | Fixed: the live Privacy h1 is “How your schedules are stored.” |
| F-3-6 | Fixed: the live Terms h1 names Deposit Deadline Bridge. |
| F-3-7 | Fixed: the live 404 h1 is “Page not found.” |
| F-3-8 | Fixed: the workspace label is “Export options.” |
| F-4-1 | Fixed: “Payment schedule preview” is the actual h2, not an eyebrow. |
| F-4-2 | Fixed: the process h2 is “How to record and export payment dates.” |
| F-4-3 | Fixed: the scope h2 is “What this app records and does not handle.” |
| F-5-1 | Fixed at the reported locations: “Read refund policy and terms” and “Request a refund by email” both exceed 44 px, and the five primary-route target test passes. F-7-4 is a new 404 location. |
| F-5-2 | Fixed: visitor controls use calendar/backup language; `.ics` and JSON remain only in developer context. |
| F-6-1 / F-1-12 | Fixed: `scripts/generate-copy-audit.mjs --check` and the rendered-copy regression pass with current counts. |

No earlier finding is unfixed, half-fixed, or regressed at its reported location.

## Structure, routing, accessibility, and identity

- `/`, `/demo`, `/?demo=1`, `/workspace`, `/privacy`, and `/terms` returned 200. An unknown path returned the designed HTTP 404.
- Titles are route-specific: “Deposit Deadline Bridge — preserve payment dates,” “Demo — Deposit Deadline Bridge,” “Payment schedule — Deposit Deadline Bridge,” “Privacy — Deposit Deadline Bridge,” “Terms — Deposit Deadline Bridge,” and “Page not found — Deposit Deadline Bridge.”
- Every route had `lang=en`, one h1, one main, a plain description, canonical URL, OG/Twitter metadata, favicon, apple-touch icon, shared header/footer, skip link, Privacy, and Terms. The social image is 1200 × 630 and the apple-touch icon is 180 × 180.
- The live CSP and security headers matched the checked-in configuration. `frame-ancestors` is a response header, not a meta directive.
- In-app Privacy navigation focused the new h1. Browser Back restored `/`, its title, and its h1 focus.
- The internal link crawl returned 200 for every product destination. The checkout link returned the expected Sociobot 303 to hosted checkout; the refund link is an explicit `mailto:`. The missing page’s own `#main` skip target remains within the already-loaded 404 document.
- Playwright axe reported zero violations on all five primary routes and the 404. There was no horizontal overflow or unexpected console error. Every visible primary-route action met 44 px; F-7-4 records the one 404 exception.
- Reduced-motion CSS collapses animation and transition durations. The production build contains 12.37 kB gzip JavaScript and 4.91 kB gzip CSS.
- `verify-url.sh` passed on `/`, `/?demo=1`, `/privacy`, and `/terms`: title/lang/main/alt/button checks were clean and no console error was recorded.
- The generated porcelain milestone image, cobalt bridge, mineral palette, asymmetrical hero, serif/system type pairing, and broken-bridge 404 match `.factory/design.md`. The identity is recognisable and does not use a generic gradient/card SaaS template. Asset provenance is recorded in `assets/src/hero-ceramic.json` and `.factory/design.md`.

## Quality-gate evidence

From the fresh clone:

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 61 packages, zero vulnerabilities |
| 20 exact claim commands | PASS; 20/20 |
| `npm run test:unit` | PASS; 3/3 |
| `npm test` | PASS; 37/37 |
| `npm run test:copy-audit` | PASS; 1/1 |
| `npm run build` | PASS; `dist/` produced |
| `npm audit --audit-level=moderate` | PASS; zero vulnerabilities |
| `npm run test:live` | PASS |

The live `app-BUBCCOJx.js` and `index-pdFy1ND3.css` hashes exactly matched the fresh build.

## Missed leverage

No AI feature is warranted. The job is deterministic date validation, time-zone conversion, local export, and user-confirmed email drafting. Model inference would add privacy, cost, and failure modes without removing a required decision. Calendar export, payment-instruction download/copy, and backup import/export cover the obvious transfer needs. Sync would conflict with the current browser-local promise unless introduced as a separate opt-in product decision.

## What would make this perfect

Resolve F-7-1 through F-7-4. Register and test the two omitted guarantees (or remove them), replace the Terms slogan with a literal page summary, and bring the focused 404 skip link to at least 44 px with a 404 target regression. Then repeat the full cold first-read, live sandbox, claim matrix, copy extraction, route crawl, accessibility scan, and history audit. No additional feature is needed.
