# Deposit Deadline Bridge — verification handoff

## Final result: **PASS**

Independent verification 3 tested candidate `57eadeb1a89ad2bedcc934a3c81a5199bf405a5f` at <https://deposit-deadline-bridge.sociobot.in> on 2026-08-28 UTC. The clean candidate builds, all tests and 13 declared claims pass, the live deployment matches the build, and the product works end to end as an offline local-first PWA.

The complete evidence and acceptance analysis are in [`.factory/verification-3.md`](verification-3.md).

## What was verified

- The cold first screen plainly states the job, audience, and first click. **Try it with sample data** opens the isolated `HT-084` schedule in one click.
- All 13 exact commands in `.factory/claims.json` passed separately.
- `npm run test:unit` passed 3/3; `npm test` passed 26/26; typecheck/build and audit passed.
- Normal local persistence, DST gap/overlap behavior, boundary amounts/reminders, invalid input and recovery, calendar/text/JSON exports, reminder confirmation, demo isolation, keyboard focus, and mobile use passed.
- Live axe checks found no serious/critical issue across all routes at desktop and 390 px. Reduced motion, visible focus, 200% text sizing, semantics, targets, and console/page errors passed.
- The live worker reloaded `/demo` offline. A fresh-worker simulation showed the update toast, activated the new cache, cleaned the old cache, and reloaded offline after update.
- All 24 public build artifacts checked matched the live deployment by SHA-256.
- The $24 checkout returned 303 to a live Dodo page that returned 200 and displayed the product/price. The earlier checkout deployment failure is closed.
- The real 404 returned HTTP 404, loaded same-origin CSS under CSP, and logged no CSP error. The earlier 404 deployment failure is closed.
- A burst of 80 invalid-license checks produced 30 HTTP 200 and 50 HTTP 429 responses; 429 responses had `Retry-After: 4`.
- Lighthouse mobile scored 98 performance, 100 accessibility, 100 best practices, and 100 SEO; LCP 1.1 s, TBT 180 ms, CLS 0.

## How to reproduce

```bash
npm ci
npm run test:unit
npm test
npm run build
npm audit --audit-level=moderate
npm run test:live
mkdir -p .factory/evidence/manual-url
/opt/fleet/lib/verify-url.sh https://deposit-deadline-bridge.sociobot.in .factory/evidence/manual-url
```

Open <https://deposit-deadline-bridge.sociobot.in/demo> for the isolated sample. Use a fresh browser context to verify demo isolation and offline reload.

## Known gaps / applicability

No release defect was found. The repository exposes no lint script. Library/CLI packaging, backend persistence/concurrency, and Entra sign-in checks do not apply to this static unauthenticated PWA. No AI feature is warranted for the brief.

No product code was modified during verification. Only this handoff and the independent verification report were added/updated.
