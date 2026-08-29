# Polish 5 — cumulative zero-finding repair

Reviewed candidate: `28e496608f3d30c498de5c1b3f81399b5cb7313d`  
Review: `a8d3f440c4273e99317098daac958b0c6bbbe26c`  
Repair commit: `af0ac3740244676ca90243538abd273068393768`  
Deployment: `80332660-24b7-4e5e-9a47-bde5c844ad3f`  
Live site: <https://deposit-deadline-bridge.sociobot.in>

## Evidence key

- **Clean claims**: all 20 exact commands in `.factory/claims.json`, each run separately after `npm ci` in fresh clone `/tmp/ddb-polish5-clean-jW6KrQ/repo`.
- **Full local**: `npm run test:unit` (3/3), `npm test` (36/36), `npm run build`, and `npm audit --audit-level=moderate` all passed.
- **Live baseline**: `/opt/fleet/lib/verify-url.sh` passed for `/`, `/?demo=1`, `/privacy`, and `/terms`; screenshots and reports are under ignored local evidence path `.factory/evidence/polish-5/`.
- **Live browser review**: cold 390 px checks passed first-screen facts, every visible action target, one-click HT-084, sticky demo banner, offline fake-return lockout, 404, routing/meta/link crawl, and zero online console errors.
- **Live axe**: Playwright axe found zero violations (including serious/critical) on `/`, `/?demo=1`, `/privacy`, `/terms`, and `/polish-five-missing`.

## Cumulative finding map

| Finding | Change made or retained | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the opaque sticky demo banner with Reset demo and Start for real. | `demo warning and controls remain visible after mobile export scrolling`; live `/?demo=1`; `.factory/evidence/polish-5/live-demo/mobile-sticky.png`. |
| F-1-2 | Kept real-mode IndexedDB saving and complete outgoing-request inspection. | `@claim:local-schedules`; Clean claims; live `/workspace`. |
| F-1-3 | Kept demo-only memory state and byte-for-byte real-store/localStorage isolation. | `@claim:demo-isolation`; Clean claims; live `/?demo=1`. |
| F-1-4 | Kept both reminder paths gated by review; only explicit confirmation activates `mailto:`. | `@claim:confirm-reminder`; Clean claims; live `/?demo=1`. |
| F-1-5 | Kept the finite “multiple schedules” promise and three-record paid proof. | `@claim:one-free-schedule`; Clean claims; live `/workspace`. |
| F-1-6 | Kept the one-click `?demo=1` HT-084 sample with export actions. | `@claim:demo-ready`; live `/?demo=1`; `.factory/evidence/polish-5/live-demo/screenshot-mobile.png`. |
| F-1-7 | Kept the bounded promise of two plain instructions, not universal invoice compatibility. | `@claim:two-payment-export`; Clean claims; live `/`. |
| F-1-8 | Kept untestable payment-provider copy removed; retained tested refund and revocation paths. | `@claim:refund-request`, `@claim:license-revocation`; live `/terms`. |
| F-1-9 | Kept the shared, metadata-bearing static HTTP 404 with product-specific broken bridge. | `tests/not-found.spec.ts`; live `/polish-five-missing` HTTP 404; `.factory/evidence/polish-5/live-404-mobile.png`. |
| F-1-10 | Kept all three facts in the cold 390 × 844 first screen. | `mobile landing shows all three plain facts before scrolling`; live `/`; `.factory/evidence/polish-5/live-home/mobile.png`. |
| F-1-11 | Kept the README opening split into short plain sentences. | `.factory/copy-audit.md`; Clean claims documentation review. |
| F-1-12 | Kept the complete, corrected landing/legal/README/catalog audit and terminology table. | `.factory/copy-audit.md`; `git diff --check`. |
| F-1-13 | Kept “Export both payment deadlines.” | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/`. |
| F-1-14 | Kept the paid object named as a payment schedule, not a quote. | `@claim:one-free-schedule`; live `/`. |
| F-1-15 | Kept “final balance” as the sole public term for payment two. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/`. |
| F-1-16 | Kept browser-language storage wording. | `.factory/copy-audit.md`; `@claim:local-schedules`. |
| F-1-17 | Kept checkout and verification copy in user language. | `.factory/copy-audit.md`; `@claim:one-free-schedule`. |
| F-1-18 | Kept deployment directions concise and operational. | `.factory/copy-audit.md`; `npm run build`. |
| F-2-1 | Kept event, catering, and project businesses in the first-screen audience. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/`. |
| F-2-2 | Returned and pasted tokens now start unverified. Only an API `valid: true` result unlocks; cached verified licenses still work offline. | Expanded `@claim:one-free-schedule` covers invalid-online return, offline return, valid returned token, and valid pasted token; live offline fake-token check stayed gated. |
| F-2-3 | Kept all locale, currency, zone, wording, and reminder settings in export coverage. | `@claim:schedule-settings`; Clean claims. |
| F-2-4 | Kept the one-click calendar assertion for both sample deadlines and alarms. | `@claim:calendar-two-events`; Clean claims. |
| F-2-5 | Kept the literal scope heading and removed the former slogan. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/`. |
| F-3-1 | Kept all core exports, reminder review, and backup download free. | `@claim:free-core-features`; Clean claims; live `/workspace`. |
| F-3-2 | Kept the two documented namespaced license values and verification result. | `@claim:license-local-storage`; Clean claims; live `/privacy`. |
| F-3-3 | Kept separate license removal and browser-data deletion behavior. | `@claim:data-deletion`; Clean claims; live `/privacy`. |
| F-3-4 | Kept “Payment schedule preview” as the landing section h2. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/`. |
| F-3-5 | Kept “How your schedules are stored” as the Privacy h1. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/privacy`. |
| F-3-6 | Kept “Terms for Deposit Deadline Bridge” as the Terms h1. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/terms`. |
| F-3-7 | Kept “Page not found” as the literal 404 h1. | `tests/not-found.spec.ts`; live `/polish-five-missing`. |
| F-3-8 | Kept “Export options” as the workspace label. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/?demo=1`. |
| F-4-1 | Kept the literal payment-preview h2. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/`. |
| F-4-2 | Kept “How to record and export payment dates” as the process h2. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/`. |
| F-4-3 | Kept “What this app records and does not handle” as the scope h2. | `reviewed labels name the product result instead of using a slogan or metaphor`; live `/`. |
| F-5-1 | Made the pricing and refund links 44 px inline-flex targets; expanded the regression to every visible action on each primary mobile route. | `every visible mobile action link and button meets the 44 pixel target baseline`; live 390 px route sweep. |
| F-5-2 | Renamed user-facing `.ics`/JSON-first wording to calendar file and backup file; formats remain only in developer notes. | `@claim:json-backup`, `.factory/copy-audit.md`; live `/?demo=1` and README check. |

## Final verification

- The catalog description is now verb-first and 69 characters: “Keep deposit and final balance dates when a quote becomes an invoice.”
- Production output is `dist/` with 12.37 KB gzip JavaScript and 4.91 KB gzip CSS.
- Live Lighthouse: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.05 s, CLS 0, TBT 0. Raw report: `.factory/evidence/polish-5/lighthouse-live.json`.
- The supplied axe CLI could not discover a Chrome binary in this worker. The allowed Playwright axe integration was run against all five live routes and reported zero violations.
- No finding from reviews 1–5 remains unresolved.
