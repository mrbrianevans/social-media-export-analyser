import { expect, test } from '@playwright/test'
import { getArtifactPath } from '../getArtifactDirectory'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5000')
})
test.describe(
  'indicate to user the online/offline state of the site',
  function () {
    test('should show online indicator', async function ({ page }) {
      const indicator = page.locator('svg.online-indicator circle')
      await expect(indicator).toHaveAttribute('class', /online/)
    })
    test('should show offline indicator when page forced offline', async function ({
      page
    }) {
      const indicator = page.locator('svg.online-indicator circle')
      // screenshot green indicator
      await indicator.screenshot({
        path: getArtifactPath(__filename, 'offline-onload.png')
      })
      // should be online by default
      await expect(indicator).toHaveAttribute('class', /online/)
      // emulate offline scenario
      await page.context().setOffline(true)
      // should no longer be online
      await expect(indicator).not.toHaveAttribute('class', /online/)
      // screenshot red indicator
      await indicator.screenshot({
        path: getArtifactPath(__filename, 'offline-after-disabled-network.png')
      })
    })
  }
)
