import { expect, test } from '@playwright/test'
import { demoFilePath } from '../../../generateDemoFiles'
import { getArtifactPath } from '../../getArtifactDirectory'

test.describe('heatmap visualisation of timeseries', function () {
  test('should show heatmap for instagram posts', async function ({ page }) {
    await page.goto('/')
    const fileTabs = page.locator(
      'vaadin-tabs.file-explorer-tabs vaadin-tab span'
    )
    await page
      .locator('input[type=file]')
      .setInputFiles(demoFilePath('instagram/media.json'))
    await expect(fileTabs.first()).toHaveText(/instagram/i)
    await fileTabs.first().click()
    await page
      .locator(
        'main vaadin-app-layout div vaadin-vertical-layout vaadin-tabs vaadin-tab span',
        {
          hasText: /time ?series/i
        }
      )
      .click()
    await page.waitForTimeout(1000) // time to render graphs

    const componentContainer = page.locator('.component-container')

    const heatmapContainer = page.locator('.heatmapContainer')
    await heatmapContainer.scrollIntoViewIfNeeded()
    await componentContainer.screenshot({
      path: getArtifactPath(__filename, 'componentContainer')
    })
    await heatmapContainer.screenshot({
      path: getArtifactPath(__filename, 'heatmapContainer')
    })
    await page.screenshot({
      path: getArtifactPath(__filename, 'wholePage')
    })
    // dark mode screenshots as well
    await page.click('#theme-toggle')
    await componentContainer.screenshot({
      path: getArtifactPath(__filename, 'componentContainer-dark')
    })
    await heatmapContainer.screenshot({
      path: getArtifactPath(__filename, 'heatmapContainer-dark')
    })
    await page.screenshot({
      path: getArtifactPath(__filename, 'wholePage-dark')
    })

    // download heatmap SVG file
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('h4 vaadin-button').click()
    ])
    await download.saveAs(getArtifactPath(__filename, 'svgDownload.svg'))
    expect(download.suggestedFilename()).toMatch(/instagram/i)
  })
})
