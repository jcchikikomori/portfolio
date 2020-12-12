<style lang="scss">
@import "../node_modules/nes.css/css/nes.css";
@import "./assets/scss/custom";
@import "./assets/scss/media";
</style>

<template>
  <div id="app">
    <Loader></Loader>
    <Profile></Profile>
  </div>
</template>

<script>
import Loader from "./components/Loader.vue";
import Profile from "./components/Profile.vue";

export default {
  name: "app",
  components: {
    Loader,
    Profile
  }
};
</script>
