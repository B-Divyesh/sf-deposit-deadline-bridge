# Deposit Deadline Bridge — polish 6 handoff

## Result: **PASS**

Repair commit: `b8e7446b7e2e1a348d4c51800c667d660e65dc0a`; static deployment: `c9eb2842-6b84-4874-9cdf-d986c24e69aa`; live: <https://deposit-deadline-bridge.sociobot.in>

The final blocking regression (F-6-1 / F-1-12) is closed. `.factory/copy-audit.md` is generated from one source of truth with a correct whitespace tokenizer. Its Playwright regression test verifies every row and count against the rendered landing and README, so the evidence cannot silently go stale. The catalog description is now the verb-first, 65-character “Keep deposit and final balance dates when quotes become invoices.”

## What ships

- Local-first payment-schedule workspace with deposit and final-balance milestones, timezone/DST validation, calendar and instruction exports, reminder review, and backup/restore.
- One-click isolated `?demo=1` sample with HT-084, persistent warning, Reset demo, and Start for real.
- Route-specific metadata, focused route changes, shared legal/navigation shell, designed HTTP 404, offline PWA behavior, and the existing ceramic-ledger visual system.
- Generated claims/copy evidence and all earlier review repairs preserved. See `.factory/polish-6.md` for the finding-by-finding map.

## Run and verify

```bash
npm ci
npm run dev
npm test
npm run test:unit
npm run build
```

Demo: `http://localhost:5173/?demo=1`. Production verification: `npm run test:live`.

Exact clean-clone evidence is in `.factory/evidence/polish-6/clean-verification.log`: all 20 declared claim commands passed separately, then unit tests (3/3), the full Playwright suite (37/37), build, and moderate audit (zero vulnerabilities). The bundled output is 12.37 kB gzip JavaScript and 4.91 kB gzip CSS.

Local `verify-url.sh` evidence and screenshots are under `.factory/evidence/polish-6/local/`; live screenshots and the six-route cold/axe result are under `.factory/evidence/polish-6/live/` (ignored evidence artifacts). Local Lighthouse recorded performance 97, accessibility 100, best practices 100, SEO 100; LCP 1.25 s, CLS 0, TBT 200 ms.

## Known gaps

None. The product remains a static PWA deployment; deployment, DNS, and billing infrastructure are factory-managed.
