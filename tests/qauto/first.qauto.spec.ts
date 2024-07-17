import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Guest log in' })).toBeVisible()
});

test('local storage', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('value', '12345test')
  })

  const localStorageValue = await page.evaluate(() => {
    return localStorage.getItem('value')
  })
  console.log(localStorageValue)
})

