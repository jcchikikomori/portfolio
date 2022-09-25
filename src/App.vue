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
      <LoaderComponent></LoaderComponent>
      <ProfileComponent></ProfileComponent>
    </div>
  </div>
</template>

<script>
import LoaderComponent from "./components/LoaderComponent.vue";
import ProfileComponent from "./components/ProfileComponent.vue";

export default {
  name: "App",
  components: {
    LoaderComponent,
    ProfileComponent
  },
  methods: {}
};
</script>
