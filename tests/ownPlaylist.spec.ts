import {test, expect} from '@playwright/test';
import logIn from "../utils/logIn";
import dismissCookies from "../utils/dismissCookiesPopup";
import blockRedundantNetworks from "../utils/redundantNetworkBlocking";
import searchVideoByQuery from "../utils/searchVideoByQuery";

const searchedVideoQuery = 'Karel Gott'
const newPlaylistName = 'Test vlastni playlist'

test.describe('Youtube as Loged In user', () => {
  test.beforeEach(async ({ page }) => {
    await blockRedundantNetworks(page);
  });

  test('own playlist editation', async ({page}) => {
    await page.goto('https://www.youtube.com/');

    await dismissCookies(page);

    await logIn(page);

    await searchVideoByQuery(page, searchedVideoQuery)

    // add first found video to playlist
    await page.getByText(searchedVideoQuery).nth(1).click();
    await page.locator('#actions-inner').getByRole('button', { name: 'Další akce' }).click();
    await page.getByRole('option', { name: 'Uložit' }).locator('yt-formatted-string').click();
    await page.getByRole('button', { name: 'Nový playlist' }).click();
    await page.getByText('Vyberte název').click();
    await page.getByRole('textbox', { name: 'Vyberte název' }).fill(newPlaylistName);
    await page.locator('yt-panel-footer-view-model').getByRole('button', { name: 'Vytvořit' }).click();
    await page.locator('#actions-inner').getByRole('button', { name: 'Další akce' }).click();

    // check if the new playlist was created
    await page.getByRole('button', { name: 'Průvodce' }).click();
    await page.locator('tp-yt-paper-item').filter({ hasText: 'Playlisty' }).click();
    await expect(page.getByRole('link', { name: newPlaylistName })).toBeVisible();

    // open and verify playlist
    await page.getByRole('link', { name: newPlaylistName }).click();
    await expect(page.getByText('/ 11 / 1')).toBeVisible();

    // remove playlist
    await page.getByRole('button', { name: 'Průvodce' }).click();
    await page.getByTitle('Playlisty').getByRole('link').click();
    const newPlaylist = page.locator('yt-lockup-metadata-view-model').filter({ hasText: newPlaylistName })
    await newPlaylist.getByRole('button', { name: 'Další akce' }).click();
    await page.getByText('Smazat').click();
    await expect(page.getByRole('link', { name: newPlaylistName })).not.toBeVisible();
  })
})