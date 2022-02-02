async function processFile() {
  console.log('File uploaded!')
  const { default: winkNLP } = await import('https://cdn.skypack.dev/wink-nlp')
  const { default: model } = await import(
    'https://cdn.skypack.dev/wink-eng-lite-web-model'
  )
  const nlp = winkNLP(model)
  const { its, as } = nlp

  const fileUpload = document.getElementById('fileupload')
  const text = await fileUpload.files[0].text()
  const { name } = fileUpload.files[0]
  console.log(text.length, 'characters in uploaded text')

  const elem = document.createElement('div')
  elem.innerText = text.slice(0, 10000)
  document.querySelector('body').appendChild(elem)

  console.time('Read ' + name)
  const doc = nlp.readDoc(text)
  console.timeEnd('Read ' + name)
  console.log(
    'Read %s tokens, %s entities',
    doc.tokens().length().toLocaleString(),
    doc.entities().length().toLocaleString()
  )

  for (let i = 0; i < 19; i++) {
    const token = doc.tokens().itemAt(i)
    console.log(token.out(), token.out(its.stem), token.out(its.pos))
  }
  for (let i = 0; i < 19; i++) {
    const sentence = doc.sentences().itemAt(i)
    const stemmedSentence = sentence.tokens().out(its.stem, as.set)
    console.log(
      sentence.out(),
      sentence.out(its.sentiment),
      sentence.out(its.span),
      stemmedSentence
    )
  }
}
