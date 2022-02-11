import { expect, test } from '@playwright/test'
import { getArtifactPath } from '../getArtifactDirectory'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5000')
})

test.describe('change theme from default', function () {
  test('should startup with light theme by default', async function ({ page }) {
    // should be at light theme on startup in a new context
    await page.screenshot({
      path: getArtifactPath(__filename, 'theme-onload.png')
    })
    await expect(page.locator('main')).toHaveAttribute('theme', 'light')
  })

  test('should change to dark theme when toggle button clicked', async function ({
    page
  }) {
    // press the theme toggle button
    await page.click('#theme-toggle')
    // should be dark theme now
    await page.screenshot({
      path: getArtifactPath(__filename, 'theme-after-toggled.png')
    })
    //get value from localStorage
    const darkTheme = await page.evaluate(() =>
      localStorage.getItem('darkTheme')
    )
    expect(darkTheme).toBe('true') // should have set darkTheme to 'true'

    await expect(page.locator('main')).toHaveAttribute('theme', 'dark')
  })
})
