import { Page } from '@playwright/test'

// requesting some APIs is unecesssary and preventing it will speed up the tests
const blockRedundantNetworks = async (page: Page) => {
  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
  await page.route('**/analytics/**', route => route.abort());
}

export default blockRedundantNetworks