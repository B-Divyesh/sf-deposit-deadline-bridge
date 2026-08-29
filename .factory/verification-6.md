# Independent verification 6 — PASS

**Candidate:** `38b1f379388dbc76b011f96cca51e1d6555c3dda`  
**Live URL:** <https://deposit-deadline-bridge.sociobot.in>  
**Verified:** 2026-08-29 (fresh `npm ci` checkout)

## Decision

**PASS.** The production deployment is the candidate build, the narrow job is usable end to end, and no release-blocking defect was found.

## Mandatory first read

Cold live desktop load, before any interaction, said:

> “Keep deposit and final balance dates” — “For event, catering, and project businesses whose agreed payment dates disappear when a quote becomes an invoice.”

It plainly states what it does, who it is for, and presents the visible primary action **Try it with sample data**, with the adjacent outcome “Opens a complete two-payment schedule.” One click opened quote `HT-084` for Maya Chen, with both amounts, dates, `America/New_York`, payment wording, and export controls ready. This passes the plain-words and one-click demo requirements.

## Claims — all exact commands passed

`.factory/claims.json` exists with 20 entries; each id occurs exactly once in `tests/claims.spec.ts`. After `npm ci`, I invoked every listed command separately, in CI mode so each used a fresh production-build demo server. All passed.

| Claim id | Result |
| --- | --- |
| `offline-reload` | PASS |
| `local-schedules` | PASS |
| `demo-ready` | PASS |
| `calendar-two-events` | PASS |
| `two-payment-export` | PASS |
| `copy-payment-instructions` | PASS |
| `dst-precision` | PASS |
| `confirm-reminder` | PASS |
| `private-runtime` | PASS |
| `license-private` | PASS |
| `no-added-rules` | PASS |
| `demo-isolation` | PASS |
| `json-backup` | PASS |
| `schedule-settings` | PASS |
| `one-free-schedule` | PASS |
| `free-core-features` | PASS |
| `license-local-storage` | PASS |
| `data-deletion` | PASS |
| `license-revocation` | PASS |
| `refund-request` | PASS |

The initial uninstalled checkout naturally could not resolve `@playwright/test`; this was resolved by the required `npm ci`. No claim command failed after dependencies were installed.

## Local quality gates

| Check | Result |
| --- | --- |
| `npm run test:unit` | PASS — 3/3 Vitest tests |
| `npm test` | PASS — 37/37 Playwright tests |
| `npm run test:copy-audit` | PASS — 1/1 |
| `npm run build` | PASS — TypeScript check and Vite production build; `dist/` produced |
| `npm audit --audit-level=moderate` | PASS — 0 vulnerabilities |
| Lint | No lint script is defined in `package.json`. |

Bundle output is comfortably within the static-PWA budget: `app-BUBCCOJx.js` is 40,248 B raw / 12,374 B gzip and `index-pdFy1ND3.css` is 18,290 B raw / 4,910 B gzip. No Lighthouse binary is provided in this checkout; the browser, semantic, bundle, and axe checks below were run instead.

## Independent product exercise

- On the live demo, calendar download contained exactly **two `VEVENT` records and two `VALARM` records**.
- Invalid `Moon/Base` time zone produced “Enter a valid named time zone, such as Europe/London.” A final deadline before the deposit produced the explicit ordering error and focused `#balanceDue`; correcting it cleared the error.
- Reminder review opened a dialog, focus was inside it, and Escape returned focus to **Review deposit email**. No reminder was sent.
- In a fresh live browser workspace, I saved a representative schedule (`QA-2026-01`, $1,250 deposit and $3,750 final balance), reloaded, and found the saved fields intact. The flow made no cross-origin request.
- A fresh live controlled service-worker registration was active at `/sw.js` with cache `deadline-bridge-build-1.0.7`. A forced offline reload rendered the demo headline and sample `HT-084`. The dedicated `offline-reload` claim also passed. The live worker has a versioned cache, `skipWaiting`, and `clientsClaim`; the app listens for `updatefound` and gives the reload toast, so the update path is present and cache-safe.

## Live deployment, privacy, and headers

- `npm run test:live` passed: live routes/assets, immutable hashed bundles, worker revalidation, real HTTP 404, billing catalog, $24 hosted Dodo checkout redirect, and invalid-license behavior.
- Fresh-build SHA-256 matched the live response for `index.html`, `sw.js`, `manifest.webmanifest`, `build/app-BUBCCOJx.js`, and `build/index-pdFy1ND3.css`. This proves the live deployment is this candidate build.
- Live request logging across a demo export/validation/reminder flow found **zero cross-origin runtime requests**. No analytics, advertising, or remote fonts appeared. Real local save also made no cross-origin request.
- Headers include a self-only CSP (with only the documented Sociobot API in `connect-src`), `X-Content-Type-Options: nosniff`, strict-origin referrer policy, HSTS, and a restrictive permissions policy. HTML and `sw.js` use `no-cache`; content-hashed JS/CSS use `public, max-age=31536000, immutable`; stable images use one-hour non-immutable caching.
- The sole external product endpoint, license verification, enforces the observed one-client burst allowance: a fresh 40-request concurrent invalid-token probe returned **30 × 200** and **10 × 429**. Every 429 had `Retry-After: 4` and “Too Many Requests! Wait for 4s.” No sign-in is used.

## Accessibility and responsive evidence

`/opt/fleet/lib/verify-url.sh` passed against live home (604 ms) and demo (724 ms): title, `lang=en`, one h1, main landmark, image alt text, labelled buttons, and zero console errors. Evidence is under `.factory/evidence/verification-6/` (ignored local evidence).

Independent Playwright + `@axe-core/playwright` scans found **zero serious or critical issues** on `/`, `/?demo=1`, `/workspace`, `/privacy`, `/terms`, and a real HTTP 404 at both 1440 px and 390×844. Every normal route had one h1 and main landmark, no page/console errors, failed resources, or horizontal overflow. The expected browser console line for loading the deliberately requested HTTP 404 was the only 404-route error. At 390 px, all three landing facts ended by y=764 of the 844 px viewport, and all visible action targets met 44 px. Keyboard Tab reached the displayed skip link; reduced motion computed to near-zero transition/animation duration and `scroll-behavior: auto`.

## Defects by severity

None.

## Scope notes

This is a static local-first PWA, not a library/CLI or backend. Package-consumer, server persistence, and application-server concurrency checks therefore do not apply. The only server-side product interaction is the Sociobot license/checkout API, which was exercised above.
