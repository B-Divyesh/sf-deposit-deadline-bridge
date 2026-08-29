# Deposit Deadline Bridge — Polish 5 handoff

## Result

Round 5 closes every finding in reviews 1–5. The product repair is commit `af0ac3740244676ca90243538abd273068393768`; it is deployed at <https://deposit-deadline-bridge.sociobot.in> as Static Web App deployment `80332660-24b7-4e5e-9a47-bde5c844ad3f`.

The repair makes checkout-return tokens unverified until the Sociobot endpoint confirms them. An offline or invalid token cannot unlock the paid library. A previously verified cached license still supports offline use. It also gives the two legal actions 44 px targets and replaces format-first calendar/backup wording with plain task language.

## How to run and verify

```bash
npm ci
npm run test:unit
npm test
npm run build
npm audit --audit-level=moderate
npm run test:live
```

`npm test` runs 36 Playwright tests. The 20 exact commands in `.factory/claims.json` were also run one by one from fresh clone `/tmp/ddb-polish5-clean-jW6KrQ/repo`, followed by the full commands above. All passed; the unit suite is 3/3 and the browser suite is 36/36.

The expanded `@claim:one-free-schedule` test uses isolated browser contexts to prove all four entitlement paths: a valid pasted token, invalid online return token, unverified offline return token, and verified return token. It proves one-record storage while locked and three-record storage only after valid verification.

## Release evidence

- `npm run build` produced `dist/`; initial assets are 12.37 KB gzip JavaScript and 4.91 KB gzip CSS.
- `npm audit --audit-level=moderate` reported zero vulnerabilities.
- `/opt/fleet/lib/verify-url.sh` passed with zero console errors for `/`, `/?demo=1`, `/privacy`, and `/terms`. Live reports and screenshots are in ignored local path `.factory/evidence/polish-5/`.
- Cold live browser checks passed the 390 px first screen, every visible action target, one-click HT-084 sample, sticky reset banner, 404, metadata/link crawl, and the offline fake-token lockout.
- Playwright axe reported zero live violations on `/`, `/?demo=1`, `/privacy`, `/terms`, and `/polish-five-missing`.
- Lighthouse on live `/`: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.05 s, CLS 0, TBT 0.

The standalone `@axe-core/cli` launcher could not locate a Chrome binary in this container. The permitted Playwright axe integration was used instead and passed on every live route.

## Product notes

- Demo URL: `https://deposit-deadline-bridge.sociobot.in/?demo=1` (also `/demo`). It uses only in-memory sample data and has Reset demo / Start for real controls.
- Real schedules are local to the browser. Calendar, instructions, reminder review, and backup files stay free.
- PWA output remains a static offline product with the glacial-ceramic visual system intact.

## Known gaps and next steps

None. No review finding remains open.
