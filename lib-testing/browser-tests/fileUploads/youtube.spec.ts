import { expect, test } from '@playwright/test'
import { getArtifactPath, getVideoDir } from '../getArtifactDirectory'
import { demoFilePath } from '../../generateDemoFiles'
import * as fs from 'fs'
import { testWithDemoFiles } from './testWithDemoFiles'

test.describe('upload youtube file', function () {
  test('upload single youtube file', async function ({ browser }) {
    await testWithDemoFiles(browser, 'youtube', __filename)
  })
})
