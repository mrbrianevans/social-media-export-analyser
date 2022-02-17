<script>

  import '@vaadin/scroller'
</script>


<vaadin-scroller scroll-direction='vertical' class='scroller'>
  <slot></slot>
</vaadin-scroller>

<style>

    vaadin-scroller.scroller {
        max-height: VAR(--container-height);
    }
</style>
