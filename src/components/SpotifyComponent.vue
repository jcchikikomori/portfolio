<script>
  import { setMediaPlaying } from '@/theme';

  export default {
    name: 'SpotifyComponent',
    components: {},
    data() {
      return {
        embedController: null,
        iframeAPIReady: false,
      };
    },
    mounted() {
      this.initSpotifyEmbed();
    },
    beforeUnmount() {
      this.destroyEmbedController();
    },
    methods: {
      closeSpotify: () => {
        console.debug('SpotifyComponent: Spotify dialog closed.');
      },

      initSpotifyEmbed() {
        // Check if iframe API script is already loaded
        if (window.onSpotifyIframeApiReady) {
          // API already loaded, initialize directly
          this.setupEmbedController();
        } else {
          // Define the callback for when API is ready
          window.onSpotifyIframeApiReady = (IFrameAPI) => {
            this.iframeAPIReady = true;
            this.createEmbedController(IFrameAPI);
          };

          // Load the Spotify Iframe API script
          const script = document.createElement('script');
          script.src = 'https://open.spotify.com/embed/iframe-api/v1';
          script.async = true;
          document.body.appendChild(script);
        }
      },

      createEmbedController(IFrameAPI) {
        const element = document.getElementById('embed-iframe');
        if (!element) {
          console.error('SpotifyComponent: Embed iframe element not found');
          return;
        }

        const options = {
          width: '100%',
          height: '450',
          uri: 'spotify:playlist:0ibvqi75kCZBSey9DddtTG',
        };

        const callback = (EmbedController) => {
          this.embedController = EmbedController;
          console.debug('SpotifyComponent: EmbedController created');

          // Add event listeners
          this.addPlaybackListeners();
        };

        IFrameAPI.createController(element, options, callback);
      },

      setupEmbedController() {
        // If API is already available, create controller immediately
        if (window.IFrameAPI) {
          this.createEmbedController(window.IFrameAPI);
        }
      },

      addPlaybackListeners() {
        if (!this.embedController) {
          console.error('SpotifyComponent: No EmbedController available');
          return;
        }

        // Listen for playback updates
        this.embedController.addListener('playback_update', (e) => {
          const { isPaused } = e.data;
          // isPaused: false means music is playing
          // isPaused: true means music is paused
          setMediaPlaying(!isPaused);
          console.debug(`SpotifyComponent: Playback update - isPaused: ${isPaused}`);
        });

        // Listen for playback started
        this.embedController.addListener('playback_started', (_e) => {
          setMediaPlaying(true);
          console.debug('SpotifyComponent: Playback started');
        });

        // Listen for ready event
        this.embedController.addListener('ready', () => {
          console.debug('SpotifyComponent: Embed ready');
        });
      },

      destroyEmbedController() {
        if (this.embedController) {
          this.embedController.destroy();
          this.embedController = null;
          console.debug('SpotifyComponent: EmbedController destroyed');
        }
      },
    },
  };
</script>

<template>
  <!-- SPOTIFY CONTAINER -->
  <div id="spotify-container">
    <dialog id="dialog-spotify" class="nes-dialog">
      <form method="dialog">
        <p class="title">My Chosen Music</p>
        <p class="subtitle">powered by Spotify</p>
        <!-- Spotify Embed API will replace this div with the iframe -->
        <div id="embed-iframe" class="spotify-iframe-container"></div>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary nes-pointer is-block" @click="closeSpotify()">
            Close
          </button>
        </menu>
      </form>
    </dialog>
  </div>
</template>

<style lang="scss" scoped>
  #dialog-spotify {
    height: fit-content;

    .title {
      margin: 0;
    }

    .subtitle {
      font-size: 14px;
    }

    .spotify-iframe-container {
      width: 100%;
      max-width: 450px;
      height: auto;
      aspect-ratio: 1 / 1;
      margin: 0 auto;

      // Responsive adjustments for mobile
      @media (max-width: 480px) {
        max-width: 100%;
      }
    }

    .dialog-menu {
      padding: 0; // tentative
    }
  }
</style>
