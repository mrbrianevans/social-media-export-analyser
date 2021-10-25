<script lang="ts">
  import '@vaadin/message-list';
  import { onMount } from 'svelte';

  export let data: { time: string; text: string; userName: string }[] = []
  let mounted = false
  onMount(() => {
    mounted = true
  });
  $: if(mounted) {
      console.log('updating the messages')
      document.querySelector('vaadin-message-list').items = data
  }

</script>

<div class='container'>
  <p>Whatsapp history</p>
  <vaadin-message-list></vaadin-message-list>
</div>

<style>
  .container{
      border: 2px solid #369763;
      border-radius: 0.5rem;
  }
</style>