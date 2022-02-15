import { expect, test } from '@playwright/test'
import { demoFilePath } from '../../generateDemoFiles'
import { getArtifactPath } from '../getArtifactDirectory'

test.describe('website footer', function () {
  test('footer should be after content when a file is uploaded', async function ({
    page
  }) {
    await page.goto('/')
    // upload test file
    await page
      .locator('input[type=file]')
      .setInputFiles(demoFilePath('instagram/media.json'))

    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await page.waitForLoadState('networkidle')
    await page.screenshot({ path: getArtifactPath(__filename, 'whole-page') })
    await footer.screenshot({ path: getArtifactPath(__filename, 'footer') })
    await page.click('#theme-toggle')
    await page.screenshot({
      path: getArtifactPath(__filename, 'whole-page-dark')
    })
    await footer.screenshot({
      path: getArtifactPath(__filename, 'footer-dark')
    })
    await expect(footer).toHaveText(/version/i, { useInnerText: true })
  })
})
