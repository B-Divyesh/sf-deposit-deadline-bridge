# Demo sandbox

## Entry point

- Production: `https://deposit-deadline-bridge.sociobot.in/demo`
- Local: `http://localhost:5173/demo`

Opening `/demo` directly enters demo mode. The first rendered workspace already contains quote HT-084 for Maya Chen’s Highland Glasshouse Supper. It includes a $2,400 deposit, a $5,600 final balance, New York deadlines, bank-transfer wording, and two reminder lead times.

## Isolation

Demo state lives only in the page’s JavaScript memory. Demo mode never opens or reads the real IndexedDB schedule store. Leaving demo mode replaces the in-memory sample with a blank real schedule. Reloading or selecting **Reset demo** restores the bundled sample.

The persistent banner reads “Demo — sample data, nothing is saved.” It includes **Reset demo** and **Start for real**.

## Verification paths

- Change any sample field, reload, and confirm the original sample returns.
- Download the calendar and confirm it contains two `VEVENT` items and two alarms.
- Download payment instructions and confirm the deposit and final balance remain separate.
- Select either email action and confirm an editable review dialog appears before any `mailto:` navigation.
- Load once, wait for the service worker, switch the browser context offline, and reload `/demo`.

The Playwright tests perform these checks from fresh browser contexts. See `.factory/claims.json` for the exact commands.
