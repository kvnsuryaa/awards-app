import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./modules/auth.module";
import awards from "./modules/awards.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    awards,
  },
  plugins: [
    createPersistedState({
      key: "payment-test",
      reducer: (state) => ({
        auth: state.auth,
      }),
    }),
  ],
});
