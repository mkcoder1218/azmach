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

test('active navigation follows the visible section rather than a stale hash', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto('/#work');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'Our Works' })).toHaveAttribute('aria-current', 'location');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'location');
  await expect(nav.getByRole('link', { name: 'Our Works' })).not.toHaveAttribute('aria-current', 'location');
  await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute('data-highlighted', 'true');
});

test('services section presents four accessible service cards', async ({ page }) => {
  await page.goto('/#services');
  const section = page.locator('#services');
  await expect(section.getByRole('heading', { level: 2 })).toContainText('real impact.');
  await expect(section.getByRole('article')).toHaveCount(4);
  await expect(section.getByRole('link', { name: 'Discuss Web development' })).toHaveAttribute('href', '#contact');
});

test('shared reveal resets when a section leaves the viewport', async ({ page }) => {
  await page.goto('/');
  const heading = page.locator('#services-title');
  const group = heading.locator('..');
  await expect(group).toHaveAttribute('data-reveal-state', 'hidden');
  await group.scrollIntoViewIfNeeded();
  await expect(group).toHaveAttribute('data-reveal-state', 'visible');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(group).toHaveAttribute('data-reveal-state', 'hidden');
  await group.scrollIntoViewIfNeeded();
  await expect(group).toHaveAttribute('data-reveal-state', 'visible');
});

test('reduced motion leaves content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#services-title').locator('..')).not.toHaveAttribute('data-reveal-state', 'hidden');
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
});

test('shared blur reveal fades out and returns in both scroll directions', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const group = page.locator('#services-title').locator('..');
  await group.scrollIntoViewIfNeeded();
  await expect(group).toHaveAttribute('data-reveal-state', 'visible');
  await expect(group).toHaveCSS('opacity', '1');
  await group.evaluate(node => {
    const bounds = node.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + bounds.bottom - 20, behavior: 'instant' });
  });
  await expect(group).toHaveAttribute('data-reveal-state', 'hidden');
  await expect(group).toHaveCSS('opacity', '0');
  await group.scrollIntoViewIfNeeded();
  await expect(group).toHaveAttribute('data-reveal-state', 'visible');
  await expect(group).toHaveCSS('opacity', '1');
});

test('theme defaults to light even on a dark system and remembers manual selection', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/');
  const root = page.locator('html');
  const toggle = page.getByRole('button', { name: 'Dark mode' });
  await expect(root).toHaveAttribute('data-theme', 'light');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(root).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(root).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});
