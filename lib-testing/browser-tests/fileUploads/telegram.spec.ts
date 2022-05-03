import { expect, test } from '@playwright/test'
import { getArtifactPath, getVideoDir } from '../getArtifactDirectory'
import { demoFilePath } from '../../generateDemoFiles'
import * as fs from 'fs'
import { testWithDemoFiles } from './testWithDemoFiles'

test.describe('upload telegram file', function () {
  test('upload single telegram file', async function ({ browser }) {
    await testWithDemoFiles(browser, 'telegram', __filename)
  })
})
