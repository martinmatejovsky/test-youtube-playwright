import { test, expect } from '@playwright/test';

test ('has title', async ({page}) => {
  await page.goto('https://www.youtube.com/');

  await expect(page).toHaveTitle('/YouTube/');
})

test ('dismiss cookies popup', async ({page}) => {
  await page.goto('https://www.youtube.com/');
})