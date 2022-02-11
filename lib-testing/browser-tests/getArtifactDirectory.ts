import path from 'path'

export const outputDir = './test-results/'

/**
 * Get a path to save an artifact. Keeps them easy to find by mirroring test
 * file structure.
 * @param src__filename - this must always be `__filename`
 * @param filename - the filename of the artifact. Eg homepage.png. File extension defaults to jpg
 * @example
 * getArtifactPath(__filename, 'homepageScreenshot')
 */
export function getArtifactPath(src__filename, filename) {
  const relPath = path.relative('.', src__filename)
  if (!relPath.endsWith('.spec.ts'))
    throw new Error('Test source path does not end with .spec.ts ' + relPath)
  if (!filename.includes('.')) filename += '.jpg' // append file extension
  return path.resolve(outputDir, relPath.replace('.spec.ts', ''), filename)
}

/**
 * Get directory to save video into.
 * @param src__filename - this must always be set to __filename
 * @example
 * const page = await browser.newPage({
 *       recordVideo: { dir: getVideoDir(__filename) }
 * })
 */
export function getVideoDir(src__filename) {
  const relPath = path.relative('.', src__filename)
  if (!relPath.endsWith('.spec.ts'))
    throw new Error('Test source path does not end with .spec.ts ' + relPath)
  return path.resolve(outputDir, relPath.replace('.spec.ts', ''))
}
