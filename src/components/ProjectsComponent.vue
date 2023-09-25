<template>
  <!-- PROJECTS CONTAINER -->
  <div id="projects-container">
    <dialog class="nes-dialog animate__animated animate__bounceInDown animate__faster" id="dialog-projects">
      <form method="dialog">
        <h1 class="title">My Career History</h1>
        <p class="subtitle">
          See more by
          <a v-on:click="goToUrl('https://github.com/jcchikikomori')"
            >contacting me</a
          >
          for my CV!
        </p>
        <div class="card-group">
          <div class="card">
            <div
              class="card-img-top placeholder"
              alt="Accenture"
              v-on:click="goToUrl('https://accenture.com')"
            ></div>
            <div class="card-body">
              <h6 class="card-title">Accenture</h6>
              <!-- <p class="card-text"></p> -->
              <p class="card-text">
                <small class="text-muted">2022-present</small>
              </p>
            </div>
          </div>
          <div class="card">
            <div
              class="card-img-top chatgenie"
              alt="Chatgenie.ph"
              v-on:click="goToUrl('https://chatgenie.ph')"
            ></div>
            <div class="card-body">
              <h6 class="card-title">Chatgenie.ph</h6>
              <p class="card-text">
                Developed some integrations for Chatgenie.ph
                Such as GCash (GLife), Viber, Facebook & Instagram
              </p>
              <p class="card-text">
                <small class="text-muted">2019-2022</small>
              </p>
            </div>
          </div>
          <div class="card">
            <div
              class="card-img-top hello-php"
              alt="php7-starter"
              v-on:click="alert('Preview not available anymore.')"
            ></div>
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
              v-on:click="goToUrl('https://github.com/jcchikikomori?org=PayMaya&year_list=1')"
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
            <div
              class="card-img-top gcash-miniprogram"
              alt="GCash Mini Program"
              v-on:click="goToUrl('https://miniprogram.gcash.com')"
            ></div>
            <div class="card-body">
              <h6 class="card-title">GCash Mini Program</h6>
              <p class="card-text">
                For serving Chatgenie merchants for GLife<br />
              </p>
              <p class="card-text">
                <small class="text-muted">2020-2022</small>
              </p>
            </div>
          </div>
          <div class="card">
            <div
              class="card-img-top covemanila"
              alt="Cove Manila"
              v-on:click="alert('Preview not available anymore.')"
            ></div>
            <div class="card-body">
              <h6 class="card-title">Cove Manila WordPress Project</h6>
              <p class="card-text"><small class="text-muted">2019</small></p>
            </div>
          </div>
          <div class="card">
            <div
              class="card-img-top mcdelivery"
              alt="McDelivery PH"
              v-on:click="goToUrl('https://web.archive.org/web/20191228231219if_/https://www.mcdelivery.com.ph/')"
            ></div>
            <div class="card-body">
              <h6 class="card-title">McDelivery PH for Android</h6>
              <p class="card-text">
                <small class="text-muted">2019 - 2021</small>
              </p>
            </div>
          </div>
        </div>

        <menu class="dialog-menu">
          <button class="nes-btn is-primary is-block">Okay</button>
        </menu>
      </form>
    </dialog>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "ProjectsComponent",
  components: {},
  methods: {
    goToUrl: function(url, includeTarget = true) {
      $("#redirect").attr("href", url);
      if (!includeTarget) {
        $("#redirect").attr("target", null);
      } else {
        $("#redirect").attr("target", "_blank");
      }
      $("#redirect")[0].click();
    },
    alert: function(msg) {
      alert(msg);
    },
  }
};
</script>
