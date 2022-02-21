<script lang='ts'>
  import { sentenceCase } from 'sentence-case'
  import { longDate, longDateTime } from '../../../../lib/common/DateUtils'
  import { objectDepth } from '../../../../lib/common/ArrayUtils'

  export let data: Record<string, string> = {}
  export let maxItems: number = 10
  const stringifyItem = (element, index) => {
    return stringify(index, element).content
  }
  const stringify = (key: string, val: any): { content: string, href?: string } => {
    // console.log(`Stringify ${key} ${JSON.stringify(val)}`)
    if (val === null || val === undefined) return { content: 'nothing' }
    if (typeof val === 'boolean') return { content: val ? 'yes' : 'no' }
    if (String(val).match(/\d{2}:\d{2}:\d{2}/))
      return { content: longDateTime(new Date(val)) }
    if (String(val).match(/\d{4}-\d{2}-\d{2}/))
      return { content: longDate(new Date(val)) }
    if (String(val).match(/^https/))
      return { content: val, href: `${val}` }
    if (String(val).match(/^[^@]+@[^,]+\..{2,6}$/))
      return { content: val, href: `mailto:${val}` }
    if (typeof val === 'object') {
      if (val instanceof Array) {
        if (!val.length) return { content: 'empty' }
        return { content: val.map(stringifyItem).join(', ') }
      } else if (val instanceof Date)
        return { content: longDate(new Date(val)) }
      else {
        const depth = objectDepth(val)
        if (depth > 3)
          return { content: JSON.stringify(val, null, 2) }
        else if (depth === 1) {
          if (new Set(Object.keys(val)).size === 1) return stringify(Object.keys(val)[0], Object.values(val))
          return { content: Object.entries(val).map(([k, v]) => `${sentenceCase(k)}=${stringify(k, v).content}`).join(' & ') }
        }
      }
    }
    return { content: val }
  }
</script>

<div class='card'>
  {#each Object.entries(data).map(([key, value]) => ({ ...stringify(key, value), key: sentenceCase(key) })) as entry}
    <p><b>{entry.key}</b>:
      {#if entry.href}
        <a href={entry.href}>{entry.content}</a>
      {:else }
        {entry.content}
      {/if}
  {/each}
</div>


<style>
    .card {
        box-shadow: var(--lumo-box-shadow-l);
        margin: var(--lumo-space-l);
        padding: var(--lumo-space-m);
        background: var(--lumo-contrast-10pct);
    }
</style>
