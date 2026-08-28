# Polish 1 — adversarial review repair

Repair commit: `fe46fef5d2cfc4df1589a3ce7a713d8f15ecbaf7`.

Screenshots: `.factory/evidence/live-landing-mobile.png`, `.factory/evidence/live-demo-mobile.png`, and `.factory/evidence/demo-desktop.png`. All live checks used `https://deposit-deadline-bridge.sociobot.in` after deployment.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Made the demo warning a sticky opaque bar and retained both controls at 390 px. | `demo warning and controls remain visible after mobile export scrolling`; `live-demo-mobile.png`; live `/demo` check. |
| F-1-2 | Reworked `local-schedules` to leave demo, save unique real data, intercept all cross-origin request parts, and read IndexedDB. | `@claim:local-schedules`; live `/workspace` check. |
| F-1-3 | Reworked isolation coverage to snapshot real IndexedDB/localStorage, edit and reset demo, then reopen real data. | `@claim:demo-isolation`; `live-demo-mobile.png`; live `/demo` check. |
| F-1-4 | Exercised both reminder actions; cancellation has no request/mailto and explicit confirmation activates only the expected editable mailto. | `@claim:confirm-reminder`; live `/demo` check. |
| F-1-5 | Replaced absolute “unlimited” wording with “multiple schedules” and prove three paid records versus one free record. | `@claim:one-free-schedule`; live `/workspace` check. |
| F-1-6 | Registered the one-click result as `demo-ready` and assert every sample field and export action. | `@claim:demo-ready`; `demo-desktop.png`; live `/demo` check. |
| F-1-7 | Rewrote “any invoice” as two downloadable instructions to attach to an invoice. | `@claim:two-payment-export`; live `/` check. |
| F-1-8 | Replaced the unverified refund statement with a real `/terms` link. | `tests/not-found.spec.ts` legal-link checks; live `/terms` check. |
| F-1-9 | Added common header, skip link, footer/legal links, build id, favicon, canonical, description, OG, and Twitter metadata to static 404. | `tests/not-found.spec.ts`; live unknown-route check. |
| F-1-10 | Tightened the 390 px hero and placed all facts before the secondary action. | `mobile landing shows all three plain facts before scrolling`; `live-landing-mobile.png`; live `/` check. |
| F-1-11 | Split and rewrote the README opening in plain language. | `.factory/copy-audit.md`; repository check. |
| F-1-12 | Regenerated the copy audit with its tokenizer, README section, corrected counts, and terminology table. | `.factory/copy-audit.md`. |
| F-1-13 | Renamed “Export the bridge” to “Export both payment deadlines.” | `.factory/copy-audit.md`; live `/` check. |
| F-1-14 | Renamed paid heading to “Keep every payment schedule.” | `@claim:one-free-schedule`; live `/` check. |
| F-1-15 | Standardized public descriptions, first screen, catalog, manifest, brief, and README on “final balance.” | `mobile landing shows all three plain facts before scrolling`; `live-landing-mobile.png`; live `/` check. |
| F-1-16 | Replaced README storage implementation jargon with browser-language. | `.factory/copy-audit.md`; repository check. |
| F-1-17 | Replaced README billing API jargon with checkout/license language. | `.factory/copy-audit.md`; repository check. |
| F-1-18 | Rewrote README deployment instructions in plain language. | `.factory/copy-audit.md`; repository check. |

## Verification

- Clean clone: `npm ci`, then every one of the 14 commands in `.factory/claims.json` passed separately.
- Local: `npm run test:unit` (3 passed), `npm test` (29 passed), `npm run build`, and `npm audit --audit-level=moderate` (0 vulnerabilities).
- Browser/a11y: axe serious/critical checks run on `/`, `/demo`, `/privacy`, `/terms`, and a missing route; mobile overflow, visible focus/keyboard, first-screen facts, persistent banner, and static-404 CSP tests pass.
- Live: `npm run test:live` passed after the deployed build was available; a cold browser check covered `/`, `/demo`, `/privacy`, `/terms`, and an unknown route.
