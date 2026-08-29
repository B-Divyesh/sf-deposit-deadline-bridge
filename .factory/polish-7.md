# Polish 7 — cumulative zero-finding repair

Reviewed candidate: `38b1f379388dbc76b011f96cca51e1d6555c3dda`  
Review commit: `b9a7f62737ce25ed7348fdbeb25ddc3b2d257428`  
Product repair commit: `741ec3f27d7c3b842233589b8197caca70afbd08`  
Verification record commit: `bf40b8d674d8acabec502ff7f43ffbc144b6e0c4`
Deployment: `9fa1d816-2ada-441f-9af6-62ceec48e3c3`  
Live site: <https://deposit-deadline-bridge.sociobot.in>

## Evidence key

- **C1** — clean clone `/tmp/ddb-polish7-final-W8PLGv/repo` at `bf40b8d`: all 21 claim commands passed separately; unit 3/3; Playwright 39/39; copy audit, build, and dependency audit passed.
- **H** — `.factory/evidence/polish-7/live/mobile-first-screen.png`.
- **D** — `.factory/evidence/polish-7/live/mobile-demo-sticky.png`.
- **P** — `.factory/evidence/polish-7/live-privacy/screenshot-mobile.png`.
- **T** — `.factory/evidence/polish-7/live/mobile-terms.png`.
- **N** — `.factory/evidence/polish-7/live/mobile-404-focused.png`.
- **P1** — `.factory/evidence/polish-7/live/recheck.json`: cold 390 px checks, storage snapshots, downloads, routing, focus, offline behavior, Axe, and production hashes.
- **P2** — `.factory/evidence/polish-7/lighthouse-live.json`: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.13 s, CLS 0, TBT 50 ms.

## Cumulative finding map

| Finding | Change made or retained | Evidence: test · screenshot · live URL |
| --- | --- | --- |
| F-1-1 | Kept the opaque sticky demo warning with Reset demo and Start for real. | `demo warning and controls remain visible after mobile export scrolling` · D · live `/?demo=1`, banner y=0 in P1. |
| F-1-2 | Kept real-workspace saves in IndexedDB and schedule details out of external requests. | `@claim:local-schedules` (C1) · P · live `/workspace`, production hash match in P1. |
| F-1-3 | Kept demo state in memory and real IndexedDB/localStorage unchanged through edit and reset. | `@claim:demo-isolation` (C1) · D · live `/?demo=1`, byte-for-byte snapshots in P1. |
| F-1-4 | Kept both reminder paths behind review and explicit mail-app confirmation. | `@claim:confirm-reminder` (C1) · D · live `/?demo=1`, cancel/confirm checked in P1. |
| F-1-5 | Kept finite “multiple schedules” wording and one-free versus three-licensed proof. | `@claim:one-free-schedule` (C1) · H · live `/` and `/workspace`. |
| F-1-6 | Kept the visible one-click `?demo=1` action and complete HT-084 sample. | `@claim:demo-ready` (C1) · D · live `/?demo=1`, reset checked in P1. |
| F-1-7 | Kept the bounded promise of two plain payment instructions for an invoice. | `@claim:two-payment-export` (C1) · H · live `/` and download in P1. |
| F-1-8 | Kept untestable provider claims removed and retained tested refund/revocation outcomes. | `@claim:refund-request`, `@claim:license-revocation` (C1) · T · live `/terms`. |
| F-1-9 | Kept the shared-shell, metadata-bearing HTTP 404 and ceramic broken bridge. | `designed 404 loads its same-origin stylesheet under the production CSP` · N · live `/polish-seven-route-missing` returned 404 in P1. |
| F-1-10 | Kept all three facts inside the cold 390 × 844 first screen. | `mobile landing shows all three plain facts before scrolling` · H · live `/`, bounding boxes checked in P1. |
| F-1-11 | Kept the README opening as short plain sentences. | `copy audit is generated, complete, and accurate against rendered copy` (C1) · H · live `/` copy/hash check in P1. |
| F-1-12 | Kept the generated landing/README audit with exact counts and source comparison. | `copy audit is generated, complete, and accurate against rendered copy` (C1) · H · live `/` hash match in P1. |
| F-1-13 | Kept “Export both payment deadlines.” | `reviewed labels name the product result instead of using a slogan or metaphor` · H · live `/`. |
| F-1-14 | Kept paid copy about payment schedules, not quote documents. | `@claim:one-free-schedule` (C1) · H · live `/`. |
| F-1-15 | Kept “final balance” as the single public term for payment two. | `reviewed labels name the product result instead of using a slogan or metaphor` · H · live `/`. |
| F-1-16 | Kept browser-language storage copy. | `@claim:local-schedules` (C1) · P · live `/privacy`. |
| F-1-17 | Kept checkout and verification wording in user language. | `@claim:one-free-schedule`, `npm run test:live` · T · live checkout from `/`. |
| F-1-18 | Kept deployment instructions plain and the static output at `dist/`. | `npm run build`, static release unit test (C1) · H · live `/` headers and assets checked by `npm run test:live`. |
| F-2-1 | Kept event, catering, and project businesses on the first screen. | reviewed-label test · H · cold live `/` in P1. |
| F-2-2 | Kept returned and pasted tokens locked until Sociobot reports them valid. | `@claim:one-free-schedule` (C1) · H · live invalid-token check in `npm run test:live`. |
| F-2-3 | Kept locale, currency, time zone, wording, and reminder timing in export coverage. | `@claim:schedule-settings` (C1) · D · live `/?demo=1` asset match in P1. |
| F-2-4 | Kept the landing-to-calendar proof for both existing sample deadlines. | `@claim:calendar-two-events` (C1) · H · live calendar download in P1. |
| F-2-5 | Kept the context-free scope slogan removed. | reviewed-label test · H · live `/`. |
| F-3-1 | Kept calendar, instructions, reminder review, and backups free without a license. | `@claim:free-core-features` (C1) · D · live `/workspace`. |
| F-3-2 | Kept the two documented namespaced license values and no others. | `@claim:license-local-storage` (C1) · P · live `/privacy`. |
| F-3-3 | Kept separate license removal and full browser-data clearing behavior. | `@claim:data-deletion` (C1) · P · live `/privacy`. |
| F-3-4 | Kept “Payment schedule preview” as the preview h2. | reviewed-label test · H · live `/`. |
| F-3-5 | Kept “How your schedules are stored” as the Privacy h1. | reviewed-label test · P · live `/privacy`. |
| F-3-6 | Kept “Terms for Deposit Deadline Bridge” as the Terms h1. | reviewed-label test · T · live `/terms`. |
| F-3-7 | Kept “Page not found” as the literal 404 h1. | static 404 tests · N · live missing route in P1. |
| F-3-8 | Kept “Export options” as the workspace label. | reviewed-label test · D · live `/?demo=1`. |
| F-4-1 | Kept “Payment schedule preview” as the section h2. | reviewed-label test · H · live `/`. |
| F-4-2 | Kept “How to record and export payment dates” as the process h2. | reviewed-label test · H · live `/`. |
| F-4-3 | Kept “What this app records and does not handle” as the scope h2. | reviewed-label test · H · live `/`. |
| F-5-1 | Kept every visible action at least 44 px and added the static 404 to the sweep. | primary mobile target test plus `designed 404 mobile actions meet the 44 pixel target baseline` · N · all live routes checked in P1. |
| F-5-2 | Kept visitor wording on calendar and backup files; format names remain developer-only. | `@claim:json-backup`, copy-audit test (C1) · D · live `/?demo=1`. |
| F-6-1 / F-1-12 | Kept the copy audit generated from deterministic source data and checked against rendered copy. | copy-audit test (C1) · H · live `/` production hash check in P1. |
| F-7-1 | Registered the exact Privacy guarantee and expanded the backup claim through load, edit, real save, other exports, one requested backup, and restore. | `@claim:json-backup` (C1) · P · live `/privacy`; P1 records two non-backup downloads followed by exactly one JSON backup. |
| F-7-2 | Added a declared 404 storage-safety claim that snapshots a real schedule and both license values before the static 404 and after returning. | `@claim:404-storage-safety` (C1) · N · live HTTP 404 and byte-for-byte return check in P1. |
| F-7-3 | Replaced the subjective Terms slogan with a literal summary of use, license, refunds, and availability. | reviewed-label copy regression · T · live `/terms` exact-text check in P1. |
| F-7-4 | Made the static 404 skip link an inline-flex target with a 44 px minimum height and added a mobile regression. | `designed 404 mobile actions meet the 44 pixel target baseline` · N · live skip link measured 176.97 × 44 px in P1. |

## Final verification

- The 21 claim IDs each appear in exactly one tagged test, and every exact command passed separately from C1.
- C1 also passed `npm run test:unit` (3/3), `npm test` (39/39), `npm run test:copy-audit`, `npm run build`, and `npm audit --audit-level=moderate` with zero vulnerabilities.
- Production output is 12.37 kB gzip JavaScript and 4.91 kB gzip CSS. The built service worker uses content hash `c9c86d2d802d` for its cache.
- `npm run test:live` passed after deployment. The URL verifier passed `/`, `/?demo=1`, `/privacy`, and `/terms` with no console errors.
- P1 records 200 responses and route-specific titles for all five app routes, a real 404 for the missing route, one h1/main, full metadata, legal links, zero Axe violations, keyboard focus restoration, offline demo reload, and exact deployed/local asset hashes.
- P2 records Lighthouse 100/100/100/100 with LCP 1.13 s, CLS 0, and TBT 50 ms.

No finding from reviews 1–7 remains unresolved.
