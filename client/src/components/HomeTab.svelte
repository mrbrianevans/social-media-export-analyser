<script>
  import Arrow from './svg/right-angle-arrow.svg?component'
  import { postProcessors } from '../../../lib/postProcessing/postProcessingCategoriser'
  import '@vaadin/icons'
  import KeyValueCard from '../visualisations/cards/KeyValueCard.svelte'
  import FrequencyTable from '../visualisations/specific/metadata/FrequencyTable.svelte'
  import VaadinGrid from '../visualisations/grids/VaadinGrid.svelte'

  const supportedVendorCount = Object.entries(postProcessors)
    .reduce((prev, [, postProcessor]) => {
      if (!postProcessor.vendor) return prev
      if (postProcessor.vendor in prev) prev[postProcessor.vendor]++
      else prev[postProcessor.vendor] = 1
      return prev
    }, {})
</script>


<div>
  <Arrow width={25} height={75} class='arrow-pointing-to-file-tabs' />

  <div class='text-content'>
    <h1>Welcome to the data export viewer</h1>
    <h3>View files exported under GDPR right of data access</h3>
    <p>See your data visualised and analyse trends in your data, with insights such as time series analysis, word
      frequency analysis and topic extraction.</p>
    <p>To get started, upload some files exported from a tech company such as Instagram or YouTube. Drag and Drop into
      the bottom right hand corner of the site,
      or click the zone to open a file browser window</p>
    <p>Quote from the literature review:</p>
    <blockquote class='lit-review'>Web-based application that provides a visual interface for viewing data exported from
      popular websites.
      The main focus is of this app is making exported data more accessible to the average consumer,
      by displaying it in an easy-to-read format with graphics and visualisations.
    </blockquote>
    <hr />
    <h3>Accepted file formats</h3>
    <p>While any file of an accepted format can be uploaded, there are some file types that are specially recognised,
      which have custom processing, analysis and visualisation.</p>
    <p>Accepted file formats are:
    </p>
    <ul>
      <li>CSV <code>.csv</code></li>
      <li>JSON <code>.json</code></li>
      <li>HTML <code>.html</code></li>
      <li>XML <code>.xml</code></li>
      <li>Text <code>.txt</code></li>
      <li>V-Card <code>.vcf</code></li>
      <li>JavaScript <code>.js</code></li>
    </ul>
    <p>These are how many specific files are supported for each vendor:</p>
    <div style='width: 600px'>
      <VaadinGrid
        data={Object.entries(supportedVendorCount).map(([word, freq])=>({ServiceProvider:word, NumberOfRecognisedFiles: freq}))} />
    </div>
    <small>*These numbers are dynamically generated from the source code</small>
  </div>
</div>


<style>
    :global(.arrow-pointing-to-file-tabs) {
        transform: rotate(180deg) scale(2);
        position: absolute;
        top: CALC((100vh - 2 * var(--lumo-font-size-xl)) / 2);
        left: CALC(16em + 25px);
    }

    blockquote.lit-review {
        padding-left: 1rem;
    }

    div.text-content {
        margin-left: CALC(3 * 25px);
    }
</style>
