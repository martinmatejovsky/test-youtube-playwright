import { test, expect } from '@playwright/test';
import dismissCookies from "../utils/dismissCookiesPopup";
import blockRedundantNetworks from "../utils/redundantNetworkBlocking";
import searchVideoByQuery from "../utils/searchVideoByQuery";

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

    await searchVideoByQuery(page, searchedVideoQuery)

    const searchMatches = await page.getByText(searchedVideoQuery).all()
    expect(searchMatches.length).toBeGreaterThan(5)
  })
})
