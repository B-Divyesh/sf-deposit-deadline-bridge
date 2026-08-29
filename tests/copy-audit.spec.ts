import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

type AuditSection = { title: string; source: string; entries: [string, string][] };
type AuditData = {
  auditSections: AuditSection[];
  catalogEntry: string;
  wordCount: (copy: string) => number;
  renderCopyAudit: () => string;
};

const auditData = await import(pathToFileURL(join(process.cwd(), 'scripts/copy-audit-data.mjs')).href) as AuditData;

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function markdownToVisibleText(markdown: string): string {
  return normalize(markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[<>]/g, '')
    .replace(/[*`]/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-+]\s+/gm, ''));
}

test('copy audit is generated, complete, and accurate against rendered copy', async ({ page }) => {
  const root = process.cwd();
  execFileSync(process.execPath, ['scripts/generate-copy-audit.mjs', '--check'], { cwd: root, stdio: 'pipe' });
  await expect(readFile(join(root, '.factory/copy-audit.md'), 'utf8')).resolves.toBe(auditData.renderCopyAudit());

  const landing = auditData.auditSections.find((section) => section.title === 'Landing page')!;
  const readme = auditData.auditSections.find((section) => section.title === 'README')!;
  for (const section of auditData.auditSections) {
    for (const [copy] of section.entries) {
      expect(auditData.wordCount(copy), `${section.title}: ${copy}`).toBe(copy.trim().split(/\s+/).filter(Boolean).length);
      expect(auditData.wordCount(copy), `${section.title} exceeds the plain-words cap: ${copy}`).toBeLessThanOrEqual(22);
    }
  }
  expect(auditData.catalogEntry).toMatch(/^[A-Z][a-z]+\b/);
  expect(auditData.catalogEntry.length).toBeLessThanOrEqual(120);
  await expect(readFile(join(root, '.factory/catalog-description.txt'), 'utf8')).resolves.toBe(`${auditData.catalogEntry}\n`);

  await page.goto('/');
  const landingText = normalize(await page.locator('body').textContent() ?? '');
  for (const [copy] of landing.entries) {
    expect(landingText, `Missing audited landing copy: ${copy}`).toContain(normalize(copy));
  }

  const readmeText = markdownToVisibleText(await readFile(join(root, 'README.md'), 'utf8'));
  for (const [copy] of readme.entries) {
    expect(readmeText, `Missing audited README copy: ${copy}`).toContain(markdownToVisibleText(copy));
  }
});
