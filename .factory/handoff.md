# Deposit Deadline Bridge — polish 3 handoff

## Result

All cumulative review findings are resolved and deployed. The repair changed the remaining absolute paid-library headings, replaced five non-literal labels, added an actionable 14-day refund request route, and removed untestable provider assertions. It also added five missing claims with real browser regressions for free core features, license storage, deletion, revocation, and refund request activation.

The release is live at <https://deposit-deadline-bridge.sociobot.in>. Static deployment `be464466-07a2-44a7-bd28-698f32999f2d` completed successfully from repair revision `cbb17f720f1aa72f609855922021b48074f7ef2f`.

## What changed

- The real one-click demo remains `/?demo=1`; it is isolated in memory, has a sticky “Demo — sample data, nothing is saved” banner, Reset demo, and Start for real.
- The $24 wording now promises multiple schedules, not an absolute storage size.
- Terms now give a 14-day refund request email action and describe the testable inactive-license result. No untestable merchant, provider, or refund-handler claim remains.
- Privacy now uses plain browser language and has tested license storage/deletion behavior.
- The landing preview, export label, legal headings, and 404 heading use literal, task-specific words.
- `.factory/claims.json` now has 20 claims, each with exactly one tagged browser test.

## Verification

- Final clean clone: `/tmp/ddb-polish3-final-ge0w8S` from `cbb17f720f1aa72f609855922021b48074f7ef2f`.
- Clean clone: `npm ci`; all 20 exact claim commands in `.factory/claims.json` passed separately.
- Clean clone: `npm run test:unit` — 3 passed; `npm run build` — passed and wrote `dist/`; `npm audit --audit-level=moderate` — 0 vulnerabilities; `npm test` — 36 passed.
- Accessibility: integrated `@axe-core/playwright` scans passed for `/`, `/demo`, `/privacy`, `/terms`, and an unknown route, with zero serious/critical violations. The route suite also covers keyboard skip-link, heading focus, touch targets, mobile overflow, and sticky demo controls.
- PWA/privacy/offline: claim tests cover service-worker offline reload, real IndexedDB storage without cross-origin schedule leakage, demo isolation, reminder confirmation, no third-party runtime requests, license privacy, and deletion.
- Local URL verifier: `/opt/fleet/lib/verify-url.sh` passed for `/?demo=1` and `/terms`; it reported one h1/main, `lang=en`, zero missing image alts, zero unlabeled buttons, and no console errors.
- Lighthouse on the local demo: performance 94, accessibility 100, LCP 1,368 ms, CLS 0.00, TBT 280 ms. Initial JS is 12,257 bytes gzip; CSS is 4,895 bytes gzip.
- Live: `npm run test:live` passed after deployment. A cold 390 × 844 Chromium review passed the landing, one-click demo/reset/sticky banner, Privacy, Terms/refund mail route, designed HTTP 404, and offline demo reload with no unexpected console errors.

Evidence is under `.factory/evidence/polish-3/` (ignored from source control): `live-review/live-review.json`, `live-review/*.png`, `live-demo/verify.json`, `live-terms/verify.json`, and `lighthouse-local.json`. The full finding matrix is in `.factory/polish-3.md`.

## Run and deploy

```bash
npm ci
npm test
npm run test:unit
npm run build
npm run test:live
```

Deploy `dist/` with the factory static work order. `public/staticwebapp.config.json` supplies the app routes, headers, caching, and real static 404 response.

## Known gaps

None.
