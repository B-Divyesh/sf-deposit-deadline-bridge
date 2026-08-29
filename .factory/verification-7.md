# Independent verification 7 — PASS

## Scope and decision

- Candidate commit: `54294c3e25a5b4728d115e544c78465dbba9cda3` (`docs: finalize clean-clone evidence`)
- Live URL: <https://deposit-deadline-bridge.sociobot.in>
- Verified on: 2026-08-29
- Decision: **PASS**. No release-blocking defect was found.

The deployment is the candidate build: fresh local production output and live output had identical SHA-256 values for `index.html` (`b11ff830…`), `sw.js` (`f8b22612…`), `build/app-I8W1Aw1Y.js` (`48f1d873…`), and `build/index-pdFy1ND3.css` (`21588f50…`). The live page references those same hashed assets.

## Mandatory first-read and demo result

Cold-opening the live home page answered the required questions in plain words on its first screen:

- **What:** “Keep deposit and final balance dates.”
- **For whom:** event, catering, and project businesses whose agreed payment dates disappear during quote-to-invoice conversion.
- **First action:** visible “Try it with sample data,” with the immediate outcome “Opens a complete two-payment schedule.”

One click opened `/?demo=1` with the persistent “Demo — sample data, nothing is saved” banner, Reset demo, Start for real, quote `HT-084`, Maya Chen, $2,400 deposit, $5,600 final balance, and `America/New_York`. This passes the first-read and one-click demo gates.

## Claims gate — PASS

`.factory/claims.json` exists. From this clean checkout, after `npm ci`, I invoked every exact `test` field separately before other product testing. All completed successfully against the shipped Playwright production/demo entry point:

| Claim IDs passed |
| --- |
| `offline-reload`, `local-schedules`, `demo-ready`, `calendar-two-events`, `two-payment-export`, `copy-payment-instructions`, `dst-precision` |
| `confirm-reminder`, `private-runtime`, `license-private`, `no-added-rules`, `demo-isolation`, `json-backup`, `404-storage-safety` |
| `schedule-settings`, `one-free-schedule`, `free-core-features`, `license-local-storage`, `data-deletion`, `license-revocation`, `refund-request` |

The full browser suite then completed its 39 tests; no failed-result directory was produced. The tagged flows cover the observable demo, local storage, two calendar events and alarms, separate instruction output/clipboard, DST gap and repeated-time behavior, reminder confirmation, backup/restore, licensing/revocation, and deletion behavior.

No unlisted reliability/privacy/product claim was found in the landing page or README during the copy review. The brief’s core job is covered without adding card processing, debt collection, automatic sending, or local invoice rules.

## Clean checkout and build gates

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 0 dependency vulnerabilities reported |
| `npm run test:unit` | PASS; 3/3 Vitest tests |
| `npm test` | PASS; 39 Playwright tests |
| `npm run test:copy-audit` | PASS; 1/1 test |
| `npm run build` | PASS; `tsc --noEmit` and Vite build produced `dist/` |
| `npm audit --audit-level=moderate` | PASS; 0 vulnerabilities |
| `npm run test:live` | PASS |

Production output is within the static-PWA budgets: application JavaScript is 40.27 kB / **12.37 kB gzip** and CSS is 18.29 kB / **4.91 kB gzip**. The largest hero variant is 101,020 bytes. No repository lint script exists.

## End-to-end and boundary evidence

- The live demo downloaded an ICS with exactly **two `VEVENT` records and two `VALARM` records**, for Deposit and Final balance.
- Its payment-instruction export and copy behavior are independently covered by the declared observable claim tests.
- Changing the final deadline before the deposit displayed the date-order error and focused `#balanceDue`; Reset demo recovered the complete sample.
- Reviewing a deposit reminder opened a labeled modal with a populated editable subject and the text “Your email app opens only after you confirm.” Cancelling kept the app at the demo URL and did not activate mail.
- A fresh real workspace with unique schedule text then verified an invalid license. The only cross-origin request was `GET https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/verify?license=qa-invalid-license-token`; it contained no schedule text or request body and returned the expected inactive-token message.
- No sign-in is present or required, so an Entra tenant integration is not applicable.

## Privacy, headers, caching, and rate allowance

During the complete fresh live demo flow (load, edit, ICS export, instruction export, validation, and cancelled reminder), all recorded browser requests were same-origin. No analytics, advertising, remote font, or third-party request was observed. The explicit license verification above is the only permitted external product call and sends only the license token.

Live response headers were verified:

- HTML: `Cache-Control: no-cache`; hashed JS/CSS: `public, max-age=31536000, immutable`; service worker: `no-cache`.
- CSP is self-only for scripts/styles/fonts, limits `connect-src` to self and `api.sociobot.in`, disallows framing and objects, and had no CSP console error.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS, and a restrictive Permissions Policy are present.

The external product verification endpoint has an enforced single-client burst allowance of **30**: a fresh concurrent 40-request invalid-token probe yielded **30 × HTTP 200** and **10 × HTTP 429**, with `Retry-After: 4` on every 429. Verification responses are `Cache-Control: no-store`. There are no product-owned server endpoints or server-side persistence beyond Sociobot billing/verification.

## Accessibility, responsive, and PWA evidence

- Live Axe scans at desktop across `/`, `/?demo=1`, `/workspace`, `/privacy`, `/terms`, and a real HTTP 404 had **zero serious or critical violations**. Every normal route had one h1, one main landmark, `lang=en`, and a route-specific title.
- Keyboard Tab initially reached “Skip to main content”; its computed visible focus treatment is a `3px` solid kiln-orange outline. Dialog controls remained labeled and usable.
- At 390×844, the demo had no horizontal overflow, no serious/critical Axe finding, no console error, and no exposed undersized control. The native file input is deliberately visually hidden behind its 44px “Restore backup” label.
- With `prefers-reduced-motion: reduce`, computed scroll behavior was `auto` and animation/transition durations were effectively zero (`0.00001s`).
- Normal live routes had no console or page errors. The deliberately requested HTTP 404 returned 404 with its designed page; its expected missing-resource browser report is not counted as an application error.
- The live PWA registered and controlled `/sw.js`. After a first online visit, an offline reload of `/?demo=1` retained HT-084, the demo banner, and the offline status message. A local, non-product-mutating synthetic update of the built worker produced `updatefound`, installed successfully, retained a controller, and displayed “An update is ready. Reload to use it.”

## Findings by severity

| Severity | Findings |
| --- | --- |
| Critical | 0 |
| High | 0 |
| Medium | 0 |
| Low | 0 |

No known gap remains from this verification.
