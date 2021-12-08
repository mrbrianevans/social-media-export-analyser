<script lang="ts">

  import { InstagramProfile } from '../../../../../lib/vendors/instagram/Profile'
  import { longDate } from '../../../../../lib/common/DateUtils'

  export let data: InstagramProfile
</script>

<div id="container">
  <img src='{data.profile_pic_url}' alt='instagram profile picture'/>
  <div id="text">

    <p id="name">{data.name}
      <span id="handle">@{data.username}</span></p>
    <p id="private"> {data.private_account ? '🔒 Private':'🔓 Public'}</p>
    <p id="joined">📅 Joined on {longDate(new Date(data.date_joined))}</p>
    <p id="bio"><span id="label">Bio: </span>{data.biography}</p>
  </div>
</div>


<style>
    *{
        font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    }
    img {
        border-radius: 50%;
        align-self: center;
        justify-self: center;
    }

    div#container{
        display: grid;
        grid-template-columns: 1fr 2.5fr;
        width: 600px;
        background: #e7ebef;
        margin: 1rem;
        padding: 1rem;
        gap: 0.25rem;
    }

    div#container p{
        padding: 0;
        margin: 0;
    }

    #name{
        font-weight: bold;
    }

    #handle{
        opacity: 0.5;
        font-weight: 100;
    }

    #label{
        font-weight: bold;

    }

    #text{
        padding-top: 0.5rem;
    }
</style>