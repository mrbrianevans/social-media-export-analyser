<script>
  import OnlineIndicator from './OnlineIndicator.svelte'
  import GitHubLink from './GitHubLink.svelte'
  import ThemeToggle from './ThemeToggle.svelte'
</script>


<vaadin-horizontal-layout class='topbar'
                          style='justify-content: space-between; width: 100%; align-items: center'>
  <slot>
    <h1 class='navbar-title'>
      <img alt='logo' src='icon/icon500.webp' style='height: 2em; width: 2em' />
      Data File Explorer
    </h1>
  </slot>
  <vaadin-horizontal-layout>
    <OnlineIndicator />
    <GitHubLink />
    <ThemeToggle />
  </vaadin-horizontal-layout>
</vaadin-horizontal-layout>


<style>
    .topbar {
        height: CALC(2 * var(--lumo-font-size-xl));
        width: 100%;
    }

    h1.navbar-title {
        display: inline-flex;
        font-size: var(--lumo-font-size-xl);
        margin: 0.25rem var(--lumo-space-s);
        align-items: center;
    }
</style>
