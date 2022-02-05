import {
  InstagramLikes,
  instagramLikesPostProcessFunction
} from '../../../lib/vendors/instagram/Likes'
import { PostProcessedFileInput } from '../../../lib/typedefs/PostProcess'
import {
  getPostProcessByCode,
  postProcessingCategoriser
} from '../../../lib/postProcessing/postProcessingCategoriser'
import Assert from 'assert-js'

describe('post process instagram likes', function () {
  it('should cateogrise instagram likes based on filename', function () {
    postProcessInput.filename = 'likes.json'
    const category = postProcessingCategoriser(postProcessInput)
    Assert.equal(category, 'InstagramLikesPostProcess')
  })
  it('should cateogrise instagram likes with renamed filename based on object keys and depth', function () {
    postProcessInput.filename = 'renamed'
    const category = postProcessingCategoriser(postProcessInput)
    Assert.equal(category, 'InstagramLikesPostProcess')
  })
  it('should transform object shape in post processing', function () {
    const output = instagramLikesPostProcessFunction(postProcessInput)
    Assert.equal(output.data.length, 10)
    Assert.equal(output.data.filter((l) => l.postType === 'media').length, 5)
    Assert.equal(output.data.filter((l) => l.postType === 'comment').length, 5)
    const i = output.data.findIndex((p) => p.username === 'clark')
    Assert.equal(i, 0, `clark should be first if the list is sorted by date`)
    Assert.true(
      output.data[0].date.includes('Apr'),
      `${output.data[0].date} should be in april`
    )
    Assert.equal(output.data[0].username, 'clark')
  })
})

const filename = 'likes.json'

const data: InstagramLikes = {
  media_likes: [
    ['2020-02-17T20:23:38+00:00', 'stephenwal'],
    ['2021-03-28T21:49:48-01:00', 'anthony'],
    ['2019-04-24T16:23:53-01:00', 'helenlewis'],
    ['2020-04-21T23:34:02-01:00', 'alantho'],
    ['2020-02-18T07:37:43+00:00', 'thomaswood']
  ],
  comment_likes: [
    ['2019-04-20T08:58:54-01:00', 'clark'],
    ['2020-03-30T08:32:50-01:00', 'petgreen'],
    ['2019-06-13T05:44:27-01:00', 'robinson'],
    ['2020-09-16T03:17:34-01:00', 'philiplewis'],
    ['2019-08-13T18:42:34-01:00', 'jonathanbro']
  ]
}

const postProcessInput: PostProcessedFileInput<InstagramLikes> = {
  preProcessingCategory: 'json',
  filename,
  fileType: 'application/json',
  preProcessedOutput: {
    data,
    metadata: { keys: ['media_likes', 'comment_likes'] },
    title: filename
  }
}
