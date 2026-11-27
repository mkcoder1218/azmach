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
  await page.getByText('Menu', { exact: false }).first().click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('desktop navigation uses one sliding highlight', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const home = nav.getByRole('link', { name: 'Home' });
  const services = nav.getByRole('link', { name: 'Services' });
  const indicator = nav.locator('span[aria-hidden="true"]');
  await expect(indicator).toHaveCount(1);
  await expect(home).toHaveAttribute('data-highlighted', 'true');
  await services.hover();
  await expect(services).toHaveAttribute('data-highlighted', 'true');
  await expect(home).toHaveAttribute('data-highlighted', 'false');
  await expect.poll(async () => {
    const [a, b] = await Promise.all([indicator.boundingBox(), services.boundingBox()]);
    return a && b ? Math.abs(a.x - b.x) : Infinity;
  }).toBeLessThan(2);
  await page.getByRole('heading', { level: 1 }).hover();
  await expect(home).toHaveAttribute('data-highlighted', 'true');
});
