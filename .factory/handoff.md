# Deposit Deadline Bridge — review 7 handoff

## Result: FAIL

Adversarial review 7 is recorded in `.factory/review-7.md` against repository revision `ea53cab713f217098abad10b7ab074c14be3ec60` and the matching live deployment. Product code was not modified.

## What was done

- Repeated cold first-screen checks at 390 × 844 and 1440 × 900.
- Audited every landing and README copy unit with word counts.
- Exercised the live one-click demo, reset, sticky warning, real-storage isolation, Start for real, request log, and offline reload.
- Ran all 20 exact claim commands separately from fresh clone `/tmp/ddb-review7-clean-vxM2Nq/repo`.
- Re-ran unit, full Playwright, generated-copy, build, dependency-audit, and live-release checks.
- Rechecked every prior finding against the live deployment and current code/tests.
- Crawled links; checked titles, metadata, routes, 404, focus/Back behavior, target sizes, reduced motion, CSP, and live axe results.
- Confirmed the live JavaScript and CSS hashes match the fresh build.

## Verification results

- 20/20 declared claim commands passed.
- `npm run test:unit`: 3/3 passed.
- `npm test`: 37/37 passed.
- `npm run test:copy-audit`: passed.
- `npm run build`: passed; `dist/` produced with 12.37 kB gzip JavaScript.
- `npm audit --audit-level=moderate`: zero vulnerabilities.
- `npm run test:live`: passed.
- Live Playwright axe: zero violations on `/`, `/demo`, `/workspace`, `/privacy`, `/terms`, and the designed 404.
- Live URL verifier: passed on home, demo, Privacy, and Terms.

## Findings left for repair

- F-7-1: unlisted Privacy guarantee that backups are created only on request.
- F-7-2: unlisted 404 guarantee that saved schedules have not changed.
- F-7-3: subjective “clear and fair” Terms slogan.
- F-7-4: focused 404 skip link is 42 px high, below the 44 px baseline.

No earlier finding remains unresolved at its reported location. The exact repair and test requirements are in `.factory/review-7.md`.
