# Polish 6 — cumulative release repair

Reviewed candidate: `acb5682724c9429fce8e5e13948aee23f3cf412e`; review commit: `d4c021476e75155a22ce02ebaae01d97026ccb76`; repair commit: `b8e7446b7e2e1a348d4c51800c667d660e65dc0a`; deployment: `c9eb2842-6b84-4874-9cdf-d986c24e69aa`.

Live site: <https://deposit-deadline-bridge.sociobot.in>

## Evidence key

- **C1** — clean clone `/tmp/ddb-polish6-verified-clean-kpfBwI/repo` at `b8e7446`; its fail-fast [verification log](evidence/polish-6/clean-verification.log) records every exact claim command independently, then `npm run test:unit` (3/3), `npm test` (37/37), `npm run build`, and `npm audit --audit-level=moderate`.
- **C2** — `tests/copy-audit.spec.ts` runs `scripts/generate-copy-audit.mjs --check`, verifies every whitespace count, and checks all audit rows against rendered `/` and rendered `README.md`.
- **L1** — local 390 px screenshots: [first screen](evidence/polish-6/local/home/mobile-first-screen.png) and [sticky demo export area](evidence/polish-6/local/demo/mobile-sticky-export.png).
- **L2** — local `/opt/fleet/lib/verify-url.sh` reports for [home](evidence/polish-6/local/home/verify.json), [demo](evidence/polish-6/local/demo/verify.json), [Privacy](evidence/polish-6/local/privacy/verify.json), and [Terms](evidence/polish-6/local/terms/verify.json): no console errors, title/lang/main, and all image/button checks pass.
- **P1** — post-deploy cold Chromium record [recheck.json](evidence/polish-6/live/recheck.json): `/`, `/?demo=1`, `/workspace`, `/privacy`, `/terms` return 200; the missing URL returns 404; all have one h1/main, titles, metadata, canonical, shared legal links, and skip links. Axe has zero serious/critical violations on all six routes.
- **P2** — post-deploy screenshots: [first screen](evidence/polish-6/live/home/mobile-first-screen.png), [sticky sample](evidence/polish-6/live/demo/mobile-sticky-export.png), and [404](evidence/polish-6/live/not-found/mobile-404.png). Live URL verifier reports are in `evidence/polish-6/live/`.

## Cumulative finding map

| Finding | Change retained or made | Evidence: test · screenshot · live check |
| --- | --- | --- |
| F-1-1 | Kept the opaque sticky demo warning with **Reset demo** and **Start for real**. | `accessibility.spec.ts` sticky-banner test · P2 sticky sample · <https://deposit-deadline-bridge.sociobot.in/?demo=1> (P1 banner y=0). |
| F-1-2 | Kept real-mode IndexedDB save and full request inspection for private schedules. | `@claim:local-schedules` (C1) · L2 Privacy · <https://deposit-deadline-bridge.sociobot.in/workspace> (P1). |
| F-1-3 | Kept memory-only demo state and byte-for-byte real-store/localStorage isolation. | `@claim:demo-isolation` (C1) · P2 sticky sample · <https://deposit-deadline-bridge.sociobot.in/?demo=1> (P1). |
| F-1-4 | Kept review gating for both reminders; only confirmation opens editable mail. | `@claim:confirm-reminder` (C1) · P2 sticky sample · <https://deposit-deadline-bridge.sociobot.in/?demo=1> (P1). |
| F-1-5 | Kept finite “multiple schedules” copy and the three-record licensed proof. | `@claim:one-free-schedule` (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-1-6 | Kept the one-click `?demo=1` HT-084 sample with populated exports. | `@claim:demo-ready` (C1) · P2 sticky sample · <https://deposit-deadline-bridge.sociobot.in/?demo=1> (P1 sample fields). |
| F-1-7 | Kept bounded wording: two plain instructions, not universal invoice compatibility. | `@claim:two-payment-export` (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-1-8 | Kept untestable provider assertions removed; retained tested refund and revoked-license paths. | `@claim:refund-request`, `@claim:license-revocation` (C1) · L2 Terms · <https://deposit-deadline-bridge.sociobot.in/terms> (P1). |
| F-1-9 | Kept the shared-shell, metadata-bearing HTTP 404 with ceramic bridge art. | `not-found.spec.ts` (C1) · P2 404 · <https://deposit-deadline-bridge.sociobot.in/polish-six-missing> (P1 HTTP 404). |
| F-1-10 | Kept all privacy/offline/price facts in the 390 × 844 first screen. | `accessibility.spec.ts` first-screen test · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1 bottom=831.58). |
| F-1-11 | Kept short, plain README opening sentences. | `copy-audit.spec.ts` (C1) · L1 first screen · live home copy at <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-1-12 | Replaced the stale hand-counted artifact with generated audit data and a rendered-copy/count regression test. | `copy-audit.spec.ts` (C1/C2) · L1 first screen · live copy source at <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-1-13 | Kept the literal process label “Export both payment deadlines.” | `workspace.spec.ts` reviewed-label test (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-1-14 | Kept paid copy about payment schedules, not quote documents. | `@claim:one-free-schedule` (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-1-15 | Kept “final balance” as the single public term. | `workspace.spec.ts` reviewed-label test (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-1-16 | Kept browser-language storage copy, not implementation jargon. | `@claim:local-schedules` (C1) · L2 Privacy · <https://deposit-deadline-bridge.sociobot.in/privacy> (P1). |
| F-1-17 | Kept user-facing checkout/verification language. | `@claim:one-free-schedule` (C1) · L2 Terms · <https://deposit-deadline-bridge.sociobot.in/terms> (P1). |
| F-1-18 | Kept operational, plain deployment instructions. | `copy-audit.spec.ts` (C1/C2) · L1 first screen · live product build at <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-2-1 | Kept event, catering, and project businesses on the first screen. | `workspace.spec.ts` reviewed-label test (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-2-2 | Kept returned/pasted tokens pending until a valid Sociobot response; fake offline returns remain locked. | `@claim:one-free-schedule` (C1) · L2 home · <https://deposit-deadline-bridge.sociobot.in/workspace> (P1). |
| F-2-3 | Kept locale, currency, zone, wording, and both reminder settings claim-tested. | `@claim:schedule-settings` (C1) · P2 sticky sample · <https://deposit-deadline-bridge.sociobot.in/?demo=1> (P1). |
| F-2-4 | Kept the landing-to-calendar proof for both existing deadlines. | `@claim:calendar-two-events` (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/?demo=1> (P1). |
| F-2-5 | Kept the literal scope heading and removed the context-free label. | `workspace.spec.ts` reviewed-label test (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-3-1 | Kept calendar, instructions, reminder review, and backup free without a license. | `@claim:free-core-features` (C1) · P2 sticky sample · <https://deposit-deadline-bridge.sociobot.in/workspace> (P1). |
| F-3-2 | Kept the two documented license storage values and their assertion. | `@claim:license-local-storage` (C1) · L2 Privacy · <https://deposit-deadline-bridge.sociobot.in/privacy> (P1). |
| F-3-3 | Kept separate license removal and full browser-data clearing behavior. | `@claim:data-deletion` (C1) · L2 Privacy · <https://deposit-deadline-bridge.sociobot.in/privacy> (P1). |
| F-3-4 | Kept “Payment schedule preview” as the preview h2. | `workspace.spec.ts` reviewed-label test (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-3-5 | Kept “How your schedules are stored” as the Privacy h1. | `workspace.spec.ts` reviewed-label test (C1) · L2 Privacy · <https://deposit-deadline-bridge.sociobot.in/privacy> (P1). |
| F-3-6 | Kept “Terms for Deposit Deadline Bridge” as the Terms h1. | `workspace.spec.ts` reviewed-label test (C1) · L2 Terms · <https://deposit-deadline-bridge.sociobot.in/terms> (P1). |
| F-3-7 | Kept literal “Page not found” for the designed 404. | `not-found.spec.ts` (C1) · P2 404 · <https://deposit-deadline-bridge.sociobot.in/polish-six-missing> (P1). |
| F-3-8 | Kept “Export options” for the export area. | `workspace.spec.ts` reviewed-label test (C1) · P2 sticky sample · <https://deposit-deadline-bridge.sociobot.in/?demo=1> (P1). |
| F-4-1 | Kept “Payment schedule preview” as a literal section h2. | `workspace.spec.ts` reviewed-label test (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-4-2 | Kept “How to record and export payment dates” as the process h2. | `workspace.spec.ts` reviewed-label test (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-4-3 | Kept “What this app records and does not handle” as the scope h2. | `workspace.spec.ts` reviewed-label test (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |
| F-5-1 | Kept every visible phone action at least 44 px high/wide. | `accessibility.spec.ts` mobile-target sweep (C1) · P2 first screen · <https://deposit-deadline-bridge.sociobot.in/terms> (P1). |
| F-5-2 | Kept calendar-file and backup-file wording for visitors; format names remain developer-only. | `@claim:json-backup`, `copy-audit.spec.ts` (C1) · P2 sticky sample · <https://deposit-deadline-bridge.sociobot.in/?demo=1> (P1). |
| F-6-1 / F-1-12 | Regenerated the audit with corrected counts, separate sentences, all navigation/actions, catalog copy, and deterministic source data. | `copy-audit.spec.ts` (C1/C2) · L1 first screen · <https://deposit-deadline-bridge.sociobot.in/> (P1). |

## Final verification

- Clean clone: all 20 exact commands declared in `.factory/claims.json` passed independently: offline, storage privacy, sample readiness, exports/copy, DST, reminder confirmation, runtime privacy, license privacy, user rules, demo isolation, backup, settings, license states, free features, local license storage, deletion, revocation, and refund request (C1).
- Full clean-clone gates: unit 3/3, Playwright 37/37 (including axe and copy-audit), production build, and `npm audit --audit-level=moderate` with zero vulnerabilities (C1).
- Production bundle: 12.37 kB gzip JavaScript and 4.91 kB gzip CSS. Local Lighthouse demo: performance 97, accessibility 100, best practices 100, SEO 100; LCP 1.25 s, CLS 0, TBT 200 ms ([report](evidence/polish-6/local/lighthouse.json)).
- Post-deploy: `npm run test:live`, four live `verify-url.sh` checks, the cold mobile/demo/route recheck, and six-route live axe scan passed. No serious or critical axe violation, console error, route metadata regression, or mobile first-screen regression remains (P1/P2).

No finding from reviews 1–6 remains unresolved.
