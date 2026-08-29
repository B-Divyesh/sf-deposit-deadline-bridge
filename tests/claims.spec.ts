import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

async function savedSchedules(page: import('@playwright/test').Page): Promise<unknown[]> {
  return page.evaluate(async () => new Promise<unknown[]>((resolve, reject) => {
    const request = indexedDB.open('deposit-deadline-bridge');
    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('schedules')) { db.close(); resolve([]); return; }
      const getAll = db.transaction('schedules').objectStore('schedules').getAll();
      getAll.onsuccess = () => { db.close(); resolve(getAll.result); };
      getAll.onerror = () => { db.close(); reject(getAll.error); };
    };
    request.onerror = () => reject(request.error);
  }));
}

test('@claim:offline-reload works offline after the first visit', async ({ page, context }) => {
  await page.goto('/demo');
  await expect(page.locator('#projectName')).toHaveValue('Highland Glasshouse Supper');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise<void>((resolve) => navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true }));
  });
  await expect.poll(() => page.evaluate(async () => Boolean(await caches.match('/demo')))).toBe(true);
  await expect.poll(() => page.evaluate(async () => {
    const keys = await caches.keys();
    const entries = await Promise.all(keys.map(async (key) => (await caches.open(key)).keys()));
    return entries.flat().some((request) => /\/assets\/app-[\w-]+\.js$/.test(new URL(request.url).pathname));
  })).toBe(true);
  await page.reload();
  await expect(page.locator('#projectName')).toHaveValue('Highland Glasshouse Supper');
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Protect this quote’s payment dates' })).toBeVisible();
  await expect(page.locator('#projectName')).toHaveValue('Highland Glasshouse Supper');
  await expect(page.getByText('You are offline. Editing and exports still work.')).toBeVisible();
});

test('@claim:local-schedules saves real schedules locally without exposing their fields', async ({ page }) => {
  const externalRequests: { url: string; body: string; headers: Record<string, string> }[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) externalRequests.push({ url: request.url(), body: request.postData() ?? '', headers: request.headers() });
  });
  await page.goto('/demo');
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page).toHaveURL(/\/workspace$/);
  await page.locator('#quoteNumber').fill('PRIVATE-17');
  await page.locator('#projectName').fill('Private winter dinner');
  await page.locator('#clientName').fill('Mira Santos');
  await page.locator('#clientEmail').fill('mira@example.test');
  await page.locator('#depositAmount').fill('1200');
  await page.locator('#depositDue').fill('2026-09-10T12:00');
  await page.locator('#balanceAmount').fill('2800');
  await page.locator('#balanceDue').fill('2026-10-10T12:00');
  await page.locator('#paymentMethod').fill('Private bank instructions');
  await page.locator('#paymentReference').fill('PRIVATE-17 only');
  await page.getByRole('button', { name: 'Save schedule' }).click();
  await expect(page.locator('#save-state')).toHaveText('Saved in this browser.');
  expect(externalRequests).toEqual([]);
  const stored = await savedSchedules(page);
  expect(stored).toHaveLength(1);
  expect(stored[0]).toMatchObject({ quoteNumber: 'PRIVATE-17', projectName: 'Private winter dinner', clientEmail: 'mira@example.test' });
});

test('@claim:demo-ready opens a complete sample schedule in one click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\/?demo=1$/);
  await expect(page).toHaveTitle('Demo — Deposit Deadline Bridge');
  await expect(page.getByLabel('Demo mode')).toBeVisible();
  await expect(page.locator('#quoteNumber')).toHaveValue('HT-084');
  await expect(page.locator('#projectName')).toHaveValue('Highland Glasshouse Supper');
  await expect(page.locator('#clientName')).toHaveValue('Maya Chen');
  await expect(page.locator('#depositAmount')).toHaveValue('2400');
  await expect(page.locator('#balanceAmount')).toHaveValue('5600');
  await expect(page.locator('#timeZone')).toHaveValue('America/New_York');
  await expect(page.locator('#paymentMethod')).toHaveValue(/Bank transfer/);
  await expect(page.getByRole('button', { name: 'Download calendar' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download payment instructions' })).toBeVisible();
});

test('@claim:calendar-two-events exports both one-click sample deadlines and reminders', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page.locator('#depositDue')).toHaveValue('2026-09-18T17:00');
  await expect(page.locator('#balanceDue')).toHaveValue('2026-10-23T17:00');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download calendar' }).click();
  const item = await downloadPromise;
  expect(item.suggestedFilename()).toBe('ht-084-deadlines.ics');
  const path = join(tmpdir(), `deadline-${Date.now()}.ics`);
  await item.saveAs(path);
  const text = await readFile(path, 'utf8');
  expect(text.match(/BEGIN:VEVENT/g)).toHaveLength(2);
  expect(text.match(/BEGIN:VALARM/g)).toHaveLength(2);
  expect(text).toContain('Deposit due');
  expect(text).toContain('Final balance due');
  expect(text).toContain('DTSTART:20260918T210000Z');
  expect(text).toContain('DTSTART:20261023T210000Z');
});

test('@claim:two-payment-export exports separate instructions', async ({ page }) => {
  await page.goto('/demo');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download payment instructions' }).click();
  const item = await downloadPromise;
  const path = join(tmpdir(), `instructions-${Date.now()}.txt`);
  await item.saveAs(path);
  const text = await readFile(path, 'utf8');
  expect(text).toContain('PAYMENT 1 — DEPOSIT');
  expect(text).toContain('$2,400.00');
  expect(text).toContain('PAYMENT 2 — FINAL BALANCE');
  expect(text).toContain('$5,600.00');
  expect(text).toContain('America/New_York');
});

test('@claim:copy-payment-instructions copies the two payment sections', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'http://127.0.0.1:4173' });
  await page.goto('/demo');
  await page.evaluate(() => {
    Reflect.defineProperty(navigator.clipboard, 'writeText', {
      configurable: true,
      value: async (text: string) => { document.documentElement.dataset.copiedInstructions = text; },
    });
  });
  await page.getByRole('button', { name: 'Copy payment instructions' }).click();
  await expect(page.locator('#toast')).toHaveText('Two payment instructions copied.');
  const copied = await page.locator('html').getAttribute('data-copied-instructions');
  expect(copied).toContain('PAYMENT 1 — DEPOSIT');
  expect(copied).toContain('PAYMENT 2 — FINAL BALANCE');
});

test('@claim:dst-precision rejects missing times and exports the selected repeated time', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#depositDue').fill('2026-03-08T02:30');
  await page.getByRole('button', { name: 'Check demo schedule' }).click();
  await expect.poll(() => page.locator('#depositDue').evaluate((input: HTMLInputElement) => input.validationMessage)).toContain('does not exist');

  await page.locator('#depositDue').fill('2026-11-01T01:30');
  await page.locator('#balanceDue').fill('2026-11-02T12:00');
  await expect(page.locator('#deposit-occurrence-field')).toBeVisible();
  await expect(page.getByText('This clock time happens twice when daylight saving ends.')).toBeVisible();
  await page.locator('#depositOccurrence').selectOption('1');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download calendar' }).click();
  const item = await downloadPromise;
  const path = join(tmpdir(), `repeated-time-${Date.now()}.ics`);
  await item.saveAs(path);
  expect(await readFile(path, 'utf8')).toContain('DTSTART:20261101T063000Z');
});

test('@claim:confirm-reminder never opens email before explicit confirmation for either deadline', async ({ page }) => {
  await page.addInitScript(() => {
    window.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement && target.protocol === 'mailto:') {
        event.preventDefault();
        document.documentElement.dataset.mailto = target.href;
      }
    }, true);
  });
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) externalRequests.push(request.url());
  });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Review deposit email' }).click();
  const dialog = page.getByRole('dialog', { name: 'Review reminder email' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel('Subject')).toHaveValue('Deposit due for Highland Glasshouse Supper');
  await expect(dialog.getByLabel('Message')).toHaveValue(/2,400/);
  await dialog.getByRole('button', { name: 'Keep editing' }).click();
  await expect(dialog).not.toBeVisible();
  expect(await page.locator('html').getAttribute('data-mailto')).toBeNull();
  expect(externalRequests).toEqual([]);

  await page.getByRole('button', { name: 'Review balance email' }).click();
  await expect(dialog).toBeVisible();
  expect(await page.locator('html').getAttribute('data-mailto')).toBeNull();
  await dialog.getByRole('button', { name: 'Open email app' }).click();
  await expect.poll(() => page.locator('html').getAttribute('data-mailto')).toContain('mailto:maya%40example.com?');
  expect(await page.locator('html').getAttribute('data-mailto')).toContain('Final+balance+due');
  expect(externalRequests).toEqual([]);
});

test('@claim:private-runtime makes no third-party request or font load during the demo flow', async ({ page }) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) externalRequests.push(request.url());
  });
  await page.goto('/demo');
  await page.locator('#projectName').fill('Private winter dinner');
  await page.getByRole('button', { name: 'Check demo schedule' }).click();
  await page.getByRole('button', { name: 'Download payment instructions' }).click();
  expect(externalRequests).toEqual([]);
  expect(await page.evaluate(() => [...document.fonts].every((font) => !font.family.includes('http')))).toBe(true);
});

test('@claim:license-private sends only the pasted license token to the license service', async ({ page }) => {
  const requests: string[] = [];
  await page.route('https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/verify?license=private-license', (route) => {
    requests.push(route.request().url());
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ valid: false }) });
  });
  await page.goto('/workspace');
  await page.locator('#projectName').fill('Schedule details must stay local');
  await page.getByRole('button', { name: 'Paste a license' }).click();
  await page.getByLabel('License token').fill('private-license');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.getByText('This license is not active. Check the token or buy a new license.')).toBeVisible();
  expect(requests).toEqual(['https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/verify?license=private-license']);
  expect(requests.join('')).not.toContain('Schedule');
});

test('@claim:no-added-rules keeps payment wording user-configured without adding late fees', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#paymentMethod').fill('Bank transfer only after the client confirms the account details');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download payment instructions' }).click();
  const item = await downloadPromise;
  const path = join(tmpdir(), `user-wording-${Date.now()}.txt`);
  await item.saveAs(path);
  const text = await readFile(path, 'utf8');
  expect(text).toContain('Bank transfer only after the client confirms the account details');
  expect(text.toLowerCase()).not.toContain('late fee');
});

test('@claim:demo-isolation leaves real storage byte-for-byte unchanged', async ({ page }) => {
  await page.goto('/workspace');
  await page.locator('#quoteNumber').fill('REAL-17');
  await page.locator('#projectName').fill('Real dinner');
  await page.locator('#clientName').fill('Ravi Shah');
  await page.locator('#depositAmount').fill('1100');
  await page.locator('#depositDue').fill('2026-09-01T12:00');
  await page.locator('#balanceAmount').fill('2200');
  await page.locator('#balanceDue').fill('2026-09-21T12:00');
  await page.locator('#paymentMethod').fill('Bank transfer');
  await page.locator('#paymentReference').fill('REAL-17');
  await page.getByRole('button', { name: 'Save schedule' }).click();
  const beforeSchedules = await savedSchedules(page);
  const beforeLocalStorage = await page.evaluate(() => JSON.stringify({ ...localStorage }));
  await page.goto('/demo');
  await page.locator('#projectName').fill('Changed demo name');
  await page.getByRole('button', { name: 'Check demo schedule' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.locator('#projectName')).toHaveValue('Highland Glasshouse Supper');
  expect(await savedSchedules(page)).toEqual(beforeSchedules);
  expect(await page.evaluate(() => JSON.stringify({ ...localStorage }))).toBe(beforeLocalStorage);
  await page.getByRole('link', { name: 'Start for real' }).click();
  await expect(page.locator('#quoteNumber')).toHaveValue('REAL-17');
  expect(await savedSchedules(page)).toEqual(beforeSchedules);
});

test('@claim:json-backup exports and imports a schedule backup', async ({ page }) => {
  await page.goto('/demo');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export JSON backup' }).click();
  const item = await downloadPromise;
  const path = join(tmpdir(), `backup-${Date.now()}.json`);
  await item.saveAs(path);
  const backup = JSON.parse(await readFile(path, 'utf8'));
  expect(backup.schedule.quoteNumber).toBe('HT-084');
  backup.schedule.projectName = 'Imported winter supper';
  await page.locator('#import-backup').setInputFiles({
    name: 'edited-backup.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backup)),
  });
  await expect(page.locator('#projectName')).toHaveValue('Imported winter supper');
});

test('@claim:schedule-settings carries chosen locale, currency, time zone, wording, and reminder timing into exports', async ({ page }) => {
  await page.goto('/?demo=1');
  await expect(page.getByLabel('Demo mode')).toBeVisible();
  await page.locator('#locale').fill('de-DE');
  await page.locator('#currency').fill('EUR');
  await page.locator('#timeZone').fill('Europe/London');
  await page.locator('#paymentMethod').fill('Bank transfer after the signed event plan');
  await page.locator('#paymentReference').fill('Use the client’s PO-88 reference');
  await page.locator('#depositReminder').fill('5');
  await page.locator('#balanceReminder').fill('11');

  const instructionsDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download payment instructions' }).click();
  const instructions = await instructionsDownload;
  const instructionsPath = join(tmpdir(), `settings-${Date.now()}.txt`);
  await instructions.saveAs(instructionsPath);
  const instructionsText = await readFile(instructionsPath, 'utf8');
  expect(instructionsText).toContain('Time zone: Europe/London');
  expect(instructionsText).toMatch(/Amount: 2\.400,00\s?€/u);
  expect(instructionsText).toContain('Bank transfer after the signed event plan');
  expect(instructionsText).toContain('Use the client’s PO-88 reference');

  const calendarDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download calendar' }).click();
  const calendar = await calendarDownload;
  const calendarPath = join(tmpdir(), `settings-${Date.now()}.ics`);
  await calendar.saveAs(calendarPath);
  const calendarText = await readFile(calendarPath, 'utf8');
  expect(calendarText).toContain('DTSTART:20260918T160000Z');
  expect(calendarText).toContain('DTSTART:20261023T160000Z');
  expect(calendarText).toContain('TRIGGER:-P5D');
  expect(calendarText).toContain('TRIGGER:-P11D');
});

test('@claim:one-free-schedule uses Sociobot checkout and license verification for a $24 multiple-schedule library', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('One schedule is free. The full library costs $24 once.')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Keep multiple payment schedules' })).toBeVisible();
  await expect(page.getByRole('link', { name: /Buy the full library/ }).first()).toHaveAttribute('href', 'https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/checkout');

  await page.goto('/workspace');
  const fillSchedule = async (quote: string, project: string) => {
    await page.locator('#quoteNumber').fill(quote);
    await page.locator('#projectName').fill(project);
    await page.locator('#clientName').fill('Asha Patel');
    await page.locator('#depositAmount').fill('100');
    await page.locator('#depositDue').fill('2026-09-01T12:00');
    await page.locator('#balanceAmount').fill('300');
    await page.locator('#balanceDue').fill('2026-09-15T12:00');
    await page.locator('#paymentMethod').fill('Bank transfer');
    await page.locator('#paymentReference').fill(quote);
    await page.getByRole('button', { name: 'Save schedule' }).click();
    await expect(page.locator('#save-state')).toHaveText('Saved in this browser.');
  };
  await fillSchedule('Q-1', 'First dinner');
  await page.evaluate(() => history.pushState({}, '', '/'));
  await page.reload();
  await page.goto('/workspace');
  await page.locator('#quoteNumber').fill('Q-2');
  await page.locator('#projectName').fill('Second dinner');
  await page.getByRole('button', { name: 'Save schedule' }).click();
  await expect(page.locator('#save-state')).toHaveText('Saved in this browser.');
  const count = await page.evaluate(async () => new Promise<number>((resolve, reject) => {
    const request = indexedDB.open('deposit-deadline-bridge');
    request.onsuccess = () => {
      const countRequest = request.result.transaction('schedules').objectStore('schedules').count();
      countRequest.onsuccess = () => resolve(countRequest.result);
      countRequest.onerror = () => reject(countRequest.error);
    };
  }));
  expect(count).toBe(1);

  await page.route('https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/verify?license=test-license', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ valid: true, reason: 'ok', expires_at: null }),
  }));
  await page.getByRole('button', { name: 'Paste a license' }).click();
  await page.getByLabel('License token').fill('test-license');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.getByText('Full library active')).toBeVisible();
  await page.getByRole('button', { name: 'Duplicate this schedule' }).click();
  await page.locator('#quoteNumber').fill('Q-3');
  await page.getByRole('button', { name: 'Save schedule' }).click();
  await page.getByRole('button', { name: 'Duplicate this schedule' }).click();
  await page.locator('#quoteNumber').fill('Q-4');
  await page.getByRole('button', { name: 'Save schedule' }).click();
  await expect(page.locator('.saved-library .saved-item')).toHaveCount(3);
});

test('@claim:free-core-features keeps calendar, instructions, reminder review, and JSON backups free', async ({ page }) => {
  await page.goto('/workspace');
  await expect(page.getByText('Calendar, instructions, reminder review, and JSON backups stay free.')).toBeVisible();
  await page.locator('#quoteNumber').fill('FREE-17');
  await page.locator('#projectName').fill('Free core dinner');
  await page.locator('#clientName').fill('Ravi Shah');
  await page.locator('#clientEmail').fill('ravi@example.test');
  await page.locator('#depositAmount').fill('1200');
  await page.locator('#depositDue').fill('2026-09-10T12:00');
  await page.locator('#balanceAmount').fill('2800');
  await page.locator('#balanceDue').fill('2026-10-10T12:00');
  await page.locator('#paymentMethod').fill('Bank transfer');
  await page.locator('#paymentReference').fill('FREE-17');

  const calendarDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download calendar' }).click();
  expect((await calendarDownload).suggestedFilename()).toBe('free-17-deadlines.ics');

  const instructionDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download payment instructions' }).click();
  expect((await instructionDownload).suggestedFilename()).toBe('free-17-payment-instructions.txt');

  await page.evaluate(() => {
    Reflect.defineProperty(navigator.clipboard, 'writeText', {
      configurable: true,
      value: async (text: string) => { document.documentElement.dataset.freeCopy = text; },
    });
  });
  await page.getByRole('button', { name: 'Copy payment instructions' }).click();
  await expect(page.locator('#toast')).toHaveText('Two payment instructions copied.');
  await expect(page.locator('html')).toHaveAttribute('data-free-copy', /PAYMENT 1 — DEPOSIT/);

  await page.getByRole('button', { name: 'Review deposit email' }).click();
  await expect(page.getByRole('dialog', { name: 'Review reminder email' })).toBeVisible();
  await page.getByRole('button', { name: 'Keep editing' }).click();

  const backupDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export JSON backup' }).click();
  expect((await backupDownload).suggestedFilename()).toBe('free-17-deadline-bridge.json');
});

test('@claim:license-local-storage stores only the documented license values in this browser', async ({ page }) => {
  await page.route('https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/verify?license=stored-license', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ valid: true, reason: 'ok', expires_at: null }),
  }));
  await page.goto('/workspace');
  await page.getByRole('button', { name: 'Paste a license' }).click();
  await page.getByLabel('License token').fill('stored-license');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.getByText('Full library active')).toBeVisible();
  const storage = await page.evaluate(() => Object.fromEntries(Object.entries(localStorage)));
  expect(Object.keys(storage).sort()).toEqual([
    'sb_license:deposit-deadline-bridge',
    'sb_license_verdict:deposit-deadline-bridge',
  ]);
  expect(storage['sb_license:deposit-deadline-bridge']).toBe('stored-license');
  expect(JSON.parse(storage['sb_license_verdict:deposit-deadline-bridge'])).toMatchObject({ valid: true });
});

test('@claim:data-deletion removes license values separately and clears all local data with browser site-data removal', async ({ page, context }) => {
  await page.route('https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/verify?license=remove-license', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ valid: true, reason: 'ok', expires_at: null }),
  }));
  await page.goto('/workspace');
  await page.locator('#quoteNumber').fill('DELETE-17');
  await page.locator('#projectName').fill('Delete test dinner');
  await page.locator('#clientName').fill('Alex Kim');
  await page.locator('#depositAmount').fill('1200');
  await page.locator('#depositDue').fill('2026-09-10T12:00');
  await page.locator('#balanceAmount').fill('2800');
  await page.locator('#balanceDue').fill('2026-10-10T12:00');
  await page.locator('#paymentMethod').fill('Bank transfer');
  await page.locator('#paymentReference').fill('DELETE-17');
  await page.getByRole('button', { name: 'Save schedule' }).click();
  await expect(page.locator('#save-state')).toHaveText('Saved in this browser.');

  await page.getByRole('button', { name: 'Paste a license' }).click();
  await page.getByLabel('License token').fill('remove-license');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.getByText('Full library active')).toBeVisible();
  await page.getByRole('button', { name: 'Remove license' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Save multiple schedules for $24 once' })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('sb_license:deposit-deadline-bridge'))).toBeNull();
  expect(await page.evaluate(() => localStorage.getItem('sb_license_verdict:deposit-deadline-bridge'))).toBeNull();
  expect(await savedSchedules(page)).toHaveLength(1);

  const client = await context.newCDPSession(page);
  await client.send('Storage.clearDataForOrigin', { origin: new URL(page.url()).origin, storageTypes: 'all' });
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  expect(await savedSchedules(page)).toEqual([]);
});

test('@claim:license-revocation closes the paid library while free work remains available', async ({ page }) => {
  let verificationCount = 0;
  await page.route('https://api.sociobot.in/api/v1/products/deposit-deadline-bridge/verify?license=revoked-license', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ valid: verificationCount++ === 0, reason: verificationCount === 1 ? 'ok' : 'revoked', expires_at: null }),
  }));
  await page.goto('/workspace');
  await page.getByRole('button', { name: 'Paste a license' }).click();
  await page.getByLabel('License token').fill('revoked-license');
  await page.getByRole('button', { name: 'Verify license' }).click();
  await expect(page.getByText('Full library active')).toBeVisible();
  await page.evaluate(() => {
    localStorage.setItem('sb_license_verdict:deposit-deadline-bridge', JSON.stringify({ valid: true, checkedAt: 0 }));
  });
  await page.reload();
  await expect(page.getByRole('heading', { level: 2, name: 'Save multiple schedules for $24 once' })).toBeVisible();
  await expect(page.getByText('License no longer active. The free schedule and exports still work.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download calendar' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download payment instructions' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export JSON backup' })).toBeVisible();
});

test('@claim:refund-request opens a pre-addressed refund request email', async ({ page }) => {
  await page.addInitScript(() => {
    window.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement && target.protocol === 'mailto:') {
        event.preventDefault();
        document.documentElement.dataset.refundMailto = target.href;
      }
    }, true);
  });
  await page.goto('/terms');
  await expect(page.getByText('You can ask for a refund within 14 days of purchase.')).toBeVisible();
  const request = page.getByRole('link', { name: 'Request a refund by email' });
  await expect(request).toHaveAttribute('href', 'mailto:support@sociobot.in?subject=Deposit%20Deadline%20Bridge%20refund%20request');
  await request.click();
  await expect.poll(() => page.locator('html').getAttribute('data-refund-mailto')).toContain('mailto:support@sociobot.in?subject=Deposit%20Deadline%20Bridge%20refund%20request');
});
