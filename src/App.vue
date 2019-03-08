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
