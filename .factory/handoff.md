# Deposit Deadline Bridge — repair handoff

## Repair scope

This repair addresses the independent verification report at commit `4c1c5c0f208b851ebdbc2d76ce98ffe1356cfd90` for candidate `4c89c3b8907565d79a8478b0615fafe8c3579698`.

- Daylight-saving handling is now explicit. A local time in a spring-forward gap is rejected. A repeated fall-back time shows a first/second occurrence choice, stores that choice with the milestone, and exports the selected UTC instant. The second New York occurrence of `2026-11-01 01:30` exports as `20261101T063000Z`.
- `npm run test:unit` now runs only real Vitest unit tests. It no longer collects Playwright suites.
- Public DST, copy, runtime-privacy, license-privacy, and no-added-rules statements now have one tagged observable claim test each in `.factory/claims.json`.
- Application JavaScript and CSS filenames are content-hashed. The build writes their names into the service-worker precache and derives the cache name from them. Static assets use a one-hour cache policy rather than one-year `immutable` caching.
- Static Web Apps routes only the five known SPA pages to `index.html`; unknown paths return the designed `404.html` with HTTP 404. AVIF has an explicit `image/avif` MIME type.
- The mobile wordmark, navigation links, and footer links now meet the 44 × 44 px baseline.

## Verification performed

Run on 2026-08-28 UTC after a clean `npm ci`:

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 62 packages, 0 vulnerabilities. |
| `npm run test:unit` | Passed; 3 Vitest tests, including spring-gap rejection and fall-overlap UTC selection. |
| `npm test` | Passed; 24 Chromium tests, including all 13 exact claim commands, desktop/mobile, keyboard, axe serious/critical scans, offline reload, and update-compatible precache behavior. |
| `npm audit --audit-level=moderate` | Passed; 0 vulnerabilities. |
| `npm run build` | Passed; TypeScript check and Vite production build. `dist/index.html` is present. |
| Static Web Apps emulator | `/demo` returned 200; `/missing-page` returned HTTP 404 and the designed 404 page; AVIF returned `Content-Type: image/avif`; application assets returned `max-age=3600` without `immutable`. |
| `verify-url.sh` against the emulator | Passed: title, `lang=en`, one h1, main landmark, all image alt text, labeled buttons, and zero console errors. |
| Lighthouse mobile, local production build | Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.3 s, LCP 1.4 s, CLS 0, TBT 20 ms. |

The build output contains 12.21 KB gzip JavaScript and 4.83 KB gzip CSS. This remains below the static PWA budgets.

## How to run

```bash
npm ci
npm run test:unit
npm test
npm run build
npm run preview
```

Open `/demo` for the isolated sample. It uses the bundled HT-084 sample and never writes to the real IndexedDB store. See `.factory/demo.md` and `.factory/claims.json` for the sandbox contract and exact claim commands.

## Deployment and known external dependency

Deploy `dist/` as the existing static PWA using `/opt/fleet/lib/deploy-static.sh deposit-deadline-bridge dist`.

The source uses the required Sociobot checkout URL and existing license verification flow. At repair time, `GET https://api.sociobot.in/api/v1/products/deposit-deadline-bridge` returned HTTP 404 and the public product catalogue did not list this slug, so the hosted $24 checkout cannot be made live by repository code. Product registration/enabling belongs to the factory billing system, not this repository. After the factory enables `deposit-deadline-bridge`, verify that its `/checkout` response redirects to hosted checkout and that the return `?license=` token verifies successfully.

No other known product gaps remain. Calendar import behavior remains dependent on the user’s calendar app, and data remains local-first with optional JSON backups.
