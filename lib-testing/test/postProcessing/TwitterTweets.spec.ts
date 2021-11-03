import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import * as Assert from 'assert'

describe('post process twitter tweets', function () {
  it('should categorise tweet data based on object keys if file renamed', function () {
    const category = postProcessingCategoriser({
      fileType: 'application/javascipt',
      preProcessingCategory: 'twitterJs',
      filename: 'renamed',
      preProcessedOutput: {
        data: tweets,
        metadata: {},
        title: 'renamed tweets'
      }
    })
    Assert.equal(category, 'TwitterTweetsPostProcess')
  })
  it('should categorise tweet data based on filename and type', function () {
    const category = postProcessingCategoriser({
      fileType: 'application/javascript',
      preProcessingCategory: 'twitterJs',
      filename: 'tweet.js',
      preProcessedOutput: {
        data: [],
        metadata: {},
        title: 'renamed tweets'
      }
    })
    Assert.equal(category, 'TwitterTweetsPostProcess')
  })
})

const tweets = [
  {
    created_at: 'Thu Oct 14 16:30:35 -0100 2021',
    display_text_range: ['0', '126'],
    entities: {
      hashtags: [],
      symbols: [],
      urls: [],
      user_mentions: []
    },
    favorite_count: '2',
    favorited: false,
    full_text:
      'Favorite direct favorite favorite blog favorite like blog today little little blog like post day detail today today favorite🏀',
    id: '224859591',
    id_str: '224859591',
    lang: 'en',
    retweet_count: '3',
    retweeted: false,
    source:
      '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
    truncated: false
  },
  {
    created_at: 'Sat Oct 16 10:24:22 -0100 2021',
    display_text_range: ['0', '93'],
    entities: {
      hashtags: [],
      symbols: [],
      urls: [],
      user_mentions: []
    },
    favorite_count: '1',
    favorited: false,
    full_text:
      'Day post link today favorite like blog look direct direct day link like like today day like🍂',
    id: '307064574',
    id_str: '307064574',
    lang: 'en',
    retweet_count: '3',
    retweeted: false,
    source:
      '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
    truncated: false
  }
]
