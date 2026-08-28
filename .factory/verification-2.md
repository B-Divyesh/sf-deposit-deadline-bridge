# Independent verification 2 — Deposit Deadline Bridge

## Result: **FAIL**

- Tested commit: `c34f715e0d37c5c0bf020982ae010077c7917494`
- Verified URL: <https://deposit-deadline-bridge.sociobot.in>
- Verified: 2026-08-28 UTC
- Product class: local-first offline PWA

The candidate is buildable and its public application artifacts match the live deployment. It cannot be released because the advertised paid-library checkout is still unavailable. A second live-only quality-gate defect also remains on the 404 response.

## Release-blocking defects

### Critical — advertised $24 purchase is a dead link

The live **Buy the full library** link targets:

`https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/checkout`

Fresh verification on 2026-08-28 returned:

```text
HTTP/2 404
content-type: application/json

{"error":"enabled factory product","status":404}
```

The product promises an unlimited local library for a one-time $24 payment, but a customer cannot begin checkout. This is external factory billing configuration rather than a product-code defect, but it is a real end-to-end release failure. The claimed checkout URL itself is covered by the local claim test; the remote endpoint is not usable.

### Medium — live designed 404 violates its own CSP and logs an error

`GET /missing-page` correctly returns HTTP 404 and the designed 404 document, but the document includes an inline `<style>` while the live CSP has `style-src 'self'`. Fresh Chromium navigation logged:

```text
Applying inline style violates the following Content Security Policy directive 'style-src 'self'' ... The action has been blocked.
```

Consequently its styling is blocked and the deployment has a console error on a first load of a public route. This fails the stated console-error/CSP quality gate. (The expected 404 resource log is separate from this CSP violation.)

## Mandatory opening gates

### Claims: PASS (13/13)

`.factory/claims.json` exists. From this clean checkout, after `npm ci`, I invoked every listed exact command against the Playwright demo entry point. All completed successfully:

| Claim | Result |
| --- | --- |
| `offline-reload` | PASS |
| `local-schedules` | PASS |
| `calendar-two-events` | PASS |
| `two-payment-export` | PASS |
| `copy-payment-instructions` | PASS |
| `dst-precision` | PASS |
| `confirm-reminder` | PASS |
| `private-runtime` | PASS |
| `license-private` | PASS |
| `no-added-rules` | PASS |
| `demo-isolation` | PASS |
| `json-backup` | PASS |
| `one-free-schedule` | PASS |

The grouped rerun (`npm test -- --grep '@claim:' --reporter=dot`) also ran the 13 tagged tests successfully. Observable coverage includes offline reload, two-event ICS with alarms, separate text and clipboard instructions, DST gap rejection/fall-overlap selection, review-before-email, local-only schedule flow, demo isolation, JSON backup, and the free/premium limit.

### Cold first-read: PASS

Cold live landing-page reading answered all required questions in plain words:

- **What:** “Keep deposit and balance dates intact.”
- **For whom:** event and project businesses whose agreed dates disappear when a quote becomes an invoice.
- **First action:** **Try it with sample data**, immediately accompanied by “Opens a complete two-payment schedule.”

One click opens `/demo` with the complete Highland Glasshouse Supper schedule and the persistent “Demo — sample data, nothing is saved” banner with Reset demo and Start for real.

## Clean-checkout quality gates

| Check | Evidence | Result |
| --- | --- | --- |
| Install | `npm ci`: 61 packages added; 0 vulnerabilities | PASS |
| Unit tests | `npm run test:unit`: 3/3 Vitest tests passed | PASS |
| Browser/integration tests | `npm test`: 24 Chromium tests, including axe, keyboard, mobile, claims, routes, validation, and persistence | PASS |
| Exact production build/typecheck | `npm run build` (`tsc --noEmit && vite build`) | PASS |
| Lint | No lint script is provided | N/A |

Production output: application JS is 39,054 bytes / 12,144 bytes gzip; CSS is 17,971 bytes / 4,841 bytes gzip; 768px AVIF hero is 11,462 bytes. All are within the stated static-PWA budgets. No Lighthouse executable is installed in this clean project; browser axe and the size checks above were run instead.

## Independent functional and browser checks

- The full tests and claim runs cover a normal two-milestone schedule, reversed dates with focused recovery, invalid DST spring-gap input, repeated DST time selection, valid boundary amounts/times, export, import, persistence, and reminder cancellation. They all passed.
- Live Chromium found zero serious/critical axe violations on `/`, `/demo`, `/workspace`, `/privacy`, `/terms`, and `/missing-page`. Each had exactly one h1 and a main landmark.
- At 390×844, the landing/demo flow had no horizontal overflow. The first Tab reached the skip link with a visible `rgb(190, 107, 35) solid 3px` focus outline. Reduced-motion transition duration computed to `0.00001s`.
- The live landing, demo, workspace, privacy, and terms routes had no console or page errors. The exception is the public 404 CSP defect above.
- First-load live network requests were same-origin HTML, hashed JS/CSS, and local hero imagery only. The tested demo privacy flows sent no cross-origin schedule data; the explicit license flow is limited to `api.sociobot.in` and sends the token query value.
- Live headers include HSTS, CSP, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, permissions policy, and `frame-ancestors 'none'`. Hashed assets have `max-age=3600`; `sw.js` is `no-cache`; AVIF is correctly `image/avif`; unknown route is HTTP 404.
- The manifest, active live service worker, cacheable shell, and local offline-reload claim all passed. The live worker is active at `/sw.js`; its generated precache contains the deployed hashed JS and CSS.
- No sign-in exists, so Entra tenant validation is not applicable. This is neither a library/CLI nor a backend product.

## Deployment identity and API controls

The following independently built `dist/` artifacts SHA-256 matched the fresh live responses: `index.html`, `sw.js`, `manifest.webmanifest`, `offline.html`, `offline.css`, `404.html`, hashed JS/CSS, 768px AVIF hero, and social card. Active route, MIME, cache, and header behavior also matches the candidate configuration. (`staticwebapp.config.json` is intentionally not publicly served, so it cannot be content-hashed by URL.)

For the server-side license endpoint, a fresh concurrent burst of 80 invalid-token verification requests yielded 30 HTTP 200 responses followed by 50 HTTP 429 responses. 429 responses carried `Retry-After: 4`; observed capacity was 30 successes per burst window. Invalid verification response was `{"valid":false,"reason":"invalid","expires_at":null}` with `Cache-Control: no-store`.

## Required action before release

1. Enable/register the production Sociobot billing product, then prove checkout redirects to hosted payment and a returned license validates.
2. Move the 404 CSS into a same-origin stylesheet (or use a CSP hash/nonce that actually permits it), then verify a fresh `/missing-page` load has no CSP console error.

