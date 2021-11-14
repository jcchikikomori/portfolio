<template>
  <!-- PROJECTS CONTAINER -->
  <div id="projects-container">
    <dialog class="nes-dialog" id="dialog-projects">
      <form method="dialog">
        <h5 class="title">Projects & Contributions</h5>
        <p class="subtitle">
          See more by
          <a href="javascript:goToUrl('https://github.com/jcchikikomori')"
            >contacting me</a
          >
          for my CV!
        </p>
        <div class="card-group">
          <div class="card">
            <img
              src="img/projects/placeholder.png"
              class="card-img-top"
              alt="Chatgenie.ph"
              onclick="goToUrl('https://chatgenie.ph')"
            />
            <div class="card-body">
              <h6 class="card-title">Chatgenie.ph</h6>
              <!-- <p class="card-text">
                <br />
              </p> -->
              <p class="card-text">
                <small class="text-muted">2019-present</small>
              </p>
            </div>
          </div>
          <div class="card">
            <img
              src="img/projects/placeholder.png"
              class="card-img-top"
              alt="php7-starter"
              onclick="goToUrl('https://github.com/jcchikikomori/hello-php')"
            />
            <div class="card-body">
              <h6 class="card-title">hello-php</h6>
              <p class="card-text">
                For protyping PHP app with user authentication
              </p>
              <p class="card-text">
                <small class="text-muted">2017-present</small>
              </p>
            </div>
          </div>
          <!-- <div class="card">
            <img
              src="img/projects/placeholder.png"
              class="card-img-top"
              alt="PayMaya"
              onclick="goToUrl('https://github.com/jcchikikomori?org=PayMaya&year_list=1')"
            />
            <div class="card-body">
              <h6 class="card-title">PayMaya</h6>
              <p class="card-text">
                Contributed the issues & fixes for their SDKs.
              </p>
              <p class="card-text">
                <small class="text-muted">2020</small>
              </p>
            </div>
          </div> -->
          <div class="card">
            <img
              src="img/projects/placeholder.png"
              class="card-img-top"
              alt="GCash Mini Program"
              onclick="goToUrl('https://miniprogram.gcash.com')"
            />
            <div class="card-body">
              <h6 class="card-title">GCash Mini Program</h6>
              <p class="card-text">
                For serving Chatgenie merchants for GLife<br />
              </p>
              <p class="card-text">
                <small class="text-muted">2020-present</small>
              </p>
            </div>
          </div>
          <div class="card">
            <img
              src="img/projects/covemanila.png"
              class="card-img-top"
              alt="Cove Manila"
              onclick="goToUrl('https://covemanila.com')"
            />
            <div class="card-body">
              <h6 class="card-title">Cove Manila WordPress Project</h6>
              <p class="card-text"><small class="text-muted">2019</small></p>
            </div>
          </div>
          <div class="card">
            <img
              src="img/projects/mcdelivery.png"
              class="card-img-top"
              alt="McDelivery PH"
              onclick="goToUrl('https://mcdelivery.com.ph')"
            />
            <div class="card-body">
              <h6 class="card-title">McDelivery PH for Android</h6>
              <p class="card-text">
                <small class="text-muted">2019 - 2021</small>
              </p>
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
