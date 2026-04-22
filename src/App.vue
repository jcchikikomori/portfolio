<style lang="scss">
  @import './assets/scss/main';

  .app {
    .-content {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
</style>

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
      @click="toggleCrt"
      aria-label="Toggle CRT filter"
      title="Toggle CRT filter"
    >
      <i class="nes-icon star"></i>
    </button>
  </div>
</template>

<script>
  import ProfileComponent from './components/ProfileComponent.vue';
  import { toggleCrt, initCrt } from './theme.js';

  export default {
    name: 'App',
    components: {
      ProfileComponent,
    },
    methods: {
      toggleCrt,
    },
    mounted() {
      initCrt();
    },
  };
</script>
