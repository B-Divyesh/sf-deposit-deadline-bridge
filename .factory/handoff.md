# Deposit Deadline Bridge — polish 1 handoff

## Result

All 18 findings in [review 1](review-1.md) are repaired. The repair is commit `fe46fef5d2cfc4df1589a3ce7a713d8f15ecbaf7`, pushed to `main` and deployed to <https://deposit-deadline-bridge.sociobot.in> through Azure Static Web Apps (`sf-deposit-deadline-bridge`, production).

[Polish evidence](polish-1.md) maps every finding to its change and proof. Live mobile captures are `.factory/evidence/live-landing-mobile.png` and `.factory/evidence/live-demo-mobile.png` (ignored generated evidence files).

## What changed

- Kept the ceramic-ledger visual identity while making the mobile first screen fit its headline, CTA, result note, and all three facts.
- Made `/demo` a visibly persistent sticky sandbox warning; retained reset/real controls while the user scrolls.
- Added `demo-ready` and strengthened real-storage, isolation, confirmation, and paid-library claim tests.
- Removed untestable absolute/third-party copy, standardized **final balance**, and rewrote README/deployment copy in plain language.
- Completed the static 404 shell and metadata; SPA routes now update social metadata as well as title, description, canonical, focus, and announcement.
- Added the required catalog description, corrected copy audit, claims contract, and versioned build id (`v1.0.3`).

## Verification

```text
npm run test:unit                         3 passed
npm test -- --workers=4 --reporter=line   29 passed
npm run build                             passed; dist/ produced
npm audit --audit-level=moderate          0 vulnerabilities
clean clone: npm ci + 14 claim commands   all passed separately
npm run test:live                         passed after production deploy
```

The browser suite includes axe serious/critical checks on `/`, `/demo`, `/privacy`, `/terms`, and a missing route; keyboard/focus, mobile overflow, first-screen facts, sticky demo controls, offline reload, static-404 CSP, and privacy/network behavior. The production build is 12.24 kB gzip JavaScript and 4.90 kB gzip CSS.

Cold live checks confirmed the production HTML contains the repaired final-balance metadata and build asset, `/demo` shows the sample banner, and an unknown URL returns the styled 404 shell with legal links and metadata.

## Known gaps

None.
