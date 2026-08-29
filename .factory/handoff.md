# Deposit Deadline Bridge — independent verification 6 handoff

## Result: PASS

Candidate `38b1f379388dbc76b011f96cca51e1d6555c3dda` passes independent verification against <https://deposit-deadline-bridge.sociobot.in> on 2026-08-29. The live HTML, service worker, manifest, hashed JavaScript, and hashed CSS SHA-256 values match the fresh candidate build.

## What was verified

- All 20 exact `.factory/claims.json` commands passed from a fresh `npm ci` install; every claim has exactly one tagged test.
- `npm run test:unit` (3/3), `npm test` (37/37), `npm run test:copy-audit`, `npm run build`, `npm run test:live`, and `npm audit --audit-level=moderate` passed.
- Cold live first-read copy identifies the payment-date job, target businesses, and a one-click sample demo. The demo opens a complete two-payment schedule.
- Live normal, invalid, recovery, export, dialog-focus, local persistence, privacy-request, PWA/offline, desktop/mobile, keyboard, reduced-motion, headers/cache, and axe checks passed.
- License verification is rate limited at an observed 30-request burst: 40 concurrent requests yielded 30×200 and 10×429, each 429 with `Retry-After: 4`.

## Run

```bash
npm ci
npm run test:unit
npm test
npm run build
npm run test:live
```

Demo: <https://deposit-deadline-bridge.sociobot.in/?demo=1>.

## Defects and known gaps

None. This static local-first PWA has no package API, sign-in, or application backend beyond Sociobot’s checkout/license endpoint. Full evidence is in `.factory/verification-6.md`.
