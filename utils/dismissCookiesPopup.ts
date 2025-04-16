import { Page } from '@playwright/test';

const dismissCookies = async (page: Page) => {
    const rejectAllButton = page.getByRole('button', {name: /Reject/i});

    if (await rejectAllButton.isVisible()) {
        await rejectAllButton.click()

        await page.waitForTimeout(2000); // processing cookies choice
    }
}

export default dismissCookies;