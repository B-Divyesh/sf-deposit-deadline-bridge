# Deposit Deadline Bridge — polish 7 handoff

## Result: PASS

Perfection-loop round 7 closes every finding in `.factory/review-7.md` and preserves every repair from reviews 1–6. Product repair commit `741ec3f27d7c3b842233589b8197caca70afbd08` is pushed to `main`. Azure Static Web Apps deployment `9fa1d816-2ada-441f-9af6-62ceec48e3c3` is live at <https://deposit-deadline-bridge.sociobot.in>.

## What changed

- Added the exact Privacy backup-timing statement to `.factory/claims.json`. `@claim:json-backup` now proves that load, edits, a real save, calendar export, and instruction export create no backup; Download backup creates exactly one; restore still works.
- Added `404-storage-safety` and a real static-404 test. It saves a schedule, seeds both license values, compares IndexedDB and localStorage byte-for-byte on the 404 and after returning to `/workspace`.
- Replaced the Terms slogan with “These terms cover use, the one-time license, refunds, and availability.”
- Raised the focused static-404 skip link to the 44 px target baseline and added the 404 to mobile action-target coverage.
- Updated the catalog line to the 72-character verb-first sentence “Keep deposit and final balance dates intact when quotes become invoices.”
- Released v1.0.8 and restored build-hashed service-worker cache names so installed copies receive this shell cleanly.
- Recorded the complete cumulative finding map in `.factory/polish-7.md`.

## Verification

- Clean clone: `/tmp/ddb-polish7-clean-FGRY4d/repo`; `npm ci` passed with zero vulnerabilities.
- All 21 exact commands in `.factory/claims.json` passed separately. Each claim tag occurs exactly once.
- `npm run test:unit`: 3/3 passed.
- `npm test`: 39/39 passed, including browser integration, keyboard, mobile, Axe, privacy, demo isolation, 404, and offline checks.
- `npm run test:copy-audit`: passed against generated and rendered copy.
- `npm run build`: passed and produced `dist/index.html`.
- Bundle sizes: JavaScript 12.37 kB gzip; CSS 4.91 kB gzip.
- `npm audit --audit-level=moderate`: zero vulnerabilities.
- `npm run test:live`: passed after deployment.
- `/opt/fleet/lib/verify-url.sh`: passed live `/`, `/?demo=1`, `/privacy`, and `/terms` with no console errors.
- Cold production audit: `.factory/evidence/polish-7/live/recheck.json`. All five app routes returned 200; the missing route returned 404; titles, metadata, landmarks, legal links, focus/Back behavior, mobile targets, Axe, demo isolation, offline reload, and deployed/local hashes passed.
- Live screenshots: `.factory/evidence/polish-7/live/mobile-first-screen.png`, `mobile-demo-sticky.png`, `mobile-terms.png`, and `mobile-404-focused.png`.
- Live Lighthouse: `.factory/evidence/polish-7/lighthouse-live.json`; Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.13 s, CLS 0, TBT 50 ms.

## Run and verify

```bash
npm ci
npm run test:unit
npm test
npm run test:copy-audit
npm run build
npm audit --audit-level=moderate
npm run test:live
```

Demo: <https://deposit-deadline-bridge.sociobot.in/?demo=1>.

## Known gaps and next steps

None. No review finding, deferred minor item, stub, or TODO remains.
