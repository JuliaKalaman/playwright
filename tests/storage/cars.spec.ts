import { test, expect } from '@playwright/test';
// import { HomePage } from '../../src/pages/HomePage';
import { GaragePage } from '../../src/pages/GaragePage';

// const USER = process.env.APP_USER_EMAIL!
// const PASS = process.env.APP_USER_PASS!

test('Check storage', (async ({ page }) => {
    // const homePage = new HomePage(page)
    // await homePage.navigate()
    // await homePage.loginAsUser(USER, PASS)
    const garagePage = new GaragePage(page)
    await garagePage.navigate()
    await expect(page.getByRole('button', { name: 'Add car' })).toBeVisible()
    await page.pause()
}))
