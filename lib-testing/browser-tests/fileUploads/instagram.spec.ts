import { expect, test } from '@playwright/test'
import { getArtifactPath, getVideoDir } from '../getArtifactDirectory'
import { demoFilePath } from '../../generateDemoFiles'
import * as fs from 'fs'
import { testWithDemoFiles } from './testWithDemoFiles'

test.describe('upload instagram files', function () {
  test('upload single instagram file', async function ({ page }) {
    await page.goto('/')
    const tabs = page.locator('vaadin-tabs.file-explorer-tabs vaadin-tab span')
    await page
      .locator('input[type=file]')
      .setInputFiles(demoFilePath('instagram/media.json'))
    // index 1 because home tab is first
    await expect(tabs.nth(1)).toHaveText(/instagram/i)
    await page.screenshot({
      path: getArtifactPath(__filename, 'uploaded-posts')
    })
  })

  test('upload of multiple instagram files', async function ({ browser }) {
    await testWithDemoFiles(browser, 'instagram', __filename)
  })

  test('upload instagram files in dark mode', async function ({ page }) {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    const tabs = page.locator('vaadin-tabs.file-explorer-tabs vaadin-tab span')
    const files = fs.readdirSync(demoFilePath('instagram'))
    await page
      .locator('input[type=file]')
      .setInputFiles(files.map((file) => demoFilePath(`instagram/${file}`)))
    await expect(tabs.nth(files.length - 1)).toHaveText(/instagram/i)
    await page.screenshot({
      path: getArtifactPath(__filename, 'after-upload-dark')
    })
  })
})
