import DataTable from './DataTable.svelte'
import type { SvelteComponent } from 'svelte'
import JsonEditor from './JsonEditor.svelte'
import MessageHistory from '../visualisations/chats/MessageHistory.svelte'
import InstagramPostsList from '../visualisations/specific/instagram/InstagramPostsList.svelte'
import StringBox from './StringBox.svelte'
import VaadinGrid from '../visualisations/grids/VaadinGrid.svelte'
import type { ComponentName } from '../../../lib/typedefs/Components'
import InstagramConnections from '../visualisations/specific/instagram/InstagramConnections.svelte'
import InstagramLikes from '../visualisations/specific/instagram/InstagramLikes.svelte'
import InstagramComments from '../visualisations/specific/instagram/InstagramComments.svelte'
import KeyValueCard from '../visualisations/cards/KeyValueCard.svelte'
import InstagramProfile from '../visualisations/specific/instagram/InstagramProfile.svelte'
import TwitterTweets from '../visualisations/specific/twitter/TwitterTweets.svelte'

// by using mapped types, this ensures a component exists for every ComponentName
export const ComponentForShape: {
  [componentName in ComponentName]: typeof SvelteComponent
} = {
  DataTable,
  JsonEditor,
  MessageHistory,
  InstagramPostsList,
  StringBox,
  VaadinGrid,
  InstagramConnections,
  InstagramLikes,
  InstagramComments,
  KeyValueCard,
  InstagramProfile,
  TwitterTweets
}
