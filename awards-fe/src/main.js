import Vue from "vue";
import App from "./App.vue";
import moment from "moment";
import axios from "axios";
import store from "./store";
import router from "./router/index";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

axios.defaults.baseURL = "http://localhost:7070/api/v1";
axios.interceptors.request.use(
  (config) => {
    const token = store.getters["auth/token"];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.prototype.$formatDate = (date, format) => {
  if (date) return moment(date).format(format || "YYYY-MM-DD");
  return "-";
};

Vue.prototype.$formatCurrency = (number) => {
  var number_string = number.toString().replace(/[^,\d]/g, ""),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
