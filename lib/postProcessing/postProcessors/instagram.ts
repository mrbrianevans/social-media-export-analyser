import { PostProcess, PostProcessedFileInput } from '../../typedefs/PostProcess'
import { instagramConnectionsPostProcessingFunction } from '../../vendors/instagram/Connections'
import { instagramCommentsPostProcessingFunction } from '../../vendors/instagram/Comments'
import { instagramLikesPostProcessFunction } from '../../vendors/instagram/Likes'
import { instagramAccountHistoryPostProcessor } from '../../vendors/instagram/AccountHistory'
import {
  instagramMediaPostProcessFunction,
  Media
} from '../../vendors/instagram/Media'

export const InstagramPostsPostProcess: PostProcess = {
  classifier: {
    fileTypes: ['application/json'],
    filenameRegex: /^media\.json$/,
    topLevelIsArray: false,
    itemCriteria: { keys: ['photos', 'videos', 'stories', 'profile'] },
    preProcessingCategory: 'json'
  },
  component: 'InstagramPostsList',
  name: 'Instagram Posts',
  code: 'instagram-posts',
  vendor: 'Instagram',
  postProcessingFunction: instagramMediaPostProcessFunction
}

export const InstagramProfilePostProcess: PostProcess = {
  classifier: {
    filenameRegex: /^profile\.json$/,
    topLevelIsArray: false,
    itemCriteria: { keys: ['username', 'biography', 'name'] }, // there are more
    preProcessingCategory: 'json'
  },
  component: 'InstagramProfile',
  name: 'Instagram Profile',
  nameFormat: 'Instagram Profile for {}',
  code: 'instagram-profile',
  vendor: 'Instagram'
}

export const InstagramLikesPostProcess: PostProcess = {
  classifier: {
    filenameRegex: /^likes\.json$/,
    topLevelIsArray: false,
    itemCriteria: {
      keys: ['media_likes', 'comment_likes'],
      minDepth: 3,
      maxDepth: 3
    },
    preProcessingCategory: 'json'
  },
  component: 'InstagramLikes',
  name: 'Instagram Likes',
  code: 'instagram-likes',
  vendor: 'Instagram',
  postProcessingFunction: instagramLikesPostProcessFunction
}

export const InstagramConnectionsPostProcess: PostProcess = {
  classifier: {
    filenameRegex: /^connections\.json$/,
    topLevelIsArray: false,
    itemCriteria: {
      keys: [
        // these keys appear in some files, but not all.
        // 'dismissed_suggested_users',
        // 'follow_requests_sent',
        // 'close_friends',
        // 'hide_stories_from',
        // 'blocked_users',
        'following',
        'followers'
      ],
      minDepth: 2,
      maxDepth: 2
    },
    preProcessingCategory: 'json'
  },
  component: 'InstagramConnections',
  name: 'Instagram Connections',
  code: 'instagram-connections',
  vendor: 'Instagram',
  postProcessingFunction: instagramConnectionsPostProcessingFunction
}

export const InstagramCommentsPostProcess: PostProcess = {
  classifier: {
    filenameRegex: /^comments\.json$/,
    topLevelIsArray: false,
    itemCriteria: {
      keys: ['media_comments'],
      minDepth: 3,
      maxDepth: 3
    }
  },
  code: 'instagram-comments',
  name: 'Instagram Comments',
  vendor: 'Instagram',
  component: 'InstagramComments',
  postProcessingFunction: instagramCommentsPostProcessingFunction
}

export const InstagramAccountHistoryPostProcess: PostProcess = {
  classifier: {
    filenameRegex: /^account_history\.json$/,
    topLevelIsArray: false,
    itemCriteria: { keys: ['login_history'] }
  },
  name: 'Instagram Account History',
  vendor: 'Instagram',
  code: 'instagram-account-history',
  component: 'VaadinGrid',
  postProcessingFunction: instagramAccountHistoryPostProcessor
}

export const InstagramInformationAboutYouPostProcess: PostProcess = {
  classifier: {
    filenameRegex: /^information_about_you\.json$/,
    topLevelIsArray: false,
    itemCriteria: { keys: ['primary_location', 'inferred_emails'] }
  },
  name: 'Instagram Information About You',
  vendor: 'Instagram',
  code: 'instagram-information-about-you',
  component: 'KeyValueCard'
}
