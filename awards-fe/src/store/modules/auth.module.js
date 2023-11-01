import * as API from "../../api/auth";

const state = {
  auth: null,
  token: null,
};
const mutations = {
  SET_AUTH: (state, payload) => {
    state.auth = payload;
    state.token = payload.token;
  },
  RESET_AUTH: (state) => {
    state.auth = null;
    state.token = null;
  },
};
const actions = {
  LOGIN: async ({ commit }, payload) => {
    const resp = await API.LOGIN(payload);
    commit("SET_AUTH", resp.data.data);
  },
};
const getters = {
  auth: (state) => state.auth,
  token: (state) => state.token,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
