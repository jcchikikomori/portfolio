import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "nes.css/css/nes.min.css";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
