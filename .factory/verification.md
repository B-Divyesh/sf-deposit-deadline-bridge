# Independent product verification — Deposit Deadline Bridge

## Result: FAIL

- Candidate commit: `4c89c3b8907565d79a8478b0615fafe8c3579698`
- Candidate branch at start: `main`, clean and equal to `origin/main`
- Live URL: <https://deposit-deadline-bridge.sociobot.in>
- Verified: 2026-08-28 UTC
- Artifact class: offline PWA

The live deployment is byte-for-byte the candidate for every built artifact checked. The release still fails. The paid checkout is dead, exact time-zone handling changes or under-specifies deadlines at daylight-saving transitions, an advertised repository test script fails, and several public claims are absent from the required claims manifest.

## Release-blocking findings

### Critical — the advertised $24 purchase cannot be completed

Both live **Buy the full library** links point to:

`https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/checkout`

Fresh GET result:

```text
HTTP/2 404
content-type: application/json

{"error":"enabled factory product","status":404}
```

The link crawl found every same-origin link healthy and this as the sole dead link. A visitor cannot buy the paid library, so the one-time product is not end to end. This is current external deployment state, not an inference from the builder handoff.

### High — daylight-saving boundaries do not preserve the negotiated local deadline

The brief requires dates and time zones to be stored precisely. The UI also says daylight-saving changes stay precise.

- Spring gap: `2026-03-08 02:30 America/New_York` does not exist, but the app accepts it. The calendar export writes `20260308T073000Z`, which is `03:30` local after the clock change. The agreed wall time is silently changed by one hour.
- Fall overlap: `2026-11-01 01:30 America/New_York` occurs twice. The UI offers no offset/fold choice and exports `20261101T053000Z`, selecting the first occurrence without telling the user. There is no way to preserve the second occurrence.
- No validation or warning explains either condition.

This can produce a wrong payment deadline and directly violates the product's core precision constraint.

### High — an available repository test command fails

After `npm ci`, `npm run test:unit` exits 1. Vitest collects the Playwright files and all three suites fail before tests run with:

```text
Error: Playwright Test did not expect test() to be called here.
Test Files  3 failed (3)
Tests       no tests
```

The package advertises this script, and the verification work order requires all available unit/integration checks to pass. `npm test` is healthy, but it does not make the broken `test:unit` gate pass.

### High — public claims are missing from `.factory/claims.json`

All eight listed claims have exactly one tagged test and pass. The live copy and README also make testable claims that have no manifest entry/test, which the claims acceptance contract explicitly treats as a failed review. Examples:

- exact time-zone and daylight-saving precision;
- copying payment instructions (the listed claim tests only the download);
- no analytics, advertising scripts, or remote fonts;
- license checks never include schedule details;
- no product or payment-provider secret is bundled;
- the app does not add late fees or local rules.

Independent inspection supported several of these statements, but that does not satisfy the required claim-to-test mapping. The precision claim is also disproved by the DST cases above.

## Other defects

### Medium — missing routes return HTTP 200

`GET /missing-page` returns the SPA HTML with HTTP 200. The client renders a styled 404, but the deployment has no `404.html`/`responseOverrides` configuration to produce an actual 404 response. Crawlers and clients cannot distinguish missing content from a valid page.

### Medium — mobile touch targets miss the 44 × 44 px baseline

At 390 px width the layout has no horizontal overflow, but measured interactive boxes include:

- home wordmark: `40 × 24` px;
- Demo navigation link: `38 × 44` px;
- Terms footer link rounds just below 44 px in width.

This violates the supplied accessibility and design baseline even though axe does not flag it.

### Medium — immutable caching is applied to non-hashed application filenames

`/assets/app.js` and `/assets/app.css` use stable filenames but are served with `Cache-Control: public, max-age=31536000, immutable`. Correct upgrades therefore depend on changing `sw.js` on every application release. The simulated changed-worker update succeeded, but a release that changes app assets without changing the worker bytes can leave clients on stale code for up to one year. Immutable caching should be limited to content-hashed files.

### Low — AVIF is served as a generic binary type

`/assets/hero-ceramic-768.avif` returns `Content-Type: application/octet-stream` instead of `image/avif`. Chromium still rendered it in this test, but the deployment MIME map is incomplete.

## Mandatory opening gates

### Claims tests

`.factory/claims.json` exists. After the clean dependency install, every exact command passed from the demo entry point:

| Claim | Result | Observable evidence |
| --- | --- | --- |
| `offline-reload` | PASS | Service-worker-controlled `/demo` reloaded offline with the sample usable. |
| `local-schedules` | PASS | Demo edit/export flow sent no cross-origin schedule request. |
| `calendar-two-events` | PASS | ICS contained two events, two alarms, both labels, and expected UTC values. |
| `two-payment-export` | PASS | Text export contained separate deposit and final sections, amounts, and zone. |
| `confirm-reminder` | PASS | Review dialog opened; cancel produced no `mailto:` navigation. |
| `demo-isolation` | PASS | Edited sample reverted on reload. |
| `json-backup` | PASS | Exported backup was edited and imported into the demo. |
| `one-free-schedule` | PASS | One-record free limit, $24 copy/URL, mocked valid license, and two-record paid library passed. |

### Cold first-read test

PASS on desktop and 390 px mobile.

- What: **Keep deposit and balance dates intact**.
- For whom: event and project businesses whose agreed dates disappear when a quote becomes an invoice.
- First click: **Try it with sample data**, with “Opens a complete two-payment schedule” beside it.
- One click opens `/demo` with quote `HT-084`, project `Highland Glasshouse Supper`, and the persistent “Demo — sample data, nothing is saved” banner.
- Fresh demo context had no localStorage entries and did not open the real schedule IndexedDB.

## Build and repository checks

| Command/check | Result |
| --- | --- |
| `npm ci` | PASS; 61 packages installed, 0 vulnerabilities. |
| Eight exact claim commands | PASS; 8/8. |
| `npm test` | PASS; 18/18 Chromium tests in 42.2 s. |
| `npm run test:unit` | **FAIL**; 3 suites fail during collection. |
| `npm run build` | PASS; TypeScript `--noEmit` and Vite production build. |
| `npm audit --audit-level=moderate` | PASS; 0 vulnerabilities. |
| Lint | Not available in `package.json`. |

Production output:

```text
dist/index.html       1.74 kB (0.56 kB gzip)
dist/assets/app.css  17.84 kB (4.82 kB gzip)
dist/assets/app.js   35.89 kB (11.33 kB gzip)
```

## Independent end-to-end behavior

### Passed

- Created and persisted a real schedule in IndexedDB, then recovered it after reload.
- Exported an ICS and payment instructions for `Asia/Kolkata` across a year boundary.
- Accepted boundary-valid values: deposit `₹0.01`, final `₹9,99,999.99`, reminder lead times 0 and 90 days.
- The ICS contained exactly two events and two alarms. `2026-12-31 23:59` and `2027-01-01 00:00` Kolkata time exported as `18:29Z` and `18:30Z`.
- Required-field, invalid IANA zone, and reversed-date errors focused the problem field. Correcting the input restored export.
- Corrupt JSON produced a clear error and the workspace remained usable.
- Reminder dialog opened with editable content, focused inside the modal, and returned focus to the trigger on cancel.
- Live invalid-license verification returned a clear “not active” message and sent only the license token.
- Demo edits stayed in memory and reset on reload.

### Failed boundary

The DST spring-gap and fall-overlap results are documented in the High finding above.

## Deployment identity and live behavior

PASS for deployment identity. SHA-256 hashes matched between the local `dist/` and live response for 17 checked files, including:

- `index.html`, `assets/app.js`, `assets/app.css`;
- `sw.js`, manifest, offline page/style, robots and sitemap;
- favicon, all PWA icons, all hero variants, and social card.

The live page had no console errors, page errors, or failed resource requests. The factory `verify-url.sh` returned HTTP 200, one `<h1>`, a main landmark, `lang="en"`, no missing image alt text, no unlabeled buttons, and zero console errors.

## Accessibility and responsive checks

- Axe: zero serious/critical findings on `/`, `/demo`, `/workspace`, `/privacy`, `/terms`, and `/missing-page`, both candidate and live.
- Keyboard: the first Tab reaches the skip link; visible focus is a 3 px orange solid outline.
- Dialog: focus enters the dialog and returns to the reminder trigger.
- Reduced motion: bridge animation and transitions compute to `0.01 ms`.
- 390 × 844: no horizontal overflow; all primary form and export controls remain usable.
- Touch-size exceptions are listed above.
- Semantic checks passed: title, English language, one h1, main landmark, labels, alt text, and route heading focus.

## Privacy, requests, and policies

- A full demo edit, validation, backup export, and reminder-review flow made no cross-origin request.
- No analytics, advertising, remote fonts, or third-party runtime scripts were observed.
- The explicit license flow called only `api.sociobot.in`; its GET query contained the token and no schedule fields.
- The API returned the correct CORS origin for the live site and `Cache-Control: no-store` on verification.
- Live security headers include HSTS, CSP, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, a restrictive permissions policy, and frame denial through CSP.
- No sign-in exists, so Entra tenant validation is not applicable.

## API rate limiting

PASS. A burst of 160 concurrent invalid-license verification requests completed in 1.36 s:

- 30 returned HTTP 200;
- 130 returned HTTP 429;
- the 429 responses included `Retry-After: 4` and body `Too Many Requests! Wait for 4s`.

The observed burst capacity was 30 successful requests before throttling. Because requests were concurrent, the first 429 appeared at submitted array index 17 rather than in serial order.

## PWA, offline, and update behavior

- Manifest includes name/short name, standalone display, scoped start URL, palette colors, and 192/512/maskable icons.
- Live service worker controlled `/demo` and used cache `deadline-bridge-v1.0.1`.
- After the browser was set offline, a hard reload restored the sample and displayed “You are offline. Editing and exports still work.”
- An isolated update simulation changed the worker/cache to `v1.0.2`. The app displayed “An update is ready. Reload to use it,” deleted the old cache, activated the new cache, and still reloaded offline.

## Performance

Live Lighthouse 13 mobile simulation:

| Category/metric | Result |
| --- | ---: |
| Performance | 97 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| FCP | 1.0 s |
| LCP | 1.2 s |
| CLS | 0 |
| Total blocking time | 190 ms |
| Total transfer | 37 KiB |

Budgets pass: JS 11.33 kB gzip, CSS 4.82 kB gzip, no font payload, and the 768 px hero is 11.46 kB AVIF / 13.87 kB WebP.

## Applicability notes

- Library/CLI consumer install: not applicable; this is a browser PWA.
- Backend concurrency and server persistence: not applicable; product data is local-first. The external license endpoint was tested for CORS and rate limiting.
- Sign-in/Entra: not applicable; the product has no authentication.
- AI leverage: no obvious AI step is needed for this narrow date-preservation job.

## Required release actions

1. Register/enable the production Sociobot billing product and prove checkout reaches hosted payment and returns a usable license.
2. Reject nonexistent local times and let users disambiguate repeated local times, preserving the chosen instant in exports.
3. Make `npm run test:unit` pass or remove the invalid script if there are intentionally no unit suites.
4. Add every public claim to `.factory/claims.json` with one observable tagged test, or remove unsupported copy.
5. Return a real HTTP 404, enlarge all mobile targets to at least 44 × 44 px, and use hashed names for immutable assets.
