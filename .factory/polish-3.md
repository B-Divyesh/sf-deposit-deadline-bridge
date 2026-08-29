# Polish 3 — cumulative review closure

Reviewed candidate: `3ee28a7e921fb0d14730cb0d0e2f079dc3002854`  
Repair source revision: `cbb17f720f1aa72f609855922021b48074f7ef2f`  
Live deployment: `be464466-07a2-44a7-bd28-698f32999f2d`

Shared live evidence: a cold Chromium check at 390 × 844 passed the landing, `/?demo=1`, `/privacy`, `/terms`, and `/polish-three-missing`. Its assertions are in `.factory/evidence/polish-3/live-review/live-review.json`; screenshots are `home-mobile.png`, `demo-mobile-sticky.png`, `terms-mobile.png`, and `404-mobile.png` in that directory. `verify-url.sh` also passed for live demo and Terms in `.factory/evidence/polish-3/live-demo/` and `live-terms/`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the demo banner sticky with Reset demo and Start for real controls. | `demo warning and controls remain visible after mobile export scrolling`; live `/?demo=1`; `demo-mobile-sticky.png`. |
| F-1-2 | Preserved the real-workspace request/IndexedDB privacy regression. | `@claim:local-schedules`; clean clone pass. |
| F-1-3 | Preserved byte-for-byte real-storage isolation through demo edit/reset. | `@claim:demo-isolation`; live demo reset check. |
| F-1-4 | Preserved both reminder confirmations, request recording, cancellation, and explicit `mailto:` coverage. | `@claim:confirm-reminder`; clean clone pass. |
| F-1-5 | Replaced both remaining absolute paid headings with “multiple” schedules. | `@claim:one-free-schedule`; live landing and workspace copy check. |
| F-1-6 | Preserved the one-click `?demo=1` HT-084 sample path. | `@claim:demo-ready`; live `/?demo=1` check. |
| F-1-7 | Kept the bounded promise: plain instructions to attach to an invoice. | `@claim:two-payment-export`; landing copy audit. |
| F-1-8 | Removed untestable provider assertions. Added a 14-day refund request mail link and verified revoked-license behavior. | `@claim:refund-request`, `@claim:license-revocation`; live `/terms` check and `terms-mobile.png`. |
| F-1-9 | Kept the metadata-bearing static 404 shell and changed its heading to the literal result. | `tests/not-found.spec.ts`; live `/polish-three-missing` HTTP 404 check and `404-mobile.png`. |
| F-1-10 | Kept all three facts inside the 390 × 844 first screen. | `mobile landing shows all three plain facts before scrolling`; live `/` check and `home-mobile.png`. |
| F-1-11 | Kept the README opening split into short plain sentences. | `.factory/copy-audit.md`; clean-clone documentation check. |
| F-1-12 | Regenerated the audit with landing, legal, README, counts, claim links, and terminology. | `.factory/copy-audit.md`; `git diff --check`. |
| F-1-13 | Kept “Export both payment deadlines.” | `.factory/copy-audit.md`; browser heading outline scan. |
| F-1-14 | Kept the product object as a payment schedule, not a quote. | `@claim:one-free-schedule`; live landing check. |
| F-1-15 | Kept “final balance” as the sole public term. | `rg -i final-balance` source check; `reviewed labels name the product result instead of using a slogan or metaphor`. |
| F-1-16 | Kept privacy wording in browser language rather than storage-engine jargon. | `.factory/copy-audit.md`; `@claim:local-schedules`. |
| F-1-17 | Kept checkout/license wording in user language. | `@claim:one-free-schedule`; README audit. |
| F-1-18 | Kept the README deployment instructions plain. | `.factory/copy-audit.md`; README review. |
| F-2-1 | Kept event, catering, and project businesses in the first-screen audience sentence. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/` check. |
| F-2-2 | Kept hosted checkout and pasted-license verification tested. | `@claim:one-free-schedule`; `npm run test:live`. |
| F-2-3 | Kept all five user settings in both export regressions. | `@claim:schedule-settings`; clean clone pass. |
| F-2-4 | Kept the one-click two-event calendar result. | `@claim:calendar-two-events`; clean clone pass. |
| F-2-5 | Kept the literal “What the app does not do” heading. | `.factory/copy-audit.md`; axe route suite. |
| F-3-1 | Registered and tested the four unlicensed core features. | `@claim:free-core-features`; live `/workspace` copy check. |
| F-3-2 | Registered and tested the two documented namespaced license-storage values. | `@claim:license-local-storage`; live `/privacy` check. |
| F-3-3 | Registered and tested Remove license plus browser origin-data clearing. | `@claim:data-deletion`; clean clone pass. |
| F-3-4 | Replaced the landing preview slogan with “Payment schedule preview.” | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/` check. |
| F-3-5 | Replaced the Privacy h1 with “How your schedules are stored.” | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/privacy` check. |
| F-3-6 | Replaced the Terms h1 with “Terms for Deposit Deadline Bridge.” | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/terms` check. |
| F-3-7 | Replaced the 404 h1 with “Page not found.” | `tests/not-found.spec.ts`; live 404 check and `404-mobile.png`. |
| F-3-8 | Replaced the export-area decorative label with “Export options.” | `reviewed labels name the product result instead of using a slogan or metaphor`; live demo check. |

## Verification summary

- Fresh clone: `/tmp/ddb-polish3-final-ge0w8S`; `npm ci`, all 20 exact commands from `.factory/claims.json`, `npm run test:unit` (3 passed), `npm run build`, `npm audit --audit-level=moderate`, and `npm test` (36 passed).
- Local PWA checks: `verify-url.sh` passed for `/?demo=1` and `/terms`; mobile sticky-banner screenshot is `.factory/evidence/polish-3/local-demo/mobile-sticky-export.png`.
- Lighthouse local demo: performance 94, accessibility 100, LCP 1,368 ms, CLS 0.00, TBT 280 ms. JSON: `.factory/evidence/polish-3/lighthouse-local.json`.
- Live checks: `npm run test:live`, live `verify-url.sh`, and the cold Chromium review all passed after deployment.
