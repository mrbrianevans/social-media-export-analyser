import { YoutubeWatchSearchHistoryLinkedProcessor } from './processors/youtubeWatchSearchHistory'
import type { ComponentName } from '../typedefs/Components'
import type { ProcessedFile } from '../processFileContent'
import type { PostProcessorCategory } from '../postProcessing/postProcessingCategoriser'

// every time a new file is added, check if there is the right combination for this list

export type LinkedProcessor = (
  /**
   * an array of PostProcessedOutputs of the matching data sources
   */
  inputs: ProcessedFile[]
) => ProcessedFile | null

interface LinkedDataSource {
  linker: LinkedProcessor
  requiredPostprocessorCodes: PostProcessorCategory[]
  component: ComponentName
}

export const linkedDataSources: LinkedDataSource[] = [
  // the necessary postprocessed data sources, the linker (which is a post processor itself)
  {
    requiredPostprocessorCodes: [
      'YouTubeWatchHistoryPostProcess',
      'YouTubeSearchHistoryPostProcess'
    ],
    linker: YoutubeWatchSearchHistoryLinkedProcessor,
    component: 'YouTubeSearchAndWatchHistory'
  }
]

export function linkDataSource(
  dataSource: ProcessedFile,
  dataSources: ProcessedFile[]
): ProcessedFile[] {
  console.log('Finding links between datasources')
  const links = []
  linkers: for (const linkedDataSource of linkedDataSources) {
    console.log('testing linker:', linkedDataSource.component)
    if (
      !linkedDataSource.requiredPostprocessorCodes.includes(
        dataSource.metadata.postProcessingCategory
      )
    ) {
      // requirements don't include the new data source
      continue
    }

    for (const requirement of linkedDataSource.requiredPostprocessorCodes) {
      if (
        dataSources.every(
          (ds) => ds.metadata.postProcessingCategory !== requirement
        ) &&
        dataSource.metadata.postProcessingCategory !== requirement
      ) {
        // this requirement is not met
        continue linkers
      }
    }
    // requirements are met
    links.push(
      linkedDataSource.linker(
        dataSources
          .filter((d) =>
            linkedDataSource.requiredPostprocessorCodes.includes(
              d.metadata.postProcessingCategory
            )
          )
          .concat(dataSource)
      )
    )
  }
  return links
}
