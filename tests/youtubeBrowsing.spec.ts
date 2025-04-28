import { test, expect } from '@playwright/test';
import dismissCookies from "../utils/dismissCookiesPopup";
import blockRedundantNetworks from "../utils/redundantNetworkBlocking";

const searchedVideoQuery = 'Karel Gott'

test.describe('youtube public page', () => {
  test.beforeEach(async ({ page }) => {
    await blockRedundantNetworks(page);
  });

  test('Public page has title', async ({page}) => {
    await page.goto('https://www.youtube.com/');

    await expect(page).toHaveTitle(/YouTube/i);
  })

  test('search video', async ({page}) => {
    await page.goto('https://www.youtube.com/');

    await dismissCookies(page)

    await page.getByRole('combobox').fill(searchedVideoQuery)

    const startSearchBtn = page.getByRole('button', { name: 'Search', exact: true })

    await startSearchBtn.isVisible()

    await startSearchBtn.click()

    // ideal would be to have something like .toHaveCountGreaterThan(5), which Playwright currently does not have
    await expect(page.locator("ytd-video-renderer >> nth=10")).toBeVisible()

    const searchMatches = await page.getByText(searchedVideoQuery).all()
    expect(searchMatches.length).toBeGreaterThan(5)
  })
})
