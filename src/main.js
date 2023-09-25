import Vue from "vue";
import App from "./App.vue";
import $ from "jquery";
import "nes.css/css/nes.min.css";
import { darkMode, normalTheme } from './theme';
// import { isAudioPlaying, visualizerIsOn, visualizerIsOff } from "./visualizer";
import { microProcessor } from "./http";

Vue.config.productionTip = false;

/** main */
window.onload = function() {
  // document.getElementById("#loading-dialog").showModal();
  // $("#main-container").removeAttr("hidden");
  // $("#loading-button").trigger("click");

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    darkMode();
  } else {
    normalTheme();
  }

  // Currently not working
  // setInterval(() => {
  //   if (isAudioPlaying()) {
  //     visualizerIsOn();
  //   } else {
  //     visualizerIsOff();
  //   }
  // }, 1000);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", e => {
      const newColorScheme = e.matches ? "dark" : "light";
      if (newColorScheme == "dark") {
        darkMode();
      } else {
        normalTheme();
      }
    });

  /**
    if ($('.too-small-warning').is(':hidden')) {
      $('#profile-container').show();
    } else {
      $('#profile-container').show();
    }
    */

  if ($("#profile-container").is(":hidden")) {
    // load posts first
    $("#loading-message").text("Load shenanigans...");
    // load updates
    // microProcessor.init(); // Skip for a while
    $("#post-container").parent().hide();
    microProcessor.finishSetup();
  }
};

new Vue({
  render: h => h(App)
}).$mount("#app");
