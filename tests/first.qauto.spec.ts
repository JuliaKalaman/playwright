import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Guest log in' })).toBeVisible()
});