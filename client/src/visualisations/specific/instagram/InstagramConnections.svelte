<script lang='ts'>
  import OneLineList from '../../lists/OneLineList.svelte'
  import { InstagramConnections } from '../../../../../lib/vendors/instagram/Connections'

  export let data: InstagramConnections
  export let maxItems: number = 1000

  const actions: Record<keyof InstagramConnections, string> = {
    followers: 'were followed by',
    blocked_users: 'blocked',
    close_friends: 'became close friends with',
    dismissed_suggested_users: 'dismissed suggested user',
    follow_requests_sent: 'sent a follow request to',
    following: 'followed',
    hide_stories_from: 'hid your stories from'

  }
  let transformedData = []
  $: transformedData = data ? Object.entries(data).flatMap(([actionKey, occurances]) => (Object.entries(occurances).map(([username, date]) => `You ${actions[actionKey]} ${username} on ${date}`))) : []
</script>

<OneLineList data={transformedData} heading={`${Object.keys(data.followers??{}).length} followers, following ${Object.keys(data.following??{}).length}`}
             maxItems={maxItems} />