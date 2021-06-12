import * as fs from 'fs'
import * as dree from 'dree'

const analyseFolder = (absolutePath: string) => {
  const tree = dree.scan(absolutePath, {
    extensions: ['csv', 'json'],
    exclude: /Google Play Music/,
    normalize: true,
    size: true,
    sizeInBytes: true
  })
  console.log('Found these files: ', dree.parseTree(tree))
  console.log('object size', tree.size)
  tree.children.forEach((tld) => {
    console.log(' -', tld.name)
    if (tld.name.match(/maps/i)) {
      const reviewsMetadata = tld.children.find((file) =>
        file.name.match(/reviews/i)
      )
      console.log(reviewsMetadata)
      const reviews = JSON.parse(
        fs.readFileSync(reviewsMetadata.path, { encoding: 'utf8' })
      )
      console.log(reviews.features)
    }
  })
}

const directory = process.argv[2]
if (directory) {
  analyseFolder(process.argv[2])
} else {
  console.log('Please supply directory to scan')
}
