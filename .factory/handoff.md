# Deposit Deadline Bridge — verification 5 handoff

## Result: **FAIL — release blocked**

Independent QA tested commit `688261db371c19a48ccedefdcd279ebe4ef6274e` against <https://deposit-deadline-bridge.sociobot.in> on 2026-08-29. The live artifacts byte-match the candidate and all functional, claim, privacy, accessibility, offline, and billing checks pass. Release is blocked by F-5-1: content-hashed PWA assets are deployed with only `Cache-Control: public, max-age=3600`, not long-lived immutable caching as required.

## Verification summary

- `npm ci`; all 20 exact `.factory/claims.json` commands separately; `npm run test:unit` (3/3); `npm test` (37/37); `npm run build`; and `npm audit --audit-level=moderate` all pass.
- The demo works in one click at `/?demo=1`, is isolated, exports the two deadlines, validates bad dates/DST, and reloads offline after first visit.
- Live browser checks passed on desktop and 390 px mobile. Axe found zero serious/critical issues across home, demo, workspace, Privacy, Terms, and 404. Normal routes had no console/page errors.
- Live request logging found only same-origin requests during the demo. The license endpoint allowed 30 concurrent invalid checks, then correctly returned 429 plus `Retry-After: 4`.
- JS/CSS gzip sizes are 12.37 kB / 4.91 kB. `npm run test:live` passes after rate-limit recovery.

## Required next step

Change the Static Web Apps policy for versioned hashed assets to a long immutable lifetime (for example `public, max-age=31536000, immutable`), keeping `sw.js` as `no-cache`; deploy; then confirm the exact production headers. See [verification-5.md](verification-5.md) for full evidence and the precise finding.

## Run

```bash
npm ci
npm run test:unit
npm test
npm run build
npm run test:live
```

Demo: `http://localhost:5173/?demo=1`.
