# Independent verification 5 — Deposit Deadline Bridge

**Decision: FAIL**

Verified on 2026-08-29 from clean commit `688261db371c19a48ccedefdcd279ebe4ef6274e` against <https://deposit-deadline-bridge.sociobot.in>. The application is functional and the deployment is the tested candidate, but it misses a required PWA cache-header quality gate (F-5-1). A release needs every definition-of-done item, so this remains a fail.

## First read

Cold desktop load of the live home page gave a clear answer within the first screen:

- **What it does:** “Keep deposit and final balance dates.”
- **For whom:** event, catering, and project businesses whose agreed dates disappear when a quote becomes an invoice.
- **What to click first:** the visible, primary **Try it with sample data** action; its adjacent explanation says it opens a complete two-payment schedule.

The primary action worked in one click. It opened the isolated HT-084 sample with the demo banner, Reset demo, and Start for real controls. This mandatory first-read/demo gate passes.

## Claims: clean checkout and demo entry point

`.factory/claims.json` exists and declares 20 claims. After `npm ci`, I invoked every exact command in its `test` fields separately, using the Playwright demo sandbox. The complete `npm test` rerun then passed all 37 browser tests, including every tagged claim. No claim test failed.

| Claim IDs verified | Result |
| --- | --- |
| `offline-reload`, `local-schedules`, `demo-ready`, `calendar-two-events`, `two-payment-export` | PASS |
| `copy-payment-instructions`, `dst-precision`, `confirm-reminder`, `private-runtime`, `license-private` | PASS |
| `no-added-rules`, `demo-isolation`, `json-backup`, `schedule-settings`, `one-free-schedule` | PASS |
| `free-core-features`, `license-local-storage`, `data-deletion`, `license-revocation`, `refund-request` | PASS |

Those tests cover the realistic sample, two calendar events and alarms, separate instructions, copy/download/backup/restore, DST spring-gap rejection and fall-repeat choice, reminder review before `mailto:`, demo isolation, real IndexedDB persistence, free-versus-licensed limits, license revocation, and refund email behavior.

## Local quality gates

| Check | Fresh result |
| --- | --- |
| `npm ci` | PASS; lockfile installation completed, 0 audit vulnerabilities reported. |
| `npm run test:unit` | PASS; 3/3 Vitest tests. |
| `npm test` | PASS; 37/37 Playwright tests. |
| `npm run build` | PASS; `tsc --noEmit` plus Vite production build produced `dist/`. No separate lint script exists. |
| `npm audit --audit-level=moderate` | PASS; 0 vulnerabilities. |

Built initial JS is 12.37 kB gzip and CSS is 4.91 kB gzip, both comfortably within the static-PWA budgets.

## Live product, accessibility, privacy, and PWA checks

- **Deployment identity:** SHA-256 comparisons for `index.html`, the hashed JS and CSS, `sw.js`, `manifest.webmanifest`, `404.html`, and `404.css` all matched the fresh `dist/` files exactly. The live version is therefore this candidate, not an older deployment.
- **End to end:** The live demo opened, rejected a final balance before the deposit with the visible recovery error, accepted the corrected date, and downloaded `ht-084-deadlines.ics`. The live PWA registered `/sw.js`, used cache `deadline-bridge-build-1.0.7`, and reloaded `/demo` offline with the sample and offline notice intact. The service worker source includes versioned cache cleanup, `skipWaiting`, `clientsClaim`, and an application update toast path.
- **Mobile and keyboard:** At 390×844 the workspace had no horizontal overflow. The persistent demo banner, its reset/real controls, exports, and payment controls remained usable; visual review found no clipping. Tab first reaches Skip to main content, and its live computed focus indicator is a designed `3px` orange outline.
- **Accessibility:** Fresh live axe scans of `/`, `/demo`, `/workspace`, `/privacy`, `/terms`, and an HTTP 404 found zero serious or critical violations. Each route had one `h1`, one `main`, `lang=en`, a route title, and no missing image alt text or unlabeled buttons. Normal routes had no console/page errors. The deliberately requested HTTP 404 generated the expected browser “Failed to load resource: 404” message and is not counted as an application error; its document itself passed axe and has the designed 404 page.
- **Privacy:** During the exercised demo/edit/export/offline flow, Playwright observed only `https://deposit-deadline-bridge.sociobot.in` requests. There are no analytics, ads, or remote-font requests. CSP permits only `self` plus the documented Sociobot license origin in `connect-src`; HSTS, `nosniff`, referrer policy, permissions policy, and `frame-ancestors 'none'` are sent as response headers. The license claim test also proves schedule text is not sent with a token verification request.
- **External service allowance:** A fresh 40-request concurrent invalid-token burst to `https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/verify` observed 30 × HTTP 200 and 10 × HTTP 429, each 429 with `Retry-After: 4`. The observed one-client burst allowance is 30. A subsequent `npm run test:live` passed after the advertised recovery period, including catalog, checkout redirect, and invalid-license behavior. No sign-in is present or required.
- **Factory URL verifier:** `/opt/fleet/lib/verify-url.sh` passed for the live home (757 ms) and `?demo=1` (776 ms): title/lang/main/alt/button checks passed and each had zero console errors.

## Release-blocking finding

### F-5-1 — Hashed PWA assets are not long-lived immutable

**Severity: Major / release blocker**

The PWA contract requires long-lived immutable HTTP caching for hashed assets. Candidate configuration at `public/staticwebapp.config.json:15-16` instead sends `Cache-Control: public, max-age=3600` for both `/assets/*` and `/icons/*`. Fresh production header checks returned that same one-hour, non-immutable policy for:

- `/assets/app-BEGWxURL.js`
- `/assets/index-pdFy1ND3.css`

The hashed filenames make these assets safe to cache for a long immutable lifetime. The one-hour policy does not meet the stated requirement and causes needless revalidation/cache churn outside service-worker control. Set a long immutable policy for content-hashed assets (for example `public, max-age=31536000, immutable`), retain `no-cache` for `sw.js`, then redeploy and recheck the live headers.

## Scope notes

This is a local-first static PWA, so backend persistence/concurrency and consumer package installation are not applicable. The only server-side product interaction is the Sociobot checkout/license service, tested above. No product source code was modified during verification.
