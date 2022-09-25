<style lang="scss" scoped>
#dialog-spotify {
  .title {
    margin: 0;
  }

  .subtitle {
    font-size: 14px;
  }

  .dialog-menu {
    padding: 0; // tentative
  }
}
</style>

<template>
  <!-- SPOTIFY CONTAINER -->
  <div id="spotify-container">
    <dialog class="nes-dialog animate__animated animate__bounceInUp animate__faster" id="dialog-spotify">
      <form method="dialog">
        <p class="title">My Party Box</p>
        <p class="subtitle">powered by Spotify</p>
        <iframe
          class="spotify-iframe"
          title="My Party Box"
          src="https://open.spotify.com/embed/playlist/64mrMELI7nTWZWbYAww4Zv"
          width="450"
          height="450"
          allow="encrypted-media"
        ></iframe>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary">Close</button>
        </menu>
      </form>
    </dialog>
  </div>
</template>

<script>
  export default {
    name: "SpotifyComponent",
    components: {}
  };
</script>
