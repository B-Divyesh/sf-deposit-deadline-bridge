import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('@claim:offline-reload works offline after the first visit', async ({ page, context }) => {
  await page.goto('/demo');
  await expect(page.locator('#projectName')).toHaveValue('Highland Glasshouse Supper');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise<void>((resolve) => navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true }));
  });
  await expect.poll(() => page.evaluate(async () => Boolean(await caches.match('/demo')))).toBe(true);
  await expect.poll(() => page.evaluate(async () => Boolean(await caches.match('/assets/app.js')))).toBe(true);
  await page.reload();
  await expect(page.locator('#projectName')).toHaveValue('Highland Glasshouse Supper');
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Protect this quote’s payment dates' })).toBeVisible();
  await expect(page.locator('#projectName')).toHaveValue('Highland Glasshouse Supper');
  await expect(page.getByText('You are offline. Editing and exports still work.')).toBeVisible();
});

test('@claim:local-schedules keeps schedule data on the same origin', async ({ page }) => {
  const externalRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) externalRequests.push(request.url());
  });
  await page.goto('/demo');
  await page.locator('#projectName').fill('Private winter dinner');
  await page.getByRole('button', { name: 'Check demo schedule' }).click();
  await page.getByRole('button', { name: 'Export JSON backup' }).click();
  expect(externalRequests).toEqual([]);
});

test('@claim:calendar-two-events exports both deadlines and reminders', async ({ page }) => {
  await page.goto('/demo');
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

test('@claim:confirm-reminder requires review before opening email', async ({ page }) => {
  await page.goto('/demo');
  const before = page.url();
  await page.getByRole('button', { name: 'Review deposit email' }).click();
  const dialog = page.getByRole('dialog', { name: 'Review reminder email' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel('Subject')).toHaveValue('Deposit due for Highland Glasshouse Supper');
  await expect(dialog.getByLabel('Message')).toHaveValue(/2,400/);
  await dialog.getByRole('button', { name: 'Keep editing' }).click();
  await expect(dialog).not.toBeVisible();
  expect(page.url()).toBe(before);
});

test('@claim:demo-isolation resets sample changes after reload', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#projectName').fill('Changed demo name');
  await page.getByRole('button', { name: 'Check demo schedule' }).click();
  await page.reload();
  await expect(page.locator('#projectName')).toHaveValue('Highland Glasshouse Supper');
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

test('@claim:one-free-schedule keeps one free record and shows the paid library terms', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('One schedule is free. The full library costs $24 once.')).toBeVisible();
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
  await expect(page.locator('.saved-library .saved-item')).toHaveCount(2);
});
