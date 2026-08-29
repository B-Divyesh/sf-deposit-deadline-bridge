# Polish 4 — zero-finding release repair

Reviewed candidate: `1941398d97657a43ed5745f64deb4ba886a8b287`

Review commit: `bd09e8ef812db96bb72333d0d123bcfe6ea5069a`

Product repair commit: `9736b3083f12228f7618034189bca1a864d4c296`

Deployment: `059520c2-d2d6-476f-9883-c8f367476546`

Live site: <https://deposit-deadline-bridge.sociobot.in>

## Cumulative finding map

Every finding from reviews 1–4 is included below. Earlier repairs were retained and independently re-run in this round.

| Finding | Change retained or made | Evidence |
| --- | --- | --- |
| F-1-1 | The demo warning stays sticky and keeps Reset demo and Start for real visible. | `demo warning and controls remain visible after mobile export scrolling`; [sticky demo](evidence/polish-4/live-demo-sticky.png); live `/?demo=1` banner stayed at y=0 after scrolling 3,609 px. |
| F-1-2 | Real saves stay in IndexedDB and expose no schedule fields to another origin. | `@claim:local-schedules`; [privacy screen](evidence/polish-4/live-privacy/screenshot-mobile.png); live `/workspace` saved `LIVE-P4` with zero cross-origin requests. |
| F-1-3 | Demo edits use memory and leave real IndexedDB and localStorage unchanged. | `@claim:demo-isolation`; [sticky demo](evidence/polish-4/live-demo-sticky.png); live `/workspace` → `/?demo=1` snapshots matched byte for byte. |
| F-1-4 | Both reminder paths require review; only confirmation opens an editable `mailto:` draft. | `@claim:confirm-reminder`; [sticky demo](evidence/polish-4/live-demo-sticky.png); live `/?demo=1` produced no request before confirmation. |
| F-1-5 | All paid copy says “multiple schedules,” and the test proves three paid records against one free record. | `@claim:one-free-schedule`; [live landing](evidence/polish-4/live-home-mobile.png); live `/` and `/workspace` contain no unlimited or every-schedule promise. |
| F-1-6 | The first action opens the populated HT-084 sample in one click at `/?demo=1`. | `@claim:demo-ready`; [live landing](evidence/polish-4/live-home-mobile.png); cold live click loaded every sample field and export action. |
| F-1-7 | Invoice copy promises two plain instructions, not universal invoice compatibility. | `@claim:two-payment-export`; [live landing](evidence/polish-4/live-home-mobile.png); live `/` and downloaded text contain two bounded sections. |
| F-1-8 | Untestable provider claims remain removed. Terms give a tested 14-day refund email and revoked-license result. | `@claim:refund-request`, `@claim:license-revocation`; [live Terms](evidence/polish-4/live-terms/screenshot-mobile.png); live `/terms` check. |
| F-1-9 | The HTTP 404 keeps the shared shell, legal links, metadata, favicon, and broken-bridge art. | `designed 404 loads its same-origin stylesheet under the production CSP`; [live 404](evidence/polish-4/live-404.png); `/polish-four-missing` returned 404. |
| F-1-10 | All three facts remain inside the 390 × 844 first screen. | `mobile landing shows all three plain facts before scrolling`; [live landing](evidence/polish-4/live-home-mobile.png); cold live bounding-box check. |
| F-1-11 | README keeps the opening as four short, plain sentences. | `.factory/copy-audit.md`; [live landing](evidence/polish-4/live-home-mobile.png); clean-clone documentation check. |
| F-1-12 | The audit covers landing, legal, README, catalog, counts, claim links, and one terminology table. | `.factory/copy-audit.md`; [live landing](evidence/polish-4/live-home-mobile.png); rendered-copy comparison against live `/`. |
| F-1-13 | The process step remains “Export both payment deadlines.” | `reviewed labels name the product result instead of using a slogan or metaphor`; [live landing](evidence/polish-4/live-home-mobile.png); live `/` check. |
| F-1-14 | Paid copy consistently describes payment schedules, not stored quote documents. | `@claim:one-free-schedule`; [live landing](evidence/polish-4/live-home-mobile.png); live `/` check. |
| F-1-15 | “Final balance” remains the only public term for payment two. | `reviewed labels name the product result instead of using a slogan or metaphor`; [live landing](evidence/polish-4/live-home-mobile.png); cold live heading and preview check. |
| F-1-16 | README and Privacy use browser-language storage wording. | `@claim:local-schedules`; [privacy screen](evidence/polish-4/live-privacy/screenshot-mobile.png); live `/privacy` check. |
| F-1-17 | README states the visible Sociobot checkout and license result, not billing implementation jargon. | `@claim:one-free-schedule`; [live Terms](evidence/polish-4/live-terms/screenshot-mobile.png); live checkout returned the expected hosted redirect. |
| F-1-18 | README deployment instructions remain plain and name the exact build output. | `.factory/copy-audit.md`; [live landing](evidence/polish-4/live-home-mobile.png); deployed `dist/` served live with the expected routes and headers. |
| F-2-1 | The first screen names event, catering, and project businesses. | `reviewed labels name the product result instead of using a slogan or metaphor`; [live landing](evidence/polish-4/live-home-mobile.png); live `/` check. |
| F-2-2 | Sociobot checkout and pasted-license verification remain declared and tested. | `@claim:one-free-schedule`; [live landing](evidence/polish-4/live-home-mobile.png); `npm run test:live` checked catalog, checkout, and invalid verification. |
| F-2-3 | Locale, currency, time zone, wording, and both reminder timings remain tested in exports. | `@claim:schedule-settings`; [sticky demo](evidence/polish-4/live-demo-sticky.png); live `/?demo=1` export controls check. |
| F-2-4 | The calendar promise starts at the landing action and proves both existing dates without re-entry. | `@claim:calendar-two-events`; [live landing](evidence/polish-4/live-home-mobile.png); live download contained two events and two alarms. |
| F-2-5 | The former context-free scope label remains absent. | `reviewed labels name the product result instead of using a slogan or metaphor`; [live landing](evidence/polish-4/live-home-mobile.png); live `/` old-copy absence check. |
| F-3-1 | Calendar, instructions, reminder review, and JSON backup remain free and tested without a license. | `@claim:free-core-features`; [sticky demo](evidence/polish-4/live-demo-sticky.png); live `/workspace` exposes all free actions. |
| F-3-2 | The two documented license values remain the only localStorage values created by verification. | `@claim:license-local-storage`; [privacy screen](evidence/polish-4/live-privacy/screenshot-mobile.png); live `/privacy` storage copy check. |
| F-3-3 | Remove license preserves schedules; clearing site data removes schedules and license values. | `@claim:data-deletion`; [privacy screen](evidence/polish-4/live-privacy/screenshot-mobile.png); live `/privacy` deletion instructions check. |
| F-3-4 | The preview label is now the literal h2 “Payment schedule preview.” | `reviewed labels name the product result instead of using a slogan or metaphor`; [live landing](evidence/polish-4/live-home-mobile.png); live `/` h2 role check. |
| F-3-5 | Privacy h1 remains “How your schedules are stored.” | `reviewed labels name the product result instead of using a slogan or metaphor`; [privacy screen](evidence/polish-4/live-privacy/screenshot-mobile.png); live `/privacy` title and h1 check. |
| F-3-6 | Terms h1 remains “Terms for Deposit Deadline Bridge.” | `reviewed labels name the product result instead of using a slogan or metaphor`; [live Terms](evidence/polish-4/live-terms/screenshot-mobile.png); live `/terms` title and h1 check. |
| F-3-7 | The 404 h1 remains the literal “Page not found.” | `designed 404 loads its same-origin stylesheet under the production CSP`; [live 404](evidence/polish-4/live-404.png); live 404 title and h1 check. |
| F-3-8 | The workspace export label remains “Export options.” | `reviewed labels name the product result instead of using a slogan or metaphor`; [sticky demo](evidence/polish-4/live-demo-sticky.png); live `/?demo=1` check. |
| F-4-1 | Promoted “Payment schedule preview” to the section h2 and removed the repeated eyebrow. | `reviewed labels name the product result instead of using a slogan or metaphor`; [live landing](evidence/polish-4/live-home-mobile.png); cold live h2 role check. |
| F-4-2 | Replaced the outcome slogan with “How to record and export payment dates.” | `reviewed labels name the product result instead of using a slogan or metaphor`; [live landing](evidence/polish-4/live-home-mobile.png); cold live h2 role check. |
| F-4-3 | Replaced the pronoun/slogan heading with “What this app records and does not handle” and removed the redundant eyebrow. | `reviewed labels name the product result instead of using a slogan or metaphor`; [live landing](evidence/polish-4/live-home-mobile.png); cold live h2 role and old-copy absence checks. |

## Verification

- Fresh clone: `/tmp/ddb-polish4-clean-jHTDJJ/repo` at `9736b30`. `npm ci` completed with zero vulnerabilities.
- All 20 exact commands in `.factory/claims.json` passed one by one from that clone. Each ID appears in exactly one tagged test.
- The same clone passed `npm run test:unit` (3/3), `npm test` (36/36), `npm run build`, and `npm audit --audit-level=moderate`.
- Production output is 12.32 KB gzip JavaScript and 4.90 KB gzip CSS. `dist/index.html`, the manifest, and versioned service worker are present.
- Playwright axe found zero serious or critical issues on `/`, `/demo`, `/privacy`, `/terms`, and the 404. Keyboard focus, Back navigation, 44 px targets, mobile overflow, and reduced-motion rules passed.
- Local Lighthouse scored 100 performance, 100 accessibility, 100 best practices, and 100 SEO. LCP was 1.2 s, CLS 0, and TBT 90 ms.
- Live Lighthouse scored 100 in all four categories. LCP was 1.1 s, CLS 0, and TBT 50 ms. Raw result: [lighthouse-live.json](evidence/polish-4/lighthouse-live.json).
- `verify-url.sh` found no console errors on live `/`, `/?demo=1`, `/privacy`, and `/terms`. Reports are under `.factory/evidence/polish-4/live-*`.
- The final cold 390 px run verified first-screen facts, all three repaired h2 labels, one-click HT-084 data, exports, reminder confirmation, sticky reset controls, zero cross-origin demo requests, and offline reload.
- A separate cold live context saved `LIVE-P4`, changed and reset the demo, and confirmed that real IndexedDB and localStorage stayed byte-for-byte unchanged.
- Route checks covered titles, descriptions, canonicals, one h1/main, legal links, focus and Back restoration, and a real 404 response.

No finding from reviews 1–4 remains unresolved.
