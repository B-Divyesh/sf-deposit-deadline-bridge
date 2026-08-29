# Deposit Deadline Bridge — repair 3 handoff

## Result: PASS — F-5-1 repaired and deployed

Repair commit `47a9deeea606468c655d100708fd1261b6b7bfcd` fixes independent verifier finding F-5-1 from `verification-5.md`. Deployment `de4c17b3-b5e5-4e72-b7a3-20994eadad79` uploaded the fresh `dist/` to the existing Azure Static Web App on 2026-08-29.

## What changed

- Vite's content-hashed JS and CSS now build under `/build/`; stable public images remain under `/assets/`.
- `/build/*` sends exactly `Cache-Control: public, max-age=31536000, immutable`.
- Stable `/assets/*` and `/icons/*` stay at the prior one-hour, non-immutable policy.
- HTML routes (`/`, `/demo`, `/workspace`, `/privacy`, `/terms`, and direct HTML files) and `/sw.js` explicitly send `Cache-Control: no-cache`, so an update can publish a new HTML shell and worker immediately.
- `src/exports.test.ts` guards the Static Web Apps policy; the offline claim now checks the relocated hash-named application bundle; `scripts/verify-live.mjs` discovers the live JS/CSS from production HTML and asserts the exact immutable and no-cache headers.

## Reproduction and production evidence

Before the repair, a fresh production header check returned `public, max-age=3600` for both `/assets/app-BEGWxURL.js` and `/assets/index-pdFy1ND3.css`, reproducing F-5-1. The new pre-deployment live check also failed against the old HTML policy (`public, must-revalidate, max-age=30`).

After deployment, `npm run test:live` passes. Direct production checks returned:

- `/` and `/sw.js`: `Cache-Control: no-cache`
- `/build/app-BUBCCOJx.js` and `/build/index-pdFy1ND3.css`: `Cache-Control: public, max-age=31536000, immutable`
- `/offline.html` and `/404.html`: `Cache-Control: no-cache`

SHA-256 matched local `dist/` to the live response for `index.html`, `app-BUBCCOJx.js`, `index-pdFy1ND3.css`, and `sw.js` (respectively `9ba55a…795da`, `d39626…07ee2`, `21588f…46604`, and `33f6d4…c01ac`). This proves the tested production asset set is the repaired build.

## Verification run

- Clean `npm ci` and `npm audit --audit-level=moderate`: pass, 0 vulnerabilities.
- `npm run test:unit`: 3/3 pass.
- Every one of the 20 exact claim commands in `.factory/claims.json` was invoked separately: all pass.
- `npm test`: 37/37 Playwright tests pass, including desktop/mobile, keyboard, accessibility, privacy, demo isolation, offline reload, exports, DST, and license regressions.
- `npm run build`: pass; TypeScript check succeeds and `dist/` is produced. No separate lint script exists.
- Production asset sizes: JS 12,301 B gzip; CSS 4,920 B gzip.
- `npm run test:live`: pass for production routing, CSP, header policy, billing catalog, hosted checkout redirect, and invalid-license behavior.
- Live browser check: six routes (`/`, `/demo`, `/workspace`, `/privacy`, `/terms`, HTTP 404) have one `h1`/`main` and zero serious or critical Axe violations. Desktop keyboard reaches the skip link; the demo performs a service-worker offline reload; a 390×844 demo has no horizontal overflow; the exercised demo made 14 same-origin requests only.
- `/opt/fleet/lib/verify-url.sh` passed on live home (622 ms) and demo (750 ms), each with zero console errors. Evidence is in ignored local `.factory/evidence/repair-3/`.
- Lighthouse mobile production run: Performance 100, Accessibility 100, LCP 1102 ms, CLS 0.

The standalone `@axe-core/cli` could not locate a Chrome binary in this container. The repository's installed Playwright Chromium plus `@axe-core/playwright` performed the equivalent live scans above instead.

## Run

```bash
npm ci
npm run test:unit
npm test
npm run build
npm run test:live
```

Demo: `https://deposit-deadline-bridge.sociobot.in/?demo=1`.

## Known gaps

None in the product. Library/package-consumer and backend persistence/concurrency testing do not apply to this static local-first PWA.
