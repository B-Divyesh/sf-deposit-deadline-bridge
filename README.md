# Deposit Deadline Bridge

Keep deposit and final payment dates intact when a quote becomes an invoice.

Deposit Deadline Bridge is for event, catering, and project businesses. It records two negotiated deadlines with their exact time zone, then creates one calendar file and two plain payment instructions. Every reminder opens as an editable draft before the user chooses to open their email app.

Live site: <https://deposit-deadline-bridge.sociobot.in>

## Try the isolated demo

Open <https://deposit-deadline-bridge.sociobot.in/demo> or run the site locally and visit `/demo`.

The sample is quote HT-084 for the Highland Glasshouse Supper. Demo changes are held in memory and are not saved to real schedules. Select **Reset demo** to restore the sample.

## What v1 does

- Stores real schedules in browser IndexedDB.
- Keeps the deposit and final balance as separate dated payments.
- Downloads one `.ics` calendar containing both deadlines and both reminder alarms.
- Downloads or copies two payment instructions for an invoice or accounting system.
- Opens editable reminder email drafts only after confirmation.
- Exports and imports a JSON backup.
- Works offline after the first visit.
- Keeps one current schedule for free.

The $24 one-time license adds an unlimited local schedule library. Checkout and license verification use the Sociobot billing API. No product or payment-provider secret is bundled into the app.

## Privacy and scope

Schedule data stays in the browser. The app has no analytics, advertising scripts, remote fonts, card processing, debt collection, or automatic email sending. A license check sends only the saved license token to `api.sociobot.in`.

Users choose the locale, currency, time zone, payment wording, and reminder timing. The app does not invent late fees or local invoice rules.

See [`/privacy`](https://deposit-deadline-bridge.sociobot.in/privacy) and [`/terms`](https://deposit-deadline-bridge.sociobot.in/terms).

## Develop

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The demo entry point is `http://localhost:5173/demo`.

## Test and build

```bash
npm test
npm run build
```

`npm test` builds and serves the production app, then runs the claim and accessibility checks in Chromium. The exact production build command is `npm run build`. Static output lands in `dist/`, with `dist/index.html` at its root.

Claim definitions and their sandbox steps are in [`.factory/claims.json`](.factory/claims.json). The demo contract is in [`.factory/demo.md`](.factory/demo.md).

## Deploy

Deploy the contents of `dist/` as a static site. `staticwebapp.config.json` supplies the SPA fallback, security headers, and cache rules for Azure Static Web Apps. The factory owns DNS and billing registration.

## License

MIT. See [LICENSE](LICENSE).
