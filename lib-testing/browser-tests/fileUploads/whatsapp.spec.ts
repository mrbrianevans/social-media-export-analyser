import { expect, test } from '@playwright/test'
import { getArtifactPath, getVideoDir } from '../getArtifactDirectory'
import { demoFilePath } from '../../generateDemoFiles'
import * as fs from 'fs'
import { testWithDemoFiles } from './testWithDemoFiles'

test.describe('upload whatsapp file', function () {
  test('upload single whatsapp file', async function ({ browser }) {
    await testWithDemoFiles(browser, 'whatsapp', __filename)
  })
})
