import { expect, test } from '@playwright/test'
import { getArtifactPath, getVideoDir } from '../getArtifactDirectory'
import { demoFilePath } from '../../generateDemoFiles'
import * as fs from 'fs'

test.describe('upload instagram files', function () {
  test('upload single instagram file', async function ({ page }) {
    await page.goto('/')
    const tabs = page.locator('vaadin-tabs.file-explorer-tabs vaadin-tab span')
    await page
      .locator('input[type=file]')
      .setInputFiles(demoFilePath('instagram/media.json'))
    await expect(tabs.first()).toHaveText(/instagram/i)
    await page.screenshot({
      path: getArtifactPath(__filename, 'uploaded-posts')
    })
  })

  test('upload of multiple instagram files', async function ({ browser }) {
    // video recording of this test
    const page = await browser.newPage({
      recordVideo: { dir: getVideoDir(__filename) }
    })
    await page.goto('/')
    await page.screenshot({
      path: getArtifactPath(__filename, 'before-upload')
    })
    const tabs = page.locator('vaadin-tabs.file-explorer-tabs vaadin-tab span')
    const files = fs.readdirSync(demoFilePath('instagram'))
    await page
      .locator('input[type=file]')
      .setInputFiles(files.map((file) => demoFilePath(`instagram/${file}`)))
    await expect(tabs.nth(files.length - 1)).toHaveText(/instagram/i)
    // screenshot after uploading files
    await page.screenshot({ path: getArtifactPath(__filename, 'after-upload') })
    const visualisationTabs = page.locator(
      'main vaadin-app-layout div div vaadin-tabs vaadin-tab span'
    )
    // screenshot each file tab
    const count = await tabs.count()
    for (let i = 0; i < count; i++) {
      const tab = await tabs.nth(i).textContent()
      await tabs.nth(i).click() // click on tab
      const visualisations = await visualisationTabs.count()
      for (let j = 0; j < visualisations; j++) {
        const visualisation = await visualisationTabs.nth(j).textContent()
        await visualisationTabs.nth(j).click()
        await page.waitForSelector('.component-container', { timeout: 3000 })
        await page.screenshot({
          path: getArtifactPath(
            __filename,
            'tabs/' + tab + '/visualisation-' + visualisation + '.jpg'
          )
        })
      }
    }

    await page.context().close() // close context to save video
    await page
      .video()
      .saveAs(getArtifactPath(__filename, 'upload-instagram.webm'))
    await page.video().delete() // delete the random path
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
