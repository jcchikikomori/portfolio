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
</style>
