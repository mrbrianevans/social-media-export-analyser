<script lang='ts'>
  import FileUploader from './components/FileUploader.svelte'
  import { PostProcessedOutput } from '../../lib/typedefs/PostProcess'
  import { WellKnownMetadata } from '../../lib/typedefs/PreProcess'
  import '@vaadin/tabs'
  import '@vaadin/icons'
  import '@vaadin/vaadin-app-layout/vaadin-app-layout.js'
  import '@vaadin/vertical-layout'
  import { theme } from './stores/themeStore'
  import FileViewer from './components/FileViewer.svelte'
  import Navbar from './components/Navbar.svelte'
  import { ComponentForShape } from './components/ComponentMap'
  import FrequencyTableTabs from './visualisations/specific/metadata/FrequencyTableTabs.svelte'
  import TimeSeries from './visualisations/specific/metadata/TimeSeries.svelte'
  import JsonEditor from './components/JsonEditor.svelte'
  import ContentTabs from './visualisations/layouts/ContentTabs.svelte'
  import { sentenceCase } from 'sentence-case'
  import Footer from './components/Footer.svelte'
  import Topics from './visualisations/specific/metadata/Topics.svelte'
  import type { GetTopicsReturnType } from 'fast-topics'
  import { topicsWorkerWrapper } from './workers/topicsWorkerWrapper'
  import StringBox from './components/StringBox.svelte'
  import HomeTab from './components/HomeTab.svelte'
  import { LoadingFile } from './types/FileItem'

  let files: (PostProcessedOutput | LoadingFile)[] = []
  let activeIndex = null


  let tabs = []
  let selectedTab = 0
  let topics: GetTopicsReturnType
  const calculateTopics = (metadata: WellKnownMetadata) => {
    // prevents duplicating computation
    if (metadata.topicsCalculationStarted) return Promise.resolve(false)
    metadata.topicsCalculationStarted = true
    const { documents, options } = metadata.topics
    const startTime = performance.now()
    return topicsWorkerWrapper({ documents, options })
      .then(t => metadata.topicsCalculated = t)
      .then(() => console.log('topics returned in', performance.now() - startTime, 'milliseconds'))
      .then(() => true)
  }
  $: { // topic extraction
    let file = files[activeIndex]
    if (file && file.metadata.topics) {
      calculateTopics(file.metadata)
        .then((b) => {
          // trigger reload after metadata is set
          if (b) files[activeIndex].metadata = files[activeIndex].metadata
        })
    }
  }
  $: {
    let file = files[activeIndex]
    if (file) {
      tabs = [{
        label: 'Main',
        component: ComponentForShape[file.component],
        props: { data: file.data }, icon: 'list-ul'
      },
        {
          label: 'Frequency tables',
          component: file.metadata.freq && FrequencyTableTabs,
          props: { data: file.metadata.freq }, icon: 'table'
        },
        {
          label: 'Time series',
          component: file.metadata.ts && TimeSeries,
          props: { data: file.metadata.ts },
          icon: 'bar-chart'
        },
        {
          label: 'Topics', icon: 'twin-col-select',
          loading: file.metadata.topicsCalculationStarted && !file.metadata.topicsCalculated,
          component: file.metadata.topicsCalculated && Topics,
          props: {
            ...file.metadata.topics,
            topics: file.metadata.topicsCalculated,
            mainComponent: ComponentForShape[file.component],
            data: file.data
          }
        },
        { label: 'JSON data', component: JsonEditor, props: { data: file.data }, icon: 'file-code' },
        { label: 'Raw data', component: StringBox, props: { data: { text: file.metadata.fileContent } }, icon: 'lines' }
      ]
    } else tabs = []
  }
  $: {
    let unused = activeIndex // for reactivity dependence
    selectedTab = 0
  }
</script>


<main theme={$theme}>
  <vaadin-app-layout primary-section='drawer' class='main-app'>

    <h1 class='navbar-title' slot='drawer'><img alt='logo' src='icon/icon500.webp' style='height: 2em; width: 2em' />Data
      File
      Explorer</h1>
    <!-- file tab selectors -->
    <div slot='drawer'>
      <vaadin-tabs class='file-explorer-tabs' orientation='vertical' selected-changed={console.log}>
        <vaadin-tab>
          <span tabindex='-1' on:click={()=>activeIndex=null}>Home</span>
        </vaadin-tab>
        {#each files as file, index}
          <vaadin-tab disabled={!file.component}>
            <span tabindex='-1' on:click={()=>activeIndex=index}>{file.title}</span>
            {#if file.loading}
              <vaadin-icon icon='vaadin:hourglass'></vaadin-icon>
            {/if}
          </vaadin-tab>
        {/each}
      </vaadin-tabs>
      <!-- file upload area -->
      <div slot='drawer'>
        <FileUploader bind:files />
      </div>
    </div>

    <div slot='navbar' style='width: 100%'>
      <vaadin-vertical-layout>

        <Navbar>
          {#if files[activeIndex]}
            <h3
              style='margin: 0.5rem 1rem'>{`${files[activeIndex]?.title} (${files[activeIndex]?.metadata.filename})`}</h3>
          {:else if activeIndex === null}
            <h3 style='margin: 0.5rem 1rem'>Homepage</h3>
          {:else}
            <p style='margin: 0.5rem 1rem'>Please refresh the page and try again</p>
          {/if}
        </Navbar>
        <vaadin-tabs>
          {#each tabs as tab, index}
            <vaadin-tab on:click={()=>selectedTab=index} selected={index === selectedTab} disabled={!tab.component}>
              {#if tab.icon}
                <vaadin-icon icon='vaadin:{tab.icon}'></vaadin-icon>
              {/if}
              <span>{sentenceCase(tab.label)}</span>
              {#if tab.loading}
                <vaadin-icon icon='vaadin:hourglass'></vaadin-icon>
              {/if}
            </vaadin-tab>
          {/each}
        </vaadin-tabs>
      </vaadin-vertical-layout>
    </div>
    {#if activeIndex === null}
      <HomeTab />
    {/if}

    {#each files as file, index}
      {#if index === activeIndex}

        <div class='component-container'>
          {#each tabs as tab, index}
            {#if index === selectedTab}
              <svelte:component this={tab.component} {...tab.props} />
            {/if}
          {/each}
          <Footer />
        </div>
        <!--        <FileViewer file={file} />-->
      {/if}
    {/each}
  </vaadin-app-layout>
</main>

<style>
    h1.navbar-title {
        display: inline-flex;
        font-size: var(--lumo-font-size-xl);
        margin: auto var(--lumo-space-s);
        height: CALC(2 * var(--lumo-font-size-xl));
        align-items: center;
    }

    vaadin-app-layout.main-app {
        height: 100vh;
    }

    main::-webkit-scrollbar, .component-container::-webkit-scrollbar {
        display: none;
    }

    .component-container {
        --container-height: CALC(100vh - var(--lumo-font-size-xl) - 1rem - 4rem);
        height: VAR(--container-height);
        overflow: scroll;
    }

    .file-explorer-tabs {
        /* this makes the height half of the side bar */
        height: CALC((100vh - 2 * var(--lumo-font-size-xl)) / 2 - 1.5rem);
        margin: 0;
        padding: 0;
    }

    :global(body) {
        margin: 0;
    }

</style>
