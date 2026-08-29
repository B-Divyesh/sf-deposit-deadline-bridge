import { expect, test } from '@playwright/test';

test('blank workspace explains what to enter', async ({ page }) => {
  await page.goto('/workspace');
  await expect(page.locator('#summary-line')).toHaveText('Add both deadlines to prepare the exports.');
});

test('final deadline must follow the deposit deadline', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#balanceDue').fill('2026-09-01T12:00');
  await page.getByRole('button', { name: 'Check demo schedule' }).click();
  await expect(page.getByText('The final balance must be due after the deposit. Change one deadline.')).toBeVisible();
  await expect(page.locator('#balanceDue')).toBeFocused();
});

test('SPA route navigation updates the title and restores heading focus', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacy' }).first().click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page).toHaveTitle('Privacy — Deposit Deadline Bridge');
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
});

test('reviewed labels name the product result instead of using a slogan or metaphor', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Payment schedule preview', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Keep multiple payment schedules' })).toBeVisible();

  await page.goto('/workspace');
  await expect(page.getByText('Export options', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Save multiple schedules for $24 once' })).toBeVisible();

  await page.goto('/privacy');
  await expect(page.getByRole('heading', { level: 1, name: 'How your schedules are stored' })).toBeVisible();
  await page.goto('/terms');
  await expect(page.getByRole('heading', { level: 1, name: 'Terms for Deposit Deadline Bridge' })).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/Dodo|merchant of record|handle payment and refunds/i);

  await page.goto('/missing-page');
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
});
