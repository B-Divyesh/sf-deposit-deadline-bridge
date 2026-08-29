# Adversarial first-read review 3

Date: 2026-08-29 UTC

Live site: <https://deposit-deadline-bridge.sociobot.in>

Repository base reviewed: `3ee28a7e921fb0d14730cb0d0e2f079dc3002854`

## Verdict: **FAIL**

The product is clear on first read, opens a realistic isolated demo in one click, works offline, and passes every declared claim test. It still has 10 findings: 2 blocking, 3 major, and 5 minor. Two earlier paid-tier findings are only half-fixed: “unlimited” became the equally absolute “every schedule,” and the untested payment/refund assertion was moved from the landing page to the legal pages. Additional license-storage, deletion, and free-feature promises are absent from `.factory/claims.json`.

## First screen, before scrolling

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900. No site data existed before either visit.

| Question | 390 px | Desktop |
| --- | --- | --- |
| What does this do? | It keeps a deposit date and final balance date from being lost when a quote becomes an invoice. | Same. |
| For whom? | Event, catering, and project businesses. | Same. |
| What should I click first? | **Try it with sample data**. | Same. |

The exact first-screen copy was “Keep deposit and final balance dates,” “For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice,” and “Try it with sample data.” The adjacent note said “Opens a complete two-payment schedule.” All three plain facts were visible before the 844 px mobile fold; the last ended at y=832. The comprehension gate passes at both widths.

## Findings

### Blocking

#### F-1-5 — The paid tier still makes an absolute library-size claim

- Exact locations/quotes: landing pricing heading, “Keep **every** payment schedule”; workspace license heading, “Keep **every** schedule for $24 once.”
- Verification: `.factory/claims.json` promises only “multiple schedules,” and `@claim:one-free-schedule` proves three paid records. Browser storage is finite.
- Why this fails: review 1 required the absolute “unlimited” promise to become the finite, tested “multiple schedules.” The body copy changed, but both paid headings still promise every schedule. A buyer can reasonably read that as no storage limit. The earlier finding is therefore half-fixed and blocking again under its original ID.
- Concrete fix: use “Keep multiple payment schedules” on the landing page and “Save multiple schedules for $24 once” in the workspace. Keep the finite three-record regression test, or state and test a specific supported limit.

#### F-1-8 — The untested payment/refund assertion was moved to the legal pages

- Exact locations/quotes: `/privacy`, “Sociobot and Dodo process checkout details under their own policies”; `/terms`, “Sociobot and Dodo are the merchant of record and handle payment and refunds”; `/terms`, “A refund or revoked license removes access to paid library features. Your free schedule and data exports remain available.”
- Related landing action: “Read payment and refund terms.” The Terms page does not state refund eligibility, a time limit, or how to request one.
- Verification: no `.factory/claims.json` entry covers merchant-of-record status, refund handling, revocation after refund, or retention of free features. `@claim:one-free-schedule` proves a 303 to a Dodo checkout URL and a mocked valid token only.
- Why this fails: review 1 identified the same unlisted provider/refund assertion. Moving it behind a local link does not make it tested or actionable. A prospective buyer still cannot verify the provider claim or learn the actual refund terms.
- Concrete fix: remove provider/refund assertions that cannot be tested. Publish an owner-controlled refund policy with eligibility, deadline, and a working request route. Register each observable refund/revocation result in `claims.json` and test it end to end; if provider attribution remains, add deployment-safe evidence for that exact role.

### Major

#### F-3-1 — “Core features stay free” is an unlisted claim

- Exact location/quote: `/workspace` license panel, “Core calendar, instructions, reminders, and backups stay free.”
- Why this fails: a buyer can rely on this product-boundary promise, but no claim names or tests all four features in an unlicensed real workspace. Existing export tests use demo mode.
- Concrete fix: add the sentence to `one-free-schedule` or a new `free-core-features` claim. From a clean, unlicensed real workspace, test calendar export, instruction export/copy, reminder review, and JSON backup. Otherwise remove the sentence.

#### F-3-2 — License storage location is an unlisted claim

- Exact locations/quotes: `/privacy`, “If you buy or restore a license, the license token and its latest verdict are stored in localStorage”; paid workspace, “Your license is on this device.”
- Why this fails: `license-private` checks the outgoing verification URL, not where the token and verdict are stored. `one-free-schedule` also does not assert the stored values.
- Concrete fix: add a `license-local-storage` claim and test that verification writes only the documented namespaced token/verdict values to browser storage and no other origin.

#### F-3-3 — The stated deletion paths are unlisted claims

- Exact location/quotes: `/privacy`, “Clear this site’s browser data to remove schedules and the license token. You can also remove the license inside the workspace.”
- Why this fails: these are operational privacy instructions a visitor may rely on. No declared claim checks either deletion path, and the paid test never selects **Remove license**.
- Concrete fix: add a `data-deletion` claim. Seed a real schedule and license, verify **Remove license** deletes the license values without deleting the schedule, then clear origin data and verify both IndexedDB and localStorage are empty.

### Minor

#### F-3-4 — The landing preview uses a slogan instead of a section label

- Exact location/quote: landing preview eyebrow, “The attachment your invoice lacks.”
- Why this fails: it does not name the section and reads as marketing copy. It carries less information than the preview itself.
- Concrete rewrite: “Payment schedule preview.”

#### F-3-5 — The Privacy h1 is vague out of context

- Exact location/quote: `/privacy` h1, “Your schedules stay with you.”
- Why this fails: “with you” does not say whether data is in this browser, an account, or a server, and the heading does not name the page.
- Concrete rewrite: “How your schedules are stored.”

#### F-3-6 — The Terms h1 uses the product metaphor

- Exact location/quote: `/terms` h1, “Terms for using the bridge.”
- Why this fails: a screen-reader heading list does not identify the product, and “bridge” is metaphorical shorthand.
- Concrete rewrite: “Terms for Deposit Deadline Bridge.”

#### F-3-7 — The 404 h1 is a metaphor rather than the result

- Exact location/quote: unknown-route h1, “This bridge ends here.”
- Why this fails: out of context it does not say that the page was not found. The product-specific ceramic artwork can remain without making the required heading figurative.
- Concrete rewrite: “Page not found.”

#### F-3-8 — The export area has a decorative label

- Exact location/quote: demo/workspace export eyebrow, “Ready for the next tool.”
- Why this fails: it does not name an action, output, or section and could appear unchanged in another product.
- Concrete rewrite: “Export options.”

## Copy audit

Counts split on whitespace. Hyphenated terms, URLs, and inline code count as one word. Repeated navigation/footer labels appear once. Sample values and form field labels are data rather than sentences. Headings and controls are included because they must make sense independently.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Deadline Bridge | 2 | Pass |
| Demo | 1 | Pass |
| Workspace | 1 | Pass |
| Privacy | 1 | Pass |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and final balance dates | 6 | Pass |
| For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice. | 18 | Pass |
| Try it with sample data | 5 | Pass |
| Opens a complete two-payment schedule. | 5 | Pass |
| Works offline after the first visit. | 6 | Pass |
| Your schedules stay in this browser. | 6 | Pass |
| One schedule is free. | 4 | Pass |
| The full library costs $24 once. | 6 | Pass |
| Create a blank schedule | 4 | Pass |
| The attachment your invoice lacks | 5 | F-3-4 |
| Two dates stay separate | 4 | Pass |
| Download two plain payment instructions to attach to an invoice. | 10 | Pass |
| Add both deadlines to your calendar without typing them again. | 10 | Pass |
| How it works | 3 | Pass |
| Move both dates without retyping | 5 | Pass |
| Record the agreement | 3 | Pass |
| Add the deposit, final balance, local times, and exact time zone. | 11 | Pass |
| Export both payment deadlines | 4 | Pass |
| Download one calendar file and two plain payment instructions. | 9 | Pass |
| Review each reminder | 3 | Pass |
| Check the email draft before your own email app opens it. | 11 | Pass |
| What the app does not do | 6 | Pass |
| It keeps dates, not money | 5 | Pass |
| No automatic email sending. | 4 | Pass |
| No late fees or local rules added for you. | 9 | Pass |
| License checks never include schedule details. | 6 | Pass |
| One-time license | 2 | Pass |
| Keep every payment schedule | 4 | F-1-5 |
| The free version keeps one current schedule. | 7 | Pass |
| Pay $24 once to save and reopen multiple schedules in this browser. | 12 | Pass |
| Buy the full library | 4 | Pass |
| Read payment and refund terms | 5 | Pass as an action label; linked content fails F-1-8 |
| Keep two payment dates attached to one quote. | 8 | Pass |
| Built by Param Factory | 4 | Pass |
| Original generated ceramic artwork. | 4 | Pass; provenance is recorded |
| Terms | 1 | Pass |

No landing sentence exceeds 22 words or uses a banned marketing adjective. All buttons/actions use result-naming verbs. The two flags are the absolute paid-tier heading and the slogan-like preview label.

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and final balance dates intact when a quote becomes an invoice. | 12 | Pass |
| Deposit Deadline Bridge is for event, catering, and project businesses. | 10 | Pass |
| Record the deposit and final balance in a named time zone. | 11 | Pass |
| The app catches missing clock times and lets you choose when a clock time repeats. | 15 | Pass |
| Then export one calendar file and two payment instructions. | 9 | Pass |
| Every reminder opens as an editable draft before your email app opens. | 12 | Pass |
| Live site: https://deposit-deadline-bridge.sociobot.in | 3 | Pass |
| Try the isolated demo | 4 | Pass |
| Open https://deposit-deadline-bridge.sociobot.in/?demo=1 or run the site locally and visit `/?demo=1`. | 10 | Pass |
| The sample is quote HT-084 for the Highland Glasshouse Supper. | 10 | Pass |
| Demo changes are held in memory and are not saved to real schedules. | 13 | Pass |
| Select Reset demo to restore the sample. | 7 | Pass |
| What v1 does | 3 | Pass |
| Stores real schedules in this browser. | 6 | Pass |
| Keeps the deposit and final balance as separate dated payments. | 10 | Pass |
| Downloads one `.ics` calendar containing both deadlines and both reminder alarms. | 11 | Pass |
| Downloads or copies two payment instructions for an invoice or accounting system. | 12 | Pass |
| Opens editable reminder email drafts only after confirmation. | 8 | Pass |
| Exports and imports a JSON backup. | 6 | Pass |
| Works offline after the first visit. | 6 | Pass |
| Keeps one current schedule for free. | 6 | Pass |
| The $24 one-time license lets you save and reopen multiple schedules in this browser. | 14 | Pass |
| Sociobot opens checkout and verifies a pasted license token. | 9 | Pass |
| Privacy and scope | 3 | Pass |
| Schedule data stays in the browser. | 6 | Pass |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass |
| A license check sends only the saved license token to `api.sociobot.in`. | 11 | Pass |
| Choose the locale, currency, and time zone. | 8 | Pass |
| Set your payment wording and reminder timing. | 7 | Pass |
| The app does not invent late fees or local invoice rules. | 11 | Pass |
| See `/privacy` and `/terms`. | 4 | Pass |
| Develop | 1 | Pass |
| Requirements: Node.js 20 or newer and npm. | 7 | Pass for developers |
| Open `http://localhost:5173`. | 2 | Pass |
| The demo entry point is `http://localhost:5173/?demo=1`. | 6 | Pass |
| Test and build | 3 | Pass |
| `npm test` builds and serves the production app, then runs the claim and accessibility checks in Chromium. | 17 | Pass for developers |
| The exact production build command is `npm run build`. | 9 | Pass |
| Static output lands in `dist/`, with `dist/index.html` at its root. | 10 | Pass |
| After deployment, run `npm run test:live` to check routing, the product’s payment listing, and checkout. | 15 | Pass for developers |
| Claim definitions and their sandbox steps are in `.factory/claims.json`. | 9 | Pass |
| The demo contract is in `.factory/demo.md`. | 6 | Pass |
| Deploy | 1 | Pass |
| Deploy the contents of `dist/` to Azure Static Web Apps. | 10 | Pass for developers |
| The included configuration routes app pages correctly and applies browser security and caching settings. | 13 | Pass for developers |
| The factory owns DNS and billing registration. | 7 | Pass for developers |
| License | 1 | Pass |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass |

No README sentence exceeds 22 words, uses a banned marketing adjective, changes the “final balance” term, or lacks an existing claim mapping when it describes product behavior.

## Demo and sandbox behavior

- One click on the landing action opened `/?demo=1`, titled “Demo — Deposit Deadline Bridge.”
- The first rendered demo already showed quote HT-084, Highland Glasshouse Supper, Maya Chen, $2,400 deposit, $5,600 final balance, `America/New_York`, bank-transfer wording, and all export controls.
- The sticky banner read “Demo — sample data, nothing is saved” and retained **Reset demo** and **Start for real** at y=0 after scrolling to the export controls on a 390 px viewport.
- **Reset demo** restored “Highland Glasshouse Supper” after an edit.
- A real `LIVE-REVIEW-3` schedule was saved first. The IndexedDB and localStorage snapshots were byte-for-byte unchanged after editing and resetting the demo. Returning through **Start for real** restored the real schedule.
- The full demo edit/reset flow made no cross-origin request. A fresh `/demo` load was then reloaded offline with HT-084 usable and the offline notice visible; all observed requests were same-origin.

The demo gate passes.

## Declared claims

A clean clone was created at `/tmp/ddb-review3-clone-2Hd581`, followed by `npm ci`. Every exact `test` command in `.factory/claims.json` was then run separately.

| Claim ID | Result | Observable evidence |
| --- | --- | --- |
| `offline-reload` | PASS | Sample remained usable after service-worker control, offline mode, and reload. |
| `local-schedules` | PASS | Real schedule persisted in IndexedDB and unique fields appeared in no cross-origin request. |
| `demo-ready` | PASS | One landing click opened the complete HT-084 sample and export controls. |
| `calendar-two-events` | PASS | ICS contained exactly two events, two alarms, and both populated dates. |
| `two-payment-export` | PASS | Text export contained separate deposit/final-balance sections, values, and time zone. |
| `copy-payment-instructions` | PASS | Clipboard received both payment sections. |
| `dst-precision` | PASS | Spring gap was rejected; selected second fall occurrence exported as `20261101T063000Z`. |
| `confirm-reminder` | PASS | Both reminder paths produced no request before confirmation; explicit action produced only the expected `mailto:` draft. |
| `private-runtime` | PASS | Demo edit/export produced no third-party request or remote font. |
| `license-private` | PASS | Mocked check sent only the pasted token in the expected Sociobot URL. |
| `no-added-rules` | PASS | User wording remained and no late-fee text was introduced. |
| `demo-isolation` | PASS | Real IndexedDB/localStorage snapshots remained unchanged through demo edit/reset. |
| `json-backup` | PASS | Exported JSON was modified and imported into the demo. |
| `schedule-settings` | PASS | Locale, currency, zone, wording, and both reminder timings appeared in exports. |
| `one-free-schedule` | PASS | One free record, $24 checkout URL, mocked license, and three-record paid library passed. |

No listed claim failed. F-1-8 and F-3-1 through F-3-3 are unlisted claims, so the claims gate still fails.

## Earlier-review history

Every prior `review-*.md`, `polish-*.md`, verification record, and handoff was read. The live JavaScript and CSS names and SHA-256 hashes match the clean-clone build, so the live checks apply to the current source.

| Earlier finding | Current verification |
| --- | --- |
| F-1-1 | Fixed: demo banner and both controls remain sticky at mobile export controls. |
| F-1-2 | Fixed: test enters real mode, observes requests, saves, and reads IndexedDB. |
| F-1-3 | Fixed: test snapshots real IndexedDB/localStorage through demo edit/reset. |
| F-1-4 | Fixed: both reminder paths, cancellation, requests, and explicit `mailto:` are tested. |
| F-1-5 | **Half-fixed and blocking:** “unlimited” left body copy, but “every schedule” remains in two paid headings. |
| F-1-6 | Fixed: one-click HT-084 readiness is declared and tested. |
| F-1-7 | Fixed: landing now promises plain instructions for an invoice, not compatibility with any invoice. |
| F-1-8 | **Half-fixed and blocking:** the provider/refund assertion remains on Privacy/Terms without a claim or test. |
| F-1-9 | Fixed: the HTTP 404 has the shared shell, metadata, legal links, favicon, and product styling. |
| F-1-10 | Fixed: all three facts fit within 390 × 844. |
| F-1-11 | Fixed: README opening is split into short sentences. |
| F-1-12 | Fixed: repository audit covers landing/README with a tokenizer and terminology table; this review repeated it independently. |
| F-1-13 | Fixed: “Export both payment deadlines.” |
| F-1-14 | Fixed for terminology: the product now says “payment schedule,” not “accepted quote.” F-1-5 separately covers its absolute quantifier. |
| F-1-15 | Fixed: public copy consistently uses “final balance.” |
| F-1-16 | Fixed: README uses “this browser,” not IndexedDB jargon. |
| F-1-17 | Fixed: README wording states the user-visible Sociobot checkout/license result and maps it to a test. |
| F-1-18 | Fixed: README deployment wording is plain. |
| F-2-1 | Fixed: catering businesses are named in the first screen. |
| F-2-2 | Fixed: Sociobot checkout and pasted-license behavior is included in `one-free-schedule`. |
| F-2-3 | Fixed: settings copy is split and all five settings are declared/tested. |
| F-2-4 | Fixed: the calendar claim/test starts at the landing action and proves both populated dates. |
| F-2-5 | Fixed: “What the app does not do.” |

## Structure, accessibility, and visual identity

- `/`, `/demo`, `/workspace`, `/privacy`, and `/terms` returned 200. An unknown route returned a designed HTTP 404. Each route had `lang=en`, one h1, one main, a description, canonical, OG image/title, favicon, shared header/footer, skip link, Privacy, and Terms.
- Route titles followed the product/route pattern. Privacy navigation focused its h1; browser Back returned to `/` and focused its h1.
- Every discovered same-origin navigation link returned 200 except the current unknown 404 document’s own fragment URL. The checkout link returned a live 303 to `checkout.dodopayments.com`.
- The live URL verifier reported one h1/main, no missing alt text, no unlabeled buttons, and no console errors. Live axe scans found zero violations on `/`, `/demo`, `/privacy`, `/terms`, and the missing route.
- Mobile had no horizontal overflow; the tested navigation/footer targets met 44 px. Focus treatment and reduced-motion rules are present. No console/page/resource error occurred on cold mobile or desktop loads.
- The clean build produced 12.30 kB gzip JavaScript and 4.90 kB gzip CSS, below the product budget.
- The ceramic still life, porcelain/cobalt palette, paired milestone shapes, asymmetrical desktop hero, serif/system pairing, and restrained motion match `.factory/design.md`. The result is recognisable and not a generic SaaS card/gradient template.

Structure passes except for the plain-language heading findings F-3-5 through F-3-8.

## Repository quality gates

From the clean clone:

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 61 packages, 0 vulnerabilities |
| 15 exact claim commands | PASS; 15/15 |
| `npm test` | PASS; 30/30 |
| `npm run test:unit` | PASS; 3/3 |
| `npm run build` | PASS; `dist/` produced |
| `npm audit --audit-level=moderate` | PASS; 0 vulnerabilities |
| `npm run test:live` | PASS |

## Missed leverage

No AI feature is warranted. The core work is deterministic local date handling, and model inference would add privacy, cost, and failure modes without removing a required decision. Calendar export, instruction download/copy, and JSON import/export cover the obvious leverage. Cloud sync would conflict with the current browser-local promise unless introduced as a separate explicit opt-in product decision.

## What would make this perfect

Resolve F-1-5 and F-1-8 without moving the wording again: use finite paid-library language and publish a concrete, testable refund policy. Register and test the free-feature, license-storage, and deletion promises. Replace the five decorative or metaphorical labels with literal section/page names. Then repeat the entire cold mobile/desktop, demo-isolation, claim, route, link, accessibility, and history review. A perfect result has zero findings and no visitor-facing sentence outside the claims manifest.
