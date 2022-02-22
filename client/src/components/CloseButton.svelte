<script>
  import '@vaadin/icons'
  import '@vaadin/button'

  let button
  $: button?.setAttribute('theme', 'icon error')
</script>

<vaadin-button bind:this={button} aria-label='Close' on:click>
  <vaadin-icon icon='vaadin:close-small'></vaadin-icon>
</vaadin-button>
