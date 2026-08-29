import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const csp = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; connect-src 'self' https://api.sociobot.in; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://api.sociobot.in; frame-ancestors 'none'; upgrade-insecure-requests";

test('designed 404 loads its same-origin stylesheet under the production CSP', async ({ page }) => {
  const notFoundHtml = await readFile(join(process.cwd(), 'public/404.html'), 'utf8');
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.route('**/missing-page', async (route) => {
    await route.fulfill({
      status: 404,
      contentType: 'text/html',
      headers: { 'content-security-policy': csp },
      body: notFoundHtml,
    });
  });

  const stylesheetResponse = page.waitForResponse((response) => new URL(response.url()).pathname === '/404.css');
  const response = await page.goto('/missing-page');
  expect(response?.status()).toBe(404);
  expect((await stylesheetResponse).status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
  await expect(page.locator('link[rel="stylesheet"]')).toHaveAttribute('href', '/404.css');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeAttached();
  await expect(page.getByRole('banner').getByRole('link', { name: 'Deposit Deadline Bridge home' })).toBeVisible();
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Privacy' })).toBeVisible();
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Terms' })).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'The requested Deposit Deadline Bridge page was not found.');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://deposit-deadline-bridge.sociobot.in/404');
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg');
  expect(await page.locator('main').evaluate((element) => element.getBoundingClientRect().height >= window.innerHeight)).toBe(true);
  expect(errors.filter((message) => !message.includes('server responded with a status of 404'))).toEqual([]);
});

test('designed 404 contains no inline style that the production CSP would block', async () => {
  const notFoundHtml = await readFile(join(process.cwd(), 'public/404.html'), 'utf8');
  expect(notFoundHtml).not.toMatch(/<style[\s>]/i);
  expect(notFoundHtml).toMatch(/<link rel="stylesheet" href="\/404\.css" \/>/);
});
