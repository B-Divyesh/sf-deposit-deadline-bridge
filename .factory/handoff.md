# Deposit Deadline Bridge — review 4 handoff

## Result

Completed the independent adversarial review without modifying product code. The result is **FAIL** with three minor copy findings: `F-4-1` through `F-4-3` in `.factory/review-4.md`. Each concerns a landing h2 that should name its section literally.

## Verification

- Cold live Chromium checks at 390 × 844 and 1440 × 900 passed the first-read comprehension gate.
- Live demo checks confirmed the one-click populated sample, sticky isolated-demo warning, reset behavior, and same-origin-only runtime requests.
- All 20 exact declared claim commands passed individually from a clean clone at `/tmp/ddb-review4-no1OZl/repo` after `npm ci`.
- The same clean clone passed `npm test` (36 tests) and `npm run build`, which produced `dist/`.
- Live routing/metadata/link checks covered `/`, demo, workspace, Privacy, Terms, and a real HTTP 404; checkout resolved through Sociobot to a live checkout page.

## Remaining work

Replace the three headings identified in `.factory/review-4.md`, add a small regression for the literal heading text, and repeat the stated verification. No product code was changed during this review.
