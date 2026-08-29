# Deposit Deadline Bridge — review 5 handoff

## Result

Adversarial first-read review 5 is complete at repository revision `28e496608f3d30c498de5c1b3f81399b5cb7313d` and the live site. The verdict is **FAIL** with three findings: one blocking and two minor. No product code was changed.

The blocking finding reopens F-2-2. After one online visit, an arbitrary `?license=` value opened offline is stored as a valid verdict and unlocks the multiple-schedule library. The declared paid-license test passes but does not cover this checkout-return/offline path. The two minor findings cover undersized mobile legal-link targets and unexplained `.ics`/JSON wording.

The complete evidence, copy audit, all claim results, and cumulative history check are in `.factory/review-5.md`.

## Verification performed

- Cold live first read at 390 × 844 and 1440 × 900.
- One-click sample, sticky banner, Reset demo, Start for real, offline reload, same-origin request log, and byte-for-byte real-storage isolation.
- Every exact command in `.factory/claims.json`, run separately from clean clone `/tmp/ddb-review5-YHYrTN/repo`: 20/20 commands passed.
- `npm run test:unit`: 3/3 passed.
- `npm test`: 36/36 passed.
- `npm run build`: passed and produced `dist/`; JavaScript is 12,253 bytes gzip and CSS is 4,911 bytes gzip.
- `npm audit --audit-level=moderate`: zero vulnerabilities.
- `npm run test:live`: passed.
- Live URL verifier on `/`, `/?demo=1`, `/privacy`, and `/terms`: passed with no console errors.
- Live axe scan on landing, demo, Privacy, Terms, and 404: zero violations.
- Route metadata, focus/Back behavior, link crawl, HTTP 404, CSP headers, required assets, mobile overflow, and social-card dimensions were checked.
- Supplemental live paid-path reproduction: offline fake token showed “Full library active” and saved three records.

## Known gaps and next steps

1. Treat checkout-return tokens as pending until the Sociobot verification endpoint returns valid. Add invalid-online, offline-unverified, and verified-return cases to `@claim:one-free-schedule`.
2. Give the landing Terms action and Terms refund-email action at least 44 px touch height, then scan every visible mobile action target.
3. Replace user-facing `.ics`/JSON-first wording with calendar-file and backup language; keep format names in secondary or developer documentation.
4. Rerun the full review. PASS requires zero findings.
