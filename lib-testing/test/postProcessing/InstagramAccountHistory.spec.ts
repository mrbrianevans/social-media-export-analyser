import { PostProcessedFileInput } from '../../../lib/typedefs/PostProcess'
import {
  InstagramAccountHistory,
  instagramAccountHistoryPostProcessor
} from '../../../lib/vendors/instagram/AccountHistory'
import { postProcessingCategoriser } from '../../../lib/postProcessing/postProcessingCategoriser'
import * as Assert from 'assert-js'

describe('post process instagram account history', function () {
  it('should classify file as instagram account history based on filename', function () {
    postProcessInput.filename = filename
    const category = postProcessingCategoriser(postProcessInput)
    Assert.equal(category, 'InstagramAccountHistoryPostProcess')
  })
  it('should classify file as instagram account history based on object keys if filename renamed', function () {
    postProcessInput.filename = 'filename'
    const category = postProcessingCategoriser(postProcessInput)
    Assert.equal(category, 'InstagramAccountHistoryPostProcess')
  })

  it('should transform data in post processing', function () {
    const output = instagramAccountHistoryPostProcessor(postProcessInput)
    Assert.equal(output.data.length, 2)
    Assert.equal(output.data[0].language, 'German')
    Assert.equal(output.data[1].language, 'German')
    Assert.true(
      output.data[0].timestamp.includes('Feb'),
      'Wrong timestamp conversion: ' + output.data[0].timestamp
    )
    Assert.true(
      output.data[1].timestamp.includes('Mar'),
      'Wrong timestamp conversion: ' + output.data[1].timestamp
    )
    Assert.true(
      output.data[0].device.includes('Android'),
      'Wrong user agent to device conversion: ' + output.data[0].device
    )
    Assert.true(
      output.data[1].device.includes('Ubuntu'),
      'Wrong user agent to device conversion: ' + output.data[1].device
    )
    Assert.equal(output.data[0].ipAddress, '925.972.253.95')
    Assert.equal(output.data[1].ipAddress, '662.293.240.689')
  })
})

// test data
const filename = 'account_history.json',
  fileType = 'application/json'
const data = {
  login_history: [
    {
      user_agent:
        'Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36',
      timestamp: '2020-02-05T17:46:52+00:00',
      language_code: 'de',
      ip_address: '925.972.253.95',
      cookie_name: '*************************lf9',
      device_id: '78e437-8d9538-0dbbfd'
    },
    {
      user_agent:
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
      timestamp: '2019-03-21T12:15:37+00:00',
      language_code: 'de',
      ip_address: '662.293.240.689',
      cookie_name: '*************************u70',
      device_id: 'a498a4-8781e3-e28c37'
    }
  ]
}
const postProcessInput: PostProcessedFileInput<InstagramAccountHistory> = {
  filename,
  fileType,
  preProcessingCategory: 'json',
  preProcessedOutput: {
    title: filename,
    metadata: { keys: ['login_history'] },
    data
  }
}
