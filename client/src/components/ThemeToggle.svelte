<!-- From Kevin Powell -->
<script lang='ts'>
  // saves setting in localStorage
  // gets preference from css media query
  // fancy animation for switching between modes
  // aria label depending on which direction its switching
  export let theme: 'dark' | 'light'
  const getFromStorage = () => {
    const value = localStorage.getItem('darkTheme')
    console.log('Got', value, 'from localStorage for theme')
    if (value === 'true') return true
    else if (value === 'false') return false
    else return null
  }
  const getMediaQuery = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) console.log('Media query prefers dark mode')
    return prefersDark
  }
  let darkTheme = getFromStorage() ?? getMediaQuery()
  const toggleTheme = () => {
    darkTheme = !darkTheme
    localStorage.setItem('darkTheme', darkTheme.toString())
  }
  $: theme = darkTheme ? 'dark' : 'light'
</script>

<button aria-label={`Switch to ${darkTheme ? 'light' : 'dark'} mode`} class={darkTheme?'dark':'light'} id='theme-toggle'
        on:click={toggleTheme}>
  <svg viewBox='0 0 472.39 472.39' xmlns='http://www.w3.org/2000/svg'>
    <g class='toggle-sun'>
      <path
        d='M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z' />
    </g>
    <g class='toggle-circle'>
      <circle class='cls-1' cx='236.2' cy='236.2' r='103.78' />
    </g>
  </svg>

</button>


<style>

    #theme-toggle {
        cursor: pointer;
        background: 0;
        border: 0;
        opacity: 0.8;
        padding: 0.4rem;
        border-radius: 50%;
        position: relative;
        isolation: isolate;
        width: 1.8rem;
        height: 1.8rem;
    }

    #theme-toggle svg {
        fill: var(--lumo-contrast);
        width: 1rem;
        height: 1rem;
    }

    #theme-toggle::before {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--lumo-contrast-20pct);
        border-radius: inherit;
        transform: scale(0);
        opacity: 0;
        z-index: -1;
    }

    .light #theme-toggle::before {
        animation: pulseToLight 650ms ease-out;
    }

    .dark #theme-toggle::before {
        animation: pulseToDark 650ms ease-out;
    }

    #theme-toggle::after {
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

    #theme-toggle:hover,
    #theme-toggle:focus {
        outline: 0;
        opacity: 1;
        background: var(--lumo-contrast-10pct)
    }

    #theme-toggle:hover::after,
    #theme-toggle:focus-visible::after {
        opacity: 0.7;
        transform: scale(1);
        transition: transform 70ms linear, opacity 70ms linear;
    }

    .toggle-circle {
        transition: transform 500ms ease-out;
    }

    .light .toggle-circle {
        transform: translateX(-15%);
    }

    .toggle-sun {
        transform-origin: center center;
        transition: transform 750ms cubic-bezier(0.11, 0.14, 0.29, 1.32);
    }

    .light .toggle-sun {
        transform: rotate(0.5turn);
    }

    @keyframes pulseToLight {
        0% {
            transform: scale(0);
            opacity: 0.5;
        }
        10% {
            transform: scale(1);
        }
        75% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: scale(1);
        }
    }

    @keyframes pulseToDark {
        0% {
            transform: scale(0);
            opacity: 0.5;
        }
        10% {
            transform: scale(1);
        }
        75% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: scale(1);
        }
    }

</style>