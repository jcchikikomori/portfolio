<style lang="scss" scoped>
#dialog-projects {
  height: auto;
  min-width: 35rem;

  .subtitle {
    font-size: 13px;
  }

  .dialog-menu {
    padding: 0; // tentative
    margin-bottom: 0;
  }

  .card-group {
    .card .card-body {
      .card-text {
        font-size: 13px;
        text-align: left;
        word-break: break-word;
        hyphens: auto;
      }
    }
  }

  // FOR DARK MODE
  &.is-dark {
    .card-group {
      .card .card-body {
        background: #212529;
      }
    }
  }
}
</style>

<template>
  <!-- PROJECTS CONTAINER -->
  <div id="projects-container">
    <dialog class="nes-dialog is-rounded" id="dialog-projects">
      <form method="dialog">
        <h5 class="title">Projects & Contributions</h5>
        <p class="subtitle">See more by <a href="javascript:goToUrl('https://github.com/jcchikikomori')">contacting me</a> for my CV!</p>
        <div class="card-group">
          <div class="card">
            <img src="img/projects/placeholder.png"
                 class="card-img-top" alt="php7-starter"
                 onclick="goToUrl('https://github.com/jcchikikomori/php7-starter')">
            <div class="card-body">
              <h6 class="card-title">php7-starter</h6>
              <p class="card-text">Pure & naked PHP 7 micro-framework. Perfect for prototypes.</p>
              <p class="card-text"><small class="text-muted">2017-present</small></p>
            </div>
          </div>
          <div class="card">
            <img src="img/projects/placeholder.png"
                 class="card-img-top" alt="PayMaya Android SDK"
                 onclick="goToUrl('https://github.com/jcchikikomori?org=PayMaya&year_list=1')">
            <div class="card-body">
              <h6 class="card-title">PayMaya Android SDK</h6>
              <p class="card-text">Contributed the issues & fixes for their Android SDKs.</p>
              <p class="card-text"><small class="text-muted">2020-present</small></p>
            </div>
          </div>
          <div class="card">
            <img src="img/projects/covemanila.png"
                 class="card-img-top" alt="Cove Manila"
                 onclick="goToUrl('https://covemanila.com')">
            <div class="card-body">
              <h6 class="card-title">Cove Manila 2019</h6>
              <p class="card-text">Maintained with Gorated Innovation Labs, Inc.</p>
              <p class="card-text"><small class="text-muted">2019</small></p>
            </div>
          </div>
          <div class="card">
            <img src="img/projects/mcdelivery.png"
                 class="card-img-top" alt="McDelivery for Android"
                 onclick="goToUrl('https://play.google.com/store/apps/details?id=ph.mobext.mcdelivery&hl=en&gl=US')">
            <div class="card-body">
              <h6 class="card-title">McDelivery for Android</h6>
              <p class="card-text">Currently maintained with Gorated Innovation Labs, Inc.</p>
              <p class="card-text"><small class="text-muted">2019-present</small></p>
            </div>
          </div>
        </div>

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
