# Adversarial first-read review 4

Date: 2026-08-29 UTC  
Live site: <https://deposit-deadline-bridge.sociobot.in>  
Reviewed repository revision: `1941398d97657a43ed5745f64deb4ba886a8b287`

## Verdict: **FAIL**

The product is clear, tryable, private by default, and the declared claims pass. Three minor plain-language heading findings remain. The standard for PASS is zero findings.

## First screen, before scrolling

Fresh Chromium contexts were used at 390 × 844 and 1440 × 900. No prior site storage was present.

| Question | What the first screen says |
| --- | --- |
| What does this do? | It preserves separately agreed deposit and final-balance dates when a quote becomes an invoice. |
| For whom? | Event, catering, and project businesses whose payment dates can disappear during conversion. |
| What should I click first? | **Try it with sample data**. It says that it opens a complete two-payment schedule. |

This gate passes at both widths. At 390 px, the headline, audience sentence, primary action, result note, all three facts, and the blank-schedule action are present before scrolling. The exact first-screen text is “Keep deposit and final balance dates,” “For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice.”, and “Try it with sample data”.

## Findings

### Minor

#### F-4-1 — The payment-preview heading does not name the section

- Exact location/quote: landing payment-preview `<h2>`, “Two dates stay separate”.
- Why this fails: read alone in a heading list, it does not identify that the section is a preview of a payment schedule or say which dates. The nearby “Payment schedule preview” is a styled paragraph, not the section heading.
- Concrete fix: change the heading to **“Payment schedule preview”** and make the existing eyebrow a non-repeated supporting label or remove it.

#### F-4-2 — The How-it-works heading is an outcome slogan, not a section name

- Exact location/quote: landing How-it-works `<h2>`, “Move both dates without retyping”.
- Why this fails: it gives a benefit but does not name the three-step process for a visitor or screen-reader heading list. It is interchangeable with other form-and-export products.
- Concrete fix: change the heading to **“How to record and export payment dates”**. The existing three literal step headings can remain.

#### F-4-3 — The scope heading uses an unexplained pronoun and a slogan construction

- Exact location/quote: landing boundaries `<h2>`, “It keeps dates, not money”.
- Why this fails: “It” has no standalone referent in a heading list, and “not money” is not a precise name for the section’s scope. The section actually explains data, reminders, late fees, local rules, and license checks.
- Concrete fix: change the heading to **“What this app records and does not handle”** and remove the redundant eyebrow “What the app does not do.”

## Copy audit

Counts split trimmed visible copy on whitespace; hyphenated words, URLs, and inline code count as one word. Navigation/footer labels are included once. Sample IDs, dates, and form values are data rather than sentences. No copy is over 22 words and no banned marketing adjective appears. The three heading findings above are flagged even though their word counts pass.

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
| Try it with sample data | 5 | Pass; result-naming action |
| Opens a complete two-payment schedule. | 5 | Pass; `demo-ready` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Your schedules stay in this browser. | 6 | Pass; `local-schedules` |
| One schedule is free. | 4 | Pass; `one-free-schedule` |
| The full library costs $24 once. | 6 | Pass; `one-free-schedule` |
| Create a blank schedule | 4 | Pass; result-naming action |
| Payment schedule preview | 3 | Pass as a label; its adjacent h2 is F-4-1 |
| Two dates stay separate | 4 | F-4-1 |
| Download two plain payment instructions to attach to an invoice. | 10 | Pass; `two-payment-export` |
| Add both deadlines to your calendar without typing them again. | 10 | Pass; `calendar-two-events` |
| How it works | 3 | Pass as a label; its adjacent h2 is F-4-2 |
| Move both dates without retyping | 5 | F-4-2 |
| Record the agreement | 3 | Pass |
| Add the deposit, final balance, local times, and exact time zone. | 11 | Pass |
| Export both payment deadlines | 4 | Pass |
| Download one calendar file and two plain payment instructions. | 9 | Pass; `calendar-two-events`, `two-payment-export` |
| Review each reminder | 3 | Pass |
| Check the email draft before your own email app opens it. | 11 | Pass; `confirm-reminder` |
| What the app does not do | 6 | Pass as a label; conflicts with F-4-3 h2 wording |
| It keeps dates, not money | 5 | F-4-3 |
| No automatic email sending. | 4 | Pass; `confirm-reminder` |
| No late fees or local rules added for you. | 9 | Pass; `no-added-rules` |
| License checks never include schedule details. | 6 | Pass; `license-private` |
| One-time license | 2 | Pass |
| Keep multiple payment schedules | 4 | Pass |
| The free version keeps one current schedule. | 7 | Pass; `one-free-schedule` |
| Pay $24 once to save and reopen multiple schedules in this browser. | 12 | Pass; `one-free-schedule` |
| Buy the full library | 4 | Pass; result-naming action |
| Read refund policy and terms | 5 | Pass; result-naming action |
| Keep two payment dates attached to one quote. | 8 | Pass |
| Terms | 1 | Pass |
| Built by Param Factory | 4 | Pass |
| Original generated ceramic artwork. | 4 | Pass; provenance is recorded in `design.md` |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Deposit Deadline Bridge | 3 | Pass |
| Keep deposit and final balance dates intact when a quote becomes an invoice. | 12 | Pass |
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
| Downloads one `.ics` calendar containing both deadlines and both reminder alarms. | 11 | Pass; `calendar-two-events` |
| Downloads or copies two payment instructions for an invoice or accounting system. | 12 | Pass; export claims |
| Opens editable reminder email drafts only after confirmation. | 8 | Pass; `confirm-reminder` |
| Exports and imports a JSON backup. | 6 | Pass; `json-backup` |
| Works offline after the first visit. | 6 | Pass; `offline-reload` |
| Keeps one current schedule for free. | 6 | Pass; `one-free-schedule` |
| The $24 one-time license lets you save and reopen multiple schedules in this browser. | 14 | Pass; `one-free-schedule` |
| Sociobot opens checkout and verifies a pasted license token. | 9 | Pass; `one-free-schedule` |
| If a license becomes inactive, its schedule library closes. | 9 | Pass; `license-revocation` |
| One free schedule and exports remain available. | 7 | Pass; `license-revocation` |
| Privacy and scope | 3 | Pass |
| Schedule data stays in the browser. | 6 | Pass; `local-schedules` |
| The app has no analytics, advertising scripts, remote fonts, or automatic email sending. | 13 | Pass; `private-runtime`, `confirm-reminder` |
| A license check sends only the saved license token to `api.sociobot.in`. | 11 | Pass; `license-private` |
| The browser stores a restored license token and its latest verification result. | 12 | Pass; `license-local-storage` |
| Remove license clears those values without removing a schedule. | 9 | Pass; `data-deletion` |
| Clearing this site’s browser data clears both. | 8 | Pass; `data-deletion` |
| Choose the locale, currency, and time zone. | 8 | Pass; `schedule-settings` |
| Set your payment wording and reminder timing. | 7 | Pass; `schedule-settings` |
| The app does not invent late fees or local invoice rules. | 11 | Pass; `no-added-rules` |
| See `/privacy` and `/terms`. | 4 | Pass |
| The Terms page includes a 14-day refund request email link. | 10 | Pass; `refund-request` |
| Develop | 1 | Pass |
| Requirements: Node.js 20 or newer and npm. | 6 | Pass for developers |
| Open `http://localhost:5173`. | 2 | Pass for developers |
| The demo entry point is `http://localhost:5173/?demo=1`. | 6 | Pass for developers |
| Test and build | 3 | Pass |
| `npm test` builds and serves the production app, then runs the claim and accessibility checks in Chromium. | 15 | Pass for developers |
| The exact production build command is `npm run build`. | 9 | Pass for developers |
| Static output lands in `dist/`, with `dist/index.html` at its root. | 9 | Pass for developers |
| After deployment, run `npm run test:live` to check routing, the product’s payment listing, and checkout. | 16 | Pass for developers |
| Claim definitions and their sandbox steps are in `.factory/claims.json`. | 9 | Pass for developers |
| The demo contract is in `.factory/demo.md`. | 6 | Pass for developers |
| Deploy | 1 | Pass |
| Deploy the contents of `dist/` to Azure Static Web Apps. | 10 | Pass for developers |
| The included configuration routes app pages correctly and applies browser security and caching settings. | 13 | Pass for developers |
| The factory owns DNS and billing registration. | 7 | Pass for developers |
| License | 1 | Pass |
| MIT. See LICENSE. | 3 | Pass |

Terminology remains consistent: **deposit**, **final balance**, **payment schedule**, **quote number**, **demo**, and **schedule library**. No landing or README claim-like sentence lacks a matching `claims.json` entry where one is needed.

## Demo, privacy, and claims

- The one-click CTA opened `/?demo=1` to a prefilled HT-084 / Highland Glasshouse Supper schedule with Maya Chen, $2,400 deposit, $5,600 final balance, America/New_York, transfer wording, both deadlines, and export controls. This is a real product screen, not a setup screen.
- The live `<aside aria-label="Demo mode">` contained “Demo — sample data, nothing is saved”, **Reset demo**, and **Start for real**. At 390 px, it remained `position: sticky` and visible after scrolling to **Download calendar**. Reset restored the modified project name to “Highland Glasshouse Supper”; fresh demo localStorage was empty.
- Live demo request logging contained only same-origin document, app asset, image, manifest, favicon, icon, offline-page, and service-worker requests. No analytics, advertising, or remote-font request was observed.
- `.factory/claims.json` contains 20 claims. From `/tmp/ddb-review4-no1OZl/repo`, a clean clone made with `npm ci`, each exact `npm test -- --grep @claim:<id>` command passed: `offline-reload`, `local-schedules`, `demo-ready`, `calendar-two-events`, `two-payment-export`, `copy-payment-instructions`, `dst-precision`, `confirm-reminder`, `private-runtime`, `license-private`, `no-added-rules`, `demo-isolation`, `json-backup`, `schedule-settings`, `one-free-schedule`, `free-core-features`, `license-local-storage`, `data-deletion`, `license-revocation`, and `refund-request`.
- `npm test` then passed all 36 tests and `npm run build` produced `dist/` in that clean clone.

## Earlier finding verification

Every prior review, polish file, and handoff was read. The following independently verified live/code status covers each prior finding.

| Earlier id | Status and evidence |
| --- | --- |
| F-1-1 | Fixed: live banner is sticky and includes both controls at mobile export scrolling. |
| F-1-2 | Fixed: `local-schedules` enters real mode, saves unique fields, observes requests, and reads IndexedDB. |
| F-1-3 | Fixed: `demo-isolation` snapshots real browser stores before demo edit/reset. |
| F-1-4 | Fixed: `confirm-reminder` covers both paths, cancel, requests, and explicit editable `mailto:`. |
| F-1-5 | Fixed: all paid-library public copy now says “multiple”; claim exercises three paid schedules. |
| F-1-6 | Fixed: one-click HT-084 readiness is declared and tested. |
| F-1-7 | Fixed: landing promises plain instructions to attach to an invoice, not compatibility with every invoice. |
| F-1-8 | Fixed: untestable provider assertion is absent; Terms supplies a tested 14-day refund-request action and tested revocation behavior. |
| F-1-9 | Fixed: live HTTP 404 has shell, legal links, metadata, favicon, and designed bridge art. |
| F-1-10 | Fixed: all three facts are in the 390 px first viewport. |
| F-1-11 | Fixed: README opening is short plain sentences. |
| F-1-12 | Fixed: repository audit covers landing and README with documented counts and terminology. |
| F-1-13 | Fixed: “Export both payment deadlines” is live. |
| F-1-14 | Fixed: public product object is a payment schedule, not a stored quote document. |
| F-1-15 | Fixed: public copy uses “final balance,” with no `final-balance` compound. |
| F-1-16 | Fixed: README uses browser-language storage wording. |
| F-1-17 | Fixed: checkout/license wording is user-facing and claim-tested. |
| F-1-18 | Fixed: README deployment wording is plain. |
| F-2-1 | Fixed: catering is named on the first screen. |
| F-2-2 | Fixed: Sociobot checkout and pasted license verification are registered and tested. |
| F-2-3 | Fixed: all five settings are split into two sentences and tested in exports. |
| F-2-4 | Fixed: calendar test starts from the landing sample action and proves both existing dates in the ICS. |
| F-2-5 | Fixed: the former “Narrow on purpose” label is gone. |
| F-3-1 | Fixed: free core features are registered and tested in an unlicensed real workspace. |
| F-3-2 | Fixed: documented license storage is registered and tested. |
| F-3-3 | Fixed: license removal and browser-data clearing are registered and tested. |
| F-3-4 | Fixed: preview label is “Payment schedule preview.” |
| F-3-5 | Fixed: Privacy h1 is “How your schedules are stored.” |
| F-3-6 | Fixed: Terms h1 names Deposit Deadline Bridge. |
| F-3-7 | Fixed: 404 h1 is “Page not found.” |
| F-3-8 | Fixed: export label is “Export options.” |

## Structure, routing, and identity

- `/`, `/demo`, `/?demo=1`, `/workspace`, `/privacy`, and `/terms` returned 200 with route-specific titles, one h1, `<main>`, descriptions, canonical URLs, OG/Twitter metadata, favicon, and no page-console errors. An unknown route returned an HTTP 404 with the designed static 404 shell.
- The header, skip link, navigation, and footer are consistent. Privacy and Terms are linked across routes. Internal links returned 200; the explicit refund `mailto:` is valid; the checkout URL returned 303 through Sociobot to a 200 Dodo checkout page.
- In-app navigation updates title and moves focus to the h1; its browser regression covers Back as well. `robots.txt`, `sitemap.xml`, manifest, social image, and favicon were live.
- The ceramic-ledger art, cobalt bridge, asymmetric desktop hero, pale mineral palette, serif/display contrast, and bridge-only settle motion follow `design.md` and are product-specific rather than a generic SaaS template.
- The brief does not imply a necessary AI step. JSON backup import/export, ICS calendar export, and plain payment-instruction export cover the obvious local transfer paths. No decorative AI feature or embedded model key was found.

## What would make this perfect

Resolve F-4-1 through F-4-3 by making those three h2 labels literal and standalone, then add a focused copy regression that asserts the revised headings. Re-run the complete clean-clone claim matrix, `npm test`, build, and live first-read check. At that point there would be no remaining finding.
