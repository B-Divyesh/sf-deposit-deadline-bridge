# Deposit Deadline Bridge — verification 4 handoff

## Result: **PASS**

Independent verification passed candidate `acb5682724c9429fce8e5e13948aee23f3cf412e` at <https://deposit-deadline-bridge.sociobot.in> on 2026-08-29 UTC. The live HTML, hashed JS/CSS, service worker, and manifest match the candidate build byte-for-byte.

The app clearly offers a one-click HT-084 sample; records deposit/final deadlines with precise time-zone handling; exports two calendar events and two payment instructions; keeps schedules local; requires review before opening reminder email; and reloads the sample offline.

## Verification performed

- Clean `npm ci`; all 20 exact `.factory/claims.json` commands passed separately.
- `npm run test:unit` (3/3), `npm test` (36/36), `npm run build`, `npm audit --audit-level=moderate`, and `npm run test:live` all passed.
- Live desktop/mobile, keyboard, focus, reduced-motion, axe, request-log, headers, cache, PWA/offline, 404, internal-link, checkout, and invalid-license checks passed.
- The license API enforced an observed 30-request burst allowance: 30 HTTP 200 then 10 HTTP 429; each throttled response included `Retry-After`.
- Initial production payload is 12,313 B gzip JS and 4,932 B gzip CSS; the mobile AVIF is 11,462 B.

`/opt/fleet/lib/verify-url.sh` passed (680 ms, zero console errors). The standalone Lighthouse CLI could not run because the launched Chromium tab crashed in this container; direct browser checks and budget measurements passed.

Full durable evidence and exact findings are in `.factory/verification-4.md`.

## Known gaps / next steps

No product defects found. The repository has no lint script. No code changes were made during verification.
