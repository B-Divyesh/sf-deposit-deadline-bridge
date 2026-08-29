# Adversarial first-read review 8

Date: 2026-08-29 UTC  
Live site: <https://deposit-deadline-bridge.sociobot.in>  
Repository revision reviewed: `264ff82a9e9d2575caa3452a36d48fc6599e33a4`

## Verdict: **PASS**

No finding remains. Fresh mobile and desktop first reads are clear, the realistic demo opens in one click and stays isolated, all 21 declared claim commands pass separately from a clean clone, every earlier finding is fixed in both the live release and current code/tests, and the route, metadata, accessibility, privacy, offline, and visual-identity checks pass.

## First screen, before scrolling

Fresh Chromium contexts used 390 × 844 and 1440 × 900 viewports with no stored site data. No scrolling or interaction occurred before the record.

| Question | 390 px | Desktop |
| --- | --- | --- |
| What does this do? | It keeps deposit and final balance dates from disappearing when a quote becomes an invoice. | Same. |
| For whom? | Event, catering, and project businesses with separately agreed payment dates. | Same. |
| What should I click first? | **Try it with sample data**. | Same. |

The exact copy supplying those answers was “Keep deposit and final balance dates,” “For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice,” and “Try it with sample data.” The adjacent result note says “Opens a complete two-payment schedule.” All three facts were visible on the 390 px first screen; the last ended at y=832 in the 844 px viewport. No console or page error occurred.

## Findings

None.

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
| Add the deposit, final balance, local times, and exact time zone. | 11 | Pass; `schedule-settings` |
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

No landing item exceeds 22 words. No banned marketing word, jargon flag, inconsistent product term, metaphor or mood heading, empty slogan, or non-result primary action was found.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Deposit Deadline Bridge | 3 | Pass; title |
| Keep deposit and final balance dates intact when a quote becomes an invoice. | 13 | Pass; opening |
| Deposit Deadline Bridge is for event, catering, and project businesses. | 10 | Pass; audience |
| Record the deposit and final balance in a named time zone. | 11 | Pass; `schedule-settings` |
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

No README item exceeds 22 words. No banned marketing word, unexplained visitor-facing jargon, inconsistent term, metaphor or mood heading, empty slogan, or non-result action was found. `npm run audit:copy -- --check` and `npm run test:copy-audit` passed.

Terminology is consistent: **deposit**, **final balance**, **payment schedule**, **quote number**, **demo**, and **schedule library**.

## Demo and sandbox behavior

- One click from the landing action opened `/?demo=1`, titled “Demo — Deposit Deadline Bridge.”
- The first 390 px demo screen showed “Demo — sample data, nothing is saved,” both demo controls, “Sample quote HT-084,” the product workspace, and the populated HT-084 quote-number field at the fold. The loaded form contained Highland Glasshouse Supper, Maya Chen, $2,400, $5,600, both dates, `America/New_York`, payment wording, and export actions.
- The banner included **Reset demo** and **Start for real**. After scrolling to the export area, it remained visible at y=0. Reset restored “Highland Glasshouse Supper.”
- A live `LIVE-R8` schedule was saved first. IndexedDB and localStorage were byte-for-byte unchanged after editing, checking, and resetting the demo. **Start for real** restored `LIVE-R8`.
- A separate fresh demo created no IndexedDB database and no localStorage value. The live demo and real-save flows made zero cross-origin requests.
- After service-worker control, a live offline reload retained HT-084 and displayed “You are offline. Editing and exports still work.”
- A fake checkout-return token opened offline remained locked; its cached verdict was `{"valid":false,"checkedAt":0}`.

The demo gate passes.

## Claims

A clean clone was created at `/tmp/ddb-review8-clean-ZhsB1n/repo` from revision `264ff82`. After `npm ci`, every exact `test` command in `.factory/claims.json` ran separately. Each claim tag occurs exactly once.

| Claim | Result | Observable evidence |
| --- | --- | --- |
| `offline-reload` | PASS | Controlled service worker, offline reload, usable HT-084 sample |
| `local-schedules` | PASS | Real IndexedDB save and no schedule field in an external request |
| `demo-ready` | PASS | One landing click opened every realistic sample field and export action |
| `calendar-two-events` | PASS | Exactly two events, two alarms, and both populated dates |
| `two-payment-export` | PASS | Separate deposit/final sections, amounts, and time zone |
| `copy-payment-instructions` | PASS | Clipboard received both payment sections |
| `dst-precision` | PASS | Missing spring time rejected and selected repeated time preserved |
| `confirm-reminder` | PASS | Both reminders gated; only confirmation opened the expected `mailto:` |
| `private-runtime` | PASS | No third-party demo request or remote font |
| `license-private` | PASS | Only the saved token reached the mocked license endpoint |
| `no-added-rules` | PASS | User wording retained and no late fee inserted |
| `demo-isolation` | PASS | Real IndexedDB/localStorage unchanged through demo edit/reset |
| `json-backup` | PASS | No unsolicited backup; exactly one requested backup downloaded and restored |
| `404-storage-safety` | PASS | Real schedule and license snapshots remained byte-for-byte unchanged through the static 404 |
| `schedule-settings` | PASS | Locale, currency, zone, wording, and reminder timings reached exports |
| `one-free-schedule` | PASS | Price/checkout, invalid/offline/returned/pasted tokens, and one versus three records |
| `free-core-features` | PASS | Unlicensed exports, copy, reminder review, and backup worked |
| `license-local-storage` | PASS | Only the two documented namespaced license values were stored |
| `data-deletion` | PASS | License-only removal and complete browser-data clearing |
| `license-revocation` | PASS | Inactive license closed the library while free exports remained |
| `refund-request` | PASS | 14-day policy and expected editable refund email |

All 21 commands passed with zero failures. A cross-check of the landing, workspace, Privacy, Terms, 404, and README found no unlisted claim-like sentence.

## Earlier finding verification

Every earlier `.factory/review-*.md`, `.factory/polish-*.md`, and the existing handoff was read. Deployed JavaScript and CSS SHA-256 values matched the current production build exactly.

| Earlier ID | Live and code status |
| --- | --- |
| F-1-1 | Fixed: live demo warning, Reset, and Start controls remain sticky at y=0; `.demo-banner` and its regression agree. |
| F-1-2 | Fixed: live real-save request logging found no external schedule data; `local-schedules` checks IndexedDB and requests. |
| F-1-3 | Fixed: live real-store snapshots were unchanged; `demo-isolation` compares IndexedDB/localStorage byte for byte. |
| F-1-4 | Fixed: both reminders remain review-gated; the test checks cancel, requests, and explicit `mailto:` activation. |
| F-1-5 | Fixed: public copy says finite “multiple schedules,” and the claim proves three licensed records versus one free record. |
| F-1-6 | Fixed: the live one-click HT-084 sample is complete and covered by `demo-ready`. |
| F-1-7 | Fixed: live copy promises two plain instructions for an invoice, not universal compatibility; the export claim passes. |
| F-1-8 | Fixed: provider assertions remain absent; refund-request and revocation outcomes are separately declared and tested. |
| F-1-9 | Fixed: a live unknown path returns the shared-shell, metadata-bearing, product-designed HTTP 404. |
| F-1-10 | Fixed: all three facts end inside 390 × 844; the live bounding-box check and regression pass. |
| F-1-11 | Fixed: the README opening remains short plain sentences. |
| F-1-12 | Fixed: the audit is generated, complete for landing/README, count-checked, and compared with rendered sources. |
| F-1-13 | Fixed: “Export both payment deadlines” remains live and source-tested. |
| F-1-14 | Fixed: paid copy consistently names payment schedules, not quote documents. |
| F-1-15 | Fixed: “final balance” is the sole public term for payment two. |
| F-1-16 | Fixed: visitor copy says “this browser”; storage-engine language is confined to technical test documentation. |
| F-1-17 | Fixed: checkout/license copy states the user result and is claim-tested; billing-API jargon is absent. |
| F-1-18 | Fixed: README deployment wording remains plain and operational. |
| F-2-1 | Fixed: event, catering, and project businesses are all named on the live first screen. |
| F-2-2 | Fixed: returned and pasted tokens stay locked until verification; the live offline fake token retained `valid:false`. |
| F-2-3 | Fixed: all five settings are split into short sentences and asserted in exports. |
| F-2-4 | Fixed: calendar coverage starts at the landing action and proves both populated dates without re-entry. |
| F-2-5 | Fixed: “Narrow on purpose” remains absent; the live scope heading is literal. |
| F-3-1 | Fixed: all four free core features are declared and tested in an unlicensed real workspace. |
| F-3-2 | Fixed: the two documented namespaced license values are declared and tested. |
| F-3-3 | Fixed: license-only removal and complete site-data removal are separately declared and tested. |
| F-3-4 | Fixed: the live preview h2 is “Payment schedule preview.” |
| F-3-5 | Fixed: the live Privacy h1 is “How your schedules are stored.” |
| F-3-6 | Fixed: the live Terms h1 is “Terms for Deposit Deadline Bridge.” |
| F-3-7 | Fixed: the live 404 h1 is “Page not found.” |
| F-3-8 | Fixed: the live workspace label is “Export options.” |
| F-4-1 | Fixed: “Payment schedule preview” is the actual section h2. |
| F-4-2 | Fixed: the process h2 is “How to record and export payment dates.” |
| F-4-3 | Fixed: the scope h2 is “What this app records and does not handle.” |
| F-5-1 | Fixed: every visible live action on all app routes and the 404 meets 44 × 44 px; the focused 404 skip link is 177 × 44 px. |
| F-5-2 | Fixed: visitor controls use calendar-file and backup-file wording; `.ics` and JSON appear only in developer notes. |
| F-6-1 | Fixed: the generated audit has current text and exact whitespace counts; both copy-audit checks pass. |
| F-7-1 | Fixed: `json-backup` lists the Privacy guarantee and proves load, edit, save, and other exports create no backup before request. |
| F-7-2 | Fixed: `404-storage-safety` snapshots a real schedule and both license values through the static 404 and return. |
| F-7-3 | Fixed: Terms now says what it covers; “clear and fair” is absent from source and live copy. |
| F-7-4 | Fixed: the live focused 404 skip link is 177 × 44 px and has a dedicated mobile regression. |

No earlier finding is unfixed, half-fixed, or regressed.

## Structure, routing, accessibility, and identity

- `/`, `/demo`, `/?demo=1`, `/workspace`, `/privacy`, and `/terms` returned 200. A missing route returned the designed HTTP 404.
- Titles are route-specific: “Deposit Deadline Bridge — preserve payment dates,” “Demo — Deposit Deadline Bridge,” “Payment schedule — Deposit Deadline Bridge,” “Privacy — Deposit Deadline Bridge,” “Terms — Deposit Deadline Bridge,” and “Page not found — Deposit Deadline Bridge.”
- Every route has `lang=en`, one h1, one main, a plain description, canonical URL, OG/Twitter metadata, favicon, 180 × 180 apple-touch icon, shared header/footer, skip link, Privacy, and Terms. The social card is 1200 × 630.
- The live CSP and security headers match the checked-in policy. `frame-ancestors` is a response header, not a meta directive. No CSP or console error occurred.
- Direct deep links render the correct route. In-app navigation moves focus to the new h1. Browser Back restores the prior route, title, h1 focus, and exact prior scroll position.
- All same-origin navigation destinations returned 200. The missing page's fragment skip link targets its already-loaded `#main`; checkout returned the expected Sociobot 303 to hosted checkout; the refund action is an explicit `mailto:`.
- Playwright Axe reported zero violations on all five app routes and the 404. No route had horizontal overflow or an undersized visible action. A native reminder dialog opened with focus inside, closed on Escape, and returned focus to its trigger.
- Reduced-motion CSS disables transition and animation duration. The production build contains 12.37 kB gzip JavaScript and 4.91 kB gzip CSS.
- `/opt/fleet/lib/verify-url.sh` passed live `/`, `/?demo=1`, `/privacy`, and `/terms`: title, lang, main, image alt, button-label, and console checks were clean.
- The generated porcelain milestone still life, cobalt bridge, mineral palette, asymmetrical hero, serif/system type pairing, paired-marker forms, and broken-bridge 404 follow `.factory/design.md`. The result is recognisable and is not a generic SaaS template. Provenance is recorded in `assets/src/hero-ceramic.json` and `.factory/design.md`.

## Quality gates

| Check | Result |
| --- | --- |
| 21 exact clean-clone claim commands | PASS; 21/21 |
| `npm run test:unit` | PASS; 3/3 |
| `npm test` | PASS; 39/39 |
| `npm run test:copy-audit` | PASS; 1/1 |
| `npm run build` | PASS; `dist/` produced |
| `npm audit --audit-level=moderate` | PASS; zero vulnerabilities |
| `npm run test:live` | PASS |
| Live Axe route sweep | PASS; zero violations |
| Live URL verifier | PASS; four routes |

The deployed `app-I8W1Aw1Y.js` and `index-pdFy1ND3.css` hashes exactly matched the local build.

## Missed leverage

No additional AI feature is warranted. The job is deterministic date validation, time-zone conversion, local export, and user-confirmed reminder drafting. Model inference would add privacy, cost, and failure modes without removing a required decision. Calendar export, payment-instruction download/copy, and backup import/export cover the obvious transfer needs. Sync would conflict with the current browser-local promise unless introduced as a separate, explicit opt-in product decision.

## What would make this perfect

Nothing corrective was identified in this round. The product already meets the brief and the attached review contracts with zero findings and no untested claim. Future product changes should continue to run the 21 claim commands, copy-audit regression, full browser suite, build, live route crawl, and accessibility checks before release.
