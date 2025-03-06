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
  <div id="app" class="app container">
    <div class="row -content">
      <div class="col-md-12">
        <ProfileComponent></ProfileComponent>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileComponent from "./components/ProfileComponent.vue";
export default {
  name: "App",
  components: {
    ProfileComponent,
  },
  methods: {}
};
</script>
