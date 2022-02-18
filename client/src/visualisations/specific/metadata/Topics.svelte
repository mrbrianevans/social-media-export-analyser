<script lang='ts'>
  import { GetTopicsOptions } from 'fast-topics/dist/GetTopicsOptions'
  import Scroller from './Scroller.svelte'
  import ContentTabs from '../../layouts/ContentTabs.svelte'
  import OneLineList from '../../lists/OneLineList.svelte'

  export let documents: string[]
  export let options: GetTopicsOptions
  export let topics
  export let mainComponent // this renders data items
  export let data // this should be an array
  let tabs
  // uncomment this to render OneLineList of documents instead of the component
  // $: tabs = Object.entries(topics.topics)
  //   .map(([topic, words])=>({
  //     label:`Topic #${topic}`,
  //     component: OneLineList,
  //     props: {
  //       data: Object.entries(topics.docs)
  //         .filter(([idx, doc])=>doc.some(docTopic=>docTopic.topic == topic))
  //         .sort((a, b) => b[1].find(t => t.topic == topic)?.rank - a[1].find(t => t.topic == topic)?.rank)
  //         .map(([idx, doc])=>({ doc: documents[idx], rank: doc.find(t=>t.topic==topic)?.rank??0 }))
  //         .map(doc=>`${doc.doc} (${(doc.rank*100).toFixed(2)}% topic match)`),
  //       heading: 'Main words: '+words.map(w=>w.word).join(', ')
  //     }
  //   }))
  $: tabs = Object.entries(topics.topics)
    .map(([topic, words]) => ({
      label: `Topic ${parseInt(topic) + 1} (${words.map(w => w.word).slice(0, 3).join(', ')})`,
      component: mainComponent,
      props: {
        data: Object.entries(topics.docs)
          .filter(([idx, doc]) => doc.some(docTopic => docTopic.topic == topic))
          // sort by most relevant to topic
          .sort((a, b) => b[1].find(t => t.topic == topic)?.rank - a[1].find(t => t.topic == topic)?.rank)
          .map(([idx, doc]) => (data[idx]))
      }
    }))

</script>


<div>
  <Scroller>

    <!--{#await topicsPromise}-->
    <!--    <p>Loading topics</p>-->
    <!--    {:then topics}-->
    <h3>Topics</h3>
    <ContentTabs tabs={tabs} />
    <!--{/await}-->
  </Scroller>
</div>
