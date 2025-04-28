import {test} from '@playwright/test';
import logIn from "../utils/logIn";
import dismissCookies from "../utils/dismissCookiesPopup";
import blockRedundantNetworks from "../utils/redundantNetworkBlocking";

test.describe('Youtube as Loged In user', () => {
  test.beforeEach(async ({ page }) => {
    await blockRedundantNetworks(page);
  });

  test('add a video', async ({page}) => {
    await page.goto('https://www.youtube.com/');

    await dismissCookies(page);

    await logIn(page);
  })
})