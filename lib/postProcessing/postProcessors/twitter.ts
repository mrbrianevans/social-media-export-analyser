import { PostProcess } from '../../typedefs/PostProcess'

export const TwitterProfilePostProcess: PostProcess = {
  name: 'Twitter Profile',
  code: 'twitter-profile',
  nameFormat: 'Twitter profile @{handle}',
  vendor: 'Twitter',
  classifier: {
    fileTypes: ['application/javascript'],
    preProcessingCategory: 'twitterJs',
    filenameRegex: /^profile\.js$/,
    topLevelIsArray: false,
    itemCriteria: { keys: ['handle'] } // not real, needs to be checked
  },

  component: 'JsonEditor'
}

export const TwitterTweetsPostProcess: PostProcess = {
  name: 'Twitter Tweets',
  code: 'twitter-tweets',
  nameFormat: '{qty} tweets on Twitter',
  vendor: 'Twitter',
  classifier: {
    fileTypes: ['application/javascript'],
    preProcessingCategory: 'twitterJs',
    filenameRegex: /^tweet\.js$/,
    topLevelIsArray: true
  },
  component: 'VaadinGrid'
}

export const TwitterFallbackPostProcess: PostProcess = {
  name: 'Twitter file',
  code: 'twitter-fallback',
  nameFormat: '{filename}',
  vendor: 'Twitter',
  classifier: {
    fileTypes: ['application/javascript'],
    preProcessingCategory: 'twitterJs',
    filenameRegex: /^.*\.js$/,
    topLevelIsArray: true
  },
  component: 'VaadinGrid'
}

export const TwitterManifestPostProcess: PostProcess = {
  name: 'Twitter manifest',
  code: 'twitter-manifest',
  vendor: 'Twitter',
  classifier: {
    fileTypes: ['application/javascript'],
    preProcessingCategory: 'twitterJs',
    filenameRegex: /^manifest\.js$/,
    topLevelIsArray: false
  },
  component: 'JsonEditor'
}
