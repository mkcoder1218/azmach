import { test, expect } from '@playwright/test';

test('homepage presents the AZMACH.E identity', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/AZMACH.E/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Build Today.');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Lead Tomorrow.');
  await page.getByRole('link', { name: 'Explore the vision' }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.getByRole('heading', { name: 'Built with purpose.' })).toBeVisible();
});

test('mobile homepage has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.getByRole('navigation')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
