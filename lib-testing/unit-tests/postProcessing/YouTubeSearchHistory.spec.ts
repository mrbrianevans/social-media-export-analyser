import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import Assert from 'assert-js'
import { load } from 'cheerio'
import { processYouTubeSearchHistory } from '../../../lib/vendors/google/youtube/YouTubeSearchHistory'

describe('post process YouTube watch history HTML file', function () {
  it('should categorise youtube search history correctly based on filename and type', function () {
    const category = postProcessingCategoriser({
      preProcessingCategory: 'html',
      fileType: 'text/html',
      filename: 'search-history.html',
      filepath: 'search-history.html',
      preProcessedOutput: {
        data: {},
        title: 'Youtube search history',
        metadata: {}
      }
    })
    Assert.equal(category, 'YouTubeSearchHistoryPostProcess')
  })

  it('should extract correct information from youtube search history html dom', function () {
    const html = `<html><head></head><body><div class='mdl-grid'>
<div class="outer-cell mdl-cell mdl-cell--12-col mdl-shadow--2dp"><div class="mdl-grid"><div class="header-cell mdl-cell mdl-cell--12-col"><p class="mdl-typography--title">YouTube<br></p></div><div class="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1">Searched for&nbsp;<a href="https://www.youtube.com/results?search_query=docker+compose+volumes">docker compose volumes</a><br>May 13, 2019, 10:14:51 PM BST</div><div class="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1 mdl-typography--text-right"></div><div class="content-cell mdl-cell mdl-cell--12-col mdl-typography--caption"><b>Products:</b><br>&emsp;YouTube<br></div></div></div>
<div class="outer-cell mdl-cell mdl-cell--12-col mdl-shadow--2dp"><div class="mdl-grid"><div class="header-cell mdl-cell mdl-cell--12-col"><p class="mdl-typography--title">YouTube<br></p></div><div class="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1">Searched for&nbsp;<a href="https://www.youtube.com/results?search_query=web+workers+javascript">web workers javascript</a><br>Jul 16, 2020, 11:56:25 PM BST</div><div class="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1 mdl-typography--text-right"></div><div class="content-cell mdl-cell mdl-cell--12-col mdl-typography--caption"><b>Products:</b><br>&emsp;YouTube<br></div></div></div>
</div></body></html>`
    const doc = load(html)
    const out = processYouTubeSearchHistory({
      preProcessingCategory: 'html',
      fileType: 'text/html',
      filename: 'search-history.html',
      filepath: 'search-history.html',
      preProcessedOutput: {
        data: { doc },
        title: 'Youtube search history',
        metadata: {}
      }
    })
    // should be an array of 2 objects with the correct properties
    Assert.array(out.data)
    for (const item of out.data)
      Assert.hasProperties(['searchTerm', 'date'], item)
    Assert.count(2, out.data)
    // test specific values
    Assert.equal(out.data[0].searchTerm, 'docker compose volumes')
    Assert.equal(out.data[0].date, 'May 13, 2019, 10:14:51 PM BST')
    Assert.equal(out.data[1].searchTerm, 'web workers javascript')
    Assert.equal(out.data[1].date, 'Jul 16, 2020, 11:56:25 PM BST')
  })
})
