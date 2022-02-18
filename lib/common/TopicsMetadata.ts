import { WellKnownMetadata } from '../typedefs/PreProcess'
import winkNLP from 'wink-nlp'
import model from 'wink-eng-lite-web-model'

const nlp = winkNLP(model)
const { its, as } = nlp

/**
 * Get the topics metadata for a document set. This normalises tokens in the
 * documents, converting words to their lemma.
 * @param documents - array of strings, these are the documents to extract topics from.
 * @example
 * ```ts
 * input.preProcessedOutput.metadata.topics = TopicsMetadata(input.preProcessedOutput.data.map(t=\>t.text))
 * ```
 */
export function TopicsMetadata(
  documents: string[]
): WellKnownMetadata['topics'] {
  // can't do effective analysis on less than 10 documents, and more than 5000 takes too long
  if (documents.length > 10 && documents.length < 5000) {
    return {
      // normalise documents
      documents: documents.map((d) =>
        nlp.readDoc(d).tokens().out(its.lemma).join(' ')
      ),
      options: {
        numberOfTopics: 5,
        docsMinTopicRank: 0.7,
        topicsMinWordRank: 0.04
      }
    }
  } else {
    return undefined
  }
}
