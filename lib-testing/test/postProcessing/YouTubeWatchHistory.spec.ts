import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import Assert = require('assert-js')
import { processYouTubeWatchHistory } from '../../../lib/vendors/google/youtube/YouTubeWatchHistory'
import { load } from 'cheerio'

describe('post process YouTube watch history HTML file', function () {
  it('should categorise youtube watch history correctly based on filename and type', function () {
    const category = postProcessingCategoriser({
      preProcessingCategory: 'html',
      fileType: 'text/html',
      filename: 'watch-history.html',
      filepath: 'watch-history.html',
      preProcessedOutput: {
        data: {},
        title: 'Youtube watch history',
        metadata: {}
      }
    })
    Assert.equal(category, 'YouTubeWatchHistoryPostProcess')
  })

  it('should extract correct information from youtube watch history html dom', function () {
    const html = `<html><head></head><body><div class='mdl-grid'>
<div class="outer-cell mdl-cell mdl-cell--12-col mdl-shadow--2dp"><div class="mdl-grid"><div class="header-cell mdl-cell mdl-cell--12-col"><p class="mdl-typography--title">YouTube<br></p></div><div class="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1">Watched&nbsp;<a href="https://www.youtube.com/watch?v=hDFHzpO5yC4">Video Title</a><br><a href="https://www.youtube.com/channel/UCNeRPfMPgW0Wo4To6ILWaZA">Chase Quality</a><br>Apr 11, 2022, 9:15:24 PM BST</div><div class="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1 mdl-typography--text-right"></div><div class="content-cell mdl-cell mdl-cell--12-col mdl-typography--caption"><b>Products:</b><br>&emsp;YouTube<br></div></div></div>
</div></body></html>`
    const doc = load(html)
    const out = processYouTubeWatchHistory({
      preProcessingCategory: 'html',
      fileType: 'text/html',
      filename: 'watch-history.html',
      filepath: 'watch-history.html',
      preProcessedOutput: {
        data: { doc },
        title: 'Youtube watch history',
        metadata: {}
      }
    })
    Assert.array(out.data)
    for (const item of out.data)
      Assert.hasProperties(['video', 'channel', 'date'], item)
    Assert.count(1, out.data)
    Assert.equal(out.data[0].video, 'Video Title')
    Assert.equal(out.data[0].channel, 'Chase Quality')
    Assert.equal(out.data[0].date, 'Apr 11, 2022, 9:15:24 PM BST')
  })
})
