# Deposit Deadline Bridge — review 1 handoff

## Result

Adversarial first-read review 1 is complete with verdict **FAIL**. The full evidence and 18 findings are in [`.factory/review-1.md`](review-1.md).

No product code was changed. This handoff replaces the previous verification handoff so the current factory state reflects the review outcome.

## What was checked

- Cold live visits at 390 × 844 and 1440 × 900 before scrolling.
- One-click demo entry, realistic sample state, reset, real IndexedDB isolation, cross-origin requests, localStorage, and offline reload.
- Every exact `.factory/claims.json` command, separately, from a clean temporary clone.
- Full unit, Playwright, build, audit, and live verification commands.
- Landing and README copy with word counts, jargon, terms, headings, actions, and claim cross-checking.
- All live routes, titles, descriptions, canonicals, headings, History API focus/back behavior, internal/external links, production 404, first-load JS, and axe checks.
- Prior handoff/verification material and the absence of earlier review/polish reports.
- Visual identity and missed AI/import/export/sync leverage.

## Verification results

```text
npm run test:unit  -> 3 passed
npm test           -> 26 passed
npm run build      -> passed; dist/ produced; app JS 12.21 kB gzip locally
npm audit --audit-level=moderate -> 0 vulnerabilities
npm run test:live  -> passed
verify-url.sh      -> title/lang/h1/main/alt/console checks passed
13 claim commands -> all passed separately from a clean clone
live route crawl   -> no dead link
live axe           -> no serious/critical violation on tested routes/viewports
```

## Blocking gaps

1. The demo banner scrolls out of view and is not persistent.
2. The `local-schedules` test never saves a real schedule.
3. The `demo-isolation` test does not assert that real storage is untouched.
4. The reminder test does not intercept sends/navigations or cover both reminders.
5. The paid test proves two saved records, not the advertised “unlimited” library.

Major and minor findings cover unlisted claims, the incomplete production 404 shell, mobile facts below the fold, and copy/terminology problems. See the review for exact quotes and fixes.

## Next step

Repair every finding, deploy the candidate, and rerun the full adversarial checklist from scratch. Do not treat the green test suite alone as acceptance; the current claim assertions are narrower than several public promises.
