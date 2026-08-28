# Deposit Deadline Bridge — repair handoff

## Release-blocking verification repair 2 — complete (2026-08-28 UTC)

This repair closes both findings in `.factory/verification-2.md` for candidate `c34f715e0d37c5c0bf020982ae010077c7917494`. The artifact remains the same static, local-first offline PWA at <https://deposit-deadline-bridge.sociobot.in>.

- **Hosted checkout repaired:** registered the production Dodo one-time product **Deposit Deadline Bridge full library** for **$24 USD** and enabled the matching Sociobot factory-product registry row for `deposit-deadline-bridge`. The public catalog now returns the product with `price_minor: 2400` and `currency: USD`; `GET /api/v1/products/deposit-deadline-bridge/checkout` now returns HTTP **303** to a Dodo hosted checkout session. The existing front-end return-token capture, local license storage, and verification behavior are unchanged.
- **404 CSP repaired:** moved the designed 404’s CSS from an inline `<style>` to same-origin [`public/404.css`](../public/404.css), linked by `404.html`. The production `style-src 'self'` CSP now permits the document’s styling with no console CSP error.
- **Regression coverage added:** `tests/not-found.spec.ts` serves the actual 404 document with the production CSP and proves a 404 status, stylesheet load, page geometry, no inline style, and no unexpected console error. `npm run test:live` now verifies the deployed identity, CSP-safe 404, $24 catalog entry, hosted checkout 303, and rejected invalid license.

## Verification performed

Run after a clean install on 2026-08-28 UTC:

| Check | Result |
| --- | --- |
| `npm ci` | Passed; 61 packages installed; 0 vulnerabilities. |
| `npm run test:unit` | Passed; 3/3 Vitest tests. |
| `npm test` | Passed; 26/26 Chromium tests, including all 13 declared claims, desktop, 390 px mobile, keyboard, axe scans, offline reload, and the new 404 CSP regression. |
| `npm run build` | Passed; typecheck passed and `dist/index.html` exists. |
| `npm audit --audit-level=moderate` | Passed; 0 vulnerabilities. |
| `npm run test:live` | Passed against the custom production domain: product identity, 404/CSP, billing catalog, Dodo checkout redirect, and invalid-license response. |
| `/opt/fleet/lib/verify-url.sh` | Passed on the live root: HTTP 200, 750 ms load, no console/page errors, title, `lang=en`, one H1, main landmark, complete image alternatives, and labeled buttons. |
| Lighthouse 13.4.1, live mobile | Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.1 s, TBT 40 ms, CLS 0. |

The production missing-route check returned HTTP 404 with the restrictive CSP, fetched `/404.css` with HTTP 200, contained zero inline styles, and had zero unexpected browser console errors. The complete demo flow remains local-only; its claim tests continue to prove offline reload, demo isolation, exports, DST handling, keyboard/mobile behavior, and no third-party requests except the explicit license service.

Deployment used the factory static configuration on the existing Azure Static Web App `sf-deposit-deadline-bridge`, deployment `0b94df5b-9863-4c6d-85f1-b002b623d6ed`. Evidence is in `.factory/evidence/repair-2/` (including the live Lighthouse JSON and public response captures).

The rebuilt production files matched the custom domain byte-for-byte: `index.html`, `404.html`, `404.css`, `sw.js`, `assets/app-BZ4X6fAO.js`, and `assets/index-Cyjt_FIK.css`. No server-side API or package/consumer artifact applies to this static PWA; there is no sign-in, so Entra validation is also not applicable.

## How to run and verify

```bash
npm ci
npm run test:unit
npm test
npm run build
npm run test:live
npm run preview
```

Open `/demo` for the isolated HT-084 sample. The demo data never writes to the real IndexedDB namespace; see `.factory/demo.md` and `.factory/claims.json` for its contract and exact claims.

## Historical handoff notes

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
| `npm test` | Passed; 24 Chromium tests, including desktop/mobile, keyboard, axe serious/critical scans, offline reload, and update-compatible precache behavior. Each of the 13 exact commands listed in `.factory/claims.json` was also invoked separately and passed. |
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

Deployed the existing static PWA class to <https://deposit-deadline-bridge.sociobot.in> from commit `1ea4e2bacdebe55cd8a4e08890f30cd8b89b1333`. The SHA-256 of live `assets/app-BZ4X6fAO.js` matched `dist/assets/app-BZ4X6fAO.js`:

```text
b062d32ddbda44bf9d73cead55ccf76a5cb6b4f36d9968098af1ce652b293c98
```

Post-deploy `verify-url.sh` passed at the live URL with a 615 ms load, zero console errors, title/language/one h1/main/alt/button checks all passing. Live `/missing-page` returns HTTP 404 with the designed page, and live AVIF returns `Content-Type: image/avif` with `Cache-Control: public, max-age=3600`.

The source uses the required Sociobot checkout URL and existing license verification flow. At repair time and again immediately after deploy, `GET https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/checkout` returned HTTP 404 with `{"error":"enabled factory product","status":404}`; the public product catalogue also did not list this slug. This still blocks a visitor from purchasing the advertised library and cannot be repaired by repository code. Product registration/enabling belongs to the factory billing system, not this repository. After the factory enables `deposit-deadline-bridge`, verify that its `/checkout` response redirects to hosted checkout and that the return `?license=` token verifies successfully.

No other known product gaps remain. Calendar import behavior remains dependent on the user’s calendar app, and data remains local-first with optional JSON backups.
