# Adversarial first-read review 5

Date: 2026-08-29 UTC

Live site: <https://deposit-deadline-bridge.sociobot.in>

Repository revision reviewed: `28e496608f3d30c498de5c1b3f81399b5cb7313d`

## Verdict: **FAIL**

The landing page is clear, the isolated sample works, all 20 declared claim commands pass, and the route/accessibility baseline is otherwise strong. The release still has three findings: one blocking and two minor. An arbitrary license token in the return URL unlocks the paid library while offline, two mobile text links miss the required 44 px target size, and the README exposes unexplained file-format jargon. PASS requires zero findings and no untested claim path.

## First screen, before scrolling

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900 with no stored site data. Both contexts loaded without a console or page error.

| Question | 390 px | Desktop |
| --- | --- | --- |
| What does this do? | It keeps the deposit and final balance dates from being lost when a quote becomes an invoice. | Same. |
| For whom? | Event, catering, and project businesses with separately agreed payment dates. | Same. |
| What should I click first? | **Try it with sample data**. | Same. |

The exact text that supplied those answers was “Keep deposit and final balance dates,” “For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice,” and “Try it with sample data.” The adjacent result note says “Opens a complete two-payment schedule.” All three facts are visible before the 844 px fold; the last ends at y=832. This gate passes.

## Findings

### Blocking

#### F-2-2 — An unverified URL token unlocks the paid library offline

- Exact claims/locations: landing, “The full library costs $24 once”; README, “The $24 one-time license lets you save and reopen multiple schedules in this browser” and “Sociobot opens checkout and verifies a pasted license token.”
- Live reproduction: in a fresh context, visit `/demo` once and wait for service-worker control. Go offline, then open `/?license=review-five-fake-token` and select **Workspace**. The page shows “Full library active,” localStorage contains `sb_license:deposit-deadline-bridge=review-five-fake-token` and `sb_license_verdict:deposit-deadline-bridge={"valid":true,"checkedAt":0}`, and three schedules can be saved.
- Code evidence: `src/license.ts:12-20` stores any `license` query value with `valid: true` before verification. `src/license.ts:42-53` throws when the offline verification request fails, while `src/main.ts:724-729` deliberately retains the cached verdict on that failure. The declared `one-free-schedule` test at `tests/claims.spec.ts:312-367` covers a pasted token and mocked success, but never the checkout-return query or an offline verification failure.
- Why this fails: the live product treats attacker-controlled text as a paid entitlement. The $24 boundary and the stated verification behavior are therefore not true for an offline-capable path. This reopens prior F-2-2; its claim coverage was only partial.
- Concrete fix: store a returned token as pending, not valid. Unlock only after the verify endpoint returns `valid: true`; an unverified token must remain gated when the request fails. Add cases to `@claim:one-free-schedule` for an invalid query token online, any query token offline, and a verified return token, then assert one-record versus multiple-record storage in each case.

### Minor

#### F-5-1 — Two mobile links have undersized touch targets

- Exact locations: landing pricing link “Read refund policy and terms” and `/terms` link “Request a refund by email.”
- Evidence: at 390 px their live bounding boxes are 178 × 15 px and 187 × 17 px. Other visible controls meet the 44 px baseline; the visually hidden file input is not counted.
- Why this fails: a phone visitor can see the legal actions but gets a narrow vertical tap area, contrary to the attached accessibility baseline.
- Concrete fix: give both action links an inline-flex hit area with at least 44 px height and suitable spacing. Add a mobile test that checks every visible action link and button, including these two routes, rather than three selected links.

#### F-5-2 — Backup and calendar formats use unexplained jargon

- Exact README quotes: “Downloads one `.ics` calendar containing both deadlines and both reminder alarms” and “Exports and imports a JSON backup.” The workspace also uses **Export JSON backup** and **Import JSON backup**.
- Why this fails: `.ics` and JSON name implementation formats before telling a non-technical visitor what to do with them. The plain-words rule applies to README and controls.
- Concrete rewrite: “Downloads one calendar file with both deadlines and reminders.” and “Downloads a backup file and restores a schedule from one.” Rename the controls to **Download backup** and **Restore backup**; retain `.ics` and JSON in developer notes or secondary help.

## Copy audit

Counts split visible copy on whitespace; an inline-code span or URL counts as one unit. Repeated global copy appears once. Sample field labels and sample values are data rather than sentences. Headings, navigation labels, and actions are included so their standalone wording and verb quality can be checked. No item exceeds 22 words and no banned marketing adjective appears.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Deadline Bridge | 2 | Pass |
| Demo | 1 | Pass |
| Workspace | 1 | Pass |
| Privacy | 1 | Pass |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and final balance dates | 6 | Pass |
| For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice. | 17 | Pass |
| Try it with sample data | 5 | Pass; result-naming action |
| Opens a complete two-payment schedule. | 5 | Pass; `demo-ready` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Your schedules stay in this browser. | 6 | Pass; `local-schedules` |
| One schedule is free. | 4 | Pass; `one-free-schedule` |
| The full library costs $24 once. | 6 | F-2-2 |
| Create a blank schedule | 4 | Pass; result-naming action |
| Payment schedule preview | 3 | Pass |
| Download two plain payment instructions to attach to an invoice. | 10 | Pass; `two-payment-export` |
| Add both deadlines to your calendar without typing them again. | 10 | Pass; `calendar-two-events` |
| How it works | 3 | Pass |
| How to record and export payment dates | 7 | Pass |
| Record the agreement | 3 | Pass |
| Add the deposit, final balance, local times, and exact time zone. | 11 | Pass |
| Export both payment deadlines | 4 | Pass |
| Download one calendar file and two plain payment instructions. | 9 | Pass; export claims |
| Review each reminder | 3 | Pass |
| Check the email draft before your own email app opens it. | 11 | Pass; `confirm-reminder` |
| What this app records and does not handle | 8 | Pass |
| No automatic email sending. | 4 | Pass; `confirm-reminder` |
| No late fees or local rules added for you. | 9 | Pass; `no-added-rules` |
| License checks never include schedule details. | 6 | Pass; `license-private` |
| One-time license | 2 | Pass |
| Keep multiple payment schedules | 4 | Pass |
| The free version keeps one current schedule. | 7 | Pass; `one-free-schedule` |
| Pay $24 once to save and reopen multiple schedules in this browser. | 12 | F-2-2 |
| Buy the full library | 4 | Pass; result-naming action |
| Read refund policy and terms | 5 | Pass wording; target fails F-5-1 |
| Keep two payment dates attached to one quote. | 8 | Pass |
| Privacy | 1 | Pass |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Pass |
| Original generated ceramic artwork. | 4 | Pass; provenance is documented |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and final balance dates intact when a quote becomes an invoice. | 13 | Pass |
| Deposit Deadline Bridge is for event, catering, and project businesses. | 10 | Pass |
| Record the deposit and final balance in a named time zone. | 11 | Pass |
| The app catches missing clock times and lets you choose when a clock time repeats. | 15 | Pass; `dst-precision` |
| Then export one calendar file and two payment instructions. | 9 | Pass; export claims |
| Every reminder opens as an editable draft before your email app opens. | 12 | Pass; `confirm-reminder` |
| Live site: https://deposit-deadline-bridge.sociobot.in | 3 | Pass |
| Try the isolated demo | 4 | Pass |
| Open https://deposit-deadline-bridge.sociobot.in/?demo=1 or run the site locally and visit `/?demo=1`. | 11 | Pass |
| The sample is quote HT-084 for the Highland Glasshouse Supper. | 10 | Pass; `demo-ready` |
| Demo changes are held in memory and are not saved to real schedules. | 13 | Pass; `demo-isolation` |
| Select Reset demo to restore the sample. | 7 | Pass |
| What v1 does | 3 | Pass |
| Stores real schedules in this browser. | 6 | Pass; `local-schedules` |
| Keeps the deposit and final balance as separate dated payments. | 10 | Pass; export claims |
| Downloads one `.ics` calendar containing both deadlines and both reminder alarms. | 11 | F-5-2 |
| Downloads or copies two payment instructions for an invoice or accounting system. | 12 | Pass; export claims |
| Opens editable reminder email drafts only after confirmation. | 8 | Pass; `confirm-reminder` |
| Exports and imports a JSON backup. | 6 | F-5-2 |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Keeps one current schedule for free. | 6 | Pass; `one-free-schedule` |
| The $24 one-time license lets you save and reopen multiple schedules in this browser. | 14 | F-2-2 |
| Sociobot opens checkout and verifies a pasted license token. | 9 | F-2-2; related return-token path is untested |
| If a license becomes inactive, its schedule library closes. | 9 | Pass; `license-revocation` |
| One free schedule and exports remain available. | 7 | Pass; `license-revocation` |
| Privacy and scope | 3 | Pass |
| Schedule data stays in the browser. | 6 | Pass; `local-schedules` |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass; privacy/reminder claims |
| A license check sends only the saved license token to `api.sociobot.in`. | 12 | Pass; `license-private` |
| The browser stores a restored license token and its latest verification result. | 12 | Pass; `license-local-storage` |
| Remove license clears those values without removing a schedule. | 9 | Pass; `data-deletion` |
| Clearing this site’s browser data clears both. | 7 | Pass; `data-deletion` |
| Choose the locale, currency, and time zone. | 7 | Pass; `schedule-settings` |
| Set your payment wording and reminder timing. | 7 | Pass; `schedule-settings` |
| The app does not invent late fees or local invoice rules. | 11 | Pass; `no-added-rules` |
| See `/privacy` and `/terms`. | 5 | Pass |
| The Terms page includes a 14-day refund request email link. | 10 | Pass; `refund-request` |
| Develop | 1 | Pass |
| Requirements: Node.js 20 or newer and npm. | 7 | Pass; developer context |
| Open `http://localhost:5173`. | 3 | Pass; developer context |
| The demo entry point is `http://localhost:5173/?demo=1`. | 7 | Pass; developer context |
| Test and build | 3 | Pass |
| `npm test` builds and serves the production app, then runs the claim and accessibility checks in Chromium. | 16 | Pass; developer context |
| The exact production build command is `npm run build`. | 8 | Pass; developer context |
| Static output lands in `dist/`, with `dist/index.html` at its root. | 11 | Pass; developer context |
| After deployment, run `npm run test:live` to check routing, the product’s payment listing, and checkout. | 13 | Pass; developer context |
| Claim definitions and their sandbox steps are in `.factory/claims.json`. | 10 | Pass; developer context |
| The demo contract is in `.factory/demo.md`. | 7 | Pass; developer context |
| Deploy | 1 | Pass |
| Deploy the contents of `dist/` to Azure Static Web Apps. | 10 | Pass; developer context |
| The included configuration routes app pages correctly and applies browser security and caching settings. | 14 | Pass; developer context |
| The factory owns DNS and billing registration. | 7 | Pass; developer context |
| License | 1 | Pass |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass |

The landing has no metaphor/mood heading, inconsistent term, or non-result action. The README has no over-cap sentence or banned adjective. F-5-2 is the only plain-language flag. No wholly unlisted product claim was found; F-2-2 is a listed claim whose test omits a live entitlement path.

## Demo and sandbox behavior

- One click from the landing action opened `/?demo=1` with title “Demo — Deposit Deadline Bridge.” The first rendered screen already contained HT-084, Highland Glasshouse Supper, Maya Chen, $2,400, $5,600, `America/New_York`, bank-transfer wording, and export actions.
- The banner says “Demo — sample data, nothing is saved” and includes **Reset demo** and **Start for real**. At the export controls on 390 px it remained sticky at y=0. Reset restored Highland Glasshouse Supper.
- A real `LIVE-R5` schedule was saved before entering demo. The IndexedDB and localStorage snapshots were byte-for-byte identical after editing and resetting the sample. In a separate awaited check, **Start for real** restored the saved `LIVE-R5B` schedule.
- A fresh demo used no localStorage entry and no persisted sample record. The observed one-click flow requested only the same-origin document, JavaScript, CSS, and hero image.
- After service-worker control, offline reload retained HT-084 and displayed “You are offline. Editing and exports still work.”

The demo itself passes. F-2-2 concerns the separate paid-entitlement path, not demo storage.

## Claims and clean-clone verification

The clean clone was `/tmp/ddb-review5-YHYrTN/repo`. `npm ci` installed the pinned Playwright 1.58.2 dependency. Each exact `test` command from `.factory/claims.json` was run separately; each tag occurs exactly once in `tests/claims.spec.ts`.

| Claim ID | Exact-command result | Evidence asserted by the declared test |
| --- | --- | --- |
| `offline-reload` | PASS | Controlled service worker, offline reload, usable HT-084 sample |
| `local-schedules` | PASS | Real save in IndexedDB and no external schedule-field request |
| `demo-ready` | PASS | One click opens complete HT-084 sample and exports |
| `calendar-two-events` | PASS | Two events, two alarms, both existing dates |
| `two-payment-export` | PASS | Separate deposit/final sections, amounts, and zone |
| `copy-payment-instructions` | PASS | Clipboard receives both sections |
| `dst-precision` | PASS | Spring gap rejected; second fall occurrence preserved |
| `confirm-reminder` | PASS | Both reminders gated; only confirmation opens expected `mailto:` |
| `private-runtime` | PASS | No third-party demo request or remote font |
| `license-private` | PASS | Only the pasted token reaches the mocked license service |
| `no-added-rules` | PASS | User wording retained; no late fee inserted |
| `demo-isolation` | PASS | Real IndexedDB/localStorage unchanged through demo edit/reset |
| `json-backup` | PASS | Backup exports, changes, and imports |
| `schedule-settings` | PASS | Locale, currency, zone, wording, and reminders reach exports |
| `one-free-schedule` | PASS, but incomplete (F-2-2) | One free record and three records after mocked pasted-token success; no return-query/offline case |
| `free-core-features` | PASS | Unlicensed exports, copy, reminder review, and backup work |
| `license-local-storage` | PASS | Only two documented license values are stored after mocked success |
| `data-deletion` | PASS | Remove-license and origin-data deletion behavior |
| `license-revocation` | PASS | Mocked inactive result closes library while free exports remain |
| `refund-request` | PASS | 14-day text and expected editable refund `mailto:` |

No declared command failed. The claims gate still fails because the supplemental live path in F-2-2 disproves the paid-boundary claim and is absent from the test.

Additional clean-clone results:

- `npm run test:unit`: PASS, 3/3.
- `npm test`: PASS, 36/36.
- `npm run build`: PASS; `dist/` produced.
- Production assets: 12,253-byte gzip JavaScript and 4,911-byte gzip CSS.
- `npm audit --audit-level=moderate`: PASS, zero vulnerabilities.
- `npm run test:live`: PASS.

## Earlier finding verification

Every earlier `review-*.md`, `polish-*.md`, and `.factory/handoff.md` was read. Each prior finding was checked against the live site and current code/tests.

| Earlier ID | Current status |
| --- | --- |
| F-1-1 | Fixed: demo warning and both controls stay sticky at the mobile export area. |
| F-1-2 | Fixed: real-save privacy test uses IndexedDB and request inspection. |
| F-1-3 | Fixed: real storage remains byte-for-byte unchanged through demo edit/reset. |
| F-1-4 | Fixed: both reminder paths, cancellation, request absence, and explicit `mailto:` are tested. |
| F-1-5 | Fixed: public size wording remains finite (“multiple”), and three paid records are tested. |
| F-1-6 | Fixed: one-click HT-084 readiness is declared and tested. |
| F-1-7 | Fixed: invoice wording promises plain instructions, not universal compatibility. |
| F-1-8 | Fixed: provider assertions are absent; refund request and revocation outcomes are declared/tested. |
| F-1-9 | Fixed: live unknown paths return the designed HTTP 404 with shared shell and metadata. |
| F-1-10 | Fixed: all three facts fit within the 390 × 844 first screen. |
| F-1-11 | Fixed: README opening consists of short plain sentences. |
| F-1-12 | Fixed: the repository audit covers landing/README and uses a stated tokenizer. |
| F-1-13 | Fixed: “Export both payment deadlines” remains. |
| F-1-14 | Fixed: paid copy consistently names payment schedules. |
| F-1-15 | Fixed: public copy consistently uses “final balance.” |
| F-1-16 | Fixed: README uses browser-language storage wording. |
| F-1-17 | Fixed: the billing-API implementation phrase remains absent. |
| F-1-18 | Fixed: README deployment wording remains plain and operational. |
| F-2-1 | Fixed: the first screen names catering businesses. |
| F-2-2 | **Regressed/half-fixed:** pasted-token verification is tested, but any return-query token is trusted offline. Reopened as blocking. |
| F-2-3 | Fixed: all five settings are split into plain sentences and tested in exports. |
| F-2-4 | Fixed: calendar test begins at the landing action and proves both existing dates. |
| F-2-5 | Fixed: the context-free “Narrow on purpose” label is absent. |
| F-3-1 | Fixed: unlicensed calendar, instructions, reminder review, and backup are declared/tested. |
| F-3-2 | Fixed: documented license-storage values are declared/tested after verification. |
| F-3-3 | Fixed: license removal and browser-data clearing are declared/tested. |
| F-3-4 | Fixed: preview h2 is “Payment schedule preview.” |
| F-3-5 | Fixed: Privacy h1 is “How your schedules are stored.” |
| F-3-6 | Fixed: Terms h1 names Deposit Deadline Bridge. |
| F-3-7 | Fixed: 404 h1 is “Page not found.” |
| F-3-8 | Fixed: workspace label is “Export options.” |
| F-4-1 | Fixed: “Payment schedule preview” is the section h2. |
| F-4-2 | Fixed: process h2 is “How to record and export payment dates.” |
| F-4-3 | Fixed: scope h2 is “What this app records and does not handle.” |

## Structure, routing, accessibility, and identity

- `/`, `/demo`, `/?demo=1`, `/workspace`, `/privacy`, and `/terms` return 200. The unknown route returns HTTP 404. Every checked page has `lang=en`, one h1, one main, a description, canonical, OG/Twitter metadata, favicon, header, footer, skip link, Privacy, and Terms.
- Titles are route-specific and follow the required patterns: “Deposit Deadline Bridge — preserve payment dates,” “Payment schedule — Deposit Deadline Bridge,” “Demo — Deposit Deadline Bridge,” “Privacy — Deposit Deadline Bridge,” “Terms — Deposit Deadline Bridge,” and “Page not found — Deposit Deadline Bridge.”
- In-app Privacy navigation updates the title and focuses its h1. Browser Back restores `/`, its title, and h1 focus.
- Every discovered HTTP link returned 200 or the expected Sociobot checkout 303; the hosted checkout destination returned 200. The refund address is an explicit `mailto:`. Required `robots.txt`, sitemap, manifest, favicon, apple-touch icon, and 1200 × 630 social card return 200.
- The production CSP is present as a response header and includes `frame-ancestors`; there are no CSP console errors. The live URL verifier passed `/`, `/?demo=1`, `/privacy`, and `/terms`.
- Live axe scans found zero violations on the landing, demo, Privacy, Terms, and 404 routes. Mobile has no horizontal overflow, focus styles and reduced-motion rules exist, and the full suite checks keyboard entry. F-5-1 is the remaining touch-target failure.
- The asymmetric ceramic still life, paired porcelain milestones, cobalt bridge, mineral palette, Georgia/system pairing, irregular radii, and restrained motion match the product thesis and are recognisable rather than a generic SaaS template.

## Missed leverage

No missing AI feature is implied. Date validation, time-zone conversion, calendar generation, and reminder drafting are deterministic, and a model would add cost and privacy exposure without removing a required user decision. Calendar/text exports, clipboard copy, and backup import/export cover the obvious transfer needs. Cloud sync would contradict the current browser-local promise unless introduced as an explicit opt-in product change.

## What would make this perfect

Close all three findings. Most importantly, make a checkout-return token pending until Sociobot verifies it, and add online/offline query-token cases to the paid claim test. Enlarge both legal action hit areas and replace `.ics`/JSON-first user wording with calendar/backup language. Then rerun all 20 exact claim commands, the full suite/build, the offline invalid-token reproduction, mobile target scan, live route crawl, and copy audit. A perfect result has no route that grants paid state without a successful verification and no copy or accessibility exception.
