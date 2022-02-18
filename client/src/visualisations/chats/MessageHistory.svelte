<script lang='ts'>
  import '@vaadin/message-list/vaadin-message-list'
  import { onMount } from 'svelte'
  import type { VaadinMessageHistoryFormat } from '../../../../lib/typedefs/Components'

  export let data: VaadinMessageHistoryFormat = []
  let messageListElement
  let mounted = false
  onMount(() => {
    mounted = true
  })
  let timeFormatter = Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'medium' })
  $: if (mounted && messageListElement) {
    messageListElement.items = data.filter(m => m).map(m => ({
      ...m,
      time: timeFormatter.format(new Date(m.time))
    }))
  }

</script>

<vaadin-message-list bind:this={messageListElement}></vaadin-message-list>

<style global>
    vaadin-message-list::part(list) {
        /*background: #FF8B8B;*/
    }
</style>
