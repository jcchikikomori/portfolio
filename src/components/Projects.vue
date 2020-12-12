<style lang="scss" scoped>
#dialog-projects {
  height: auto;
  min-width: 35rem;

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
  <!-- PROJECTS CONTAINER -->
  <div id="projects-container">
    <dialog class="nes-dialog is-rounded" id="dialog-projects">
      <form method="dialog">
        <p class="title">Under Construction!</p>
        <p class="subtitle">Please contact me for my CV</p>
        <menu class="dialog-menu">
          <button class="nes-btn is-primary">Okay</button>
        </menu>
      </form>
    </dialog>
  </div>
</template>

<script>
export default {
  name: "Projects",
  components: {}
};
</script>
