# Deposit Deadline Bridge — polish 4 handoff

## Result

Perfection-loop round 4 is complete. All findings from `.factory/review-1.md` through `.factory/review-4.md` are resolved.

The three final headings are now literal section names. The landing page says “Payment schedule preview,” “How to record and export payment dates,” and “What this app records and does not handle.” A focused browser regression requires those h2 names and rejects the former slogans.

The product remains the original glacial ceramic PWA. The isolated one-click `/?demo=1` sample, local-first storage, paid library, exports, reminder review, offline shell, route metadata, legal pages, and designed 404 are unchanged except for verified fixes.

## Release

- Reviewed candidate: `1941398d97657a43ed5745f64deb4ba886a8b287`
- Review commit: `bd09e8ef812db96bb72333d0d123bcfe6ea5069a`
- Product repair commit: `9736b3083f12228f7618034189bca1a864d4c296`
- Version: `1.0.6`
- Deployment ID: `059520c2-d2d6-476f-9883-c8f367476546`
- Live URL: <https://deposit-deadline-bridge.sociobot.in>
- Demo URL: <https://deposit-deadline-bridge.sociobot.in/?demo=1>

## Verification evidence

- Clean clone: `/tmp/ddb-polish4-clean-jHTDJJ/repo` at `9736b30`.
- Claims: all 20 exact `.factory/claims.json` commands passed individually.
- Unit: `npm run test:unit` passed 3/3.
- Browser/integration: `npm test` passed 36/36.
- Build: `npm run build` produced `dist/` with 12.32 KB gzip JS and 4.90 KB gzip CSS.
- Supply chain: `npm audit --audit-level=moderate` reported zero vulnerabilities.
- Accessibility: Playwright axe found zero serious or critical issues across app, legal, demo, and 404 routes.
- Lighthouse local: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.2 s, CLS 0, TBT 90 ms.
- Lighthouse live: performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.1 s, CLS 0, TBT 50 ms.
- Live release: `npm run test:live` passed catalog, $24 price, checkout redirect, invalid license, CSP, and HTTP 404 checks.
- Live URL verification: `/`, `/?demo=1`, `/privacy`, and `/terms` had correct titles, `lang=en`, one h1/main, complete image labels, labeled buttons, and no console errors.
- Cold live PWA: the sample loaded in one click, the demo banner stayed at y=0 after 3,609 px of scrolling, reset restored HT-084, and offline reload retained the sample.
- Cold live privacy: the demo made zero cross-origin requests. Demo edits left a saved `LIVE-P4` record and localStorage byte-for-byte unchanged.
- Cold live routing: titles, metadata, legal links, focus restoration, Back navigation, and the designed HTTP 404 passed.

Screenshots: [landing](evidence/polish-4/live-home-mobile.png), [sticky demo](evidence/polish-4/live-demo-sticky.png), [privacy](evidence/polish-4/live-privacy/screenshot-mobile.png), [terms](evidence/polish-4/live-terms/screenshot-mobile.png), and [404](evidence/polish-4/live-404.png). The cumulative finding-to-evidence map is in `.factory/polish-4.md`.

## Run and verify

```bash
npm ci
npm run test:unit
npm test
npm run build
npm audit --audit-level=moderate
npm run test:live
```

Deploy `dist/` as the static site. The work-order deployment used `/opt/fleet/lib/deploy-static.sh deposit-deadline-bridge /work/repo/dist`.

## Known gaps and next steps

None within the reviewed scope. No finding of any severity remains.
