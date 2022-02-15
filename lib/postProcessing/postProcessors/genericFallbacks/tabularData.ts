import { PostProcess } from '../../../typedefs/PostProcess'
import {
  arrayObjectKeys,
  findColumns,
  findDateColumns
} from '../../../common/ArrayUtils'
import { TimeSeries } from '../../../common/TimeSeriesAnalysis'

export const TabularDataPostProcess: PostProcess = {
  code: 'tabular',
  classifier: {
    filenameRegex: /.*\.(csv|json)$/,
    topLevelIsArray: true,
    itemCriteria: {
      maxDepth: 1
    }
  },
  component: 'VaadinGrid',
  postProcessingFunction(input) {
    const data = input.preProcessedOutput.data as Record<string, any>[]
    const metadata = input.preProcessedOutput.metadata
    const dateKeys = findDateColumns(data)
    console.log({ dateKeys })
    if (dateKeys.length === 1) {
      const key = dateKeys.at(0)
      metadata.ts = new TimeSeries(data.map((d) => d[key])).metadata
    }
    return {
      data,
      metadata,
      title: input.preProcessedOutput.title
    }
  }
}

export const ArrayDataPostProcess: PostProcess = {
  code: 'array',
  classifier: {
    filenameRegex: /.*\.(json)$/,
    topLevelIsArray: true,
    itemCriteria: {
      maxDepth: 0
    }
  },
  component: 'StringBox'
}
