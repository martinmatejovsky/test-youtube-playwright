import { test, expect } from '@playwright/test';
import dismissCookies from "./dismissCookiesPopup";

const searchedVideoQuery = 'Karel Gott'

test.describe('youtube public page', () => {
  test('has title', async ({page}) => {
    await page.goto('https://www.youtube.com/');

    await expect(page).toHaveTitle(/YouTube/i);
  })

  test('search video', async ({page}) => {
    await page.goto('https://www.youtube.com/');

    await dismissCookies(page)

    await page.getByRole('combobox').fill(searchedVideoQuery)

    const startSearchBtn = page.getByRole('button', { name: 'Search', exact: true })

    if (await startSearchBtn.isVisible()) {
      await startSearchBtn.click()
    } else {
        console.log('startSearchBtn not found')
    }

    await page.waitForLoadState()

    const searchMatches = await page.getByText(searchedVideoQuery).all()
    expect(searchMatches.length).toBeGreaterThan(5)
  })
})
