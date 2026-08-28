# Deposit Deadline Bridge — review 2 handoff

## Result

Completed the independent adversarial review without changing product code. The verdict is **FAIL**: six copy/claims findings remain in [review-2.md](review-2.md), including three unlisted/underspecified visitor claims.

## Verification performed

- Fresh live Chromium contexts at 390 × 844 and 1440 × 900 for the landing; no console/page errors.
- Live `/demo` one-click sample, Reset, sticky demo banner, route/link, 404, metadata, and checkout checks.
- Fresh local clone plus `npm ci`; every one of the 14 commands from `.factory/claims.json` passed separately.
- `npm test` passed (29 tests); `npm run test:unit` passed (3 tests); `npm run build` and `npm run test:live` passed.

## Remaining work

Repair reopened F-1-15 and F-2-1 through F-2-5 in `review-2.md`, then repeat the complete fresh-browser and clean-clone review. Product files were not modified in this review.
