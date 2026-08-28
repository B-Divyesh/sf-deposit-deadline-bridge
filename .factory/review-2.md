# Adversarial first-read review 2

Date: 2026-08-28 UTC  
Live site: <https://deposit-deadline-bridge.sociobot.in>  
Repository reviewed: `a314faf40c8d0761facd0c41de3a1ac8d9ee710a` plus the uncommitted review documents in this commit.

## Verdict: **FAIL**

The product is clear, functional, tryable, private in demo mode, and visually specific. All 14 declared claim commands pass from a clean clone, and the full local and live-release suites pass. It still has six copy/claims findings, including a recurrence of F-1-15. The review cannot pass while visitor-facing README claims lack entries and executable tests, while the landing excludes one stated audience, and while an abstract heading fails the first-read heading rule.

## First screen, before scrolling

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900. No prior site data was present.

| Question | 390 px | Desktop |
| --- | --- | --- |
| What does this do? | It keeps a deposit date and final-balance date from being lost when a quote becomes an invoice. | Same. |
| For whom? | Event and project businesses; the screen does not mention catering businesses. | Same. |
| What should I click first? | **Try it with sample data**. | Same. |

The exact first-screen text was “Keep deposit and final-balance dates,” “For event and project businesses whose agreed payment dates disappear when a quote becomes an invoice.”, and “Try it with sample data.” The comprehension gate passes, but the audience wording is incomplete (F-2-1).

At 390 px the three facts occupy y=728–832 in an 844 px viewport. They are visible without scrolling. The page loaded with no console or page errors at either viewport.

## Findings

### Blocking

#### F-1-15 — Final-balance terminology remains inconsistent

- Exact location/quote: landing `<h1>`, “Keep deposit and **final-balance** dates”; README opening, “Keep deposit and **final-balance** dates intact when a quote becomes an invoice.” The terminology table and payment labels use “final balance.”
- Why this fails: review 1 required all public descriptions, including the first screen and README, to use **final balance**. The hyphenated compound is readable but is still a second visible term for the same payment in the most prominent copy. This earlier finding is therefore not fully fixed and is blocking again under its original ID.
- Concrete fix: use “Keep deposit and final balance dates” in the headline and README, then update title/metadata if the compound remains there.

### Major

#### F-2-1 — The landing excludes catering businesses from its stated audience

- Exact location/quote: landing hero, “For event and project businesses whose agreed payment dates disappear when a quote becomes an invoice.”
- Why this fails: the researched brief names **event, catering, or project** businesses, and the README correctly says “event, catering, and project businesses.” A caterer reading only the phone hero has no evidence that the tool is for them.
- Concrete fix: replace it with “For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice.”

#### F-2-2 — The README makes an unlisted checkout/license claim

- Exact location/quote: `README.md`, “Sociobot handles checkout and license checks.”
- Why this fails: this is a visitor-relevant statement about who performs the paid flow. It has no matching `claims.json` entry or declared tagged test. The existing `one-free-schedule` test happens to cover a checkout URL and mocked verification, but its listed claim and `where` field do not cover this sentence.
- Concrete fix: either remove the sentence, or add a claim such as “Sociobot opens checkout and verifies a pasted license token,” list this README location, and make the tagged test assert the checkout destination and the verification result.

#### F-2-3 — The README makes five unlisted settings claims in one sentence

- Exact location/quote: `README.md`, “Users choose the locale, currency, time zone, payment wording, and reminder timing.”
- Why this fails: it promises control over five output-affecting settings, but no `claims.json` entry declares or tests them together. It also combines several ideas in one sentence, making it harder to scan.
- Concrete fix: replace it with “Choose the locale, currency, and time zone. Set your payment wording and reminder timing.” Add a `schedule-settings` claim and tagged test that changes each setting in demo, then asserts the calendar, instruction export, and reminder draft use the selected values.

#### F-2-4 — A no-retyping result is stronger than its declared calendar claim

- Exact location/quote: landing preview, “Add both deadlines to your calendar without typing them again.”
- Why this fails: `calendar-two-events` declares only “Downloads one calendar file with both payment deadlines.” Its test opens `/demo` directly and asserts the ICS contents; it does not associate the one-click sample route with the promise that neither deadline is re-entered. This is a separately worded result a visitor can rely on.
- Concrete fix: add this exact result to the `calendar-two-events` claim (and `where`), then begin its test at the landing CTA, verify both populated dates, download once, and assert both dates/events appear in the calendar file.

### Minor

#### F-2-5 — One landing heading has no useful standalone meaning

- Exact location/quote: landing eyebrow above the boundaries section, “Narrow on purpose.”
- Why this fails: a screen-reader heading list or a fast scan does not say what is narrow or what the product will not do. The following heading is clear, but the eyebrow is still navigable copy with no standalone meaning.
- Concrete fix: replace it with “What the app does not do,” or remove the eyebrow and let “It keeps dates, not money” introduce the section.

## Copy audit

Counts use whitespace-delimited words. Navigation, headings, controls, and footer labels are included because they are visible first-read copy; repeated global labels appear once. Sample IDs, amounts, dates, and client/project field values are data rather than sentences.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Deadline Bridge | 2 | Pass |
| Demo | 1 | Pass |
| Workspace | 1 | Pass |
| Privacy | 1 | Pass |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and final-balance dates | 5 | F-1-15 (reopened) |
| For event and project businesses whose agreed payment dates disappear when a quote becomes an invoice. | 16 | F-2-1 |
| Try it with sample data | 5 | Pass |
| Opens a complete two-payment schedule. | 5 | Pass; `demo-ready` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Your schedules stay in this browser. | 6 | Pass; `local-schedules` |
| One schedule is free. | 4 | Pass; `one-free-schedule` |
| The full library costs $24 once. | 6 | Pass; `one-free-schedule` |
| Create a blank schedule | 4 | Pass |
| The attachment your invoice lacks | 5 | Pass |
| Two dates stay separate | 4 | Pass |
| Download two plain payment instructions to attach to an invoice. | 10 | Pass; `two-payment-export` |
| Add both deadlines to your calendar without typing them again. | 10 | F-2-4 |
| How it works | 3 | Pass |
| Move both dates without retyping | 5 | Pass |
| Record the agreement | 3 | Pass |
| Add the deposit, final balance, local times, and exact time zone. | 11 | Pass |
| Export both payment deadlines | 4 | Pass |
| Download one calendar file and two plain payment instructions. | 9 | Pass; `calendar-two-events`, `two-payment-export` |
| Review each reminder | 3 | Pass |
| Check the email draft before your own email app opens it. | 11 | Pass; `confirm-reminder` |
| Narrow on purpose | 3 | F-2-5 |
| It keeps dates, not money | 5 | Pass |
| No automatic email sending. | 4 | Pass; `confirm-reminder` |
| No late fees or local rules added for you. | 9 | Pass; `no-added-rules` |
| License checks never include schedule details. | 6 | Pass; `license-private` |
| One-time license | 2 | Pass |
| Keep every payment schedule | 4 | Pass |
| The free version keeps one current schedule. | 7 | Pass; `one-free-schedule` |
| Pay $24 once to save and reopen multiple schedules in this browser. | 12 | Pass; `one-free-schedule` |
| Buy the full library | 4 | Pass |
| Read payment and refund terms | 5 | Pass |
| Keep two payment dates attached to one quote. | 8 | Pass |
| Built by Param Factory | 4 | Pass |
| Original generated ceramic artwork. | 4 | Pass; provenance is recorded in `assets/src/hero-ceramic.json` |
| Terms | 1 | Pass |

No landing sentence exceeds 22 words and no banned marketing adjective appears. All action controls use result-naming verbs. The flags are term consistency, audience scope, an unlisted promise, and a context-free heading.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and final-balance dates intact when a quote becomes an invoice. | 11 | F-1-15 (reopened) |
| Deposit Deadline Bridge is for event, catering, and project businesses. | 10 | Pass |
| Record the deposit and final balance in a named time zone. | 11 | Pass |
| The app catches missing clock times and lets you choose when a clock time repeats. | 15 | Pass; `dst-precision` |
| Then export one calendar file and two payment instructions. | 9 | Pass; export claims |
| Every reminder opens as an editable draft before your email app opens. | 12 | Pass; `confirm-reminder` |
| Live site: https://deposit-deadline-bridge.sociobot.in | 3 | Pass |
| Try the isolated demo | 4 | Pass |
| Open https://deposit-deadline-bridge.sociobot.in/demo or run the site locally and visit `/demo`. | 10 | Pass |
| The sample is quote HT-084 for the Highland Glasshouse Supper. | 10 | Pass; `demo-ready` |
| Demo changes are held in memory and are not saved to real schedules. | 13 | Pass; `demo-isolation` |
| Select Reset demo to restore the sample. | 7 | Pass |
| What v1 does | 3 | Pass |
| Stores real schedules in this browser. | 6 | Pass; `local-schedules` |
| Keeps the deposit and final balance as separate dated payments. | 10 | Pass; export claims |
| Downloads one `.ics` calendar containing both deadlines and both reminder alarms. | 11 | Pass; `calendar-two-events` |
| Downloads or copies two payment instructions for an invoice or accounting system. | 12 | Pass; export/copy claims |
| Opens editable reminder email drafts only after confirmation. | 8 | Pass; `confirm-reminder` |
| Exports and imports a JSON backup. | 6 | Pass; `json-backup` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Keeps one current schedule for free. | 6 | Pass; `one-free-schedule` |
| The $24 one-time license lets you save and reopen multiple schedules in this browser. | 14 | Pass; `one-free-schedule` |
| Sociobot handles checkout and license checks. | 6 | F-2-2 |
| Privacy and scope | 3 | Pass |
| Schedule data stays in the browser. | 6 | Pass; `local-schedules` |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass; `private-runtime`, `confirm-reminder` |
| A license check sends only the saved license token to `api.sociobot.in`. | 11 | Pass; `license-private` |
| Users choose the locale, currency, time zone, payment wording, and reminder timing. | 12 | F-2-3 |
| The app does not invent late fees or local invoice rules. | 11 | Pass; `no-added-rules` |
| See `/privacy` and `/terms`. | 4 | Pass |
| Develop | 1 | Pass |
| Requirements: Node.js 20 or newer and npm. | 7 | Pass for developers |
| Open `http://localhost:5173`. | 2 | Pass |
| The demo entry point is `http://localhost:5173/demo`. | 6 | Pass |
| Test and build | 3 | Pass |
| `npm test` builds and serves the production app, then runs the claim and accessibility checks in Chromium. | 17 | Pass for developers |
| The exact production build command is `npm run build`. | 9 | Pass |
| Static output lands in `dist/`, with `dist/index.html` at its root. | 10 | Pass |
| After deployment, run `npm run test:live` to check routing, the product’s payment listing, and checkout. | 15 | Pass for developers |
| Claim definitions and their sandbox steps are in `.factory/claims.json`. | 9 | Pass |
| The demo contract is in `.factory/demo.md`. | 6 | Pass |
| Deploy | 1 | Pass |
| Deploy the contents of `dist/` to Azure Static Web Apps. | 10 | Pass |
| The included configuration routes app pages correctly and applies browser security and caching settings. | 13 | Pass for developers |
| The factory owns DNS and billing registration. | 7 | Pass for developers |
| License | 1 | Pass |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass |

No README sentence exceeds 22 words and no banned marketing word appears. F-2-2 and F-2-3 are unlisted claims; F-1-15 is the same terminology problem as the landing.

## Demo and sandbox behaviour

- One landing click entered `/demo` with the complete HT-084 Highland Glasshouse Supper schedule: Maya Chen, $2,400 deposit, $5,600 final balance, `America/New_York`, payment wording, reminder controls, and export actions.
- The live 390 px banner remained at y=0 after scrolling to **Download calendar**. It displayed “Demo — sample data, nothing is saved,” **Reset demo**, and **Start for real**.
- Editing the live sample and selecting **Reset demo** restored “Highland Glasshouse Supper.”
- The declared isolation, offline, real-storage, private-runtime, reminder, and export paths all passed from the clean clone. In particular, the isolation test snapshots real IndexedDB/localStorage, edits/resets demo state, and reopens the unchanged real schedule.

## Claims and test evidence

I created a fresh clone at a temporary path, ran `npm ci`, and executed each exact command declared by `.factory/claims.json` separately. All 14 passed: `offline-reload`, `local-schedules`, `demo-ready`, `calendar-two-events`, `two-payment-export`, `copy-payment-instructions`, `dst-precision`, `confirm-reminder`, `private-runtime`, `license-private`, `no-added-rules`, `demo-isolation`, `json-backup`, and `one-free-schedule`.

The suite also passed in full: `npm test` (29 tests), `npm run test:unit` (3 tests), `npm run build`, and `npm run test:live`. F-2-2 through F-2-4 are not failing command results; they are copy claims that the declared claims contract does not currently enumerate precisely enough.

## Earlier-review history

Every earlier review/polish/handoff document was read. Each first-round finding was checked against both live behaviour and the repair code/tests.

| Earlier finding | Confirmed status |
| --- | --- |
| F-1-1 | Fixed: the live demo warning and both controls are sticky at 390 px. |
| F-1-2 | Fixed: `local-schedules` enters real mode, saves unique data, observes network requests, and reads IndexedDB. |
| F-1-3 | Fixed: `demo-isolation` snapshots real IndexedDB/localStorage before demo use and confirms it is unchanged. |
| F-1-4 | Fixed: `confirm-reminder` checks both reminder paths, cancellation, explicit confirmation, requests, and `mailto:`. |
| F-1-5 | Fixed: public wording is “multiple schedules,” and three paid records versus one free record are tested. |
| F-1-6 | Fixed: `demo-ready` covers the one-click populated sample. |
| F-1-7 | Fixed: the landing now says instructions can be attached to an invoice, not any invoice. |
| F-1-8 | Fixed: the landing links to the local payment/refund terms instead of asserting an untested refund-provider statement. |
| F-1-9 | Fixed: the live HTTP 404 has the header, footer, legal links, metadata, favicon, and designed product treatment. |
| F-1-10 | Fixed: all three facts fit before the 390 px fold. |
| F-1-11 | Fixed: the README opening is split into short sentences. |
| F-1-12 | Fixed: the existing copy audit has tokenizer notes, README coverage, and terminology table. This review independently repeated the audit. |
| F-1-13 | Fixed: “Export the bridge” is now “Export both payment deadlines.” |
| F-1-14 | Fixed: the paid heading is “Keep every payment schedule.” |
| F-1-15 | **Not fixed:** the live headline and README still use **final-balance**. It is reopened as blocking F-1-15. |
| F-1-16 | Fixed: README storage language says “this browser.” |
| F-1-17 | Fixed: the former billing-API wording is gone; F-2-2 is a new claim-registration issue with the replacement sentence. |
| F-1-18 | Fixed: README deployment wording is plain language. |

## Structure, routes, and identity

- PASS: `/`, `/demo`, `/workspace`, `/privacy`, and `/terms` returned 200; an unknown route returned 404. `robots.txt`, `sitemap.xml`, favicon, apple-touch icon, and social card returned 200. The checkout endpoint returned a hosted Dodo 303.
- PASS: live route titles are specific; each checked page has one `<h1>` and `<main>`, a description, canonical, social metadata, favicon, consistent header/footer, legal links, and a skip link. The app’s Privacy navigation updates title and focus; Back restores the home focus. The static 404 uses the same shell and CSP-safe stylesheet.
- PASS: all discovered internal links and the external checkout destination were live. No console/page errors were observed on the checked live routes.
- PASS: the ceramic ledger art, asymmetric layout, cobalt/porcelain palette, Georgia/system type pairing, bridge motifs, and reduced-motion treatment match `.factory/design.md` and do not resemble a generic SaaS template.

## Missed leverage

No additional AI feature is warranted. The core job is deterministic date preservation and local export; model inference would increase privacy/cost exposure without removing a necessary user step. Calendar export, payment-instruction export/copy, and JSON import/export cover the obvious local-first leverage. Sync would contradict the current browser-local promise unless made an explicit opt-in product decision.

## What would make this perfect

Fix F-1-15 and F-2-1 through F-2-5, especially by registering and testing every README promise. Then repeat this full review from a fresh browser context and clean clone. A perfect result has the correct audience in the first screen, one **final balance** term, standalone headings, and no visitor-relevant sentence that the claims contract does not explicitly test.
