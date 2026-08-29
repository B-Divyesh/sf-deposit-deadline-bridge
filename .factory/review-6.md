# Adversarial first-read review 6

Date: 2026-08-29 UTC

Live site: <https://deposit-deadline-bridge.sociobot.in>

Repository revision reviewed: `504c76dd2e94d95eb8e886c0bf14fee001659835`

## Verdict: **FAIL**

The product itself is clear, tryable, honest, and functional. All 20 declared claim commands pass separately from a clean clone, and the live demo, privacy, offline, routing, accessibility, and paid-license checks pass. One blocking history regression remains: the repository's required copy-audit artifact is stale and contains five incorrect word counts. That reopens F-1-12. PASS requires zero findings.

## First screen, before scrolling

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900. No site storage existed, and no scrolling or interaction occurred before this record.

| Question | 390 px | Desktop |
| --- | --- | --- |
| What does this do? | It keeps deposit and final balance dates from being lost when a quote becomes an invoice. | Same. |
| For whom? | Event, catering, and project businesses whose agreed payment dates can disappear during conversion. | Same. |
| What should I click first? | **Try it with sample data**. | Same. |

The exact copy supplying those answers was “Keep deposit and final balance dates,” “For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice,” and “Try it with sample data.” The adjacent note says “Opens a complete two-payment schedule.” At 390 px, all three plain facts end by y=832 in the 844 px viewport. This gate passes at both widths.

## Finding

### Blocking

#### F-6-1 / F-1-12 — The required copy audit is stale and miscounted

- Exact location: `.factory/copy-audit.md`.
- Incorrect counts under the artifact's own whitespace tokenizer:
  - Landing audience sentence is listed as 18 words; it has 17.
  - README opening “Keep deposit and final balance dates intact when a quote becomes an invoice.” is listed as 12 words; it has 13.
  - “Clearing this site’s browser data clears both.” is listed as 8 words; it has 7.
  - “Choose the locale, currency, and time zone.” is listed as 8 words; it has 7.
  - “`npm test` builds, serves, and checks the app in Chromium.” is listed as 9 words; it has 10. The actual README sentence is different and has 17 words.
- Stale/omitted copy: the artifact says “Open the isolated demo.” although the README says “Try the isolated demo” and then gives a separate URL sentence. It shortens the actual `npm test` and deploy sentences, combines two landing sentences into one row, and omits visible navigation/action labels despite saying headings and controls are covered.
- Why this fails: F-1-12 previously required a complete, accurate audit after incorrect counts were found in review 1. The current artifact again certifies inaccurate evidence, so a maintainer cannot rely on the claimed proof of simplicity. The history rule makes this regression blocking even though the live and README copy independently pass.
- Concrete fix: regenerate `.factory/copy-audit.md` from the current rendered landing page and current README. List sentences separately, include headings and actions under one documented inclusion rule, and derive counts with the stated tokenizer. Add a test that compares every recorded row and count with the source/rendered copy so the artifact cannot become stale.

## Copy audit

Counts split trimmed copy on whitespace. URLs and inline-code spans count as one word. Repeated global labels appear once. Sample IDs, dates, amounts, and field values are data rather than sentences. Headings and actions are included because they must make sense out of context.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Pass |
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
| The full library costs $24 once. | 6 | Pass; `one-free-schedule` |
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
| Keep multiple payment schedules | 4 | Pass; `one-free-schedule` |
| The free version keeps one current schedule. | 7 | Pass; `one-free-schedule` |
| Pay $24 once to save and reopen multiple schedules in this browser. | 12 | Pass; `one-free-schedule` |
| Buy the full library | 4 | Pass; result-naming action |
| opens Sociobot checkout | 3 | Pass; accessible action qualifier |
| Read refund policy and terms | 5 | Pass; result-naming action |
| Keep two payment dates attached to one quote. | 8 | Pass |
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
| Open https://deposit-deadline-bridge.sociobot.in/?demo=1 or run the site locally and visit `/?demo=1`. | 10 | Pass |
| The sample is quote HT-084 for the Highland Glasshouse Supper. | 10 | Pass; `demo-ready` |
| Demo changes are held in memory and are not saved to real schedules. | 13 | Pass; `demo-isolation` |
| Select Reset demo to restore the sample. | 7 | Pass |
| What v1 does | 3 | Pass |
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
| Privacy and scope | 3 | Pass |
| Schedule data stays in the browser. | 6 | Pass; `local-schedules` |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass; privacy/reminder claims |
| A license check sends only the saved license token to `api.sociobot.in`. | 11 | Pass; `license-private` |
| The browser stores a restored license token and its latest verification result. | 12 | Pass; `license-local-storage` |
| Remove license clears those values without removing a schedule. | 9 | Pass; `data-deletion` |
| Clearing this site’s browser data clears both. | 7 | Pass; `data-deletion` |
| Choose the locale, currency, and time zone. | 7 | Pass; `schedule-settings` |
| Set your payment wording and reminder timing. | 7 | Pass; `schedule-settings` |
| The app does not invent late fees or local invoice rules. | 11 | Pass; `no-added-rules` |
| See `/privacy` and `/terms`. | 4 | Pass |
| The Terms page includes a 14-day refund request email link. | 10 | Pass; `refund-request` |
| Develop | 1 | Pass |
| Requirements: Node.js 20 or newer and npm. | 7 | Pass; developer context |
| Open `http://localhost:5173`. | 2 | Pass; developer context |
| The demo entry point is `http://localhost:5173/?demo=1`. | 6 | Pass; developer context |
| Calendar downloads use `.ics`; backup files use JSON. | 8 | Pass; developer context |
| Test and build | 3 | Pass |
| `npm test` builds and serves the production app, then runs the claim and accessibility checks in Chromium. | 17 | Pass; developer context |
| The exact production build command is `npm run build`. | 9 | Pass; developer context |
| Static output lands in `dist/`, with `dist/index.html` at its root. | 10 | Pass; developer context |
| After deployment, run `npm run test:live` to check routing, the product’s payment listing, and checkout. | 15 | Pass; developer context |
| Claim definitions and their sandbox steps are in `.factory/claims.json`. | 9 | Pass; developer context |
| The demo contract is in `.factory/demo.md`. | 6 | Pass; developer context |
| Deploy | 1 | Pass |
| Deploy the contents of `dist/` to Azure Static Web Apps. | 10 | Pass; developer context |
| The included configuration routes app pages correctly and applies browser security and caching settings. | 14 | Pass; developer context |
| The factory owns DNS and billing registration. | 7 | Pass; developer context |
| License | 1 | Pass |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass |

No live landing or README sentence exceeds 22 words. No banned marketing adjective, inconsistent product term, metaphor/mood heading, or non-result action was found. The file-format and deployment terms occur only in developer instructions.

## Demo and sandbox behavior

- One click on **Try it with sample data** opened `/?demo=1`, titled “Demo — Deposit Deadline Bridge.” The first mobile screen showed the demo warning, HT-084, the product h1, and the populated quote-number control; the form already contained Highland Glasshouse Supper, Maya Chen, $2,400, $5,600, both dates, `America/New_York`, and bank-transfer wording.
- The persistent banner said “Demo — sample data, nothing is saved” and included **Reset demo** and **Start for real**. After scrolling to **Download calendar**, it remained sticky at y=0. Reset restored “Highland Glasshouse Supper.”
- A fresh demo had no localStorage values and no IndexedDB database. Its initial flow requested only the same-origin document, JavaScript, CSS, and hero image. No console or page error occurred.
- A live real schedule named `LIVE-R6` was saved first. Editing and resetting the demo left its IndexedDB and localStorage snapshots byte-for-byte unchanged. **Start for real** restored `LIVE-R6`.
- After service-worker control, a live offline reload retained HT-084, the banner, and the notice “You are offline. Editing and exports still work.”

The demo gate passes.

## Claims

A clean clone at `/tmp/ddb-review6-clean-QyYSxD/repo` was made from revision `504c76d`, followed by `npm ci`. Every exact `test` command in `.factory/claims.json` was run separately.

| Claim ID | Result | Observable evidence |
| --- | --- | --- |
| `offline-reload` | PASS | Controlled service worker, offline reload, and usable HT-084 sample |
| `local-schedules` | PASS | Real save in IndexedDB with no schedule fields in an external request |
| `demo-ready` | PASS | One landing click opens all realistic sample fields and exports |
| `calendar-two-events` | PASS | Exactly two events, two alarms, and both populated dates |
| `two-payment-export` | PASS | Separate deposit/final sections, amounts, and time zone |
| `copy-payment-instructions` | PASS | Clipboard receives both payment sections |
| `dst-precision` | PASS | Spring gap rejected and selected repeated time preserved |
| `confirm-reminder` | PASS | Both reminders gated; only confirmation opens the expected `mailto:` |
| `private-runtime` | PASS | No third-party demo request or remote font |
| `license-private` | PASS | Only the saved token reaches the mocked license endpoint |
| `no-added-rules` | PASS | User wording retained and no late fee inserted |
| `demo-isolation` | PASS | Real IndexedDB/localStorage unchanged through demo edit/reset |
| `json-backup` | PASS | Backup downloads, changes, and restores |
| `schedule-settings` | PASS | Locale, currency, zone, wording, and reminder timings reach exports |
| `one-free-schedule` | PASS | Price/checkout plus invalid, offline, returned, and pasted token states; one versus three records |
| `free-core-features` | PASS | Unlicensed exports, copy, reminder review, and backup work |
| `license-local-storage` | PASS | Only two documented namespaced license values are stored |
| `data-deletion` | PASS | License-only removal and complete origin-data clearing |
| `license-revocation` | PASS | Inactive license closes the library while free exports remain |
| `refund-request` | PASS | 14-day policy and expected editable refund email |

No command failed. A cross-check of the live landing, workspace, Privacy, Terms, and README found no unlisted claim-like sentence. Live request logging confirmed the privacy/offline statements. A fresh live offline return token remained locked with `{ "valid": false, "checkedAt": 0 }`, confirming the F-2-2 repair.

## Earlier finding verification

Every earlier `.factory/review-*.md`, `.factory/polish-*.md`, and handoff was read. Each prior finding was checked against the live site and current source/tests.

| Earlier ID | Current status |
| --- | --- |
| F-1-1 | Fixed: live demo warning and both controls remain sticky at the mobile export area. |
| F-1-2 | Fixed: the claim enters real mode, records requests, saves, and reads IndexedDB. |
| F-1-3 | Fixed: live and test snapshots prove demo edits do not alter real storage. |
| F-1-4 | Fixed: both reminder paths, cancellation, requests, and explicit `mailto:` are covered. |
| F-1-5 | Fixed: all copy says “multiple,” and paid storage is tested with three schedules. |
| F-1-6 | Fixed: one-click HT-084 readiness is listed and tested. |
| F-1-7 | Fixed: copy promises plain instructions, not universal invoice compatibility. |
| F-1-8 | Fixed: provider assertions are absent; refund request and revocation are listed and tested. |
| F-1-9 | Fixed: the live HTTP 404 has the shared shell, metadata, legal links, and product art. |
| F-1-10 | Fixed: all three facts fit inside 390 × 844. |
| F-1-11 | Fixed: the README opening remains short, plain sentences. |
| F-1-12 | **Regressed/blocking:** `.factory/copy-audit.md` is stale and has incorrect counts; see F-6-1. |
| F-1-13 | Fixed: “Export both payment deadlines” remains. |
| F-1-14 | Fixed: paid copy names payment schedules rather than quote documents. |
| F-1-15 | Fixed: public copy consistently uses “final balance.” |
| F-1-16 | Fixed: README storage wording says “this browser.” |
| F-1-17 | Fixed: checkout/license wording is user-facing and claim-tested. |
| F-1-18 | Fixed: README deployment wording is operational and confined to developer context. |
| F-2-1 | Fixed: the first screen names event, catering, and project businesses. |
| F-2-2 | Fixed: returned and pasted tokens unlock only after verification; live offline fake token stayed locked. |
| F-2-3 | Fixed: all five settings are split into short sentences and tested in exports. |
| F-2-4 | Fixed: calendar coverage begins at the landing action and proves both populated dates. |
| F-2-5 | Fixed: the context-free scope label remains absent. |
| F-3-1 | Fixed: all four unlicensed core features are declared and tested. |
| F-3-2 | Fixed: the two documented license-storage values are declared and tested. |
| F-3-3 | Fixed: license removal and browser-data clearing are declared and tested. |
| F-3-4 | Fixed: preview h2 is “Payment schedule preview.” |
| F-3-5 | Fixed: Privacy h1 is “How your schedules are stored.” |
| F-3-6 | Fixed: Terms h1 names Deposit Deadline Bridge. |
| F-3-7 | Fixed: 404 h1 is “Page not found.” |
| F-3-8 | Fixed: workspace label is “Export options.” |
| F-4-1 | Fixed: the payment-preview h2 literally names the section. |
| F-4-2 | Fixed: process h2 is “How to record and export payment dates.” |
| F-4-3 | Fixed: scope h2 is “What this app records and does not handle.” |
| F-5-1 | Fixed: every visible live action on all five primary mobile routes is at least 44 × 44 px. |
| F-5-2 | Fixed: visitor controls use calendar/backup language; format names remain only in developer notes. |

## Structure, routing, accessibility, and identity

- `/`, `/demo`, `/?demo=1`, `/workspace`, `/privacy`, and `/terms` returned 200. An unknown path returned the designed HTTP 404. Each checked page had `lang=en`, one h1, one main, route-specific title, description, canonical, OG/Twitter image metadata, favicon, apple-touch icon, shared header/footer, skip link, Privacy, and Terms.
- The title patterns are “Deposit Deadline Bridge — preserve payment dates,” “Demo — Deposit Deadline Bridge,” “Payment schedule — Deposit Deadline Bridge,” “Privacy — Deposit Deadline Bridge,” “Terms — Deposit Deadline Bridge,” and “Page not found — Deposit Deadline Bridge.”
- In-app Privacy navigation focused the new h1. Browser Back restored `/`, its title, and h1 focus.
- All discovered internal destinations returned 200; the missing document correctly returned 404. The checkout endpoint returned its expected hosted-checkout 303. `robots.txt`, sitemap, manifest, favicon, apple-touch icon, and 1200 × 630 social image returned 200.
- Playwright axe found zero violations on the landing, demo, workspace, Privacy, Terms, and 404. Live URL verification found no console errors, missing alt text, or unlabeled buttons. The live 390 px action sweep found no target below 44 px.
- The porcelain milestone photograph, cobalt ceramic bridge, mineral palette, large serif typography, asymmetrical desktop composition, and paired-marker shape language match `.factory/design.md`. The result is recognisable and not a generic SaaS template.

## Quality-gate evidence

- `npm ci`: PASS; zero vulnerabilities reported.
- All 20 exact claim commands: PASS individually.
- `npm run test:unit`: PASS, 3/3.
- `npm test`: PASS, 36/36.
- `npm run build`: PASS; `dist/` produced.
- Production output: 12.37 kB gzip JavaScript and 4.91 kB gzip CSS.
- `npm run test:live`: PASS.
- `/opt/fleet/lib/verify-url.sh`: PASS on `/`, `/?demo=1`, `/privacy`, and `/terms` after creating its output directories.

## Missed leverage

No AI feature is warranted. The job is deterministic date validation, time-zone conversion, export, and user-confirmed email drafting. Model inference would add cost and privacy exposure without removing a necessary decision. Calendar export, instruction download/copy, and backup import/export cover the obvious transfer needs. Sync would conflict with the current browser-local promise unless introduced as an explicit opt-in product change.

## What would make this perfect

Regenerate `.factory/copy-audit.md` from the actual landing and README, correct every count, and add a regression that fails when audited text or counts drift. Then rerun the copy extraction and history check. No live product or claim defect otherwise remains.
