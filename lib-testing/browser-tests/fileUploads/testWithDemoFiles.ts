import { getArtifactPath, getVideoDir } from '../getArtifactDirectory'
import fs from 'fs'
import { demoFilePath } from '../../generateDemoFiles'
import { Browser, expect } from '@playwright/test'

export async function testWithDemoFiles(
  browser: Browser,
  directory: string,
  filename
) {
  // video recording of this test
  const page = await browser.newPage({
    recordVideo: {
      dir: getVideoDir(filename),
      size: { width: 1920, height: 1080 }
    },
    screen: { width: 1920, height: 1080 },
    viewport: { width: 1920, height: 1080 }
  })
  await page.goto('/')
  const tabs = page.locator('vaadin-tabs.file-explorer-tabs vaadin-tab span')
  const files = fs.readdirSync(demoFilePath(directory))
  await page
    .locator('input[type=file]')
    .setInputFiles(files.map((file) => demoFilePath(`${directory}/${file}`)))
  await expect(tabs.nth(files.length)).toHaveText(
    new RegExp('^' + directory, 'i')
  )
  // screenshot after uploading files
  await page.screenshot({ path: getArtifactPath(filename, 'after-upload') })
  const visualisationTabs = page.locator(
    'main vaadin-app-layout div vaadin-vertical-layout vaadin-tabs vaadin-tab span'
  )
  // screenshot each file tab
  const count = await tabs.count()
  for (let i = 0; i < count; i++) {
    const tab = await tabs.nth(i).textContent()
    await tabs.nth(i).click() // click on tab
    const visualisations = await visualisationTabs.count()
    for (let j = 0; j < visualisations; j++) {
      const visualisation = await visualisationTabs.nth(j).textContent()
      const disabled = await visualisationTabs.nth(j).isDisabled()
      if (disabled) continue
      await visualisationTabs.nth(j).click()
      await page.waitForSelector('.component-container', { timeout: 3000 })
      if (await page.locator('#ts-chart-container').isVisible())
        await page.waitForTimeout(500) // for charts to load animations
      await page.screenshot({
        path: getArtifactPath(
          filename,
          'tabs/' + tab + '/visualisation-' + visualisation + '.jpg'
        )
      })
      if (!(await page.locator('footer').isVisible())) {
        await page.locator('footer').scrollIntoViewIfNeeded() // scroll to bottom
        await page.screenshot({
          path: getArtifactPath(
            filename,
            'tabs/' +
              tab +
              '/visualisation-' +
              visualisation +
              '-bottom' +
              '.jpg'
          )
        })
      }
    }
  }

  await page.context().close() // close context to save video
  await page
    .video()
    .saveAs(getArtifactPath(filename, `upload-${directory}.webm`))
  await page.video().delete() // delete the random path
}
