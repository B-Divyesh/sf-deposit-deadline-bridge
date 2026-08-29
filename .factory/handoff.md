# Deposit Deadline Bridge — review 6 handoff

## Result: **FAIL**

Adversarial review 6 was completed against repository revision `504c76dd2e94d95eb8e886c0bf14fee001659835` and the live site on 2026-08-29 UTC. No product code was changed.

The product behavior passes, but `.factory/review-6.md` records one blocking history regression: F-6-1 reopens F-1-12 because `.factory/copy-audit.md` is stale and contains incorrect word counts.

## Verification performed

- Cold live first reads at 390 × 844 and 1440 × 900.
- One-click demo readiness, sticky warning, Reset, real-storage isolation, same-origin request log, and live offline reload.
- All 20 commands from `.factory/claims.json`, each run separately after `npm ci` in clean clone `/tmp/ddb-review6-clean-QyYSxD/repo`.
- `npm run test:unit` (3/3), `npm test` (36/36), `npm run build`, and `npm run test:live` from that clone.
- Live route metadata, 404, internal-link crawl, focus/Back behavior, mobile target sizes, and Playwright axe scans.
- `/opt/fleet/lib/verify-url.sh` on `/`, `/?demo=1`, `/privacy`, and `/terms` with no console or baseline accessibility errors.
- Every earlier review, polish record, and prior handoff was checked against the live site and source/tests.

## Known gap and next step

Regenerate `.factory/copy-audit.md` from current copy and add an automated text/count drift check. The exact mismatches and a correct independent landing/README audit are in `.factory/review-6.md`. No other finding remains.
