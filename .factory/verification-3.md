# Independent product verification 3 — Deposit Deadline Bridge

## Result: **PASS**

- Candidate commit: `57eadeb1a89ad2bedcc934a3c81a5199bf405a5f`
- Candidate state at start: clean `main`, equal to `origin/main`
- Live URL: <https://deposit-deadline-bridge.sociobot.in>
- Verified: 2026-08-28 UTC
- Artifact class: local-first offline PWA

Fresh evidence shows that the candidate is buildable, the public deployment is the candidate, and the smallest useful product works end to end. The two earlier deployment-only blockers are closed: the $24 checkout now reaches a live hosted Dodo page, and the designed HTTP 404 loads without a CSP error. No release-blocking defect was found.

## Mandatory opening gates

### Claims: PASS (13/13)

`.factory/claims.json` was present in the clean clone. After `npm ci`, every exact `test` command in the manifest was invoked separately before the other product checks. All 13 exited successfully against the demo entry point.

| Claim | Result | Observable evidence |
| --- | --- | --- |
| `offline-reload` | PASS | Service-worker-controlled `/demo` reloaded offline with the bundled schedule usable. |
| `local-schedules` | PASS | The edited demo/export flow made no cross-origin schedule request. |
| `calendar-two-events` | PASS | Download contained two `VEVENT` blocks, two alarms, both labels, and the expected UTC instants. |
| `two-payment-export` | PASS | Text download contained separate deposit/final sections, both amounts, and the time zone. |
| `copy-payment-instructions` | PASS | Clipboard received both payment sections. |
| `dst-precision` | PASS | New York’s spring gap was rejected; the selected second fall occurrence exported as `20261101T063000Z`. |
| `confirm-reminder` | PASS | An editable review dialog opened; cancel caused no `mailto:` navigation. |
| `private-runtime` | PASS | Demo edit/export produced no third-party request or remote font load. |
| `license-private` | PASS | Mocked verification sent only the pasted token to the Sociobot endpoint. |
| `no-added-rules` | PASS | User wording survived export and no late-fee wording was added. |
| `demo-isolation` | PASS | An edited sample returned to the bundled value after reload. |
| `json-backup` | PASS | Exported JSON was edited and imported back into the demo. |
| `one-free-schedule` | PASS | Free mode retained one record; a mocked valid license retained two and exposed the library. |

The live landing page and README claims were cross-checked against the manifest. The public functional, privacy, price, DST, offline, demo, and export statements are represented by the 13 entries. The live checkout and deployment policy statements were also verified independently below.

### Cold first-read: PASS

The uncached live landing screen answered the required questions without scrolling on desktop and remained clear at 390 px:

- What it does: **“Keep deposit and balance dates intact.”**
- Who it is for: event and project businesses whose agreed dates disappear when a quote becomes an invoice.
- What to click: **“Try it with sample data,”** accompanied by “Opens a complete two-payment schedule.”

The one-click action opened `/demo` with quote `HT-084`, the Highland Glasshouse Supper, both payment milestones, and the persistent **“Demo — sample data, nothing is saved”** banner with **Reset demo** and **Start for real**.

## Clean-checkout gates

| Check | Fresh result |
| --- | --- |
| `npm ci` | PASS; 61 packages installed, 0 vulnerabilities. |
| 13 exact claim commands | PASS; 13/13. |
| `npm run test:unit` | PASS; 3/3 Vitest tests. |
| `npm test` | PASS; 26/26 Chromium tests in 50.4 s. |
| `npm run build` | PASS; `tsc --noEmit` and Vite production build; `dist/index.html` produced. |
| `npm audit --audit-level=moderate` | PASS; 0 vulnerabilities. |
| `npm run test:live` | PASS; product identity, real 404, catalog, checkout redirect, and invalid license. |
| `/opt/fleet/lib/verify-url.sh` | PASS; HTTP 200, 843 ms load, title/lang/one h1/main/alt/button checks, zero console errors. |
| Lint | N/A; the repository exposes no lint script. |

Production sizes are comfortably inside the supplied limits:

| Asset | Raw | Gzip/best transfer |
| --- | ---: | ---: |
| Application JavaScript | 39,054 B | 12,144 B gzip |
| Application CSS | 17,971 B | 4,841 B gzip |
| Mobile AVIF hero | 11,462 B | 11,462 B |
| Fonts | 0 B | 0 B |

## Independent end-to-end behavior

Fresh live browser contexts covered representative use, boundaries, invalid input, and recovery.

- A real schedule for quote `QA-2026-001` was saved in IndexedDB database `deposit-deadline-bridge`; quote and deadline values survived a full reload.
- The demo accepted valid boundary values: deposit `₹0.01`, final balance `₹9,99,999.99`, and reminder offsets 0 and 90 days.
- The downloaded calendar had exactly two events and two alarms. Selecting the second New York occurrence of `2026-11-01 01:30` exported `20261101T063000Z`.
- The payment download retained both boundary amounts, the user’s bank-transfer wording, and no invented late-fee text.
- Invalid `Moon/Base` focused the time-zone field with “Enter a valid IANA time zone.” New York’s nonexistent `2026-03-08 02:30` focused the deposit field with a specific gap error.
- A final deadline before the deposit showed the explicit order error and focused the final deadline. Correcting it restored successful validation and export.
- The reminder dialog opened from the keyboard, kept focus inside, and returned focus to its trigger after Escape.
- A malformed JSON backup produced “That file is not a Deposit Deadline Bridge backup” and left the workspace usable.
- Editing the sample then reloading restored `Highland Glasshouse Supper`; the demo created neither localStorage entries nor an IndexedDB database.
- The complete live demo flow produced zero page errors, console errors, failed resources, or cross-origin requests.

The smallest useful product therefore records the independently negotiated dates precisely, persists a real schedule locally, produces reusable calendar/payment artifacts, and requires explicit review before opening a reminder email.

## Deployment identity, links, billing, and policies

The independently built `dist/` matched the live deployment byte-for-byte for all 24 publicly fetchable artifacts checked. These included `index.html`, `404.html`, `404.css`, hashed JS/CSS and the JS source map, `sw.js`, manifest, offline files, robots/sitemap, all icons, all hero variants, and the social card. Deploy-only `staticwebapp.config.json` and Vite’s private manifest were correctly excluded.

The crawl found no dead link: every same-origin route returned 200, and the buy link returned 303. Fresh hosted-checkout evidence:

- `GET /api/v1/products/deposit-deadline-bridge/checkout` returned HTTP 303.
- The redirect origin was `https://checkout.dodopayments.com`.
- The hosted page returned HTTP 200 and contained the product name and $24 price.
- The public billing catalog listed the slug at `price_minor: 2400`, currency `USD`.
- Invalid live license verification returned `{valid:false, reason:"invalid"}` and did not unlock the library.

Live response policy checks passed:

- HTML: `max-age=30, must-revalidate`; hashed app assets: `max-age=3600`; service worker: `no-cache`.
- AVIF is served as `image/avif`; missing routes return the designed document with HTTP 404.
- CSP limits scripts/styles/fonts to self, permits connections only to self and Sociobot, disables objects, and denies framing.
- HSTS, `nosniff`, strict-origin referrer policy, and camera/microphone/geolocation/payment restrictions are present.
- The 404 uses same-origin `/404.css`, has no inline style, and produced no CSP or other unexpected console error.

## Privacy and server-side rate limiting

The source and built runtime contain no analytics, advertising, remote font, Azure/OpenAI endpoint, embedded API key, or payment-provider secret. Schedule data was observed only in local browser storage and generated downloads. The only allowed cross-origin runtime call is the explicit license request to `api.sociobot.in`, whose URL contained the token and no schedule fields. The API returned the live origin in CORS and `Cache-Control: no-store` for verification results.

The required fresh burst test sent 80 concurrent invalid-license requests in 704 ms:

- 30 returned HTTP 200.
- 50 returned HTTP 429.
- Every 429 included `Retry-After: 4` and “Too Many Requests! Wait for 4s.”
- Observed burst capacity was 30 successful requests. Because the calls were concurrent, the first 429 appeared at submitted array index 8 rather than in serial order.

There are no other product server endpoints. The app has no sign-in, so Microsoft Entra tenant verification does not apply.

## Accessibility, responsive behavior, and browser quality

- Live axe scans on `/`, `/demo`, `/workspace`, `/privacy`, `/terms`, and a real 404 found zero serious/critical issues at 1440 px and 390 px.
- Every checked page had `lang=en`, one h1, one main landmark, a route-specific title, and no horizontal overflow.
- The first Tab focused the skip link with a visible 3 px kiln-orange outline. Keyboard activation reached `/demo`, and SPA route changes focused the new h1.
- At 390 × 844, controls remained usable and the navigation/footer/control targets met the 44 px baseline.
- `prefers-reduced-motion: reduce` reduced maximum transition and animation durations to 0.01 ms.
- Simulated 200% text sizing produced no horizontal overflow or missing visible text on the landing, demo, privacy, and terms routes.
- Browser console, page-error, and failed-request collections remained empty throughout the live flow.

## PWA and offline behavior

- Manifest has a versioned start URL, standalone display, product colors, and 192/512/maskable icons; the 1200 × 630 social image is present.
- The live worker controlled `/demo` with cache `deadline-bridge-50197a4ce89d`. After forcing the context offline, reload restored the sample and showed “You are offline. Editing and exports still work.”
- An isolated update simulation served the exact candidate build, then changed only the worker cache version. The app displayed “An update is ready. Reload to use it,” activated the new worker, removed the prior cache after activation cleanup, and reloaded the sample offline using the updated cache.

## Performance

Fresh Lighthouse 13.4.1 mobile audit of the live root:

| Category/metric | Result |
| --- | ---: |
| Performance | 98 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| FCP | 1.0 s |
| LCP | 1.1 s |
| Total blocking time | 180 ms |
| CLS | 0 |
| Total transfer | 31 KiB |

The initial JS, CSS, font, hero, LCP, blocking-time proxy, CLS, and transfer budgets all pass.

## Applicability and findings

- Library/CLI pack-and-consume testing: not applicable; this is a browser PWA.
- Backend concurrency/persistence: not applicable; schedules are browser-local. The one external license endpoint was tested for CORS, no-store policy, invalid input, and rate limiting.
- Sign-in/Entra: not applicable; no authentication exists.
- AI leverage: no missing AI step was found. AI would add network/privacy cost without improving this narrow date-preservation job.

**Defects by severity:** no critical, high, medium, or low candidate defects found. The repository has no lint script, but type checking, unit tests, browser integration tests, axe, live regression, audit, build, and Lighthouse gates all pass.

Evidence generated during verification is under `.factory/evidence/verification-3/` in the disposable worker (screenshots, URL-verifier output, and Lighthouse JSON). The exact command outcomes and durable acceptance evidence are recorded above.
