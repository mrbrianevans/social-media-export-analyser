import { expect, test } from '@playwright/test'
import { getArtifactPath } from '../getArtifactDirectory'

test.describe('home tab show by default on page load', function () {
  test('home tab should be in file explorer tabs', async function ({ page }) {
    await page.goto('/')

    await page.screenshot({
      path: getArtifactPath(__filename, 'homepage-onload')
    })

    await page.click('#theme-toggle')

    await page.screenshot({
      path: getArtifactPath(__filename, 'homepage-onload-dark')
    })
    const tabs = page.locator('vaadin-tabs.file-explorer-tabs vaadin-tab span')
    await expect(tabs.first()).toHaveText(/home/i)
  })
})
