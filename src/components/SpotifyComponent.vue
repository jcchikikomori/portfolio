<style lang="scss" scoped>
#dialog-spotify {
  height: fit-content;
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
    <dialog class="nes-dialog" id="dialog-spotify">
      <form method="dialog">
        <p class="title">My Chosen Music</p>
        <p class="subtitle">powered by Spotify</p>
        <iframe
          loading="lazy"
          class="spotify-iframe"
          title="My Dopamine"
          src="https://open.spotify.com/embed/playlist/0ibvqi75kCZBSey9DddtTG?si=bdbadbe287124b77"
          width="450"
          height="450"
          allow="encrypted-media"
        ></iframe>
        <menu class="dialog-menu">
          <button
            v-on:click="closeSpotify()"
            class="btn nes-btn is-primary">
              Close
          </button>
        </menu>
      </form>
    </dialog>
  </div>
</template>

<script>
  // import { visualizerIsOff } from "../visualizer";

  export default {
    name: "SpotifyComponent",
    components: {},
    methods: {
      closeSpotify: () => {
        // visualizerIsOff();
        console.debug("SpotifyComponent: Spotify dialog closed.");
      }
    },
  };
</script>
