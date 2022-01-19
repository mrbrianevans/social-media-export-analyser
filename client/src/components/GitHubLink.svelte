
<a href='https://github.com/mrbrianevans/social-media-export-analyser' id='gitLink' target='_blank' aria-label='GitHub repository'>
<!--  from https://primer.style/octicons/mark-github-16 -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <path fill-rule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
  </svg>
</a>

<style>
  #gitLink{
      background: 0;
      border: 0;
      opacity: 0.8;
      padding: 0.4rem;
      border-radius: 50%;
      width: 1.8rem;
      height: 1.8rem;
      transition: all 70ms linear;
      display: inline-grid;
      place-items: center;
  }

  #gitLink svg{
      fill: var(--lumo-contrast);
      width: 1rem;
      height: 1rem;
  }
  #gitLink::after{
      content: attr(aria-label);
      position: absolute;
      color: var(--lumo-body-text-color);
      background: var(--lumo-base-color);
      width: max-content;
      font-size: 0.75rem;
      right: 0;
      top: 95%;
      margin: 0 auto;
      padding: 0.5em 1em;
      border-radius: 0.125em;
      opacity: 0;
      transform: scale(0);
      transform-origin: top;
      transition: transform 0ms linear 100ms, opacity 100ms linear;
  }


  #gitLink:hover,
  #gitLink:focus {
      outline: 0;
      opacity: 1;
      background: var(--lumo-contrast-10pct)
  }

  #gitLink:hover::after,
  #gitLink:focus-visible::after {
      opacity: 0.7;
      transform: scale(1);
      transition: transform 70ms linear, opacity 70ms linear;
  }

</style>