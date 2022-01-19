import { PreProcessor } from '../../typedefs/PreProcess'
import { snakeCase } from 'snake-case'
import camelcase from 'camelcase'
import { arrayEquals } from '../../common/ArrayUtils'

export const twitterJsPreProcessor: PreProcessor = ({
  filename,
  fileContent,
  fileType
}) => {
  const [, filenameNoExt] = filename.match(/(.*).js/)
  const snakeName = snakeCase(filenameNoExt)
  const camelName = camelcase(snakeName)
  const windowDeclaration = `const window = {YTD:{ ${snakeName}: {} }}`
  const returnWindow =
    filename === 'manifest.js'
      ? `return window.__THAR_CONFIG`
      : `return Object.values(window.YTD.${snakeName}).flat()`
  const getWindowObject = new Function(
    [windowDeclaration, fileContent, returnWindow].join(';\n')
  )
  const windowObject = getWindowObject()
  const data =
    windowObject instanceof Array
      ? windowObject.map((o) => {
          if (arrayEquals(Object.keys(o), [camelName])) {
            return o[camelName]
          } else if (Object.keys(o).length === 1) return Object.values(o)[0]
          return o
        })
      : windowObject
  return {
    metadata: {},
    title: 'JS: ' + filenameNoExt,
    data
  }
}
