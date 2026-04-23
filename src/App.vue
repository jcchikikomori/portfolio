<script>
  import ProfileComponent from './components/ProfileComponent.vue';
  import { toggleCrt, initCrt } from './theme';

  export default {
    name: 'App',
    components: {
      ProfileComponent,
    },
    data() {
      return {
        crtEnabled: false,
      };
    },
    mounted() {
      initCrt();
      // Read initial state from localStorage
      const savedState = localStorage.getItem('crt-enabled');
      this.crtEnabled = savedState === 'true';
    },
    methods: {
      toggleCrt() {
        toggleCrt();
        this.crtEnabled = document.body.classList.contains('crt-enabled');
      },
    },
  };
</script>

<template>
  <div id="app" class="app container">
    <!-- SVG Filter Definitions for CRT Barrel Distortion -->
    <svg id="crt-svg-filters" aria-hidden="true" role="presentation" class="crt-svg-filters">
      <defs>
        <!-- Barrel Distortion Filter using displacement map -->
        <filter id="crt-barrel" x="-5%" y="-5%" width="110%" height="110%">
          <!-- Create a radial gradient for the displacement map -->
          <feImage
            href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cdefs%3E%3CradialGradient id='g' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23808080'/%3E%3Cstop offset='100%25' stop-color='%23606060'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='200' height='200' fill='url(%23g)'/%3E%3C/svg%3E"
            preserveAspectRatio="none"
            result="distortMap"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="distortMap"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>

    <div class="crt-filter" aria-hidden="true"></div>
    <div class="row -content">
      <div class="col-md-12">
        <ProfileComponent></ProfileComponent>
      </div>
    </div>
    <button
      class="nes-btn is-default crt-toggle nes-pointer"
      :class="{ 'is-disabled': !crtEnabled }"
      :aria-label="crtEnabled ? 'Disable CRT filter' : 'Enable CRT filter'"
      :title="crtEnabled ? 'Disable CRT filter' : 'Enable CRT filter'"
      @click="toggleCrt"
    >
      <i class="nes-icon star" :class="{ 'is-empty': !crtEnabled }"></i>
    </button>
  </div>
</template>

<style lang="scss">
  @import './assets/scss/main';

  .app {
    .-content {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }

  // Hide SVG filter definitions visually but keep in DOM
  .crt-svg-filters {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
  }
</style>
