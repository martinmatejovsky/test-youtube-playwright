import {expect} from "@playwright/test";

const searchVideoByQuery = async function (page, searchedVideoQuery) {
  await page.getByRole('combobox').fill(searchedVideoQuery)

  const startSearchBtn = page.getByRole('button', { name: 'Search', exact: true })

  await startSearchBtn.isVisible()

  await startSearchBtn.click()

  // ideal would be to have something like .toHaveCountGreaterThan(5), which Playwright currently does not have
  await expect(page.locator("ytd-video-renderer >> nth=10")).toBeVisible()
}

export default searchVideoByQuery