import { expect, test } from '@playwright/test'
import { getArtifactPath, getVideoDir } from '../getArtifactDirectory'

test.describe('upload contacts files', function () {
  test('upload contacts csv file', async function ({ browser }) {
    // video recording of this test
    const page = await browser.newPage({
      recordVideo: { dir: getVideoDir(__filename) }
    })
    await page.goto('/')
    await page.screenshot({
      path: getArtifactPath(__filename, 'before-upload')
    })
    await page
      .locator('input[type=file]')
      .setInputFiles('../../demo-files/contacts/contacts.csv')
    await expect(
      page
        .locator('vaadin-tabs.file-explorer-tabs vaadin-tab span')
        // index 1 because home tab is first
        .nth(1)
    ).toHaveText(/contacts/i)
    await page.screenshot({ path: getArtifactPath(__filename, 'after-upload') })
    await page.context().close() // close context to save video
    await page
      .video()
      .saveAs(getArtifactPath(__filename, 'upload-contacts.webm'))
    await page.video().delete() // delete the random path
  })

  test('upload contacts csv file in dark mode', async function ({ page }) {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await page
      .locator('input[type=file]')
      .setInputFiles('../../demo-files/contacts/contacts.csv')
    await expect(
      page
        .locator('vaadin-tabs.file-explorer-tabs vaadin-tab span')
        // index 1 because home tab is first
        .nth(1)
    ).toHaveText(/contacts/i)
    await page.screenshot({
      path: getArtifactPath(__filename, 'after-upload-dark')
    })
  })
})
