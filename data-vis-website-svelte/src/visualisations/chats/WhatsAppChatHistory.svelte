<script lang="ts">
  import '@vaadin/message-list';
  import { onMount } from 'svelte';

  export let messages: { time: string; text: string; userName: string }[] = []

  onMount(() => {
    $: {
      console.log('updating the messages')
      document.querySelector('vaadin-message-list').items = messages
    }
  });
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
