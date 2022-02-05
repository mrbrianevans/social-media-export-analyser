import { normalisePath, onlyFilename } from '../../../lib/common/PathProcessing'
import Assert from 'assert-js'

describe('test path processing utils functions', function () {
  it('should normalise a windows style file path', function () {
    const path = `C:\\\\Users\\\\abc\\\\Documents\\\\file.txt`
    const normalisedPath = normalisePath(path)
    Assert.equal(normalisedPath, 'C:/Users/abc/Documents/file.txt')
  })

  it('should get the filename of a windows style path', function () {
    const path = `C:\\Users\\abc\\Documents\\file.txt`
    const normalisedPath = onlyFilename(path)
    Assert.equal(normalisedPath, 'file.txt')
  })

  it('should get only the filename with a leading slash and directory', function () {
    const path = `/photos/file.txt`
    const normalisedPath = onlyFilename(path)
    Assert.equal(normalisedPath, 'file.txt')
  })

  it('should get only the filename with a leading slash', function () {
    const path = `/file.txt`
    const normalisedPath = onlyFilename(path)
    Assert.equal(normalisedPath, 'file.txt')
  })
})
