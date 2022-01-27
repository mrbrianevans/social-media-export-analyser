import {
  PostProcess,
  PostProcessedFileInput,
  PostProcessedOutput
} from '../../../typedefs/PostProcess'
import type { CheerioAPI } from 'cheerio'
import pretty from 'pretty'

export const DefaultHtmlPostProcess: PostProcess = {
  code: 'default-html',
  classifier: {
    topLevelIsArray: false,
    filenameRegex: /^.+\.html$/,
    preProcessingCategory: 'html',
    fileTypes: ['text/html']
  },
  component: 'StringBox',
  postProcessingFunction: DefaultHtmlPostProcessor,
  name: 'HTML document'
}

function DefaultHtmlPostProcessor(
  input: PostProcessedFileInput<{ doc: CheerioAPI }>
): PostProcessedOutput<{ text: string }> {
  console.time('Convert JS object to html string')
  const html = input.preProcessedOutput.data.doc.html()
  console.timeEnd('Convert JS object to html string')
  // pretty print - takes 5x the time of writing an unformatted HTML doc
  console.time('Format HTML string')
  const text = pretty(html, { ocd: true })
  console.timeEnd('Format HTML string')
  return {
    data: { text },
    title: input.filename,
    metadata: { ...input.preProcessedOutput.metadata }
  }
}
