# Adversarial first-read review 1

Date: 2026-08-28 UTC

Live site: <https://deposit-deadline-bridge.sociobot.in>

Reviewed repository base: `67b7af64e37c174317ab123ffca1c22005b19075`

## Verdict: **FAIL**

The core workflow works, all 13 declared claim commands pass, and the visual identity is distinct. The release still has 18 findings: 5 blocking, 7 major, and 6 minor. The blocking issues are a non-persistent demo warning and claim tests that do not prove the full privacy, reminder, isolation, or paid-library promises.

## First screen, before scrolling

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900.

| Question | 390 px | Desktop |
| --- | --- | --- |
| What does it do? | It keeps a deposit date and a final-payment date from being lost when a quote becomes an invoice. | Same. |
| For whom? | Event and project businesses. | Same. |
| What should I click first? | **Try it with sample data**. | Same. |

The exact copy that supplied those answers was “Keep deposit and balance dates intact,” “For event and project businesses whose agreed payment dates disappear when a quote becomes an invoice,” and “Try it with sample data.” The comprehension gate passes at both widths. At 390 px, the CTA ends at y=733 in an 844 px viewport.

## Findings

### Blocking

#### F-1-1 — The demo banner is not persistent

- Exact location: live `/demo`; “Demo — sample data, nothing is saved” / “Reset demo” / “Start for real.”
- Evidence: at 390 px the banner begins at y=68. After scrolling to **Download calendar**, `scrollY` is 3,668, the banner is at y=-3,600, `position` is `static`, and it is not visible. The form is long, so the warning and both demo controls disappear for most of the actual trial.
- Why this fails: a visitor editing or exporting near the bottom can no longer verify that nothing is saved or reset/leave the sandbox. The attached demo contract requires a persistent banner; a weak demo is blocking.
- Concrete fix: make the banner sticky at the top with an opaque background and safe stacking order. Keep its warning, **Reset demo**, and **Start for real** controls visible without covering focused fields. Add a 390 px test that scrolls to the export controls and asserts the banner remains visible.

#### F-1-2 — The real-storage privacy claim is tested only in demo memory

- Exact claim: “Your schedules stay in this browser.” (`local-schedules`).
- Exact test location: `tests/claims.spec.ts:28-39`; it opens `/demo`, whose schedule never enters IndexedDB.
- Why this fails: the test intercepts requests, but it does not create or save a real schedule. A regression that uploads data only from **Save schedule** would still pass.
- Concrete fix: enter through `/demo`, choose **Start for real**, fill and save a schedule, intercept the entire flow, and assert that no schedule field appears in any cross-origin URL, body, or header. Also assert the saved record exists in IndexedDB.

#### F-1-3 — The demo-isolation test does not check the real namespace

- Exact claim: “Demo sample changes are not saved.” The live banner strengthens it to “nothing is saved.”
- Exact test location: `tests/claims.spec.ts:164-170`; it edits the sample, reloads `/demo`, and checks the bundled value.
- Why this fails: the test would still pass if demo edits were also written into the real `schedules` object store, because `/demo` always reloads its bundled sample.
- Concrete fix: seed a real schedule first, record all IndexedDB/localStorage state, edit and reset the demo, then confirm the real state is byte-for-byte unchanged and no `demo:` or sample record was persisted. The manual live check passed this stronger scenario; it needs regression coverage.

#### F-1-4 — “Never sends” is not proven by the reminder claim test

- Exact claim: “The app never sends a reminder without user confirmation.”
- Exact test location: `tests/claims.spec.ts:108-119`; it opens only the deposit dialog, cancels, and checks that the page URL did not change.
- Why this fails: it does not intercept network requests, does not observe `mailto:` attempts directly, and does not exercise the balance reminder. A hidden send request could occur while this test remains green.
- Concrete fix: exercise both reminder buttons while recording all requests and navigations. Assert no request or `mailto:` occurs before **Open email app**, cancellation produces none, and the explicit action produces only the expected editable `mailto:` URL.

#### F-1-5 — The “unlimited” paid-library claim is not testable as written

- Exact quotes: “Pay $24 once to save and reopen an unlimited schedule library” and “The $24 one-time license adds an unlimited local schedule library.”
- Exact test location: `tests/claims.spec.ts:190-240`; paid mode is proved with two records.
- Why this fails: two records do not establish “unlimited,” and browser storage is finite. The command passes, but this part of the listed claim remains untested and absolute.
- Concrete fix: replace “unlimited” with “multiple” or “as many as this browser’s storage allows,” update `one-free-schedule`, and test a stated finite count plus save/reopen behavior.

### Major

#### F-1-6 — The one-click sample claim is unlisted

- Exact quote/location: landing CTA note, “Opens a complete two-payment schedule.”
- Why this fails: `.factory/claims.json` has a demo-isolation claim but no claim for the promised ready-to-use sample. This is a result a visitor relies on.
- Concrete fix: add a `demo-ready` entry and tagged test that clicks the landing CTA once, then asserts the banner plus the realistic HT-084 quote, client, amounts, dates, time zone, payment wording, and export actions are already present.

#### F-1-7 — “Any invoice” is an unlisted compatibility claim

- Exact quote/location: landing preview, “Attach the exported instructions to any invoice.”
- Why this fails: `two-payment-export` proves a text file is created; it does not prove compatibility with every invoice or accounting system.
- Concrete fix: rewrite as “Download two plain payment instructions to attach to an invoice.” Map that exact claim to `two-payment-export`, or add named compatibility tests rather than saying “any.”

#### F-1-8 — The refund statement is an unlisted third-party claim

- Exact quote/location: landing price block, “Sociobot and Dodo handle payment and refunds.”
- Why this fails: `one-free-schedule` checks a checkout URL and a mocked license. It does not verify the merchant of record or refund path.
- Concrete fix: add a deploy-safe claim and test for the hosted checkout/refund-policy destination, or replace this with a link whose result is explicit, such as “Read Sociobot’s payment and refund terms.”

#### F-1-9 — The deployed 404 drops the required site shell and metadata

- Exact location: any unknown live URL, served by `public/404.html`.
- Evidence: the page returns HTTP 404 and has one `<h1>` and `<main>`, but has no header, footer, skip link, Privacy link, Terms link, meta description, canonical, Open Graph tags, or favicon. The live axe scan has no serious/critical violation, but the structure contract requires the common shell and route metadata.
- Why this fails: a visitor who reaches a bad link loses the navigation and legal/footer context present everywhere else.
- Concrete fix: give the static 404 the same wordmark/header/footer/skip link as the app, including Privacy, Terms, build id, description, canonical, OG/Twitter metadata, and favicon. Keep the current product-specific broken-bridge art and HTTP 404 response.

#### F-1-10 — The three required facts are below the mobile first screen

- Exact location: landing at 390 × 844. None of “Works offline after the first visit,” “Your schedules stay in this browser,” or the price facts is visible before scrolling.
- Why this fails: the first-screen skeleton requires the privacy, offline, and price facts. The illustration consumes y=101-340 and the secondary action ends below the viewport at y=846.
- Concrete fix: reduce the mobile art/hero spacing or move the three facts above the secondary action so all three appear in the initial 844 px viewport without hiding the clear headline, audience sentence, CTA, or result note.

#### F-1-11 — The README opening sentence exceeds the hard cap and stacks jargon

- Exact quote/location: `README.md:5`, 30 words: “It records two negotiated deadlines with an IANA time zone, rejects nonexistent daylight-saving times, lets you choose either repeated time, then creates one calendar file and two plain payment instructions.”
- Why this fails: it exceeds 22 words, contains several ideas, and requires a reader to understand “IANA” and “repeated time.”
- Concrete rewrite: “Record the deposit and final balance in a named time zone. The app catches missing clock times and lets you choose when a clock time repeats. Then export one calendar file and two payment instructions.”

#### F-1-12 — The repository copy-audit artifact is incomplete and miscounts controls

- Exact location: `.factory/copy-audit.md` says it is a landing-page audit and “No line exceeds 22 words”; it omits the README entirely. It also counts “Try it with sample data” as 6 words (actual: 5) and “Create a blank schedule” as 5 (actual: 4).
- Why this fails: the attached proof-of-simplicity requirement includes the README, and inaccurate counts cannot support a clean handoff.
- Concrete fix: regenerate the artifact from the rendered landing page and README with a documented tokenizer, include the flags in this review, and fail the check when a sentence exceeds 22 words.

### Minor

#### F-1-13 — “Export the bridge” is a metaphorical heading

- Exact quote/location: landing **How it works**, “Export the bridge.”
- Why this fails: read out of context, it does not name the result and conflicts with the otherwise concrete “calendar file” and “payment instructions” terms.
- Concrete rewrite: “Export both payment deadlines.”

#### F-1-14 — The paid heading says the product keeps quotes

- Exact quote/location: landing pricing heading, “Keep every accepted quote.”
- Why this fails: the product stores schedules tied to quote numbers, not quote documents. The heading changes the object from “schedule” to “quote.”
- Concrete rewrite: “Keep every payment schedule.”

#### F-1-15 — The second payment uses inconsistent names

- Exact locations: hero “balance dates”; brief/README summary “final payment dates”; preview and form “final balance.”
- Why this fails: the terminology table says the one term is “final balance,” but the first screen introduces a shorter and less precise variant.
- Concrete fix: use “final balance” everywhere; for example, “Keep deposit and final-balance dates intact.”

#### F-1-16 — The README exposes a storage implementation term

- Exact quote/location: `README.md:17`, “Stores real schedules in browser IndexedDB.”
- Why this fails: “IndexedDB” does not help a non-technical visitor understand the privacy result.
- Concrete rewrite: “Stores real schedules in this browser.” Put the IndexedDB detail in the development section if maintainers need it.

#### F-1-17 — The README uses internal billing jargon in the product description

- Exact quote/location: `README.md:26`, “Checkout and license verification use the Sociobot billing API.”
- Why this fails: “billing API” names an implementation, not what the user experiences.
- Concrete rewrite: “Sociobot handles checkout and license checks.”

#### F-1-18 — The deployment paragraph is opaque outside the implementation team

- Exact quotes/location: `README.md:56,62`, “CSP-safe 404, billing catalog, and hosted checkout” and “supplies the SPA fallback, security headers, and cache rules.”
- Why this fails: “CSP-safe,” “billing catalog,” and “SPA fallback” are unexplained jargon in a README intended to explain how to deploy.
- Concrete rewrite: “After deployment, run `npm run test:live` to check routing, the product’s payment listing, and checkout.” Then: “Deploy `dist/` to Azure Static Web Apps. The included configuration routes app pages correctly and applies the required browser security and caching settings.”

## Copy audit

Counts use whitespace-delimited words; hyphenated terms, URLs, and inline code each count as one word. Repeated navigation/footer labels are listed once. Sample quote values are data, not sentences. Headings and controls are included because they must also make sense out of context.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Deadline Bridge | 2 | Pass |
| Demo | 1 | Pass |
| Workspace | 1 | Pass |
| Privacy | 1 | Pass |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and balance dates intact | 6 | F-1-15 |
| For event and project businesses whose agreed payment dates disappear when a quote becomes an invoice. | 16 | Pass |
| Try it with sample data | 5 | Pass |
| Opens a complete two-payment schedule. | 5 | F-1-6 |
| Create a blank schedule | 4 | Pass |
| Works offline after the first visit. | 6 | Pass |
| Your schedules stay in this browser. | 6 | Pass |
| One schedule is free. | 4 | Pass |
| The full library costs $24 once. | 6 | Pass |
| The attachment your invoice lacks | 5 | Pass |
| Two dates stay separate | 4 | Pass |
| Attach the exported instructions to any invoice. | 7 | F-1-7 |
| Add both deadlines to your calendar without typing them again. | 10 | Pass; mapped to calendar export |
| How it works | 3 | Pass |
| Move both dates without retyping | 5 | Pass |
| Record the agreement | 3 | Pass |
| Add the deposit, final balance, local times, and exact time zone. | 11 | Pass |
| Export the bridge | 3 | F-1-13 |
| Download one calendar file and two plain payment instructions. | 9 | Pass |
| Review each reminder | 3 | Pass |
| Check the email draft before your own email app opens it. | 11 | Pass |
| Narrow on purpose | 3 | Pass |
| It keeps dates, not money | 5 | Pass |
| No automatic email sending. | 4 | Pass |
| No late fees or local rules added for you. | 9 | Pass |
| License checks never include schedule details. | 6 | Pass |
| One-time license | 2 | Pass |
| Keep every accepted quote | 4 | F-1-14 |
| The free version keeps one current schedule. | 7 | Pass |
| Pay $24 once to save and reopen an unlimited schedule library. | 11 | F-1-5 |
| Buy the full library | 4 | Pass |
| Sociobot and Dodo handle payment and refunds. | 7 | F-1-8 |
| Keep two payment dates attached to one quote. | 8 | Pass |
| Built by Param Factory | 4 | Pass |
| Original generated ceramic artwork. | 4 | Pass; provenance present |
| Terms | 1 | Pass |

No landing sentence exceeds 22 words and no banned marketing adjective appears. All buttons name an action/result. The flagged problems are terminology, metaphor, scope, and claim registration.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and final payment dates intact when a quote becomes an invoice. | 13 | F-1-15 |
| Deposit Deadline Bridge is for event, catering, and project businesses. | 10 | Pass |
| It records two negotiated deadlines with an IANA time zone, rejects nonexistent daylight-saving times, lets you choose either repeated time, then creates one calendar file and two plain payment instructions. | 30 | F-1-11 |
| Every reminder opens as an editable draft before the user chooses to open their email app. | 16 | Claim coverage problem: F-1-4 |
| Live site: https://deposit-deadline-bridge.sociobot.in | 3 | Pass |
| Try the isolated demo | 4 | Pass |
| Open https://deposit-deadline-bridge.sociobot.in/demo or run the site locally and visit `/demo`. | 10 | Pass |
| The sample is quote HT-084 for the Highland Glasshouse Supper. | 10 | Pass |
| Demo changes are held in memory and are not saved to real schedules. | 13 | Claim coverage problem: F-1-3 |
| Select Reset demo to restore the sample. | 7 | Pass |
| What v1 does | 3 | Pass |
| Stores real schedules in browser IndexedDB. | 6 | F-1-16 |
| Keeps the deposit and final balance as separate dated payments. | 10 | Pass |
| Downloads one `.ics` calendar containing both deadlines and both reminder alarms. | 11 | Pass |
| Downloads or copies two payment instructions for an invoice or accounting system. | 12 | Pass |
| Opens editable reminder email drafts only after confirmation. | 8 | Claim coverage problem: F-1-4 |
| Exports and imports a JSON backup. | 6 | Pass |
| Works offline after the first visit. | 6 | Pass |
| Keeps one current schedule for free. | 6 | Pass |
| The $24 one-time license adds an unlimited local schedule library. | 10 | F-1-5 |
| Checkout and license verification use the Sociobot billing API. | 9 | F-1-17 |
| Privacy and scope | 3 | Pass |
| Schedule data stays in the browser. | 6 | Claim coverage problem: F-1-2 |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass |
| A license check sends only the saved license token to `api.sociobot.in`. | 11 | Pass |
| Users choose the locale, currency, time zone, payment wording, and reminder timing. | 12 | Pass |
| The app does not invent late fees or local invoice rules. | 11 | Pass |
| See `/privacy` and `/terms`. | 4 | Pass |
| Develop | 1 | Pass |
| Requirements: Node.js 20 or newer and npm. | 7 | Pass for developer audience |
| Open `http://localhost:5173`. | 2 | Pass |
| The demo entry point is `http://localhost:5173/demo`. | 6 | Pass |
| Test and build | 3 | Pass |
| `npm test` builds and serves the production app, then runs the claim and accessibility checks in Chromium. | 17 | Pass for developer audience |
| The exact production build command is `npm run build`. | 9 | Pass |
| Static output lands in `dist/`, with `dist/index.html` at its root. | 10 | Pass |
| After deployment, run `npm run test:live` to verify the public route, CSP-safe 404, billing catalog, and hosted checkout. | 18 | F-1-18 |
| Claim definitions and their sandbox steps are in `.factory/claims.json`. | 9 | Pass for developer audience |
| The demo contract is in `.factory/demo.md`. | 6 | Pass |
| Deploy | 1 | Pass |
| Deploy the contents of `dist/` as a static site. | 9 | Pass |
| `staticwebapp.config.json` supplies the SPA fallback, security headers, and cache rules for Azure Static Web Apps. | 15 | F-1-18 |
| The factory owns DNS and billing registration. | 7 | Pass for developer audience |
| License | 1 | Pass |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass |

No banned marketing adjective appears. The only over-cap sentence is F-1-11. Buttons/actions on the landing page use result-naming verbs.

## Demo and sandbox evidence

- One click from the landing CTA opens `/demo` at both widths.
- The first demo screen shows the banner, “Sample quote HT-084,” the product form, and the first populated field. The loaded sample contains Highland Glasshouse Supper, Maya Chen, $2,400 deposit, $5,600 final balance, New York deadlines, payment wording, and reminder lead times.
- **Reset demo** restores “Highland Glasshouse Supper.”
- Manual live isolation test: a real `REAL-17` schedule was saved first. During and after two demo edits, IndexedDB still contained exactly that unchanged real record; leaving via **Start for real** reopened it. No cross-origin request or localStorage key appeared.
- Offline reload passed through the declared claim test using a fresh context and sample data.
- F-1-1 and F-1-3 prevent the demo section from passing despite correct runtime isolation in the manual scenario.

## Claim command results

Each exact command from `.factory/claims.json` was run separately after `git clone file:///work/repo <temporary-directory>` and `npm ci`. The clone remained clean.

| Claim | Result | Time |
| --- | --- | ---: |
| `offline-reload` | PASS | 7 s |
| `local-schedules` | PASS | 9 s |
| `calendar-two-events` | PASS | 7 s |
| `two-payment-export` | PASS | 7 s |
| `copy-payment-instructions` | PASS | 8 s |
| `dst-precision` | PASS | 10 s |
| `confirm-reminder` | PASS | 7 s |
| `private-runtime` | PASS | 9 s |
| `license-private` | PASS | 9 s |
| `no-added-rules` | PASS | 9 s |
| `demo-isolation` | PASS | 8 s |
| `json-backup` | PASS | 8 s |
| `one-free-schedule` | PASS | 14 s |

Passing commands do not close F-1-2 through F-1-5 because their assertions do not cover the full wording of the claims. F-1-6 through F-1-8 are unlisted claims.

## Structure, accessibility, links, and visual identity

- PASS: `/`, `/demo`, `/workspace`, `/privacy`, and `/terms` return 200, set route-specific titles/descriptions/canonicals after rendering, contain one `<h1>` and one `<main>`, and retain the common header/footer.
- PASS: navigation uses History API behavior. Privacy navigation moved focus to its `<h1>`; Back restored `/`, its title, and focus on the home `<h1>`.
- PASS: all discovered links returned 200 after redirects. The checkout endpoint redirected to a live Dodo checkout. `robots.txt`, `sitemap.xml`, favicon, apple-touch icon, and social image returned 200.
- PASS: live axe scans found zero serious or critical violations on every main route at desktop and on the checked 390 px routes. No horizontal overflow or console/page error appeared on the 200 routes.
- PASS: the compressed first-load JavaScript was 15,459 bytes. `npm test` passed 26/26, unit tests passed 3/3, build succeeded, and `npm audit` found zero vulnerabilities.
- PASS: the glacial ceramic art, asymmetric composition, serif/sans pairing, cobalt/porcelain palette, bridge shapes, and restrained motion are product-specific rather than a generic SaaS template. Asset provenance is recorded in `assets/src/hero-ceramic.json`.
- FAIL: the mobile first-screen facts are below the fold (F-1-10), and the production 404 is outside the standard shell (F-1-9).

## History check

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files, so there are no prior finding IDs to retest. The earlier `.factory/handoff.md` and verification reports were read. Their reported claim-command, build, checkout, CSP, 404 status, offline, routing, and accessibility outcomes were independently confirmed where applicable. The earlier handoff did not test persistent demo visibility, full claim assertion coverage, the mandatory 404 shell, or the complete landing-plus-README copy audit; those gaps produced the findings above.

## Missed leverage

No additional AI feature is warranted. The job is deterministic date preservation and export; model inference would add privacy/cost risk without removing a required step. Calendar/text/JSON export and JSON import already cover the obvious local-first leverage. Cross-device sync would conflict with the current local-only privacy promise unless introduced as a separate, explicit opt-in product decision.

## What would make this perfect

Fix F-1-1 through F-1-18, then rerun the entire review from a fresh browser context and clean clone. Perfect means the demo warning remains visible throughout use; privacy/isolation/reminder/paid claims are fully asserted; every live claim is listed; the 404 uses the complete shell and metadata; all three facts fit the 390 px first screen; and the landing/README copy has no length, jargon, metaphor, or terminology flags. Until then, the verdict remains **FAIL**.
