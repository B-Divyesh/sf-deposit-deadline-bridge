# Deposit Deadline Bridge — polish 2 handoff

## Result

All cumulative findings in `review-1.md` and `review-2.md` are repaired in `944c63955666ca6c90ccaa05d75e11c93dcb81fe`. The product retains its glacial-ceramic visual system and PWA/local-first deployment class. The first-screen demo action is now the isolated `?demo=1` path, with the sticky banner, Reset demo, and Start for real controls. This handoff and the finding map are committed separately after the repair.

## How to run and verify

```bash
npm ci
npm run dev
# open http://localhost:5173/?demo=1
npm run test:unit
npm test
npm run build
```

`dist/` is the static deployment output. All claim definitions and their exact runnable commands are in `.factory/claims.json`.

## Evidence

- Fresh clone `/tmp/deadline-clean-QsNdmA`: `npm ci`, every one of the 15 declared claim commands passed individually; Playwright's final result was `{"status":"passed","failedTests":[]}`.
- Fresh clone: `npm run test:unit` passed (3 tests); `npm test` passed (30 Playwright tests, including routes, mobile, offline, privacy, keyboard, and axe checks); `npm run build` passed; `npm audit --audit-level=moderate` found 0 vulnerabilities.
- Production output: app JavaScript is 12.30 kB gzip and CSS is 4.90 kB gzip.
- Local `verify-url.sh` evidence is at `.factory/evidence/polish-2/query-demo/`: direct `?demo=1` has the Demo title, `lang=en`, one h1/main, no missing alts or unlabeled buttons, and no console errors.
- The browser suite uses the pinned `@axe-core/playwright` integration on the landing, demo, legal, and missing-route pages with no serious/critical violations. The standalone axe CLI was incompatible with the supplied browser/ChromeDriver pair; see `polish-2.md`.
- Deployment: `/opt/fleet/lib/deploy-static.sh deposit-deadline-bridge dist` completed Azure Static Web Apps deployment `eeead0eb-54d7-44b3-9bb7-a20cb62fb281`.
- Cold live verification: `npm run test:live` passed after deploy. `https://deposit-deadline-bridge.sociobot.in/?demo=1` loaded HT-084 with the Demo title, sticky banner at the export controls, and a working Reset demo. `/`, `/privacy`, `/terms`, and an unknown route had the expected title, one h1/main, common header/footer, and the unknown route returned HTTP 404. Live URL-verifier screenshots/report are in `.factory/evidence/polish-2/live-query-demo/`.
- Final deployment: `/opt/fleet/lib/deploy-static.sh deposit-deadline-bridge dist` completed Azure Static Web Apps deployment `be477701-a44d-4f57-87e1-318359495f6e`. `npm run test:live` passed. A cold 390 px browser rechecked the direct demo, sticky banner/reset, first-screen catering and final balance wording, legal routes, and shared HTTP 404 shell. Final live screenshots and URL report are in `.factory/evidence/polish-2/live-query-demo-round2/`.

## Known gaps

None.
