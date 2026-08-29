# Independent product verification 4 — Deposit Deadline Bridge

## Result: **PASS**

- Candidate commit: `acb5682724c9429fce8e5e13948aee23f3cf412e`
- Live URL: <https://deposit-deadline-bridge.sociobot.in>
- Verified: 2026-08-29 UTC
- Product: local-first offline PWA

Fresh evidence confirms that the live release is the candidate and that it performs the researched job: record independently negotiated deposit and final-balance deadlines, preserve their time zone, then export a calendar and two payment instructions. No release-blocking defect was found.

## Mandatory opening gates

### Claims: PASS (20/20)

`.factory/claims.json` exists. From this clean checkout, after `npm ci`, I ran every exact manifest `test` command separately before other checks. The final Playwright run state was `{"status":"passed","failedTests":[]}`.

| Claim IDs passed |
| --- |
| `offline-reload`, `local-schedules`, `demo-ready`, `calendar-two-events`, `two-payment-export` |
| `copy-payment-instructions`, `dst-precision`, `confirm-reminder`, `private-runtime`, `license-private` |
| `no-added-rules`, `demo-isolation`, `json-backup`, `schedule-settings`, `one-free-schedule` |
| `free-core-features`, `license-local-storage`, `data-deletion`, `license-revocation`, `refund-request` |

The tagged flows prove observable results rather than button presence: two ICS events and alarms, separate instruction sections, clipboard output, DST-gap rejection and repeated-time selection, explicit reminder confirmation, IndexedDB/local-only schedules, demo isolation, backup restore, settings exports, entitlement/revocation behavior, and refund mailto behavior.

### Cold first-read: PASS

A new live browser context showed, in plain words:

- **Does:** “Keep deposit and final balance dates.”
- **For whom:** event, catering, and project businesses whose dates disappear when a quote becomes an invoice.
- **First action:** “Try it with sample data,” with “Opens a complete two-payment schedule.”

One click opened the complete HT-084 / Highland Glasshouse Supper sample and its persistent **Demo — sample data, nothing is saved** banner with **Reset demo** and **Start for real**.

## Clean-checkout and deployment checks

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 61 packages; audit reported 0 vulnerabilities. |
| 20 exact claims commands | PASS; all completed separately. |
| `npm run test:unit` | PASS; 3/3 Vitest tests. |
| `npm test` | PASS; 36/36 Playwright tests. |
| `npm run build` | PASS; type check and Vite build produced `dist/`. |
| `npm run test:live` | PASS; identity, 404, catalog, checkout redirect, and invalid license. |
| Lint | No lint command is exposed by the repository. |

The deployed `index.html`, hashed application JS/CSS, `sw.js`, and manifest matched locally built output byte-for-byte (SHA-256). The live buy link returned HTTP 303, and an invalid license verified as inactive.

## End-to-end, privacy, accessibility, and PWA evidence

- The live sample exported an ICS containing exactly **two** `VEVENT`s and **two** `VALARM`s, labelled Deposit due and Final balance due.
- Reversing the deadlines displayed the specific order error and focused `balanceDue`; correcting it removed the error and restored the complete deadline summary.
- A live request log across cold load and the sample flow contained only same-origin HTML, JS, CSS, and artwork. No analytics, advertising, remote fonts, schedule-data requests, or browser/page errors appeared.
- The response CSP restricts scripts/styles/fonts to self and connections to self plus Sociobot; HSTS, `nosniff`, strict-origin referrer policy, permissions policy, and `frame-ancestors 'none'` are present. The explicit invalid-license endpoint is `no-store`.
- A 40-request concurrent burst to the product license-verification endpoint yielded **30 HTTP 200** then **10 HTTP 429** responses. Every 429 included `Retry-After` (observed values `0` or `4` seconds). Observed single-client burst allowance: **30**. There are no product server endpoints beyond the Sociobot checkout/verification service and no sign-in.
- Live axe scans of `/`, `/demo`, `/workspace`, `/privacy`, `/terms`, and the real 404 had zero serious/critical findings. Each normal route had one h1, one main, `lang=en`, route title, and zero console/page errors. The expected browser resource message for deliberately navigating to the HTTP 404 was not counted as a product console error.
- At 390 × 844, the demo had no horizontal overflow; its calendar action and sticky demo controls stayed visible. The first Tab focused the skip link with a visible 3 px focus outline. Reduced motion reduced transitions to `0.01ms`.
- `/opt/fleet/lib/verify-url.sh` passed: 680 ms load, title/lang/h1/main/alt/button checks, and zero errors.
- The live service worker actively controls the app at `/sw.js`, uses cache `deadline-bridge-build-1.0.7`, completes `registration.update()` without error, and reloaded the HT-084 sample while offline after browser HTTP cache was cleared. The offline screen stated that editing and exports still work.

## Performance and asset budget

The production build is 12,313 B gzip application JavaScript and 4,932 B gzip CSS; the mobile AVIF hero is 11,462 B and no fonts are shipped. These meet the stated static-product budgets. A fresh standalone Lighthouse CLI run could not be completed because its launched Chromium tab crashed in this container; browser-based functional/accessibility and direct asset measurements above completed successfully.

## Defects by severity

No critical, high, medium, or low candidate defects found.

## Applicability

Library/CLI consumer-install testing and backend persistence/concurrency testing do not apply. No AI step is warranted for this deterministic, privacy-sensitive date/export workflow; the brief's useful import/export needs are covered by the existing local calendar, text, and JSON backup flows.
