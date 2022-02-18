<script lang="ts">
  let online: boolean = window.navigator.onLine
  window.addEventListener('online', ()=>online = window.navigator.onLine)
  window.addEventListener('offline', ()=>online = window.navigator.onLine)
</script>

<div class='send-req' on:click={()=>fetch('https://httpbin.org/get')} aria-label={online ? 'Online' : 'Offline'}>
  <svg viewBox='0 0 20 20' class='online-indicator'>
    <circle r='10px' class:online cx='10px' cy='10px'></circle>
  </svg>
</div>


<style>
    .send-req{
        height: 1.8rem;
        width: 1.8rem;
        display: inline-grid;
        place-items: center;
    }
    svg.online-indicator{
       height: 1rem;
        width: 1rem;
    }
  circle.online{
      fill: #369763;
  }
  circle{
      fill: #c44e47;
      transition: fill 70ms linear;
  }

    .send-req::after{
        content: attr(aria-label);
        position: absolute;
        color: var(--lumo-body-text-color);
        background: var(--lumo-base-color);
        width: max-content;
        font-size: 0.75rem;
        /*right: 0;*/
        top: 40%;
        margin: 0 auto;
        padding: 0.5em 1em;
        border-radius: 0.125em;
        opacity: 0;
        transform: scale(0);
        transform-origin: top;
        transition: transform 0ms linear 100ms, opacity 100ms linear;
    }
    .send-req:hover::after,
    .send-req:focus-visible::after {
        opacity: 0.7;
        transform: scale(1);
        transition: transform 70ms linear, opacity 70ms linear;
    }
</style>
