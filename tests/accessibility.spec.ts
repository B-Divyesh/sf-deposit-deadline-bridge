import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const route of ['/', '/demo', '/privacy', '/terms', '/missing-page']) {
  test(`page ${route} has one h1 and no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    const results = await new AxeBuilder({ page: page as never }).analyze();
    expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
  });
}

test('mobile workspace has no horizontal overflow and remains usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(page.getByRole('button', { name: 'Download calendar' })).toBeVisible();
});

test('mobile landing shows all three plain facts before scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  for (const text of ['Works offline after the first visit.', 'Your schedules stay in this browser.', 'One schedule is free. The full library costs $24 once.']) {
    const box = await page.getByText(text, { exact: true }).boundingBox();
    expect(box?.y).toBeGreaterThanOrEqual(0);
    expect((box?.y ?? 900) + (box?.height ?? 0)).toBeLessThanOrEqual(844);
  }
});

test('demo warning and controls remain visible after mobile export scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Download calendar' }).scrollIntoViewIfNeeded();
  const banner = page.getByLabel('Demo mode');
  await expect(banner).toBeVisible();
  const box = await banner.boundingBox();
  expect(box?.y).toBeGreaterThanOrEqual(0);
  await expect(banner.getByRole('button', { name: 'Reset demo' })).toBeVisible();
  await expect(banner.getByRole('link', { name: 'Start for real' })).toBeVisible();
});

test('every visible mobile action link and button meets the 44 pixel target baseline', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/demo', '/workspace', '/privacy', '/terms']) {
    await page.goto(route);
    const targets = await page.locator('a[href], button, label.file-label').evaluateAll((elements) => elements.flatMap((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return [];
      return [{ label: (element.getAttribute('aria-label') || element.textContent || element.tagName).trim().replace(/\s+/g, ' '), width: rect.width, height: rect.height }];
    }));
    const undersized = targets.filter((target) => target.width < 44 || target.height < 44);
    expect(undersized, `${route} has undersized action targets: ${JSON.stringify(undersized)}`).toEqual([]);
  }
});

test('keyboard reaches the primary demo action', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeVisible();
});
