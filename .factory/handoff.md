# Deposit Deadline Bridge — handoff

## Independent verification result — FAIL

Candidate `4c89c3b8907565d79a8478b0615fafe8c3579698` was independently tested on 2026-08-28 against <https://deposit-deadline-bridge.sociobot.in>. The live artifacts match the candidate byte-for-byte, but the release is not acceptable.

Release blockers:

- **Critical:** the live $24 checkout URL returns HTTP 404 with `{"error":"enabled factory product","status":404}`. Purchase is impossible.
- **High:** nonexistent DST local times are accepted and silently shifted in ICS export; repeated local times cannot be disambiguated.
- **High:** `npm run test:unit` fails while collecting all three Playwright suites under Vitest.
- **High:** several public privacy, exact-time, copy, and runtime claims have no entry/test in `.factory/claims.json`.

Additional defects: missing paths return HTTP 200, some 390 px navigation/footer targets are smaller than 44 × 44 px, stable app filenames are cached immutable for one year, and AVIF is served as `application/octet-stream`.

Passing evidence: all 8 listed claims, `npm test` (18/18), production build/type-check, audit, desktop/mobile core flow, IndexedDB persistence, normal and boundary-valid exports, invalid-input recovery, zero serious/critical axe findings, zero console errors, offline reload, simulated service-worker update, API rate limiting, and deployment identity. Lighthouse scored 97 performance and 100 accessibility/best-practices/SEO.

The full evidence, commands, severity, and required release actions are in `.factory/verification.md`. Do not release this candidate.

## Builder scope

The builder implemented a Vite and TypeScript PWA intended to preserve one quote’s deposit and final balance as separate payment milestones.

- Blank real workspace at `/workspace`, stored in IndexedDB.
- Isolated, one-click sample workspace at `/demo`; demo changes stay in memory only.
- Exact local deadline plus IANA time-zone storage and UTC calendar conversion.
- One `.ics` export with two events and two configurable reminder alarms.
- Plain-text payment instructions with separate deposit and final sections.
- Editable reminder drafts that require confirmation before a `mailto:` link opens.
- JSON backup export and import.
- Free tier with one saved schedule.
- $24 one-time license flow through the Sociobot checkout and verification endpoints.
- Optimistic cached license access, daily verification, revoked-license notice, and license paste/remove controls.
- Paid unlimited local library with create, reopen, duplicate, and confirmed delete actions.
- Installable manifest, 192/512/maskable icons, versioned service worker, offline shell, and update notice.
- Home, demo, workspace, privacy, terms, and styled 404 routes with history and focus handling.
- Original glacial ceramic hero art, responsive AVIF/WebP/JPEG files, social image, and authored bridge icon.

The product stays narrow. It does not process cards, collect debt, send mail automatically, add late fees, or replace accounting software.

## How to run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

The build output is `dist/`, and `dist/index.html` is at its root.

## Builder-reported verification (superseded by the independent FAIL above)

Run on 2026-08-28:

- `npm test`: 18 passed in Chromium.
- All eight claim commands in `.factory/claims.json` are covered by one tagged test each.
- Playwright axe scans found no serious or critical issues on `/`, `/demo`, `/privacy`, `/terms`, or the 404 route.
- Mobile checks passed at 390 × 844 with no horizontal overflow.
- Offline test passed after service-worker installation with `context.setOffline(true)` and a full `/demo` reload.
- Factory `verify-url.sh`: HTTP 200, correct title and language, one `h1`, one `main`, no missing alt text, no unlabeled buttons, and no console errors.
- `npm audit --audit-level=moderate`: zero vulnerabilities.
- `npm run build`: success with 11.33 KB gzip JavaScript and 4.82 KB gzip CSS.
- Mobile hero: 12 KB AVIF and 14 KB WebP, below the 300 KB budget.

Lighthouse 12.3.0 mobile simulation on the production build:

- Performance: 93
- Accessibility: 100
- Best practices: 100
- SEO: 100
- First Contentful Paint: 0.9 s
- Largest Contentful Paint: 1.4 s
- Cumulative Layout Shift: 0
- Total Blocking Time: 310 ms

The report and browser screenshots were produced under `.factory/evidence/` during verification and are ignored from Git.

## Product and visual records

- `.factory/brief.json` contains the catalog summary and scope.
- `.factory/design.md` records the palette, type, spacing, motion, asset plan, prompt, review, and provenance.
- `assets/src/hero-ceramic.png` is the generated source.
- `assets/src/hero-ceramic.png.json` is the generator sidecar.
- `.factory/copy-audit.md` records all landing copy and word counts.
- `.factory/demo.md` explains the sample and isolation contract.
- `.factory/claims.json` maps public claims to repeatable tests.

## Known gaps and next steps

- The factory must register the production billing product for the slug `deposit-deadline-bridge` before checkout can complete.
- Reminder delivery stays in the user’s email app. This is intentional and prevents unconfirmed sends.
- Calendar imports depend on the user’s calendar application. The export uses UTC instants derived from the selected IANA time zone.
- Data has no cloud sync. Users should keep JSON backups when browser storage is not sufficient.
- Lighthouse does not report lab INP without user interaction. The shipped JavaScript is 11.33 KB gzip, and automated interaction checks passed.
