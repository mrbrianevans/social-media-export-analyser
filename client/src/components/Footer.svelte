<script>
  // injected environment variable from digital ocean and vite
  let commitHash = import.meta.env.COMMIT_HASH ?? 'master'
</script>

<footer class='app-footer'>
  <!--  <h3>Website footer</h3>-->
  <hr>
  <div class='sections-container'>
    <div>
      <p>
        Version
        <a href='https://github.com/mrbrianevans/social-media-export-analyser/tree/{commitHash}' target='_blank'>
          <code class='commit-hash'>{commitHash}</code>
        </a>
      </p>
    </div>

    <div>
      <a
        href='https://www.digitalocean.com/?refcode=4d6af2b60752&amp;utm_campaign=Referral_Invite&amp;utm_medium=Referral_Program&amp;utm_source=badge'
        target='_blank'>
        <img alt='DigitalOcean Referral Badge' src='https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg'
             class='digital-ocean'>
      </a>
    </div>

    <div>
      <p><a href='https://brianevans.tech' target='_blank'>brianevans.tech</a></p>
    </div>
  </div>
</footer>

<style>
    footer.app-footer {
        background: VAR(--lumo-contrast-5pct);
        color: VAR(--lumo-body-text-color);
        padding: 3rem 0;
        font-size: VAR(--lumo-font-size-xxs);
    }

    .sections-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    code.commit-hash {
        padding: 0.1rem 0.25rem;
    }

    img.digital-ocean {
        height: 2rem;
    }
</style>
