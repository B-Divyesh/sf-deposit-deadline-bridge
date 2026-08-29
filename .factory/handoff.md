# Deposit Deadline Bridge — review 3 handoff

## Result

Adversarial review 3 is complete. Verdict: **FAIL** with 10 findings: 2 blocking, 3 major, and 5 minor. Product code was not changed.

The blocking findings are reopened F-1-5 (absolute “every schedule” paid-tier headings) and F-1-8 (untested payment/refund/provider claims moved to the legal pages). The remaining findings cover unlisted free-feature, license-storage, and deletion claims plus five non-literal labels/headings.

## Verification performed

- Cold live Chromium at 390 × 844 and 1440 × 900.
- One-click demo population, sticky banner, Reset demo, Start for real, real-storage isolation, same-origin request log, and offline reload.
- All live routes, route metadata, shared shell, Back/focus behavior, discovered links, checkout redirect, and designed HTTP 404.
- Live factory URL verifier and axe scans on landing, demo, Privacy, Terms, and 404.
- Clean clone at `/tmp/ddb-review3-clone-2Hd581` with `npm ci`.
- Every one of the 15 exact `.factory/claims.json` commands run separately: all passed.
- `npm test` (30 passed), `npm run test:unit` (3 passed), `npm run build`, `npm audit --audit-level=moderate`, and `npm run test:live`: all passed.
- Live JS/CSS hashes matched the clean-clone build.

## Artifacts

- Full findings, copy audit, evidence, earlier-finding matrix, and verdict: `.factory/review-3.md`.
- No product source, tests, configuration, or dependencies were modified.

## Work remaining

Address every finding in `.factory/review-3.md`, then rerun the full review from a fresh browser context and clean clone. The review cannot pass while any finding or unlisted claim remains.
