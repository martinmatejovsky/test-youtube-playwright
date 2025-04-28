import {Page, expect} from '@playwright/test'

const login = 'testucet833@gmail.com'
const password = 'HesloPlaywrightUcet'

const logIn = async (page: Page) => {
  const logInButton = page.getByRole('link', { name: 'Sign in'})

  await logInButton.click()

  await page.waitForTimeout(2000);

  await page.getByRole('textbox', { name: 'Email or phone' }).fill(login);
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('textbox', { name: 'Enter your password' }).fill(password);
  await page.getByRole('button', { name: 'Next' }).click();

  // skip "personalize" steps if it appears
  const personalizePage = page.getByText('Recovery information');
  if (await personalizePage.isVisible()) {
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('button', { name: 'Skip' }).click();
  }

  await expect(page.getByLabel('Vaše historie sledování je')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Nabídka účtu' })).toBeVisible();
}

export default logIn