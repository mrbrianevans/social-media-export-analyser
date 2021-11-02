import { PostProcess } from '../../typedefs/PostProcess'

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
  vendor: 'Instagram'
}

export const InstagramProfilePostProcess: PostProcess = {
  classifier: {
    filenameRegex: /^profile\.json$/,
    topLevelIsArray: false,
    itemCriteria: { keys: ['username', 'biography', 'name'] }, // there are more
    preProcessingCategory: 'json'
  },
  component: 'JsonEditor',
  name: 'Instagram Profile',
  nameFormat: 'Instagram Profile for {}',
  code: 'instagram-profile',
  vendor: 'Instagram'
}

export const InstagramLikesPostProcess: PostProcess = {
  classifier: {
    filenameRegex: /^profile\.json$/,
    topLevelIsArray: false,
    itemCriteria: { keys: ['media_likes', 'comment_likes'] },
    preProcessingCategory: 'json'
  },
  component: 'JsonEditor',
  name: 'Instagram Likes',
  code: 'instagram-likes',
  vendor: 'Instagram'
}
