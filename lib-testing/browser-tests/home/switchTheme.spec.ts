import { expect, test } from '@playwright/test'
import { getArtifactPath } from '../getArtifactDirectory'

test.describe('change theme from default', function () {
  test('should startup with light theme by default', async function ({ page }) {
    await page.goto('/')
    // should be at light theme on startup in a new context
    await page.screenshot({
      path: getArtifactPath(__filename, 'theme-onload.png')
    })
    await expect(page.locator('main')).toHaveAttribute('theme', 'light')
  })

  test('should change to dark theme when toggle button clicked', async function ({
    page
  }) {
    await page.goto('/')
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

    await page.reload()
    // should persist after reload due to local storage
    await expect(page.locator('main')).toHaveAttribute('theme', 'dark')
  })

  test('should get dark theme preference from media query', async function ({
    page
  }) {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('main')).toHaveAttribute('theme', 'dark')
  })
  test('should get light theme preference from media query', async function ({
    page
  }) {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    await expect(page.locator('main')).toHaveAttribute('theme', 'light')
  })
})
