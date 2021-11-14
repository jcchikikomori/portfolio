<style lang="scss">
@import "./assets/scss/main";

.app {
  .-content {
    padding-top: 15px;
    padding-bottom: 15px;
  }
}
</style>

<template>
  <div id="app" class="app container-fluid">
    <div class="-content">
      <Loader></Loader>
      <Profile></Profile>
    </div>
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
  },
  methods: {}
};
</script>
